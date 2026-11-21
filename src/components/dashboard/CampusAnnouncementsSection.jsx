import React, { useState } from 'react';
import { 
  Bell, 
  Calendar, 
  ChevronRight, 
  FileText, 
  ArrowUpRight 
} from 'lucide-react';
import { announcements } from '../../shared/data/mockData';
import { Modal, Button } from '../ui';

export const CampusAnnouncementsSection = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const getCategoryClass = (category) => {
    switch (category) {
      case 'Akademik': return 'cw-category-badge--academic';
      case 'Beasiswa': return 'cw-category-badge--scholarship';
      case 'Layanan TI': return 'cw-category-badge--it';
      default: return 'cw-category-badge--general';
    }
  };

  return (
    <section className="cw-aside-block" aria-labelledby="announcements-heading">
      <div className="cw-aside-header">
        <div className="flex items-center gap-2">
          <div className="cw-aside-icon-badge">
            <Bell size={14} color="var(--color-dark-teal)" />
          </div>
          <h2 id="announcements-heading" className="cw-aside-title">
            Pengumuman Kampus
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setSelectedAnnouncement(announcements[0])}
          className="cw-aside-action-link"
        >
          Lihat Semua
        </button>
      </div>

      <div className="cw-announcements-list">
        {announcements.map((item) => (
          <article
            key={item.id}
            onClick={() => setSelectedAnnouncement(item)}
            className="cw-announcement-card"
          >
            <div className="cw-announcement-top">
              <span className={`cw-category-badge ${getCategoryClass(item.category)}`}>
                {item.category}
              </span>
              <span className="cw-announcement-date">
                <Calendar size={11} color="var(--color-secondary-text)" />
                {item.date}
              </span>
            </div>

            <h3 className="cw-announcement-heading">
              {item.title}
            </h3>

            <p className="cw-announcement-snippet">
              {item.summary}
            </p>
          </article>
        ))}
      </div>

      {/* Modal for full announcement view */}
      {selectedAnnouncement && (
        <Modal
          isOpen={Boolean(selectedAnnouncement)}
          onClose={() => setSelectedAnnouncement(null)}
          title={selectedAnnouncement.title}
          subtitle={`Diterbitkan oleh ${selectedAnnouncement.author} • ${selectedAnnouncement.date}`}
          footer={
            <div className="flex justify-between items-center w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedAnnouncement(null)}
              >
                Tutup
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  alert('Lampiran dokumen edaran resmi telah mulai diunduh.');
                }}
              >
                Unduh Dokumen Resmi
              </Button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
            <div className="flex items-center gap-2">
              <span className={`cw-category-badge ${getCategoryClass(selectedAnnouncement.category)}`}>
                {selectedAnnouncement.category}
              </span>
              <span className="text-2xs text-muted">Cakrawala University</span>
            </div>

            <p className="text-xs text-body" style={{ lineHeight: 1.6 }}>
              {selectedAnnouncement.content}
            </p>

            <div
              style={{
                marginTop: '12px',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-light-neutral)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FileText size={16} color="var(--color-dark-teal)" />
              <span className="text-2xs text-muted font-medium">Lampiran: Dokumen_Edaran_Rektorat_2026.pdf (1.2 MB)</span>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default CampusAnnouncementsSection;
