# Morakins FiveM Hub

Portfolio website for Morakins FiveM Hub. Plain HTML, CSS and JavaScript. No build step.

Live site: https://morakinselijah-ux.github.io/Morakins-fiveM-hub/

## Pages
Home, Portfolio, and one page per category: Vehicles, Liveries, Chains, Peds, Clothing, Weapons, Props, Maps, Logos & intros and MLOs (empty until MLO images are added). Plus About and Contact.

## Structure
| Path | Purpose |
| --- | --- |
| `index.html` | Page shell (pages are routed by `#/vehicles`, `#/chains`, ...) |
| `config.js` | Brand, logo, Discord invite, form endpoint, categories |
| `data.js` | All portfolio projects and chain images |
| `app.js` | Routing, filters, modals, video player, assistant, form |
| `styles.css` | Styling |
| `assets/logo` | Morakins logo |
| `assets/img/<category>` | Optimized images, one folder per category |
| `assets/video` | Compressed MP4 videos |

## Add a project
1. Put a `.webp` image in `assets/img/<category>/`.
2. Add an entry to `PORTFOLIO` in `data.js` (copy an existing one). Set `category` to one of: Vehicles, Liveries, Chains, Peds, Clothing, Weapons, Props, Maps, Logos, MLOs.
3. Commit and push. The site updates in about a minute.

## Content notes
Ownership of the supplied portfolio material is not verified. Some previews show other creators' names. See the Source field on each project.
