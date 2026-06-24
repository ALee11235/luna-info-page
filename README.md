# Luna Info Page

A dark, luxurious info page for Luna's subscribers. Built with Next.js, TypeScript, and Tailwind CSS.

## Live URL

https://p01--luna-info-page--wr64nvjslpdn.code.run

## Features

- **BF Application** — 5-question form for subscribers to share preferences (interests, favorite body part, turn-ons, about you)
- **PPV Videos** — Pay-per-view videos with prices and descriptions (Strip Tease, Dildo Tease, Yoga Vid)
- **Custom Request** — Interactive price calculator with duration slider (30/45/60 min), extras, and rush option. Links to Throne for payment via "Gift X here"
- **Admin Panel** — `/admin` route to view submissions and custom requests

## Tech Stack

- **Framework**: Next.js (App Router, standalone output)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: SQLite (better-sqlite3)
- **Deployment**: Northflank (Docker, auto-deploy on push to `main`)

## Project Structure

```
luna-info-page/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── questionnaire/route.ts   # POST questionnaire submissions
│   │   │   └── custom-request/route.ts  # POST custom requests
│   │   ├── admin/page.tsx                # Admin dashboard
│   │   │   └── auth/route.ts            # Admin auth
│   │   │   └── questionnaire/route.ts   # GET questionnaire data
│   │   │   └── custom-requests/route.ts # GET custom requests data
│   │   ├── globals.css                  # Design system (CSS variables, animations)
│   │   ├── layout.tsx                   # Root layout
│   │   └── page.tsx                     # Main page with 3 tabs + all components
│   └── lib/
│       └── db.ts                        # SQLite database setup
├── data/                                # SQLite database files
├── docs/
│   └── DESIGN_SYSTEM.md                 # Design tokens and principles
├── Dockerfile                           # Multi-stage Docker build
├── service.json                         # Northflank service config
└── package.json
```

## Design System

Dark & luxurious aesthetic:
- **Backgrounds**: Warm browns (#1a1412 → #2e2623)
- **Accent**: Soft gold (#d4a853) for CTAs and highlights
- **Typography**: Cormorant Garamond headings, DM Sans body
- **Effects**: Subtle gold glows, spring animations, noise texture overlay
- **Mobile-first**: Sticky price bar on mobile, responsive grids

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/questionnaire` | Submit BF application (name, username, interests, body part, turn-ons, about you) |
| POST | `/api/custom-request` | Submit custom request (name, username, minutes, accessories, price, rush) |
| GET | `/api/admin/auth` | Check admin authentication |
| GET | `/api/admin/questionnaire` | Get all questionnaire submissions |
| GET | `/api/admin/custom-requests` | Get all custom requests |

## Database Schema

### questionnaire_submissions
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | Auto-increment |
| name | TEXT | Subscriber name |
| username | TEXT | Subscriber username |
| q1_interests | TEXT | What they like to explore |
| q2_body_part | TEXT | Favorite body part |
| q3_turn_ons | TEXT | What turns them on |
| q5_about_you | TEXT | Additional info |
| created_at | DATETIME | Timestamp |

### custom_requests
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | Auto-increment |
| name | TEXT | Subscriber name |
| username | TEXT | Subscriber username |
| minutes | INTEGER | Video duration (30, 45, or 60) |
| accessories | TEXT | JSON array of selected accessories |
| special_requests | TEXT | Free-text requests |
| estimated_price | INTEGER | Calculated price in USD (rounded to nearest $50) |
| rush | INTEGER | 0 = normal, 1 = rush (+50% fee) |
| created_at | DATETIME | Timestamp |

## Custom Request Pricing

- **Base**: $100 for 10 minutes (solo only)
- **Duration**: $100 × (minutes / 10) — choices are 30, 45, or 60 min
- **Final price is rounded to nearest $50**
- **Rush job**: +50% on total (toggleable: "Can't wait? 😉 Rush job (3 days)")
- **Extras**: Dildo +$25, Lingerie Set +$20, Stripper Heels +$30, Heels +$10, Custom Outfit +$25, Yoga Pants +$15
- **Payment**: "Gift X here" button links to Throne

## Deployment

Auto-deploys to Northflank on push to `main`.

```bash
git push origin main
```

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Production build
```
