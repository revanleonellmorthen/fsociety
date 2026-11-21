import { useState, useMemo } from 'react';
import { FileText, TrendingUp } from 'lucide-react';
import TrackHeader from '../components/TrackHeader';
import TrackCard from '../components/TrackCard';
import TrackTable from '../components/TrackTable';
import TrackStatusBadge from '../components/TrackStatusBadge';
import { khs } from '../data/mockData';

const gradeVariant = (grade) => {
  if (['A', 'A-'].includes(grade)) return 'success';
  if (['B+', 'B', 'B-'].includes(grade)) return 'primary';
  if (['C+', 'C'].includes(grade)) return 'warning';
  return 'danger';
};

const gradeColors = {
  A: '#10B981', 'A-': '#10B981',
  'B+': '#07455C', B: '#07455C', 'B-': '#6366F1',
  'C+': '#F59E0B', C: '#F59E0B',
  D: '#EF4444', E: '#7F1D1D',
};

const semesterOptions = Object.keys(khs).map(k => ({
  value: k,
  label: `Semester ${khs[k].semester} · ${khs[k].tahun}`,
}));

const columns = [
  { key: 'idx',   label: '#',           width: 40,  align: 'center', render: (_, __, i) => i + 1 },
  {
    key: 'name', label: 'Mata Kuliah',
    render: (val, row) => (
      <div>
        <div className="track-table-course-name">{val}</div>
        <div className="track-table-course-code">{row.code}</div>
      </div>
    ),
  },
  { key: 'sks',   label: 'SKS',         width: 60,  align: 'center' },
  {
    key: 'grade', label: 'Nilai',        width: 80,  align: 'center',
    render: (val) => (
      <span style={{
        display: 'inline-block', fontWeight: 700, fontSize: 14,
        color: gradeColors[val] || '#64748B',
      }}>{val}</span>
    ),
  },
  { key: 'weight', label: 'Bobot',       width: 80,  align: 'center',
    render: (val) => val.toFixed(1),
  },
  { key: 'mutu',  label: 'Mutu (SKS×Bobot)', width: 120, align: 'center',
    render: (_, row) => (row.sks * row.weight).toFixed(1),
  },
  {
    key: 'grade', label: 'Status',       width: 100, align: 'center',
    render: (val) => (
      <TrackStatusBadge variant={gradeVariant(val)} dot>{val === 'D' || val === 'E' ? 'Tidak Lulus' : 'Lulus'}</TrackStatusBadge>
    ),
  },
];

