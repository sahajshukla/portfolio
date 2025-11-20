# ✅ Your Portfolio is Live Locally!

## 🚀 Access Your Site

Your portfolio is now running at:
**http://localhost:8080**

Open this URL in your browser to see your site!

---

## 📝 To Add Your Resume

1. **Place your PDF resume** in the `/public/` folder
2. **Name it exactly**: `resume.pdf`
3. The site will automatically link to it
4. You can test it at: `http://localhost:8080/resume.pdf`

**Current location**: `/Users/sahajshukla/Desktop/portfolio/public/`

---

## 🛠️ Managing the Server

### Stop the Server
```bash
# Press Ctrl+C in the terminal where it's running
# Or use: pkill -f "next dev"
```

### Restart the Server
```bash
cd /Users/sahajshukla/Desktop/portfolio
npm run dev
```

### Check if Server is Running
Visit: http://localhost:8080

---

## 📋 Before You Buy Your Domain

### 1. Review Content
- All your content is in: `src/config/contentConfig.ts`
- Update any details you want to change
- Everything is already configured with your real info

### 2. Add Resume
- Place `resume.pdf` in `/public/` folder
- Test it works at: `http://localhost:8080/resume.pdf`

### 3. Test Everything
- [ ] Click through all sections
- [ ] Test all navigation links
- [ ] Verify social media links work (LinkedIn, GitHub, Medium)
- [ ] Test contact form (opens email)
- [ ] Check on mobile (browser dev tools, responsive mode)
- [ ] Try Edit Mode (settings icon, password: `edit123`)

---

## 🌐 When You Have Your Domain

Once you buy your domain, we'll:

1. **Deploy to Vercel** (free hosting):
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Connect your domain**:
   - Add domain in Vercel dashboard
   - Update DNS records at your registrar
   - SSL certificate auto-configured

3. **Your site will be live** at your custom domain!

---

## 📁 Important Files & Folders

```
portfolio/
├── public/
│   └── resume.pdf              ← Add your resume here
│
├── src/config/
│   └── contentConfig.ts        ← Edit all your content here
│
├── package.json                ← Port 8080 configured
│
└── Documentation files:
    ├── README.md               ← Full guide
    ├── QUICKSTART.md           ← Quick reference
    ├── DEPLOYMENT_CHECKLIST.md ← Pre-deploy checklist
    └── ARCHITECTURE.md         ← How it works
```

---

## 🎨 Quick Customizations

### Change Colors
Edit `tailwind.config.ts`:
```typescript
accent: {
  cyan: '#00d9ff',    // Your primary color
  purple: '#a855f7',  // Secondary color
}
```

### Update Content
Edit `src/config/contentConfig.ts`:
```typescript
personal: {
  name: "Sahaj Shukla",
  email: "sahajshukla@gmail.com",
  // ... update any field
}
```

Server will auto-refresh when you save!

---

## 🔧 Port Configuration

Currently running on **port 8080**.

To change the port, edit `package.json`:
```json
"scripts": {
  "dev": "next dev -p YOUR_PORT",
}
```

Then restart the server.

---

## 📞 Next Steps

1. ✅ **Review your site** at http://localhost:8080
2. ✅ **Add your resume** to `/public/resume.pdf`
3. ✅ **Test everything** (links, mobile, etc.)
4. ✅ **Buy your domain**
5. ✅ **Let me know** when you have your domain, and I'll help you deploy!

---

## 🆘 Troubleshooting

### Server Won't Start?
```bash
# Kill any running instances
pkill -f "next dev"

# Restart
npm run dev
```

### Can't Access Site?
- Make sure you're using: http://localhost:8080
- Check if server is running (look for "Ready in..." message)

### Made Changes But Don't See Them?
- Save the file (Cmd+S / Ctrl+S)
- Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
- Check terminal for errors

### Want to Use a Different Port?
Edit `package.json` → `"dev": "next dev -p YOUR_PORT"`

---

## 📧 All Set!

Your portfolio is configured and running. Everything is:
- ✅ Installed locally (no global packages)
- ✅ Running on port 8080
- ✅ Ready for your resume
- ✅ Ready to deploy when you have a domain

**Enjoy exploring your new portfolio!** 🎉

Questions? Check the documentation files or let me know!
