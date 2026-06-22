# Luna Info Page

A dark, luxurious info page for Luna's subscribers. Built with Next.js, TypeScript, and Tailwind CSS.

## Live URL

https://p01--info-page--wr64jslpdn.code.run

## Features

- **BF Application** — 5-question form for subscribers to share preferences
- **PPV Videos** — Grid of pay-per-view videos with prices and descriptions
- **Custom Request** — Interactive price calculator with duration slider, extras, and rush option

## Tech Stack

- **Framework**: Next.js 16 (App Router, standalone output)
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
| POST | `/api/questionnaire` | Submit questionnaire (name, email, preferences, fantasies, frequency) |
| POST | `/api/custom-request` | Submit custom request (name, email, minutes, type, accessories, price, rush) |

## Database Schema

### questionnaire_submissions
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | Auto-increment |
| name | TEXT | Subscriber name |
| email | TEXT | Subscriber email |
| favorite_content | TEXT | Preferred content type |
| fantasies | TEXT | Free-text fantasies |
| frequency | TEXT | Content frequency preference |
| created_at | DATETIME | Timestamp |

### custom_requests
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | Auto-increment |
| name | TEXT | Subscriber name |
| email | TEXT | Subscriber email |
| minutes | INTEGER | Video duration |
| video_type | TEXT | Currently: solo |
| accessories | TEXT | JSON array of selected accessories |
| special_requests | TEXT | Free-text requests |
| estimated_price | INTEGER | Calculated price in USD |
| rush | INTEGER | 0 = normal, 1 = rush (+50% fee) |
| created_at | DATETIME | Timestamp |

## Custom Request Pricing

- **Base**: $100 for 10 minutes (solo only)
- **Duration**: $100 × (minutes / 10)
- **Rush job**: +50% on total (toggleable)
- **Extras**: Dildo +$20, Lingerie Set +$20, Heels +$10, Custom Outfit +$25

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
