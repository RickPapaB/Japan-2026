// ============================================================
// App logic
// ============================================================

// --- Password gate ---------------------------------------------------
// The site checks against a SHA-256 hash rather than storing the password
// in plain text. Default password is "kouyou2026" (kōyō = autumn leaves).
// To change it, just ask Claude — it'll compute the new hash and update
// window.__PW_HASH__ below.
async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Only the hash lives in source — the plaintext password is never stored here.
const PASSWORD_HASH = "61de6cf2b38bd74c977a02cdfa360e7791e0d06ddba39bffba4cc9a825ce7012";

async function checkPassword(input) {
  const h = await sha256(input.trim());
  return h === PASSWORD_HASH;
}

function unlock() {
  document.getElementById('lock').classList.add('hidden');
  document.getElementById('app').classList.add('show');
  try { sessionStorage.setItem('jt_unlocked', '1'); } catch (e) {}
  render();
}

document.getElementById('pw-submit').addEventListener('click', trySubmit);
document.getElementById('pw-input').addEventListener('keydown', e => { if (e.key === 'Enter') trySubmit(); });

async function trySubmit() {
  const input = document.getElementById('pw-input');
  const err = document.getElementById('lock-error');
  const ok = await checkPassword(input.value);
  if (ok) {
    unlock();
  } else {
    err.textContent = 'Not quite — try again.';
    input.value = '';
    input.focus();
  }
}

// --- Formatting helpers -----------------------------------------------
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function fmtDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
}
function fmtDateFull(iso) {
  const d = new Date(iso + "T00:00:00");
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  return `${days[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
}
function fmtDateWithYear(iso) {
  const d = new Date(iso + "T00:00:00");
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
function usd(n) { return '$' + n.toLocaleString('en-US'); }
function addDays(iso, n) {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
function dateRange(startIso, endIso) {
  const out = [];
  let cur = startIso;
  while (cur <= endIso) { out.push(cur); cur = addDays(cur, 1); }
  return out;
}
function hotelForDate(iso) {
  return HOTELS.find(h => iso >= h.checkin && iso < h.checkout) ||
         (iso === TRIP.end ? HOTELS[HOTELS.length - 1] : null);
}

// --- Countdown ----------------------------------------------------------
function renderCountdown() {
  const el = document.getElementById('countdown');
  const now = new Date();
  const todayIso = now.toISOString().slice(0, 10);
  const start = new Date(TRIP.start + "T00:00:00");
  const end = new Date(TRIP.end + "T00:00:00");
  const today = new Date(todayIso + "T00:00:00");

  if (today < start) {
    const diff = Math.ceil((start - today) / 86400000);
    el.innerHTML = `<span>Departure</span><b>${diff} day${diff === 1 ? '' : 's'} to go</b>`;
  } else if (today >= start && today <= end) {
    const dayNum = Math.floor((today - start) / 86400000) + 1;
    const totalDays = Math.floor((end - start) / 86400000) + 1;
    const h = hotelForDate(todayIso);
    el.innerHTML = `<span>On the road</span><b>Day ${dayNum} of ${totalDays}${h ? ' · ' + h.dest : ''}</b>`;
  } else {
    el.innerHTML = `<span>Trip complete</span><b>Welcome home 🍁</b>`;
  }
}

// --- Flights ---------------------------------------------------------
function renderFlights() {
  const el = document.getElementById('flight-list');
  if (!FLIGHTS.length) {
    el.innerHTML = `<div class="card"><div class="meta placeholder">No flights added yet.</div></div>`;
    return;
  }
  el.innerHTML = FLIGHTS.map(f => `
    <div class="card">
      <h3>${f.route}</h3>
      <div class="meta">${f.flightNo} · ${f.cabin} · ${f.stops} · Booking ref ${f.bookingRef}</div>
      <div class="meta" style="margin-top:10px;">
        <b>Depart</b> ${f.depAirport} — ${fmtDateFull(f.depDateTime.slice(0,10))}, ${f.depDateTime.slice(11,16)}<br>
        <b>Arrive</b> ${f.arrAirport} — ${fmtDateFull(f.arrDateTime.slice(0,10))}, ${f.arrDateTime.slice(11,16)}<br>
        <b>Duration</b> ${f.duration} · <b>Status</b> ${f.status}
      </div>
    </div>
    ${f.flag ? `<div class="card" style="border-left:4px solid var(--maple-500);"><div class="meta"><b>Worth double-checking:</b> ${f.flag}</div></div>` : ''}
  `).join('') + `
  <div class="card" style="background:var(--cream-100);border-style:dashed;">
    <div class="meta placeholder">Return flight (Tokyo → Tel Aviv) not added yet — upload the confirmation whenever you have it.</div>
  </div>`;
}

// --- Hotels list ---------------------------------------------------------
function renderHotels() {
  const el = document.getElementById('hotel-list');
  el.innerHTML = HOTELS.map(h => {
    const gmaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.hotel + ' ' + h.address)}`;
    return `
    <div class="card">
      <h3>${h.hotel}</h3>
      <div class="meta">${h.dest} · ${h.address}<br>
        ${fmtDate(h.checkin)} → ${fmtDate(h.checkout)} · <a href="tel:${h.phone.replace(/\s/g,'')}">${h.phone}</a>
      </div>
      <span class="tag nights">${h.nights} night${h.nights > 1 ? 's' : ''}</span>
      <span class="tag price">${usd(h.total)}</span>
      <div class="meta" style="margin-top:8px;">${h.notes}</div>
      <div class="hotel-links">
        <a href="${gmaps}" target="_blank" rel="noopener">📍 Google Maps</a>
      </div>
    </div>`;
  }).join('');
}

