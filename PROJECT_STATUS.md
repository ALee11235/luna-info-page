# Project Status — Luna Info Page

**Date**: May 17, 2025
**Version**: 1.0.0
**Live URL**: https://p01--info-page--wr64nvjslpdn.code.run
**Repo**: https://github.com/ALee11235/luna-info-page

## What's Built

### Working Features

| Feature | Status | Notes |
|---------|--------|-------|
| Dark luxurious design | ✅ | Gold accents, serif headings, warm tones |
| Mobile responsive | ✅ | Mobile-first, touch-friendly |
| Tab navigation | ✅ | 3 tabs with smooth transitions |
| Get to Know You form | ✅ | Questionnaire with select, textarea, toggle buttons |
| PPV Videos grid | ✅ | 8 videos with prices, descriptions, hover effects |
| Custom Request calculator | ✅ | Video type, duration slider, accessory toggles, live price |
| Form submissions | ✅ | Stored in SQLite via API routes |
| Auto-deploy | ✅ | GitHub → Northflank on push |

### Architecture Decisions

- **Next.js App Router**: Modern React framework with server components
- **Tailwind CSS 4**: Utility-first styling with CSS variables for design tokens
- **SQLite**: Simple file-based DB, no external DB needed
- **Single page**: All 3 tabs in one page component with client-side state
- **Docker deployment**: Multi-stage build for small image size

### Known Limitations

- SQLite DB resets on container restart (stored in ephemeral storage)
- No admin panel to view submissions
- No email notifications on form submission
- PPV video data is hardcoded (not editable without code changes)

### Future Enhancements

- [ ] Add persistent volume for SQLite on Northflank
- [ ] Admin dashboard to view questionnaire submissions and custom requests
- [ ] Email notifications (SendGrid/Resend)
- [ ] PPV video management UI
- [ ] Payment integration for PPV unlocks
- [ ] User authentication
