<<<<<<< HEAD
/**
 * RISE Module — Weekly Schedule Data
 * Weekly classes from Monday to Friday (2-3 classes per day, no conflicts).
 * All entries map directly to active courses IF301 - IF306.
 */

export const schedule = [
  // Monday
  {
    id: "SCH-001",
    courseId: "IF301",
    courseCode: "IF301",
    courseName: "Algoritma & Struktur Data",
    lecturer: "Dr. Rudi Hartono, M.Kom",
    day: "Monday",
    dayIndo: "Senin",
    startTime: "08:00",
    endTime: "10:30",
    room: "Ruang 405",
    type: "Lecture",
    isOnline: false,
    zoomLink: null,
  },
  {
    id: "SCH-002",
    courseId: "IF306",
    courseCode: "IF306",
    courseName: "Matematika Diskrit",
    lecturer: "Andi Kusuma, M.Si.",
    day: "Monday",
    dayIndo: "Senin",
    startTime: "13:00",
    endTime: "14:40",
    room: "Ruang 302",
    type: "Lecture",
    isOnline: false,
    zoomLink: null,
  },

  // Tuesday
  {
    id: "SCH-003",
    courseId: "IF301",
    courseCode: "IF301",
    courseName: "Algoritma & Struktur Data",
    lecturer: "Dr. Rudi Hartono, M.Kom",
    day: "Tuesday",
    dayIndo: "Selasa",
    startTime: "09:00",
    endTime: "11:30",
    room: "Lab Komputer 3",
    type: "Lab",
    isOnline: false,
    zoomLink: null,
  },
  {
    id: "SCH-004",
    courseId: "IF302",
    courseCode: "IF302",
    courseName: "Pemrograman Web Lanjut",
    lecturer: "Irma Susanti, S.T., M.T.",
    day: "Tuesday",
    dayIndo: "Selasa",
    startTime: "13:00",
    endTime: "15:30",
    room: "Ruang Multimedia 2",
    type: "Lecture",
    isOnline: false,
    zoomLink: null,
  },

  // Wednesday
  {
    id: "SCH-005",
    courseId: "IF303",
    courseCode: "IF303",
    courseName: "Basis Data",
    lecturer: "Prof. Budi Santoso, Ph.D.",
    day: "Wednesday",
    dayIndo: "Rabu",
    startTime: "08:00",
    endTime: "10:30",
    room: "Ruang 408",
    type: "Lecture",
    isOnline: false,
    zoomLink: null,
  },
  {
    id: "SCH-006",
    courseId: "IF302",
    courseCode: "IF302",
    courseName: "Pemrograman Web Lanjut",
    lecturer: "Irma Susanti, S.T., M.T.",
    day: "Wednesday",
    dayIndo: "Rabu",
    startTime: "13:00",
    endTime: "15:30",
    room: "Lab Rekayasa Perangkat Lunak",
    type: "Lab",
    isOnline: false,
    zoomLink: null,
  },

  // Thursday
  {
    id: "SCH-007",
    courseId: "IF304",
    courseCode: "IF304",
    courseName: "Jaringan Komputer",
    lecturer: "Hendra Wijaya, M.Kom",
    day: "Thursday",
    dayIndo: "Kamis",
    startTime: "08:00",
    endTime: "09:40",
    room: "Online Live Lecture (Zoom)",
    type: "Lecture",
    isOnline: true,
    zoomLink: "https://zoom.us/j/9123847192?pwd=cakrawalanetwork",
  },
  {
    id: "SCH-008",
    courseId: "IF304",
    courseCode: "IF304",
    courseName: "Jaringan Komputer",
    lecturer: "Hendra Wijaya, M.Kom",
    day: "Thursday",
    dayIndo: "Kamis",
    startTime: "10:00",
    endTime: "12:30",
    room: "Lab Jaringan & Komunikasi Data",
    type: "Lab",
    isOnline: false,
    zoomLink: null,
  },
  {
    id: "SCH-009",
    courseId: "IF303",
    courseCode: "IF303",
    courseName: "Basis Data",
    lecturer: "Prof. Budi Santoso, Ph.D.",
    day: "Thursday",
    dayIndo: "Kamis",
    startTime: "13:30",
    endTime: "15:30",
    room: "Lab Basis Data",
    type: "Lab",
    isOnline: false,
    zoomLink: null,
  },

  // Friday
  {
    id: "SCH-010",
    courseId: "IF305",
    courseCode: "IF305",
    courseName: "Sistem Operasi",
    lecturer: "Dr. Siti Rahayu, M.T.",
    day: "Friday",
    dayIndo: "Jumat",
    startTime: "08:30",
    endTime: "11:00",
    room: "Ruang 402",
    type: "Lecture",
    isOnline: false,
    zoomLink: null,
  },
  {
    id: "SCH-011",
    courseId: "IF305",
    courseCode: "IF305",
    courseName: "Sistem Operasi",
    lecturer: "Dr. Siti Rahayu, M.T.",
    day: "Friday",
    dayIndo: "Jumat",
    startTime: "13:30",
    endTime: "15:30",
    room: "Lab Komputer 2",
    type: "Lab",
    isOnline: false,
    zoomLink: null,
  },
  {
    id: "SCH-012",
    courseId: "IF306",
    courseCode: "IF306",
    courseName: "Matematika Diskrit",
    lecturer: "Andi Kusuma, M.Si.",
    day: "Friday",
    dayIndo: "Jumat",
    startTime: "15:45",
    endTime: "17:15",
    room: "Online Tutorial (Zoom)",
    type: "Tutorial",
    isOnline: true,
    zoomLink: "https://zoom.us/j/9847162354?pwd=cakrawaladiskrit",
  },
];

