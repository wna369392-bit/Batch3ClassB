import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft, CalendarDays, Clock3, Plus, Pencil, Trash2, Eye,
  UploadCloud, X, Search, GraduationCap, Phone, UserRound, Wallet,
  CheckCircle2, XCircle, ClipboardList
} from 'lucide-react'

const STORAGE_KEY = 'level-placement-bookings-v1'
const FEE = 10000

const initialBookings = [
  {
    id: 'BK-1001', studentName: 'Tun Yati Wai', parentName: 'Daw Sandi Wai',
    dob: '2012-04-12', phone: '09 777123456', bookingDate: '2026-12-02',
    bookingTime: '10:00', paymentMethod: 'KBZ Pay', status: 'Pending',
    slipName: '', slipData: '', createdAt: Date.now()
  },
  {
    id: 'BK-1002', studentName: 'Thae Su Wai', parentName: 'Daw Hnin Ei',
    dob: '2011-08-20', phone: '09 421234567', bookingDate: '2026-12-04',
    bookingTime: '13:00', paymentMethod: 'Wave Pay', status: 'Accepted',
    slipName: '', slipData: '', createdAt: Date.now() - 1000
  },
  {
    id: 'BK-1003', studentName: 'Honey May', parentName: 'U Aung Min',
    dob: '2013-02-05', phone: '09 965432100', bookingDate: '2026-12-06',
    bookingTime: '09:00', paymentMethod: 'CB Pay', status: 'Rejected',
    slipName: '', slipData: '', createdAt: Date.now() - 2000
  }
]

const emptyForm = {
  studentName: '', parentName: '', dob: '', phone: '',
  bookingDate: '', bookingTime: '', paymentMethod: '',
  slipName: '', slipData: ''
}

const instructions = [
  'Level Placement Test မဖြေဆိုမီ ကျောင်းသား၏ အမည်နှင့် မွေးသက္ကရာဇ် (DOB) တို့ကို မှန်ကန်စွာ ဖြည့်သွင်းပေးပါရန်။',
  'မိမိတို့ အမှန်တကယ် ဖြေဆိုနိုင်မည့် Available Date နှင့် Timeslot ကို သေချာစွာ ရွေးချယ်ပေးပါ။',
  'ငွေလွှဲပြီးပါက Payment Slip ကို ရှင်းလင်းစွာ မြင်သာအောင် Upload တင်ပေးရပါမည်။',
  'Payment Slip တင်ပြီးပါက Admin ဘက်မှ စစ်ဆေးအတည်ပြု (Confirm) ပေးရန် စောင့်ဆိုင်းပေးပါ။',
  'Admin မှ Payment ကို Confirm လုပ်ပြီးသည်နှင့် Dashboard တွင် Zoom Link ကို မြင်တွေ့ရမည်ဖြစ်ပါသည်။',
  'Test ဖြေဆိုရမည့် ရက်နှင့်အချိန်ရောက်ပါက Dashboard ရှိ Join to Zoom Class ကို နှိပ်ပါ။',
  'Test ဖြေဆိုပြီးနောက် Result ကို Admin မှ စစ်ဆေး၍ Dashboard ထဲသို့ ပို့ပေးပါမည်။',
  'ရက် သို့မဟုတ် အချိန်ပြောင်းလဲလိုပါက Admin ထံ ဆက်သွယ်၍ တစ်ကြိမ်သာ အခမဲ့ ပြောင်းလဲခွင့်ရှိပါသည်။',
  'ပေးချေပြီးသော Test ကြေးများကို မည်သည့်အကြောင်းကြောင့်မျှ ပြန်အမ်းပေးမည် မဟုတ်ပါ (Non-refundable)။'
]

function readBookings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : initialBookings
  } catch {
    return initialBookings
  }
}

function formatDate(date) {
  if (!date) return '—'
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })
}

