import React from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Calendar, 
  FileCheck2, 
  Award, 
  CreditCard, 
  BookOpen, 
  CheckSquare, 
  MessageSquare, 
  ClipboardEdit, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useRouter } from '../../app/router';
import { studentProfile } from '../../shared/data/mockData';
import './layout.css';

export const Sidebar = ({ isCollapsed, onToggleCollapse, isMobileOpen, onCloseMobile }) => {
  const { currentPath, currentHash, navigate } = useRouter();

  const handleNavClick = (path) => {
    navigate(path);
    if (isMobileOpen && onCloseMobile) {
      onCloseMobile();
    }
  };

  const isItemActive = (path) => {
    if (path === '/') return currentPath === '/' && !currentHash;
    const [itemPath, itemHash] = path.split('#');
    if (itemHash) {
      return currentPath === itemPath && currentHash === `#${itemHash}`;
    }
    return currentPath === itemPath;
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="cw-modal-overlay" 
          onClick={onCloseMobile}
          style={{ zIndex: 'calc(var(--z-sticky) - 1)' }}
        />
      )}

      <aside
        className={`cw-sidebar ${isCollapsed ? 'cw-sidebar--collapsed' : ''} ${
          isMobileOpen ? 'cw-sidebar--mobile-open' : ''
        }`}
        aria-label="Sidebar Navigasi Kampus"
      >
        {/* Sidebar Header: Logo & Collapse Button */}
        <div className="cw-sidebar__header">
          <div 
            className="cw-sidebar__logo-link"
            onClick={() => handleNavClick('/')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src="/assets/logos/cakrawala-icon.svg"
              alt="Cakrawala University"
              className="cw-sidebar__logo-icon"
            />
            {!isCollapsed && (
              <div className="cw-sidebar__logo-text">
                <span className="cw-sidebar__brand-name">CAKRAWALA</span>
                <span className="cw-sidebar__role-tag">MAHASISWA</span>
              </div>
            )}
          </div>

          <button
            type="button"
            className="cw-sidebar__collapse-btn"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
            title={isCollapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Sidebar Navigation Items */}
        <div className="cw-sidebar__nav">
          {/* Section: UTAMA */}
          <div className="cw-sidebar__section">
            {!isCollapsed && <span className="cw-sidebar__section-title">Utama</span>}
            <button
              type="button"
              className={`cw-sidebar__item ${isItemActive('/') ? 'cw-sidebar__item--active' : ''}`}
              onClick={() => handleNavClick('/')}
              title="Dashboard"
            >
              <span className="cw-sidebar__item-icon">
                <LayoutDashboard size={18} />
              </span>
              {!isCollapsed && <span className="cw-sidebar__item-text">Dashboard</span>}
            </button>
          </div>

          {/* Section: AKADEMIK (TRACK) */}
          <div className="cw-sidebar__section">
            {!isCollapsed && <span className="cw-sidebar__section-title">Akademik (TRACK)</span>}
            
            <button
              type="button"
              className={`cw-sidebar__item ${currentPath.startsWith('/track') ? 'cw-sidebar__item--active' : ''}`}
              onClick={() => handleNavClick('/track')}
              title="Jadwal Kuliah"
            >
              <span className="cw-sidebar__item-icon">
                <CalendarDays size={18} />
              </span>
              {!isCollapsed && <span className="cw-sidebar__item-text">Jadwal Kuliah</span>}
            </button>

            <button
              type="button"
              className={`cw-sidebar__item ${currentPath.startsWith('/track') ? 'cw-sidebar__item--active' : ''}`}
              onClick={() => handleNavClick('/track')}
              title="Kalender Akademik"
            >
              <span className="cw-sidebar__item-icon">
                <Calendar size={18} />
              </span>
              {!isCollapsed && <span className="cw-sidebar__item-text">Kalender Akademik</span>}
            </button>

            <button
              type="button"
              className={`cw-sidebar__item ${currentPath.startsWith('/track') ? 'cw-sidebar__item--active' : ''}`}
              onClick={() => handleNavClick('/track')}
              title="Rencana Studi (KRS)"
            >
              <span className="cw-sidebar__item-icon">
                <FileCheck2 size={18} />
              </span>
              {!isCollapsed && <span className="cw-sidebar__item-text">Rencana Studi (KRS)</span>}
            </button>

            <button
              type="button"
              className={`cw-sidebar__item ${currentPath.startsWith('/track') ? 'cw-sidebar__item--active' : ''}`}
              onClick={() => handleNavClick('/track')}
              title="Hasil Studi (KHS)"
            >
              <span className="cw-sidebar__item-icon">
                <Award size={18} />
              </span>
              {!isCollapsed && <span className="cw-sidebar__item-text">Hasil Studi (KHS)</span>}
            </button>

            <button
              type="button"
              className={`cw-sidebar__item ${currentPath.startsWith('/track') ? 'cw-sidebar__item--active' : ''}`}
              onClick={() => handleNavClick('/track')}
              title="Tagihan UKT"
            >
              <span className="cw-sidebar__item-icon">
                <CreditCard size={18} />
              </span>
              {!isCollapsed && <span className="cw-sidebar__item-text">Tagihan UKT</span>}
            </button>
          </div>

          {/* Section: PEMBELAJARAN (RISE) */}
          <div className="cw-sidebar__section">
            {!isCollapsed && <span className="cw-sidebar__section-title">Pembelajaran (RISE)</span>}

            <button
              type="button"
              className={`cw-sidebar__item ${currentPath.startsWith('/rise') ? 'cw-sidebar__item--active' : ''}`}
              onClick={() => handleNavClick('/rise')}
              title="Kursus Aktif"
            >
              <span className="cw-sidebar__item-icon">
                <BookOpen size={18} />
              </span>
              {!isCollapsed && <span className="cw-sidebar__item-text">Kursus Aktif</span>}
            </button>

            <button
              type="button"
              className={`cw-sidebar__item ${currentPath.startsWith('/rise') ? 'cw-sidebar__item--active' : ''}`}
              onClick={() => handleNavClick('/rise')}
              title="Tugas & Kuis"
            >
              <span className="cw-sidebar__item-icon">
                <CheckSquare size={18} />
              </span>
              {!isCollapsed && (
                <>
                  <span className="cw-sidebar__item-text">Tugas & Kuis</span>
                  <span className="cw-sidebar__badge">3</span>
                </>
              )}
            </button>

            <button
              type="button"
              className={`cw-sidebar__item ${currentPath.startsWith('/rise') ? 'cw-sidebar__item--active' : ''}`}
              onClick={() => handleNavClick('/rise')}
              title="Forum Diskusi"
            >
              <span className="cw-sidebar__item-icon">
                <MessageSquare size={18} />
              </span>
              {!isCollapsed && <span className="cw-sidebar__item-text">Forum Diskusi</span>}
            </button>
          </div>

          {/* Section: LAYANAN */}
          <div className="cw-sidebar__section">
            {!isCollapsed && <span className="cw-sidebar__section-title">Layanan</span>}

            <button
              type="button"
              className={`cw-sidebar__item ${isItemActive('/track#kuisioner') ? 'cw-sidebar__item--active' : ''}`}
              onClick={() => handleNavClick('/track#kuisioner')}
              title="Kuisioner Dosen"
            >
              <span className="cw-sidebar__item-icon">
                <ClipboardEdit size={18} />
              </span>
              {!isCollapsed && <span className="cw-sidebar__item-text">Kuisioner</span>}
            </button>

            <button
              type="button"
              className={`cw-sidebar__item ${isItemActive('/help') ? 'cw-sidebar__item--active' : ''}`}
              onClick={() => {
                alert('Pusat Bantuan Mahasiswa Cakrawala (Helpdesk TI: helpdesk@cakrawala.ac.id)');
              }}
              title="Bantuan & Dukungan"
            >
              <span className="cw-sidebar__item-icon">
                <HelpCircle size={18} />
              </span>
              {!isCollapsed && <span className="cw-sidebar__item-text">Bantuan</span>}
            </button>
          </div>
        </div>

        {/* Sidebar Footer: Active Semester Snapshot */}
        {!isCollapsed && (
          <div className="cw-sidebar__footer">
            <div className="cw-sidebar__student-card">
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-success-500)',
                  flexShrink: 0
                }}
              />
              <div style={{ overflow: 'hidden' }}>
                <p className="font-semibold text-xs truncate">{studentProfile.activeSemester}</p>
                <p className="text-2xs text-muted truncate">{studentProfile.academicYear}</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
