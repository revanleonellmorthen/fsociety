import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin,
  UserCheck,
  FileText
} from 'lucide-react';
import { student } from '../../data/student';
import { courses } from '../../data/courses';
import { assignments } from '../../data/assignments';
import { schedule } from '../../data/schedule';
import { attendance } from '../../data/attendance';
import RiseCard from '../../components/RiseCard';
import RiseBadge from '../../components/RiseBadge';
import RiseStatCard from '../../components/RiseStatCard';

export default function Overview() {
  const navigate = useNavigate();

  // Metrics
  const pendingAssignments = assignments.filter(
    (a) => a.status === 'in-progress' || a.status === 'upcoming'
  );
  const overdueAssignments = assignments.filter((a) => a.status === 'overdue');

  const totalAttendanceRate = Math.round(
    attendance.reduce((acc, curr) => acc + curr.percentage, 0) / attendance.length
  );

  // Near deadlines (sorted by dueDate)
  const upcomingDeadlines = [...assignments]
    .filter((a) => a.status !== 'submitted')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 4);

  // Today schedule (show Monday schedule by default for realistic weekday view)
  const todayClasses = schedule.filter((s) => s.day === 'Monday');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'submitted':
        return <RiseBadge variant="success" dot>Submitted</RiseBadge>;
      case 'in-progress':
        return <RiseBadge variant="warning" dot>In Progress</RiseBadge>;
      case 'overdue':
        return <RiseBadge variant="danger" dot>Overdue</RiseBadge>;
      default:
        return <RiseBadge variant="info" dot>Upcoming</RiseBadge>;
    }
  };

  const formatDueDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="rise-overview">
      {/* Hero Welcome Card */}
      <div className="rise-hero-card">
        <div className="rise-hero-dots">
          <span /><span /><span /><span />
          <span /><span /><span /><span />
        </div>
        <div className="rise-hero-greeting">
          <Sparkles size={14} />
          <span>Selamat Datang Kembali di RISE LMS</span>
        </div>
        <h1 className="rise-hero-name">{student.name}</h1>
        <p className="rise-hero-desc">
          Pantau seluruh aktivitas perkuliahan, penyelesaian tugas, kehadiran praktikum,
          serta kolaborasi workspace semester {student.activeSemester} ({student.activeAcademicYear}) secara terpadu.
        </p>
        <div className="rise-hero-meta">
          <div className="rise-hero-meta-item">
            <BookOpen size={13} />
            <span>{student.prodi}</span>
          </div>
          <div className="rise-hero-meta-item">
            <Calendar size={13} />
            <span>NIM: {student.nim}</span>
          </div>
          <div className="rise-hero-meta-item">
            <TrendingUp size={13} />
            <span>Dosen PA: {student.advisor}</span>
          </div>
        </div>
      </div>

      {/* Stat Grid Row */}
      <div className="rise-stat-grid" style={{ marginBottom: '24px' }}>
        <RiseStatCard
          label="Mata Kuliah Aktif"
          value={courses.length}
          sub="15 SKS Total Semester Ini"
          icon={<BookOpen size={20} />}
          accentColor="#07455C"
          bgColor="#E8F4F7"
        />
        <RiseStatCard
          label="Tugas Berjalan"
          value={pendingAssignments.length}
          sub={`${overdueAssignments.length} tugas melewati deadline`}
          icon={<Clock size={20} />}
          accentColor="#F59E0B"
          bgColor="#FFFBEB"
        />
        <RiseStatCard
          label="Kehadiran Kuliah"
          value={`${totalAttendanceRate}%`}
          sub="Rata-rata 6 mata kuliah"
          icon={<UserCheck size={20} />}
          accentColor="#10B981"
          bgColor="#ECFDF5"
        />
        <RiseStatCard
          label="Workspace Kelompok"
          value="2 Kelompok"
          sub="9 task aktif terdistribusi"
          icon={<TrendingUp size={20} />}
          accentColor="#CEAE65"
          bgColor="#FAF4E6"
        />
      </div>

      {/* Main & Side 2-Column Grid */}
      <div className="rise-grid-main-side">
        {/* Main Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Upcoming Deadlines Card */}
          <RiseCard
            title="Deadline Tugas Terdekat"
            icon={<Clock size={18} />}
            action="Lihat Semua Tugas"
            onAction={() => navigate('/assignments')}
          >
            <div className="rise-assignment-list">
              {upcomingDeadlines.map((item) => (
                <div
                  key={item.id}
                  className="rise-assignment-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/assignments/${item.id}`)}
                >
                  <div className="rise-assignment-left">
                    <span className={`rise-assignment-status-dot ${item.status}`} />
                    <div className="rise-assignment-info">
                      <h4>{item.title}</h4>
                      <div className="rise-assignment-meta">
                        <span className="rise-assignment-course">
                          {item.courseCode} · {item.courseName}
                        </span>
                        <span>•</span>
                        <span className="rise-assignment-due">
                          <Clock size={12} /> Tenggat: {formatDueDate(item.dueDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {getStatusBadge(item.status)}
                  </div>
                </div>
              ))}
            </div>
          </RiseCard>

          {/* Today's Schedule Card */}
          <RiseCard
            title="Jadwal Kuliah Terdekat (Hari Ini)"
            icon={<Calendar size={18} />}
            action="Buka Kalender Lengkap"
            onAction={() => navigate('/schedule')}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {todayClasses.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: '#F7F8F5',
                    borderLeft: '4px solid #07455C',
                  }}
                >
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div
                      style={{
                        minWidth: '90px',
                        fontWeight: 700,
                        color: '#07455C',
                        fontSize: '13px',
                      }}
                    >
                      {item.startTime} - {item.endTime}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#082F3D', fontSize: '14px' }}>
                        {item.courseName} ({item.courseCode})
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: '#65747A',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginTop: '3px',
                        }}
                      >
                        <MapPin size={12} /> {item.room} · {item.lecturer}
                      </div>
                    </div>
                  </div>
                  <RiseBadge variant={item.type === 'Lab' ? 'gold' : 'primary'}>
                    {item.type}
                  </RiseBadge>
                </div>
              ))}
            </div>
          </RiseCard>
        </div>

        {/* Side Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Active Courses Progress */}
          <RiseCard
            title="Progress Mata Kuliah"
            icon={<BookOpen size={18} />}
            action="Detail"
            onAction={() => navigate('/courses')}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {courses.slice(0, 5).map((c) => (
                <div
                  key={c.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/courses/${c.id}`)}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '13px',
                      marginBottom: '6px',
                    }}
                  >
                    <span style={{ fontWeight: 600, color: '#082F3D' }}>{c.code}</span>
                    <span style={{ fontWeight: 700, color: '#07455C' }}>{c.progress}%</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#65747A', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {c.name}
                  </div>
                  <div className="rise-progress-bar">
                    <div
                      className="rise-progress-fill"
                      style={{ width: `${c.progress}%`, background: c.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </RiseCard>

          {/* Quick Learning Shortcuts */}
          <RiseCard title="Aktivitas Terkini" icon={<FileText size={18} />}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{
                  fontSize: '12.5px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: '#F7F8F5',
                  borderLeft: '3px solid #10B981',
                }}
              >
                <div style={{ fontWeight: 600, color: '#082F3D' }}>Tugas 1 ASD Dikumpulkan</div>
                <div style={{ color: '#65747A', fontSize: '11px', marginTop: '2px' }}>
                  Nilai: 92 · Kemarin, 20:15 WIB
                </div>
              </div>
              <div
                style={{
                  fontSize: '12.5px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: '#F7F8F5',
                  borderLeft: '3px solid #CEAE65',
                }}
              >
                <div style={{ fontWeight: 600, color: '#082F3D' }}>Materi Baru Basis Data</div>
                <div style={{ color: '#65747A', fontSize: '11px', marginTop: '2px' }}>
                  Slide Normalisasi BCNF diunggah · 2 hari lalu
                </div>
              </div>
              <div
                style={{
                  fontSize: '12.5px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: '#F7F8F5',
                  borderLeft: '3px solid #0EA5E9',
                }}
              >
                <div style={{ fontWeight: 600, color: '#082F3D' }}>Kelompok Alpha Update</div>
                <div style={{ color: '#65747A', fontSize: '11px', marginTop: '2px' }}>
                  Rizky menyelesaikan setup JWT Auth · 3 hari lalu
                </div>
              </div>
            </div>
          </RiseCard>
        </div>
      </div>
    </div>
  );
}
