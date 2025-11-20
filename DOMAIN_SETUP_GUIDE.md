# Domain Setup Guide

When you're ready to deploy with your custom domain, follow this guide.

---

## Option 1: I'll Help You Deploy (Recommended)

**Just send me your domain name**, and I'll:
1. Deploy your site to Vercel
2. Configure your domain settings
3. Set up SSL certificate
4. Make sure everything works

**What I need from you**:
- Your domain name (e.g., `sahajshukla.com`)
- Access to your domain registrar (to update DNS records)

---

## Option 2: Deploy It Yourself

### Step 1: Deploy to Vercel

```bash
# Install Vercel CLI (locally, not globally)
npx vercel

# Follow the prompts:
# - "Set up and deploy?" → Yes
# - "Which scope?" → Your account
# - "Link to existing project?" → No
# - "What's your project's name?" → sahaj-portfolio
# - "In which directory is your code?" → ./
# - "Want to override settings?" → No

# Your site will be live at: https://sahaj-portfolio.vercel.app
```

### Step 2: Add Custom Domain

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Settings" → "Domains"
   - Enter your domain (e.g., `sahajshukla.com`)
   - Click "Add"

2. **Vercel will show you DNS records** like:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **At Your Domain Registrar**:
   - Log in to where you bought the domain
   - Find "DNS Settings" or "DNS Management"
   - Add the records Vercel showed you
   - Save changes

4. **Wait for DNS to Propagate**:
   - Usually takes 5-30 minutes
   - Sometimes up to 24 hours
   - Vercel will verify automatically

5. **SSL Certificate**:
   - Vercel auto-configures HTTPS
   - No action needed!

### Step 3: Verify

- Visit your domain: `https://yourdomain.com`
- Check HTTPS is working (lock icon in browser)
- Test on mobile

---

## Popular Domain Registrars

### Namecheap
1. Login → Domain List
2. Click "Manage" next to your domain
3. Advanced DNS tab
4. Add records from Vercel

### GoDaddy
1. Login → My Products → Domains
2. Click DNS next to your domain
3. Add records from Vercel

### Google Domains / Squarespace Domains
1. Login → My Domains
2. Click DNS
3. Custom records → Add records from Vercel

### Cloudflare
1. Login → Select domain
2. DNS → Records
3. Add records from Vercel
4. **Important**: Set Proxy status to "DNS only" (gray cloud)

---

## Recommended Domains

- **sahajshukla.com** (if available)
- **sahajshukla.dev** (developer focused)
- **sahajshukla.io** (tech/startup vibe)
- **sahaj.work** (clean and simple)

Check availability: [Namecheap Domain Search](https://www.namecheap.com/domains/)

---

## Cost Estimate

- **Domain**: $10-15/year (.com)
- **Hosting (Vercel)**: FREE
- **SSL Certificate**: FREE (included)
- **Bandwidth**: FREE (generous limits)

**Total**: ~$12/year for domain only!

---

## After Deployment

### Update Your Profiles
- [ ] Add domain to LinkedIn profile
- [ ] Add to GitHub profile README
- [ ] Update resume with URL
- [ ] Add to email signature
- [ ] Share on LinkedIn

### Set Up Analytics (Optional)
```bash
# In Vercel Dashboard:
# Analytics tab → Enable

# Or add Google Analytics:
# See README.md for instructions
```

---

## Need Help?

When you have your domain, just let me know:
- **Domain name**: _______________________
- **Registrar**: _______________________

And I'll help you get it deployed!

---

## Quick Reference

### Vercel Deployment
```bash
npx vercel              # Deploy to preview
npx vercel --prod       # Deploy to production
```

### Check Deployment Status
- Vercel Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
- Deployment logs show any errors

### Redeploy After Changes
```bash
# Make your changes, then:
git add .
git commit -m "Update content"
npx vercel --prod
```

Or set up auto-deploy:
- Push to GitHub
- Connect GitHub repo in Vercel
- Auto-deploys on every push!

---

**Ready to go live?** Let me know when you have your domain! 🚀
