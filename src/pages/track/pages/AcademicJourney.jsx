import { useState } from 'react';
import { Route, BookOpen, ChevronDown, ChevronUp, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TrackHeader from '../components/TrackHeader';
import TrackCard from '../components/TrackCard';
import TrackStatusBadge from '../components/TrackStatusBadge';
import { journeyData } from '../data/mockData';

const activityIcons = {
  check: <CheckCircle size={18} />,
  file:  <BookOpen size={18} />,
  book:  <BookOpen size={18} />,
  cpu:   <Route size={18} />,
};

const activityColors = ['#07455C', '#10B981', '#6366F1', '#F59E0B'];
const activityBgs   = ['#F1F5F4', '#ECFDF5', '#EEF2FF', '#FFFBEB'];

export default function AcademicJourney() {
  const [historyOpen, setHistoryOpen] = useState(false);
  const navigate = useNavigate();
  const { activeSemester, academicYear, courses, progressPercent, activities, previousSemesters } = journeyData;
  const totalSks = courses.reduce((s, c) => s + c.sks, 0);

  return (
    <>
      <TrackHeader
        title="Perjalanan Akademik"
        subtitle="Ringkasan semester aktif dan riwayat studi kamu."
      />

      {/* Active Semester Banner */}
      <div className="track-journey-active">
        <div className="track-journey-header">
          <div>
            <div className="track-journey-label">Semester Aktif</div>
            <div className="track-journey-title">Semester {activeSemester}</div>
            <div className="track-journey-subtitle">{academicYear}</div>
          </div>
          <TrackStatusBadge variant="primary" dot>Sedang Berjalan</TrackStatusBadge>
        </div>

        {/* Stats */}
        <div className="track-journey-stats">
          {[
            { label: 'Total MK', value: courses.length, unit: 'mata kuliah' },
            { label: 'Total SKS', value: totalSks, unit: 'SKS' },
            { label: 'Progres Semester', value: `${progressPercent}%`, unit: 'selesai' },
            { label: 'Status', value: 'Aktif', unit: '' },
          ].map(stat => (
            <div key={stat.label} className="track-journey-stat">
              <div className="track-journey-stat-label">{stat.label}</div>
              <div className="track-journey-stat-value">
                {stat.value}
                {stat.unit && <span className="track-journey-stat-unit">{stat.unit}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Semester progress bar */}
        <div>
          <div className="track-journey-progress-label">
            <span>Progres Semester</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="track-progress-bar" style={{ height: 10 }}>
            <div
              className="track-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--track-text-muted)', marginTop: 4 }}>
            <span>Sep 2025</span>
            <span>Jan 2026</span>
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="track-section">
        <div className="track-section-title">
          <Clock size={15} />
          Aktivitas Semester Ini
        </div>
        <div className="track-grid-3" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
          {activities.map((act, i) => (
            <div key={act.label} className="track-stat-card" style={{ '--track-stat-accent': activityColors[i], '--track-stat-bg': activityBgs[i] }}>
              <div className="track-stat-card-icon">
                {activityIcons[act.icon]}
              </div>
              <div className="track-stat-label">{act.label}</div>
              <div className="track-stat-value" style={{ fontSize: 20 }}>{act.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Courses this semester */}
      <div className="track-section">
        <TrackCard title={`Mata Kuliah Semester ${activeSemester}`} icon={<BookOpen size={15} />}>
          <div className="track-table-wrapper">
            <table className="track-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Mata Kuliah</th>
                  <th style={{ width: 60, textAlign: 'center' }}>SKS</th>
                  <th>Dosen</th>
                  <th style={{ width: 120, textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, i) => (
                  <tr key={course.id}>
                    <td style={{ color: 'var(--track-text-muted)', fontWeight: 600 }}>{i + 1}</td>
                    <td>
                      <div className="track-table-course-name">{course.name}</div>
                      <div className="track-table-course-code">{course.code}</div>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--track-primary)' }}>{course.sks}</td>
                    <td style={{ color: 'var(--track-text-secondary)', fontSize: 13 }}>{course.dosen}</td>
                    <td style={{ textAlign: 'center' }}>
                      <TrackStatusBadge variant="primary" dot>{course.status}</TrackStatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} style={{ padding: '12px 16px', fontWeight: 700, background: 'var(--track-bg)', borderTop: '1px solid var(--track-border)' }}>
                    Total
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--track-primary)', background: 'var(--track-bg)', borderTop: '1px solid var(--track-border)' }}>{totalSks}</td>
                  <td colSpan={2} style={{ background: 'var(--track-bg)', borderTop: '1px solid var(--track-border)' }}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </TrackCard>
      </div>

      {/* Previous semesters (collapsible) */}
      <div className="track-section">
        <TrackCard>
          <button
            onClick={() => setHistoryOpen(!historyOpen)}
            style={{
              width: '100%', background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: 0, fontFamily: 'inherit',
            }}
          >
            <div className="track-card-title">
              <Route size={15} style={{ color: 'var(--track-primary)' }} />
              Riwayat Semester Sebelumnya
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <TrackStatusBadge variant="neutral">{previousSemesters.length} Semester</TrackStatusBadge>
              {historyOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>

          {historyOpen && (
            <div style={{ marginTop: 16 }}>
              {previousSemesters.map(sem => (
                <div key={sem.semester} className="track-history-item">
                  <div className="track-history-sem-badge">
                    Sem<br/>{sem.semester}
                  </div>
                  <div className="track-history-info">
                    <h4>Semester {sem.semester}</h4>
                    <p>{sem.tahun} · {sem.courses} Mata Kuliah · {sem.totalSks} SKS</p>
                  </div>
                  <div>
                    <div className="track-history-ipk">{sem.ips}</div>
                    <div className="track-history-ipk-label">IPS</div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 16, textAlign: 'right' }}>
                <button
                  className="track-btn track-btn-outline"
                  onClick={() => navigate('/academic-records')}
                >
                  Lihat Riwayat Lengkap <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </TrackCard>
      </div>
    </>
  );
}
