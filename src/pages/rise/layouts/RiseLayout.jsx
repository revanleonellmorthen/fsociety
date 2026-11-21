import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, ClipboardList, CalendarDays,
  UserCheck, FileText, Users, Bell, Menu, X,
  ChevronRight, GraduationCap, User,
} from 'lucide-react';
import { student } from '../data/student';
import '../styles/rise.css';

const navItems = [
  {
    section: 'Main',
    links: [
      { to: '/',              label: 'Overview',            icon: LayoutDashboard },
    ],
  },
  {
    section: 'Learning',
    links: [
      { to: '/courses',       label: 'Courses',             icon: BookOpen },
      { to: '/assignments',   label: 'Assignments',         icon: ClipboardList },
      { to: '/schedule',      label: 'Class Schedule',      icon: CalendarDays },
      { to: '/attendance',    label: 'Attendance',           icon: UserCheck },
      { to: '/materials',     label: 'Learning Materials',  icon: FileText },
    ],
  },
  {
    section: 'Collaboration',
    links: [
      { to: '/groups',        label: 'Group Workspace',     icon: Users },
    ],
  },
];

const pageLabels = {
  '/':              'Overview',
  '/courses':       'Courses',
  '/assignments':   'Assignments',
  '/schedule':      'Class Schedule',
  '/attendance':    'Attendance',
  '/materials':     'Learning Materials',
  '/groups':        'Group Workspace',
};

export default function RiseLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  const currentPath = location.pathname;
  const pageLabel = pageLabels[currentPath] || 
    (currentPath.startsWith('/courses/') ? 'Course Detail' :
     currentPath.startsWith('/assignments/') ? 'Assignment Detail' : 'RISE');
  
  const breadcrumbParts = currentPath === '/' ? [] : (() => {
    if (currentPath.startsWith('/courses/')) return ['Courses', 'Detail'];
    if (currentPath.startsWith('/assignments/')) return ['Assignments', 'Detail'];
    return [];
  })();

  const initials = student.name.split(' ').slice(0, 2).map(w => w[0]).join('');

  const notifications = [
    { id: 1, text: 'Assignment "Implementasi Binary Search Tree" deadline tomorrow', time: '2 hours ago', unread: true },
    { id: 2, text: 'New material uploaded for Basis Data', time: '5 hours ago', unread: true },
    { id: 3, text: 'Group Alpha: Rina completed her task', time: '1 day ago', unread: false },
  ];

  return (
    <div className={`rise-container ${collapsed ? 'rise-sidebar-collapsed-container' : ''}`}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="rise-mobile-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`rise-sidebar ${collapsed ? 'rise-sidebar-collapsed' : ''} ${mobileOpen ? 'rise-sidebar-open' : ''}`}>
        {/* Brand */}
        <div className="rise-sidebar-brand">
          <div className="rise-sidebar-brand-icon">
            <GraduationCap size={18} />
          </div>
          {!collapsed && (
            <div className="rise-sidebar-brand-text">
              <h2>Cakrawala</h2>
              <span>RISE</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="rise-sidebar-nav">
          {navItems.map((section) => (
            <div key={section.section}>
              {!collapsed && (
                <div className="rise-nav-section-label">{section.section}</div>
              )}
              {section.links.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `rise-nav-link${isActive ? ' active' : ''}`
                    }
                    onClick={() => setMobileOpen(false)}
                    title={collapsed ? link.label : undefined}
                  >
                    <Icon size={16} />
                    {!collapsed && (
                      <span className="rise-nav-link-label">{link.label}</span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer user */}
        <div className="rise-sidebar-footer">
          <div className="rise-sidebar-user">
            <div className="rise-sidebar-avatar">{initials}</div>
            {!collapsed && (
              <div className="rise-sidebar-user-info">
                <p>{student.nickname || student.name.split(' ')[0]}</p>
                <span>{student.id}</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="rise-main">
        {/* Top bar */}
        <header className="rise-topbar">
          <div className="rise-topbar-left">
            <button
              className="rise-topbar-toggle"
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

            <div className="rise-topbar-breadcrumb">
              <span>RISE</span>
              <ChevronRight size={12} className="rise-topbar-breadcrumb-sep" />
              {breadcrumbParts.length > 0 ? (
                <>
                  {breadcrumbParts.map((part, i) => (
                    <span key={i}>
                      {i > 0 && <ChevronRight size={12} className="rise-topbar-breadcrumb-sep" style={{ display: 'inline', margin: '0 4px' }} />}
                      <span className={i === breadcrumbParts.length - 1 ? '' : ''}>{part}</span>
                    </span>
                  ))}
                </>
              ) : (
                <span>{pageLabel}</span>
              )}
            </div>
          </div>

          <div className="rise-topbar-right">
            <div className="rise-topbar-semester-pill">
              <CalendarDays size={12} />
              Semester {student.activeSemester} · {student.activeAcademicYear}
            </div>
            <div style={{ position: 'relative' }}>
              <button 
                className="rise-topbar-icon-btn" 
                aria-label="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={15} />
                <span className="rise-topbar-badge">3</span>
              </button>
              {showNotifications && (
                <div className="rise-notification-dropdown">
                  <div className="rise-notification-header">
                    <span>Notifications</span>
                    <button onClick={() => setShowNotifications(false)}>
                      <X size={14} />
                    </button>
                  </div>
                  {notifications.map((n) => (
                    <div key={n.id} className={`rise-notification-item ${n.unread ? 'rise-notification-unread' : ''}`}>
                      <p>{n.text}</p>
                      <span>{n.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="rise-topbar-icon-btn" aria-label="Profile">
              <User size={15} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="rise-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
