import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  User,
  FileText,
  ClipboardList,
  UserCheck,
  MapPin,
  Mail,
  Download,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { courses } from '../../data/courses';
import { assignments } from '../../data/assignments';
import { materials } from '../../data/materials';
import { schedule } from '../../data/schedule';
import { attendance } from '../../data/attendance';
import RiseBadge from '../../components/RiseBadge';
import RiseCard from '../../components/RiseCard';
import RiseEmptyState from '../../components/RiseEmptyState';

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const course = courses.find((c) => c.id === courseId || c.code === courseId);

  if (!course) {
    return (
      <div>
        <button
          onClick={() => navigate('/courses')}
          className="rise-btn rise-btn-outline"
          style={{ marginBottom: '16px' }}
        >
          <ArrowLeft size={16} /> Kembali ke Daftar Kuliah
        </button>
        <RiseEmptyState
          title="Mata Kuliah Tidak Ditemukan"
          message={`Data mata kuliah dengan ID "${courseId}" tidak ditemukan.`}
        />
      </div>
    );
  }

  const courseAssignments = assignments.filter((a) => a.courseId === course.id || a.courseCode === course.code);
  const courseMaterials = materials.filter((m) => m.courseId === course.id || m.courseCode === course.code);
  const courseSchedule = schedule.filter((s) => s.courseId === course.id || s.courseCode === course.code);
  const courseAttendance = attendance.find((at) => at.courseId === course.id || at.courseCode === course.code);

  const tabs = [
    { id: 'overview', label: 'Ringkasan & Info', icon: BookOpen },
    { id: 'materials', label: `Materi Kuliah (${courseMaterials.length})`, icon: FileText },
    { id: 'assignments', label: `Tugas (${courseAssignments.length})`, icon: ClipboardList },
    { id: 'schedule', label: 'Jadwal & Ruang', icon: Calendar },
  ];

  return (
    <div className="rise-course-detail-page">
      {/* Back button */}
      <div style={{ marginBottom: '16px' }}>
        <button
          type="button"
          onClick={() => navigate('/courses')}
          className="rise-btn rise-btn-ghost rise-btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={16} /> Kembali ke Courses
        </button>
      </div>

      {/* Course Banner Card */}
      <div
        className="rise-card"
        style={{
          borderLeft: `6px solid ${course.color || '#07455C'}`,
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
              <RiseBadge variant="primary">{course.code}</RiseBadge>
              <RiseBadge variant="neutral">{course.sks} SKS</RiseBadge>
              <RiseBadge variant="success" dot>{course.status}</RiseBadge>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#082F3D', margin: '0 0 8px' }}>
              {course.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#65747A', fontSize: '13px', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} /> {course.lecturer}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} /> {course.lecturerEmail || `${course.code.toLowerCase()}@cakrawala.ac.id`}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} /> {course.room}
              </span>
            </div>
          </div>

          <div style={{ minWidth: '160px', textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#65747A', marginBottom: '4px' }}>Progress Pembelajaran</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#07455C' }}>{course.progress}%</div>
            <div className="rise-progress-bar" style={{ marginTop: '6px', width: '160px' }}>
              <div className="rise-progress-fill" style={{ width: `${course.progress}%`, background: course.color }} />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="rise-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`rise-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="rise-grid-main-side">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <RiseCard title="Deskripsi Mata Kuliah" icon={<BookOpen size={18} />}>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#082F3D', margin: 0 }}>
                {course.description}
              </p>
            </RiseCard>

            <RiseCard title="Tugas yang Perlu Diselesaikan" icon={<ClipboardList size={18} />}>
              {courseAssignments.length === 0 ? (
                <div style={{ padding: '16px', color: '#65747A', fontSize: '13px' }}>
                  Tidak ada tugas aktif untuk mata kuliah ini.
                </div>
              ) : (
                <div className="rise-assignment-list">
                  {courseAssignments.map((asg) => (
                    <div
                      key={asg.id}
                      className="rise-assignment-item"
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/assignments/${asg.id}`)}
                    >
                      <div className="rise-assignment-left">
                        <span className={`rise-assignment-status-dot ${asg.status}`} />
                        <div className="rise-assignment-info">
                          <h4>{asg.title}</h4>
                          <div className="rise-assignment-meta">
                            <span>Tenggat: {new Date(asg.dueDate).toLocaleDateString('id-ID')}</span>
                            {asg.grade !== null && <span>• Nilai: {asg.grade}/100</span>}
                          </div>
                        </div>
                      </div>
                      <RiseBadge variant={asg.status === 'submitted' ? 'success' : asg.status === 'in-progress' ? 'warning' : 'neutral'}>
                        {asg.status}
                      </RiseBadge>
                    </div>
                  ))}
                </div>
              )}
            </RiseCard>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <RiseCard title="Statistik Kuliah" icon={<CheckCircle2 size={18} />}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#65747A' }}>Kehadiran Mahasiswa:</span>
                  <span style={{ fontWeight: 700, color: '#10B981' }}>
                    {courseAttendance ? `${courseAttendance.percentage}%` : '92%'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#65747A' }}>Total Materi Diunggah:</span>
                  <span style={{ fontWeight: 700, color: '#082F3D' }}>{courseMaterials.length} File</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#65747A' }}>Tugas Selesai:</span>
                  <span style={{ fontWeight: 700, color: '#082F3D' }}>
                    {course.completedAssignments} / {course.assignmentCount}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#65747A' }}>Jadwal Tetap:</span>
                  <span style={{ fontWeight: 600, color: '#07455C' }}>{course.schedule}</span>
                </div>
              </div>
            </RiseCard>

            <RiseCard title="Dosen Pengampu" icon={<User size={18} />}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: '#07455C',
                    color: '#CEAE65',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  {course.lecturer.split(' ')[0][0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#082F3D' }}>
                    {course.lecturer}
                  </div>
                  <div style={{ fontSize: '12px', color: '#65747A' }}>Dosen Pengampu Utama</div>
                  <div style={{ fontSize: '11px', color: '#07455C', marginTop: '2px' }}>
                    {course.lecturerEmail || `${course.code.toLowerCase()}@cakrawala.ac.id`}
                  </div>
                </div>
              </div>
            </RiseCard>
          </div>
        </div>
      )}

      {/* Tab 2: Materials */}
      {activeTab === 'materials' && (
        <div>
          {courseMaterials.length === 0 ? (
            <RiseEmptyState
              title="Belum Ada Materi"
              message="Dosen belum mengunggah materi ajar untuk mata kuliah ini."
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {courseMaterials.map((m) => (
                <div
                  key={m.id}
                  className="rise-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '8px',
                        background: '#E8F4F7',
                        color: '#07455C',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 600, color: '#082F3D' }}>
                        {m.title}
                      </h4>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#65747A' }}>
                        <span>Format: {m.fileType.toUpperCase()}</span>
                        <span>Ukuran: {m.fileSize}</span>
                        <span>Diunggah: {m.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="rise-btn rise-btn-outline rise-btn-sm"
                    onClick={() => alert(`Mengunduh materi: ${m.title}`)}
                  >
                    <Download size={14} /> Unduh
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Assignments */}
      {activeTab === 'assignments' && (
        <div>
          {courseAssignments.length === 0 ? (
            <RiseEmptyState
              title="Tidak Ada Tugas"
              message="Belum ada tugas yang diberikan untuk mata kuliah ini."
            />
          ) : (
            <div className="rise-assignment-list">
              {courseAssignments.map((asg) => (
                <div
                  key={asg.id}
                  className="rise-assignment-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/assignments/${asg.id}`)}
                >
                  <div className="rise-assignment-left">
                    <span className={`rise-assignment-status-dot ${asg.status}`} />
                    <div className="rise-assignment-info">
                      <h4>{asg.title}</h4>
                      <p style={{ fontSize: '12.5px', color: '#65747A', margin: '4px 0' }}>
                        {asg.description}
                      </p>
                      <div className="rise-assignment-meta">
                        <span>Tenggat: {new Date(asg.dueDate).toLocaleDateString('id-ID')}</span>
                        {asg.grade !== null && <span>• Nilai: {asg.grade}/100</span>}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <RiseBadge variant={asg.status === 'submitted' ? 'success' : asg.status === 'in-progress' ? 'warning' : 'danger'}>
                      {asg.status}
                    </RiseBadge>
                    <button className="rise-btn rise-btn-outline rise-btn-sm">
                      Buka Tugas
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Schedule */}
      {activeTab === 'schedule' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {courseSchedule.map((s) => (
            <div
              key={s.id}
              className="rise-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px',
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <RiseBadge variant="gold">{s.dayIndo || s.day}</RiseBadge>
                  <RiseBadge variant="neutral">{s.type}</RiseBadge>
                </div>
                <h3 style={{ margin: '0 0 6px', fontSize: '16px', color: '#082F3D' }}>
                  Pukul {s.startTime} - {s.endTime} WIB
                </h3>
                <div style={{ fontSize: '13px', color: '#65747A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} /> Lokasi: {s.room}
                </div>
              </div>
              {s.isOnline && s.zoomLink && (
                <a
                  href={s.zoomLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rise-btn rise-btn-primary rise-btn-sm"
                  style={{ textDecoration: 'none' }}
                >
                  <ExternalLink size={14} /> Gabung Zoom
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
