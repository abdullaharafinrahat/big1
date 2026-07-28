# Bondhu

Starter full-stack emergency support platform for Bangladesh: blood requests, donor registry, hospitals, ambulances, missing bureau, moderation, notifications, payments, Docker infra and docs.

## Run backend

```bash
cd bondhu/backend
cp .env.example .env
npm install
npm run dev
```

## Run with Docker

```bash
cd bondhu/infra
docker compose up --build
```

Frontend: http://localhost:8080  
Backend health: http://localhost:4000/health

Development admin: `admin@bondhu.local` / `admin123`.
