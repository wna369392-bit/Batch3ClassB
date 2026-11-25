import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import EventsView from './components/EventsView';
import AttendeesView from './components/AttendeesView';
import { EventFormModal, RegisterAttendeeModal, QuickCheckInModal } from './components/Modals';
import { loadData, saveData, resetDemoData } from './utils/storage';
import { Activity } from 'lucide-react';

function nowTimestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function App() {
  const [data, setData] = useState(() => loadData());
  const { events, attendees, logs } = data;

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedEventId, setSelectedEventId] = useState('ALL');

  // Modals state
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [registerDefaultEventId, setRegisterDefaultEventId] = useState('');
  const [scannerOpen, setScannerOpen] = useState(false);

  useEffect(() => {
    saveData(events, attendees, logs);
  }, [events, attendees, logs]);

  const addLog = (action, message, currentLogs = logs) => [
    { id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, timestamp: nowTimestamp(), action, message },
    ...currentLogs,
  ];

  // Event CRUD
  const handleSaveEvent = (eventPayload) => {
    if (editingEvent) {
      const updatedEvents = events.map((e) => (e.id === editingEvent.id ? { ...eventPayload, id: editingEvent.id } : e));
      setData({
        events: updatedEvents,
        attendees,
        logs: addLog('EVENT_UPDATED', `Updated event "${eventPayload.title}"`),
      });
    } else {
      const newEvent = { ...eventPayload, id: `evt-${Date.now().toString().slice(-4)}` };
      setData({
        events: [newEvent, ...events],
        attendees,
        logs: addLog('EVENT_CREATED', `Created new event "${newEvent.title}"`),
      });
    }
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    const target = events.find((e) => e.id === eventId);
    if (!target) return;
    if (!window.confirm(`Delete "${target.title}" and its registered attendees?`)) return;
    setData({
      events: events.filter((e) => e.id !== eventId),
      attendees: attendees.filter((a) => a.eventId !== eventId),
      logs: addLog('EVENT_DELETED', `Deleted event "${target.title}"`),
    });
  };

  // Attendee CRUD & Check-In
  const handleRegisterAttendee = (payload) => {
    const ticketCode = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAttendee = {
      id: `att-${Date.now()}`,
      ticketCode,
      ...payload,
      checkedIn: false,
      checkInTime: null,
    };
    const evt = events.find((e) => e.id === payload.eventId);
    setData({
      events,
      attendees: [newAttendee, ...attendees],
      logs: addLog('REGISTERED', `Registered ${payload.name} (${ticketCode}) for ${evt?.title || 'Event'}`),
    });
  };

  const handleToggleCheckIn = (attendeeId) => {
    const target = attendees.find((a) => a.id === attendeeId);
    if (!target) return;
    const nextState = !target.checkedIn;
    const evt = events.find((e) => e.id === target.eventId);

    const updatedAttendees = attendees.map((a) =>
      a.id === attendeeId ? { ...a, checkedIn: nextState, checkInTime: nextState ? nowTimestamp() : null } : a
    );

    setData({
      events,
      attendees: updatedAttendees,
      logs: addLog(
        nextState ? 'CHECK_IN' : 'CHECK_OUT',
        `${target.name} (${target.ticketCode}) ${nextState ? 'checked into' : 'undid check-in for'} ${evt?.title || 'Event'}`
      ),
    });
  };

  const handleCheckInByCode = (ticketCode) => {
    const target = attendees.find((a) => a.ticketCode.toUpperCase() === ticketCode);
    if (!target) {
      return { success: false, title: 'Invalid Ticket Code', message: `No registration found for ${ticketCode}.` };
    }
    const evt = events.find((e) => e.id === target.eventId);
    if (target.checkedIn) {
      return {
        success: false,
        title: 'Already Checked In',
        message: `${target.name} already checked in at ${target.checkInTime}.`,
      };
    }

    const updatedAttendees = attendees.map((a) =>
      a.id === target.id ? { ...a, checkedIn: true, checkInTime: nowTimestamp() } : a
    );
    setData({
      events,
      attendees: updatedAttendees,
      logs: addLog('CHECK_IN', `Gate Scan: ${target.name} (${target.ticketCode}) checked into ${evt?.title || 'Event'}`),
    });

    return {
      success: true,
      title: `Welcome, ${target.name}!`,
      message: `${target.ticketType} Pass verified for ${evt?.title || 'Event'}.`,
    };
  };

  const handleDeleteAttendee = (attendeeId) => {
    const target = attendees.find((a) => a.id === attendeeId);
    if (!target) return;
    setData({
      events,
      attendees: attendees.filter((a) => a.id !== attendeeId),
      logs: addLog('REMOVED', `Removed registration for ${target.name} (${target.ticketCode})`),
    });
  };

  const handleResetDemo = () => {
    if (window.confirm('Reset all events, attendees, and logs back to initial demo data?')) {
      setData(resetDemoData());
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenScanner={() => setScannerOpen(true)}
        onOpenNewEvent={() => {
          setEditingEvent(null);
          setEventModalOpen(true);
        }}
        onResetDemo={handleResetDemo}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <Dashboard
            events={events}
            attendees={attendees}
            logs={logs}
            setActiveTab={setActiveTab}
            onSelectEvent={(evtId) => {
              setSelectedEventId(evtId);
              setActiveTab('attendees');
            }}
          />
        )}

        {activeTab === 'events' && (
          <EventsView
            events={events}
            attendees={attendees}
            onEditEvent={(evt) => {
              setEditingEvent(evt);
              setEventModalOpen(true);
            }}
            onDeleteEvent={handleDeleteEvent}
            onSelectEventForAttendees={(evtId) => {
              setSelectedEventId(evtId);
              setActiveTab('attendees');
            }}
            onOpenRegisterModal={(evtId) => {
              setRegisterDefaultEventId(evtId);
              setRegisterModalOpen(true);
            }}
          />
        )}

        {activeTab === 'attendees' && (
          <AttendeesView
            events={events}
            attendees={attendees}
            selectedEventId={selectedEventId}
            setSelectedEventId={setSelectedEventId}
            onToggleCheckIn={handleToggleCheckIn}
            onDeleteAttendee={handleDeleteAttendee}
            onOpenRegisterModal={(evtId) => {
              setRegisterDefaultEventId(evtId);
              setRegisterModalOpen(true);
            }}
          />
        )}

        {activeTab === 'logs' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900">Full Audit & Check-In Activity Log</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {logs.map((log) => (
                <div key={log.id} className="py-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 rounded">
                      {log.action}
                    </span>
                    <span className="text-slate-800">{log.message}</span>
                  </div>
                  <span className="text-xs text-slate-400">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      <EventFormModal
        isOpen={eventModalOpen}
        onClose={() => {
          setEventModalOpen(false);
          setEditingEvent(null);
        }}
        onSave={handleSaveEvent}
        editingEvent={editingEvent}
      />

      <RegisterAttendeeModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        events={events}
        defaultEventId={registerDefaultEventId}
        onRegister={handleRegisterAttendee}
      />

      <QuickCheckInModal
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        attendees={attendees}
        events={events}
        onCheckInByCode={handleCheckInByCode}
      />
    </div>
  );
}
