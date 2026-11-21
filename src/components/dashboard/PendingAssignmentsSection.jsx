import React, { useState } from 'react';
import { 
  Clock, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight 
} from 'lucide-react';
import { upcomingAssignments } from '../../shared/data/mockData';
import { useRouter } from '../../app/router';

export const PendingAssignmentsSection = () => {
  const { navigate } = useRouter();
  const [assignments, setAssignments] = useState(
    upcomingAssignments.filter(a => a.status !== 'submitted')
  );

  const handleToggleComplete = (id) => {
    // Allows marking complete and removing from pending list
    setAssignments(prev => prev.filter(a => a.id !== id));
  };

  const getUrgencyBadge = (priority, deadlineLabel) => {
    if (priority === 'high' || deadlineLabel.includes('Hari ini')) {
      return (
        <span className="cw-urgency-badge cw-urgency-badge--urgent">
          <span className="cw-urgency-dot" />
          Mendesak • Hari Ini
        </span>
      );
    }
    if (priority === 'medium') {
      return (
        <span className="cw-urgency-badge cw-urgency-badge--upcoming">
          Mendatang
        </span>
      );
    }
    return (
      <span className="cw-urgency-badge cw-urgency-badge--normal">
        Pekan Depan
      </span>
    );
  };

  return (
    <section className="cw-section-block" aria-labelledby="pending-assignments-heading">
      <div className="cw-section-header-clean">
        <div>
          <h2 id="pending-assignments-heading" className="cw-section-title">
            Tugas Belum Selesai
          </h2>
          <p className="cw-section-subtitle">
            Daftar penugasan aktif dari modul pembelajaran RISE yang belum kamu kumpulkan
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/rise#assignments')}
          className="cw-text-link"
        >
          <span>Buka di RISE</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {assignments.length === 0 ? (
        <div className="cw-empty-state-clean">
          <CheckCircle2 size={32} color="var(--color-success-500)" />
          <h3 className="cw-empty-title">Semua Tugas Sudah Selesai</h3>
          <p className="cw-empty-desc">
            Bagus sekali! Tidak ada tugas pending saat ini. Kamu bisa memeriksa kembali materi di modul RISE.
          </p>
        </div>
      ) : (
        <div className="cw-assignments-list">
          {assignments.map((item) => (
            <div key={item.id} className="cw-assignment-row">
              {/* Left Indicator & Main Info */}
              <div className="cw-assignment-info">
                <div className="cw-assignment-meta-row">
                  <span className="cw-course-pill">{item.courseCode} — {item.courseName}</span>
                  {getUrgencyBadge(item.priority, item.deadlineLabel)}
                </div>

                <h3 className="cw-assignment-title">
                  {item.title}
                </h3>

                <div className="cw-assignment-deadline">
                  <Clock size={13} color="var(--color-secondary-text)" />
                  <span>Batas waktu: <strong>{item.deadlineLabel}</strong></span>
                  <span className="cw-meta-dot">•</span>
                  <span>{item.weight}</span>
                </div>
              </div>

              {/* Right Action buttons */}
              <div className="cw-assignment-actions">
                <button
                  type="button"
                  onClick={() => handleToggleComplete(item.id)}
                  className="cw-btn-complete"
                  title="Tandai selesai dan hilangkan dari daftar"
                >
                  <CheckCircle2 size={15} />
                  <span>Selesai</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/rise#assignments')}
                  className="cw-btn-rise"
                  title="Kerjakan dan kumpulkan di RISE"
                >
                  <span>Kerjakan di RISE</span>
                  <ExternalLink size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PendingAssignmentsSection;
