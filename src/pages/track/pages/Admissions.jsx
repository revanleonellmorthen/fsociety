import { UserCheck, CheckCircle, Clock, FileCheck, Megaphone } from 'lucide-react';
import TrackHeader from '../components/TrackHeader';
import TrackCard from '../components/TrackCard';
import TrackStatusBadge from '../components/TrackStatusBadge';
import { admissionsData } from '../data/mockData';

export default function Admissions() {
  const { registrationId, jalur, tanggalDaftar, tanggalDiterima, status, prodi, timeline, documents, announcements } = admissionsData;

  const verified = documents.filter(d => d.status === 'verified').length;

  return (
    <>
      <TrackHeader
        title="Penerimaan Mahasiswa"
        subtitle="Informasi administrasi dan status penerimaan kamu."
      />

      {/* Top banner */}
      <div style={{
        background: 'linear-gradient(135deg,#10B981,#059669)',
        borderRadius: 'var(--track-radius-xl)',
        padding: '24px 28px',
        color: 'white',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 8px 24px rgba(16,185,129,0.25)',
      }}>
        <div>
          <div style={{ fontSize: 11, opacity: 0.75, marginBottom: 4, letterSpacing: 0.5, textTransform: 'uppercase' }}>Status Penerimaan</div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>{status}</div>
          <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>{prodi} · Angkatan 2024</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: '12px 20px', textAlign: 'center' }}>
          <CheckCircle size={32} style={{ margin: '0 auto 4px' }} />
          <div style={{ fontSize: 12, fontWeight: 600 }}>Diterima</div>
        </div>
      </div>

      <div className="track-grid-main-side">
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Registration info */}
          <TrackCard title="Informasi Pendaftaran" icon={<UserCheck size={15} />}>
            {[
              ['No. Registrasi', registrationId],
              ['Jalur Masuk', jalur],
              ['Program Studi', prodi],
              ['Tanggal Daftar', tanggalDaftar],
              ['Tanggal Diterima', tanggalDiterima],
              ['Status Administrasi', null],
            ].map(([label, value]) => (
              <div key={label} className="track-info-row">
                <span className="track-info-row-label">{label}</span>
                {value !== null
                  ? <span className="track-info-row-value" style={{ fontSize: 13 }}>{value}</span>
                  : <TrackStatusBadge variant="success" dot>{status}</TrackStatusBadge>
                }
              </div>
            ))}
          </TrackCard>

          {/* Document checklist */}
          <TrackCard title="Kelengkapan Dokumen" icon={<FileCheck size={15} />}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: 'var(--track-text-secondary)' }}>
                {verified} dari {documents.length} dokumen terverifikasi
              </span>
              <TrackStatusBadge variant={verified === documents.length ? 'success' : 'warning'}>
                {verified}/{documents.length}
              </TrackStatusBadge>
            </div>
            <div className="track-progress-bar" style={{ marginBottom: 16 }}>
              <div
                className="track-progress-fill"
                style={{
                  width: `${(verified / documents.length) * 100}%`,
                  background: 'linear-gradient(90deg,#10B981,#059669)',
                }}
              />
            </div>

            <div className="track-doc-checklist">
              {documents.map(doc => (
                <div key={doc.name} className="track-doc-item">
                  <div className={`track-doc-check ${doc.status === 'verified' ? 'track-doc-check-done' : 'track-doc-check-pending'}`}>
                    {doc.status === 'verified'
                      ? <CheckCircle size={12} />
                      : <Clock size={12} />
                    }
                  </div>
                  <span>{doc.name}</span>
                  <TrackStatusBadge
                    variant={doc.status === 'verified' ? 'success' : 'warning'}
                    style={{ marginLeft: 'auto' }}
                  >
                    {doc.status === 'verified' ? 'Terverifikasi' : 'Menunggu'}
                  </TrackStatusBadge>
                </div>
              ))}
            </div>
          </TrackCard>

          {/* Announcements */}
          <TrackCard title="Pengumuman Penerimaan" icon={<Megaphone size={15} />}>
            {announcements.map((ann, i) => (
              <div key={i} className="track-announcement-item">
                <div className="track-announcement-dot" style={{ background: 'var(--track-success)' }} />
                <div>
                  <div className="track-announcement-title">{ann.title}</div>
                  <div className="track-announcement-date">{ann.date}</div>
                  <div className="track-announcement-desc">{ann.desc}</div>
                </div>
              </div>
            ))}
          </TrackCard>
        </div>

        {/* Right column — Timeline */}
        <TrackCard title="Timeline Administrasi" icon={<Clock size={15} />}>
          <div className="track-timeline">
            {timeline.map((item, i) => (
              <div key={i} className="track-timeline-item">
                <div className={`track-timeline-dot track-timeline-dot-${item.status}`} />
                <div className="track-timeline-title">{item.title}</div>
                <div className="track-timeline-date">{item.date}</div>
              </div>
            ))}
          </div>
        </TrackCard>
      </div>
    </>
  );
}
