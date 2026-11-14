# Zi Arch Studio — website kit v2 (portfolio 2026)

Material for any website (Framer now, a custom site later), built from **MoJ Portfolio 2026 - Letter v2**.

## Where things are
- On MoJ's computer: `ZI ARCH - Claude\04-Website Kit\`
  - `projects\<NN-name>\originals\` — untouched copies of the source files linked in the portfolio (highest quality available). File names start with the slot number: `03__IMG_0057-Edit.jpg`.
  - `projects\<NN-name>\web\NN.jpg` — web versions: long side max 4000 px, JPG quality 90, sRGB. PDFs (plans, sections, boards) are rendered at 4000 px.
  - `manifest.json` — for every slot: web file, original file, source path in the portfolio folders, pixel size.
  - `projects.json` — all texts: title, subtitle, year, location, studio, supervision, team, introduction, concept, outcome, captions for every image, cover and the 10 images used on the site.
  - `framer_projects.csv`, `framer_artworks_brass.csv` — ready for Framer CMS import.
  - `_scripts\` — `build.py` (rebuilds `web\` from the originals), `selection.json` (which source files are used, in order).
  - `social\og-1200x630.jpg` — social share image (WormFinding model), used as Framer's Social preview.
- Downloads (linked from the About page): `v2/downloads/Mojtaba-Mohammadi-Portfolio-2026.pdf` and `v2/downloads/Mojtaba-Mohammadi-CV-2026.pdf` (phone number removed). To update, replace the file at the same path in the repo; the site links stay the same.
- Online (used by Framer): `https://raw.githubusercontent.com/MOJ70/ziarch-images/main/v2/<NN-name>/NN.jpg` (repo MOJ70/ziarch-images, folder `v2`).

## Replacing an image (e.g. an upscaled version)
1. Keep the slot number. Put the new file in `originals\` (any name starting with the slot, e.g. `03__new.jpg`) and save its web version as `web\03.jpg` (max 4000 px, JPG 90) — or ask Claude to rebuild it.
2. Upload the new `web\03.jpg` to the same path in the GitHub repo; for Framer, re-import the CSV or replace the image in the CMS item.
Because file names never change, a custom site that reads `projects.json` picks up the new image automatically.

## Projects (portfolio order)
01 WormFinding · 02 LA Olympic Museum · 03 LA Train Station · 04 Saleria · 05 Shelter · 06 Performative Vessels · 07 Endemic Architecture · 08 Porta Verde · 09 Harvesting the Future · 10 Sustainable Multidisciplinary Design (Nodo Bovisa) · 11 Topo Bridge · 12 ESTA · 13 Digitalized Versatile Mold · 14 Active Bending Gridshell · 0X Artworks (brass)
