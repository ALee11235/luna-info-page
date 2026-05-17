# Luna Info Page

A dark, luxurious info page for an OnlyFans model's subscribers. Built with Next.js, TypeScript, and Tailwind CSS.

## Live URL

https://p01--info-page--wr64nvjslpdn.code.run

## Features

- **Get to Know You** — Questionnaire form for subscribers to tell the model their preferences
- **PPV Videos** — Grid of pay-per-view videos with prices and descriptions
- **Custom Request** — Interactive calculator with video type, duration, and accessory toggles (~$200 average)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: SQLite (better-sqlite3)
- **Deployment**: Northflank (Docker)

## Project Structure

```
info-page/
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
- **Backgrounds**: Near-black with warm undertones (#0a0a0c → #22222e)
- **Accent**: Rich gold (#d4a853) used sparingly for CTAs and highlights
- **Typography**: Serif headings (Georgia), clean sans-serif body (Inter)
- **Effects**: Subtle gold glows, smooth spring animations, generous whitespace
- **Mobile-first**: Responsive grid layouts, touch-friendly controls

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/questionnaire` | Submit questionnaire (name, email, preferences, fantasies, frequency, notes) |
| POST | `/api/custom-request` | Submit custom request (name, email, minutes, type, accessories, price) |

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
| additional_notes | TEXT | Free-text notes |
| created_at | DATETIME | Timestamp |

### custom_requests
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | Auto-increment |
| name | TEXT | Subscriber name |
| email | TEXT | Subscriber email |
| minutes | INTEGER | Video duration |
| video_type | TEXT | solo/pov/couple/lesbian |
| accessories | TEXT | JSON array of selected accessories |
| special_requests | TEXT | Free-text requests |
| estimated_price | INTEGER | Calculated price in USD |
| created_at | DATETIME | Timestamp |

## Custom Request Pricing

- **Solo**: $80 base (× minutes/15)
- **POV**: $100 base (× minutes/15)
- **Couple**: $150 base (× minutes/15)
- **Lesbian**: $140 base (× minutes/15)
- **Accessories**: +$10-25 each
- **Target average**: ~$200 per video

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
