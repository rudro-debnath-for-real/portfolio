# Rudro Debnath - Personal Portfolio

A modern, premium dark-themed personal portfolio website for a Computer Science and Engineering student. Built with vanilla HTML5, CSS3, and JavaScript — no frameworks required.

## 🌟 Features

- **Modern Dark Theme** - Deep charcoal background with electric blue and purple accents
- **Light/Dark Mode Toggle** - Persists user preference in localStorage
- **Responsive Design** - Works beautifully on desktop, tablet, and mobile (320px - 1920px)
- **Smooth Animations** - Scroll-triggered animations, counter animations, typing effect
- **Accessible** - Semantic HTML, ARIA labels, keyboard navigation, focus management
- **Functional Contact Form** - Real form submission via Formspree with validation
- **Performance Optimized** - Minimal dependencies, efficient animations, reduced motion support

## 📁 Project Structure

```
rudro-portfolio/
├── index.html      # Main HTML file
├── styles.css      # All styles (CSS custom properties, responsive design)
├── script.js       # All JavaScript (navigation, animations, form validation)
├── photos/         # Profile and project images
│   ├── profile.jpg
│   ├── doctor.jpg
│   ├── course.png
│   └── cpp-library1.png
└── README.md       # This file
```

## 🚀 Quick Start

### Local Development

Simply open `index.html` in your browser:

```bash
# Option 1: Double-click index.html in file explorer

# Option 2: Using a local server (recommended for best experience)
# Python 3
python -m http.server 8000

# Node.js (if you have http-server installed)
npx http-server

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 🌐 Deploying to GitHub Pages / Vercel

This project is ready for deployment with **zero configuration**.

### GitHub Pages

1. **Create a new repository** on GitHub:
   - Go to [github.com/new](https://github.com/new)
   - Repository name: `rudro-portfolio` (or your preferred name)
   - Set to **Public** (required for free GitHub Pages)
   - Don't initialize with README (we have our own)

2. **Upload your files**:
   - Click "uploading an existing file" or drag and drop
   - Select all files: `index.html`, `styles.css`, `script.js`, `photos/` folder
   - Commit changes

3. **Enable GitHub Pages**:
   - Go to **Settings** → **Pages** (in left sidebar)
   - Source: **Deploy from a branch**
   - Branch: **main** (or `master`)
   - Folder: **/ (root)**
   - Click **Save**

4. **Access your site**:
   - Your site will be live at: `https://<your-username>.github.io/rudro-portfolio/`
   - May take 1-2 minutes to deploy

### Vercel Deployment (Recommended for Formspree)

For the contact form to work on Vercel, you'll need to set up environment variables:

1. Push to GitHub
2. Import project in Vercel
3. Add environment variable (if using a custom Formspree endpoint):
   - `FORMSPREE_ENDPOINT` = `https://formspree.io/f/your-form-id`
4. Deploy

## 📧 Contact Form Setup (Formspree)

The contact form uses [Formspree](https://formspree.io) for real email delivery without a backend.

### Setup Steps:

1. **Create a Formspree account** at https://formspree.io
2. **Create a new form** and copy your form ID (e.g., `mgegkqzr`)
3. **Update the form action** in `index.html`:
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
   ```
4. **Configure recipient email** in Formspree dashboard:
   - Go to your form settings
   - Set "Email" to: `serenufa.ciba@ugv.edu.bd`
5. **Test the form** - submit a test message

### Form Features:
- ✅ Real form submission (not a fake demo)
- ✅ Client-side validation (required fields, email format, message length)
- ✅ Server-side validation via Formspree
- ✅ Loading state during submission
- ✅ Success/error messages
- ✅ Duplicate submission prevention
- ✅ Works on desktop and mobile
- ✅ No API keys exposed in frontend code

## 🎨 Customization

### Colors & Theme

Edit CSS custom properties in `styles.css`:

```css
:root {
  --color-bg-primary: #0a0f1a;        /* Main background */
  --color-accent-primary: #00d4ff;   /* Primary accent (electric blue) */
  --color-accent-secondary: #a855f7; /* Secondary accent (purple) */
  /* ... more variables */
}
```

### Content

Update the following in `index.html`:
- Personal information (name, title, bio)
- Skills and proficiency levels
- Project details and GitHub links
- Education history
- Contact information and social links

### Typography

The project uses:
- **Space Grotesk** - Headings and UI text
- **JetBrains Mono** - Code snippets and technical data

Both loaded via Google Fonts. To change, update the `<link>` in `index.html` and the `--font-primary`/`--font-mono` CSS variables.

## 🛠️ Technologies Used

- **HTML5** - Semantic markup, accessibility features
- **CSS3** - Custom properties, Grid/Flexbox, animations, media queries
- **Vanilla JavaScript (ES6+)** - Modules, IntersectionObserver, localStorage
- **Google Fonts** - Space Grotesk, JetBrains Mono
- **Formspree** - Contact form backend

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome for Android)

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Reduced motion support
- Color contrast ratios (WCAG AA)
- Screen reader friendly

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Rudro Debnath**
- GitHub: [@rudro-debnath-for-real](https://github.com/rudro-debnath-for-real)
- Codeforces: [@rudro1866](https://codeforces.com/profile/rudro1866)
- Email: serenufa.ciba@ugv.edu.bd
- University: University of Global Village
- Department: Computer Science and Engineering (CSE)
- CGPA: 3.83 / 4.00
- HSC GPA: 4.84 / 5.00

---

*Built with ❤️ using vanilla web technologies*