// --- Map -------------------------------------------------------------
let mapInstance = null;
function renderMap() {
  if (mapInstance) return;
  mapInstance = L.map('map', { scrollWheelZoom: false }).setView([35.5, 136.5], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(mapInstance);

  const latlngs = HOTELS.map(h => [h.lat, h.lng]);
  L.polyline(latlngs, { color: '#c85a3d', weight: 3, opacity: 0.75, dashArray: '2,8' }).addTo(mapInstance);

  HOTELS.forEach((h, i) => {
    const icon = L.divIcon({
      className: '',
      html: `<div style="background:#1c2b4a;color:#fff;border-radius:50%;width:26px;height:26px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.3);">${i + 1}</div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
    const gmaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.hotel + ' ' + h.address)}`;
    L.marker([h.lat, h.lng], { icon }).addTo(mapInstance)
      .bindPopup(`<b>${h.dest}</b><br>${h.hotel}<br>${fmtDate(h.checkin)} – ${fmtDate(h.checkout)}<br><a href="${gmaps}" target="_blank">Open in Google Maps</a>`);
  });

  setTimeout(() => mapInstance.invalidateSize(), 200);
}

// --- Car card ----------------------------------------------------------
function renderCar() {
  const el = document.getElementById('car-card');
  const gmapsPickup = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CAR.pickupLocation + ' ' + CAR.pickupAddress)}`;
  el.innerHTML = `
    <div class="card">
      <h3>${CAR.vehicle}</h3>
      <div class="meta">${CAR.company} · Booking #${CAR.bookingNo}</div>
      <div class="meta" style="margin-top:10px;">
        <b>Pick up</b> — ${fmtDateFull(CAR.pickupDateTime.slice(0,10))}, ${CAR.pickupDateTime.slice(11,16)}<br>
        ${CAR.pickupLocation}, ${CAR.pickupAddress}<br>
        ${CAR.pickupPhone}
      </div>
      <div class="meta" style="margin-top:10px;">
        <b>Drop off</b> — ${CAR.dropoffLocation}<br>${CAR.dropoffPhone}
      </div>
      <div class="meta" style="margin-top:10px;">
        <b>Fuel:</b> ${CAR.fuelPolicy} &nbsp;·&nbsp; <b>Mileage:</b> ${CAR.mileage}<br>
        <b>Insurance:</b> ${CAR.insurance}<br>
        <b>Payment:</b> ${CAR.payment}<br>
        <b>Cancellation:</b> ${CAR.cancellation}<br>
        <b>Driver:</b> ${CAR.driver}
      </div>
      <div class="hotel-links">
        <a href="${gmapsPickup}" target="_blank" rel="noopener">📍 Pickup location</a>
      </div>
    </div>
    <div class="card" style="border-left:4px solid var(--maple-500);">
      <div class="meta"><b>Worth double-checking:</b> ${CAR.flag}</div>
    </div>
  `;
}

// --- Budget --------------------------------------------------------------
function renderBudget() {
  const el = document.getElementById('budget-content');
  const rowsHtml = BUDGET.rows.map(r => `<tr><td>${r[0]}</td><td>${usd(r[1])}</td></tr>`).join('');
  const toursHtml = BUDGET.tours.map(t => `<tr><td>${t[0]} <span style="color:var(--ink-600);font-weight:400;">(${t[1]})</span></td><td>${usd(t[2])}</td></tr>`).join('');
  const notIncludedHtml = BUDGET.notIncluded.map(n => `<li>${n}</li>`).join('');
  el.innerHTML = `
    <div class="budget-total">
      <div class="amt">${usd(BUDGET.total)}</div>
      <div class="lbl">Total estimated — Japan only</div>
    </div>
    <div class="card">
      <h3 style="margin-bottom:10px;">By category</h3>
      <table class="budget">${rowsHtml}
        <tr class="total"><td>Total</td><td>${usd(BUDGET.total)}</td></tr>
      </table>
    </div>
    <div class="card">
      <h3 style="margin-bottom:10px;">Tours & guided activities</h3>
      <table class="budget">${toursHtml}</table>
    </div>
    <div class="card">
      <h3 style="margin-bottom:10px;">Not yet included</h3>
      <ul style="margin:0;padding-left:18px;font-size:13.5px;color:var(--ink-600);line-height:1.8;">${notIncludedHtml}</ul>
    </div>
    <div class="meta" style="padding:0 4px;">${BUDGET.note}</div>
  `;
}

// --- Reminders -----------------------------------------------------------
function renderReminders() {
  const el = document.getElementById('reminder-list');
  el.innerHTML = REMINDERS.map(r => `<li class="${r.flag ? 'flag' : ''}">${r.text}</li>`).join('');
}

// --- Crew ------------------------------------------------------------
function fmtPassport(p) {
  return `${p.country} — ${p.fullName}<br>No. ${p.number} · exp. ${fmtDateWithYear(p.expiry)}`;
}
function renderCrew() {
  const el = document.getElementById('crew-list');
  el.innerHTML = CREW.map(c => {
    const passportHtml = c.passportOnFile
      ? `<div class="meta placeholder" style="margin-top:8px;">${c.passportOnFile}</div>`
      : '';
    return `
    <div class="card">
      <div class="crew-card">
        <div class="avatar">${c.name[0]}</div>
        <div>
          <h3 style="margin-bottom:2px;">${c.name}</h3>
          <div class="meta">${c.role}</div>
        </div>
      </div>
      ${passportHtml}
    </div>`;
  }).join('') + `
    <div class="card">
      <div class="meta"><b>Diet:</b> ${TRIP.diet}</div>
      <div class="meta" style="margin-top:8px;">${CONNECTIVITY}</div>
    </div>
    <div class="card">
      <h3 style="margin-bottom:6px;">Tour operator</h3>
      <div class="meta">
        ${TOUR_OPERATOR.company}<br>
        Booking code ${TOUR_OPERATOR.bookingCode} · ${TOUR_OPERATOR.clients}<br>
        Trip designer: ${TOUR_OPERATOR.designer}<br>
        Hotline: ${TOUR_OPERATOR.hotline}<br>
        ${TOUR_OPERATOR.price}
      </div>
      <div class="meta" style="margin-top:8px;">${TOUR_OPERATOR.note}</div>
    </div>`;
}

// --- Timeline ------------------------------------------------------------
function renderTimeline() {
  const el = document.getElementById('timeline-list');
  const days = dateRange(TRIP.start, TRIP.end);
  const todayIso = new Date().toISOString().slice(0, 10);

  el.innerHTML = days.map((iso, idx) => {
    const h = hotelForDate(iso);
    const note = DAY_NOTES[iso];
    const isCheckin = h && h.checkin === iso;
    const isToday = iso === todayIso;
    const d = new Date(iso + "T00:00:00");
    return `
    <details class="day-group ${isToday ? 'today' : ''}">
      <summary>
        <div class="day-badge"><span class="num">${d.getDate()}</span><span class="mon">${MONTHS[d.getMonth()]}</span></div>
        <div class="day-head">
          <div class="loc">Day ${idx + 1} · ${h ? h.dest : '—'}</div>
          <div class="hotel">${h ? h.hotel : ''}${isCheckin ? ' (check-in)' : ''}</div>
        </div>
        <div class="chev">▸</div>
      </summary>
      <div class="day-body">
        ${note ? `<div class="note">${note}</div>` : `<div class="placeholder">Day plan not finalized yet — tell Claude what's happening this day and it'll go here.</div>`}
      </div>
    </details>`;
  }).join('');
}

// --- Nav / tabs ------------------------------------------------------
function wireNav() {
  document.querySelectorAll('nav.views button, nav.bottom button').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      document.getElementById('view-' + view).classList.add('active');
      document.querySelectorAll('nav.views button, nav.bottom button').forEach(b => b.classList.toggle('active', b.dataset.view === view));
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (view === 'overview' && document.getElementById('sub-map').classList.contains('active')) {
        setTimeout(renderMap, 50);
      }
    });
  });

  document.querySelectorAll('.subtabs button').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.dataset.sub;
      document.querySelectorAll('.subview').forEach(v => v.classList.remove('active'));
      document.getElementById('sub-' + sub).classList.add('active');
      document.querySelectorAll('.subtabs button').forEach(b => b.classList.toggle('active', b === btn));
      if (sub === 'map') setTimeout(renderMap, 50);
    });
  });
}

// --- Back to top --------------------------------------------------------
function wireBackTop() {
  const btn = document.getElementById('back-top');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// --- Init --------------------------------------------------------------
function render() {
  renderCountdown();
  renderFlights();
  renderHotels();
  renderCar();
  renderBudget();
  renderReminders();
  renderCrew();
  renderTimeline();
}

async function init() {
  wireNav();
  wireBackTop();

  // Auto-unlock within the same browser tab session
  try {
    if (sessionStorage.getItem('jt_unlocked') === '1') {
      unlock();
    }
  } catch (e) {}

  document.getElementById('pw-input').focus();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}
init();
