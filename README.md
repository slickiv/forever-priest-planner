# Forever Priest Planner

A static, client-side planner for World of Warcraft: Forever. It has a cloth-only gear planner and a rank-by-rank healing spell reference. No item catalog is copied into this project: the gear planner links to Wowhead's Forever item finder and fetches an entered or equipped item by ID from Wowhead when its stats need filling.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. Gear plans are stored in the browser's local storage. Use Import Armory with a character name to load equipped gear from the public WoW Forever US profile; non-Priest profiles are rejected.

## Publish with GitHub Pages

This repository is plain HTML, CSS, and JavaScript. In GitHub, open **Settings → Pages**, choose **GitHub Actions** as the build source, then add the provided workflow. GitHub Pages will publish each push to `main`.

## Spell values and calculations

The spell rank records use the Forever-specific Priest spellbook for [client build 1.60.1.70862](https://theforeverera.com/en/spells/priest/), cross-checked against [ForeverChanges' downrank calculator](https://foreverchanges.pro/downrank-calculator). Variable heals use the exact client range endpoints at the rank's learned level. Gear bonus healing is added to both endpoints; throughput and efficiency use their arithmetic midpoint. Desperate Prayer and Divine Grace show 0 mana because the Forever spell records list no mana cost. Circle of Healing uses Wowhead's level-60 healing formula and 0.214 bonus-healing coefficient; its formula endpoints are shown and their midpoint is used for throughput. Its 56% base-mana cost is converted using a 1,376 level-60 Priest base-mana baseline, then floored to match in-game percentage-cost rounding. This is an explicit level-60 assumption because Circle of Healing has one rank but scales with character level. The UI links each rank to its Wowhead Forever spell page.


The rank label also shows its training price from [Warcraft Forever's Priest spell recorder](https://warcraftforever.games/classes/priest/spells), which reports observed in-game trainer prices. A dash in that source is displayed as “Free.”

The range dataset currently describes Forever client build 1.60.1.70862; recheck it after spell balance updates. Rank base ranges are the client values at the level each rank is learned. Character-level growth after learning and talent multipliers are not applied.

- Direct healing bonus: bonus healing × the spell's base cast-time coefficient (cast time ÷ 3.5). The coefficient is 0.429 for a 1.5 second spell and 0.857 for a 3 second spell. Lesser Heal uses its rank-specific coefficients: 0.429, 0.571, and 0.714.
- Renew: uses its full listed heal value and a 1.5 second GCD for cast throughput; the 15 second tick duration is called out separately.
- Instant spells: use a 1.5 second GCD as the cast-time denominator.
- Penance: total healing across three bolts, divided by its 2 second channel; no bonus-healing share is published.
- Prayer of Healing, Holy Nova, and Circle of Healing: show per-target healing and an adjustable party total. Binding Heal totals both recipients.
- Power Word: Shield: shows absorb per cast time and per mana; its bonus uses bonus healing × 10%.
- HPM uses total healing for a cast divided by the adjusted displayed mana cost. Improved Healing applies only to Lesser Heal, Heal, Greater Heal, Penance, and Prayer of Mending.

These are theoretical values before talents other than the optional Improved Healing discount, critical heals, overhealing, or target-specific effects. Gear stats are saved locally. Armory item stat arrays can omit equip effects such as bonus healing; the import fills those missing healing stats from Wowhead's item XML by item ID. Existing saved items with unknown, zero, or missing-name healing data are refreshed from Wowhead when the planner opens.

## GitHub Pages workflow

The workflow publishes the repository root without a build step.
