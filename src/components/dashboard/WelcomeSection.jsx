import React from 'react';
import { Calendar, Sparkles, BookOpen, Clock, CheckCircle2 } from 'lucide-react';
import { studentProfile, upcomingAssignments } from '../../shared/data/mockData';

export const WelcomeSection = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  const pendingCount = upcomingAssignments.filter(a => a.status !== 'submitted').length;

  return (
    <header className="cw-welcome-section">
      <div className="cw-welcome-content">
        {/* Top Meta Tag: Current Date & Active Semester */}
        <div className="cw-welcome-meta">
          <div className="cw-date-badge">
            <Calendar size={13} color="var(--color-gold)" />
            <span>Sabtu, 21 November 2026</span>
          </div>
          <span className="cw-meta-divider">•</span>
          <span className="cw-semester-tag">
            {studentProfile.activeSemester} ({studentProfile.academicYear})
          </span>
        </div>

        {/* Personalized Welcoming Heading */}
        <h1 className="cw-welcome-title">
          {getGreeting()}, <span className="cw-highlight-name">{studentProfile.name}</span>
        </h1>

        {/* Concise Welcoming Description */}
        <p className="cw-welcome-desc">
          Selamat datang kembali di Cakrawala. Berikut adalah ringkasan tugas yang perlu kamu selesaikan, perkuliahan hari ini, pengumuman terbaru, dan status administrasi studimu.
        </p>

        {/* Glance Highlights */}
        <div className="cw-glance-bar">
          <div className="cw-glance-item">
            <span className="cw-glance-dot cw-glance-dot--gold" />
            <span><strong>{pendingCount} tugas</strong> belum diselesaikan</span>
          </div>
          <div className="cw-glance-item">
            <span className="cw-glance-dot cw-glance-dot--teal" />
            <span><strong>1 sesi kuliah</strong> terjadwal hari ini</span>
          </div>
          <div className="cw-glance-item">
            <span className="cw-glance-dot cw-glance-dot--green" />
            <span>Tagihan UKT semester ini <strong>Lunas</strong></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default WelcomeSection;
