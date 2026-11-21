import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Video, 
  User, 
  ExternalLink, 
  Copy, 
  Check, 
  Calendar,
  Coffee,
  ArrowUpRight 
} from 'lucide-react';
import { weeklySchedule } from '../../shared/data/mockData';
import { useRouter } from '../../app/router';

export const TodayScheduleSection = () => {
  const { navigate } = useRouter();
  
  // Default to today: 'Sabtu'
  const [currentDay, setCurrentDay] = useState('Sabtu');
  const [copiedId, setCopiedId] = useState(null);

  const classesToday = weeklySchedule[currentDay] || [];

  const handleCopyLink = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="cw-section-block" aria-labelledby="today-schedule-heading">
      <div className="cw-section-header-clean">
        <div>
          <div className="cw-header-title-row">
            <h2 id="today-schedule-heading" className="cw-section-title">
              Jadwal Kuliah Hari Ini
            </h2>
            <span className="cw-day-pill">
              <Calendar size={12} color="var(--color-dark-teal)" />
              {currentDay}, 21 November 2026
            </span>
          </div>
          <p className="cw-section-subtitle">
            Informasi kelas, ruang perkuliahan, dan akses Zoom perkuliahan terjadwal hari ini
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/track#jadwal')}
          className="cw-text-link"
        >
          <span>Jadwal Lengkap di TRACK</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Unobtrusive Day Preview Selector */}
      <div className="cw-day-selector-clean">
        <span className="cw-day-selector-label">Lihat Hari:</span>
        {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setCurrentDay(d)}
            className={`cw-day-btn ${d === currentDay ? 'cw-day-btn--active' : ''}`}
          >
            {d} {d === 'Sabtu' && <span className="cw-badge-today">Hari Ini</span>}
          </button>
        ))}
      </div>

      {/* Classes list or thoughtful empty state */}
      {classesToday.length === 0 ? (
        <div className="cw-empty-state-clean">
          <div className="cw-empty-icon-circle">
            <Coffee size={28} color="var(--color-gold)" />
          </div>
          <h3 className="cw-empty-title">Tidak Ada Perkuliahan Hari {currentDay}</h3>
          <p className="cw-empty-desc">
            Hari ini tidak ada sesi kuliah tatap muka maupun daring yang terjadwal. Manfaatkan waktu ini untuk beristirahat, membaca materi, atau menyelesaikan tugas mandiri.
          </p>
        </div>
      ) : (
        <div className="cw-schedule-list">
          {classesToday.map((item) => (
            <div key={item.id} className="cw-schedule-item">
              {/* Time block */}
              <div className="cw-schedule-timebox">
                <Clock size={14} color="var(--color-dark-teal)" />
                <span className="cw-time-text">{item.time}</span>
                <span className="cw-session-type">{item.type}</span>
              </div>

              {/* Course & Location Details */}
              <div className="cw-schedule-main">
                <div className="cw-schedule-code-row">
                  <span className="cw-schedule-code">{item.courseCode}</span>
                  {item.isOnline ? (
                    <span className="cw-badge-online">
                      <Video size={12} />
                      Kelas Daring
                    </span>
                  ) : (
                    <span className="cw-badge-onsite">
                      <MapPin size={12} />
                      Tatap Muka
                    </span>
                  )}
                </div>

                <h3 className="cw-schedule-name">{item.courseName}</h3>

                <div className="cw-schedule-meta-list">
                  <span className="cw-schedule-meta-item">
                    <User size={13} color="var(--color-secondary-text)" />
                    {item.lecturer}
                  </span>
                  <span className="cw-meta-dot">•</span>
                  <span className="cw-schedule-meta-item">
                    {item.isOnline ? <Video size={13} color="var(--color-dark-teal)" /> : <MapPin size={13} color="var(--color-secondary-text)" />}
                    {item.room}
                  </span>
                </div>
              </div>

              {/* Actions / Zoom Link */}
              <div className="cw-schedule-action">
                {item.isOnline && item.zoomUrl ? (
                  <div className="cw-zoom-actions">
                    <button
                      type="button"
                      onClick={() => handleCopyLink(item.zoomUrl, item.id)}
                      className="cw-btn-copy"
                      title="Salin tautan Zoom"
                    >
                      {copiedId === item.id ? <Check size={13} color="var(--color-success-600)" /> : <Copy size={13} />}
                      <span>{copiedId === item.id ? 'Tersalin' : 'Salin'}</span>
                    </button>
                    <a
                      href={item.zoomUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cw-btn-zoom"
                    >
                      <span>Masuk Zoom</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => alert(`Ruang Kuliah: ${item.room}\nSilakan hadir tepat waktu sebelum perkuliahan dimulai.`)}
                    className="cw-btn-room-info"
                  >
                    <span>Lokasi Ruang</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TodayScheduleSection;
