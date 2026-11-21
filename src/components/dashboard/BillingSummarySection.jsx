import React from 'react';
import { CreditCard, ExternalLink, CheckCircle2, Calendar } from 'lucide-react';
import { studentProfile } from '../../shared/data/mockData';
import { useRouter } from '../../app/router';

export const BillingSummarySection = () => {
  const { navigate } = useRouter();
  const { tuition } = studentProfile;

  return (
    <section className="cw-aside-block" aria-labelledby="billing-heading">
      <div className="cw-aside-header">
        <div className="flex items-center gap-2">
          <div className="cw-aside-icon-badge">
            <CreditCard size={14} color="var(--color-dark-teal)" />
          </div>
          <h2 id="billing-heading" className="cw-aside-title">
            Informasi Tagihan Akademik
          </h2>
        </div>

        <span className="cw-billing-status-badge">
          <CheckCircle2 size={12} color="var(--color-success-500)" />
          {tuition.currentStatus}
        </span>
      </div>

      <div className="cw-billing-card">
        <div className="cw-billing-balance-row">
          <div>
            <span className="cw-billing-label">Tagihan UKT Semester 3</span>
            <div className="cw-billing-amount">
              {tuition.amountFormatted}
            </div>
          </div>
        </div>

        <div className="cw-billing-meta">
          <div className="cw-billing-meta-item">
            <span className="cw-meta-title">Status Pembayaran</span>
            <span className="cw-meta-val text-success">Lunas Terverifikasi</span>
          </div>
          <div className="cw-billing-meta-item">
            <span className="cw-meta-title">Batas Pembayaran Tahap 2</span>
            <span className="cw-meta-val">30 November 2026</span>
          </div>
        </div>

        <div className="cw-billing-footer">
          <span className="cw-receipt-no">Kwitansi: {tuition.invoiceNumber}</span>
          <button
            type="button"
            onClick={() => navigate('/track#tagihan')}
            className="cw-billing-track-link"
          >
            <span>Rincian di TRACK</span>
            <ExternalLink size={12} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BillingSummarySection;
