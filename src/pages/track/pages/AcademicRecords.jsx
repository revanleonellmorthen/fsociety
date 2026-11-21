import { useState } from 'react';
import { GraduationCap, ChevronDown, ChevronUp, User } from 'lucide-react';
import TrackHeader from '../components/TrackHeader';
import TrackCard from '../components/TrackCard';
import TrackStatusBadge from '../components/TrackStatusBadge';
import { academicRecords } from '../data/mockData';

const gradeVariant = (grade) => {
  if (['A', 'A-'].includes(grade)) return 'success';
  if (['B+', 'B', 'B-'].includes(grade)) return 'primary';
  if (['C+', 'C'].includes(grade)) return 'warning';
  return 'danger';
};

export default function AcademicRecords() {
  const [openSemesters, setOpenSemesters] = useState({ 1: true, 2: false });
  const { student, semesters, totalSksSelesai, totalSksTarget, ipk } = academicRecords;

  const toggle = (sem) => setOpenSemesters(prev => ({ ...prev, [sem]: !prev[sem] }));
  const pct = Math.round((totalSksSelesai / totalSksTarget) * 100);

  return (
    <>
      <TrackHeader
        title="Riwayat Akademik"
        subtitle="Rekap lengkap perjalanan studi kamu dari semester pertama."
      />

      {/* Student Identity */}
      <div className="track-grid-main-side" style={{ marginBottom: 20 }}>
        <TrackCard title="Identitas Akademik" icon={<User size={15} />}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
            <div style={{
              width: 60, height: 60, borderRadius: 16, flexShrink: 0,
              background: 'linear-gradient(135deg,#2563EB,#0EA5E9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: 20, fontWeight: 800,
            }}>
              {student.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--track-text-primary)' }}>{student.name}</div>
              <div style={{ fontSize: 13, color: 'var(--track-text-secondary)', marginTop: 2 }}>{student.id}</div>
              <TrackStatusBadge variant="success" dot>{student.status}</TrackStatusBadge>
            </div>
          </div>
          {[
            ['Program Studi', student.prodi],
            ['Fakultas', student.fakultas],
            ['Angkatan', student.angkatan],
            ['Dosen PA', student.advisor],
            ['Email', student.email],
          ].map(([label, value]) => (
            <div key={label} className="track-info-row">
              <span className="track-info-row-label">{label}</span>
              <span className="track-info-row-value" style={{ maxWidth: 220, textAlign: 'right', fontSize: 13 }}>{value}</span>
            </div>
          ))}
        </TrackCard>

        {/* Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TrackCard title="Ringkasan Akademik" icon={<GraduationCap size={15} />}>
            <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
              <div style={{ fontSize: 11, color: 'var(--track-text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5 }}>IPK Kumulatif</div>
              <div style={{ fontSize: 48, fontWeight: 800, color: 'var(--track-primary)', letterSpacing: -2, lineHeight: 1.1 }}>{ipk}</div>
              <div style={{ fontSize: 13, color: 'var(--track-text-muted)' }}>dari skala 4.00</div>
              <TrackStatusBadge variant="success">Sangat Memuaskan</TrackStatusBadge>
            </div>

            <div className="track-divider" />

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                <span style={{ color: 'var(--track-text-secondary)' }}>SKS Diselesaikan</span>
                <span style={{ fontWeight: 700 }}>{totalSksSelesai} / {totalSksTarget} SKS</span>
              </div>
              <div className="track-progress-bar">
                <div className="track-progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--track-text-muted)', marginTop: 4, textAlign: 'right' }}>
                {pct}% dari target kelulusan
              </div>
            </div>

            <div className="track-divider" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {[
                { label: 'Semester Aktif', value: `${student.activeSemester}` },
                { label: 'Semester Ditempuh', value: `${semesters.length}` },
                { label: 'Total MK Lulus', value: `${semesters.reduce((s, sem) => s + sem.courses.length, 0)}` },
                { label: 'SKS Tersisa', value: `${totalSksTarget - totalSksSelesai}` },
              ].map(item => (
                <div key={item.label} style={{ background: 'var(--track-bg)', borderRadius: 10, padding: '10px 12px' }}>
                  <div style={{ fontSize: 10.5, color: 'var(--track-text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5 }}>{item.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--track-text-primary)', marginTop: 2 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </TrackCard>
        </div>
      </div>

      {/* Semester history (accordion) */}
      <div className="track-section-title">
        <GraduationCap size={15} />
        Riwayat Semester
      </div>

      {semesters.map(sem => (
        <TrackCard key={sem.semester} style={{ marginBottom: 12 }}>
          <button
            onClick={() => toggle(sem.semester)}
            style={{
              width: '100%', background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: 0, fontFamily: 'inherit',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: 'linear-gradient(135deg,var(--track-primary),var(--track-accent))',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, flexShrink: 0,
              }}>
                S{sem.semester}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--track-text-primary)' }}>Semester {sem.semester}</div>
                <div style={{ fontSize: 12, color: 'var(--track-text-secondary)' }}>{sem.tahun} · {sem.courses.length} MK · {sem.totalSks} SKS</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--track-primary)' }}>{sem.ips}</div>
                <div style={{ fontSize: 10.5, color: 'var(--track-text-muted)' }}>IPS</div>
              </div>
              {openSemesters[sem.semester] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>

          {openSemesters[sem.semester] && (
            <div style={{ marginTop: 16 }}>
              <div className="track-table-wrapper">
                <table className="track-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Mata Kuliah</th>
                      <th style={{ width: 60, textAlign: 'center' }}>SKS</th>
                      <th style={{ width: 80, textAlign: 'center' }}>Nilai</th>
                      <th style={{ width: 80, textAlign: 'center' }}>Bobot</th>
                      <th style={{ width: 100, textAlign: 'center' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sem.courses.map((c, i) => (
                      <tr key={c.code}>
                        <td style={{ color: 'var(--track-text-muted)' }}>{i + 1}</td>
                        <td>
                          <div className="track-table-course-name">{c.name}</div>
                          <div className="track-table-course-code">{c.code}</div>
                        </td>
                        <td style={{ textAlign: 'center', fontWeight: 600 }}>{c.sks}</td>
                        <td style={{ textAlign: 'center', fontWeight: 700, color: c.grade === 'A' ? '#10B981' : 'var(--track-primary)' }}>{c.grade}</td>
                        <td style={{ textAlign: 'center' }}>{c.weight.toFixed(1)}</td>
                        <td style={{ textAlign: 'center' }}>
                          <TrackStatusBadge variant={gradeVariant(c.grade)}>{c.status}</TrackStatusBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TrackCard>
      ))}
    </>
  );
}
