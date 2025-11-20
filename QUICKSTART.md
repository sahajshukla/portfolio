# Quick Start Guide

Get your portfolio up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed ([download here](https://nodejs.org/))
- A code editor (VS Code recommended)

## Installation (3 steps)

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages (Next.js, React, Tailwind CSS, Framer Motion, etc.)

### 2. Start Development Server

```bash
npm run dev
```

### 3. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

**Done!** Your portfolio is now running locally.

---

## Customize Your Content

### Update Personal Information

Edit `src/config/contentConfig.ts`:

```typescript
personal: {
  name: "Your Name",              // Change to your name
  email: "your.email@example.com", // Your email
  phone: "1-XXX-XXX-XXXX",         // Your phone number
  location: "Your City, State",    // Your location
  visaStatus: "...",               // Update or remove
}
```

### Update Social Links

```typescript
social: {
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourusername",
  medium: "https://medium.com/@yourusername",
}
```

### Update Experience

Edit the `experience` array in `contentConfig.ts`:

```typescript
experience: [
  {
    id: "job1",
    title: "Your Job Title",
    company: "Company Name",
    location: "City, State",
    period: "2020 - Present",
    description: "Brief description...",
    achievements: [
      "Achievement 1 with numbers",
      "Achievement 2 with impact",
      // ...
    ],
    technologies: ["Tech1", "Tech2", "Tech3"],
  },
  // Add more jobs...
]
```

### Update Projects

Highlight your key projects in `projects` array:

```typescript
projects: [
  {
    id: "project1",
    title: "Project Name",
    tagline: "Short description",
    description: "Longer description...",
    fullDescription: ["Paragraph 1", "Paragraph 2"],
    technologies: ["React", "Python", "AWS"],
    highlights: ["Feature 1", "Feature 2"],
    githubUrl: "https://github.com/...",
    featured: true, // Set one project as featured
  },
  // Add more projects...
]
```

---

## Deploy to Vercel (1 command)

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts. Your site will be live in ~2 minutes!

### Option 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repo
4. Click "Deploy"

**Done!** You'll get a live URL like `yourproject.vercel.app`

---

## Common Tasks

### Add Your Resume PDF

1. Place your resume PDF in `/public/resume.pdf`
2. Update the resume link in `contentConfig.ts`:

```typescript
ctas: [
  { text: "View Resume", href: "/resume.pdf", variant: "primary" },
  // ...
]
```

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  accent: {
    cyan: '#YOUR_COLOR',    // Primary accent
    purple: '#YOUR_COLOR',  // Secondary accent
  }
}
```

### Add a New Section

1. Create `src/components/sections/YourSection.tsx`
2. Import it in `src/app/page.tsx`:
   ```typescript
   import YourSection from '@/components/sections/YourSection';
   ```
3. Add it to the page:
   ```typescript
   <YourSection />
   ```
4. Update navbar in `src/components/Navbar.tsx`

### Use Edit Mode

1. Open your site in browser
2. Click the settings icon (bottom-right)
3. Enter password: `edit123`
4. Make edits (saved to localStorage)

**Note**: Changes in Edit Mode are temporary. For permanent changes, edit `contentConfig.ts`.

---

## Build for Production

```bash
npm run build
```

This creates an optimized production build in `.next/`

Test it locally:

```bash
npm run start
```

---

## Troubleshooting

### Port 3000 already in use?

```bash
npm run dev -- -p 3001
```

(Use port 3001 instead)

### Can't install dependencies?

Try:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Styling not working?

1. Make sure you saved all files
2. Restart the dev server (`Ctrl+C` then `npm run dev`)
3. Hard refresh browser (`Cmd+Shift+R` or `Ctrl+Shift+R`)

---

## Next Steps

1. ✅ Update all content in `contentConfig.ts`
2. ✅ Add your resume PDF to `/public/`
3. ✅ Test on mobile and desktop
4. ✅ Deploy to Vercel
5. ✅ Add custom domain (optional)
6. ✅ Share with recruiters and network!

---

## Need Help?

- **README.md**: Full documentation
- **ARCHITECTURE.md**: Technical details and site structure
- **BRANDING_GUIDE.md**: Design system reference

For questions:
- Email: sahajshukla@gmail.com
- Open an issue on GitHub

---

**Enjoy your new portfolio!** 🚀
