# TRACK Module — Cakrawala Academic Information System

Modul **TRACK** adalah bagian dari platform akademik terintegrasi **Cakrawala**. Modul ini berfokus pada administrasi, informasi, dan perjalanan akademik mahasiswa.

---

## Tujuan Modul

TRACK memberikan akses terorganisir terhadap seluruh informasi akademik mahasiswa dalam satu antarmuka yang terpadu, meliputi rencana studi, hasil studi, perjalanan akademik, tagihan, dan data penerimaan.

---

## Struktur Folder

```text
src/track/
├── components/
│   ├── TrackHeader.jsx       # Page-level header dengan title & subtitle
│   ├── TrackCard.jsx         # Reusable card container
│   ├── TrackStatCard.jsx     # Metric card dengan accent color
│   ├── TrackTable.jsx        # Generic data table
│   └── TrackStatusBadge.jsx  # Status/label badge (6 varian)
│
├── pages/
│   ├── Overview.jsx          # Ringkasan akademik + quick access
│   ├── KRS.jsx               # Kartu Rencana Studi (interaktif)
│   ├── KHS.jsx               # Kartu Hasil Studi per semester
│   ├── AcademicRecords.jsx   # Riwayat akademik lengkap
│   ├── Billing.jsx           # Tagihan & riwayat pembayaran
│   ├── Admissions.jsx        # Penerimaan & status administrasi
│   └── AcademicJourney.jsx   # Perjalanan akademik semester aktif
│
├── layouts/
│   └── TrackLayout.jsx       # Sidebar + topbar layout
│
├── data/
│   └── mockData.js           # Semua dummy data realistis
│
├── styles/
│   └── track.css             # Semua style dengan prefix .track-
│
├── TrackModule.jsx           # Entry point (integration-ready)
└── README.md                 # Dokumentasi ini
```

---

## Daftar Fitur

| Halaman | Fitur Utama |
|---|---|
| **Overview** | Status akademik, stat cards, SKS progress, quick access, tagihan, pengumuman |
| **KRS** | Pilih/hapus mata kuliah, SKS meter, submit/revisi, batas maks SKS |
| **KHS** | Selector semester, tabel nilai, IPS/IPK cards, distribusi nilai (bar chart) |
| **Academic Journey** | Semester aktif saja, progres, aktivitas, riwayat collapsible |
| **Academic Records** | Identitas mahasiswa, ringkasan IPK, accordion riwayat semester |
| **Billing** | Hero tagihan, rincian komponen, riwayat transaksi |
| **Admissions** | Info registrasi, timeline, checklist dokumen, pengumuman |

---

## Cara Menjalankan Standalone Preview

```bash
# 1. Install dependencies (jika belum)
npm install

# 2. Jalankan dev server
npm run dev

# 3. Buka di browser
# http://localhost:5173
```

---

## Entry Point

```jsx
// Penggunaan di aplikasi utama Cakrawala:
import TrackModule from './track/TrackModule';

function App() {
  return <TrackModule />;
}
```

---

## Dependency

| Package | Versi | Kegunaan |
|---|---|---|
| `react` | ^19 | UI framework |
| `react-dom` | ^19 | DOM renderer |
| `react-router-dom` | ^7 | Internal routing (HashRouter) |
| `lucide-react` | ^0.468 | Icon set |

> Tidak ada dependency tambahan di luar yang tercantum di atas.

---

## Komponen Reusable

### `TrackStatusBadge`
```jsx
<TrackStatusBadge variant="success" dot>Aktif</TrackStatusBadge>
// variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary'
```

### `TrackCard`
```jsx
<TrackCard title="Judul" icon={<Icon />} action="Lihat" onAction={() => {}}>
  {/* content */}
</TrackCard>
```

### `TrackStatCard`
```jsx
<TrackStatCard
  label="IPK"
  value="3.76"
  sub="Skala 4.00"
  icon={<TrendingUp size={18} />}
  accentColor="#2563EB"
  bgColor="#EFF6FF"
/>
```

### `TrackTable`
```jsx
<TrackTable
  columns={[
    { key: 'name', label: 'Nama', render: (val, row) => <strong>{val}</strong> },
    { key: 'sks', label: 'SKS', width: 60, align: 'center' },
  ]}
  rows={data}
  emptyMessage="Tidak ada data."
/>
```

### `TrackHeader`
```jsx
<TrackHeader title="Judul Halaman" subtitle="Deskripsi singkat">
  {/* Optional right-side slot */}
</TrackHeader>
```

---

## Cara Memindahkan ke Repository Utama

1. **Copy folder** `src/track/` ke repo utama Cakrawala tanpa modifikasi apapun.
2. **Import di App utama:**
   ```jsx
   import TrackModule from './track/TrackModule';
   ```
3. **Ganti routing** (opsional): Jika aplikasi utama sudah menggunakan `BrowserRouter`, ganti `HashRouter` di `TrackModule.jsx` dengan nested `<Routes>` di bawah path `/track/*`.
4. **Jangan modifikasi** file di luar `src/track/`.

---

## Penggunaan Shared Design Tokens dari Home

Saat ini TRACK mendefinisikan design tokens sendiri dengan prefix `--track-*` sebagai nilai default. Untuk menggunakan shared tokens dari Home:

1. Hapus deklarasi `--track-*` di `.track-container` dalam `track.css`.
2. Ganti nilai fallback dengan nama token shared, contoh:
   ```css
   /* Sebelum (standalone) */
   --track-primary: #2563EB;

   /* Sesudah (terintegrasi) */
   /* Gunakan langsung var(--color-primary) dari Home */
   ```
3. Pastikan Home/global stylesheet sudah di-load sebelum TRACK.

---

## Hal yang Perlu Disesuaikan Saat Integrasi

| Item | Aksi |
|---|---|
| **Routing** | Ganti `HashRouter` → nested `Routes` di bawah `/track/*` |
| **Design tokens** | Sesuaikan `--track-*` dengan token dari Home |
| **Data** | Ganti `mockData.js` dengan API calls ke backend Cakrawala |
| **User info** | Ambil data mahasiswa dari context/auth global |
| **Topbar** | Lepas topbar internal jika sudah ada global topbar |
| **Sidebar** | Lepas sidebar internal jika integrasi penuh dengan nav global |

---

## CSS Isolation

Semua class CSS menggunakan prefix `.track-` agar tidak memengaruhi modul lain.
Tidak ada perubahan pada selector global `body`, `html`, `:root`, atau `*`.

```css
/* ✅ Benar */
.track-card { ... }
.track-btn-primary { ... }

/* ❌ Jangan */
body { font-family: ... }
:root { --color: ... }
```
