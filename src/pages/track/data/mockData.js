// ============================================================
//  TRACK Module — Realistic Mock Data
//  All dummy data for standalone preview. Replace with API
//  calls during integration with the main Cakrawala backend.
// ============================================================

export const student = {
  id: "28110300002",
  name: "Denis Athaullah Darmadi",
  nickname: "Denis",
  prodi: "Teknik Informatika",
  fakultas: "Fakultas Ilmu Komputer",
  angkatan: 2024,
  status: "Aktif",
  activeSemester: 3,
  activeAcademicYear: "2025/2026",
  advisor: "Dr. Ahmad Fauzi, M.T.",
  email: "denis.darmadi@student.cakrawala.ac.id",
  phone: "08123456789",
};

// ---- Course Pool (for KRS) ----------------------------------
export const coursePool = [
  { id: "IF301", code: "IF301", name: "Algoritma & Struktur Data", sks: 3, dosen: "Dr. Rudi Hartono, M.Kom", hari: "Senin", jam: "08:00-10:30", kelas: "A", quota: 40, enrolled: 32 },
  { id: "IF302", code: "IF302", name: "Pemrograman Web Lanjut", sks: 3, dosen: "Irma Susanti, S.T., M.T.", hari: "Selasa", jam: "13:00-15:30", kelas: "B", quota: 35, enrolled: 28 },
  { id: "IF303", code: "IF303", name: "Basis Data", sks: 3, dosen: "Prof. Budi Santoso, Ph.D.", hari: "Rabu", jam: "10:00-12:30", kelas: "A", quota: 42, enrolled: 38 },
  { id: "IF304", code: "IF304", name: "Jaringan Komputer", sks: 2, dosen: "Hendra Wijaya, M.Kom", hari: "Kamis", jam: "08:00-09:40", kelas: "C", quota: 38, enrolled: 25 },
  { id: "IF305", code: "IF305", name: "Sistem Operasi", sks: 3, dosen: "Dr. Siti Rahayu, M.T.", hari: "Jumat", jam: "09:00-11:30", kelas: "A", quota: 40, enrolled: 30 },
  { id: "IF306", code: "IF306", name: "Matematika Diskrit", sks: 2, dosen: "Andi Kusuma, M.Si.", hari: "Senin", jam: "13:00-14:40", kelas: "B", quota: 45, enrolled: 40 },
  { id: "MK101", code: "MK101", name: "Kewarganegaraan", sks: 2, dosen: "Dra. Nurhayati, M.Pd.", hari: "Rabu", jam: "13:00-14:40", kelas: "C", quota: 50, enrolled: 44 },
  { id: "IF307", code: "IF307", name: "Rekayasa Perangkat Lunak", sks: 3, dosen: "Dr. Faisal Akbar, M.Kom", hari: "Selasa", jam: "08:00-10:30", kelas: "A", quota: 36, enrolled: 20 },
  { id: "IF308", code: "IF308", name: "Kecerdasan Buatan", sks: 3, dosen: "Prof. Diana Sari, Ph.D.", hari: "Kamis", jam: "10:00-12:30", kelas: "B", quota: 38, enrolled: 35 },
  { id: "MK102", code: "MK102", name: "Bahasa Inggris Teknik", sks: 2, dosen: "Drs. Agus Mulyadi, M.Pd.", hari: "Jumat", jam: "13:00-14:40", kelas: "A", quota: 50, enrolled: 42 },
];

// ---- Active KRS Selection -----------------------------------
export const initialSelectedCourses = ["IF301", "IF302", "IF303", "IF304", "IF305", "IF306"];

export const krsStatus = {
  status: "Disetujui",   // Belum Diajukan | Menunggu Persetujuan | Disetujui | Ditolak
  submittedAt: "2025-09-02",
  approvedAt: "2025-09-04",
  approvedBy: "Dr. Ahmad Fauzi, M.T.",
  maxSks: 24,
  deadline: "2025-09-10",
};

// ---- KHS Data per Semester ----------------------------------
const gradeWeight = { A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7, "C+": 2.3, C: 2.0, D: 1.0, E: 0 };

