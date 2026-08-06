# Bondhu General Hospital — Admin & Public Portal

Combined implementation of the two HTML source documents from
`bondhu/8caf76fa-bd8b-4079-b8fa-5ab08ae78ebb.pdf` ("put this both code make
nessasary changes"), cleaned up and merged into one cross-linked mini-portal:

| File | Source in PDF | Purpose |
|------|----------------|---------|
| `index.html` | Code 1, Section 2 (Public Website Interface) | Public news portal front page |
| `admin.html` | Code 1, Section 1 (Admin Dashboard Interface) | Admin news management dashboard |
| `ambulance.html` | Code 2 (Ambulance Management Dashboard) | Ambulance fleet & booking management |

## Necessary changes applied during the merge

1. **Repaired mangled URLs** — the PDF wrapped every link in markdown
   (`[url](url)`), breaking all `src`/`href` attributes (Tailwind CDN,
   Font Awesome, Google Fonts, Unsplash images, ui-avatars). All restored.
2. **Fixed corrupted Bangla text** — null characters and broken conjuncts
   restored, e.g. `সবাই আমােদর অীকার` → `সবাই আমাদের অঙ্গীকার`,
   `বু জনােরল হাসপাতােলর নতুন বাড সন্টার` → `বন্ধু জেনারেল হাসপাতালের নতুন বার্ন সেন্টার`.
3. **Unified the calendars** — the ambulance dashboard used different,
   incorrect dates (১৪ জ্যৈষ্ঠ ১৪৩০ / ১০ মুহাররম ১৪৪৮). Both apps now show the
   same correct dates for 08 July 2026: **২৪ আষাঢ় ১৪৩৩ / ২৩ মহররম ১৪৪৮**.
4. **Unified emergency numbers** — 10647 vs 10847 across the two sources;
   standardized on **10647** everywhere.
5. **Removed `<base target="_blank">`** from the ambulance dashboard, which
   would have hijacked every in-app navigation.
6. **Cross-linked the two apps into one portal**:
   - `index.html` nav has an **Ambulance** item → `ambulance.html`; **Login** → `admin.html`
   - `admin.html` sidebar has a **Fleet → Ambulance** entry → `ambulance.html`,
     **View Site** in the top bar → `index.html`
   - `ambulance.html` brand block → `index.html`; **CMS Management** → `admin.html`
7. **Branding unified** — same logo, tagline and contact numbers in all three pages.

## Serving locally

```bash
python3 -m http.server 8080 --directory bondhu/frontend/hospital
# open http://localhost:8080
```
