/**
 * RISE Module — Assignments Data
 * 12 assignments across courses IF301 - IF306.
 * Status breakdown:
 *  - 3 upcoming
 *  - 3 in-progress
 *  - 4 submitted
 *  - 2 overdue
 * Timeframe: Nov - Dec 2025
 */

export const assignments = [
  {
    id: "ASG-001",
    courseId: "IF301",
    courseCode: "IF301",
    courseName: "Algoritma & Struktur Data",
    title: "Tugas 1: Analisis Kompleksitas & Sorting Benchmark",
    description:
      "Mengimplementasikan algoritma MergeSort, QuickSort, dan RadixSort pada dataset 100.000 elemen numerik serta menyusun laporan perbandingan efisiensi waktu eksekusi (Big-O empirical vs theoretical).",
    lecturer: "Dr. Rudi Hartono, M.Kom",
    dueDate: "2025-11-08T23:59:00",
    status: "submitted",
    submittedAt: "2025-11-07T20:15:00",
    grade: 92,
    attachments: [
      { name: "Panduan_Tugas1_ASD.pdf", size: "1.4 MB", type: "pdf" },
      { name: "dataset_sorting_benchmark.zip", size: "4.8 MB", type: "zip" },
    ],
    instructions:
      "1. Tulis kode implementasi dalam bahasa C++ atau Python dengan dokumentasi fungsi yang lengkap.\n2. Lakukan benchmarking pengurutan untuk input worst-case, best-case, dan average-case.\n3. Buat grafik perbandingan run-time dalam format SVG/PNG dan cantumkan dalam laporan PDF.\n4. Kumpulkan archive ZIP yang memuat source code dan file laporan PDF.",
  },
  {
    id: "ASG-002",
    courseId: "IF301",
    courseCode: "IF301",
    courseName: "Algoritma & Struktur Data",
    title: "Tugas 2: Implementasi Self-Balancing AVL Tree",
    description:
      "Merancang struktur data pohon pencarian biner seimbang (AVL Tree) dengan mekanisme rotasi otomatis (Left, Right, Left-Right, Right-Left) saat operasi insert dan delete.",
    lecturer: "Dr. Rudi Hartono, M.Kom",
    dueDate: "2025-11-30T23:59:00",
    status: "in-progress",
    submittedAt: null,
    grade: null,
    attachments: [
      { name: "Spesifikasi_AVL_Tree.pdf", size: "980 KB", type: "pdf" },
      { name: "template_avl_node.cpp", size: "12 KB", type: "code" },
    ],
    instructions:
      "1. Lengkapi template node dan method insert, delete, search, serta balance calculation.\n2. Pastikan properti AVL (|height(L) - height(R)| <= 1) selalu terpenuhi setelah setiap mutasi.\n3. Sediakan unit test suite yang memverifikasi visualisasi pohon setelah 20 operasi acak.\n4. Sertakan file README.md dengan instruksi kompilasi (g++ -std=c++17).",
  },
  {
    id: "ASG-003",
    courseId: "IF302",
    courseCode: "IF302",
    courseName: "Pemrograman Web Lanjut",
    title: "Tugas 1: Perancangan Arsitektur RESTful API & JWT Auth",
    description:
      "Membangun layanan backend RESTful API lengkap dengan autentikasi berbasis JSON Web Token (JWT), enkripsi password bcrypt, dan proteksi endpoint berdasarkan role pengguna (RBAC).",
    lecturer: "Irma Susanti, S.T., M.T.",
    dueDate: "2025-11-05T23:59:00",
    status: "submitted",
    submittedAt: "2025-11-04T18:40:00",
    grade: 95,
    attachments: [
      { name: "API_Specification_Contract.pdf", size: "850 KB", type: "pdf" },
      { name: "postman_collection.json", size: "45 KB", type: "json" },
    ],
    instructions:
      "1. Gunakan framework Express.js atau FastAPI dengan arsitektur folder controller-service-repository yang rapi.\n2. Terapkan middleware verifikasi token pada rute yang diproteksi.\n3. Sertakan exported Postman Collection beserta Environment variable untuk pengujian otomatis.\n4. Upload link repository GitHub publik dan screenshot hasil test runner.",
  },
  {
    id: "ASG-004",
    courseId: "IF302",
    courseCode: "IF302",
    courseName: "Pemrograman Web Lanjut",
    title: "Tugas 2: Single Page Application dengan React & Context API",
    description:
      "Membangun antarmuka dashboard interaktif berbasis React dengan manajemen state global menggunakan Context API, filtering dinamis, validasi form, dan implementasi token refresh handler.",
    lecturer: "Irma Susanti, S.T., M.T.",
    dueDate: "2025-12-04T23:59:00",
    status: "in-progress",
    submittedAt: null,
    grade: null,
    attachments: [
      { name: "Figma_Design_Tokens_Wireframe.pdf", size: "2.1 MB", type: "pdf" },
    ],
    instructions:
      "1. Bangun komponen dengan atomic design pattern dan CSS Variables sesuai palette Cakrawala.\n2. Terapkan client-side routing dengan React Router (nested layouts dan 404 page).\n3. Integrasikan client API menggunakan fetch atau Axios dengan error handling yang ramah pengguna.\n4. Pastikan aplikasi lulus pengujian responsiveness di breakpoint mobile dan desktop.",
  },
  {
    id: "ASG-005",
    courseId: "IF303",
    courseCode: "IF303",
    courseName: "Basis Data",
    title: "Tugas 1: Desain Konseptual ERD & Normalisasi 3NF/BCNF",
    description:
      "Menganalisis skenario sistem manajemen rantai pasok ritel multinasional, memetakan entitas dalam Enhanced Entity-Relationship Diagram (EERD), dan melakukan normalisasi bertahap hingga BCNF.",
    lecturer: "Prof. Budi Santoso, Ph.D.",
    dueDate: "2025-11-02T23:59:00",
    status: "submitted",
    submittedAt: "2025-11-01T22:10:00",
    grade: 88,
    attachments: [
      { name: "Studi_Kasus_Retail_Supply_Chain.pdf", size: "1.1 MB", type: "pdf" },
    ],
    instructions:
      "1. Gambar EERD dengan notasi Crow's Foot menggunakan diagram tools (Draw.io, Lucidchart, atau MySQL Workbench).\n2. Tuliskan analisis functional dependencies secara matematis untuk setiap entitas.\n3. Jabarkan langkah dekomposisi tabel dari 1NF, 2NF, 3NF, hingga BCNF tanpa loss of dependency.\n4. Sertakan DDL SQL CREATE TABLE dengan primary key, foreign key, dan check constraints.",
  },
  {
    id: "ASG-006",
    courseId: "IF303",
    courseCode: "IF303",
    courseName: "Basis Data",
    title: "Tugas 2: Optimasi Query SQL, Stored Procedure & Indexing",
    description:
      "Menganalisis performa query analitik pada basis data berukuran 500.000 transaksi, membuat Stored Procedure transaksi pemesanan, dan mengoptimalkan kecepatan eksekusi dengan B-Tree indexing.",
    lecturer: "Prof. Budi Santoso, Ph.D.",
    dueDate: "2025-12-01T23:59:00",
    status: "in-progress",
    submittedAt: null,
    grade: null,
    attachments: [
      { name: "Schema_ECommerce_Dump.sql", size: "3.2 MB", type: "sql" },
      { name: "Query_Optimization_Guide.pdf", size: "720 KB", type: "pdf" },
    ],
    instructions:
      "1. Jalankan profiling menggunakan perintah EXPLAIN ANALYZE sebelum dan sesudah optimasi.\n2. Buat composite index yang relevan untuk query pencarian multi-kolom.\n3. Rancang stored procedure transaksi pembayaran dengan mekanisme ROLLBACK saat kegagalan stok.\n4. Susun laporan teknis perbandingan execution time dalam milidetik.",
  },
  {
    id: "ASG-007",
    courseId: "IF304",
    courseCode: "IF304",
    courseName: "Jaringan Komputer",
    title: "Tugas 1: Perancangan Subnetting VLSM & Routing Dinamis OSPF",
    description:
      "Merancang pembagian alamat IPv4 dengan Variable Length Subnet Masking (VLSM) untuk topologi jaringan kampus 5 departemen dan mengonfigurasi routing protokol OSPF single-area.",
    lecturer: "Hendra Wijaya, M.Kom",
    dueDate: "2025-11-12T23:59:00",
    status: "submitted",
    submittedAt: "2025-11-11T16:20:00",
    grade: 90,
    attachments: [
      { name: "Topologi_Jaringan_Kampus.pkt", size: "1.8 MB", type: "pkt" },
      { name: "Worksheet_Subnetting_VLSM.pdf", size: "540 KB", type: "pdf" },
    ],
    instructions:
      "1. Hitung alokasi subnet, network address, broadcast address, dan usable host range untuk IP blok 172.16.0.0/19.\n2. Konfigurasikan router Cisco CLI dengan OSPF area 0 dan pasang passive-interface pada interface LAN.\n3. Uji konektivitas antar departemen dengan end-to-end ping dan inspect routing table.\n4. Kumpulkan file simulasi Cisco Packet Tracer (.pkt) dan worksheet perhitungan.",
  },
  {
    id: "ASG-008",
    courseId: "IF304",
    courseCode: "IF304",
    courseName: "Jaringan Komputer",
    title: "Tugas 2: Analisis Protokol Transport & TLS Menggunakan Wireshark",
    description:
      "Melakukan packet sniffing pada sesi koneksi web browser untuk menginvestigasi proses TCP 3-way handshake, TCP windowing, connection teardown, dan enkripsi handshake TLS 1.3.",
    lecturer: "Hendra Wijaya, M.Kom",
    dueDate: "2025-12-08T23:59:00",
    status: "upcoming",
    submittedAt: null,
    grade: null,
    attachments: [
      { name: "Packet_Capture_Lab_Guidelines.pdf", size: "1.3 MB", type: "pdf" },
    ],
    instructions:
      "1. Gunakan Wireshark capture filter untuk mengisolasi traffic HTTP/HTTPS pada interface loopback dan Wi-Fi.\n2. Identifikasi header SYN, SYN-ACK, ACK beserta sequence number dan acknowledgement number.\n3. Rekonstruksi aliran TCP stream dan analisis time-sequence graph (Stevens) untuk packet loss.\n4. Buat laporan teknis berisi anotasi tangkapan layar Wireshark.",
  },
  {
    id: "ASG-009",
    courseId: "IF305",
    courseCode: "IF305",
    courseName: "Sistem Operasi",
    title: "Tugas 1: Simulasi Algoritma Penjadwalan CPU (FCFS, SJF, RR)",
    description:
      "Membangun program simulasi CPU scheduling untuk membandingkan metrik Average Waiting Time (AWT), Turnaround Time (TAT), dan throughput antara FCFS, Shortest Job First, dan Round Robin.",
    lecturer: "Dr. Siti Rahayu, M.T.",
    dueDate: "2025-11-18T23:59:00",
    status: "overdue",
    submittedAt: null,
    grade: null,
    attachments: [
      { name: "Spesifikasi_Simulasi_CPU.pdf", size: "890 KB", type: "pdf" },
    ],
    instructions:
      "1. Implementasikan algoritma dalam bahasa Python, C, atau Java dengan input berupa daftar burst time dan arrival time.\n2. Tampilkan Gantt Chart visual pada output konsol terminal.\n3. Evaluasi performa algoritma saat quantum time diubah dari 2ms, 4ms, hingga 8ms.\n4. Lakukan pengumpulan kode sumber dan ringkasan eksekutif analisis performa.",
  },
  {
    id: "ASG-010",
    courseId: "IF305",
    courseCode: "IF305",
    courseName: "Sistem Operasi",
    title: "Tugas 2: Sinkronisasi Thread & Solusi Dining Philosophers",
    description:
      "Menyelesaikan permasalahan sinkronisasi klasik Dining Philosophers menggunakan mekanisme POSIX Threads (pthreads), Mutex Lock, dan Semaphores untuk mencegah deadlock dan starvation.",
    lecturer: "Dr. Siti Rahayu, M.T.",
    dueDate: "2025-12-12T23:59:00",
    status: "upcoming",
    submittedAt: null,
    grade: null,
    attachments: [
      { name: "Petunjuk_Praktikum_Concurrency.pdf", size: "640 KB", type: "pdf" },
      { name: "starter_mutex_c.zip", size: "220 KB", type: "zip" },
    ],
    instructions:
      "1. Rancang program C multi-threaded di mana setiap filsuf direpresentasikan oleh thread terpisah.\n2. Terapkan strategi pencegahan deadlock (Resource Hierarchy atau Chandy/Misra).\n3. Catat status transisi setiap thread (THINKING, HUNGRY, EATING) ke dalam log file thread-safe.\n4. Buat video demonstrasi singkat (2 menit) yang menunjukkan program berjalan tanpa hang/deadlock.",
  },
  {
    id: "ASG-011",
    courseId: "IF306",
    courseCode: "IF306",
    courseName: "Matematika Diskrit",
    title: "Tugas 1: Pembuktian Teori Graf & Pohon Rentang Minimum",
    description:
      "Menyusun pembuktian analitis formal untuk eksistensi Euler Circuit dan Hamilton Path pada graf terhubung, serta menerapkan algoritma Kruskal dan Prim untuk mencari Minimum Spanning Tree.",
    lecturer: "Andi Kusuma, M.Si.",
    dueDate: "2025-11-15T23:59:00",
    status: "overdue",
    submittedAt: null,
    grade: null,
    attachments: [
      { name: "Lembar_Soal_Teori_Graf.pdf", size: "780 KB", type: "pdf" },
    ],
    instructions:
      "1. Tulis bukti formal secara jelas dengan kaidah logika matematika dan induksi struktural.\n2. Kerjakan 5 soal studi kasus graf berbobot dengan menyertakan tabel langkah iterasi Prim dan Kruskal.\n3. Tulisan tangan rapi atau LaTeX format PDF wajib diunggah sebelum batas waktu.\n4. Keterlambatan pengumpulan dikenakan pemotongan 10% nilai per hari.",
  },
  {
    id: "ASG-012",
    courseId: "IF306",
    courseCode: "IF306",
    courseName: "Matematika Diskrit",
    title: "Tugas 2: Solusi Relasi Rekurensi Linier Homogen & Heterogen",
    description:
      "Menentukan solusi umum dan solusi khusus persamaan rekurensi linier berderajat dua dengan persamaan karakteristik, akar kembar/kompleks, serta aplikasi fungsi pembangkit (generating function).",
    lecturer: "Andi Kusuma, M.Si.",
    dueDate: "2025-12-16T23:59:00",
    status: "upcoming",
    submittedAt: null,
    grade: null,
    attachments: [
      { name: "Materi_Latihan_Relasi_Rekursif.pdf", size: "910 KB", type: "pdf" },
    ],
    instructions:
      "1. Selesaikan 6 permasalahan relasi rekurensi yang merepresentasikan kompleksitas algoritma divide-and-conquer.\n2. Gunakan metode substitusi dan Master Theorem untuk memverifikasi kebenaran solusi.\n3. Format dokumen pengumpulan: PDF hasil ketik LaTeX atau scan dokumen tulis tangan resolusi tinggi.\n4. Pastikan setiap langkah derivasi penurunan rumus diuraikan secara eksplisit.",
  },
];

export default assignments;
