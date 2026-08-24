# 🧠 Beyond Normal

**Beyond Normal** is a philosophy, a training method, and a refusal to settle.  
Strength over comfort. Clarity over distraction. Sovereignty of body, mind, and spirit.

---

## 🌐 Live Site

👉 [https://pjcrouse.github.io/beyondnormal.github.io/index.html](https://pjcrouse.github.io/beyondnormal.github.io/index.html)

---

## 🧩 About This Repo

This repository hosts the **Beyond Normal** public web pages, served via **GitHub Pages**.  
It includes the main site and supporting sections like:

- **index.html** — Landing page for the Beyond Normal Strength app and philosophy
- **philosophy.html** — Brand ethos, core tenets, and guiding principles
- **privacy/** — Privacy policy for the Strength app
- **support.html** — Contact and support information
- **spendcopilot/** — The SpendCopilot product page and its own privacy, terms and support

All content is static HTML/CSS with no external dependencies.

---

## 🎨 Brand Palette

| Name        | Hex       | Purpose                |
|--------------|-----------|------------------------|
| Brand Orange | `#e55722` | Energy, focus, action  |
| Teal         | `#2c7f7a` | Balance, calm, clarity |
| Ink          | `#0f0f0f` | Primary text           |
| Ink Muted    | `#36454f` | Secondary text         |
| Background   | `#fafaf0` | Neutral canvas         |

### SpendCopilot accent

Sampled from the shipping app UI, not invented. Used only under `/spendcopilot/`.

| Name           | Hex       | Purpose                                  |
|----------------|-----------|------------------------------------------|
| SC Blue        | `#6d7cff` | Product accent on dark surfaces          |
| SC Blue Deep   | `#3b49d6` | Accent on the cream background (6.3:1)   |
| SC Cyan        | `#00d2e0` | Positive state ("on track")              |
| Night          | `#05070f` | Near-black hero / dark sections          |

---

## 🧱 Structure

```
beyondnormal.github.io/
├── index.html              # Strength landing page (currently the site root)
├── philosophy.html         # Beyond Normal philosophy
├── privacy/                # Strength privacy policy
├── terms.html              # Strength terms of service
├── support.html            # Strength support & contact
├── bar-path/ plates/ 1rm/  # Free tools (App Clip pages)
├── spendcopilot/           # SpendCopilot product site
│   ├── index.html          #   product page
│   ├── privacy/            #   SpendCopilot privacy policy
│   ├── terms/              #   SpendCopilot terms (pre-release)
│   ├── support/            #   SpendCopilot support
│   └── og-card.html        #   render source for assets/og-spendcopilot.png
├── strength/               # RESERVED — redirects to / for now (see below)
├── assets/                 # images, icons, shared CSS/JS
└── README.md               # You are here
```

### Route plan (multi-product)

Beyond Normal is becoming a parent brand with more than one product. The URL
structure is being staged so the move can happen without breaking links:

| Route            | Today                                   | Eventually                              |
|------------------|-----------------------------------------|-----------------------------------------|
| `/`              | The Strength product landing page       | Beyond Normal parent / product index    |
| `/strength/`     | Reserved; `noindex` redirect to `/`     | The Strength product landing page       |
| `/spendcopilot/` | The SpendCopilot product site           | unchanged                               |

To promote `/strength/` later: move the current `index.html` into it, delete the
redirect, drop the `noindex`, and point the canonical at the new URL. Nothing
about the root's current positioning has been changed yet.

### Shared styles

`assets/tools.css` is the shared design system (nav, page hero, cards, steps,
buttons, signup band, footer). Product pages layer a theme on top of it:

```html
<link rel="stylesheet" href="/assets/tools.css">
<link rel="stylesheet" href="/assets/spendcopilot.css">   <!-- SpendCopilot only -->
```

`assets/spendcopilot.css` swaps the accent to SpendCopilot blue and adds the
dark hero / feature / mock-card components. `tools.css` itself is never
product-specific, so the Strength pages are unaffected by it.

---

## 🚀 Local Preview

If you want to preview changes locally before pushing to GitHub Pages:

```bash
# Clone the repo
git clone https://github.com/pjcrouse/beyondnormal.github.io.git
cd beyondnormal.github.io

# Serve locally (Python 3)
python3 -m http.server 8000
```

Then open:
```
http://localhost:8000/index.html            # Strength (site root)
http://localhost:8000/spendcopilot/         # SpendCopilot product page
http://localhost:8000/spendcopilot/privacy/ # SpendCopilot privacy policy
```

---

## 🔥 Credits

Created by [Patrick Crouse](https://github.com/pjcrouse).  
Part of the **Beyond Normal** ecosystem — engineered intentionally.

---