function formatTime(time) {
  if (!time) return '—'
  const [hour, minute] = time.split(':')
  const d = new Date()
  d.setHours(Number(hour), Number(minute), 0, 0)
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

function makeId() {
  return `BK-${Date.now().toString().slice(-7)}`
}

function App() {
  const [bookings, setBookings] = useState(readBookings)
  const [page, setPage] = useState('list')
  const [editingId, setEditingId] = useState(null)
  const [viewing, setViewing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  }, [bookings])

  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(''), 2800)
    return () => clearTimeout(timer)
  }, [notice])

  const filteredBookings = useMemo(() => bookings
    .filter(b => filter === 'All' || b.status === filter)
    .filter(b => `${b.studentName} ${b.parentName} ${b.phone} ${b.id}`
      .toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate)),
  [bookings, filter, search])

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setPage('form')
  }

  function openEdit(booking) {
    setEditingId(booking.id)
    setForm({
      studentName: booking.studentName, parentName: booking.parentName,
      dob: booking.dob, phone: booking.phone, bookingDate: booking.bookingDate,
      bookingTime: booking.bookingTime, paymentMethod: booking.paymentMethod,
      slipName: booking.slipName || '', slipData: booking.slipData || ''
    })
    setPage('form')
  }

  function updateField(e) {
    const { name, value } = e.target
    setForm(current => ({ ...current, [name]: value }))
  }

  function handleSlip(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(file.type)) {
      setNotice('JPG, PNG, WEBP သို့မဟုတ် PDF ဖိုင်သာ တင်နိုင်ပါသည်။')
      e.target.value = ''
      return
    }
    if (file.size > 3 * 1024 * 1024) {
      setNotice('ဖိုင်အရွယ်အစား 3MB ထက် မကျော်ရပါ။')
      e.target.value = ''
      return
    }
    const reader = new FileReader()
    reader.onload = () => setForm(current => ({
      ...current, slipName: file.name, slipData: reader.result
    }))
    reader.readAsDataURL(file)
  }

  function saveBooking(e) {
    e.preventDefault()
    if (!form.slipData && !editingId) {
      setNotice('Payment Slip ကို Upload တင်ပေးပါ။')
      return
    }
    if (editingId) {
      setBookings(current => current.map(b => b.id === editingId
        ? { ...b, ...form, updatedAt: Date.now() } : b))
      setNotice('Booking ကို အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ။')
    } else {
      setBookings(current => [...current, {
        ...form, id: makeId(), status: 'Pending', createdAt: Date.now()
      }])
      setNotice('Booking အသစ်ကို အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ။')
    }
    setPage('list')
    setEditingId(null)
    setForm(emptyForm)
  }

  function deleteBooking(id) {
    const target = bookings.find(b => b.id === id)
    if (!window.confirm(`${target?.studentName || 'ဒီ booking'} ကို ဖျက်မှာ သေချာပါသလား။`)) return
    setBookings(current => current.filter(b => b.id !== id))
    setViewing(null)
    setNotice('Booking ကို ဖျက်ပြီးပါပြီ။')
  }

  function changeStatus(id, status) {
    setBookings(current => current.map(b => b.id === id ? { ...b, status } : b))
    setViewing(current => current?.id === id ? { ...current, status } : current)
    setNotice(`Status ကို ${status} သို့ ပြောင်းပြီးပါပြီ။`)
  }

  const counts = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    accepted: bookings.filter(b => b.status === 'Accepted').length,
    rejected: bookings.filter(b => b.status === 'Rejected').length
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><div className="brand-icon"><GraduationCap size={22}/></div>
          <div><strong>Placement<span>Pro</span></strong><small>BOOKING MANAGEMENT</small></div>
        </div>
        <div className="topbar-right"><span className="admin-dot"/> Admin Workspace</div>
      </header>

      <main className="container">
        {notice && <div className="toast"><CheckCircle2 size={17}/>{notice}<button onClick={() => setNotice('')}><X size={16}/></button></div>}

        {page === 'list' ? (
          <>
            <section className="welcome-row">
              <div><p className="eyebrow">PLACEMENT TEST</p><h1>Booking Management</h1>
                <p className="muted">Manage student test bookings, payment slips and schedules.</p></div>
              <button className="primary-btn" onClick={openCreate}><Plus size={18}/> Create Booking</button>
            </section>

            <section className="stats-grid">
              <Stat label="Total Bookings" value={counts.total} icon={<ClipboardList/>}/>
              <Stat label="Pending Review" value={counts.pending} icon={<Clock3/>}/>
              <Stat label="Accepted" value={counts.accepted} icon={<CheckCircle2/>}/>
              <Stat label="Rejected" value={counts.rejected} icon={<XCircle/>}/>
            </section>

            <section className="list-panel">
              <div className="panel-heading"><div><h2>Booking List</h2><p className="muted">All student placement test reservations</p></div>
                <span className="result-count">{filteredBookings.length} records</span></div>
              <div className="toolbar">
                <label className="search-box"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student, parent, phone or ID..."/></label>
                <select value={filter} onChange={e => setFilter(e.target.value)} aria-label="Filter by status">
                  {['All', 'Pending', 'Accepted', 'Rejected', 'Enrolled'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="booking-list">
                {filteredBookings.length === 0 ? <div className="empty-state"><ClipboardList size={34}/><h3>No bookings found</h3><p>Try another search or create a new booking.</p></div> :
                  filteredBookings.map(booking => <BookingCard key={booking.id} booking={booking}
                    onEdit={openEdit} onDelete={deleteBooking} onView={setViewing}/>)}
              </div>
            </section>
            <footer>© 2026 PlacementPro · Booking Management System</footer>
          </>
        ) : (
          <section className="form-page">
            <button className="back-link" onClick={() => setPage('list')}><ArrowLeft size={17}/> Back to Booking List</button>
            <div className="form-card">
              <div className="form-main">
                <div className="form-title"><p className="eyebrow">{editingId ? 'EDIT RESERVATION' : 'NEW RESERVATION'}</p>
                  <h1>{editingId ? 'Update Booking Information' : 'Level Placement Test Booking'}</h1>
                  <p className="muted">Enter the student's information and choose an available test slot.</p></div>
                <form onSubmit={saveBooking}>
                  <div className="form-grid">
                    <Field label="Student Name" icon={<UserRound size={15}/>}><input name="studentName" value={form.studentName} onChange={updateField} required placeholder="Enter student name"/></Field>
                    <Field label="Parent Name"><input name="parentName" value={form.parentName} onChange={updateField} required placeholder="Enter parent name"/></Field>
                    <Field label="Date of Birth"><input type="date" name="dob" value={form.dob} onChange={updateField} required max={new Date().toISOString().slice(0,10)}/></Field>
                    <Field label="Phone Number" icon={<Phone size={15}/>}><input type="tel" name="phone" value={form.phone} onChange={updateField} required pattern="[0-9+() -]{7,18}" placeholder="09xxxxxxxxx"/></Field>
                    <Field label="Booking Date" icon={<CalendarDays size={15}/>}><input type="date" name="bookingDate" value={form.bookingDate} onChange={updateField} required min={new Date().toISOString().slice(0,10)}/></Field>
                    <Field label="Booking Time Slot" icon={<Clock3 size={15}/>}><select name="bookingTime" value={form.bookingTime} onChange={updateField} required><option value="">Choose time slot</option>{['09:00','10:00','11:00','13:00','14:00','15:00'].map(t => <option key={t} value={t}>{formatTime(t)}</option>)}</select></Field>
                  </div>
                  <div className="fee-row"><span>Level Placement Test Charges</span><strong>{FEE.toLocaleString()} MMK</strong></div>
                  <Field label="Payment Method"><select name="paymentMethod" value={form.paymentMethod} onChange={updateField} required><option value="">Please choose payment method</option><option>KBZ Pay</option><option>Wave Pay</option><option>CB Pay</option><option bank>Bank Transfer</option></select></Field>
                  <div className="field upload-field"><label>Payment Slip {editingId && <small>(Upload a new file to replace the current slip)</small>}</label>
                    <label className="upload-control"><span><UploadCloud size={19}/></span><strong>{form.slipName || 'Choose payment slip'}</strong><small>JPG, PNG, WEBP or PDF · Max 3MB</small><input type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" onChange={handleSlip}/></label>
                    {form.slipData && <div className="file-ready"><CheckCircle2 size={15}/> Slip attached <button type="button" onClick={() => setForm(f => ({...f, slipName:'', slipData:''}))}>Remove</button></div>}
                  </div>
                  <div className="form-actions"><button type="button" className="cancel-btn" onClick={() => setPage('list')}>Cancel</button>
                    <button className="primary-btn" type="submit">{editingId ? 'Update Booking' : 'Book Test'}</button></div>
                </form>
              </div>
              <aside className="instructions"><div className="instruction-icon"><ClipboardList size={21}/></div><h2>Instructions</h2><p>Please read before submitting your booking.</p>
                <ol>{instructions.map((item, i) => <li key={i}>{item}</li>)}</ol></aside>
            </div>
          </section>
        )}
      </main>

      {viewing && <BookingModal booking={viewing} onClose={() => setViewing(null)}
        onEdit={b => { setViewing(null); openEdit(b) }} onDelete={deleteBooking} onStatus={changeStatus}/>}
    </div>
  )
}

