# Portfolio Architecture & Site Map

## Site Structure

The portfolio is a **single-page application (SPA)** with section-based navigation. All content is on one page with smooth scrolling between sections.

### Page Flow

```
Homepage (/)
  ├─ Hero Section (#hero)
  ├─ About Section (#about)
  ├─ Experience Section (#experience)
  ├─ Skills Section (#skills)
  ├─ Projects Section (#projects)
  ├─ Writing/Articles Section (#writing)
  ├─ Open to Roles Section (#open-to-roles)
  └─ Contact Section (#contact)
```

## Component Breakdown

### Layout Components

#### 1. **Navbar** (`src/components/Navbar.tsx`)
- Fixed position navigation bar
- Smooth scroll to sections
- Active section highlighting
- Mobile hamburger menu
- Glassmorphism effect on scroll

**Features**:
- Desktop: Horizontal navigation links
- Mobile: Slide-in menu
- Auto-hide/show based on scroll direction (optional enhancement)
- Sticky positioning with backdrop blur

#### 2. **Footer** (`src/components/Footer.tsx`)
- Site information
- Quick links to sections
- Social media links
- Contact information
- Copyright and tech stack credits

#### 3. **Section Wrapper** (`src/components/Section.tsx`)
- Reusable wrapper for all sections
- Intersection Observer for scroll animations
- Consistent spacing and backgrounds
- Viewport-triggered animations

#### 4. **Card** (`src/components/Card.tsx`)
- Glassmorphism card component
- Hover effects
- Reused across Experience, Skills, Projects, etc.

---

### Content Sections

#### 1. **Hero** (`src/components/sections/Hero.tsx`)

**Purpose**: First impression, value proposition, call to action

**Key Elements**:
- Animated rotating words (Audit, Data, Analytics, AI, Risk, Compliance)
- Large headline
- Subheadline explaining value
- Visa status badge
- Primary CTAs (View Resume, Contact Me)
- Social links
- Scroll indicator

**Animations**:
- Fade-in with stagger
- Word rotation with 3D flip effect
- Floating background elements
- Scroll bounce animation

---

#### 2. **About** (`src/components/sections/About.tsx`)

**Purpose**: Personal story and career narrative

**Layout**: Two-column (main content + sidebar)

**Main Content**:
- 4 paragraphs telling career story
- Emphasis on hybrid expertise (Audit + Data + AI)

**Sidebar**:
- Quick facts (bullet points)
- Education
- Personal interests

**Animations**:
- Paragraph stagger
- Sidebar slide-in from right

---

#### 3. **Experience** (`src/components/sections/Experience.tsx`)

**Purpose**: Professional work history

**Layout**: Alternating timeline

**Content**:
- BDIPlus (Software Engineer II / Audit Automation Engineer)
- Nomura (Finance Audit & Data Analytics Associate)
- BlackRock (Technology Audit Analyst)

**Each Entry Includes**:
- Job title and company
- Location and dates
- Description
- 3-5 achievement bullets (quantified results)
- Technology tags

**Animations**:
- Timeline dots pulse
- Cards slide in from alternating sides
- Staggered achievement bullets

---

#### 4. **Skills** (`src/components/sections/Skills.tsx`)

**Purpose**: Showcase technical and domain expertise

**Layout**: Grid of category cards

**Categories**:
1. Audit, Risk & Compliance
2. Data & Analytics
3. Engineering & Systems
4. Cloud & Infrastructure
5. Security & Architecture

**Each Card Contains**:
- Category icon
- Category name
- Skill tags (interactive, hoverable)

**Animations**:
- Card grid stagger
- Skill tags scale on hover
- Icon pulse effect

---

#### 5. **Projects** (`src/components/sections/Projects.tsx`)

**Purpose**: Showcase technical work and side projects

**Layout**:
- **Featured Project (Vantage)**: Large card at top with special styling
- **Other Projects**: 2-column grid below

**Featured Project (Vantage)**:
- Gradient border and badge
- Two-column layout (description + features)
- Tech stack visualization
- Architecture breakdown
- GitHub link

