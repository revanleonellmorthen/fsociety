# Cakrawala — Your Academic Life, Connected
> **Unified Academic Dashboard & Shared Design System**  
> Fondasi arsitektur frontend bersama untuk Cakrawala University Superapp (Home, RISE LMS, dan TRACK SIAKAD).

---

## 1. Overview & Konsep Produk

Cakrawala Home dirancang sebagai **welcoming academic landing dashboard**, bukan sekadar administrative analytics dashboard. 

Tujuan utama Home adalah memberikan kejelasan instan kepada mahasiswa dalam hitungan detik mengenai:
1. **Tugas apa yang belum diselesaikan** (Pending Assignments dari RISE).
2. **Perkuliahan apa yang ada hari ini** (Today's Schedule dari TRACK).
3. **Pengumuman kampus apa yang perlu diketahui** (Campus Announcements).
4. **Status tagihan akademik/UKT** (Billing Information).

---

## 2. Cakrawala Visual Identity & Color Palette

Homepage menggunakan palet warna resmi Cakrawala yang hangat, elegan, dan profesional:

| Nama Warna | Kode HEX | Peran & Penggunaan |
|---|---|---|
| **Dark Teal** | `#07455C` | Identitas brand utama, tombol primer, heading penting |
| **Deep Teal** | `#082F3D` | Kontras mendalam, teks utama, status gelap |
| **Gold** | `#CEAE65` | Aksen selektif, penanda aktif, badge pengingat |
| **White** | `#FFFFFF` | Permukaan kartu utama & kontainer konten |
| **Off White** | `#F7F8F5` | Latar belakang halaman (*breathing space*) |
| **Light Neutral** | `#F1F5F4` | Permukaan kartu sekunder, latar badge, pill |
| **Border** | `#DDE5E4` | Garis pembatas & border kontainer yang lembut |
| **Secondary Text** | `#65747A` | Teks sekunder, label pendukung, timestamp |

Semua token warna terpusat di `src/shared/styles/tokens.css` dan digunakan secara konsisten.

---

## 3. Tepat 5 Bagian Konten Homepage

Homepage secara eksklusif hanya memuat **5 bagian konten utama**:

```text
+-----------------------------------------------------------------------------------+
|  A. WELCOME SECTION (Sapaan, Nama Mahasiswa, Pesan Hangat, Tanggal Hari Ini)     |
+-------------------------------------------------+---------------------------------+
|  MAIN COLUMN (Aktivitas Harian)                 |  SECONDARY COLUMN (Status)      |
|                                                 |                                 |
|  B. PENDING ASSIGNMENTS                         |  C. CAMPUS ANNOUNCEMENTS        |
|     - Hanya tugas yang belum dikumpulkan        |     - Pengumuman resmi kampus   |
|     - Indikator urgensi & tautan ke RISE        |     - Kategori, tanggal, modal  |
|                                                 |                                 |
|  D. TODAY'S SCHEDULE                            |  E. BILLING INFORMATION         |
|     - Hanya perkuliahan hari ini                |     - Ringkasan tagihan UKT     |
|     - Jam, dosen, ruang / tautan Zoom           |     - Status pembayaran         |
|     - Thoughtful empty state                    |     - Tautan rincian di TRACK   |
+-------------------------------------------------+---------------------------------+
```

### Konten yang Dieliminasi Demi Kesederhanaan & Fokus:
- ❌ Quick statistics dashboard (angka-angka metrik analitik dihilangkan)
- ❌ Active courses overview
- ❌ Academic Journey & Semester progress bar (berada di modul TRACK)
- ❌ Attendance overview
- ❌ Global academic calendar grid
- ❌ Redundant quick-access cards
- ❌ Dosen PA card & floating feedback bar

---

## 4. Struktur Proyek

```text
cakrawala/
├── public/
│   └── assets/
│       ├── illustrations/       # hero-student.svg
│       ├── images/              # avatar-arya.svg
│       └── logos/               # Logo Cakrawala, RISE, TRACK
│
├── src/
│   ├── app/
│   │   ├── App.jsx              # Root orchestrator & layout wrapper
│   │   └── router.jsx           # Unified client-side router (/ , /rise, /track)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx    # Kerangka layout aplikasi
│   │   │   ├── Navbar.jsx       # Header global, pencarian (⌘K), notifikasi, profil
│   │   │   ├── Sidebar.jsx      # Collapsible navigation sidebar
│   │   │   └── layout.css       # Layout styles
│   │   │
│   │   ├── ui/                  # SHARED DESIGN SYSTEM
│   │   │   ├── Button.jsx       # Multi-variant button
│   │   │   ├── Card.jsx         # Compound slots: Header, Body, Footer
│   │   │   ├── Badge.jsx        # Status & tag chips
│   │   │   ├── Avatar.jsx       # Avatar gambar & initials fallback
│   │   │   ├── ProgressBar.jsx  # Progress bar
│   │   │   ├── SectionHeader.jsx# Section header
│   │   │   ├── Tabs.jsx         # Tab switcher
│   │   │   ├── Modal.jsx        # Dialog popup
│   │   │   └── ui.css           # Styling berbasis token
│   │   │
│   │   └── dashboard/           # Tepat 5 Komponen Konten Home
│   │       ├── WelcomeSection.jsx              # Bagian A
│   │       ├── PendingAssignmentsSection.jsx   # Bagian B
│   │       ├── CampusAnnouncementsSection.jsx  # Bagian C
│   │       ├── TodayScheduleSection.jsx        # Bagian D
│   │       └── BillingSummarySection.jsx       # Bagian E
│   │
│   ├── pages/
│   │   ├── home/
│   │   │   ├── Home.jsx         # Halaman utama Cakrawala Home
│   │   │   └── home.css         # Layout editorial & whitespace
│   │   ├── rise/
│   │   │   └── RisePlaceholder.jsx # Handoff modul LMS
│   │   └── track/
│   │       └── TrackPlaceholder.jsx# Handoff modul SIAKAD
│   │
│   ├── shared/
│   │   ├── styles/
│   │   │   ├── tokens.css       # Token palet warna resmi Cakrawala
│   │   │   ├── typography.css   # Typographic scale
│   │   │   └── global.css       # CSS reset & utilities
│   │   │
│   │   └── data/
│   │       └── mockData.js      # Data mahasiswa Arya Panji (NIM 26110300014)
│   │
│   └── main.jsx
│
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 5. Cara Menjalankan Project

1. Masuk ke direktori:
   ```bash
   cd cakrawala
   ```

2. Jalankan development server:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

3. Build produksi:
   ```bash
   npm run build
   npm run preview
   ```

---

## 6. Panduan Integrasi Tim RISE & TRACK

1. **Isolasi Modul**: Tim RISE bekerja di `src/pages/rise/` dan Tim TRACK bekerja di `src/pages/track/`. Modul-modul ini tidak saling menimpa.
2. **Shared Components**: Impor komponen UI bersama dari `src/components/ui/` (`Button`, `Card`, `Badge`, `Modal`, dll.).
3. **Design Tokens**: Gunakan variabel token `var(--color-dark-teal)`, `var(--color-gold)`, `var(--color-border)`, dll.
4. **Navigasi Global**: Gunakan hook `useRouter` dari `src/app/router.jsx` untuk navigasi antar-halaman.