function Stat({label, value, icon}) {
  return <div className="stat-card"><div className="stat-icon">{icon}</div><div><p>{label}</p><strong>{value}</strong></div></div>
}

function Field({label, children, icon}) {
  return <div className="field"><label>{label}</label><div className="input-wrap">{icon && <span className="input-icon">{icon}</span>}{children}</div></div>
}

function BookingCard({booking, onEdit, onDelete, onView}) {
  return <article className="booking-card">
    <div className="avatar"><GraduationCap size={26}/></div>
    <div className="booking-info"><div className="student-line"><h3>{booking.studentName}</h3><span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span></div>
      <p className="parent-name">{booking.parentName} <span>· {booking.id}</span></p>
      <div className="booking-meta"><span><CalendarDays size={15}/>{formatDate(booking.bookingDate)}</span><span><Clock3 size={15}/>{formatTime(booking.bookingTime)}</span></div>
    </div>
    <div className="card-actions">
      <button title="View details" onClick={() => onView(booking)}><Eye size={17}/></button>
      <button title="Edit booking" onClick={() => onEdit(booking)}><Pencil size={17}/></button>
      <button title="Delete booking" className="danger-icon" onClick={() => onDelete(booking.id)}><Trash2 size={17}/></button>
    </div>
  </article>
}

