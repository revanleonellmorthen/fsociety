import { CreditCard, Clock, CheckCircle, AlertTriangle, Receipt } from 'lucide-react';
import TrackHeader from '../components/TrackHeader';
import TrackCard from '../components/TrackCard';
import TrackStatusBadge from '../components/TrackStatusBadge';
import { billingData } from '../data/mockData';

const statusVariant = {
  'Lunas':        'success',
  'Belum Dibayar': 'warning',
  'Jatuh Tempo':  'danger',
};

const statusIcons = {
  'Lunas':        <CheckCircle size={14} />,
  'Belum Dibayar': <Clock size={14} />,
  'Jatuh Tempo':  <AlertTriangle size={14} />,
};

function formatRp(amount) {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

export default function Billing() {
  const { current, history } = billingData;
  const variant = statusVariant[current.status] || 'neutral';

  return (
    <>
      <TrackHeader
        title="Tagihan & Pembayaran"
        subtitle="Informasi administrasi keuangan akademik kamu."
      />

      {/* Hero billing card */}
      <div className="track-billing-hero">
        <div>
          <div className="track-billing-amount-label">{current.type}</div>
          <div className="track-billing-amount">{formatRp(current.amount)}</div>
          <div className="track-billing-due">
            <Clock size={12} />
            Jatuh tempo: {current.dueDate}
          </div>
        </div>
        <div className="track-billing-status-paid" style={
          current.status !== 'Lunas'
            ? { background: 'rgba(245,158,11,0.15)', borderColor: 'rgba(245,158,11,0.3)', color: '#FCD34D' }
            : {}
        }>
          {statusIcons[current.status]}
          {current.status}
        </div>
      </div>

      <div className="track-grid-main-side">
        {/* Left — bill details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          <TrackCard title="Rincian Tagihan" icon={<Receipt size={15} />}>
            {[
              ['No. Invoice', current.id],
              ['Jenis', current.type],
              ['Tanggal Terbit', current.issuedDate],
              ['Jatuh Tempo', current.dueDate],
              ['Status', null],
            ].map(([label, value]) => (
              <div key={label} className="track-info-row">
                <span className="track-info-row-label">{label}</span>
                {value !== null
                  ? <span className="track-info-row-value">{value}</span>
                  : <TrackStatusBadge variant={variant} dot>{current.status}</TrackStatusBadge>
                }
              </div>
            ))}

            <div className="track-divider" />
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--track-text-secondary)', marginBottom: 10 }}>Komponen Tagihan</div>
            {current.details.map(d => (
              <div key={d.label} className="track-info-row">
                <span className="track-info-row-label">{d.label}</span>
                <span className="track-info-row-value">{formatRp(d.amount)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 0', fontWeight: 800, fontSize: 15, color: 'var(--track-text-primary)', borderTop: '2px solid var(--track-border)', marginTop: 4 }}>
              <span>Total Tagihan</span>
              <span style={{ color: 'var(--track-primary)' }}>{formatRp(current.amount)}</span>
            </div>

            {current.status !== 'Lunas' && (
              <div style={{ marginTop: 16 }}>
                <button className="track-btn track-btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 12 }}>
                  <CreditCard size={15} />
                  Bayar Sekarang
                </button>
                <div style={{ fontSize: 11.5, color: 'var(--track-text-muted)', textAlign: 'center', marginTop: 8 }}>
                  *Tombol ini adalah simulasi. Tidak ada transaksi nyata.
                </div>
              </div>
            )}
          </TrackCard>
        </div>

        {/* Right — history */}
        <TrackCard title="Riwayat Pembayaran" icon={<Clock size={15} />}>
          {history.map(txn => (
            <div key={txn.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 0', borderBottom: '1px solid var(--track-border)',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: txn.status === 'Lunas' ? 'var(--track-success-light)' : 'var(--track-warning-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: txn.status === 'Lunas' ? 'var(--track-success)' : 'var(--track-warning)',
              }}>
                {txn.status === 'Lunas' ? <CheckCircle size={18} /> : <Clock size={18} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--track-text-primary)' }}>{txn.type}</div>
                <div style={{ fontSize: 11.5, color: 'var(--track-text-muted)', marginTop: 1 }}>
                  {txn.paidAt ? `Dibayar: ${txn.paidAt}` : '—'} · {txn.id}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, fontSize: 13.5 }}>{formatRp(txn.amount)}</div>
                <TrackStatusBadge variant={statusVariant[txn.status] || 'neutral'}>
                  {txn.status}
                </TrackStatusBadge>
              </div>
            </div>
          ))}

          <div style={{ padding: '14px 0 0', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 13.5, borderTop: '2px solid var(--track-border)', marginTop: 4 }}>
            <span style={{ color: 'var(--track-text-secondary)' }}>Total Dibayar</span>
            <span style={{ color: 'var(--track-success)' }}>
              {formatRp(history.filter(t => t.status === 'Lunas').reduce((s, t) => s + t.amount, 0))}
            </span>
          </div>
        </TrackCard>
      </div>
    </>
  );
}
