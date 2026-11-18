# Syfer

Personal link page. Static site, no build step, no dependencies to install.

## Files

| File | Responsibility |
|------|----------------|
| `index.html` | Markup only (structure + content) |
| `styles.css` | All styling |
| `app.js` | Renders the Socials / Trading cards and the copy-code button |
| `face.webp` | Avatar + favicon |

Edit the links in `app.js` (`SOCIALS`, `TRADING`, `REFERRAL_CODE`) — no other file needs to change for new links.

## Run locally

Because of the Content-Security-Policy, open it through a local server (not `file://`):

```bash
cd syfer-site
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Deploy on GitHub Pages

1. Push this folder's contents to the repository root.
2. Repo → Settings → Pages → Build and deployment → Source: **Deploy from a branch** → `main` / `/ (root)`.
3. The site goes live at `https://<user>.github.io/<repo>/`.

For a custom domain, add a `CNAME` file containing the domain and set the DNS records in your registrar.

## Security notes

- Strict CSP (`default-src 'self'`); only Google Fonts is allowed off-origin.
- All external links use `rel="noopener noreferrer"`.
- No inline scripts, no trackers, no secrets in the repo.
