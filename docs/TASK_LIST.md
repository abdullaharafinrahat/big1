# Bondhu.org — Pending Work / Required Updates

> Status legend: ⬜ Not started · 🟡 In progress · ✅ Done · ⛔ Blocked
>
> Rule: **do not start any task without explicit confirmation from Abdullah**.

---

## 🎯 Priority Order (from your message)

1. **Location system** on Filter, Booking, Destination, Registration
2. Then: Driver / Owner / User Dashboards
3. Then: Mobile Validation + SMS
4. Then: Admin Review

---

## 📍 Canonical Location Structure

Every page that captures or filters a location **must** use this exact cascade,
in this order:

> বিভাগ → জেলা → উপজেলা → **ইউনিয়ন** → ওয়ার্ড → গ্রাম
>
> (Division → District → Upazila → **Union** → Ward → Village)

Every next step must be **cascading** — only options relevant to the parent
selection are shown.

---

# Section 1 — ফিল্টার পেইজ আপডেট (Filter Pages)

- ⬜ **1.1** Verify Union is present in every filter modal (already added in
  commit `cbe7829`, needs UX pass):
  - `pages/request-blood.html`
  - `pages/ambulance.html` (filter modal)
  - `pages/missing-bureau.html`
- ⬜ **1.2** Confirm the visual order in the filter popup is exactly:
  Division → District → Upazila → Union → Ward → Village
  (currently: Division/District row → Upazila → Union → Ward/Village row)
- ⬜ **1.3** Each dropdown must correctly filter its dependent child (test with
  live data — Dhaka → Dhaka District → Savar → Ashulia union → ward → village).
- ⬜ **1.4** Add "সব মুছুন / Clear All" behaviour so resetting Division
  properly cascades down and disables children.

---

# Section 2 — কার্ড পেইজ (Ambulance Card → Full Details Page)

**Context:** on `pages/ambulance.html` the directory shows a grid of
ambulance cards. Currently each card only exposes a "বুকিং করুন" button
(added in commit `7ce66c6`). Tapping the card body itself should open a
full **Total Details Page** for that specific ambulance.

- ✅ **2.1** Whole card is now a clickable link (`ambulance-detail.html?id=<AMB-ID>&back=…`); the "বুকিং করুন" button uses `stopPropagation` so it still opens the booking modal in place.
- ✅ **2.2** Standalone page **`pages/ambulance-detail.html?id=…`**.
- ✅ **2.3** Total Details Page renders all attributes (hero photo + plate + type, vehicle info, base hospital with full Division→Village address, driver + verified badge + experience + licence, equipment checklist as on/off pills, owner/provider, rate card, recent trips table).
- ✅ **2.4** Sticky "এখনই বুকিং করুন" CTA at page bottom — navigates back to `ambulance.html?book=<id>` which auto-opens the same booking modal pre-selected with this ambulance. Disabled when status = off-line.
- ✅ **2.5** Back link at top uses `?back=…` query param to preserve wherever the user came from (filter chips, scroll pos, etc.).
- ✅ **2.6** New `assets/data/ambulances.json` as single source of truth (fleet is now data-driven; both list + detail pages read from it).

---

# Section 3 — বুকিং পেইজ (Booking Page)

**Currently:** ambulance booking modal on `pages/ambulance.html` uses the full
location cascade including Union (added in `cbe7829`). Needs verification.

- ⬜ **3.1** Verify Union is present and cascading correctly in the ambulance
  booking modal.
- ⬜ **3.2** Confirm order in booking form: Division → District → Upazila →
  Union → Ward → Village.
- ⬜ **3.3** Add any missing booking fields the user needs (❓ ASK: what
  additional fields? Patient condition, expected pickup time, number of
  attendants, etc.?).
- ⬜ **3.4** Check submit persists Union into `bondhu.ambulanceBookings`.

---

# Section 4 — গন্তব্য / Destination Flow

**New flow needed:**

> Division → District → Upazila → Union → Ward → Village → **Hospital
> Name** → **Time** → **Date** → Submit

