# Morakins FiveM Hub

Portfolio website for Morakins FiveM Hub. Plain HTML, CSS and JavaScript. No build step and no dependencies.

Live site: `https://morakinselijah-ux.github.io/Morakins-fiveM-hub/`

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Page shell (all pages load here, routed by `#/vehicles`, `#/chains`, ...) |
| `config.js` | Brand name, logo, Discord invite, form endpoint, social links |
| `data.js` | Portfolio projects and chain images |
| `app.js` | Routing, filters, modals, assistant, form |
| `styles.css` | Styling |
| `assets/` | Logo and optimized images |

## Add a project

1. Put a `.webp` image in `assets/img/`.
2. Add an entry to `PORTFOLIO` in `data.js` with `category` set to `Vehicles`, `Chains`, `Peds`, `Maps`, `Clothing` or `MLOs`.
3. Commit and push. The site updates in about a minute.

## Connect the request form

Set `formEndpoint` in `config.js` to a POST URL (for example a Formspree or Getform endpoint). Without it, the form copies the request to the visitor's clipboard.

## Content notes

Image ownership for supplied portfolio material is not verified. Do not present other creators' work as Morakins work without permission.
