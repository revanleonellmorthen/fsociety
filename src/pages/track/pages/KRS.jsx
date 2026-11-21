import { useState, useMemo } from 'react';
import { Plus, Minus, Search, BookOpen, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import TrackHeader from '../components/TrackHeader';
import TrackCard from '../components/TrackCard';
import TrackStatusBadge from '../components/TrackStatusBadge';
import { coursePool, initialSelectedCourses, krsStatus } from '../data/mockData';

const statusConfig = {
  'Disetujui':           { variant: 'success', icon: <CheckCircle size={13} /> },
  'Menunggu Persetujuan':{ variant: 'warning', icon: <Clock size={13} /> },
  'Belum Diajukan':      { variant: 'neutral', icon: <AlertCircle size={13} /> },
  'Ditolak':             { variant: 'danger',  icon: <AlertCircle size={13} /> },
};

export default function KRS() {
  const [selectedIds, setSelectedIds] = useState(new Set(initialSelectedCourses));
  const [search, setSearch] = useState('');
  const [submitted, setSubmitted] = useState(krsStatus.status !== 'Belum Diajukan');

  const selectedCourses = useMemo(
    () => coursePool.filter(c => selectedIds.has(c.id)),
    [selectedIds]
  );

  const availableCourses = useMemo(() => {
    const q = search.toLowerCase();
    return coursePool.filter(c =>
      !selectedIds.has(c.id) &&
      (c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.dosen.toLowerCase().includes(q))
    );
  }, [selectedIds, search]);

  const totalSks = selectedCourses.reduce((s, c) => s + c.sks, 0);
  const maxSks = krsStatus.maxSks;
  const pct = Math.min((totalSks / maxSks) * 100, 100);
  const progressClass = pct >= 100 ? 'track-progress-fill-danger' : pct >= 80 ? 'track-progress-fill-warning' : '';

  const addCourse = (id) => {
    const course = coursePool.find(c => c.id === id);
    if (totalSks + course.sks > maxSks) return;
    setSelectedIds(prev => new Set([...prev, id]));
  };

  const removeCourse = (id) => {
    setSelectedIds(prev => { const s = new Set(prev); s.delete(id); return s; });
  };

  const handleSubmit = () => setSubmitted(true);
  const handleRevise = () => setSubmitted(false);

  const statusInfo = statusConfig[submitted ? 'Disetujui' : 'Belum Diajukan'];

  return (
    <>
      <TrackHeader
        title="Kartu Rencana Studi (KRS)"
        subtitle={`Semester ${3} · ${krsStatus.deadline ? `Batas pengisian: ${krsStatus.deadline}` : ''}`}
      >
        <TrackStatusBadge variant={statusInfo.variant} dot>
          {submitted ? krsStatus.status : 'Belum Diajukan'}
        </TrackStatusBadge>
      </TrackHeader>

      {/* SKS Meter */}
      <TrackCard style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--track-text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5, marginBottom: 2 }}>SKS Dipilih</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: pct >= 100 ? 'var(--track-danger)' : 'var(--track-primary)', letterSpacing: -0.5 }}>
                {totalSks}
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--track-text-muted)' }}> / {maxSks} SKS</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--track-text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5, marginBottom: 2 }}>Mata Kuliah</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--track-text-primary)', letterSpacing: -0.5 }}>
                {selectedCourses.length}
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--track-text-muted)' }}> MK</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            {!submitted ? (
              <button
                className="track-btn track-btn-primary"
                onClick={handleSubmit}
                disabled={selectedCourses.length === 0}
              >
                <CheckCircle size={14} />
                Ajukan KRS
              </button>
            ) : (
              <button className="track-btn track-btn-outline" onClick={handleRevise}>
                Revisi KRS
              </button>
            )}
          </div>
        </div>

        <div className="track-progress-bar">
          <div className={`track-progress-fill ${progressClass}`} style={{ width: `${pct}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--track-text-muted)', marginTop: 4 }}>
          <span>0 SKS</span>
          <span>{totalSks}/{maxSks} SKS ({Math.round(pct)}%)</span>
          <span>{maxSks} SKS</span>
        </div>

        {pct >= 100 && (
          <div style={{ marginTop: 10, padding: '8px 12px', background: 'var(--track-danger-light)', borderRadius: 8, fontSize: 12.5, color: 'var(--track-danger)', display: 'flex', gap: 6, alignItems: 'center' }}>
            <AlertCircle size={14} /> Batas maksimum SKS tercapai. Hapus mata kuliah untuk menambah yang lain.
          </div>
        )}
      </TrackCard>

      {submitted && (
        <div style={{ marginBottom: 16, padding: '12px 16px', background: 'var(--track-success-light)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 10, fontSize: 13.5, color: 'var(--track-success)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle size={16} />
          KRS telah disetujui oleh {krsStatus.approvedBy} pada {krsStatus.approvedAt}.
        </div>
      )}

      {/* Two-column layout */}
      <div className="track-krs-layout">
        {/* Left: Available courses */}
        <TrackCard title="Mata Kuliah Tersedia" icon={<BookOpen size={15} />}>
          <input
            className="track-course-search"
            type="text"
            placeholder="Cari mata kuliah, kode, atau dosen..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div style={{ maxHeight: 460, overflowY: 'auto', paddingRight: 4 }}>
            {availableCourses.length === 0 ? (
              <div className="track-empty-state">
                <Search size={32} />
                <p>Tidak ada mata kuliah yang cocok.</p>
              </div>
            ) : (
              availableCourses.map(course => {
                const wouldExceed = totalSks + course.sks > maxSks;
                return (
                  <div key={course.id} className="track-course-row" style={{ opacity: wouldExceed ? 0.5 : 1 }}>
                    <div className="track-course-row-info">
                      <div className="track-course-row-name">{course.name}</div>
                      <div className="track-course-row-meta">
                        {course.code} · {course.dosen} · {course.hari} {course.jam}
                      </div>
                    </div>
                    <span className="track-course-row-sks">{course.sks} SKS</span>
                    <button
                      className="track-course-row-btn track-course-row-btn-add"
                      onClick={() => addCourse(course.id)}
                      disabled={wouldExceed || submitted}
                      title={wouldExceed ? 'SKS melebihi batas' : 'Tambah'}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </TrackCard>

        {/* Right: Selected courses */}
        <TrackCard title="Mata Kuliah Dipilih" icon={<CheckCircle size={15} />}>
          <div style={{ maxHeight: 540, overflowY: 'auto', paddingRight: 4 }}>
            {selectedCourses.length === 0 ? (
              <div className="track-empty-state">
                <BookOpen size={32} />
                <p>Belum ada mata kuliah yang dipilih.</p>
              </div>
            ) : (
              selectedCourses.map((course, i) => (
                <div key={course.id} className="track-course-row track-course-row-selected">
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--track-text-muted)', width: 20, textAlign: 'center' }}>
                    {i + 1}
                  </div>
                  <div className="track-course-row-info" style={{ marginLeft: 8 }}>
                    <div className="track-course-row-name">{course.name}</div>
                    <div className="track-course-row-meta">{course.code} · {course.dosen}</div>
                  </div>
                  <span className="track-course-row-sks">{course.sks} SKS</span>
                  <button
                    className="track-course-row-btn track-course-row-btn-remove"
                    onClick={() => removeCourse(course.id)}
                    disabled={submitted}
                    title="Hapus"
                  >
                    <Minus size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          <div style={{ borderTop: '1px solid var(--track-border)', marginTop: 12, paddingTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, fontWeight: 600, color: 'var(--track-text-primary)' }}>
              <span>Total SKS</span>
              <span style={{ color: 'var(--track-primary)' }}>{totalSks} SKS</span>
            </div>
          </div>
        </TrackCard>
      </div>
    </>
  );
}
