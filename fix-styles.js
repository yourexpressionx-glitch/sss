#!/usr/bin/env node
/**
 * Advanced HTML Inline Styles Remover v5
 * Final comprehensive cleanup - 404.html and careers.html edition
 */

const fs = require('fs');
const path = require('path');

const stylePatterns = [
  // Remove theme-color meta tags
  {
    pattern: /\s*<meta name="theme-color" content="[^"]*">\n/g,
    replacement: ''
  },
  // 404 page patterns
  {
    pattern: /<section class="hero" style="padding: 100px 20px; text-align: center; min-height: 60vh; display: flex; align-items: center;">/g,
    replacement: '<section class="hero hero-404">'
  },
  {
    pattern: /<div style="font-size: 120px; font-weight: bold; color: var\(--primary-light\); margin-bottom: 20px;">404<\/div>/g,
    replacement: '<div class="error-code">404</div>'
  },
  {
    pattern: /<h1 style="font-size: 2\.5rem; margin-bottom: 20px; color: var\(--primary-dark\);">Page Not Found<\/h1>/g,
    replacement: '<h1 class="error-title">Page Not Found</h1>'
  },
  {
    pattern: /<p style="font-size: 1\.1rem; color: #666; margin-bottom: 40px;">/g,
    replacement: '<p class="error-message">'
  },
  {
    pattern: /<div style="background-color: #f5f5f5; padding: 40px; border-radius: 8px; margin-bottom: 40px;">/g,
    replacement: '<div class="error-actions">'
  },
  {
    pattern: /<div style="display: flex; flex-direction: column; gap: 12px;">/g,
    replacement: '<div class="flex-col-gap">'
  },
  {
    pattern: /class="cta-button" style="display: block; padding: 12px 20px;"/g,
    replacement: 'class="cta-button action-button"'
  },
  {
    pattern: /<div style="border-top: 1px solid #ddd; padding-top: 30px;">/g,
    replacement: '<div class="divider-top">'
  },
  {
    pattern: /<p style="color: #666; margin-bottom: 15px;">/g,
    replacement: '<p class="emergency-text">'
  },
  {
    pattern: /<a href="tel:\+918376061234" style="color: var\(--primary-light\); font-weight: bold; font-size: 1\.1rem;"/g,
    replacement: '<a href="tel:+918376061234" class="contact-info-link-large"'
  },
  {
    pattern: /<a href="https:\/\/wa\.me\/918376061234" style="color: var\(--primary-light\); font-weight: bold; font-size: 1\.1rem;"/g,
    replacement: '<a href="https://wa.me/918376061234" class="contact-info-link-large"'
  },
  // Careers page patterns
  {
    pattern: /<div style="font-size: 2rem; margin-bottom: 15px;">(\d+️⃣)<\/div>/g,
    replacement: '<div class="emoji-step">$1</div>'
  },
  {
    pattern: /<div style="text-align: center; padding: 40px; background-color: #f5f5f5; border-radius: 8px;">/g,
    replacement: '<div class="careers-section">'
  },
  {
    pattern: /<p style="font-size: 1rem; margin-bottom: 30px;">/g,
    replacement: '<p class="mb-30">'
  },
  {
    pattern: /<strong>Email:<\/strong> <a href="mailto:careers@siligurisisecurity\.com" style="color: var\(--primary-light\); font-weight: bold;"/g,
    replacement: '<strong>Email:</strong> <a href="mailto:careers@siligurisisecurity.com" class="contact-info-link"'
  },
  {
    pattern: /<strong>Phone:<\/strong> <a href="tel:\+918376061234" style="color: var\(--primary-light\); font-weight: bold;"/g,
    replacement: '<strong>Phone:</strong> <a href="tel:+918376061234" class="contact-info-link"'
  },
  {
    pattern: /<strong>WhatsApp:<\/strong> <a href="https:\/\/wa\.me\/918376061234" style="color: var\(--primary-light\); font-weight: bold;"/g,
    replacement: '<strong>WhatsApp:</strong> <a href="https://wa.me/918376061234" class="contact-info-link"'
  },
  {
    pattern: /<p style="color: #666;">Or visit our/g,
    replacement: '<p class="text-light">Or visit our'
  },
  // Generic patterns for 404 links in footer
  {
    pattern: /<a href="pages\/about\.html" style="color: var\(--primary-light\); font-weight: bold;"/g,
    replacement: '<a href="pages/about.html" class="contact-info-link"'
  },
  {
    pattern: /<a href="pages\/services\.html" style="color: var\(--primary-light\); font-weight: bold;"/g,
    replacement: '<a href="pages/services.html" class="contact-info-link"'
  },
  {
    pattern: /<a href="pages\/quote\.html" style="color: var\(--primary-light\); font-weight: bold;"/g,
    replacement: '<a href="pages/quote.html" class="contact-info-link"'
  },
  // Contact page patterns
  {
    pattern: /<p style="margin-top: 30px; color: #666;">([^<]*)<\/p>/g,
    replacement: '<p class="mt-30 text-light">$1</p>'
  },
  {
    pattern: /<p style="margin-top: 40px; color: #666; font-size: 0\.9rem;">([^<]*)<\/p>/g,
    replacement: '<p class="mt-40 text-light text-small">$1</p>'
  },
  // Max width containers
  {
    pattern: /style="max-width: 800px;"/g,
    replacement: 'class="max-width-800"'
  },
  // Blog submit button
  {
    pattern: /class="submit-btn" style="width: auto; padding: 12px 30px;"/g,
    replacement: 'class="submit-btn px-30 py-12"'
  },
  // General patterns fallback
  {
    pattern: /style="color: var\(--primary-light\); font-weight: bold;"/g,
    replacement: 'class="contact-info-link"'
  },
  {
    pattern: /style="margin-top: 40px;"/g,
    replacement: 'class="mt-40"'
  },
  {
    pattern: /style="color: #666;"/g,
    replacement: 'class="text-light"'
  },
];

const htmlFiles = [
  'index.html',
  'pages/about.html',
  'pages/services.html',
  'pages/quote.html',
  'pages/locations.html',
  'pages/sectors.html',
  'pages/compliance.html',
  'pages/facilities.html',
  'pages/contact.html',
  'pages/blog-list.html',
  'pages/privacy.html',
  'pages/terms.html',
  'pages/careers.html',
  '404.html'
];

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let changeCount = 0;

    stylePatterns.forEach(({ pattern, replacement }) => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, replacement);
        changeCount += matches.length;
      }
    });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${path.basename(filePath)} → ${changeCount} fixes`);
      return true;
    }
  } catch (err) {
    console.error(`❌ ${path.basename(filePath)}: ${err.message}`);
  }
  return false;
}

console.log('\n🔧 Final cleanup of inline styles (v5 - 404 & Careers)...\n');

let fixedCount = 0;
htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    if (fixFile(filePath)) fixedCount++;
  }
});

console.log(`\n✨ Fixed ${fixedCount} files!\n`);
