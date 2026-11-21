/**
 * Cakrawala Mock Academic Data
 * Comprehensive realistic data for Arya Panji Vici Ayanda (NIM 26110300014).
 * Used across Home, RISE, and TRACK modules.
 */

export const studentProfile = {
  name: "Arya Panji Vici Ayanda",
  nim: "26110300014",
  email: "arya.ayanda@student.cakrawala.ac.id",
  program: "Teknik Informatika",
  faculty: "Fakultas Ilmu Komputer",
  campus: "Kampus Cakrawala Senayan",
  activeSemester: "Semester 3",
  academicYear: "2026/2027 Ganjil",
  semesterNumber: 3,
  academicAdvisor: {
    name: "Dr. Ir. Wahyu Prasetyo, M.Sc.",
    nip: "197805122003121002",
    contact: "wahyu.p@cakrawala.ac.id"
  },
  stats: {
    activeCoursesCount: 8,
    activeSksCount: 21,
    totalSksCompleted: 44,
    totalSksTarget: 144,
    currentGpa: 3.82,
    attendanceRate: 96.4,
    completedAssignmentsCount: 18,
    pendingAssignmentsCount: 3,
    semesterCurrentWeek: 9,
    semesterTotalWeeks: 16
  },
  tuition: {
    currentStatus: "Lunas",
    invoiceNumber: "INV-2026-GANJIL-0391",
    amountFormatted: "Rp 5.499.000",
    dueDate: "2026-11-30",
    title: "Tagihan UKT Semester 3"
  }
};

export const activeCourses = [
  {
    id: "prog1",
    code: "PROG101",
    name: "Programming Fundamentals (Python)",
    shortName: "Prog1",
    sks: 3,
    color: "var(--color-course-prog)",
    lecturer: "Dian Anggraini, M.Kom.",
    room: "Lab Komputer 3 (Gedung B Lt. 2)",
    zoomUrl: "https://zoom.us/j/cakrawala-prog1",
    day: "Selasa",
    timeSlot: "08:00 - 10:30 WIB",
    attendanceRate: 100,
    progress: 60
  },
  {
    id: "sdlc1",
    code: "SDLC201",
    name: "Software Development Life Cycle",
    shortName: "SDLC1",
    sks: 2,
    color: "var(--color-course-sdlc)",
    lecturer: "Budi Santoso, M.T.",
    room: "Ruang Teori 402 (Gedung A Lt. 4)",
    zoomUrl: "https://zoom.us/j/cakrawala-sdlc1",
    day: "Selasa",
    timeSlot: "11:00 - 12:40 WIB",
    attendanceRate: 92.5,
    progress: 55
  },
  {
    id: "wcd01",
    code: "WCD202",
    name: "Web Client Development",
    shortName: "WCD01",
    sks: 3,
    color: "var(--color-course-wcd)",
    lecturer: "Rian Hidayat, M.Cs.",
    room: "Lab Multimedia 1 (Gedung C Lt. 3)",
    zoomUrl: "https://zoom.us/j/cakrawala-wcd01",
    day: "Rabu",
    timeSlot: "09:00 - 11:30 WIB",
    attendanceRate: 100,
    progress: 62
  },
  {
    id: "sdf01",
    code: "SDF102",
    name: "Software Development Fundamentals",
    shortName: "SDF01",
    sks: 3,
    color: "var(--color-course-sdf)",
    lecturer: "Maya Sari, M.Kom.",
    room: "Ruang Teori 301 (Gedung A Lt. 3)",
    zoomUrl: "https://zoom.us/j/cakrawala-sdf01",
    day: "Rabu",
    timeSlot: "13:00 - 15:30 WIB",
    attendanceRate: 95.0,
    progress: 58
  },
  {
    id: "wad01",
    code: "WAD301",
    name: "Web Application Development",
    shortName: "WAD01",
    sks: 3,
    color: "var(--color-course-wad)",
    lecturer: "Dr. Hendra Gunawan, S.Kom., M.T.",
    room: "Lab Software Engineering (Gedung B Lt. 4)",
    zoomUrl: "https://zoom.us/j/cakrawala-wad01",
    day: "Kamis",
    timeSlot: "08:30 - 11:00 WIB",
    attendanceRate: 100,
    progress: 65
  },
  {
    id: "cdc01",
    code: "CDC101",
    name: "Career Design & Professional Development 1",
    shortName: "CDC01",
    sks: 1,
    color: "var(--color-course-cdc)",
    lecturer: "Citra Lestari, S.Psi., M.M.",
    room: "Auditorium Utama Cakrawala",
    zoomUrl: "https://zoom.us/j/cakrawala-cdc01",
    day: "Kamis",
    timeSlot: "13:30 - 14:30 WIB",
    attendanceRate: 100,
    progress: 70
  },
  {
    id: "db01",
    code: "DB201",
    name: "Database Systems",
    shortName: "DB01",
    sks: 3,
    color: "var(--color-course-db)",
    lecturer: "Prof. Eko Wardhana, Ph.D.",
    room: "Lab Database (Gedung B Lt. 3)",
    zoomUrl: "https://zoom.us/j/cakrawala-db01",
    day: "Jumat",
    timeSlot: "08:00 - 10:30 WIB",
    attendanceRate: 91.7,
    progress: 58
  },
  {
    id: "ai01",
    code: "AI301",
    name: "Artificial Intelligence",
    shortName: "AI01",
    sks: 3,
    color: "var(--color-course-ai)",
    lecturer: "Dr. Nadia Pratiwi, M.Sc.",
    room: "Ruang Smart Class 204 (Gedung C)",
    zoomUrl: "https://zoom.us/j/cakrawala-ai01",
    day: "Jumat",
    timeSlot: "13:30 - 16:00 WIB",
    attendanceRate: 95.8,
    progress: 54
  }
];

