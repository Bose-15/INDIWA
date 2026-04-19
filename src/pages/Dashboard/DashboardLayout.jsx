import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, User, Lock, ShieldCheck, Briefcase,
  BarChart3, GitBranch, ChevronDown, Menu, LogOut,
  Bell, ChevronRight, Network, Home, Search,
  HelpCircle, Settings, ChevronUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', exact: true },
  {
    key: 'profile', label: 'Profile', icon: User,
    children: [
      { key: 'personal-info', label: 'Personal Info',  icon: User,        path: '/dashboard/profile/personal-info' },
      { key: 'security-pin',  label: 'Security Pin',   icon: Lock,        path: '/dashboard/profile/security-pin'  },
      { key: 'kyc',           label: 'KYC',            icon: ShieldCheck, path: '/dashboard/profile/kyc'           },
      { key: 'business-info', label: 'Business Info',  icon: Briefcase,   path: '/dashboard/profile/business-info' },
    ],
  },
  {
    key: 'levels', label: 'Levels', icon: Network,
    children: [
      { key: 'level-report',  label: 'Level Report',  icon: BarChart3, path: '/dashboard/levels/level-report'  },
      { key: 'binary-report', label: 'Binary Report', icon: GitBranch, path: '/dashboard/levels/binary-report' },
    ],
  },
];

const BREADCRUMBS = {
  '/dashboard':                        [{ label: 'Dashboard' }],
  '/dashboard/profile/personal-info':  [{ label: 'Profile' }, { label: 'Personal Info' }],
  '/dashboard/profile/security-pin':   [{ label: 'Profile' }, { label: 'Security Pin' }],
  '/dashboard/profile/kyc':            [{ label: 'Profile' }, { label: 'KYC Verification' }],
  '/dashboard/profile/business-info':  [{ label: 'Profile' }, { label: 'Business Info' }],
  '/dashboard/levels/level-report':    [{ label: 'Levels' }, { label: 'Level Report' }],
  '/dashboard/levels/binary-report':   [{ label: 'Levels' }, { label: 'Binary Report' }],
};