export const khsData = {
  1: {
    semester: 1,
    tahun: "2024/2025 Ganjil",
    courses: [
      { code: "IF101", name: "Pengantar Teknologi Informasi", sks: 3, grade: "A", weight: 4.0 },
      { code: "IF102", name: "Pemrograman Dasar", sks: 3, grade: "A-", weight: 3.7 },
      { code: "IF103", name: "Matematika Dasar", sks: 3, grade: "B+", weight: 3.3 },
      { code: "MK001", name: "Pancasila", sks: 2, grade: "A", weight: 4.0 },
      { code: "IF104", name: "Logika Informatika", sks: 2, grade: "B", weight: 3.0 },
      { code: "MK002", name: "Bahasa Indonesia", sks: 2, grade: "A-", weight: 3.7 },
    ],
  },
  2: {
    semester: 2,
    tahun: "2024/2025 Genap",
    courses: [
      { code: "IF201", name: "Pemrograman Berorientasi Objek", sks: 3, grade: "A", weight: 4.0 },
      { code: "IF202", name: "Statistika & Probabilitas", sks: 3, grade: "B+", weight: 3.3 },
      { code: "IF203", name: "Struktur Data", sks: 3, grade: "A-", weight: 3.7 },
      { code: "IF204", name: "Pemrograman Web Dasar", sks: 3, grade: "A", weight: 4.0 },
      { code: "MK003", name: "Agama", sks: 2, grade: "A", weight: 4.0 },
      { code: "IF205", name: "Desain Antarmuka", sks: 2, grade: "B+", weight: 3.3 },
    ],
  },
};

function calcIPS(courses) {
  const totalSks = courses.reduce((s, c) => s + c.sks, 0);
  const totalBobot = courses.reduce((s, c) => s + c.sks * c.weight, 0);
  return totalSks > 0 ? (totalBobot / totalSks).toFixed(2) : "0.00";
}

function calcIPK(semesterKeys) {
  let totalSks = 0, totalBobot = 0;
  semesterKeys.forEach(k => {
    khsData[k].courses.forEach(c => {
      totalSks += c.sks;
      totalBobot += c.sks * c.weight;
    });
  });
  return totalSks > 0 ? (totalBobot / totalSks).toFixed(2) : "0.00";
}

export const khs = {
  1: { ...khsData[1], ips: calcIPS(khsData[1].courses), ipk: calcIPS(khsData[1].courses), totalSks: 15 },
  2: { ...khsData[2], ips: calcIPS(khsData[2].courses), ipk: calcIPK([1, 2]), totalSks: 16 },
};

// ---- Academic Records ---------------------------------------
export const academicRecords = {
  student,
  semesters: [
    {
      semester: 1,
      tahun: "2024/2025 Ganjil",
      ips: khs[1].ips,
      totalSks: 15,
      courses: khs[1].courses.map(c => ({ ...c, status: "Lulus" })),
    },
    {
      semester: 2,
      tahun: "2024/2025 Genap",
      ips: khs[2].ips,
      totalSks: 16,
      courses: khs[2].courses.map(c => ({ ...c, status: "Lulus" })),
    },
  ],
  totalSksSelesai: 31,
  totalSksTarget: 144,
  ipk: khs[2].ipk,
};

// ---- Billing ------------------------------------------------
export const billingData = {
  current: {
    id: "INV-2025-003",
    type: "UKT Semester 3",
    amount: 7499000,
    status: "Belum Dibayar",    // Lunas | Belum Dibayar | Jatuh Tempo
    dueDate: "2025-09-15",
    issuedDate: "2025-08-01",
    details: [
      { label: "Biaya Pendidikan (UKT)", amount: 7000000 },
      { label: "Biaya Praktikum", amount: 350000 },
      { label: "Biaya Kemahasiswaan", amount: 149000 },
    ],
  },
  history: [
    { id: "INV-2025-002", type: "UKT Semester 2", amount: 7499000, status: "Lunas", paidAt: "2025-02-10", semester: 2 },
    { id: "INV-2024-001", type: "UKT Semester 1", amount: 7499000, status: "Lunas", paidAt: "2024-08-14", semester: 1 },
    { id: "INV-2024-REG", type: "Biaya Registrasi Mahasiswa Baru", amount: 500000, status: "Lunas", paidAt: "2024-07-20", semester: 0 },
  ],
};

