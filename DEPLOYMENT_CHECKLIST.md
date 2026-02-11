# Deployment & Launch Checklist

## Pre-Deployment Verification (LOCAL)

### 1. Directory Structure Check
- [ ] All files and folders exist in correct locations
- [ ] No missing subdirectories (/pages, /assets/css, /assets/js, /assets/images)
- [ ] File permissions set correctly (755 for folders, 644 for files)

### 2. File Integrity Verification
- [ ] index.html opens correctly in browser
- [ ] All CSS applies properly (blue navy color scheme visible)
- [ ] JavaScript interactivity works:
  - [ ] Mobile menu toggle (☰ button)
  - [ ] FAQ accordion expands/collapses
  - [ ] Form validation triggers (invalid email/phone)
  - [ ] Number animation works on homepage
  - [ ] WhatsApp integration generates proper message

### 3. Link Testing (All pages)
- [ ] All internal links work (test each page's navigation)
- [ ] No broken image links (404 errors)
- [ ] Breadcrumb navigation shows correct path
- [ ] Footer links work on all pages
- [ ] Mobile menu navigation functional

### 4. Form Testing
**Quote Form (pages/quote.html):**
- [ ] All form fields visible
- [ ] Dropdown options load correctly (11 locations, 12 site types, etc.)
- [ ] Form validation works:
  - [ ] Email validation (invalid: "test", "test@", valid: "test@example.com")
  - [ ] Phone validation (invalid: "123", valid: "9876543210")
  - [ ] Required fields enforce submission block
- [ ] Submit button opens WhatsApp with pre-filled message
- [ ] Success toast message appears after submission

**Contact Form (pages/contact.html):**
- [ ] All fields visible and functional
- [ ] Form validates required fields
- [ ] WhatsApp integration works

### 5. Responsive Design Testing
Test on mobile device or browser dev tools:

**Mobile (480px breakpoint):**
- [ ] Menu toggle works (hamburger ☰)
- [ ] Navigation collapses properly
- [ ] Text readable without horizontal scroll
- [ ] Images scale appropriately
- [ ] Forms are filled properly on small screen
- [ ] Buttons clickable with touch spacing

**Tablet (768px breakpoint):**
- [ ] Two-column layouts display correctly
- [ ] Cards stack appropriately
- [ ] Tables are readable

**Desktop (1200px+):**
- [ ] Full layout displays
- [ ] Cards align in proper grids
- [ ] White space looks balanced

### 6. Browser Compatibility Check
Test across these browsers:
- [ ] Chrome/Chromium (v90+)
- [ ] Firefox (v88+)
- [ ] Safari (v14+)
- [ ] Edge (v90+)
- [ ] Mobile Safari (iOS 13+)
- [ ] Chrome Mobile (Android 9+)

### 7. SEO & Metadata Verification
Check page source for:
- [ ] Meta description tags on all pages (155 chars)
- [ ] Meta keywords present
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Proper H1 tags (one per page)
- [ ] Heading hierarchy correct (H1→H2→H3, no gaps)
- [ ] Schema markup on homepage and contact page

### 8. Performance Check
- [ ] Page load time reasonable (< 3 seconds)
- [ ] No console errors in browser dev tools
- [ ] Images lazy load properly (data-src attributes)
- [ ] CSS loads in HEAD (no FOUC)
- [ ] JavaScript loads at end of BODY

### 9. Accessibility Check
- [ ] Form labels properly associated with inputs
- [ ] Color contrast sufficient (navy on white OK)
- [ ] Keyboard navigation works (Tab through form)
- [ ] Alt attributes on images (when added)
- [ ] Semantic HTML structure (header, nav, main, footer)

### 10. Content Completeness
- [ ] All pages have company contact information
- [ ] Phone numbers: +91-8376-061234
- [ ] Email: info@siligurisisecurity.com
- [ ] Location references consistent
- [ ] No "Lorem ipsum" or placeholder text
- [ ] All CTAs point to correct pages

---

## Hosting Setup (BEFORE UPLOAD)

### 1. Domain Registration
- [ ] Domain registered: siligurisisecurity.com
- [ ] Domain registrar: _______________
- [ ] Renewal auto-pay enabled
- [ ] Admin email configured

### 2. Web Hosting Selection
Choose one:
- [ ] Shared Hosting (GoDaddy, Bluehost, HostGator)
- [ ] Cloud Hosting (AWS, Azure, Google Cloud)
- [ ] Specialized (Netlify, Vercel, AWS Amplify)

**Recommended for this site:**
- Shared Hosting: Bluehost (affordable, one-click setup)
- Cloud: AWS S3 + CloudFront (scalable, CDN included)
- Specialized: Netlify (free tier available, easy deployment)

### 3. Hosting Account Setup
- [ ] Account created and admin access verified
- [ ] Control panel accessible (cPanel, Plesk, etc.)
- [ ] Email hosting configured (if needed)
- [ ] FTP/SFTP access credentials obtained
- [ ] File manager available

### 4. DNS Configuration
- [ ] Nameservers updated to point to hosting provider
- [ ] A record points to hosting server IP
- [ ] Propagation status checked (5-48 hours typical)
- [ ] Domain accessible at siligurisisecurity.com

### 5. SSL Certificate Setup
- [ ] SSL certificate installed (HTTPS)
- [ ] Auto-renewal enabled
- [ ] Certificate valid for siligurisisecurity.com
- [ ] Mixed content warnings resolved
- [ ] All internal links use https://

### 6. Error Page Configuration
- [ ] 404.html configured as custom error page
- [ ] 500.html created (optional, for server errors)
- [ ] Custom error pages linked in hosting control panel

---

## File Upload & Deployment

### 1. File Upload Method

**Option A: FTP (Traditional)**
1. [ ] FTP client installed (FileZilla, WinSCP)
2. [ ] FTP credentials configured
3. [ ] Connected to server
4. [ ] Upload directory: /public_html or /www
5. [ ] Upload all files maintaining directory structure:
   ```
   /public_html/
   ├── index.html
   ├── 404.html
   ├── robots.txt
   ├── sitemap.xml
   ├── README.md
   ├── NAVIGATION_MAP.md
   ├── assets/
   │   ├── css/style.css
   │   ├── js/main.js
   │   └── images/
   └── pages/
       └── [all pages]
   ```

**Option B: File Manager (Web-based)**
1. [ ] Access hosting control panel
2. [ ] Open File Manager
3. [ ] Create folder structure
4. [ ] Upload files via web interface

**Option C: Git Deployment**
1. [ ] GitHub repository created
2. [ ] All files committed
3. [ ] Deploy via Netlify/GitHub Pages/hosting git integration
4. [ ] Webhook configured for auto-deployment on push

**Option D: Hosting Provider One-Click**
1. [ ] Use hosting provider's CMS importer
2. [ ] Select "Static HTML Website"
3. [ ] Upload or point to files

### 2. Verify All Files Uploaded
- [ ] index.html exists at root
- [ ] All /pages files uploaded
- [ ] All /assets files uploaded (css, js, images)
- [ ] robots.txt at root
- [ ] sitemap.xml at root
- [ ] 404.html at root

### 3. Set Permissions
```bash
# If using SSH/terminal:
chmod 755 /public_html
chmod 644 /public_html/*.html
chmod 644 /public_html/*.xml
chmod 755 /public_html/assets
chmod 755 /public_html/assets/css
chmod 755 /public_html/assets/js
chmod 755 /public_html/assets/images
chmod 755 /public_html/pages
chmod 755 /public_html/pages/locations
chmod 755 /public_html/pages/services
chmod 755 /public_html/pages/blog
```

### 4. Set Default Page
In hosting control panel:
- [ ] Set index.html as default/home page
- [ ] Set 404.html as custom error page

### 5. Clear Cache
- [ ] Clear browser cache
- [ ] Clear CDN cache (if applicable)
- [ ] Clear server cache
- [ ] Wait 5-10 minutes for propagation

---

## Post-Deployment Testing (LIVE SITE)

### 1. Basic Accessibility Test
- [ ] siligurisisecurity.com loads in browser
- [ ] Logo/header displays correctly
- [ ] All pages accessible
- [ ] No "Page not found" errors (unless intentional)

### 2. Full Link Testing
- [ ] All internal links work on live site
- [ ] All CTAs point to correct pages
- [ ] Phone numbers clickable (tel: links)
- [ ] Email clickable (mailto: links)
- [ ] External links (if any) open correctly

### 3. Form Testing (LIVE)
- [ ] Quote form accessible at /pages/quote.html
- [ ] Contact form works
- [ ] WhatsApp integration functional
- [ ] Form data properly formatted in WhatsApp

### 4. Performance Testing
- [ ] Page load time acceptable (GTmetrix score)
- [ ] No 404 errors in console
- [ ] Images load properly
- [ ] CSS applies correctly
- [ ] JavaScript functional

### 5. Mobile Testing (LIVE)
- [ ] Responsive design works on mobile
- [ ] Menu toggle functional
- [ ] Forms usable on mobile
- [ ] Text readable without zoom

### 6. Browser Testing (LIVE)
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge

### 7. SEO Testing (LIVE)
- [ ] Google can crawl site (Google Search Console)
- [ ] Sitemap.xml accessible at /sitemap.xml
- [ ] robots.txt accessible at /robots.txt
- [ ] Meta tags visible in page source

---

## Search Engine Submission

### 1. Google Search Console
1. [ ] Go to search.google.com/search-console
2. [ ] Click "Add Property"
3. [ ] Enter domain: siligurisisecurity.com
4. [ ] Verify ownership (choose verification method):
   - [ ] HTML file upload
   - [ ] DNS CNAME record
   - [ ] Tag manager
   - [ ] Google Analytics
5. [ ] Submit sitemap.xml:
   - [ ] Click "Sitemaps"
   - [ ] Add new sitemap: siligurisisecurity.com/sitemap.xml
   - [ ] Verify submission
6. [ ] Monitor Search Appearance:
   - [ ] Coverage (index status)
   - [ ] Enhancements (structured data)
   - [ ] Core Web Vitals (performance)

### 2. Bing Webmaster Tools
1. [ ] Go to bing.com/webmaster
2. [ ] Add site: siligurisisecurity.com
3. [ ] Verify ownership
4. [ ] Submit sitemap.xml
5. [ ] Monitor indexing

### 3. Manual Submissions (Optional)
- [ ] Google: google.com/addurl
- [ ] Bing: bing.com/webmaster
- [ ] Yandex: yandex.com/webmaster (if operating in Russia/CIS)

---

## Analytics & Conversion Tracking Setup

### 1. Google Analytics 4
1. [ ] Create GA4 property at analytics.google.com
2. [ ] Get Measurement ID (G-xxxxxxxxxx)
3. [ ] Add tracking code to all pages (in <head>):
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```
4. [ ] Verify tracking working (Google Analytics "Real-time" report)

### 2. Google Ads Conversion Tracking (Optional)
1. [ ] Create Google Ads conversion:
   - [ ] Conversion name: "Quote Form Submission"
   - [ ] Category: "Sign-up"
   - [ ] Value: [estimated lead value]
2. [ ] Add conversion tracking code to form success page
3. [ ] Monitor conversions in Google Ads

### 3. CRM Integration (If applicable)
- [ ] Form submission sends to: _____________
- [ ] CRM configured to receive leads
- [ ] Lead notification emails sent to: info@siligurisisecurity.com

### 4. Custom Dashboards (Optional)
- [ ] Create custom Google Analytics report for:
  - [ ] Quote form submissions
  - [ ] Contact form clicks
  - [ ] Top pages driving conversions
  - [ ] Geographic traffic sources

---

## Monitoring & Alerts Setup

### 1. Uptime Monitoring
Set up monitoring for site availability:
- [ ] Uptime Robot (www.uptimerobot.com)
- [ ] StatusPage (statuspage.io)
- [ ] Monitor URL: siligurisisecurity.com
- [ ] Alert email: ____________

### 2. Google Search Console Alerts
- [ ] Mobile usability issues → resolve
- [ ] Security issues → fix immediately
- [ ] Indexing problems → troubleshoot

### 3. Performance Monitoring
- [ ] GTmetrix monitoring (gtmetrix.com)
- [ ] Google PageSpeed Insights
- [ ] Lighthouse reports

### 4. Broken Link Checker
- [ ] Set up automated broken link checking
- [ ] Monitor for 404 errors weekly

---

## Post-Launch Maintenance

### Week 1
- [ ] Monitor Google Search Console for indexing
- [ ] Check Analytics for initial traffic
- [ ] Verify form submissions working
- [ ] Check for console errors
- [ ] Respond to any form submissions within 24 hours

### Month 1
- [ ] All pages indexed in Google
- [ ] Organic traffic monitoring started
- [ ] Form conversion rate tracked
- [ ] Page speed optimized
- [ ] Update meta descriptions if needed

### Month 3
- [ ] Comprehensive SEO audit
- [ ] Create first blog article
- [ ] Start local SEO (Google My Business)
- [ ] Plan link building strategy
- [ ] Review analytics and visitor behavior

### Month 6
- [ ] Individual location pages created (8 pages)
- [ ] Service detail pages created (12 pages)
- [ ] Blog articles published (3-5 articles)
- [ ] Keyword ranking tracking
- [ ] Lead quality assessment

### Year 1
- [ ] Complete location/service/blog expansion
- [ ] 30-50% increase in organic traffic
- [ ] 50+ qualified leads from website
- [ ] ROI calculation
- [ ] Strategic revisions

---

## Backup & Disaster Recovery

### 1. Backup Strategy
- [ ] Automatic daily backups enabled (hosting provider)
- [ ] Manual weekly backup downloads
- [ ] Backup location: Local hard drive + cloud (Google Drive, Dropbox)
- [ ] Test restore procedure monthly

### 2. Version Control (OPTIONAL but Recommended)
- [ ] Git repository created (GitHub, GitLab, Bitbucket)
- [ ] All files committed
- [ ] Remote backup in cloud
- [ ] Branch strategy: main (live), develop (staging)

### 3. Disaster Recovery Procedure
If site goes down:
1. [ ] Check hosting status page
2. [ ] Restore from latest backup
3. [ ] Verify all files restored correctly
4. [ ] Test all functionality
5. [ ] Clear caches
6. [ ] Notify stakeholders if extended downtime

---

## Post-Launch Optimization

### Week 2-4: Initial Optimization
- [ ] Monitor Core Web Vitals in GSC
- [ ] Optimize images (compress, next-gen formats)
- [ ] Minify CSS/JavaScript
- [ ] Enable GZIP compression
- [ ] Leverage browser caching

### Month 2: Content Optimization
- [ ] Analyze top pages with Analytics
- [ ] Update meta descriptions for better CTR
- [ ] Optimize heading tags for keywords
- [ ] Internal link optimization
- [ ] Add FAQ schema markup

### Month 3: Expansion
- [ ] Create location-specific landing pages
- [ ] Start blogging strategy
- [ ] Build high-quality backlinks
- [ ] Local SEO optimization

---

## Final Verification Checklist

Before Declaring Site "Live":

- [ ] Domain resolves to correct website
- [ ] HTTPS/SSL working
- [ ] No console errors
- [ ] All pages load
- [ ] Forms submit properly
- [ ] Mobile responsive
- [ ] Analytics tracking
- [ ] Search console indexed
- [ ] robots.txt and sitemap working
- [ ] Backup system operational
- [ ] Team trained on updates
- [ ] Contact info current
- [ ] Emergency contact established

---

## Support & Troubleshooting

### Common Issues & Solutions

**Issue: Page shows "404 Not Found"**
- Solution: Check file upload, verify file names match exactly, check .htaccess if using URL rewriting

**Issue: Styles not loading (unstyled page)**
- Solution: Verify CSS path is correct, clear browser cache, check CSS file permissions (644)

**Issue: Mobile menu doesn't toggle**
- Solution: Check main.js loaded, verify script src path, check browser console for errors

**Issue: Form doesn't submit to WhatsApp**
- Solution: Verify WhatsApp phone number format (+91 prefix), check browser WhatsApp web support

**Issue: Images not displaying**
- Solution: Upload images to /assets/images/, update image src paths, check file permissions

**Issue: Site slow to load**
- Solution: Compress images, minify CSS/JS, enable caching, check server resources

**Issue: HTTPS not working**
- Solution: Install SSL certificate, update internal links to https://, clear cache

---

## Contact Information

**For Technical Support:**
- Hosting Provider: _______________
- Support Email: _______________
- Support Phone: _______________

**For Website Updates:**
- Website Owner: _______________
- Email: info@siligurisisecurity.com
- Phone: +91-8376-061234

**For Lead Follow-up:**
- Sales Contact: _______________
- Email: info@siligurisisecurity.com
- Phone: +91-8376-061234

---

## Sign-Off

- [ ] Project Manager: _____________ Date: _____
- [ ] Technical Lead: _____________ Date: _____
- [ ] Client Approval: _____________ Date: _____

---

*This checklist should be completed before considering the website fully deployed and live.*

*Last Updated: December 11, 2024*
