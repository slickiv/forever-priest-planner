# Forever Priest Planner

A static, client-side planner for World of Warcraft: Forever. It has a cloth-only gear planner and a rank-by-rank healing spell reference. No item catalog is copied into this project: the gear planner links to Wowhead's Forever item finder and fetches an entered or equipped item by ID from Wowhead when its stats need filling.

## Run locally

Open `index.html` in a modern browser, or serve this directory with any static file server. Gear plans are stored in the browser's local storage. Use Export / Import to move a set between browsers.

## Publish with GitHub Pages

This repository is plain HTML, CSS, and JavaScript. In GitHub, open **Settings → Pages**, choose **GitHub Actions** as the build source, then add the provided workflow. GitHub Pages will publish each push to `main`.

## Spell values and calculations

The spell rank records use the Forever-specific class spellbook from [Warcraft Forever](https://warcraftforever.games/classes/priest/spells), cross-checked against [Priest healing notes](https://lorddemonos.github.io/wow-forever/healing/priest/) and [Forever Mastery's downrank calculator](https://forevermastery.com/en/tools/downrank). Ranged tooltip heals use their exact arithmetic average. Values use the rank's learned-level baseline. Desperate Prayer and Divine Grace show 0 mana because the Forever spell records list no mana cost. Circle of Healing uses Wowhead's level-60 healing formula and 0.214 bonus-healing coefficient; its range endpoints are averaged for throughput. Its 56% base-mana cost is converted using a 1,376 level-60 Priest base-mana baseline, then floored to match in-game percentage-cost rounding. This is an explicit level-60 assumption because Circle of Healing has one rank but scales with character level. The UI links each rank to its Wowhead Forever spell page.

For coefficient assumptions and cross-checks, see [Forever Mastery's downrank calculator](https://forevermastery.com/en/tools/downrank) and [Priest healing notes](https://lorddemonos.github.io/wow-forever/healing/priest/). These are community references, not Blizzard-published calculators. The records currently describe Forever client build 1.60.1.70790; recheck after spell balance updates.

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
