# Sahaj Shukla - Portfolio Website

A modern, aesthetically impressive, and recruiter-friendly personal portfolio website built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Dark theme with glassmorphism effects, smooth animations, and elegant transitions
- **Fully Responsive**: Optimized for mobile, tablet, and desktop viewing
- **Performance Optimized**: Built with Next.js for fast loading and optimal SEO
- **Interactive Animations**: Powered by Framer Motion for smooth, purposeful motion
- **Edit Mode**: Built-in content editing capability with localStorage persistence
- **Accessible**: WCAG compliant with proper semantic HTML and keyboard navigation
- **SEO Ready**: Meta tags, Open Graph, and Twitter Card support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber (optional enhancement)
- **Language**: TypeScript
- **Smooth Scroll**: Lenis (optional)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn installed
- Git installed

### Installation

1. **Clone or navigate to the repository**:
   ```bash
   cd /Users/sahajshukla/Desktop/portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and Tailwind imports
│   │   ├── layout.tsx           # Root layout with metadata
│   │   └── page.tsx             # Main page (all sections)
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx         # Hero section with rotating words
│   │   │   ├── About.tsx        # About section
│   │   │   ├── Experience.tsx   # Experience timeline
│   │   │   ├── Skills.tsx       # Skills grid
│   │   │   ├── Projects.tsx     # Projects showcase
│   │   │   ├── Articles.tsx     # Writing/articles
│   │   │   ├── OpenToRoles.tsx  # Job search section
│   │   │   └── Contact.tsx      # Contact form
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── Footer.tsx           # Footer
│   │   ├── Section.tsx          # Reusable section wrapper
│   │   ├── Card.tsx             # Reusable card component
│   │   └── EditModeToggle.tsx   # Edit mode functionality
│   └── config/
│       └── contentConfig.ts     # All editable content
├── public/                      # Static assets
├── BRANDING_GUIDE.md           # Design system documentation
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Customizing Content

### Method 1: Edit the Content Config File (Recommended)

All content is centralized in `src/config/contentConfig.ts`. Simply edit this file to update:

- Personal information (name, email, phone, etc.)
- Social links (LinkedIn, GitHub, Medium)
- Hero section text and CTAs
- About section paragraphs
- Experience entries
- Skills categories
- Projects and their details
- Articles/writing
- Open to roles section
- Contact information

**Example**:
```typescript
// src/config/contentConfig.ts
export const contentConfig: ContentConfig = {
  personal: {
    name: "Your Name",
    email: "your.email@example.com",
    // ... more fields
  },
  // ... rest of the config
};
```

### Method 2: Use Edit Mode (Browser-based)

1. Click the settings icon in the bottom-right corner of the website
2. Enter the password (default: `edit123`)
3. Edit Mode will activate
4. Changes are saved to localStorage (currently for demonstration)

**Note**: Edit Mode currently saves to localStorage only. To persist changes permanently:
- Edit the content config file directly, OR
- Implement a backend API to save changes (see Future Enhancements below)

### Changing the Edit Mode Password

Edit `src/components/EditModeToggle.tsx`:
```typescript
const EDIT_PASSWORD = 'your_secure_password'; // Change this
```

## Building for Production

1. **Build the project**:
   ```bash
   npm run build
   ```
   or
   ```bash
   yarn build
   ```

2. **Test the production build locally**:
   ```bash
   npm run start
   ```
   or
   ```bash
   yarn start
   ```

## Deployment

### Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications:

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

   Or use the Vercel Dashboard:
   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository
   - Vercel will auto-detect Next.js and deploy

3. **Custom Domain** (optional):
   - In Vercel Dashboard, go to Settings > Domains
   - Add your custom domain (e.g., sahajshukla.com)

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` folder to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Deploy to Other Platforms

The site can be deployed to any platform that supports Node.js:
- AWS Amplify
- Cloudflare Pages
- GitHub Pages (with static export)
- DigitalOcean App Platform

## Customization Guide

### Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  background: {
    DEFAULT: '#0a0a0f',  // Main background
    surface: '#121218',   // Surface color
  },
  accent: {
    cyan: '#00d9ff',      // Primary accent
    purple: '#a855f7',    // Secondary accent
    teal: '#14b8a6',      // Tertiary accent
  },
  // ...
}
```

### Typography

Change fonts in `tailwind.config.ts`:

```typescript
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
}
```

Then update the import in `src/app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap');
```

### Animations

Edit animation durations and easings in `tailwind.config.ts`:

```typescript
transitionDuration: {
  'instant': '150ms',
  'fast': '300ms',
  'normal': '500ms',
  'slow': '800ms',
}
```

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Import and add it to `src/app/page.tsx`
3. Update the navbar in `src/components/Navbar.tsx` to include the new section

## Future Enhancements

### Connect to a CMS

To connect the content config to a headless CMS:

1. **Choose a CMS**: Contentful, Sanity, Strapi, or Prismic
2. **Create a custom hook** (e.g., `useContent`):
   ```typescript
   // src/hooks/useContent.ts
   import useSWR from 'swr';

   export function useContent() {
     const { data, error } = useSWR('/api/content', fetcher);
     return {
       content: data || contentConfig, // Fallback to static config
       isLoading: !error && !data,
       error,
     };
   }
   ```
3. **Replace imports** of `contentConfig` with the `useContent` hook
4. **Deploy** with environment variables for CMS API keys

### Add Analytics

```bash
npm install @vercel/analytics
```

Then add to `src/app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Add Contact Form Backend

Options:
1. **FormSpree**: Easy integration, no backend needed
2. **EmailJS**: Send emails directly from JavaScript
3. **Custom API Route**: Create `/api/contact` endpoint in Next.js
4. **Third-party services**: SendGrid, Mailgun, AWS SES

### Enable Smooth Scroll with Lenis

Uncomment the Lenis code in `src/app/page.tsx`:

```typescript
useEffect(() => {
  import('lenis').then(({ default: Lenis }) => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });
}, []);
```

### Add 3D Elements

The project includes React Three Fiber. To add 3D elements:

1. Create a 3D component in `src/components/3d/`
2. Import and use in any section
3. Example: floating 3D shapes, interactive models, particle systems

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Delete `.next` folder and `node_modules`:
   ```bash
   rm -rf .next node_modules
   ```

2. Reinstall dependencies:
   ```bash
   npm install
   ```

3. Rebuild:
   ```bash
   npm run build
   ```

### Styling Issues

- Make sure Tailwind CSS is processing correctly
- Check that `globals.css` is imported in `layout.tsx`
- Verify `tailwind.config.ts` paths include all component directories

### Animation Performance

If animations are laggy:

1. Enable GPU acceleration in `globals.css`:
   ```css
   * {
     transform: translateZ(0);
     backface-visibility: hidden;
   }
   ```

2. Reduce animation complexity in sections with many elements

### TypeScript Errors

Run type checking:
```bash
npm run build
```

Fix any type errors in the code.

## Performance Optimization

- Images: Use Next.js `<Image>` component for automatic optimization
- Fonts: Self-host fonts for faster loading
- Code Splitting: Next.js handles this automatically
- Lazy Loading: Use dynamic imports for heavy components

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## License

This project is open source and available for personal and commercial use.

## Contact

Sahaj Shukla
- Email: sahajshukla@gmail.com
- LinkedIn: [linkedin.com/in/sahajshukla](https://www.linkedin.com/in/sahajshukla/)
- GitHub: [github.com/sahajshukla](https://github.com/sahajshukla)

---

Built with Next.js, Tailwind CSS, and Framer Motion.
