# Rudro Debnath — combined portfolio

A single static portfolio built from the two original sites:

- **Content / information** comes from the live site (`https://merudro.vercel.app/`): biography,
  stats, skills and proficiency levels, three projects with their screenshots, competitive
  programming profiles and expertise taxonomy, full education timeline, contact details and the
  contact details.
- **Design** combines both sites: the live site's animated grid hero, floating dots, scroll
  progress bar, 3D code window, image-led project cards and detailed CP/education sections, plus
  the local site's `<Rudro.dev/>` brand, status badge, terminal chrome and compilation footer,
  glass cards, theme toggle, toast notifications and back-to-top button.

The earlier redesign that already existed in the parent `Portfolio` folder was left untouched.

## Live site

Deployed with GitHub Pages at:
`https://rudro-debnath-for-real.github.io/portfolio/`

Pushes to `main` trigger the existing `.github/workflows/static.yml` workflow, which publishes the
repository root to GitHub Pages.

## Run locally

Open `index.html` directly, or serve this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | All page content and structure (works without JavaScript) |
| `styles.css` | Design tokens, dark/light themes, layout and responsive rules |
| `script.js` | Theme toggle, mobile menu, typing text, counters, skill bars, scroll effects, form |
| `assets/` | Portrait, project screenshots and Codeforces logo copied from the live site |

## Notes

- The contact form posts into the owner's Google Form, **Portfolio Contact Form**
  (`https://docs.google.com/forms/d/e/1FAIpQLSfhNGzKnxuEwxhkM_1gdvDm1qdZPmqodgmfghb13sQrZBk4ow/viewform`).
  Responses appear under the form's **Responses** tab (and can be linked to a Google Sheet).
  Google Forms does not allow cross-origin `fetch()`, so the site submits the form into a hidden
  iframe after client-side validation; the visitor stays on the page.

### Google Form field mapping

| Website field | Google Forms entry |
| --- | --- |
| Name | `entry.1367654919` |
| Email | `entry.1750041587` |
| Subject | `entry.595121519` |
| Message | `entry.525533560` |

### Automatic confirmation email

A Google Apps Script named **Portfolio Form Autoreply** is bound to the form. Its installable
`onFormSubmit` trigger sends each submitter a short acknowledgement from Rudro's Gmail; replies go
to `serenufa.ciba@ugv.edu.bd`. The trigger is already installed, so no action is needed when the
site is deployed.

- Theme choice is saved in `localStorage`.
- No build step, no runtime dependencies; ready for GitHub Pages, Vercel or Netlify.
