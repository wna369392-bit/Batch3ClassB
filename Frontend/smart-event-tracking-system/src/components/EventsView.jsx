import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Edit2, Trash2, Download, UserPlus } from 'lucide-react';
import { exportToCSV } from '../utils/storage';

export default function EventsView({
  events,
  attendees,
  onEditEvent,
  onDeleteEvent,
  onSelectEventForAttendees,
  onOpenRegisterModal,
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredEvents = events.filter((evt) => {
    const matchesSearch =
      evt.title.toLowerCase().includes(search.toLowerCase()) ||
      evt.location.toLowerCase().includes(search.toLowerCase()) ||
      evt.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || evt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    const rows = filteredEvents.map((e) => {
      const evtAtt = attendees.filter((a) => a.eventId === e.id);
      return {
        ID: e.id,
        Title: e.title,
        Category: e.category,
        Date: e.date,
        Time: e.time,
        Location: e.location,
        Status: e.status,
        Capacity: e.capacity,
        Registered: evtAtt.length,
        CheckedIn: evtAtt.filter((a) => a.checkedIn).length,
      };
    });
    exportToCSV('events-report.csv', rows);
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search event title, venue, category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {['All', 'Live', 'Upcoming', 'Completed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                  statusFilter === st ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Event Cards Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <p className="text-slate-500">No events match your current filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map((evt) => {
            const evtAttendees = attendees.filter((a) => a.eventId === evt.id);
            const checkedIn = evtAttendees.filter((a) => a.checkedIn).length;
            const fillPercent = Math.min(100, Math.round((evtAttendees.length / evt.capacity) * 100));

            return (
              <div
                key={evt.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden hover:shadow-md transition"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-lg">
                      {evt.category}
                    </span>
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        evt.status === 'Live'
                          ? 'bg-emerald-100 text-emerald-700'
                          : evt.status === 'Upcoming'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {evt.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1.5">{evt.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">{evt.description}</p>

                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>
                        {evt.date} • {evt.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>
                        {evtAttendees.length} Registered ({checkedIn} Checked-In) / {evt.capacity} Max
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-4">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${fillPercent}%` }} />
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectEventForAttendees(evt.id)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    View Guest List ({evtAttendees.length})
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onOpenRegisterModal(evt.id)}
                      className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                      title="Register Attendee"
                    >
                      <UserPlus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEditEvent(evt)}
                      className="p-1.5 text-slate-500 hover:bg-slate-200/70 rounded-lg transition"
                      title="Edit Event"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteEvent(evt.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