- ✅ **4.1** Standalone page `user-dashboard/destination-booking.html`. Sidebar
  entry added to the user dashboard; public entry link on `pages/ambulance.html`
  next to the "Register Ambulance" CTA.
- ✅ **4.2** Full cascading location (Division → District → Upazila → Union →
  Ward → Village) + Destination Hospital picker + Ambulance picker
  (Available-only from `assets/data/ambulances.json`) + native Date + Time
  pickers (min date = today, default = +1 hr from now rounded to 15 min).
  Contact name/phone/member ID auto-prefill from login session.
- ✅ **4.3** Submit:
  - Persist to `localStorage['bondhu.destinationBookings']` with
    `scheduledAtISO` (ISO 8601), plus separate `scheduledDate` + `scheduledTime`.
  - SMS to Driver + Owner queued to `localStorage['bondhu.smsOutbox']` with
    role, bookingId, body, queuedAt, status='queued'. Console-logged with
    `[SMS stub → outbox]` prefix. **Stub only** — swap in real provider later.
  - Success modal shows `DST-2026-NNNN` tracking code + summary + SMS count.
- ⬜ **4.4** Show the full destination booking on Driver / Owner Dashboards
  (blocked by Section 5.2 / 5.3 — those dashboards don't exist yet).

---

# Section 5 — Dashboard Update

Four separate dashboards need to exist and show role-appropriate content:

## 5.1 User Dashboard
**Currently:** exists at `user-dashboard/dashboard.html`.
- ⬜ Show the user's own booking / request status.
- ⬜ Show notifications (SMS / in-app).
- ⬜ Show any pending Admin Review status on their submissions.

## 5.2 Driver Dashboard ❓ (does not exist yet)
- ⬜ Decide location: `driver-dashboard/dashboard.html`? Or under
  `user-dashboard/`? (❓ ASK)
- ⬜ Show incoming booking requests (with pickup + destination + time).
- ⬜ Accept / Decline actions.
- ⬜ Notification centre.

## 5.3 Owner Dashboard ❓ (does not exist yet)
- ⬜ Decide location: `owner-dashboard/dashboard.html`?
- ⬜ Manage fleet (list of ambulances they own).
- ⬜ Manage drivers (list of drivers assigned to their fleet).
- ⬜ See all bookings across their fleet.
- ⬜ Revenue / trip history.

## 5.4 Admin Dashboard
**Currently:** exists at `pages/admin/dashboard.html`.
- ⬜ Review queue for User registrations.
- ⬜ Review queue for Driver information.
- ⬜ Review queue for Owner information.
- ⬜ Review queue for Bookings/Requests.

---

# Section 6 — Registration System

Registration form must include the full location cascade AND upload fields for
regulatory documents.

- ✅ **6.1** Full location cascade added to Vehicle step of
  `user-dashboard/register-ambulance.html`:
  Division → District → Upazila → Union → Ward → Village
  (all cascading, bilingual, uses the shared `bd-*.json` datasets).
- ✅ **6.2** Tax Token — number + expiry date + file upload.
- ✅ **6.3** Route Permit — number + expiry date + file upload.
  Plus additional required BRTA vehicle docs:
  - Fitness Certificate (number + expiry + file, required)
  - Insurance (policy no + expiry + file, optional)
  - Vehicle Registration Certificate / Blue Book (registration no + file, required)
  - Owner NID (nid no + file, required)
- ✅ **6.4** Documents stored as **base64 data URLs** in
  `localStorage['bondhu.pendingRegistrations']` with 5 MB per-file cap.
  Persistence layer double-writes to legacy `bondhu.ambulanceRegs` for
  backwards-compat. If localStorage quota is hit, metadata-only fallback
  is stored (with `storedMetaOnly: true` flag).
- ✅ **6.5** Submit routes each record to the unified admin-review queue
  (`bondhu.pendingRegistrations`) with `status: 'pending_admin_review'`,
  a `reviewNotes: []` array ready for admin annotations, and full
  submission timestamps (ISO + local Bangla).
- ✅ **6.6** Wizard restructured from 4 to 5 steps
  (Vehicle → Driver → Equipment → **Documents** → Submit); review step
  now summarises location, driver, equipment, and each document with
  a green tick when uploaded.

*Note*: Section 6 originally described "Registration" generically — implemented
against `register-ambulance.html` because Tax Token + Route Permit are
BRTA vehicle documents. If the main user-signup form (`register.html`) also
needs the location cascade (without docs), open a follow-up.

---

# Section 7 — Driver Information

Driver registration / information form.

- ⬜ **7.1** Location cascade: Division → District → Upazila → Union → Ward →
  Village.
- ⬜ **7.2** NID Document upload.
- ⬜ **7.3** Driving License upload.
- ⬜ **7.4** Other driver fields (❓ ASK: date of birth, blood group, years
  of experience, emergency contact, photo?).
- ⬜ **7.5** Document upload + verification workflow (Admin marks each
  document verified / rejected).

---

# Section 8 — Mobile Number Validation & SMS

- ⬜ **8.1** Client-side validation:
  - BD mobile format: `01[3-9]XXXXXXXX` (11 digits starting with `01`).
  - Show inline error, block submit if invalid.
- ⬜ **8.2** OTP-based validation on submission (❓ ASK: SMS provider —
  BulkSMSBD, SSL Wireless, Twilio, or a stub for now?).
- ⬜ **8.3** SMS confirmation on successful submission for:
  - User registration.
  - Driver registration.
  - Owner registration.
  - Booking / Destination submission.
- ⬜ **8.4** SMS notification to Driver + Owner when a booking arrives.
- ⬜ **8.5** SMS notification when Admin Review status changes.

---

# Section 9 — Admin Review System

- ⬜ **9.1** Review queue tables in admin dashboard for:
  - User registrations.
  - Driver information.
  - Owner information.
  - Bookings / Requests.
- ⬜ **9.2** Ability to open a submission → view all fields + documents.
- ⬜ **9.3** Status workflow:
  - `Pending` → `Under Review` → **`Approved` / `Hold` / `Rejected`**
  - Each status change requires an optional admin note.
- ⬜ **9.4** After Admin Review completes, send SMS + in-app notification to
  the affected user/driver/owner.
- ⬜ **9.5** Audit log per submission (who reviewed, when, what note).

---

# 🔧 Cross-cutting Infrastructure To Discuss

Before implementing, decisions needed on:

- ⬜ **A. SMS provider** — real integration vs stub for demo.
- ⬜ **B. File upload** — where do uploaded documents live? (localStorage
  base64 is fine for demo; production needs real storage.)
- ⬜ **C. Role-based routing** — how does the site decide which dashboard to
  land a user on (user / driver / owner / admin)? Currently the session has
  `role` but no logic reads it on login redirect.
- ⬜ **D. Backend involvement** — Bondhu has a `backend/` folder with an
  Express stub. Do we wire these features into real APIs or keep everything
  client-side / localStorage for now?

---

## 📋 Suggested Execution Order

Following your stated priority:

1. **Filter cascade audit + fixes** (Section 1) — verify commit `cbe7829` works
   end-to-end, fix any UX gaps.
2. **Booking cascade audit** (Section 3) — same for the ambulance booking modal.
3. **Destination page** (Section 4) — new flow.
4. **Registration cascade + document uploads** (Section 6) — user + owner.
5. **Driver Information page** (Section 7).
6. **Ambulance card → Total Details Page** (Section 2).
7. **Driver Dashboard** (Section 5.2) + **Owner Dashboard** (Section 5.3).
8. **User Dashboard status/notifications** (Section 5.1).
9. **Admin Dashboard review queues + workflow** (Sections 5.4 + 9).
10. **Mobile validation + SMS** (Section 8) — depends on provider choice.

---

*Living document. Confirm each section before I begin.*