export const upcomingAssignments = [
  {
    id: "asg-1",
    courseId: "wad01",
    courseName: "Web Application Development",
    courseCode: "WAD301",
    courseColor: "var(--color-course-wad)",
    title: "Milestone 2 — Frontend Architecture & UI Design System",
    deadlineLabel: "Hari ini, 23:59 WIB",
    deadlineDate: "2026-11-21T23:59:00",
    priority: "high", // high, medium, normal
    status: "in_progress", // in_progress, pending, submitted
    statusLabel: "Dalam Proses",
    weight: "15% Bobot Nilai",
    type: "Project Milestone",
    module: "RISE"
  },
  {
    id: "asg-2",
    courseId: "db01",
    courseName: "Database Systems",
    courseCode: "DB201",
    courseColor: "var(--color-course-db)",
    title: "Lab Assignment 4 — Query Optimization & Indexing",
    deadlineLabel: "Senin, 23 Nov • 18:00 WIB",
    deadlineDate: "2026-11-23T18:00:00",
    priority: "medium",
    status: "pending",
    statusLabel: "Belum Dikumpulkan",
    weight: "10% Bobot Nilai",
    type: "Lab Report",
    module: "RISE"
  },
  {
    id: "asg-3",
    courseId: "ai01",
    courseName: "Artificial Intelligence",
    courseCode: "AI301",
    courseColor: "var(--color-course-ai)",
    title: "Mini Paper — Heuristic Search vs Reinforcement Learning",
    deadlineLabel: "Kamis, 26 Nov • 23:59 WIB",
    deadlineDate: "2026-11-26T23:59:00",
    priority: "normal",
    status: "pending",
    statusLabel: "Belum Dikumpulkan",
    weight: "10% Bobot Nilai",
    type: "Individual Essay",
    module: "RISE"
  }
];