**Other Projects**:
- Smaller cards
- Brief description
- Highlights
- Tech tags

**Animations**:
- Featured project scale-in
- Staggered grid for other projects
- Hover lift effects

---

#### 6. **Articles/Writing** (`src/components/sections/Articles.tsx`)

**Purpose**: Showcase thought leadership and technical writing

**Layout**: 3-column grid of article cards

**Each Card**:
- Medium icon
- Article title
- Description
- Read time
- Published date
- "Read on Medium" CTA

**Animations**:
- Staggered card reveal
- Hover scale effect
- Arrow slide on hover

---

#### 7. **Open to Roles** (`src/components/sections/OpenToRoles.tsx`)

**Purpose**: **Explicitly state job search intent** (critical for recruitment)

**Layout**: Single prominent card with gradient background

**Content**:
- "Actively Seeking Opportunities" badge (green, pulsing)
- List of target roles
- Value propositions (what you bring)
- Visa status callout
- Multiple CTAs (Contact, LinkedIn, Resume)

**Styling**:
- Gradient overlay
- Glassmorphism
- High-contrast text
- Prominent CTAs

**Animations**:
- Card scale-in
- Badge pulse
- Role list stagger

---

#### 8. **Contact** (`src/components/sections/Contact.tsx`)

**Purpose**: Enable direct communication

**Layout**: Two-column (form + contact info sidebar)

**Contact Form**:
- Name field
- Email field
- Message textarea
- Submit button (opens mailto link for now)

**Sidebar**:
- Direct contact info (email, phone, location)
- Social media links
- Response time note

**Animations**:
- Form slide-in from left
- Sidebar slide-in from right
- Input focus effects

---

### Utility Components

#### **EditModeToggle** (`src/components/EditModeToggle.tsx`)

**Purpose**: Allow in-browser content editing

**Features**:
- Floating settings button (bottom-right)
- Password-protected access (default: `edit123`)
- Edit mode indicator when active
- LocalStorage persistence

**Future**: Can be extended to connect to a CMS or backend API

---

## Data Flow

### Content Management

```
contentConfig.ts (source of truth)
  ↓
Components import config
  ↓
Render content dynamically
  ↓
Edit Mode can override via localStorage (optional)
```

**Content Config Structure**:
```typescript
{
  personal: { name, email, phone, location, visaStatus },
  social: { linkedin, github, medium },
  hero: { headline, subheadline, rotatingWords, ctas },
  about: { title, paragraphs, highlights },
  experience: [ { title, company, achievements, ... } ],
  skills: { categories: [ { name, skills } ] },
  projects: [ { title, description, technologies, ... } ],
  articles: [ { title, url, description, ... } ],
  openToRoles: { roles, valueProps, ... },
  contact: { formFields, ... }
}
```

---

## Styling System

### Design Tokens

**Colors**:
- Background: `#0a0a0f` (deep near-black)
- Surface: `#121218` (elevated surface)
- Accent Cyan: `#00d9ff` (primary CTA)
- Accent Purple: `#a855f7` (secondary)
- Accent Teal: `#14b8a6` (tertiary)

**Typography**:
- Font: Inter (sans-serif)
- Headings: Bold, large (responsive scale)
- Body: Regular, readable line-height

**Spacing**:
- Consistent scale (0.25rem increments)
- Section padding: 4rem (mobile), 6rem (desktop)

**Effects**:
- Glassmorphism: `backdrop-filter: blur(12px)` + semi-transparent bg
- Shadows: Multi-level system (sm, md, lg, xl, glow)
- Animations: Framer Motion for all motion

---

## Animation Philosophy

1. **Purposeful**: Every animation serves a UX purpose (feedback, guidance, delight)
2. **Subtle**: Prefer elegant over flashy
3. **Performance**: Use `transform` and `opacity` (GPU-accelerated)
4. **Accessibility**: Respect `prefers-reduced-motion`

### Common Patterns

