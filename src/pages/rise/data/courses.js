/**
 * RISE Module — Active Semester 3 Courses
 * Matched with TRACK module active course pool (IF301 - IF306).
 * Palette tokens:
 *  - Primary Dark Teal: #07455C
 *  - Deep Teal: #082F3D
 *  - Gold Accent: #CEAE65
 *  - Soft Dark Teal: #0E627C
 *  - Ocean Teal: #1B5E6B
 *  - Warm Antique Gold: #9B7D36
 */

export const courses = [
  {
    id: "IF301",
    code: "IF301",
    name: "Algoritma & Struktur Data",
    sks: 3,
    lecturer: "Dr. Rudi Hartono, M.Kom",
    lecturerEmail: "rudi.hartono@cakrawala.ac.id",
    progress: 65,
    assignmentCount: 2,
    completedAssignments: 1,
    status: "Active",
    description:
      "Mata kuliah ini membahas struktur data linier dan non-linier seperti balanced trees, heap, graph, serta teknik analisis kompleksitas efisiensi algoritma. Mahasiswa dilatih merancang solusi komputasi yang optimal untuk permasalahan nyata berbasis rekursi dan dynamic programming.",
    schedule: "Senin, 08:00 - 10:30 WIB",
    room: "Ruang 405 (Kampus Utama)",
    color: "#07455C",
    accentColor: "#CEAE65",
  },
  {
    id: "IF302",
    code: "IF302",
    name: "Pemrograman Web Lanjut",
    sks: 3,
    lecturer: "Irma Susanti, S.T., M.T.",
    lecturerEmail: "irma.susanti@cakrawala.ac.id",
    progress: 70,
    assignmentCount: 2,
    completedAssignments: 1,
    status: "Active",
    description:
      "Mempelajari arsitektur web modern dengan ekosistem Single Page Application (SPA), RESTful API, dan state management tingkat lanjut. Fokus pada implementasi arsitektur komponen React, integrasi backend modern, autentikasi token JWT, dan deployment cloud.",
    schedule: "Selasa, 13:00 - 15:30 WIB",
    room: "Ruang Multimedia 2",
    color: "#0E627C",
    accentColor: "#CEAE65",
  },
  {
    id: "IF303",
    code: "IF303",
    name: "Basis Data",
    sks: 3,
    lecturer: "Prof. Budi Santoso, Ph.D.",
    lecturerEmail: "budi.santoso@cakrawala.ac.id",
    progress: 55,
    assignmentCount: 2,
    completedAssignments: 1,
    status: "Active",
    description:
      "Fokus pada perancangan basis data relasional tingkat lanjut, normalisasi bentuk 1NF hingga BCNF, serta optimasi query SQL dan indexing. Topik mencakup manajemen transaksi ACID, stored procedures, triggers, dan pengenalan konsep basis data NoSQL terdistribusi.",
    schedule: "Rabu, 08:00 - 10:30 WIB",
    room: "Ruang 408 & Lab Basis Data",
    color: "#CEAE65",
    accentColor: "#07455C",
  },
  {
    id: "IF304",
    code: "IF304",
    name: "Jaringan Komputer",
    sks: 2,
    lecturer: "Hendra Wijaya, M.Kom",
    lecturerEmail: "hendra.wijaya@cakrawala.ac.id",
    progress: 80,
    assignmentCount: 2,
    completedAssignments: 1,
    status: "Active",
    description:
      "Membahas model referensi OSI dan TCP/IP, arsitektur routing inter-domain, switching, subnetting VLSM, serta protokol transport. Dilengkapi praktikum analisis paket jaringan menggunakan Wireshark dan simulasi topologi jaringan pada Cisco Packet Tracer.",
    schedule: "Kamis, 08:00 - 09:40 WIB",
    room: "Lab Jaringan & Komunikasi Data",
    color: "#1B5E6B",
    accentColor: "#CEAE65",
  },
  {
    id: "IF305",
    code: "IF305",
    name: "Sistem Operasi",
    sks: 3,
    lecturer: "Dr. Siti Rahayu, M.T.",
    lecturerEmail: "siti.rahayu@cakrawala.ac.id",
    progress: 50,
    assignmentCount: 2,
    completedAssignments: 0,
    status: "Active",
    description:
      "Mengkaji struktur internal sistem operasi modern, manajemen proses dan thread, mekanisme penjadwalan CPU, sinkronisasi antar-proses dengan semaphore, serta manajemen memori virtual dan sistem berkas. Studi kasus mendalam pada arsitektur kernel Linux dan POSIX system calls.",
    schedule: "Jumat, 08:30 - 11:00 WIB",
    room: "Ruang 402",
    color: "#082F3D",
    accentColor: "#CEAE65",
  },
  {
    id: "IF306",
    code: "IF306",
    name: "Matematika Diskrit",
    sks: 2,
    lecturer: "Andi Kusuma, M.Si.",
    lecturerEmail: "andi.kusuma@cakrawala.ac.id",
    progress: 60,
    assignmentCount: 2,
    completedAssignments: 0,
    status: "Active",
    description:
      "Fondasi matematis untuk ilmu komputasi meliputi teori himpunan, relasi dan fungsi, logika proposisional dan predikat, teori graf, pohon, serta relasi rekurensi. Mahasiswa dilatih menyusun bukti matematis formal dan penalaran deduktif untuk analisis algoritma.",
    schedule: "Senin, 13:00 - 14:40 WIB",
    room: "Ruang 302",
    color: "#9B7D36",
    accentColor: "#07455C",
  },
];

export default courses;
