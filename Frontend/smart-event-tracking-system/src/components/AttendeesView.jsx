import React, { useState } from 'react';
import { Search, CheckCircle2, Circle, UserPlus, Download, Trash2, Ticket } from 'lucide-react';
import { exportToCSV } from '../utils/storage';

export default function AttendeesView({
  events,
  attendees,
  selectedEventId,
  setSelectedEventId,
  onToggleCheckIn,
  onDeleteAttendee,
  onOpenRegisterModal,
}) {
  const [search, setSearch] = useState('');
  const [checkFilter, setCheckFilter] = useState('All');

  const filteredAttendees = attendees.filter((att) => {
    const matchesEvent = selectedEventId === 'ALL' || att.eventId === selectedEventId;
    const matchesSearch =
      att.name.toLowerCase().includes(search.toLowerCase()) ||
      att.email.toLowerCase().includes(search.toLowerCase()) ||
      att.ticketCode.toLowerCase().includes(search.toLowerCase()) ||
      att.phone.includes(search);
    const matchesStatus =
      checkFilter === 'All' ||
      (checkFilter === 'Checked-In' && att.checkedIn) ||
      (checkFilter === 'Pending' && !att.checkedIn);
    return matchesEvent && matchesSearch && matchesStatus;
  });

  const getEventTitle = (eventId) => {
    const found = events.find((e) => e.id === eventId);
    return found ? found.title : 'Unknown Event';
  };

  const handleExport = () => {
    const rows = filteredAttendees.map((a) => ({
      TicketCode: a.ticketCode,
      Name: a.name,
      Email: a.email,
      Phone: a.phone,
      Event: getEventTitle(a.eventId),
      TicketType: a.ticketType,
      Status: a.checkedIn ? 'Checked-In' : 'Pending',
      CheckInTime: a.checkInTime || '-',
    }));
    exportToCSV('attendees-checkin-list.csv', rows);
  };

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="px-3.5 py-2 text-sm font-medium border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">All Events ({attendees.length})</option>
            {events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.title}
              </option>
            ))}
          </select>

          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search name, ticket code (TCK-...), phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {['All', 'Checked-In', 'Pending'].map((st) => (
              <button
                key={st}
                onClick={() => setCheckFilter(st)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                  checkFilter === st ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={() => onOpenRegisterModal(selectedEventId === 'ALL' ? events[0]?.id : selectedEventId)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition"
          >
            <UserPlus className="w-4 h-4" />
            Register Guest
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Ticket ID</th>
                <th className="py-3.5 px-4">Attendee</th>
                <th className="py-3.5 px-4">Event</th>
                <th className="py-3.5 px-4">Tier</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredAttendees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-slate-400">
                    No attendees found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredAttendees.map((att) => (
                  <tr key={att.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-mono text-xs font-semibold text-indigo-600">
                      <span className="inline-flex items-center gap-1.5 bg-indigo-50 px-2.5 py-1 rounded-md">
                        <Ticket className="w-3.5 h-3.5" />
                        {att.ticketCode}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-900">{att.name}</p>
                      <p className="text-xs text-slate-500">
                        {att.email} • {att.phone}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">{getEventTitle(att.eventId)}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                          att.ticketType === 'VIP'
                            ? 'bg-amber-100 text-amber-800'
                            : att.ticketType === 'Speaker'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {att.ticketType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {att.checkedIn ? (
                        <div>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Checked-In
                          </span>
                          <p className="text-[11px] text-slate-400 mt-0.5">{att.checkInTime}</p>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                          <Circle className="w-3.5 h-3.5" /> Not Arrived
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => onToggleCheckIn(att.id)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                            att.checkedIn
                              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                          }`}
                        >
                          {att.checkedIn ? 'Undo' : 'Check In'}
                        </button>
                        <button
                          onClick={() => onDeleteAttendee(att.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Remove Attendee"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
