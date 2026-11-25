import React from 'react';
import { Calendar, Users, UserCheck, TrendingUp, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function Dashboard({ events, attendees, logs, onSelectEvent, setActiveTab }) {
  const totalEvents = events.length;
  const liveEvents = events.filter((e) => e.status === 'Live').length;
  const totalRegistered = attendees.length;
  const totalCheckedIn = attendees.filter((a) => a.checkedIn).length;
  const attendanceRate = totalRegistered > 0 ? Math.round((totalCheckedIn / totalRegistered) * 100) : 0;

  const stats = [
    {
      label: 'Total Events',
      value: totalEvents,
      sub: `${liveEvents} Live Right Now`,
      icon: Calendar,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Registered Attendees',
      value: totalRegistered,
      sub: 'Across all active events',
      icon: Users,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      label: 'Checked-In Guests',
      value: totalCheckedIn,
      sub: `${totalRegistered - totalCheckedIn} Pending arrival`,
      icon: UserCheck,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Check-In Rate',
      value: `${attendanceRate}%`,
      sub: 'Overall turnout efficiency',
      icon: TrendingUp,
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">{stat.label}</span>
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-1">{stat.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event Capacity & Turnout Progress */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">Event Capacity & Check-In Status</h2>
            <button
              onClick={() => setActiveTab('events')}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
            >
              Manage Events <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {events.map((evt) => {
              const evtAttendees = attendees.filter((a) => a.eventId === evt.id);
              const checkedCount = evtAttendees.filter((a) => a.checkedIn).length;
              const regPercent = Math.min(100, Math.round((evtAttendees.length / evt.capacity) * 100));

              return (
                <div
                  key={evt.id}
                  onClick={() => onSelectEvent(evt.id)}
                  className="p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50/70 transition cursor-pointer"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900">{evt.title}</h3>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            evt.status === 'Live'
                              ? 'bg-emerald-100 text-emerald-700 animate-pulse'
                              : evt.status === 'Upcoming'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {evt.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {evt.date} at {evt.time}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {evt.location}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-900">
                        {checkedCount} / {evtAttendees.length}
                      </span>
                      <p className="text-xs text-slate-500">Checked-In / Registered</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${regPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Capacity: {evtAttendees.length} / {evt.capacity} seats ({regPercent}%)</span>
                    <span>Click to view attendees →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Feed */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">Recent Check-Ins & Activity</h2>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Live Feed
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[380px] pr-1">
            {logs.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">No activity recorded yet.</p>
            ) : (
              logs.slice(0, 10).map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm">
                  <p className="text-slate-800 font-medium">{log.message}</p>
                  <p className="text-xs text-slate-400 mt-1">{log.timestamp}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
