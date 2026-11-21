import React, { useState } from 'react';
import {
  UserCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Calendar
} from 'lucide-react';
import { attendance } from '../../data/attendance';
import RiseHeader from '../../components/RiseHeader';
import RiseBadge from '../../components/RiseBadge';
import RiseCard from '../../components/RiseCard';

export default function Attendance() {
  const [expandedCourse, setExpandedCourse] = useState(attendance[0]?.courseId || null);

  const totalMeetings = attendance.reduce((sum, a) => sum + a.totalMeetings, 0);
  const totalPresent = attendance.reduce((sum, a) => sum + a.present, 0);
  const totalAbsent = attendance.reduce((sum, a) => sum + a.absent, 0);
  const totalExcused = attendance.reduce((sum, a) => sum + a.excused, 0);
  const totalLate = attendance.reduce((sum, a) => sum + a.late, 0);

  const overallRate = Math.round(
    attendance.reduce((sum, a) => sum + a.percentage, 0) / attendance.length
  );

  const toggleExpand = (courseId) => {
    setExpandedCourse((prev) => (prev === courseId ? null : courseId));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'present':
        return <RiseBadge variant="success" dot>Hadir (Present)</RiseBadge>;
      case 'late':
        return <RiseBadge variant="warning" dot>Terlambat (Late)</RiseBadge>;
      case 'excused':
        return <RiseBadge variant="gold" dot>Izin (Excused)</RiseBadge>;
      case 'absent':
        return <RiseBadge variant="danger" dot>Alpa (Absent)</RiseBadge>;
      default:
        return <RiseBadge variant="neutral">{status}</RiseBadge>;
    }
  };

  return (
    <div className="rise-attendance-page">
      <RiseHeader
        title="Pemantauan Kehadiran Kuliah"
        subtitle="Rekapitulasi presensi tatap muka dan praktikum semester aktif. Batas minimal kehadiran kelayakan ujian akhir adalah 75%."
      />

      {/* Overall Summary Card */}
      <div className="rise-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: overallRate >= 85 ? '#ECFDF5' : '#FFFBEB',
                border: `3px solid ${overallRate >= 85 ? '#10B981' : '#F59E0B'}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#082F3D' }}>
                {overallRate}%
              </span>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#10B981', textTransform: 'uppercase' }}>
                Memenuhi
              </span>
            </div>

            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#082F3D', margin: '0 0 6px' }}>
                Status Presensi Akademik Aman
              </h2>
              <p style={{ fontSize: '13px', color: '#65747A', margin: 0, maxWidth: '520px', lineHeight: 1.5 }}>
                Total dari 6 mata kuliah aktif adalah {totalMeetings} sesi pertemuan. Denis memenuhi syarat 100% untuk mengikuti Ujian Akhir Semester (UAS).
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ background: '#F7F8F5', padding: '12px 18px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#10B981' }}>{totalPresent}</div>
              <div style={{ fontSize: '11px', color: '#65747A', fontWeight: 600 }}>Hadir</div>
            </div>
            <div style={{ background: '#F7F8F5', padding: '12px 18px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#F59E0B' }}>{totalLate}</div>
              <div style={{ fontSize: '11px', color: '#65747A', fontWeight: 600 }}>Terlambat</div>
            </div>
            <div style={{ background: '#F7F8F5', padding: '12px 18px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#CEAE65' }}>{totalExcused}</div>
              <div style={{ fontSize: '11px', color: '#65747A', fontWeight: 600 }}>Izin</div>
            </div>
            <div style={{ background: '#F7F8F5', padding: '12px 18px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#EF4444' }}>{totalAbsent}</div>
              <div style={{ fontSize: '11px', color: '#65747A', fontWeight: 600 }}>Alpa</div>
            </div>
          </div>
        </div>

        {/* Proportional Segment Bar */}
        <div style={{ marginTop: '20px' }}>
          <div
            style={{
              height: '10px',
              borderRadius: '9999px',
              overflow: 'hidden',
              display: 'flex',
              background: '#DDE5E4',
            }}
          >
            <div style={{ width: `${(totalPresent / totalMeetings) * 100}%`, background: '#10B981' }} title="Hadir" />
            <div style={{ width: `${(totalLate / totalMeetings) * 100}%`, background: '#F59E0B' }} title="Terlambat" />
            <div style={{ width: `${(totalExcused / totalMeetings) * 100}%`, background: '#CEAE65' }} title="Izin" />
            <div style={{ width: `${(totalAbsent / totalMeetings) * 100}%`, background: '#EF4444' }} title="Alpa" />
          </div>
        </div>
      </div>

      {/* Per-Course Attendance Accordion / List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {attendance.map((courseItem) => {
          const isExpanded = expandedCourse === courseItem.courseId;

          return (
            <div
              key={courseItem.courseId}
              className="rise-card"
              style={{
                borderLeft: `5px solid ${courseItem.percentage >= 85 ? '#10B981' : '#F59E0B'}`,
                padding: '0',
                overflow: 'hidden',
              }}
            >
              {/* Card Header Summary */}
              <div
                style={{
                  padding: '18px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                onClick={() => toggleExpand(courseItem.courseId)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '10px',
                      background: '#E8F4F7',
                      color: '#07455C',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '15px',
                    }}
                  >
                    <span>{courseItem.percentage}%</span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                      <RiseBadge variant="primary">{courseItem.courseCode}</RiseBadge>
                      <span style={{ fontSize: '12px', color: '#65747A' }}>
                        Dosen: {courseItem.lecturer}
                      </span>
                    </div>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#082F3D', fontWeight: 700 }}>
                      {courseItem.courseName}
                    </h3>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '12.5px' }}>
                    <span style={{ color: '#10B981', fontWeight: 600 }}>{courseItem.present} Hadir</span>
                    <span style={{ color: '#F59E0B', fontWeight: 600 }}>{courseItem.late} Terlambat</span>
                    <span style={{ color: '#CEAE65', fontWeight: 600 }}>{courseItem.excused} Izin</span>
                    <span style={{ color: '#EF4444', fontWeight: 600 }}>{courseItem.absent} Alpa</span>
                  </div>
                  <button
                    type="button"
                    className="rise-btn rise-btn-ghost rise-btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Expandable Meeting History */}
              {isExpanded && (
                <div style={{ borderTop: '1px solid #DDE5E4', padding: '16px 22px', background: '#FAFBFA' }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: '13.5px', color: '#082F3D' }}>
                    Riwayat Pertemuan Kuliah (Total {courseItem.meetings.length} Sesi)
                  </h4>
                  <div className="rise-table-wrapper">
                    <table className="rise-table rise-table-dense">
                      <thead>
                        <tr>
                          <th style={{ width: '80px' }}>Sesi #</th>
                          <th style={{ width: '130px' }}>Tanggal</th>
                          <th>Topik Bahasan Sesi</th>
                          <th style={{ width: '150px' }}>Status Kehadiran</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courseItem.meetings.map((m) => (
                          <tr key={m.id}>
                            <td style={{ fontWeight: 700, color: '#07455C' }}>
                              Ke-{m.meetingNumber}
                            </td>
                            <td>{m.date}</td>
                            <td>{m.topic}</td>
                            <td>{getStatusBadge(m.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
