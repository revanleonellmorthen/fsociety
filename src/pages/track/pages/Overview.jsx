import { useNavigate } from 'react-router-dom';
import {
  BookOpen, FileText, GraduationCap, CreditCard,
  UserCheck, Route, TrendingUp, ShieldCheck,
  Layers, FileCheck, AlertTriangle, Megaphone,
  ArrowRight, Calendar,
} from 'lucide-react';
import TrackHeader from '../components/TrackHeader';
import TrackCard from '../components/TrackCard';
import TrackStatCard from '../components/TrackStatCard';
import TrackStatusBadge from '../components/TrackStatusBadge';
import { student, overviewStats, announcements, khs, billingData } from '../data/mockData';

const statConfig = {
  success: { color: '#10B981', bg: '#ECFDF5' },
  primary: { color: '#2563EB', bg: '#EFF6FF' },
  accent:  { color: '#0EA5E9', bg: '#E0F2FE' },
  info:    { color: '#6366F1', bg: '#EEF2FF' },
  warning: { color: '#F59E0B', bg: '#FFFBEB' },
  danger:  { color: '#EF4444', bg: '#FEF2F2' },
};

const statIcons = {
  'shield-check':  <ShieldCheck size={18} />,
  'trending-up':   <TrendingUp size={18} />,
  'book-open':     <BookOpen size={18} />,
  'layers':        <Layers size={18} />,
  'file-check':    <FileCheck size={18} />,
  'credit-card':   <CreditCard size={18} />,
};

const quickLinks = [
  { to: '/krs',              label: 'KRS',                icon: <BookOpen size={20} />,      color: '#2563EB', bg: '#EFF6FF' },
  { to: '/khs',              label: 'KHS',                icon: <FileText size={20} />,      color: '#10B981', bg: '#ECFDF5' },
  { to: '/academic-journey', label: 'Perjalanan Akademik',icon: <Route size={20} />,         color: '#6366F1', bg: '#EEF2FF' },
  { to: '/academic-records', label: 'Riwayat Akademik',  icon: <GraduationCap size={20} />, color: '#0EA5E9', bg: '#E0F2FE' },
  { to: '/billing',          label: 'Tagihan',            icon: <CreditCard size={20} />,    color: '#F59E0B', bg: '#FFFBEB' },
  { to: '/admissions',       label: 'Penerimaan',         icon: <UserCheck size={20} />,     color: '#EF4444', bg: '#FEF2F2' },
];

