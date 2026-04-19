require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const fs   = require('fs');
const path = require('path');
const { pool } = require('../src/config/db');

async function runMigrations() {
  console.log('🗄️  Running INDIWA database migrations...\n');

  const sqlFiles = fs.readdirSync(__dirname)
    .filter(f => f.endsWith('.sql'))
    .sort();

  for (const file of sqlFiles) {
    const filePath = path.join(__dirname, file);
    const sql = fs.readFileSync(filePath, 'utf8');
    console.log(`▶  Running: ${file}`);
    try {
      await pool.query(sql);
      console.log(`✅ Done: ${file}\n`);
    } catch (err) {
      console.error(`❌ Failed: ${file}\n`, err.message);
      process.exit(1);
    }
  }

  console.log('✅ All migrations completed successfully.');
  await pool.end();
}

runMigrations().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
