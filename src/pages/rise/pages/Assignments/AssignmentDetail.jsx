import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  User,
  UploadCloud,
  FileCheck,
  FileText,
  Download,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Send,
  Calendar,
  Award
} from 'lucide-react';
import { assignments } from '../../data/assignments';
import RiseBadge from '../../components/RiseBadge';
import RiseCard from '../../components/RiseCard';
import RiseEmptyState from '../../components/RiseEmptyState';

export default function AssignmentDetail() {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const initialAssignment = assignments.find((a) => a.id === assignmentId);

  // Local state for simulation
  const [assignment, setAssignment] = useState(initialAssignment);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!assignment) {
    return (
      <div>
        <button
          onClick={() => navigate('/assignments')}
          className="rise-btn rise-btn-ghost rise-btn-sm"
          style={{ marginBottom: '16px' }}
        >
          <ArrowLeft size={16} /> Kembali ke Assignments
        </button>
        <RiseEmptyState
          title="Tugas Tidak Ditemukan"
          message={`Data tugas dengan ID "${assignmentId}" tidak ditemukan.`}
        />
      </div>
    );
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        type: file.name.split('.').pop(),
      });
    }
  };

  const handleSimulateSubmit = () => {
    if (!selectedFile && assignment.status !== 'submitted') {
      alert('Silakan pilih berkas file tugas Anda terlebih dahulu.');
      return;
    }

    setAssignment((prev) => ({
      ...prev,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
    }));

    setToastMessage('Tugas berhasil dikumpulkan ke sistem!');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isSubmitted = assignment.status === 'submitted';
  const isOverdue = assignment.status === 'overdue';

  return (
    <div className="rise-assignment-detail-page">
      {/* Toast Notification */}
      {showToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#07455C',
            color: '#FFFFFF',
            padding: '14px 20px',
            borderRadius: '10px',
            boxShadow: '0 8px 24px rgba(7,69,92,0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 9999,
            fontSize: '13.5px',
            fontWeight: 600,
            borderLeft: '4px solid #10B981',
          }}
        >
          <CheckCircle2 size={18} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Back Button */}
      <div style={{ marginBottom: '16px' }}>
        <button
          type="button"
          onClick={() => navigate('/assignments')}
          className="rise-btn rise-btn-ghost rise-btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={16} /> Kembali ke Daftar Tugas
        </button>
      </div>

      {/* Header Card */}
      <div className="rise-card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
              <RiseBadge variant="primary">{assignment.courseCode}</RiseBadge>
              <RiseBadge variant="neutral">{assignment.courseName}</RiseBadge>
              <RiseBadge
                variant={isSubmitted ? 'success' : isOverdue ? 'danger' : 'warning'}
                dot
              >
                {assignment.status}
              </RiseBadge>
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#082F3D', margin: '0 0 8px' }}>
              {assignment.title}
            </h1>
            <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#65747A', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} /> Dosen: {assignment.lecturer}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} /> Batas Akhir: {formatDateTime(assignment.dueDate)}
              </span>
            </div>
          </div>

          {assignment.grade !== null && (
            <div
              style={{
                background: '#ECFDF5',
                border: '1px solid #10B981',
                padding: '12px 18px',
                borderRadius: '10px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#10B981', textTransform: 'uppercase' }}>
                Nilai Akhir
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#07455C' }}>
                {assignment.grade}/100
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="rise-grid-main-side">
        {/* Main Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Instructions */}
          <RiseCard title="Instruksi Pengerjaan" icon={<FileText size={18} />}>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#082F3D', margin: '0 0 16px' }}>
              {assignment.description}
            </p>
            {assignment.instructions && (
              <div
                style={{
                  background: '#F7F8F5',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid #DDE5E4',
                  fontSize: '13.5px',
                  lineHeight: 1.7,
                  color: '#082F3D',
                  whiteSpace: 'pre-line',
                }}
              >
                {assignment.instructions}
              </div>
            )}
          </RiseCard>

          {/* Attachments from Lecturer */}
          {assignment.attachments && assignment.attachments.length > 0 && (
            <RiseCard title="Berkas Lampiran Dosen" icon={<Download size={18} />}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {assignment.attachments.map((file, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      background: '#F7F8F5',
                      borderRadius: '8px',
                      border: '1px solid #DDE5E4',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <FileText size={18} color="#07455C" />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#082F3D' }}>
                          {file.name}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#65747A' }}>{file.size}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="rise-btn rise-btn-outline rise-btn-sm"
                      onClick={() => alert(`Mengunduh berkas: ${file.name}`)}
                    >
                      <Download size={14} /> Unduh
                    </button>
                  </div>
                ))}
              </div>
            </RiseCard>
          )}

          {/* Submission Area */}
          <RiseCard
            title={isSubmitted ? 'Berkas Tugas yang Telah Dikumpulkan' : 'Form Pengumpulan Berkas'}
            icon={<UploadCloud size={18} />}
          >
            {isSubmitted ? (
              <div>
                <div
                  style={{
                    background: '#ECFDF5',
                    border: '1px solid #10B981',
                    borderRadius: '10px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <FileCheck size={28} color="#10B981" />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#082F3D' }}>
                        {selectedFile ? selectedFile.name : `Submission_${assignment.id}_Denis_Athaullah.zip`}
                      </div>
                      <div style={{ fontSize: '12px', color: '#65747A' }}>
                        Waktu submit: {formatDateTime(assignment.submittedAt || '2025-11-04T18:40:00')}
                      </div>
                    </div>
                  </div>
                  <RiseBadge variant="success">Sudah Dikumpulkan</RiseBadge>
                </div>
                <p style={{ fontSize: '12.5px', color: '#65747A', margin: 0 }}>
                  Pengumpulan tugas telah diterima di server Cakrawala RISE. Anda dapat mengganti berkas sebelum batas waktu berakhir.
                </p>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />

                <div
                  className="rise-upload-area"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  style={{
                    border: '2px dashed #07455C',
                    background: '#F7F8F5',
                    borderRadius: '12px',
                    padding: '32px 20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    marginBottom: '16px',
                  }}
                >
                  <UploadCloud size={38} color="#07455C" style={{ margin: '0 auto 10px' }} />
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#082F3D', marginBottom: '4px' }}>
                    Klik di sini atau tarik file ke area ini
                  </div>
                  <div style={{ fontSize: '12px', color: '#65747A' }}>
                    Format yang didukung: ZIP, PDF, RAR, SQL (Maks. 50 MB)
                  </div>
                </div>

                {selectedFile && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      background: '#E8F4F7',
                      borderRadius: '8px',
                      border: '1px solid #07455C',
                      marginBottom: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FileText size={18} color="#07455C" />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#082F3D' }}>
                          {selectedFile.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#65747A' }}>{selectedFile.size}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="rise-btn rise-btn-ghost rise-btn-sm"
                      style={{ color: '#EF4444' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button
                    type="button"
                    className="rise-btn rise-btn-primary"
                    onClick={handleSimulateSubmit}
                  >
                    <Send size={16} /> Serahkan Tugas (Submit)
                  </button>
                </div>
              </div>
            )}
          </RiseCard>
        </div>

        {/* Side Info Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <RiseCard title="Status Pengerjaan" icon={<Clock size={18} />}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#65747A' }}>Status Berkas:</span>
                <span style={{ fontWeight: 600, color: isSubmitted ? '#10B981' : '#F59E0B' }}>
                  {isSubmitted ? 'Sudah Diserahkan' : 'Belum Diserahkan'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#65747A' }}>Tenggat Waktu:</span>
                <span style={{ fontWeight: 600, color: '#082F3D' }}>
                  {formatDateTime(assignment.dueDate)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#65747A' }}>Sisa Waktu:</span>
                <span style={{ fontWeight: 600, color: isOverdue ? '#EF4444' : '#07455C' }}>
                  {isOverdue ? 'Tenggat Terlewati' : '7 Hari Tersisa'}
                </span>
              </div>
            </div>
          </RiseCard>

          <RiseCard title="Informasi Mata Kuliah" icon={<BookOpen size={18} />}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ fontWeight: 700, color: '#082F3D' }}>{assignment.courseName}</div>
              <div style={{ color: '#65747A' }}>Kode: {assignment.courseCode}</div>
              <div style={{ color: '#65747A' }}>Dosen: {assignment.lecturer}</div>
              <button
                type="button"
                className="rise-btn rise-btn-outline rise-btn-sm"
                style={{ marginTop: '8px' }}
                onClick={() => navigate(`/courses/${assignment.courseId}`)}
              >
                Buka Halaman Kuliah
              </button>
            </div>
          </RiseCard>
        </div>
      </div>
    </div>
  );
}