- **Enter**: Fade + slide up (`opacity: 0 → 1`, `y: 20 → 0`)
- **Hover**: Scale up slightly (`scale: 1 → 1.02`)
- **Stagger**: Delay each item in a list (50-100ms)
- **Viewport**: Trigger animations when section enters viewport

---

## Responsive Design

### Breakpoints

- `sm`: 640px
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

### Mobile-First Approach

- Base styles are for mobile
- Use `md:`, `lg:`, `xl:` prefixes for larger screens
- Hamburger menu on mobile, full nav on desktop
- Grid columns: 1 (mobile) → 2 (tablet) → 3 (desktop)

---

## Performance Considerations

1. **Code Splitting**: Next.js automatically splits routes
2. **Lazy Loading**: Components load as needed
3. **Image Optimization**: Use Next.js `<Image>` component
4. **Font Loading**: Preload fonts to prevent FOUT
5. **Animation Performance**: Use `will-change` sparingly

---

## SEO & Metadata

Set in `src/app/layout.tsx`:
- Page title
- Meta description
- Open Graph tags (for social sharing)
- Twitter Card tags
- Viewport settings

---

## Accessibility

- Semantic HTML (`<nav>`, `<section>`, `<article>`, etc.)
- ARIA labels for icon-only buttons
- Keyboard navigation support
- Focus indicators on all interactive elements
- Color contrast compliance (WCAG AA)
- Reduced motion support

---

## File Structure Summary

```
src/
├── app/
│   ├── globals.css           # Global styles, Tailwind imports
│   ├── layout.tsx            # Root layout, metadata, font loading
│   └── page.tsx              # Main page (all sections assembled)
│
├── components/
│   ├── sections/             # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Articles.tsx
│   │   ├── OpenToRoles.tsx
│   │   └── Contact.tsx
│   │
│   ├── Navbar.tsx            # Top navigation
│   ├── Footer.tsx            # Bottom footer
│   ├── Section.tsx           # Section wrapper with animations
│   ├── Card.tsx              # Reusable card component
│   └── EditModeToggle.tsx    # Content editing toggle
│
└── config/
    └── contentConfig.ts      # All site content (single source of truth)
```

---

## Future Enhancements Roadmap

### Phase 1: Polish
- [ ] Add resume PDF download
- [ ] Implement contact form backend (FormSpree or custom API)
- [ ] Add Google Analytics / Vercel Analytics
- [ ] Optimize images (convert to WebP)
- [ ] Add favicon and app icons

### Phase 2: Advanced Features
- [ ] Connect to headless CMS (Sanity, Contentful)
- [ ] Add blog section with Markdown support
- [ ] Implement search functionality
- [ ] Add dark/light mode toggle
- [ ] Integrate 3D elements (React Three Fiber)

### Phase 3: Interactivity
- [ ] Add subtle cursor effects
- [ ] Implement particle system background
- [ ] Add interactive data visualizations (for projects)
- [ ] Create project detail pages (dynamic routes)

### Phase 4: Backend Integration
- [ ] User authentication for Edit Mode
- [ ] Database for content storage
- [ ] Admin dashboard for content management
- [ ] Analytics dashboard (page views, contact form submissions)

---

## Deployment Checklist

Before deploying to production:

- [ ] Update all placeholder content in `contentConfig.ts`
- [ ] Add actual resume PDF to `/public/resume.pdf`
- [ ] Test all links (social media, external projects, etc.)
- [ ] Test contact form functionality
- [ ] Run `npm run build` to check for errors
- [ ] Test on multiple devices (mobile, tablet, desktop)
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Add custom domain in Vercel/Netlify
- [ ] Set up SSL certificate (auto with Vercel)
- [ ] Configure redirects if needed
- [ ] Add Google Analytics tracking ID
- [ ] Submit sitemap to Google Search Console

---

This architecture is designed to be:
- **Scalable**: Easy to add new sections or content
- **Maintainable**: Clear separation of concerns
- **Performant**: Optimized for speed and UX
- **Accessible**: Inclusive design for all users
- **Recruiter-Friendly**: Clear value proposition and easy navigation
