import React, { useState } from 'react';
import { 
  GraduationCap, 
  ArrowLeft, 
  BookOpen, 
  CheckSquare, 
  Code, 
  Layers, 
  ExternalLink,
  Sparkles,
  FileCode2,
  Clock
} from 'lucide-react';
import { Card, Badge, Button, ProgressBar, SectionHeader } from '../../components/ui';
import { activeCourses, upcomingAssignments } from '../../shared/data/mockData';
import { useRouter } from '../../app/router';

export const RisePlaceholder = () => {
  const { navigate, currentHash } = useRouter();
  const [activeTab, setActiveTab] = useState('courses');

  return (
    <div className="app-container">
      {/* Module Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
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
              <GraduationCap size={14} /> Modul Pembelajaran (LMS)
            </span>
            <Badge variant="info" size="sm">Workspace Tim Pembelajaran</Badge>
          </div>

          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#ffffff' }}>
            RISE — Learning Management System
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', maxWidth: '600px', marginTop: '6px' }}>
            Modul ini didedikasikan untuk materi perkuliahan, pengumpulan tugas, kuis online, dan forum diskusi mahasiswa Cakrawala.
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
          borderLeft: '4px solid var(--color-rise-500)',
          backgroundColor: 'var(--color-bg-surface)'
        }}
      >
        <div className="flex items-start gap-3">
          <div
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-rise-50)',
              color: 'var(--color-rise-600)'
            }}
          >
            <Code size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm text-main">Developer Contract & Panduan Tim RISE</h3>
            <p className="text-xs text-muted" style={{ lineHeight: 1.5, marginTop: '4px' }}>
              Area ini adalah placeholder untuk implementasi modul <strong>RISE</strong> oleh rekan tim Anda. 
              Gunakan shared components dari <code>src/components/ui/</code> dan tokens dari <code>src/shared/styles/tokens.css</code> agar tampilan tetap selaras dengan Cakrawala Design System tanpa merubah struktur Home.
            </p>
          </div>
        </div>
      </Card>

      {/* Preview of courses and assignments using shared components */}
      <SectionHeader
        title="Daftar Kursus Terdaftar di RISE"
        subtitle="Komponen dibangun menggunakan Shared Card & Shared Badge"
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--spacing-4)',
          marginBottom: 'var(--spacing-8)'
        }}
      >
        {activeCourses.map(course => (
          <Card
            key={course.id}
            variant="interactive"
            padding="md"
            style={{ borderLeft: `4px solid ${course.color}` }}
          >
            <div className="flex justify-between items-start" style={{ marginBottom: '8px' }}>
              <span className="font-bold text-xs text-muted">{course.code}</span>
              <Badge variant="info" size="sm">{course.sks} SKS</Badge>
            </div>

            <h4 className="font-bold text-sm text-main" style={{ marginBottom: '6px' }}>
              {course.name}
            </h4>
            <p className="text-xs text-muted" style={{ marginBottom: '14px' }}>
              Dosen: {course.lecturer}
            </p>

            <div>
              <div className="flex justify-between text-2xs text-muted" style={{ marginBottom: '4px' }}>
                <span>Progres Materi</span>
                <span className="font-semibold">{course.progress}%</span>
              </div>
              <ProgressBar value={course.progress} variant="info" size="sm" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RisePlaceholder;
