import React, { useState } from 'react';
import {
  FileText,
  Search,
  Download,
  ExternalLink,
  Presentation,
  Video,
  FileCheck,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { materials } from '../../data/materials';
import { courses } from '../../data/courses';
import RiseHeader from '../../components/RiseHeader';
import RiseBadge from '../../components/RiseBadge';
import RiseEmptyState from '../../components/RiseEmptyState';

export default function Materials() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const categories = ['all', 'Documents', 'Presentations', 'Videos', 'External Links'];

  const filteredMaterials = materials.filter((m) => {
    if (selectedCourse !== 'all' && m.courseCode !== selectedCourse) return false;
    if (selectedCategory !== 'all' && m.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchDesc = m.description.toLowerCase().includes(q);
      const matchCourse = m.courseName.toLowerCase().includes(q) || m.courseCode.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCourse) return false;
    }
    return true;
  });

  const handleSimulateDownload = (title) => {
    setToastMessage(`Mengunduh materi: "${title}"...`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileText size={22} color="#EF4444" />;
      case 'pptx':
        return <Presentation size={22} color="#F59E0B" />;
      case 'video':
        return <Video size={22} color="#0EA5E9" />;
      case 'link':
        return <ExternalLink size={22} color="#10B981" />;
      default:
        return <FileText size={22} color="#07455C" />;
    }
  };

  return (
    <div className="rise-materials-page">
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
            borderLeft: '4px solid #CEAE65',
          }}
        >
          <CheckCircle2 size={18} color="#CEAE65" />
          <span>{toastMessage}</span>
        </div>
      )}

      <RiseHeader
        title="Repositori Materi Perkuliahan"
        subtitle="Unduh modul bahan ajar, berkas slide presentasi kuliah, rekaman sesi praktikum, dan referensi eksternal resmi."
      />

      {/* Search and Filters */}
      <div className="rise-search-filter-row">
        <div className="rise-search-wrapper">
          <span className="rise-search-icon">
            <Search size={16} />
          </span>
          <input
            type="text"
            className="rise-search-input"
            placeholder="Cari materi kuliah, topik modul, atau dosen pengampu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="rise-filter-group">
          {/* Course filter */}
          <select
            className="rise-filter-select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="all">Semua Mata Kuliah ({courses.length})</option>
            {courses.map((c) => (
              <option key={c.id} value={c.code}>
                {c.code} · {c.name}
              </option>
            ))}
          </select>

          {/* Category filter */}
          <select
            className="rise-filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Semua Kategori</option>
            <option value="Documents">Dokumen PDF (Modul)</option>
            <option value="Presentations">Slide Presentasi</option>
            <option value="Videos">Video Rekaman Kuliah</option>
            <option value="External Links">Tautan Eksternal</option>
          </select>
        </div>
      </div>

      <div style={{ fontSize: '12.5px', color: '#65747A', marginBottom: '16px', fontWeight: 500 }}>
        Menampilkan {filteredMaterials.length} dari {materials.length} total materi pembelajaran
      </div>

      {/* Materials List */}
      {filteredMaterials.length === 0 ? (
        <RiseEmptyState
          icon={FileText}
          title="Tidak Ada Materi Ditemukan"
          message="Tidak ada bahan materi kuliah yang cocok dengan kata kunci atau filter yang Anda pilih."
          action={
            <button
              className="rise-btn rise-btn-outline rise-btn-sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCourse('all');
                setSelectedCategory('all');
              }}
            >
              Reset Filter
            </button>
          }
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredMaterials.map((item) => (
            <div
              key={item.id}
              className="rise-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                flexWrap: 'wrap',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: '280px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    background: '#F1F5F4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {getFileIcon(item.fileType)}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                    <RiseBadge variant="primary">{item.courseCode}</RiseBadge>
                    <RiseBadge variant="neutral">{item.category}</RiseBadge>
                  </div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '14.5px', fontWeight: 600, color: '#082F3D' }}>
                    {item.title}
                  </h4>
                  <p
                    style={{
                      margin: '0 0 6px',
                      fontSize: '12.5px',
                      color: '#65747A',
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.description}
                  </p>
                  <div style={{ fontSize: '11.5px', color: '#94A3A8', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <span>Dosen: {item.lecturer}</span>
                    <span>•</span>
                    <span>Diunggah: {item.uploadDate}</span>
                    <span>•</span>
                    <span>Ukuran: {item.fileSize}</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="rise-btn rise-btn-primary rise-btn-sm"
                  onClick={() => handleSimulateDownload(item.title)}
                >
                  {item.fileType === 'link' ? <ExternalLink size={14} /> : <Download size={14} />}
                  <span>{item.fileType === 'link' ? 'Buka Tautan' : 'Unduh Berkas'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
