# .rules - Architecture & Design Documentation

This directory contains the foundational architecture and design specifications for the NAM Conference Survey application.

---

## 📚 Documentation Index

### 1. **[architecture.md](./architecture.md)** - System Architecture
Complete system design including:
- Technology stack (React, NestJS, Prisma, PostgreSQL)
- Application structure (monorepo layout)
- Authentication & authorization (Anonymous Survey + Password-based Admin)
- Data flow diagrams
- Security considerations
- Performance targets

**Read this first** to understand the overall system.

---

### 2. **[design.md](./design.md)** - UI/UX Design System
Equal Experts branding and Mantine UI implementation:
- Brand identity (colors, typography, logo)
- Mantine theme configuration
- Component library (buttons, cards, forms)
- Question component patterns (Likert, multi-select, ranking)
- Responsive design (mobile-first)
- Accessibility (WCAG 2.1 AA)

**For frontend developers** building the React UI.

---

### 3. **[database-schema.md](./database-schema.md)** - Database Design
Complete Prisma schema with all 19 questions:
- Database models (User, SurveyResponse)
- Question field mapping
- Data types & rationale
- Indexes for performance
- Migrations
- CSV export mapping

**For backend developers** working with Prisma/PostgreSQL.

---

### 4. **[api-spec.md](./api-spec.md)** - REST API Specification
All endpoints with request/response examples:
- Authentication endpoints (Admin password-based login)
- Survey submission (anonymous, no auth required)
- Admin dashboard (responses, CSV export, stats)
- User management
- Error handling
- Rate limiting

**For API integration** (frontend ↔ backend communication).

---

### 5. **[docker-setup.md](./docker-setup.md)** - Docker Configuration
Complete containerization guide:
- Docker Compose setup (3 services)
- Dockerfiles (multi-stage builds)
- Environment variables
- Networking & volumes
- Commands & troubleshooting

**For local development** and deployment.

---

## 🚀 Quick Start

### Recommended Reading Order

1. **architecture.md** - Understand the big picture
2. **docker-setup.md** - Set up local environment
3. **database-schema.md** - Understand data model
4. **api-spec.md** - Learn API endpoints
5. **design.md** - Build the UI

---

## 🎯 Key Decisions Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Frontend** | React + Mantine UI | Survey-focused components, accessibility built-in |
| **Backend** | NestJS + Prisma | Type-safe, scalable, PostgreSQL ORM |
| **Database** | PostgreSQL | Structured data, relational queries |
| **Auth** | Anonymous Survey + Admin Password | Simple setup, no OAuth dependencies |
| **Design System** | Mantine + Equal Experts branding | Professional, mobile-first, accessible |
| **Deployment** | Docker Compose | Simple local setup, production-ready |

---

## 📋 MVP Features (Must-Have)

✅ 19-question survey (all types: Likert, multi-select, ranking, open-ended)
✅ Zero mandatory fields
✅ Anonymous survey access (no login required)
✅ Simple password-based admin authentication
✅ Mobile-first responsive design (375px - 1920px)
✅ Question-level transparency notes
✅ Immediate acknowledgment page
✅ Admin dashboard (view responses)
✅ CSV export with 34 columns
✅ Accessibility (WCAG 2.1 AA)
✅ Equal Experts branding
✅ Docker containerization

---

## 🔧 Technology Stack

```
Frontend:  React 18 + TypeScript + Mantine UI + Vite
Backend:   NestJS + TypeScript + Prisma ORM
Database:  PostgreSQL 15
Auth:      Passport.js + JWT (admin only)
DevOps:    Docker + Docker Compose + pnpm
```

---

## 📊 Database Schema Overview

```
Users (Admin, Participant)
  └─ SurveyResponses (19 questions + 12 comments + metadata)
```

**Total Response Fields**: 31 columns (all nullable for zero mandatory fields)

---

## 🌐 API Endpoints Summary

| Endpoint | Method | Auth | Role | Purpose |
|----------|--------|------|------|---------|
| `/auth/google` | GET | No | - | OAuth login |
| `/auth/me` | GET | Yes | Any | Current user |
| `/survey/submit` | POST | Yes | Participant | Submit survey |
| `/admin/responses` | GET | Yes | Admin | View all responses |
| `/admin/export` | GET | Yes | Admin | Export CSV |
| `/admin/stats` | GET | Yes | Admin | Statistics |

---

## 🐳 Docker Services

```
┌─────────────┐     ┌─────────────┐     ┌──────────────┐
│  Frontend   │────▶│   Backend   │────▶│  PostgreSQL  │
│ React+Vite  │     │   NestJS    │     │      15      │
│  Port 3000  │     │  Port 3001  │     │  Port 5432   │
└─────────────┘     └─────────────┘     └──────────────┘
```

**Start**: `docker-compose up`
**Stop**: `docker-compose down`

---

## 🎨 Equal Experts Branding

**Primary Colors**:
- Equal Blue: `#1795d4` (buttons, links, accents)
- Equal Navy: `#22567c` (headings, secondary elements)
- Equal Charcoal: `#2c3234` (body text)

**Typography**:
- Font: Lexend (300, 400, 500 weights)
- H1: 44px / H3: 28px / Body: 18px

**Logo**: `https://www.equalexperts.com/wp-content/uploads/2024/10/2024-Logo.svg`

---

## 🔐 Security

- **Authentication**: Google OAuth 2.0 (no password storage)
- **Authorization**: JWT tokens (7-day expiry)
- **RBAC**: Admin vs Participant roles
- **API**: CORS restricted to frontend origin
- **Database**: Prisma ORM (parameterized queries, no SQL injection)
- **Rate Limiting**: 100 requests/minute per IP

---

## 📦 Project Structure

```
NAM-Conf-Survey/
├── .rules/               # This directory - architecture docs
├── apps/
│   ├── frontend/         # React + Vite
│   └── backend/          # NestJS + Prisma
├── packages/
│   └── shared/           # Shared types
├── docker/
│   ├── frontend.Dockerfile
│   └── backend.Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## ❓ Questions & Support

For questions about:
- **Architecture**: See `architecture.md`
- **UI/UX**: See `design.md`
- **Database**: See `database-schema.md`
- **API**: See `api-spec.md`
- **Docker**: See `docker-setup.md`

---

## 🚧 Future Enhancements (Post-MVP)

**Phase 2**:
- Save draft functionality
- Progress indicator
- Advanced analytics dashboard
- Email notifications

**Phase 3**:
- Multi-survey support (admin creates surveys)
- Conversational AI interface
- Real-time results dashboard
- Branching logic

---

**Last Updated**: 2025-11-18
**Version**: 1.0
**Status**: ✅ Architecture Complete - Ready for Implementation