export const weeklySchedule = {
  "Senin": [],
  "Selasa": [
    {
      id: "sch-1",
      courseId: "prog1",
      courseName: "Programming Fundamentals (Python)",
      courseCode: "PROG101",
      courseColor: "var(--color-course-prog)",
      lecturer: "Dian Anggraini, M.Kom.",
      time: "08:00 - 10:30 WIB",
      type: "Praktikum",
      room: "Lab Komputer 3 (Gedung B)",
      isOnline: false,
      status: "upcoming"
    },
    {
      id: "sch-2",
      courseId: "sdlc1",
      courseName: "Software Development Life Cycle",
      courseCode: "SDLC201",
      courseColor: "var(--color-course-sdlc)",
      lecturer: "Budi Santoso, M.T.",
      time: "11:00 - 12:40 WIB",
      type: "Kuliah Teori",
      room: "Ruang 402 (Gedung A)",
      isOnline: false,
      status: "upcoming"
    }
  ],
  "Rabu": [
    {
      id: "sch-3",
      courseId: "wcd01",
      courseName: "Web Client Development",
      courseCode: "WCD202",
      courseColor: "var(--color-course-wcd)",
      lecturer: "Rian Hidayat, M.Cs.",
      time: "09:00 - 11:30 WIB",
      type: "Praktikum & Workshop",
      room: "Lab Multimedia 1",
      isOnline: false,
      status: "upcoming"
    },
    {
      id: "sch-4",
      courseId: "sdf01",
      courseName: "Software Development Fundamentals",
      courseCode: "SDF102",
      courseColor: "var(--color-course-sdf)",
      lecturer: "Maya Sari, M.Kom.",
      time: "13:00 - 15:30 WIB",
      type: "Kuliah Tatap Muka",
      room: "Ruang Teori 301",
      isOnline: false,
      status: "upcoming"
    }
  ],
  "Kamis": [
    {
      id: "sch-5",
      courseId: "wad01",
      courseName: "Web Application Development",
      courseCode: "WAD301",
      courseColor: "var(--color-course-wad)",
      lecturer: "Dr. Hendra Gunawan, S.Kom., M.T.",
      time: "08:30 - 11:00 WIB",
      type: "Praktikum Hybrid",
      room: "Lab SE / Zoom Online",
      isOnline: true,
      zoomUrl: "https://zoom.us/j/cakrawala-wad01",
      status: "upcoming"
    },
    {
      id: "sch-6",
      courseId: "cdc01",
      courseName: "Career Design & Professional Dev 1",
      courseCode: "CDC101",
      courseColor: "var(--color-course-cdc)",
      lecturer: "Citra Lestari, S.Psi., M.M.",
      time: "13:30 - 14:30 WIB",
      type: "Seminar Tamu",
      room: "Auditorium Utama",
      isOnline: false,
      status: "upcoming"
    }
  ],
  "Jumat": [
    {
      id: "sch-7",
      courseId: "db01",
      courseName: "Database Systems",
      courseCode: "DB201",
      courseColor: "var(--color-course-db)",
      lecturer: "Prof. Eko Wardhana, Ph.D.",
      time: "08:00 - 10:30 WIB",
      type: "Kuliah & Praktikum",
      room: "Lab Database (Gedung B)",
      isOnline: false,
      status: "upcoming"
    },
    {
      id: "sch-8",
      courseId: "ai01",
      courseName: "Artificial Intelligence",
      courseCode: "AI301",
      courseColor: "var(--color-course-ai)",
      lecturer: "Dr. Nadia Pratiwi, M.Sc.",
      time: "13:30 - 16:00 WIB",
      type: "Kuliah Teori & Studi Kasus",
      room: "Smart Class 204",
      isOnline: false,
      status: "upcoming"
    }
  ],
  "Sabtu": [
    {
      id: "sch-9",
      courseId: "wad01",
      courseName: "Asistensi Khusus — Cakrawala Superapp Code Sprint",
      courseCode: "WAD301-LAB",
      courseColor: "var(--color-primary-600)",
      lecturer: "Tim Asisten Laboratorium WAD",
      time: "10:00 - 12:00 WIB",
      type: "Mentoring Tambahan",
      room: "Discord Cakrawala Dev & Zoom",
      isOnline: true,
      zoomUrl: "https://zoom.us/j/cakrawala-mentoring",
      status: "upcoming"
    }
  ],
  "Minggu": []
};

