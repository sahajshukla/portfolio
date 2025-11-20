# Deployment Checklist

Use this checklist before deploying your portfolio to production.

## Pre-Deployment Tasks

### Content Review
- [ ] Update all personal information in `src/config/contentConfig.ts`
  - [ ] Name, email, phone number
  - [ ] Location
  - [ ] Visa status (verify accuracy)
  - [ ] LinkedIn, GitHub, Medium URLs

- [ ] Review and update experience section
  - [ ] Verify all job titles and companies
  - [ ] Check dates and locations
  - [ ] Ensure achievement bullets are quantified
  - [ ] Verify technology tags

- [ ] Review and update projects
  - [ ] Ensure Vantage description is accurate
  - [ ] Verify GitHub URLs
  - [ ] Check technology stacks
  - [ ] Update project highlights

- [ ] Review articles/writing
  - [ ] Verify Medium URLs work
  - [ ] Check article descriptions
  - [ ] Update published dates if needed

- [ ] Review "Open to Roles" section
  - [ ] Confirm target roles are accurate
  - [ ] Update value propositions
  - [ ] Verify visa status callout

### Assets
- [ ] Add resume PDF to `/public/resume.pdf`
- [ ] Add favicon to `/public/favicon.ico` (optional)
- [ ] Add profile photo (if desired) to `/public/`
- [ ] Optimize any images you've added

### Testing
- [ ] Test all internal links (smooth scrolling to sections)
- [ ] Test all external links (LinkedIn, GitHub, Medium)
- [ ] Test contact form (verify mailto link works)
- [ ] Test Edit Mode functionality
  - [ ] Can enter with password
  - [ ] Can exit Edit Mode
  - [ ] Changes persist in localStorage

### Device Testing
- [ ] Test on desktop (Chrome, Firefox, Safari)
- [ ] Test on tablet (iPad, Android tablet)
- [ ] Test on mobile (iPhone, Android phone)
- [ ] Test in landscape and portrait modes
- [ ] Verify all sections are readable on small screens
- [ ] Check that mobile menu works properly

### Performance
- [ ] Run `npm run build` successfully (no errors)
- [ ] Test production build locally (`npm run start`)
- [ ] Check bundle size (should be < 500KB initial load)
- [ ] Verify animations are smooth on mobile

### Accessibility
- [ ] Test keyboard navigation (Tab through all links)
- [ ] Verify all images have alt text (if you added any)
- [ ] Check color contrast (use browser dev tools)
- [ ] Test with screen reader (optional but recommended)

### SEO
- [ ] Verify meta title in `src/app/layout.tsx`
- [ ] Update meta description
- [ ] Check Open Graph tags
- [ ] Ensure all pages have proper headings (h1, h2, etc.)

---

## Deployment Steps

### Option 1: Vercel (Recommended)

