# Morakins FiveM Hub

Portfolio website for Morakins FiveM Hub. Plain HTML, CSS and JavaScript. No build step.

Live site: https://morakinselijah-ux.github.io/Morakins-fiveM-hub/

## Pages
Home, Portfolio, and one page per category: Vehicles, Liveries, Chains, Peds, Clothing, Weapons, Props, Maps, Logos & intros and MLOs (empty until MLO images are added). Plus About and Contact.

## Structure
| Path | Purpose |
| --- | --- |
| `index.html` | Page shell (pages are routed by `#/vehicles`, `#/chains`, ...) |
| `config.js` | Brand, logo, Discord invite, contact email, form endpoint, categories |
| `data.js` | All portfolio projects and chain images |
| `reviews.json` | Approved buyer reviews (edit this file to publish a review) |
| `services.js` | Services (Server Optimization & Fixes, LSPDR FiveM PD), buyer reviews, generic illustrations |
| `app.js` | Routing, filters, modals, video player, assistant, form |
| `styles.css` | Styling |
| `check.html` | Open /check.html on the live site to test that all images are uploaded |
| `assets/logo` | Morakins logo |
| `assets/img/<category>` | Optimized images, one folder per category |
| `assets/video` | Compressed MP4 videos |

## Add a project
1. Put a `.webp` image in `assets/img/<category>/`.
2. Add an entry to `PORTFOLIO` in `data.js` (copy an existing one). Set `category` to one of: Vehicles, Liveries, Chains, Peds, Clothing, Weapons, Props, Maps, Logos, MLOs.
3. Commit and push. The site updates in about a minute.

## Publish an approved buyer review
Buyers send reviews by email to the address in `config.js`. The email ends with a line that starts with `{"name":`. To approve a review, open `reviews.json` on GitHub, click the pencil icon, paste that line between the square brackets (put a comma between two reviews) and commit. It appears on the Home and Reviews pages within about a minute. Never add invented reviews.

Example `reviews.json` with two reviews:
```
[
{"name":"Buyer one","rating":5,"text":"What they said.","service":"Vehicles"},
{"name":"Buyer two","rating":4,"text":"What they said.","service":"Chains"}
]
```

## Content notes
Ownership of the supplied portfolio material is not verified. Some previews show other creators' names. See the Source field on each project.
