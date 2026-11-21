import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  Bell, 
  BookOpen, 
  GraduationCap, 
  Calendar 
} from 'lucide-react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useRouter } from '../../app/router';
import { mockNotifications, activeCourses, upcomingAssignments } from '../../shared/data/mockData';
import { Modal, Badge, Button } from '../ui';
import './layout.css';

export const AppLayout = ({ children }) => {
  const { navigate } = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Keyboard shortcut Ctrl+K / Cmd+K for quick search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter search results
  const searchResults = searchQuery.trim() === '' ? [] : [
    ...activeCourses.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(c => ({
      id: c.id,
      title: c.name,
      subtitle: `${c.code} • ${c.sks} SKS • ${c.lecturer}`,
      module: 'RISE',
      link: '/rise#courses',
      icon: <BookOpen size={16} />
    })),
    ...upcomingAssignments.filter(a => 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(a => ({
      id: a.id,
      title: a.title,
      subtitle: `${a.courseName} • Deadline: ${a.deadlineLabel}`,
      module: 'RISE',
      link: '/rise#assignments',
      icon: <GraduationCap size={16} />
    }))
  ];

  return (
    <div className="cw-layout">
      {/* Shared Global Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Container */}
      <div className={`cw-main-shell ${isSidebarCollapsed ? 'cw-main-shell--collapsed' : ''}`}>
        {/* Shared Global Navbar */}
        <Navbar
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
        />

        {/* Dynamic Page Content */}
        <div className="cw-page-content">
          {children}
        </div>
      </div>

      {/* Quick Search Modal (Cmd+K) */}
      <Modal
        isOpen={isSearchOpen}
        onClose={() => { setIsSearchOpen(false); setSearchQuery(''); }}
        title="Pencarian Cepat Cakrawala"
        subtitle="Cari mata kuliah, penugasan, atau jadwal"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              padding: '10px 14px',
              border: '1px solid var(--color-dark-teal)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-bg-surface)'
            }}
          >
            <Search size={18} color="var(--color-dark-teal)" />
            <input
              type="text"
              autoFocus
              placeholder="Ketik nama mata kuliah, tugas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-main)',
                background: 'transparent'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{ cursor: 'pointer', color: 'var(--color-text-muted)' }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {searchQuery.trim() === '' ? (
            <div style={{ padding: 'var(--spacing-3) 0' }}>
              <p className="text-2xs text-muted" style={{ marginBottom: 'var(--spacing-2)', fontWeight: 600, letterSpacing: '0.05em' }}>
                PINTASAN POPULER
              </p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="flex items-center justify-between p-2 rounded text-left"
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-light-neutral)',
                    cursor: 'pointer'
                  }}
                  onClick={() => { navigate('/track#jadwal'); setIsSearchOpen(false); }}
                >
                  <div className="flex items-center gap-2 text-xs font-medium text-main">
                    <Calendar size={15} color="var(--color-dark-teal)" />
                    <span>Jadwal Kuliah Semester Ini</span>
                  </div>
                  <Badge variant="neutral" size="sm">TRACK</Badge>
                </button>

                <button
                  type="button"
                  className="flex items-center justify-between p-2 rounded text-left"
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-light-neutral)',
                    cursor: 'pointer'
                  }}
                  onClick={() => { navigate('/rise#assignments'); setIsSearchOpen(false); }}
                >
                  <div className="flex items-center gap-2 text-xs font-medium text-main">
                    <GraduationCap size={15} color="var(--color-dark-teal)" />
                    <span>Tugas Besar Milestone 2 (WAD)</span>
                  </div>
                  <Badge variant="accent" size="sm">Hari ini</Badge>
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
              {searchResults.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--color-text-muted)' }}>
                  <p className="text-xs">Tidak ditemukan hasil untuk "{searchQuery}"</p>
                </div>
              ) : (
                searchResults.map(item => (
                  <div
                    key={item.id}
                    onClick={() => {
                      navigate(item.link);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg-surface)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div style={{ color: 'var(--color-dark-teal)' }}>{item.icon}</div>
                      <div>
                        <p className="text-xs font-semibold text-main">{item.title}</p>
                        <p className="text-2xs text-muted">{item.subtitle}</p>
                      </div>
                    </div>
                    <Badge variant="neutral" size="sm">
                      {item.module}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </Modal>

      {/* Notifications Modal */}
      <Modal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        title="Notifikasi Akademik"
        subtitle="Pemberitahuan resmi dari sistem RISE & TRACK"
        footer={
          <div className="flex justify-between items-center w-full">
            <span className="text-2xs text-muted">
              {mockNotifications.length} pemberitahuan terbaru
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                alert('Semua notifikasi ditandai telah dibaca.');
                setIsNotificationsOpen(false);
              }}
            >
              Tandai Telah Dibaca
            </Button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
          {mockNotifications.map(notif => (
            <div
              key={notif.id}
              onClick={() => {
                navigate(notif.link);
                setIsNotificationsOpen(false);
              }}
              style={{
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                backgroundColor: notif.read ? 'var(--color-bg-surface)' : 'var(--color-light-neutral)',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <div className="flex justify-between items-start" style={{ marginBottom: '4px' }}>
                <div className="flex items-center gap-2">
                  <Badge variant={notif.source === 'RISE' ? 'primary' : 'neutral'} size="sm">
                    {notif.source}
                  </Badge>
                  <span className="font-semibold text-xs text-main">{notif.title}</span>
                </div>
                <span className="text-2xs text-muted">{notif.time}</span>
              </div>
              <p className="text-xs text-muted" style={{ lineHeight: 1.45 }}>
                {notif.message}
              </p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default AppLayout;