// ---- Admissions ---------------------------------------------
export const admissionsData = {
  registrationId: "REG-2024-28110300002",
  jalur: "Seleksi Berbasis Prestasi",
  tanggalDaftar: "2024-06-01",
  tanggalDiterima: "2024-07-10",
  status: "Terdaftar Aktif",
  prodi: "Teknik Informatika",
  timeline: [
    { title: "Pendaftaran Online", date: "1 Jun 2024", status: "done" },
    { title: "Verifikasi Dokumen", date: "10 Jun 2024", status: "done" },
    { title: "Seleksi & Penilaian", date: "20 Jun 2024", status: "done" },
    { title: "Pengumuman Kelulusan", date: "10 Jul 2024", status: "done" },
    { title: "Daftar Ulang & Pembayaran", date: "14 Agu 2024", status: "done" },
    { title: "Orientasi Mahasiswa Baru", date: "19 Agu 2024", status: "done" },
    { title: "Perkuliahan Semester 1", date: "2 Sep 2024", status: "done" },
  ],
  documents: [
    { name: "Ijazah SMA/SMK/Sederajat", status: "verified" },
    { name: "Transkrip Nilai SMA", status: "verified" },
    { name: "Kartu Identitas (KTP/KK)", status: "verified" },
    { name: "Foto 3x4 Background Merah", status: "verified" },
    { name: "Surat Keterangan Sehat", status: "verified" },
    { name: "SKCK (Surat Keterangan Catatan Kepolisian)", status: "verified" },
    { name: "Sertifikat Prestasi (opsional)", status: "pending" },
  ],
  announcements: [
    {
      title: "Pengumuman Penerimaan Mahasiswa Baru 2024",
      date: "10 Juli 2024",
      desc: "Selamat! Anda dinyatakan LULUS seleksi dan diterima sebagai mahasiswa baru Universitas Cakrawala Program Studi Teknik Informatika angkatan 2024.",
    },
    {
      title: "Jadwal Orientasi Mahasiswa Baru",
      date: "1 Agustus 2024",
      desc: "Orientasi mahasiswa baru akan dilaksanakan pada 19-21 Agustus 2024 di kampus utama. Kehadiran wajib bagi seluruh mahasiswa baru.",
    },
  ],
};

// ---- Academic Journey (Active Semester) ---------------------
export const journeyData = {
  activeSemester: 3,
  academicYear: "2025/2026 Ganjil",
  startDate: "2025-09-01",
  endDate: "2026-01-31",
  progressPercent: 45,
  courses: [
    { id: "IF301", code: "IF301", name: "Algoritma & Struktur Data", sks: 3, dosen: "Dr. Rudi Hartono, M.Kom", status: "Aktif", nilai: null },
    { id: "IF302", code: "IF302", name: "Pemrograman Web Lanjut", sks: 3, dosen: "Irma Susanti, S.T., M.T.", status: "Aktif", nilai: null },
    { id: "IF303", code: "IF303", name: "Basis Data", sks: 3, dosen: "Prof. Budi Santoso, Ph.D.", status: "Aktif", nilai: null },
    { id: "IF304", code: "IF304", name: "Jaringan Komputer", sks: 2, dosen: "Hendra Wijaya, M.Kom", status: "Aktif", nilai: null },
    { id: "IF305", code: "IF305", name: "Sistem Operasi", sks: 3, dosen: "Dr. Siti Rahayu, M.T.", status: "Aktif", nilai: null },
    { id: "IF306", code: "IF306", name: "Matematika Diskrit", sks: 2, dosen: "Andi Kusuma, M.Si.", status: "Aktif", nilai: null },
  ],
  activities: [
    { label: "Kehadiran Rata-rata", value: "92%", icon: "check" },
    { label: "Tugas Terkumpul", value: "18/20", icon: "file" },
    { label: "Quiz Selesai", value: "6/8", icon: "book" },
    { label: "Praktikum Aktif", value: "3 Lab", icon: "cpu" },
  ],
  previousSemesters: [
    { semester: 1, tahun: "2024/2025 Ganjil", ips: khs[1].ips, totalSks: 15, courses: 6 },
    { semester: 2, tahun: "2024/2025 Genap", ips: khs[2].ips, totalSks: 16, courses: 6 },
  ],
};

// ---- Announcements ------------------------------------------
export const announcements = [
  { id: 1, title: "Batas Akhir Pengisian KRS Semester 3", date: "10 Sep 2025", desc: "Pengisian KRS semester 3 ditutup pada 10 September 2025 pukul 23:59 WIB.", urgent: true },
  { id: 2, title: "Jadwal UTS Semester 3 Telah Tersedia", date: "15 Okt 2025", desc: "Jadwal Ujian Tengah Semester telah diunggah ke portal akademik.", urgent: false },
  { id: 3, title: "Pembayaran UKT Semester 3", date: "1 Sep 2025", desc: "Batas pembayaran UKT Semester 3 adalah 15 September 2025.", urgent: true },
];

export const overviewStats = [
  { label: "Status Akademik", value: "Aktif", sub: "Semester 3", color: "success", icon: "shield-check" },
  { label: "IPK Kumulatif", value: khs[2].ipk, sub: "Skala 4.00", color: "primary", icon: "trending-up" },
  { label: "Total SKS Selesai", value: "31", sub: "dari 144 SKS", color: "accent", icon: "book-open" },
  { label: "SKS Semester Ini", value: "16", sub: "dari maks 24 SKS", color: "info", icon: "layers" },
  { label: "Status KRS", value: "Disetujui", sub: "Sem. 3 • 6 MK", color: "success", icon: "file-check" },
  { label: "Status Tagihan", value: "Belum Bayar", sub: "UKT Sem. 3", color: "warning", icon: "credit-card" },
];
