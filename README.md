# Sculpteur sur bois — Website

Hand-carved wooden art · Marrakech. Bilingual (English / Français), no prices, mobile-friendly.

## Put it on GitHub Pages (free hosting)

1. **Create a GitHub account** at https://github.com (if you don't have one).
2. **Create a new repository**:
   - Click **+** (top right) → **New repository**
   - Name it `sculpteur-sur-bois` (or anything you like)
   - Make it **Public**
   - Click **Create repository**
3. **Upload these files**:
   - Click **uploading an existing file**
   - Drag **everything inside this folder** (`index.html`, the `assets` folder, `README.md`) — keep the folder structure as it is
   - Click **Commit changes**
4. **Turn on GitHub Pages**:
   - Go to **Settings** → **Pages** (left sidebar)
   - Under **Build and deployment → Branch**, choose `main` and `/ (root)`
   - Click **Save**
5. Wait ~1 minute. Your site will be live at:
   `https://YOUR-USERNAME.github.io/sculpteur-sur-bois/`

## Preview on your computer first

- **Easiest:** double-click `index.html` — it opens in your browser.
- **Better (recommended):** run a tiny local server so everything loads exactly like online:
  - Windows (PowerShell): `python -m http.server 8000` then open http://localhost:8000
  - Mac: `python3 -m http.server 8000` then open http://localhost:8000

## What's inside

| File / folder | What it is |
|---|---|
| `index.html` | The whole page (text in English + French) |
| `assets/css/style.css` | All the design |
| `assets/js/main.js` | Gallery, filters, language switch, animations |
| `assets/js/products.js` | The list of 79 products (names in EN/FR) |
| `assets/img/cut/` | 79 product photos with backgrounds removed |
| `assets/img/scenes/` | Workshop, entrance & interior photos |
| `assets/img/logo.webp` | Shop logo |

## Change the contact info

Open `index.html` in any text editor and search for:
- `212688123869` → phone / WhatsApp number
- `Khaymane873@gmail.com` → email
- `maps.app.goo.gl/8DvNpqyf5EvPyAWTA` → Google Maps link

To change a product name, open `assets/js/products.js` and edit the `en:` / `fr:` text.

© 2026 Sculpteur sur bois — N°19 Ensemble Artisanal, Marrakech