export const academicCalendarEvents = [
  {
    id: "cal-1",
    date: "2026-11-02",
    day: 2,
    title: "Awal Perkuliahan Paruh Kedua Semester",
    type: "academic",
    typeLabel: "Akademik",
    color: "#3b82f6"
  },
  {
    id: "cal-2",
    date: "2026-11-09",
    day: 9,
    title: "Pekan Evaluasi Tengah Semester (UTS)",
    type: "exam",
    typeLabel: "Ujian",
    color: "#ef4444"
  },
  {
    id: "cal-3",
    date: "2026-11-13",
    day: 13,
    title: "Batas Akhir Input Nilai Formatif 1",
    type: "deadline",
    typeLabel: "Batas Waktu",
    color: "#f59e0b"
  },
  {
    id: "cal-4",
    date: "2026-11-21",
    day: 21,
    title: "Hari Ini: Deadline Milestone 2 WAD01",
    type: "deadline",
    typeLabel: "Tugas RISE",
    color: "#8b5cf6"
  },
  {
    id: "cal-5",
    date: "2026-11-25",
    day: 25,
    title: "Kuliah Tamu Industri: Tech Scaling in SEA",
    type: "event",
    typeLabel: "Kegiatan Kampus",
    color: "#10b981"
  },
  {
    id: "cal-6",
    date: "2026-11-28",
    day: 28,
    title: "Hari Libur Nasional",
    type: "holiday",
    typeLabel: "Libur",
    color: "#f43f5e"
  },
  {
    id: "cal-7",
    date: "2026-11-30",
    day: 30,
    title: "Batas Pembayaran UKT Tahap 2",
    type: "financial",
    typeLabel: "Administrasi",
    color: "#0284c7"
  },
  {
    id: "cal-8",
    date: "2026-12-14",
    day: 14,
    title: "Sosialisasi & Konsultasi KRS Genap 2026/2027",
    type: "krs",
    typeLabel: "Periode KRS",
    color: "#6366f1"
  }
];

export const announcements = [
  {
    id: "ann-1",
    title: "Panduan Teknis Pelaksanaan Ujian Akhir Semester (UAS) Ganjil 2026/2027",
    category: "Akademik",
    categoryVariant: "primary",
    date: "20 Nov 2026",
    summary: "Seluruh mahasiswa diwajibkan memeriksa jadwal UAS di TRACK dan memastikan absensi kehadiran minimal 75% sebelum verifikasi tertutup.",
    content: "Biro Administrasi Akademik mengumumkan bahwa pelaksanaan UAS Ganjil 2026/2027 akan diselenggarakan mulai 4 Januari 2027. Mahasiswa yang memiliki persentase kehadiran di bawah 75% diwajibkan mengajukan surat dispensasi melalui TRACK selambat-lambatnya 15 Desember 2026.",
    author: "Biro Administrasi Akademik (BAA)",
    isUnread: true
  },
  {
    id: "ann-2",
    title: "Pembukaan Pendaftaran Beasiswa Riset Inovasi AI Cakrawala 2027",
    category: "Beasiswa",
    categoryVariant: "success",
    date: "18 Nov 2026",
    summary: "Dukungan pendanaan penelitian tugas akhir dan proyek capstone hingga Rp 25.000.000 bagi tim mahasiswa Informatika.",
    content: "Lembaga Penelitian dan Pengabdian Masyarakat (LPPM) bekerja sama dengan industri membuka hibah kompetitif beasiswa riset AI untuk topik Computer Vision, LLM, dan EduTech. Pendaftaran dibuka hingga 10 Desember 2026 melalui portal TRACK Kemahasiswaan.",
    author: "Lembaga Penelitian LPPM",
    isUnread: true
  },
  {
    id: "ann-3",
    title: "Pemeliharaan Terjadwal Infrastruktur Server TRACK & RISE",
    category: "Layanan TI",
    categoryVariant: "warning",
    date: "15 Nov 2026",
    summary: "Peningkatan kapasitas server dan pembaruan sistem database pada Minggu, 22 November 2026 pukul 01:00 - 05:00 WIB.",
    content: "Pusat Teknologi Informasi Cakrawala akan melakukan scheduled maintenance pada cluster backend database. Selama rentang waktu ini, portal TRACK dan RISE LMS tidak dapat diakses sementara. Mohon submit tugas sebelum waktu pemeliharaan.",
    author: "Pusat Teknologi Informasi (PTI)",
    isUnread: false
  },
  {
    id: "ann-4",
    title: "Registrasi Program Magang Bersertifikat Industri (MSIB) Batch 8",
    category: "Kemahasiswaan",
    categoryVariant: "accent",
    date: "12 Nov 2026",
    summary: "Informasi dan kuota rekomendasi kampus untuk program magang mitra teknologi ternama untuk mahasiswa semester 4 ke atas.",
    content: "Career Development Center (CDC) Cakrawala membuka bimbingan persiapan CV, portofolio proyek, dan pengurusan surat rekomendasi kampus untuk program magang bersertifikat mitra resmi Cakrawala University.",
    author: "Career Development Center (CDC)",
    isUnread: false
  }
];

