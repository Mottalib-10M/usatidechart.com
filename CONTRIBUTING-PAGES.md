# Écrire ou étoffer une page de Tide Day (us-tides)

Notice pour les agents qui écrivent ou prolongent le site. À lire en entier, avec
`~/Documents/GitHub/RECETTE-SITE.md` (§0, §6, §6.5, §7, §9.3, §11, §17.4, §21, §26).

Le site : marées des États-Unis par station (92 stations NOAA de plages, passes et ports, 23 États),
courbe du jour et des 7 jours, pleines et basses mers, coefficient (propre au site), lever et coucher
du soleil, lune, périodes solunaires, planificateur (marcher sur la plage, mettre le bateau à l'eau).
**Anglais américain seul**, sous `/en/`. Pieds (`ft`), heure locale de la station, 12 h AM/PM.
Éditeur : **Radif Partners** (jamais un nom de personne, ni photo). Le nom « NOAA » peut figurer
dans le texte comme source, **jamais dans le nom du site ni le logo**. Aucun lien vers un autre
site du portefeuille (`_trame/domaines-ovh.txt`). Avertissement partout : **not for navigation**.

## D'où viennent les chiffres

| Donnée | Source | Fichier |
|---|---|---|
| Pleines et basses mers (heure UTC à la minute, hauteur au centième de pied, au-dessus de MLLW) | API NOAA CO-OPS, `interval=hilo` | `public/data/<état>/<lieu>.json` (`events`) |
| Hauteurs horaires des 77 stations de référence | API NOAA CO-OPS, `interval=h` | même fichier (`hourly`, centièmes de pied) |
| Courbe des 15 stations secondaires | forme de la courbe horaire de la station de référence, recalée sur les pleines et basses mers NOAA (`engine/subordinate.ts`) | même fichier (`shaped: true`) |
| Métadonnées, datums, corrections des stations secondaires | API Metadata CO-OPS | `scripts/data/noaa-stations.json` |
| Soleil, lune, transits (solunaire) | Astronomy Engine (MIT), calculé au build | même fichier (`sky`) |
| Statistiques par station (marnage moyen, vives-eaux, mortes-eaux, type de marée, extrêmes, basses mers négatives) | calculées au build (`engine/stats.ts`) | `src/data/stations.json` |
| Stations NOAA voisines (≤ 12 milles) et leurs corrections | API Metadata CO-OPS | `research/facts/<état>/<lieu>.json` (matière pour les rédacteurs, non publiée telle quelle) |
| Validation de la courbe contre les prédictions NOAA à 6 minutes | `tests/tide.test.ts` | `src/data/validation.json` |

Reconstruire : `python3 scripts/build-tides.py && node scripts/build-sky.mjs && python3 scripts/build-facts.py`
(fenêtre par défaut 2026-10-01 → 2027-12-31 ; `--from`/`--to` pour la suivante ; `--refresh` pour ignorer
le cache `.cache-raw/`). À refaire avant fin 2027, puis relancer `npx vitest run` (les valeurs de
`validation.json` se remesurent avec les fixtures `tests/fixtures/`).

**Conditions de réutilisation (lues le 2026-10-12, https://tidesandcurrents.noaa.gov/disclaimers.html)** :
domaine public ; NOAA demande d'être cité ; interdiction de présenter des données modifiées comme
officielles. D'où la règle : les pleines et basses mers sont celles de NOAA, tout le reste (courbe,
coefficient, fenêtres, solunaire) est présenté comme calcul du site (page méthode, mentions légales).
L'API autorise le CORS (`access-control-allow-origin: *`) ; le site n'en a pas besoin : tout est
précalculé et servi depuis le même domaine. Le dépôt doit être reconstruit régulièrement (GitHub
Actions planifié) pour que « today » reste juste au premier rendu ; le navigateur recalcule de toute
façon l'heure courante après le montage.

## Les fichiers d'une page

| Page | Fichier | Route |
|---|---|---|
| Station (texte écrit à la main) | `src/content/stations/<état>/<lieu>.ts` (`defineStation`) | `/en/<état>/<lieu>/` |
| État | `src/content/states/<état>.ts` (`defineState`) | `/en/<état>/` |
| Guide ou outil | `src/content/pages/<id>.ts` (`definePage`) | `/en/<id>/` |
| Accueil | `src/content/home.ts` | `/en/` |

Modèles : `stations/south-carolina/myrtle-beach.ts`, `states/south-carolina.ts`. Copier la
**structure**, jamais les phrases.

### Page de station

Le composant (`StationPage.astro`) affiche seul : l'outil (courbe, résultat, 7 jours, planificateur),
le chapeau généré depuis les données, les tableaux des plus hautes et plus basses mers, les datums,
les corrections de station secondaire, les voisines, et **3 questions générées**
(`lib/station-text.ts`, marquées `data-chrome`). Titre et description sont générés (50-60 / 150-160) ;
un fichier peut les surcharger (`title`, `description`).

Le fichier écrit à la main apporte ce qui rend la page unique :

| Champ | Règle |
|---|---|
| `key` | `"<état>/<lieu>"`, égal au chemin du fichier |
| `intro` | une phrase sur le lieu et la station (≤ 40 mots) |
| `body(h)` | **210 à 450 mots (viser 280)**, 2 ou 3 `<h2>` **propres au lieu** (jamais le même titre d'une page à l'autre), `<p>`, éventuellement `<ul>` ; chiffres via `h.st(key).stats…`, `h.ft()`, `h.date()` |
| `faqs` | 1 ou 2 questions sur le lieu (le nom du lieu dedans), réponses de 45 à 85 mots, uniques sur le site |
| `extraSources` | facultatif : pages officielles lues (parc d'État, NPS, comté), `{ name, url }` |

### Page d'État

`title`, `description`, `intro`, `resume` (≥ 125 mots, un paragraphe), `body(h)` (230 à 700 mots,
2 à 4 `<h2>` propres à l'État), `faqs` (3 à 5, le nom de l'État dedans), `featured` (station
affichée d'abord). Le tableau des stations est généré.

### Guide ou outil

`id` = `slug` = nom du fichier (liste dans `src/i18n/routes.ts`, `PLANNED`), `group` (`tides`,
`fishing`, `planning`), `order`, `nav`, `card`, `title`, `description`, `h1`, `intro`, `resume`
(≥ 125 mots), `faqs` (4 à 8), `body(h)` (guide ≥ 950 mots de prose, outil ≥ 350), `tool` **ou**
`mini` (`{ kind }` parmi `next`, `height`, `kings`, `lows`, `coef`, `solunar`, `twelfths`, `depth`,
`ramp`, `range` ; `{ kind, arg: { station: '<état>/<lieu>' } }` pour changer la station de départ),
`related` (≥ 3 ids), `sources` (≥ 2 clés de `params-2026.json > sources`). Un second mini dans le
corps : `${h.mini('kind')}`.

### Outils du corps (`h`)

`h.a(id, texte)` lien interne (`st:<état>/<lieu>`, `state:<état>`, id de guide, `method`) ;
`h.st(key)` station (avec `.stats`, `.datums`, `.noaaName`, `.id`) ; `h.inState(état)` ;
`h.extremesOf(keys)` ; `h.ft(x)` « 5.3 ft » ; `h.date(iso)` « October 1, 2027 » ; `h.when(key, t)` ;
`h.table(...)` ; `h.src(clé)` ; `h.ext(url, texte)` ; `h.box(titre, html)`.

## La règle de vérité (non négociable)

- **Aucun chiffre tapé à la main** quand il vient des données : marnage, dates d'extrêmes, hauteurs,
  nombre de jours à basse mer négative → `h.st(key).stats`.
- Les **corrections NOAA** d'une station voisine (`research/facts`) sont relatives à **sa** station de
  référence (`refStationId`), pas à la station de la page : « NOAA predicts X from Y with high water
  N minutes later ».
- **Rien d'invérifiable** : pas de nom de commerce, de loyer de cale, de règlement de pêche, de
  limite de prise, d'horaire de pont, d'espèce « garantie ». Géographie connue et certaine seulement
  (« the pier is on the open Atlantic », « the station is inside the harbor »). Un doute = on ne
  l'écrit pas.
- Jamais de promesse de sécurité ; rappeler que la météo modifie l'eau et que ce n'est pas pour la
  navigation quand le sujet s'y prête.

## Ton

Anglais américain, voix humaine, phrases de longueur variable, le chiffre d'abord. Interdits : tiret
cadratin, « it's important to note », « dive into », « delve », « whether you're », « moreover »,
« furthermore », « nestled », « boasts », « hidden gem », « paradise », « breathtaking »,
conclusions-résumés, émojis. Unicité (§6) : chaque texte parle de son lieu avec son propre
vocabulaire (le type de côte, la passe, la baie, ce que le marnage change là) ; ne reprendre aucune
tournure d'une autre page.

## Contrôles (tous à 0)

```bash
cd ~/Documents/GitHub/a-publier/Mottalib-10M/us-tides
export NODE_PATH=$(npm root -g):$PWD/node_modules
PAGE_FILES=stations/maine/portland npx vitest run tests/pages.test.ts   # une fiche
npx vitest run                                                          # tout
npm run build                                                           # inclut typo-nbsp et check-snippets
python3 scripts/check-seo.py . ; python3 scripts/check-trame.py . ; python3 scripts/check-unique.py dist
python3 scripts/check-simulateurs.py . ; python3 scripts/check-regles.py . ; python3 scripts/check-portefeuille.py .
node scripts/check-sources.mjs . ; node scripts/check-legal.mjs . ; python3 scripts/check-liens.py dist
node scripts/check-contraste.mjs dist ; node scripts/check-saisie.mjs dist --max=60 ; node scripts/check-nombres.mjs dist
node scripts/typo-nbsp.mjs dist --check ; node scripts/check-url-propre.mjs dist ; python3 scripts/check-snippets.py .
python3 scripts/check-cookies.py . ; node scripts/check-premier-ecran.mjs . ; node scripts/check-layout.mjs dist > /tmp/layout-us-tides.log 2>&1 &
```

Serveur local : port **4444** (`npm run preview`). Pour l'arrêter : `lsof -ti tcp:4444 | xargs kill`.

## Ce qu'on ne fait pas

Pas de dépôt GitHub, pas de push, pas de DNS. Ne toucher ni à `_trame` ni à la RECETTE.
`CLARITY_ID` reste vide jusqu'à l'achat du domaine.