export const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default schedule;
=======
export const schedule = {
  Senin: [
    {
      id: 's1',
      courseCode: 'IF301',
      courseName: 'Pemrograman Web',
      lecturer: 'Dr. Rendra Kusuma, M.Kom',
      time: '08:00–10:30',
      room: 'Lab Komputer 2',
      isOnline: false,
      zoomUrl: null,
      type: 'Kuliah',
    },
    {
      id: 's2',
      courseCode: 'MK201',
      courseName: 'Kewirausahaan Digital',
      lecturer: 'Dr. Maya Sari, M.B.A',
      time: '13:00–14:40',
      room: 'Zoom Meeting',
      isOnline: true,
      zoomUrl: 'https://zoom.us/j/98765432103',
      type: 'Kuliah',
    },
  ],
  Selasa: [
    {
      id: 's3',
      courseCode: 'IF302',
      courseName: 'Basis Data',
      lecturer: 'Dr. Sari Dewi Utami, M.T',
      time: '10:00–12:30',
      room: 'Ruang K201',
      isOnline: false,
      zoomUrl: null,
      type: 'Kuliah',
    },
  ],
  Rabu: [
    {
      id: 's4',
      courseCode: 'IF303',
      courseName: 'Algoritma & Struktur Data',
      lecturer: 'Prof. Bambang Heru, Ph.D',
      time: '08:00–10:30',
      room: 'Ruang K101',
      isOnline: false,
      zoomUrl: null,
      type: 'Kuliah',
    },
    {
      id: 's5',
      courseCode: 'IF304',
      courseName: 'Sistem Operasi',
      lecturer: 'Dr. Hendra Pratama, M.Cs',
      time: '13:00–15:30',
      room: 'Zoom Meeting',
      isOnline: true,
      zoomUrl: 'https://zoom.us/j/98765432101',
      type: 'Kuliah',
    },
  ],
  Kamis: [
    {
      id: 's6',
      courseCode: 'IF305',
      courseName: 'Matematika Diskrit',
      lecturer: 'Dr. Lia Anggraeni, M.Si',
      time: '08:00–10:30',
      room: 'Ruang K102',
      isOnline: false,
      zoomUrl: null,
      type: 'Kuliah',
    },
    {
      id: 's7',
      courseCode: 'IF306',
      courseName: 'Rekayasa Perangkat Lunak',
      lecturer: 'Dr. Dian Rahma, M.T',
      time: '13:00–15:30',
      room: 'Zoom Meeting',
      isOnline: true,
      zoomUrl: 'https://zoom.us/j/98765432102',
      type: 'Kuliah',
    },
  ],
  Jumat: [
    {
      id: 's8',
      courseCode: 'IF303',
      courseName: 'Algoritma & Struktur Data',
      lecturer: 'Prof. Bambang Heru, Ph.D',
      time: '08:00–09:40',
      room: 'Lab Komputer 1',
      isOnline: false,
      zoomUrl: null,
      type: 'Praktikum',
    },
    {
      id: 's9',
      courseCode: 'IF307',
      courseName: 'Jaringan Komputer',
      lecturer: 'Dr. Agus Setiawan, M.Kom',
      time: '10:00–12:30',
      room: 'Lab Jaringan',
      isOnline: false,
      zoomUrl: null,
      type: 'Praktikum',
    },
  ],
  Sabtu: [],
  Minggu: [],
};

export const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export const getTodaySchedule = () => {
  const jsDay = new Date().getDay(); // 0=Sun, 1=Mon...6=Sat
  const dayMap = { 0: 'Minggu', 1: 'Senin', 2: 'Selasa', 3: 'Rabu', 4: 'Kamis', 5: 'Jumat', 6: 'Sabtu' };
  return schedule[dayMap[jsDay]] || [];
};

export const getTodayDayName = () => {
  const jsDay = new Date().getDay();
  const dayMap = { 0: 'Minggu', 1: 'Senin', 2: 'Selasa', 3: 'Rabu', 4: 'Kamis', 5: 'Jumat', 6: 'Sabtu' };
  return dayMap[jsDay];
};
>>>>>>> 30a6e27bfed7e0d425c91fdb987e37c56bccf6e8
