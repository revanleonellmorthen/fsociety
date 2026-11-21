import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Award, CheckCircle2, User, ArrowRight } from 'lucide-react';
import { courses } from '../../data/courses';
import RiseHeader from '../../components/RiseHeader';
import RiseCard from '../../components/RiseCard';
import RiseBadge from '../../components/RiseBadge';
import RiseStatCard from '../../components/RiseStatCard';

export default function Courses() {
  const navigate = useNavigate();

  const totalSks = courses.reduce((sum, c) => sum + c.sks, 0);
  const avgProgress = Math.round(
    courses.reduce((sum, c) => sum + c.progress, 0) / courses.length
  );

  return (
    <div className="rise-courses-page">
      <RiseHeader
        title="Daftar Mata Kuliah"
        subtitle="Mata kuliah aktif pada Semester 3 Tahun Akademik 2025/2026 Program Studi S1 Teknik Informatika"
      />

      {/* Summary stats */}
      <div className="rise-stat-grid" style={{ marginBottom: '24px' }}>
        <RiseStatCard
          label="Total Mata Kuliah"
          value={courses.length}
          sub="Semua aktif berjalan"
          icon={<BookOpen size={20} />}
          accentColor="#07455C"
          bgColor="#E8F4F7"
        />
        <RiseStatCard
          label="Beban Beban SKS"
          value={`${totalSks} SKS`}
          sub="Semester 3 Reguler"
          icon={<Award size={20} />}
          accentColor="#CEAE65"
          bgColor="#FAF4E6"
        />
        <RiseStatCard
          label="Rata-rata Progress"
          value={`${avgProgress}%`}
          sub="Penyelesaian materi & tugas"
          icon={<CheckCircle2 size={20} />}
          accentColor="#10B981"
          bgColor="#ECFDF5"
        />
      </div>

      {/* Courses Grid */}
      <div className="rise-grid-2">
        {courses.map((course) => (
          <div
            key={course.id}
            className="rise-card rise-card-interactive"
            style={{
              borderLeft: `5px solid ${course.color || '#07455C'}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
            onClick={() => navigate(`/courses/${course.id}`)}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                }}
              >
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <RiseBadge variant="primary">{course.code}</RiseBadge>
                  <RiseBadge variant="neutral">{course.sks} SKS</RiseBadge>
                </div>
                <RiseBadge variant="success" dot>{course.status}</RiseBadge>
              </div>

              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#082F3D',
                  margin: '0 0 6px',
                  lineHeight: 1.3,
                }}
              >
                {course.name}
              </h3>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12.5px',
                  color: '#65747A',
                  marginBottom: '14px',
                }}
              >
                <User size={14} />
                <span>{course.lecturer}</span>
              </div>

              <p
                style={{
                  fontSize: '12.5px',
                  color: '#65747A',
                  lineHeight: 1.5,
                  margin: '0 0 16px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {course.description}
              </p>
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  marginBottom: '6px',
                }}
              >
                <span style={{ color: '#65747A' }}>
                  Tugas: {course.completedAssignments}/{course.assignmentCount} Selesai
                </span>
                <span style={{ fontWeight: 700, color: '#07455C' }}>
                  {course.progress}%
                </span>
              </div>
              <div className="rise-progress-bar" style={{ marginBottom: '16px' }}>
                <div
                  className="rise-progress-fill"
                  style={{ width: `${course.progress}%`, background: course.color }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '12px',
                  borderTop: '1px solid #DDE5E4',
                  fontSize: '12px',
                  color: '#07455C',
                  fontWeight: 600,
                }}
              >
                <span>{course.schedule}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Buka Modul <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