function BookingModal({booking, onClose, onEdit, onDelete, onStatus}) {
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <div className="modal"><div className="modal-head"><div><p className="eyebrow">BOOKING DETAILS</p><h2>{booking.studentName}</h2></div><button className="close-btn" onClick={onClose}><X/></button></div>
      <span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span>
      <div className="detail-grid">
        <Detail label="Booking ID" value={booking.id}/><Detail label="Parent Name" value={booking.parentName}/>
        <Detail label="Date of Birth" value={formatDate(booking.dob)}/><Detail label="Phone Number" value={booking.phone}/>
        <Detail label="Booking Date" value={formatDate(booking.bookingDate)}/><Detail label="Time Slot" value={formatTime(booking.bookingTime)}/>
        <Detail label="Payment Method" value={booking.paymentMethod}/><Detail label="Test Fee" value={`${FEE.toLocaleString()} MMK`}/>
      </div>
      <div className="slip-detail"><strong>Payment Slip</strong>{booking.slipData ? <a href={booking.slipData} target="_blank" rel="noreferrer">{booking.slipName || 'View uploaded slip'}</a> : <span>No slip uploaded</span>}</div>
      <div className="admin-status"><strong>Admin: Update booking status</strong><div>
        {['Pending','Accepted','Rejected','Enrolled'].map(s => <button key={s} className={`status-choice ${booking.status === s ? 'selected' : ''}`} onClick={() => onStatus(booking.id, s)}>{s}</button>)}</div></div>
      <div className="modal-actions"><button className="cancel-btn" onClick={() => onDelete(booking.id)}>Delete</button><button className="primary-btn" onClick={() => onEdit(booking)}><Pencil size={16}/> Edit Booking</button></div>
    </div>
  </div>
}

function Detail({label, value}) {
  return <div className="detail-item"><small>{label}</small><strong>{value || '—'}</strong></div>
}

export default App