// ─── Nav Item (light sidebar) ─────────────────────────────────────────────────
const NavItem = ({ item, onNavigate }) => {
  const location = useLocation();
  const isGroupActive = item.children
    ? location.pathname.startsWith(`/dashboard/${item.key}`)
    : location.pathname === item.path;
  const [open, setOpen] = useState(isGroupActive);
  React.useEffect(() => { if (isGroupActive) setOpen(true); }, [isGroupActive]);

  if (!item.children) {
    return (
      <NavLink to={item.path} end={item.exact} onClick={onNavigate}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12.5px] font-semibold transition-all duration-150 ${
            isActive
              ? 'bg-brand-blue text-white shadow-[0_2px_8px_rgba(0,124,193,0.25)]'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/70'
          }`}
      >
        <item.icon size={16} className="shrink-0" />
        {item.label}
      </NavLink>
    );
  }

  return (
    <div>
      <button onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-[12.5px] font-semibold transition-all duration-150 ${
          isGroupActive ? 'text-brand-blue' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/70'
        }`}
      >
        <span className="flex items-center gap-3">
          <item.icon size={16} className="shrink-0" />
          {item.label}
        </span>
        <ChevronDown size={12} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-0.5 ml-[1.1rem] pl-3 border-l-2 border-gray-100 space-y-0.5 py-0.5">
              {item.children.map(child => (
                <NavLink key={child.key} to={child.path} onClick={onNavigate}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11.5px] font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-brand-blue/[0.08] text-brand-blue font-semibold'
                        : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100/60'
                    }`}
                >
                  {({ isActive }) => (
                    <>
                      <child.icon size={13} className="shrink-0" />
                      <span className="flex-1">{child.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Sidebar (light, Corelystic-style) ───────────────────────────────────────
const Sidebar = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => { await logout(); navigate('/', { replace: true }); };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-100">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-[64px] border-b border-gray-100 flex-shrink-0">
        <Link to="/" onClick={onNavigate} className="flex items-center gap-2.5 group flex-1 min-w-0">
          <div className="w-8 h-8 rounded-lg grad-blue flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-white font-black text-[13px]">IW</span>
          </div>
          <div className="min-w-0">
            <p className="text-gray-900 font-black text-[15px] leading-none tracking-tight">INDIWA</p>
            <p className="text-gray-400 text-[9px] font-semibold uppercase tracking-[0.15em] mt-0.5">Member Portal</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <p className="text-[9.5px] font-black uppercase tracking-[0.25em] text-gray-400 px-3 mb-2">Main Navigation</p>
        {NAV.map(item => <NavItem key={item.key} item={item} onNavigate={onNavigate} />)}
      </nav>

      {/* Bottom section */}
      <div className="px-3 border-t border-gray-100 flex-shrink-0">
        <div className="py-2 space-y-0.5">
          <Link to="/" onClick={onNavigate}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100/70 text-[12.5px] font-medium transition-all"
          >
            <HelpCircle size={15} /> Help Center
          </Link>
          <Link to="/dashboard/profile/security-pin" onClick={onNavigate}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100/70 text-[12.5px] font-medium transition-all"
          >
            <Settings size={15} /> Settings
          </Link>
        </div>

        {/* User profile (Corelystic-style bottom card) */}
        <div className="py-3 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-100/60 transition-colors cursor-pointer group">
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-full grad-blue flex items-center justify-center font-black text-white text-[13px] shadow-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                user?.status === 'active' ? 'bg-emerald-400' : 'bg-yellow-400'
              }`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-gray-800 font-semibold text-[12px] truncate leading-none">{user?.name || 'Member'}</p>
              <p className="text-gray-400 text-[10px] font-mono mt-0.5 truncate">{user?.member_id}</p>
            </div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition-colors flex-shrink-0 p-1 rounded-lg hover:bg-red-50">
              <LogOut size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Dashboard Layout ─────────────────────────────────────────────────────────
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  React.useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  const crumbs   = BREADCRUMBS[location.pathname] || [{ label: 'Dashboard' }];
  const pageTitle = crumbs[crumbs.length - 1]?.label;

  return (
    <div className="min-h-screen flex" style={{ background: '#f4f6fb' }}>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-[220px] xl:w-[240px] flex-shrink-0 fixed inset-y-0 left-0 z-40">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 left-0 z-50 w-[220px] lg:hidden shadow-2xl"
            >
              <Sidebar onNavigate={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main area */}
      <main className="flex-1 lg:ml-[220px] xl:ml-[240px] min-h-screen flex flex-col">

        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 h-[64px] flex items-center px-6 gap-4"
          style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>

          {/* Mobile hamburger */}
          <button onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors flex-shrink-0"
          >
            <Menu size={18} />
          </button>

          {/* Breadcrumb */}
          <nav className="hidden sm:flex items-center gap-1.5 text-[11.5px] flex-1 min-w-0">
            <Link to="/dashboard" className="text-gray-400 hover:text-brand-blue transition-colors flex-shrink-0">
              <Home size={14} />
            </Link>
            {crumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                <ChevronRight size={11} className="text-gray-300 flex-shrink-0" />
                <span className={`truncate ${i === crumbs.length - 1 ? 'text-gray-700 font-semibold' : 'text-gray-400'}`}>
                  {crumb.label}
                </span>
              </React.Fragment>
            ))}
          </nav>

          {/* Right: Search + bell + user */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 text-gray-400 hover:bg-gray-200 transition-colors cursor-pointer">
              <Search size={14} />
              <span className="text-[12px] text-gray-400 w-24">Search...</span>
              <span className="text-[10px] text-gray-300 font-mono bg-gray-200 px-1.5 py-0.5 rounded">⌘F</span>
            </div>
            <button className="relative w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-blue border-2 border-white" />
            </button>
            <div className="flex items-center gap-2.5 pl-3 border-l border-gray-100 ml-1">
              <div className="w-8 h-8 rounded-full grad-blue flex items-center justify-center text-white font-black text-[12px] shadow-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="hidden sm:block">
                <p className="text-[12px] font-semibold text-gray-800 leading-none">{user?.name?.split(' ')[0]}</p>
                <p className="text-[10px] font-mono text-gray-400 mt-0.5">{user?.member_id}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-5 lg:p-6">
          {/* Page title */}
          <div className="mb-5">
            <h1 className="text-[17px] font-semibold tracking-tight text-gray-900 leading-none">{pageTitle}</h1>
            <p className="text-[11.5px] font-medium text-gray-400 mt-1">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
