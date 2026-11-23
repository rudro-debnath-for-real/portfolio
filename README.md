# Rudro Debnath — Portfolio

[![Deploy static content to Pages](https://github.com/rudro-debnath-for-real/portfolio/actions/workflows/static.yml/badge.svg)](https://github.com/rudro-debnath-for-real/portfolio/actions/workflows/static.yml)
[![Live site](https://img.shields.io/badge/Live-GitHub%20Pages-brightgreen)](https://rudro-debnath-for-real.github.io/portfolio/)

A responsive, dependency-free personal portfolio for **Rudro Debnath** — CSE student, competitive programmer, and developer. The design combines the animated grid hero, project cards, and detailed competitive-programming sections of the original live site with the `<Rudro.dev/>` branding, terminal styling, theme toggle, and toast notifications of the earlier local redesign.

**Live demo:** https://rudro-debnath-for-real.github.io/portfolio/

---

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Highlights](#highlights)
- [Project structure](#project-structure)
- [Run locally](#run-locally)
- [Deployment](#deployment)
- [Contact form](#contact-form)
- [Author](#author)

## Features

- **Hybrid visual design** — animated grid hero, floating dots, scroll progress, 3D code window, glass cards, and terminal chrome.
- **Dark / light themes** — preference is remembered with `localStorage`.
- **Fully responsive** — layouts adapt from desktop down to mobile, with a collapsible navigation menu.
- **Detailed sections** — about, skills with proficiency levels, projects, competitive programming, education, and contact.
- **Image-led project cards** — real screenshots for the Doctor Appointment System, Course Registration System, and Competitive Programming Code Library.
- **Working contact flow** — submissions go to a published Google Form and trigger an automatic acknowledgement email to the sender.
- **No build step** — plain HTML, CSS, and JavaScript; no package installation or runtime dependencies.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Structure | HTML5, semantic markup, accessible labels |
| Styling | CSS3, custom properties, Flexbox, Grid, responsive media queries |
| Interaction | Vanilla JavaScript, IntersectionObserver, `localStorage` |
| Forms | Google Forms, Google Apps Script, GmailApp |
| Hosting | GitHub Pages via GitHub Actions |

## Highlights

- **2000+ problems solved** across competitive programming platforms.
- **Codeforces:** [`rudro1866`](https://codeforces.com/profile/rudro1866)
- **Selected projects:**
  - Doctor Appointment Management System — Java, MySQL, Swing, JDBC
  - University Course Registration System — Java, MySQL, Swing, JDBC
  - Competitive Programming Code Library — C++, algorithms, data structures, templates

## Project structure

```text
.
├── .github/
│   └── workflows/
│       └── static.yml      # Builds and deploys the site to GitHub Pages
├── assets/                 # Portrait, project screenshots, Codeforces logo
│   ├── codeforces.svg
│   ├── course.png
│   ├── cpp-library1.png
│   ├── doctor.jpg
│   └── profile.jpg
├── index.html              # Page structure and content
├── styles.css              # Theme, layout, and responsive design
├── script.js               # Theme, menu, animations, and form submission
└── README.md               # This file
```

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Deployment

The repository is configured for GitHub Pages with GitHub Actions as the source.

1. Push changes to `main`.
2. `.github/workflows/static.yml` runs automatically.
3. The workflow uploads the repository root and deploys it to GitHub Pages.

No manual deployment step is required. The live URL is:
https://rudro-debnath-for-real.github.io/portfolio/

## Contact form

The contact form posts directly to the published **Portfolio Contact Form** in Google Forms. Because Google Forms does not send CORS headers, the site submits into a hidden iframe instead of using `fetch()`, so visitors stay on the portfolio page.

A Google Apps Script project named **Portfolio Form Autoreply** is bound to the form. Its installable *On form submit* trigger sends each submitter a confirmation email with their details and a note that a response will follow. Replies are routed to `serenufa.ciba@ugv.edu.bd`.

| Website field | Google Forms entry |
| --- | --- |
| Name | `entry.1367654919` |
| Email | `entry.1750041587` |
| Subject | `entry.595121519` |
| Message | `entry.525533560` |

## Author

**Rudro Debnath**  
CSE Student · Competitive Programmer · Developer

- GitHub: [@rudro-debnath-for-real](https://github.com/rudro-debnath-for-real)
- Codeforces: [rudro1866](https://codeforces.com/profile/rudro1866)
- Email: [serenufa.ciba@ugv.edu.bd](mailto:serenufa.ciba@ugv.edu.bd)
