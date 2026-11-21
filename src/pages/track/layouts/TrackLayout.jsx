import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, FileText, GraduationCap,
  CreditCard, UserCheck, Route, Bell, Menu, X,
  ChevronRight, Calendar, User,
} from 'lucide-react';
import { student } from '../data/mockData';
import '../styles/track.css';

const navItems = [
  {
    section: 'Utama',
    links: [
      { to: '/',              label: 'Overview',         icon: LayoutDashboard },
    ],
  },
  {
    section: 'Perkuliahan',
    links: [
      { to: '/krs',           label: 'KRS',              icon: BookOpen },
      { to: '/khs',           label: 'KHS',              icon: FileText },
      { to: '/academic-journey', label: 'Perjalanan Akademik', icon: Route },
      { to: '/academic-records', label: 'Riwayat Akademik',   icon: GraduationCap },
    ],
  },
  {
    section: 'Administrasi',
    links: [
      { to: '/billing',       label: 'Tagihan',          icon: CreditCard },
      { to: '/admissions',    label: 'Penerimaan',       icon: UserCheck },
    ],
  },
];

const pageLabels = {
  '/':                   'Overview',
  '/krs':               'KRS',
  '/khs':               'KHS',
  '/academic-journey':  'Perjalanan Akademik',
  '/academic-records':  'Riwayat Akademik',
  '/billing':           'Tagihan',
  '/admissions':        'Penerimaan',
};

export default function TrackLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const pageLabel = pageLabels[location.pathname] || 'TRACK';
  const initials = student.name.split(' ').slice(0, 2).map(w => w[0]).join('');

  return (
    <div className={`track-container ${collapsed ? 'track-sidebar-collapsed-container' : ''}`}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
            zIndex: 150, display: 'block',
          }}
        />
      )}

      {/* Sidebar */}
      <aside className={`track-sidebar ${collapsed ? 'track-sidebar-collapsed' : ''} ${mobileOpen ? 'track-sidebar-open' : ''}`}>
        {/* Brand */}
        <div className="track-sidebar-brand">
          <div className="track-sidebar-brand-icon">
            <GraduationCap size={18} />
          </div>
          {!collapsed && (
            <div className="track-sidebar-brand-text">
              <h2>Cakrawala</h2>
              <span>TRACK</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="track-sidebar-nav">
          {navItems.map((section) => (
            <div key={section.section}>
              {!collapsed && (
                <div className="track-nav-section-label">{section.section}</div>
              )}
              {section.links.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `track-nav-link${isActive ? ' active' : ''}`
                    }
                    onClick={() => setMobileOpen(false)}
                    title={collapsed ? link.label : undefined}
                  >
                    <Icon size={16} />
                    {!collapsed && (
                      <span className="track-nav-link-label">{link.label}</span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer user */}
        <div className="track-sidebar-footer">
          <div className="track-sidebar-user">
            <div className="track-sidebar-avatar">{initials}</div>
            {!collapsed && (
              <div className="track-sidebar-user-info">
                <p>{student.nickname || student.name.split(' ')[0]}</p>
                <span>{student.id}</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="track-main">
        {/* Top bar */}
        <header className="track-topbar">
          <div className="track-topbar-left">
            <button
              className="track-topbar-toggle"
              onClick={() => {
                if (window.innerWidth <= 768) {
                  setMobileOpen(!mobileOpen);
                } else {
                  setCollapsed(!collapsed);
                }
              }}
              aria-label="Toggle sidebar"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>

            <div className="track-topbar-breadcrumb">
              <span>TRACK</span>
              <ChevronRight size={12} className="track-topbar-breadcrumb-sep" />
              <span>{pageLabel}</span>
            </div>
          </div>

          <div className="track-topbar-right">
            <div className="track-topbar-semester-pill">
              <Calendar size={12} />
              Semester {student.activeSemester} · {student.activeAcademicYear}
            </div>
            <button className="track-topbar-icon-btn" aria-label="Notifikasi">
              <Bell size={15} />
              <span className="track-topbar-badge">3</span>
            </button>
            <button className="track-topbar-icon-btn" aria-label="Profil">
              <User size={15} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="track-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
