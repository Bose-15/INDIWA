const { Pool } = require('pg');

// ─── Connection Pool ──────────────────────────────────────────────────────────
// Render internal URL: no SSL required (same private network)
// External URL (local dev): SSL required
const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? false                          // Render internal — same network, no SSL
    : process.env.DATABASE_URL?.includes('oregon-postgres.render.com')
      ? { rejectUnauthorized: false } // external Render URL from local
      : false,                        // purely local postgres
  max: 10,                // max pool size (Render free tier: keep low)
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// ─── Log pool errors ─────────────────────────────────────────────────────────
pool.on('error', (err) => {
  console.error('[DB] Unexpected pool error:', err.message);
});

// ─── Query helper ─────────────────────────────────────────────────────────────
const query = async (text, params) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DB] ${(Date.now() - start)}ms | ${text.substring(0, 80)}`);
    }
    return result;
  } catch (err) {
    console.error('[DB] Query error:', err.message, '\nQuery:', text);
    throw err;
  }
};

// ─── Transaction helper ───────────────────────────────────────────────────────
const withTransaction = async (callback) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

// ─── Test connection ──────────────────────────────────────────────────────────
const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW() AS time, current_database() AS db');
    console.log(`[DB] ✅ Connected → ${res.rows[0].db} at ${res.rows[0].time}`);
    return true;
  } catch (err) {
    console.error('[DB] ❌ Connection failed:', err.message);
    return false;
  }
};

module.exports = { pool, query, withTransaction, testConnection };