#### First Time Setup
1. [ ] Create Vercel account at [vercel.com](https://vercel.com)
2. [ ] Install Vercel CLI: `npm i -g vercel`
3. [ ] Run `vercel` in your project directory
4. [ ] Follow prompts:
   - [ ] Link to existing project or create new
   - [ ] Set project name
   - [ ] Set build settings (auto-detected for Next.js)
5. [ ] Wait for deployment (usually 1-2 minutes)
6. [ ] Get deployment URL (e.g., `sahaj-portfolio.vercel.app`)

#### Subsequent Deployments
```bash
vercel --prod
```

### Option 2: Vercel Dashboard (No CLI)

1. [ ] Push code to GitHub
2. [ ] Go to [vercel.com/dashboard](https://vercel.com/dashboard)
3. [ ] Click "Import Project"
4. [ ] Select your GitHub repository
5. [ ] Click "Deploy"
6. [ ] Wait for deployment

### Custom Domain Setup (Optional)

1. [ ] Buy domain (Namecheap, Google Domains, etc.)
2. [ ] In Vercel Dashboard:
   - [ ] Go to Project Settings > Domains
   - [ ] Add your custom domain
   - [ ] Follow DNS configuration instructions
3. [ ] Update DNS records at your registrar:
   - [ ] Add A record or CNAME as instructed
   - [ ] Wait for DNS propagation (5 min - 48 hours)
4. [ ] Verify HTTPS is working

---

## Post-Deployment Tasks

### Verification
- [ ] Visit your live URL
- [ ] Click through all sections
- [ ] Test all links again on live site
- [ ] Test contact form on live site
- [ ] Test on multiple devices (use BrowserStack or similar)
- [ ] Share with a friend for feedback

### Analytics Setup (Optional)

#### Vercel Analytics
1. [ ] In Vercel Dashboard, go to Analytics tab
2. [ ] Enable Vercel Analytics (free tier available)
3. [ ] Wait 24 hours for data

#### Google Analytics
1. [ ] Create Google Analytics account
2. [ ] Get tracking ID
3. [ ] Add to `src/app/layout.tsx`:
   ```typescript
   <Script src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} />
   <Script id="google-analytics">
     {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'G-XXXXXXXXXX');
     `}
   </Script>
   ```
4. [ ] Redeploy

### SEO Setup

#### Google Search Console
1. [ ] Go to [search.google.com/search-console](https://search.google.com/search-console)
2. [ ] Add your domain
3. [ ] Verify ownership (via DNS or HTML file)
4. [ ] Submit sitemap (optional: create with Next.js sitemap plugin)

#### LinkedIn
1. [ ] Update your LinkedIn profile
2. [ ] Add portfolio URL to "Contact Info" section
3. [ ] Share a post announcing your new portfolio

#### Resume
1. [ ] Update resume PDF with portfolio URL
2. [ ] Update resume on job boards with portfolio link

---

## Marketing Your Portfolio

### Day 1: Launch
- [ ] Post on LinkedIn announcing new portfolio
  - [ ] Include screenshot
  - [ ] Explain what you built
  - [ ] Tag relevant connections
- [ ] Update LinkedIn profile "Website" field
- [ ] Update GitHub profile README with link
- [ ] Add to email signature

### Week 1: Outreach
- [ ] Send to recruiters you're working with
- [ ] Share in relevant Slack/Discord communities
- [ ] Add to job applications (cover letters, applications)
- [ ] Post on Twitter/X (if applicable)

### Ongoing
- [ ] Monitor analytics weekly
- [ ] Update with new projects as you build them
- [ ] Add new articles as you write them
- [ ] Keep experience section current

---

## Troubleshooting

### Build Fails
- [ ] Check for TypeScript errors: `npm run build`
- [ ] Verify all imports are correct
- [ ] Check for missing dependencies
- [ ] Clear `.next` folder and rebuild

### Site is Slow
- [ ] Check Vercel deployment logs
- [ ] Optimize images (convert to WebP)
- [ ] Check bundle size in build output
- [ ] Consider lazy loading heavy components

### Styles Not Showing
- [ ] Verify `globals.css` is imported in `layout.tsx`
- [ ] Check Tailwind config paths
- [ ] Clear browser cache
- [ ] Check for CSS conflicts

### Links Not Working
- [ ] Verify all external URLs are complete (including `https://`)
- [ ] Test mailto links
- [ ] Check internal anchor links match section IDs

---

## Rollback Plan

If something goes wrong:

### Vercel
1. [ ] Go to Deployments tab
2. [ ] Find previous working deployment
3. [ ] Click "Promote to Production"

### Local
1. [ ] Keep a backup of working code
2. [ ] Use git to revert: `git revert <commit-hash>`

---

## Success Criteria

Your deployment is successful when:

- ✅ Site loads in < 3 seconds
- ✅ All sections visible and readable
- ✅ All links work (internal and external)
- ✅ Mobile responsive (test on real device)
- ✅ No console errors
- ✅ Contact methods work (email, LinkedIn)
- ✅ Custom domain configured (if applicable)
- ✅ HTTPS enabled (auto with Vercel)
- ✅ Shared on LinkedIn
- ✅ Added to resume/job applications

---

## Maintenance Schedule

### Weekly
- [ ] Check analytics
- [ ] Respond to any contact form submissions
- [ ] Update if you write new articles

### Monthly
- [ ] Review and update "Open to Roles" section
- [ ] Add any new projects
- [ ] Update experience if job changes
- [ ] Check all links still work

### Quarterly
- [ ] Review and refresh copy
- [ ] Update skills if learned new technologies
- [ ] Consider adding new sections (blog, testimonials)
- [ ] Update dependencies: `npm update`

---

## Emergency Contacts

If you need help:
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Framer Motion**: [framer.com/motion](https://framer.com/motion)

---

## Final Check

Before marking deployment as complete:

- [ ] I can access my site at the live URL
- [ ] All content is accurate and up-to-date
- [ ] Resume PDF is accessible
- [ ] I've tested on mobile
- [ ] I've shared on LinkedIn
- [ ] Portfolio URL is in my resume
- [ ] I'm ready to start applying to jobs!

---

**Congratulations on deploying your portfolio!** 🎉

Now go land that dream role! 🚀