export const quickAccessItems = [
  {
    id: "qa-rise",
    title: "RISE LMS",
    description: "Modul pembelajaran, materi, forum & kuis interaktif",
    badge: "LMS Modul",
    badgeVariant: "info",
    route: "/rise",
    color: "#0ea5e9",
    icon: "GraduationCap"
  },
  {
    id: "qa-track",
    title: "TRACK SIAKAD",
    description: "Sistem Informasi Akademik, transkrip & absensi",
    badge: "SIAKAD Modul",
    badgeVariant: "primary",
    route: "/track",
    color: "#2563eb",
    icon: "Compass"
  },
  {
    id: "qa-krs",
    title: "Rencana Studi (KRS)",
    description: "Cek status persetujuan KRS dan konsultasi Dosen PA",
    badge: "21 SKS Disetujui",
    badgeVariant: "success",
    route: "/track#krs",
    color: "#10b981",
    icon: "FileCheck2"
  },
  {
    id: "qa-khs",
    title: "Hasil Studi (KHS)",
    description: "Riwayat nilai semester 1 & 2 dan indeks prestasi",
    badge: "IPK 3.82",
    badgeVariant: "neutral",
    route: "/track#khs",
    color: "#8b5cf6",
    icon: "Award"
  },
  {
    id: "qa-assignments",
    title: "Daftar Tugas",
    description: "Semua deadline penugasan dan status submission",
    badge: "3 Menunggu",
    badgeVariant: "warning",
    route: "/rise#assignments",
    color: "#f59e0b",
    icon: "CheckSquare"
  },
  {
    id: "qa-calendar",
    title: "Kalender Akademik",
    description: "Jadwal semester, libur nasional, UTS, dan UAS",
    badge: "Ganjil 26/27",
    badgeVariant: "neutral",
    route: "/track#calendar",
    color: "#0284c7",
    icon: "Calendar"
  }
];

export const mockNotifications = [
  {
    id: "notif-1",
    source: "RISE",
    title: "Deadline Tugas Mendekat",
    message: "Tugas Milestone 2 Web Application Development harus dikumpulkan sebelum pukul 23:59 WIB hari ini.",
    time: "2 jam yang lalu",
    read: false,
    link: "/rise"
  },
  {
    id: "notif-2",
    source: "TRACK",
    title: "Presensi Kuliah Terverifikasi",
    message: "Kehadiran pada sesi Database Systems Jumat kemarin telah diverifikasi (100%).",
    time: "1 hari yang lalu",
    read: false,
    link: "/track"
  },
  {
    id: "notif-3",
    source: "RISE",
    title: "Nilai Kuis Dirilis",
    message: "Dian Anggraini, M.Kom. telah merilis nilai Kuis Algoritma Pemrograman (Skor: 95/100).",
    time: "2 hari yang lalu",
    read: true,
    link: "/rise"
  },
  {
    id: "notif-4",
    source: "TRACK",
    title: "Jadwal UAS Ganjil 2026/2027",
    message: "Draf jadwal ujian akhir semester telah diunggah di portal TRACK.",
    time: "3 hari yang lalu",
    read: true,
    link: "/track"
  }
];
