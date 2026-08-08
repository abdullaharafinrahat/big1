# Bondhu.org System Architecture Specification

## 1. System Overview
Bondhu is an emergency healthcare and blood donation network engineered for high availability, sub-second geospatial matching, and verified donor dispatch across Bangladesh's 64 districts.

---

## 2. Infrastructure Topology
```
                  [ Cloudflare WAF / CDN & DDoS Protection ]
                                      │
                                [ Nginx SSL ]
                                      │
                 ┌────────────────────┴────────────────────┐
                 ▼                                         ▼
   [ Next.js / Static Frontend ]            [ Express Node.js Cluster ]
                                                           │
                                   ┌───────────────────────┴───────────────────────┐
                                   ▼                                               ▼
                         [ PostgreSQL 16 + PostGIS ]                         [ Redis 7 Cluster ]
                                                                                   │
                                                                       [ BullMQ Async Workers ]
                                                                         ├── Geo-Matching Worker
                                                                         ├── SMS Alert Dispatch
                                                                         └── SLA Escalation Timer
```

---

## 3. High-Priority Emergency Flow (Blood Request ➔ Donor Dispatch)
1. **User Submission**: Patient/Attendant submits blood group, hospital location, and urgency via `POST /api/blood-requests`.
2. **Geospatial Query**: PostGIS spatial index calculates distance (`ST_DWithin`) against active, verified donors within a 25km radius.
3. **Compatibility Filter**: International Red Cross matrix filters compatible donor groups (`O-` universal, `AB+` universal recipient).
4. **Scoring & Ranking**: Algorithm evaluates proximity penalty, last donation interval (minimum 90 days), response rate, and gold badge verification.
5. **Real-Time Notification**: BullMQ worker dispatches SMS and Push notifications to the top 10 ranked donors.
6. **SLA Timeout**: If no donor accepts within 15 minutes, automated escalation widens search radius to 50km and notifies registered Foundation coordinators.
