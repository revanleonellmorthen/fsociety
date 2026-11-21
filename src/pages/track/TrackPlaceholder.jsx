import React from 'react';
import { 
  Compass, 
  ArrowLeft, 
  FileCheck2, 
  Award, 
  CalendarDays, 
  CreditCard, 
  CheckCircle2, 
  Code 
} from 'lucide-react';
import { Card, Badge, Button, ProgressBar, SectionHeader } from '../../components/ui';
import { studentProfile, activeCourses } from '../../shared/data/mockData';
import { useRouter } from '../../app/router';

export const TrackPlaceholder = () => {
  const { navigate } = useRouter();

  return (
    <div className="app-container">
      {/* Module Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'clamp(20px, 4vw, 32px)',
          color: '#ffffff',
          marginBottom: 'var(--spacing-6)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'var(--spacing-4)',
          flexWrap: 'wrap'
        }}
      >
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: '8px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                textTransform: 'uppercase'
              }}
            >
              <Compass size={14} color="#f59e0b" /> Modul Akademik (SIAKAD)
            </span>
            <Badge variant="warning" size="sm">Workspace Tim Akademik</Badge>
          </div>

          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#ffffff' }}>
            TRACK — Academic Information System
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', maxWidth: '600px', marginTop: '6px' }}>
            Pusat administrasi studi mahasiswa: Rencana Studi (KRS), Hasil Studi (KHS), Transkrip Kumulatif, Presensi Kuliah, dan Kalender Akademik Resmi.
          </p>
        </div>

        <Button
          variant="secondary"
          size="md"
          leftIcon={<ArrowLeft size={16} />}
          onClick={() => navigate('/')}
        >
          Kembali ke Home
        </Button>
      </div>

      {/* Integration Handoff Notice */}
      <Card
        variant="default"
        padding="md"
        style={{
          marginBottom: 'var(--spacing-6)',
          borderLeft: '4px solid #f59e0b',
          backgroundColor: 'var(--color-bg-surface)'
        }}
      >
        <div className="flex items-start gap-3">
          <div
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#fef3c7',
              color: '#d97706'
            }}
          >
            <Code size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm text-main">Developer Contract & Panduan Tim TRACK</h3>
            <p className="text-xs text-muted" style={{ lineHeight: 1.5, marginTop: '4px' }}>
              Area ini disiapkan untuk modul <strong>TRACK</strong>. Rekan tim yang bertanggung jawab dapat membangun halaman internal SIAKAD (KRS, KHS, Transkrip Nilai, Tagihan UKT) di dalam <code>src/pages/track/</code> dengan memanfaatkan shared components dan design tokens yang telah tersedia.
            </p>
          </div>
        </div>
      </Card>

      {/* Quick Summary Preview of Student SIAKAD data */}
      <SectionHeader
        title="Status Rencana Studi (KRS) Semester Ini"
        subtitle="Data terverifikasi oleh Dosen Pembimbing Akademik"
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--spacing-4)',
          marginBottom: 'var(--spacing-8)'
        }}
      >
        <Card variant="default" padding="md">
          <div className="flex items-center gap-2" style={{ marginBottom: '8px' }}>
            <FileCheck2 size={18} color="var(--color-primary-600)" />
            <h4 className="font-bold text-sm text-main">KRS Terverifikasi</h4>
          </div>
          <p className="text-xs text-muted" style={{ marginBottom: '12px' }}>
            Total 21 SKS telah disetujui oleh {studentProfile.academicAdvisor.name}.
          </p>
          <Badge variant="success" size="sm">Status: Disetujui</Badge>
        </Card>

        <Card variant="default" padding="md">
          <div className="flex items-center gap-2" style={{ marginBottom: '8px' }}>
            <Award size={18} color="#8b5cf6" />
            <h4 className="font-bold text-sm text-main">Indeks Prestasi Kumulatif</h4>
          </div>
          <p className="text-xs text-muted" style={{ marginBottom: '12px' }}>
            IPK: <span className="font-bold text-main">{studentProfile.stats.currentGpa}</span> (44 SKS Lulus dari target 144 SKS).
          </p>
          <Badge variant="neutral" size="sm">Predikat: Pujian</Badge>
        </Card>

        <Card variant="default" padding="md">
          <div className="flex items-center gap-2" style={{ marginBottom: '8px' }}>
            <CreditCard size={18} color="var(--color-success-600)" />
            <h4 className="font-bold text-sm text-main">Status Keuangan UKT</h4>
          </div>
          <p className="text-xs text-muted" style={{ marginBottom: '12px' }}>
            UKT Semester Ganjil 2026/2027 telah terbayar lunas.
          </p>
          <Badge variant="success" size="sm">Lunas: Rp 5.499.000</Badge>
        </Card>
      </div>
    </div>
  );
};

export default TrackPlaceholder;