function GradeBarChart({ courses }) {
  const gradeCounts = {};
  courses.forEach(c => { gradeCounts[c.grade] = (gradeCounts[c.grade] || 0) + 1; });
  const gradeOrder = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'E'];
  const existing = gradeOrder.filter(g => gradeCounts[g]);
  const max = Math.max(...existing.map(g => gradeCounts[g]));

  return (
    <div>
      <div style={{ fontSize: 12, color: 'var(--track-text-muted)', marginBottom: 8, fontWeight: 600 }}>Distribusi Nilai</div>
      <div className="track-grade-bar-chart" style={{ height: 90 }}>
        {existing.map(g => {
          const pct = (gradeCounts[g] / max) * 76;
          return (
            <div key={g} className="track-grade-bar-col">
              <div className="track-grade-bar-count">{gradeCounts[g]}</div>
              <div
                className="track-grade-bar"
                style={{ height: pct, background: gradeColors[g] || '#94A3B8', width: '80%' }}
              />
              <div className="track-grade-bar-label">{g}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function KHS() {
  const [semKey, setSemKey] = useState('2');
  const data = khs[semKey];

  const rows = useMemo(() => data.courses.map((c, i) => ({ ...c, idx: i + 1 })), [data]);
  const cols = columns.map(col =>
    col.render && col.key === 'idx'
      ? { ...col, render: (_, row) => row.idx }
      : col
  );

  return (
    <>
      <TrackHeader
        title="Kartu Hasil Studi (KHS)"
        subtitle="Hasil akademik per semester."
      >
        <select
          className="track-semester-select"
          value={semKey}
          onChange={e => setSemKey(e.target.value)}
        >
          {semesterOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </TrackHeader>

      {/* Summary cards */}
      <div className="track-grid-3" style={{ marginBottom: 20 }}>
        <TrackCard>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--track-text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5, marginBottom: 8 }}>
              IPS Semester {data.semester}
            </div>
            <div className="track-ipk-display" style={{ justifyContent: 'center' }}>
              <span className="track-ipk-value">{data.ips}</span>
              <span className="track-ipk-max">/ 4.00</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <TrackStatusBadge variant={parseFloat(data.ips) >= 3.5 ? 'success' : parseFloat(data.ips) >= 3.0 ? 'primary' : 'warning'}>
                {parseFloat(data.ips) >= 3.5 ? 'Sangat Memuaskan' : parseFloat(data.ips) >= 3.0 ? 'Memuaskan' : 'Cukup'}
              </TrackStatusBadge>
            </div>
          </div>
        </TrackCard>

        <TrackCard>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--track-text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5, marginBottom: 8 }}>
              IPK Kumulatif
            </div>
            <div className="track-ipk-display" style={{ justifyContent: 'center' }}>
              <span className="track-ipk-value" style={{ color: '#10B981' }}>{data.ipk}</span>
              <span className="track-ipk-max">/ 4.00</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <TrackStatusBadge variant="success">Sangat Memuaskan</TrackStatusBadge>
            </div>
          </div>
        </TrackCard>

        <TrackCard>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--track-text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5, marginBottom: 8 }}>
              Total SKS
            </div>
            <div className="track-ipk-display" style={{ justifyContent: 'center' }}>
              <span className="track-ipk-value" style={{ color: '#6366F1' }}>{data.totalSks}</span>
              <span className="track-ipk-max">SKS</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <TrackStatusBadge variant="info">{data.courses.length} Mata Kuliah</TrackStatusBadge>
            </div>
          </div>
        </TrackCard>
      </div>

      <div className="track-grid-main-side" style={{ marginBottom: 20 }}>
        {/* Grade table */}
        <TrackCard title="Daftar Nilai" icon={<FileText size={15} />}>
          <TrackTable
            columns={cols}
            rows={rows}
            emptyMessage="Tidak ada data nilai untuk semester ini."
          />
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '12px 16px',
            background: 'var(--track-bg)',
            borderRadius: '0 0 8px 8px',
            marginTop: 1,
            fontSize: 13.5,
            fontWeight: 700,
          }}>
            <span>Total</span>
            <span style={{ color: 'var(--track-primary)' }}>
              {data.courses.reduce((s, c) => s + c.sks, 0)} SKS ·&nbsp;
              Mutu {data.courses.reduce((s, c) => s + c.sks * c.weight, 0).toFixed(1)}
            </span>
          </div>
        </TrackCard>

        {/* Chart */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TrackCard title="Statistik Nilai" icon={<TrendingUp size={15} />}>
            <GradeBarChart courses={data.courses} />
          </TrackCard>

          <TrackCard>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--track-text-secondary)', marginBottom: 12 }}>Detail Semester</div>
            {[
              ['Semester', `Semester ${data.semester}`],
              ['Tahun Akademik', data.tahun],
              ['IPS', data.ips],
              ['IPK Kumulatif', data.ipk],
              ['Jumlah MK', `${data.courses.length} mata kuliah`],
              ['Total SKS', `${data.totalSks} SKS`],
              ['Total Mutu', data.courses.reduce((s, c) => s + c.sks * c.weight, 0).toFixed(1)],
            ].map(([label, value]) => (
              <div key={label} className="track-info-row">
                <span className="track-info-row-label">{label}</span>
                <span className="track-info-row-value">{value}</span>
              </div>
            ))}
          </TrackCard>
        </div>
      </div>
    </>
  );
}