export default function Overview() {
  const navigate = useNavigate();
  const totalSksActive = 16;
  const maxSks = 24;
  const progressPct = Math.round((31 / 144) * 100);

  return (
    <>
      <TrackHeader
        title={`Hai, ${student.nickname || student.name.split(' ')[0]}! 👋`}
        subtitle="Berikut ringkasan informasi akademik kamu hari ini."
      />

      {/* Hero Card */}
      <div className="track-hero-card">
        <div className="track-hero-greeting">Mahasiswa Aktif</div>
        <div className="track-hero-name">{student.name}</div>
        <div style={{ fontSize: 13, opacity: 0.85, marginTop: 2 }}>
          {student.prodi} · {student.fakultas}
        </div>
        <div className="track-hero-meta">
          <div className="track-hero-meta-item">
            <Calendar size={12} />
            Semester {student.activeSemester} · {student.activeAcademicYear}
          </div>
          <div className="track-hero-meta-item">
            <GraduationCap size={12} />
            {student.id}
          </div>
          <div className="track-hero-meta-item">
            <ShieldCheck size={12} />
            Angkatan {student.angkatan}
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="track-section">
        <div className="track-stat-grid">
          {overviewStats.map((stat) => {
            const cfg = statConfig[stat.color] || statConfig.primary;
            return (
              <TrackStatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                sub={stat.sub}
                icon={statIcons[stat.icon]}
                accentColor={cfg.color}
                bgColor={cfg.bg}
              />
            );
          })}
        </div>
      </div>

      {/* Main 2-col grid */}
      <div className="track-grid-main-side">
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* SKS Progress */}
          <TrackCard
            title="Progres Studi"
            icon={<TrendingUp size={15} />}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: 'var(--track-text-muted)', marginBottom: 4 }}>SKS Diselesaikan</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--track-primary)', letterSpacing: -1 }}>
                  31
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--track-text-muted)' }}> / 144</span>
                </div>
                <div className="track-progress-bar" style={{ marginTop: 10 }}>
                  <div className="track-progress-fill" style={{ width: `${progressPct}%` }} />
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--track-text-muted)', marginTop: 4 }}>
                  {progressPct}% selesai
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: 'var(--track-text-muted)', marginBottom: 4 }}>SKS Semester Ini</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#6366F1', letterSpacing: -1 }}>
                  {totalSksActive}
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--track-text-muted)' }}> / {maxSks}</span>
                </div>
                <div className="track-progress-bar" style={{ marginTop: 10 }}>
                  <div
                    className="track-progress-fill"
                    style={{ width: `${(totalSksActive / maxSks) * 100}%`, background: 'linear-gradient(90deg,#6366F1,#8B5CF6)' }}
                  />
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--track-text-muted)', marginTop: 4 }}>
                  {maxSks - totalSksActive} SKS tersisa
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1, background: 'var(--track-bg)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, color: 'var(--track-text-muted)', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>IPS Sem. 2</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--track-primary)', marginTop: 2 }}>{khs[2].ips}</div>
              </div>
              <div style={{ flex: 1, background: 'var(--track-bg)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, color: 'var(--track-text-muted)', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>IPK Kumulatif</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#10B981', marginTop: 2 }}>{khs[2].ipk}</div>
              </div>
              <div style={{ flex: 1, background: 'var(--track-bg)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, color: 'var(--track-text-muted)', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Dosen PA</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--track-text-primary)', marginTop: 4, lineHeight: 1.4 }}>{student.advisor}</div>
              </div>
            </div>
          </TrackCard>

          {/* Quick Access */}
          <TrackCard title="Akses Cepat" icon={<ArrowRight size={15} />}>
            <div className="track-quick-grid">
              {quickLinks.map((link) => (
                <div
                  key={link.to}
                  className="track-quick-item"
                  onClick={() => navigate(link.to)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && navigate(link.to)}
                >
                  <div
                    className="track-quick-item-icon"
                    style={{ '--track-quick-bg': link.bg, '--track-quick-color': link.color }}
                  >
                    {link.icon}
                  </div>
                  <span className="track-quick-item-label">{link.label}</span>
                </div>
              ))}
            </div>
          </TrackCard>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Tagihan */}
          <TrackCard
            title="Tagihan Aktif"
            icon={<CreditCard size={15} />}
            action="Lihat Detail"
            onAction={() => navigate('/billing')}
          >
            <div style={{ background: 'linear-gradient(135deg,#0F172A,#1E293B)', borderRadius: 12, padding: '16px 18px', color: 'white', marginBottom: 12 }}>
              <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 4 }}>{billingData.current.type}</div>
              <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>
                Rp {billingData.current.amount.toLocaleString('id-ID')}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, opacity: 0.75, marginTop: 6 }}>
                <AlertTriangle size={12} />
                Jatuh tempo: {billingData.current.dueDate}
              </div>
            </div>
            <TrackStatusBadge variant="warning" dot>
              {billingData.current.status}
            </TrackStatusBadge>
          </TrackCard>

          {/* Pengumuman */}
          <TrackCard
            title="Pengumuman"
            icon={<Megaphone size={15} />}
            action="Lihat Semua"
          >
            {announcements.map((ann) => (
              <div key={ann.id} className="track-announcement-item">
                <div
                  className="track-announcement-dot"
                  style={{ background: ann.urgent ? 'var(--track-danger)' : 'var(--track-primary)' }}
                />
                <div>
                  <div className="track-announcement-title">{ann.title}</div>
                  <div className="track-announcement-date">{ann.date}</div>
                  <div className="track-announcement-desc">{ann.desc}</div>
                </div>
              </div>
            ))}
          </TrackCard>

          {/* Status Info */}
          <TrackCard title="Informasi Akademik" icon={<GraduationCap size={15} />}>
            {[
              ['Program Studi', student.prodi],
              ['Fakultas', student.fakultas],
              ['Dosen PA', student.advisor],
              ['Email', student.email],
              ['Angkatan', student.angkatan],
              ['Status', student.status],
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
