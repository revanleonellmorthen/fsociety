import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  ExternalLink, 
  ChevronDown, 
  LayoutDashboard, 
  BookOpen, 
  Compass, 
  LogOut, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useRouter, Link } from '../../app/router';
import { studentProfile, mockNotifications } from '../../shared/data/mockData';
import { Avatar, Badge, Button } from '../ui';
import './layout.css';

export const Navbar = ({ onToggleMobileSidebar, onOpenSearch, onOpenNotifications }) => {
  const { currentPath, navigate } = useRouter();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getModuleMeta = () => {
    if (currentPath.startsWith('/rise')) {
      return { title: 'RISE LMS', variant: 'primary', buttonLabel: 'Akses TRACK', buttonTarget: '/track' };
    }
    if (currentPath.startsWith('/track')) {
      return { title: 'TRACK SIAKAD', variant: 'neutral', buttonLabel: 'Akses RISE', buttonTarget: '/rise' };
    }
    return { title: 'BERANDA', variant: 'neutral', buttonLabel: 'Akses RISE', buttonTarget: '/rise' };
  };

  const moduleMeta = getModuleMeta();

  return (
    <header className="cw-navbar">
      {/* Left section: mobile hamburger & title info */}
      <div className="cw-navbar__left">
        <button
          type="button"
          className="cw-navbar__mobile-toggle"
          onClick={onToggleMobileSidebar}
          aria-label="Buka menu navigasi"
        >
          <Menu size={20} color="var(--color-dark-teal)" />
        </button>

        <div className="cw-navbar__title-group">
          <Badge variant={moduleMeta.variant} size="sm">
            {moduleMeta.title}
          </Badge>
        </div>
      </div>

      {/* Center: Global Module Navigation */}
      <nav className="cw-navbar__nav-links" aria-label="Navigasi Utama Cakrawala">
        <Link
          to="/"
          className={`cw-navbar__nav-link ${currentPath === '/' ? 'cw-navbar__nav-link--active' : ''}`}
        >
          <LayoutDashboard size={15} />
          <span>Home</span>
        </Link>
        <Link
          to="/rise"
          className={`cw-navbar__nav-link ${currentPath.startsWith('/rise') ? 'cw-navbar__nav-link--active' : ''}`}
        >
          <BookOpen size={15} />
          <span>RISE LMS</span>
        </Link>
        <Link
          to="/track"
          className={`cw-navbar__nav-link ${currentPath.startsWith('/track') ? 'cw-navbar__nav-link--active' : ''}`}
        >
          <Compass size={15} />
          <span>TRACK SIAKAD</span>
        </Link>
      </nav>

      {/* Right controls: Search, Quick Action, Notif, Profile */}
      <div className="cw-navbar__right">
        {/* Quick Search Trigger */}
        <button
          type="button"
          className="cw-navbar__search-trigger"
          onClick={onOpenSearch}
          title="Cari mata kuliah atau tugas"
        >
          <Search size={14} color="var(--color-secondary-text)" />
          <span>Cari...</span>
          <kbd className="cw-navbar__search-shortcut">⌘K</kbd>
        </button>

        {/* Quick Module Switcher Button */}
        <Button
          variant="outline"
          size="sm"
          rightIcon={<ExternalLink size={13} />}
          onClick={() => navigate(moduleMeta.buttonTarget)}
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-dark-teal)' }}
        >
          {moduleMeta.buttonLabel}
        </Button>

        {/* Notification Bell */}
        <button
          type="button"
          className="cw-navbar__icon-btn"
          onClick={onOpenNotifications}
          aria-label={`Notifikasi (${unreadCount} belum dibaca)`}
          title="Notifikasi Akademik"
        >
          <Bell size={18} color="var(--color-secondary-text)" />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '7px',
                right: '7px',
                width: '7px',
                height: '7px',
                backgroundColor: 'var(--color-gold)',
                borderRadius: '50%'
              }}
            />
          )}
        </button>

        {/* User Profile Menu */}
        <div style={{ position: 'relative' }} ref={profileRef}>
          <button
            type="button"
            className="cw-navbar__profile-btn"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            aria-expanded={isProfileMenuOpen}
            aria-haspopup="true"
          >
            <Avatar
              src="/assets/images/avatar-arya.svg"
              name={studentProfile.name}
              size="sm"
              status="online"
            />
            <div className="cw-navbar__profile-info">
              <span className="cw-navbar__profile-name">{studentProfile.name}</span>
              <span className="cw-navbar__profile-nim">{studentProfile.nim}</span>
            </div>
            <ChevronDown size={14} color="var(--color-secondary-text)" />
          </button>

          {/* Profile Dropdown Popup */}
          {isProfileMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '270px',
                backgroundColor: 'var(--color-bg-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-dropdown)',
                padding: 'var(--spacing-3)',
                zIndex: 'var(--z-dropdown)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-3)',
                  padding: 'var(--spacing-2) var(--spacing-2) var(--spacing-3)',
                  borderBottom: '1px solid var(--color-border-subtle)'
                }}
              >
                <Avatar
                  src="/assets/images/avatar-arya.svg"
                  name={studentProfile.name}
                  size="md"
                  status="online"
                />
                <div style={{ overflow: 'hidden' }}>
                  <p className="font-semibold text-xs truncate text-main">{studentProfile.name}</p>
                  <p className="text-2xs text-muted truncate">{studentProfile.program}</p>
                  <Badge variant="accent" size="sm" style={{ marginTop: '4px' }}>
                    {studentProfile.activeSemester}
                  </Badge>
                </div>
              </div>

              <div style={{ padding: 'var(--spacing-2) 0' }}>
                <a
                  href="/track#krs"
                  onClick={(e) => { e.preventDefault(); navigate('/track#krs'); setIsProfileMenuOpen(false); }}
                  className="flex items-center gap-2"
                  style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '12px',
                    color: 'var(--color-text-body)',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-light-neutral)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <ShieldCheck size={15} color="var(--color-dark-teal)" />
                  <span>Rencana Studi (KRS)</span>
                </a>

                <a
                  href="/rise#assignments"
                  onClick={(e) => { e.preventDefault(); navigate('/rise#assignments'); setIsProfileMenuOpen(false); }}
                  className="flex items-center gap-2"
                  style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '12px',
                    color: 'var(--color-text-body)',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-light-neutral)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <CheckCircle2 size={15} color="var(--color-dark-teal)" />
                  <span>Tugas & Aktivitas Belajar (RISE)</span>
                </a>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => {
                    alert('Sesi demo Cakrawala. Akun mahasiswa aktif: Arya Panji Vici Ayanda.');
                    setIsProfileMenuOpen(false);
                  }}
                  className="flex items-center gap-2"
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '12px',
                    color: 'var(--color-danger-600)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-danger-50)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <LogOut size={15} />
                  <span>Keluar Akun Mahasiswa</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
