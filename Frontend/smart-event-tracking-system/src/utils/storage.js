const STORAGE_KEYS = {
  EVENTS: 'sets_events_v1',
  ATTENDEES: 'sets_attendees_v1',
  LOGS: 'sets_activity_logs_v1',
};

export const initialEvents = [
  {
    id: 'evt-101',
    title: 'Yangon Tech & AI Summit 2026',
    category: 'Conference',
    date: '2026-12-10',
    time: '09:00',
    location: 'Novotel Yangon Max, Ballroom A',
    capacity: 250,
    status: 'Upcoming',
    description: 'Annual technology leadership conference focusing on Applied AI, Cloud Infrastructure, and Product Engineering.',
  },
  {
    id: 'evt-102',
    title: 'Startup Founders Networking Night',
    category: 'Networking',
    date: '2026-11-22',
    time: '18:00',
    location: 'Lotte Hotel, Crystal Ballroom',
    capacity: 120,
    status: 'Live',
    description: 'Evening mixer connecting seed-stage founders, angel investors, and ecosystem builders.',
  },
  {
    id: 'evt-103',
    title: 'Full-Stack React & System Design Workshop',
    category: 'Workshop',
    date: '2026-11-15',
    time: '13:30',
    location: 'MICT Park, Building 9',
    capacity: 60,
    status: 'Completed',
    description: 'Hands-on engineering bootcamp covering scalable React architecture and real-time event pipelines.',
  },
];

export const initialAttendees = [
  {
    id: 'att-1',
    ticketCode: 'TCK-8492',
    eventId: 'evt-102',
    name: 'Aung Kyaw Moe',
    email: 'aungkyaw@example.com',
    phone: '09-791234567',
    ticketType: 'VIP',
    checkedIn: true,
    checkInTime: '2026-11-22 17:52',
  },
  {
    id: 'att-2',
    ticketCode: 'TCK-3910',
    eventId: 'evt-102',
    name: 'Su Myat Noe',
    email: 'sumyat@example.com',
    phone: '09-420987654',
    ticketType: 'General',
    checkedIn: true,
    checkInTime: '2026-11-22 18:05',
  },
  {
    id: 'att-3',
    ticketCode: 'TCK-5521',
    eventId: 'evt-102',
    name: 'Thiha Zaw',
    email: 'thihazaw@example.com',
    phone: '09-250112233',
    ticketType: 'Speaker',
    checkedIn: false,
    checkInTime: null,
  },
  {
    id: 'att-4',
    ticketCode: 'TCK-7104',
    eventId: 'evt-101',
    name: 'Khin Yadana',
    email: 'khinyadana@example.com',
    phone: '09-977665544',
    ticketType: 'VIP',
    checkedIn: false,
    checkInTime: null,
  },
  {
    id: 'att-5',
    ticketCode: 'TCK-6298',
    eventId: 'evt-103',
    name: 'Min Khant Ko',
    email: 'minkhant@example.com',
    phone: '09-441122334',
    ticketType: 'General',
    checkedIn: true,
    checkInTime: '2026-11-15 13:20',
  },
];

export const initialLogs = [
  {
    id: 'log-1',
    timestamp: '2026-11-22 18:05',
    action: 'CHECK_IN',
    message: 'Su Myat Noe (TCK-3910) checked into Startup Founders Networking Night',
  },
  {
    id: 'log-2',
    timestamp: '2026-11-22 17:52',
    action: 'CHECK_IN',
    message: 'Aung Kyaw Moe (TCK-8492) checked into Startup Founders Networking Night',
  },
];

export function loadData() {
  try {
    const events = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS)) || initialEvents;
    const attendees = JSON.parse(localStorage.getItem(STORAGE_KEYS.ATTENDEES)) || initialAttendees;
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGS)) || initialLogs;
    return { events, attendees, logs };
  } catch {
    return { events: initialEvents, attendees: initialAttendees, logs: initialLogs };
  }
}

export function saveData(events, attendees, logs) {
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  localStorage.setItem(STORAGE_KEYS.ATTENDEES, JSON.stringify(attendees));
  localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
}

export function resetDemoData() {
  localStorage.removeItem(STORAGE_KEYS.EVENTS);
  localStorage.removeItem(STORAGE_KEYS.ATTENDEES);
  localStorage.removeItem(STORAGE_KEYS.LOGS);
  return { events: initialEvents, attendees: initialAttendees, logs: initialLogs };
}

export function exportToCSV(filename, rows) {
  if (!rows || !rows.length) return;
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((field) => {
          const val = row[field] === null || row[field] === undefined ? '' : String(row[field]);
          return `"${val.replace(/"/g, '""')}"`;
        })
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
