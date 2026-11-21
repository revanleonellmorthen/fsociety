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
