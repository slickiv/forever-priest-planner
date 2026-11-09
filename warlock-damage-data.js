// Warlock rank tooltips and levels are from The Forever Era build 1.60.1.70862; client effect records are from Wago DB2 build 1.60.1.70862 (2026-11-09). Rain of Fire base totals are the server-resolved current-build tooltip values; no spell-power coefficient is inferred. Wowhead Forever links are generated per spell rank.
window.WARLOCK_DAMAGE_SPELLS = [
  {
    "name": "Immolate",
    "school": "Fire",
    "kind": "direct-dot",
    "class": "Warlock",
    "tree": "Destruction",
    "ranks": [
      {
        "rank": 1,
        "level": 1,
        "id": 348,
        "mana": 25,
        "castSeconds": 2.0,
        "cooldown": 0.0,
        "duration": 15.0,
        "tooltip": "Burns the enemy for 8 Fire damage and then an additional 15 Fire damage over 15 sec.",
        "effects": [
          {
            "id": 679468,
            "owner": 348,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 3000,
            "basePoints": 3.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 1,
            "maxLevel": 5,
            "spellPowerCoefficient": 0.12999999523
          },
          {
            "id": 679469,
            "owner": 348,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 8.0,
            "perLevel": 0.69999998808,
            "variance": 0.0,
            "baseLevel": 1,
            "maxLevel": 5,
            "spellPowerCoefficient": 0.20000000298
          }
        ]
      },
      {
        "rank": 2,
        "level": 10,
        "id": 707,
        "mana": 45,
        "castSeconds": 2.0,
        "cooldown": 0.0,
        "duration": 15.0,
        "tooltip": "Burns the enemy for 17 Fire damage and then an additional 30 Fire damage over 15 sec.",
        "effects": [
          {
            "id": 679276,
            "owner": 707,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 3000,
            "basePoints": 6.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 10,
            "maxLevel": 15,
            "spellPowerCoefficient": 0.12999999523
          },
          {
            "id": 679277,
            "owner": 707,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 17.0,
            "perLevel": 0.80000001192,
            "variance": 0.0,
            "baseLevel": 10,
            "maxLevel": 15,
            "spellPowerCoefficient": 0.20000000298
          }
        ]
      },
      {
        "rank": 3,
        "level": 20,
        "id": 1094,
        "mana": 90,
        "castSeconds": 2.0,
        "cooldown": 0.0,
        "duration": 15.0,
        "tooltip": "Burns the enemy for 32 Fire damage and then an additional 60 Fire damage over 15 sec.",
        "effects": [
          {
            "id": 679325,
            "owner": 1094,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 3000,
            "basePoints": 12.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 20,
            "maxLevel": 25,
            "spellPowerCoefficient": 0.12999999523
          },
          {
            "id": 679326,
            "owner": 1094,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 32.0,
            "perLevel": 1.20000004768,
            "variance": 0.0,
            "baseLevel": 20,
            "maxLevel": 25,
            "spellPowerCoefficient": 0.20000000298
          }
        ]
      },
      {
        "rank": 4,
        "level": 30,
        "id": 2941,
        "mana": 155,
        "castSeconds": 2.0,
        "cooldown": 0.0,
        "duration": 15.0,
        "tooltip": "Burns the enemy for 56 Fire damage and then an additional 95 Fire damage over 15 sec.",
        "effects": [
          {
            "id": 680592,
            "owner": 2941,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 3000,
            "basePoints": 19.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 30,
            "maxLevel": 35,
            "spellPowerCoefficient": 0.12999999523
          },
          {
            "id": 680593,
            "owner": 2941,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 56.0,
            "perLevel": 1.5,
            "variance": 0.0,
            "baseLevel": 30,
            "maxLevel": 35,
            "spellPowerCoefficient": 0.20000000298
          }
        ]
      },
      {
        "rank": 5,
        "level": 40,
        "id": 11665,
        "mana": 220,
        "castSeconds": 2.0,
        "cooldown": 0.0,
        "duration": 15.0,
        "tooltip": "Burns the enemy for 72 Fire damage and then an additional 125 Fire damage over 15 sec.",
        "effects": [
          {
            "id": 689723,
            "owner": 11665,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 3000,
            "basePoints": 25.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 40,
            "maxLevel": 45,
            "spellPowerCoefficient": 0.12999999523
          },
          {
            "id": 689724,
            "owner": 11665,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 72.0,
            "perLevel": 1.60000002384,
            "variance": 0.0,
            "baseLevel": 40,
            "maxLevel": 45,
            "spellPowerCoefficient": 0.20000000298
          }
        ]
      },
      {
        "rank": 6,
        "level": 50,
        "id": 11667,
        "mana": 295,
        "castSeconds": 2.0,
        "cooldown": 0.0,
        "duration": 15.0,
        "tooltip": "Burns the enemy for 106 Fire damage and then an additional 190 Fire damage over 15 sec.",
        "effects": [
          {
            "id": 689822,
            "owner": 11667,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 3000,
            "basePoints": 38.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 50,
            "maxLevel": 55,
            "spellPowerCoefficient": 0.12999999523
          },
          {
            "id": 689823,
            "owner": 11667,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 106.0,
            "perLevel": 1.89999997616,
            "variance": 0.0,
            "baseLevel": 50,
            "maxLevel": 55,
            "spellPowerCoefficient": 0.20000000298
          }
        ]
      },
      {
        "rank": 7,
        "level": 60,
        "id": 11668,
        "mana": 370,
        "castSeconds": 2.0,
        "cooldown": 0.0,
        "duration": 15.0,
        "tooltip": "Burns the enemy for 146 Fire damage and then an additional 260 Fire damage over 15 sec.",
        "effects": [
          {
            "id": 689824,
            "owner": 11668,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 3000,
            "basePoints": 52.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 60,
            "maxLevel": 65,
            "spellPowerCoefficient": 0.12999999523
          },
          {
            "id": 689825,
            "owner": 11668,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 146.0,
            "perLevel": 2.29999995232,
            "variance": 0.0,
            "baseLevel": 60,
            "maxLevel": 65,
            "spellPowerCoefficient": 0.20000000298
          }
        ]
      },
      {
        "rank": 8,
        "level": 60,
        "id": 25309,
        "mana": 380,
        "castSeconds": 2.0,
        "cooldown": 0.0,
        "duration": 15.0,
        "tooltip": "Burns the enemy for 158 Fire damage and then an additional 275 Fire damage over 15 sec.",
        "effects": [
          {
            "id": 701695,
            "owner": 25309,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 3000,
            "basePoints": 55.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 60,
            "maxLevel": 65,
            "spellPowerCoefficient": 0.12999999523
          },
          {
            "id": 701696,
            "owner": 25309,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 158.0,
            "perLevel": 2.29999995232,
            "variance": 0.0,
            "baseLevel": 60,
            "maxLevel": 65,
            "spellPowerCoefficient": 0.20000000298
          }
        ]
      }
    ],
    "talentSetting": null,
    "periodicCanCrit": true
  },
  {
    "name": "Shadow Bolt",
    "school": "Shadow",
    "kind": "direct",
    "class": "Warlock",
    "tree": "Destruction",
    "ranks": [
      {
        "rank": 1,
        "level": 1,
        "id": 686,
        "mana": 25,
        "castSeconds": 1.7,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Sends a shadowy bolt at the enemy, causing 11 to 15 Shadow damage.",
        "effects": [
          {
            "id": 679275,
            "owner": 686,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 13.0,
            "perLevel": 0.20000000298,
            "variance": 0.28571429849,
            "baseLevel": 1,
            "maxLevel": 5,
            "spellPowerCoefficient": 0.48600000143
          }
        ]
      },
      {
        "rank": 2,
        "level": 6,
        "id": 695,
        "mana": 40,
        "castSeconds": 2.2,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Sends a shadowy bolt at the enemy, causing 20 to 26 Shadow damage.",
        "effects": [
          {
            "id": 679265,
            "owner": 695,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 23.0,
            "perLevel": 0.30000001192,
            "variance": 0.23076923192,
            "baseLevel": 6,
            "maxLevel": 11,
            "spellPowerCoefficient": 0.62900000811
          }
        ]
      },
      {
        "rank": 3,
        "level": 12,
        "id": 705,
        "mana": 70,
        "castSeconds": 2.8,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Sends a shadowy bolt at the enemy, causing 37 to 43 Shadow damage.",
        "effects": [
          {
            "id": 688390,
            "owner": 705,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 40.0,
            "perLevel": 0.60000002384,
            "variance": 0.15384615958,
            "baseLevel": 12,
            "maxLevel": 17,
            "spellPowerCoefficient": 0.80000001192
          }
        ]
      },
      {
        "rank": 4,
        "level": 20,
        "id": 1088,
        "mana": 110,
        "castSeconds": 3.0,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Sends a shadowy bolt at the enemy, causing 54 to 62 Shadow damage.",
        "effects": [
          {
            "id": 679838,
            "owner": 1088,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 58.0,
            "perLevel": 0.80000001192,
            "variance": 0.13043478131,
            "baseLevel": 20,
            "maxLevel": 25,
            "spellPowerCoefficient": 0.85699999332
          }
        ]
      },
      {
        "rank": 5,
        "level": 28,
        "id": 1106,
        "mana": 160,
        "castSeconds": 3.0,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Sends a shadowy bolt at the enemy, causing 73 to 83 Shadow damage.",
        "effects": [
          {
            "id": 680338,
            "owner": 1106,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 78.0,
            "perLevel": 1.20000004768,
            "variance": 0.13157895207,
            "baseLevel": 28,
            "maxLevel": 33,
            "spellPowerCoefficient": 0.85699999332
          }
        ]
      },
      {
        "rank": 6,
        "level": 36,
        "id": 7641,
        "mana": 210,
        "castSeconds": 3.0,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Sends a shadowy bolt at the enemy, causing 95 to 107 Shadow damage.",
        "effects": [
          {
            "id": 685444,
            "owner": 7641,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 101.0,
            "perLevel": 1.20000004768,
            "variance": 0.11981566995,
            "baseLevel": 36,
            "maxLevel": 41,
            "spellPowerCoefficient": 0.85699999332
          }
        ]
      },
      {
        "rank": 7,
        "level": 44,
        "id": 11659,
        "mana": 265,
        "castSeconds": 3.0,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Sends a shadowy bolt at the enemy, causing 133 to 149 Shadow damage.",
        "effects": [
          {
            "id": 689845,
            "owner": 11659,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 141.0,
            "perLevel": 1.39999997616,
            "variance": 0.11409395933,
            "baseLevel": 44,
            "maxLevel": 49,
            "spellPowerCoefficient": 0.85699999332
          }
        ]
      },
      {
        "rank": 8,
        "level": 52,
        "id": 11660,
        "mana": 315,
        "castSeconds": 3.0,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Sends a shadowy bolt at the enemy, causing 180 to 202 Shadow damage.",
        "effects": [
          {
            "id": 689793,
            "owner": 11660,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 191.0,
            "perLevel": 1.60000002384,
            "variance": 0.11023622006,
            "baseLevel": 52,
            "maxLevel": 57,
            "spellPowerCoefficient": 0.85699999332
          }
        ]
      },
      {
        "rank": 9,
        "level": 60,
        "id": 11661,
        "mana": 370,
        "castSeconds": 3.0,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Sends a shadowy bolt at the enemy, causing 237 to 265 Shadow damage.",
        "effects": [
          {
            "id": 689818,
            "owner": 11661,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 251.0,
            "perLevel": 1.79999995232,
            "variance": 0.10810811073,
            "baseLevel": 60,
            "maxLevel": 65,
            "spellPowerCoefficient": 0.85699999332
          }
        ]
      },
      {
        "rank": 10,
        "level": 60,
        "id": 25307,
        "mana": 380,
        "castSeconds": 3.0,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Sends a shadowy bolt at the enemy, causing 253 to 283 Shadow damage.",
        "effects": [
          {
            "id": 701694,
            "owner": 25307,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 268.0,
            "perLevel": 1.89999997616,
            "variance": 0.10980392247,
            "baseLevel": 60,
            "maxLevel": 65,
            "spellPowerCoefficient": 0.85699999332
          }
        ]
      }
    ],
    "talentSetting": null,
    "periodicCanCrit": false
  },
  {
    "name": "Searing Pain",
    "school": "Fire",
    "kind": "direct",
    "class": "Warlock",
    "tree": "Destruction",
    "ranks": [
      {
        "rank": 1,
        "level": 18,
        "id": 5676,
        "mana": 45,
        "castSeconds": 1.5,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Inflict searing pain on the enemy target, causing 21 to 25 Fire damage. Causes a high amount of threat.",
        "effects": [
          {
            "id": 684613,
            "owner": 5676,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 23.0,
            "perLevel": 0.60000002384,
            "variance": 0.21052631736,
            "baseLevel": 18,
            "maxLevel": 24,
            "spellPowerCoefficient": 0.42899999022
          }
        ]
      },
      {
        "rank": 2,
        "level": 26,
        "id": 17919,
        "mana": 68,
        "castSeconds": 1.5,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Inflict searing pain on the enemy target, causing 30 to 36 Fire damage. Causes a high amount of threat.",
        "effects": [
          {
            "id": 695383,
            "owner": 17919,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 33.0,
            "perLevel": 0.69999998808,
            "variance": 0.18461538851,
            "baseLevel": 26,
            "maxLevel": 32,
            "spellPowerCoefficient": 0.42899999022
          }
        ]
      },
      {
        "rank": 3,
        "level": 34,
        "id": 17920,
        "mana": 91,
        "castSeconds": 1.5,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Inflict searing pain on the enemy target, causing 40 to 48 Fire damage. Causes a high amount of threat.",
        "effects": [
          {
            "id": 695384,
            "owner": 17920,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 44.0,
            "perLevel": 0.80000001192,
            "variance": 0.1894736886,
            "baseLevel": 34,
            "maxLevel": 40,
            "spellPowerCoefficient": 0.42899999022
          }
        ]
      },
      {
        "rank": 4,
        "level": 42,
        "id": 17921,
        "mana": 118,
        "castSeconds": 1.5,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Inflict searing pain on the enemy target, causing 56 to 68 Fire damage. Causes a high amount of threat.",
        "effects": [
          {
            "id": 694810,
            "owner": 17921,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 62.0,
            "perLevel": 0.89999997616,
            "variance": 0.17910447717,
            "baseLevel": 42,
            "maxLevel": 48,
            "spellPowerCoefficient": 0.42899999022
          }
        ]
      },
      {
        "rank": 5,
        "level": 50,
        "id": 17922,
        "mana": 141,
        "castSeconds": 1.5,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Inflict searing pain on the enemy target, causing 78 to 92 Fire damage. Causes a high amount of threat.",
        "effects": [
          {
            "id": 694811,
            "owner": 17922,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 85.0,
            "perLevel": 1.0,
            "variance": 0.17341040075,
            "baseLevel": 50,
            "maxLevel": 56,
            "spellPowerCoefficient": 0.42899999022
          }
        ]
      },
      {
        "rank": 6,
        "level": 58,
        "id": 17923,
        "mana": 168,
        "castSeconds": 1.5,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Inflict searing pain on the enemy target, causing 105 to 123 Fire damage. Causes a high amount of threat.",
        "effects": [
          {
            "id": 694812,
            "owner": 17923,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 114.0,
            "perLevel": 1.20000004768,
            "variance": 0.16216215491,
            "baseLevel": 58,
            "maxLevel": 64,
            "spellPowerCoefficient": 0.42899999022
          }
        ]
      }
    ],
    "talentSetting": null,
    "periodicCanCrit": false
  },
  {
    "name": "Rain of Fire",
    "school": "Fire",
    "kind": "aoe-dot",
    "class": "Warlock",
    "tree": "Destruction",
    "ranks": [
      {
        "rank": 1,
        "level": 20,
        "id": 5740,
        "mana": 295,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 8.0,
        "tooltip": "Calls down a fiery rain to burn enemies in the area of effect for 160 Fire damage over 8 sec.",
        "effects": [
          {
            "id": 1296110,
            "owner": 5740,
            "type": "A_PERIODIC_DAMAGE",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 2000,
            "basePoints": 0.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 20,
            "maxLevel": 25,
            "spellPowerCoefficient": 0.0
          }
        ],
        "tooltipDamageTotal": 160
      },
      {
        "rank": 2,
        "level": 34,
        "id": 6219,
        "mana": 605,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 8.0,
        "tooltip": "Calls down a fiery rain to burn enemies in the area of effect for 364 Fire damage over 8 sec.",
        "effects": [
          {
            "id": 1296175,
            "owner": 6219,
            "type": "A_PERIODIC_DAMAGE",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 2000,
            "basePoints": 0.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 34,
            "maxLevel": 39,
            "spellPowerCoefficient": 0.0
          }
        ],
        "tooltipDamageTotal": 364
      },
      {
        "rank": 3,
        "level": 46,
        "id": 11677,
        "mana": 885,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 8.0,
        "tooltip": "Calls down a fiery rain to burn enemies in the area of effect for 596 Fire damage over 8 sec.",
        "effects": [
          {
            "id": 1296177,
            "owner": 11677,
            "type": "A_PERIODIC_DAMAGE",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 2000,
            "basePoints": 0.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 46,
            "maxLevel": 51,
            "spellPowerCoefficient": 0.0
          }
        ],
        "tooltipDamageTotal": 596
      },
      {
        "rank": 4,
        "level": 58,
        "id": 11678,
        "mana": 1185,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 8.0,
        "tooltip": "Calls down a fiery rain to burn enemies in the area of effect for 880 Fire damage over 8 sec.",
        "effects": [
          {
            "id": 1296178,
            "owner": 11678,
            "type": "A_PERIODIC_DAMAGE",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 2000,
            "basePoints": 0.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 58,
            "maxLevel": 63,
            "spellPowerCoefficient": 0.0
          }
        ],
        "tooltipDamageTotal": 880
      }
    ],
    "talentSetting": null,
    "periodicCanCrit": false,
    "dataNote": "Persistent area tick value is server-scripted; the client ranks provide timing and spell-power effect only."
  },
  {
    "name": "Shadowburn",
    "school": "Shadow",
    "kind": "direct",
    "class": "Warlock",
    "tree": "Destruction",
    "ranks": [
      {
        "rank": 1,
        "level": 20,
        "id": 17877,
        "mana": 105,
        "castSeconds": 0.0,
        "cooldown": 15.0,
        "duration": 8.0,
        "tooltip": "Instantly blasts the target for 62 to 70 Shadow damage. If a non-trivial target dies within 8 sec of being hit with Shadowburn, the caster gains a Soul Shard.",
        "effects": [
          {
            "id": 695052,
            "owner": 17877,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 66.0,
            "perLevel": 0.89999997616,
            "variance": 0.12903225422,
            "baseLevel": 20,
            "maxLevel": 24,
            "spellPowerCoefficient": 0.42899999022
          }
        ]
      },
      {
        "rank": 2,
        "level": 24,
        "id": 18867,
        "mana": 130,
        "castSeconds": 0.0,
        "cooldown": 15.0,
        "duration": 8.0,
        "tooltip": "Instantly blasts the target for 75 to 85 Shadow damage. If the target dies within 8 sec of Shadowburn, and yields experience or honor, the caster gains a Soul Shard.",
        "effects": [
          {
            "id": 694922,
            "owner": 18867,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 80.0,
            "perLevel": 1.0,
            "variance": 0.13008129597,
            "baseLevel": 24,
            "maxLevel": 30,
            "spellPowerCoefficient": 0.42899999022
          }
        ]
      },
      {
        "rank": 3,
        "level": 32,
        "id": 18868,
        "mana": 190,
        "castSeconds": 0.0,
        "cooldown": 15.0,
        "duration": 8.0,
        "tooltip": "Instantly blasts the target for 111 to 125 Shadow damage. If the target dies within 8 sec of Shadowburn, and yields experience or honor, the caster gains a Soul Shard.",
        "effects": [
          {
            "id": 694924,
            "owner": 18868,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 118.0,
            "perLevel": 1.29999995232,
            "variance": 0.12121211737,
            "baseLevel": 32,
            "maxLevel": 38,
            "spellPowerCoefficient": 0.42899999022
          }
        ]
      },
      {
        "rank": 4,
        "level": 40,
        "id": 18869,
        "mana": 245,
        "castSeconds": 0.0,
        "cooldown": 15.0,
        "duration": 8.0,
        "tooltip": "Instantly blasts the target for 139 to 157 Shadow damage. If the target dies within 8 sec of Shadowburn, and yields experience or honor, the caster gains a Soul Shard.",
        "effects": [
          {
            "id": 694026,
            "owner": 18869,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 148.0,
            "perLevel": 1.29999995232,
            "variance": 0.11552345753,
            "baseLevel": 40,
            "maxLevel": 46,
            "spellPowerCoefficient": 0.42899999022
          }
        ]
      },
      {
        "rank": 5,
        "level": 48,
        "id": 18870,
        "mana": 305,
        "castSeconds": 0.0,
        "cooldown": 15.0,
        "duration": 8.0,
        "tooltip": "Instantly blasts the target for 192 to 214 Shadow damage. If the target dies within 8 sec of Shadowburn, and yields experience or honor, the caster gains a Soul Shard.",
        "effects": [
          {
            "id": 694048,
            "owner": 18870,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 203.0,
            "perLevel": 1.60000002384,
            "variance": 0.11320754886,
            "baseLevel": 48,
            "maxLevel": 54,
            "spellPowerCoefficient": 0.42899999022
          }
        ]
      },
      {
        "rank": 6,
        "level": 56,
        "id": 18871,
        "mana": 365,
        "castSeconds": 0.0,
        "cooldown": 15.0,
        "duration": 8.0,
        "tooltip": "Instantly blasts the target for 251 to 281 Shadow damage. If the target dies within 8 sec of Shadowburn, and yields experience or honor, the caster gains a Soul Shard.",
        "effects": [
          {
            "id": 696326,
            "owner": 18871,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 266.0,
            "perLevel": 1.79999995232,
            "variance": 0.10924369842,
            "baseLevel": 56,
            "maxLevel": 62,
            "spellPowerCoefficient": 0.42899999022
          }
        ]
      }
    ],
    "talentSetting": "warlockTalentShadowburn",
    "periodicCanCrit": false
  },
  {
    "name": "Conflagrate",
    "school": "Fire",
    "kind": "direct",
    "class": "Warlock",
    "tree": "Destruction",
    "ranks": [
      {
        "rank": 1,
        "level": 25,
        "id": 1293817,
        "mana": 100,
        "castSeconds": 0.0,
        "cooldown": 10.0,
        "duration": 0,
        "tooltip": "Ignites a target that is already afflicted by your Immolate spell, dealing 84 to 106 Fire damage and consuming your Immolate effect.",
        "effects": [
          {
            "id": 1314821,
            "owner": 1293817,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 95.0,
            "perLevel": 0.89999997616,
            "variance": 0.24175824225,
            "baseLevel": 25,
            "maxLevel": 30,
            "spellPowerCoefficient": 0.42899999022
          }
        ]
      },
      {
        "rank": 2,
        "level": 32,
        "id": 1293818,
        "mana": 130,
        "castSeconds": 0.0,
        "cooldown": 10.0,
        "duration": 0,
        "tooltip": "Ignites a target that is already afflicted by your Immolate spell, dealing 107 to 137 Fire damage and consuming your Immolate effect.",
        "effects": [
          {
            "id": 1314822,
            "owner": 1293818,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 122.0,
            "perLevel": 0.89999997616,
            "variance": 0.24175824225,
            "baseLevel": 32,
            "maxLevel": 38,
            "spellPowerCoefficient": 0.42899999022
          }
        ]
      },
      {
        "rank": 3,
        "level": 40,
        "id": 17962,
        "mana": 165,
        "castSeconds": 0.0,
        "cooldown": 10.0,
        "duration": 0,
        "tooltip": "Ignites a target that is already afflicted by your Immolate spell, dealing 128 to 164 Fire damage and consuming your Immolate effect.",
        "effects": [
          {
            "id": 695729,
            "owner": 17962,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 146.0,
            "perLevel": 1.0,
            "variance": 0.24175824225,
            "baseLevel": 40,
            "maxLevel": 46,
            "spellPowerCoefficient": 0.42899999022
          }
        ]
      },
      {
        "rank": 4,
        "level": 48,
        "id": 18930,
        "mana": 200,
        "castSeconds": 0.0,
        "cooldown": 10.0,
        "duration": 0,
        "tooltip": "Ignites a target that is already afflicted by your Immolate spell, dealing 172 to 216 Fire damage and consuming your Immolate effect.",
        "effects": [
          {
            "id": 696850,
            "owner": 18930,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 194.0,
            "perLevel": 1.10000002384,
            "variance": 0.22471910715,
            "baseLevel": 48,
            "maxLevel": 54,
            "spellPowerCoefficient": 0.42899999022
          }
        ]
      },
      {
        "rank": 5,
        "level": 54,
        "id": 18931,
        "mana": 230,
        "castSeconds": 0.0,
        "cooldown": 10.0,
        "duration": 0,
        "tooltip": "Ignites a target that is already afflicted by your Immolate spell, dealing 212 to 266 Fire damage and consuming your Immolate effect.",
        "effects": [
          {
            "id": 696774,
            "owner": 18931,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 239.0,
            "perLevel": 1.20000004768,
            "variance": 0.22273781896,
            "baseLevel": 54,
            "maxLevel": 60,
            "spellPowerCoefficient": 0.42899999022
          }
        ]
      },
      {
        "rank": 6,
        "level": 60,
        "id": 18932,
        "mana": 255,
        "castSeconds": 0.0,
        "cooldown": 10.0,
        "duration": 0,
        "tooltip": "Ignites a target that is already afflicted by your Immolate spell, dealing 251 to 313 Fire damage and consuming your Immolate effect.",
        "effects": [
          {
            "id": 696822,
            "owner": 18932,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 282.0,
            "perLevel": 1.29999995232,
            "variance": 0.21912351251,
            "baseLevel": 60,
            "maxLevel": 66,
            "spellPowerCoefficient": 0.42899999022
          }
        ]
      }
    ],
    "talentSetting": "warlockTalentConflagrate",
    "periodicCanCrit": false,
    "requiresImmolate": true,
    "description": "Requires Immolate on the target and consumes it unless Shadow and Flame is 5/5."
  },
  {
    "name": "Hellfire",
    "school": "Fire",
    "kind": "channel-dot",
    "class": "Warlock",
    "tree": "Destruction",
    "ranks": [
      {
        "rank": 1,
        "level": 30,
        "id": 1949,
        "mana": 645,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 15.0,
        "tooltip": "Ignites the area surrounding the caster, causing 82 Fire damage to himself and 82 Fire damage to all nearby enemies every 1 sec. Lasts 15 sec.",
        "effects": [
          {
            "id": 681079,
            "owner": 1949,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 1000,
            "basePoints": 82.0,
            "perLevel": 0.40000000596,
            "variance": 0.0,
            "baseLevel": 30,
            "maxLevel": 40,
            "spellPowerCoefficient": 0.02199999988
          }
        ]
      },
      {
        "rank": 2,
        "level": 42,
        "id": 11683,
        "mana": 975,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 15.0,
        "tooltip": "Ignites the area surrounding the caster, causing 137 Fire damage to himself and 137 Fire damage to all nearby enemies every 1 sec. Lasts 15 sec.",
        "effects": [
          {
            "id": 689621,
            "owner": 11683,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 1000,
            "basePoints": 137.0,
            "perLevel": 0.5,
            "variance": 0.0,
            "baseLevel": 42,
            "maxLevel": 52,
            "spellPowerCoefficient": 0.02199999988
          }
        ]
      },
      {
        "rank": 3,
        "level": 54,
        "id": 11684,
        "mana": 1300,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 15.0,
        "tooltip": "Ignites the area surrounding the caster, causing 206 Fire damage to himself and 206 Fire damage to all nearby enemies every 1 sec. Lasts 15 sec.",
        "effects": [
          {
            "id": 688756,
            "owner": 11684,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 1000,
            "basePoints": 206.0,
            "perLevel": 0.69999998808,
            "variance": 0.0,
            "baseLevel": 54,
            "maxLevel": 64,
            "spellPowerCoefficient": 0.02199999988
          }
        ]
      }
    ],
    "talentSetting": null,
    "periodicCanCrit": true,
    "selfDamage": true,
    "description": "Channeled area damage also deals the same periodic Fire damage to the caster."
  },
  {
    "name": "Incinerate",
    "school": "Fire",
    "kind": "direct",
    "class": "Warlock",
    "tree": "Destruction",
    "ranks": [
      {
        "rank": 1,
        "level": 40,
        "id": 412758,
        "mana": 205,
        "castSeconds": 2.5,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Deals 90 to 104 Fire damage to your target and an additional 25% damage if the target is afflicted by Immolate.",
        "effects": [
          {
            "id": 1080406,
            "owner": 412758,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 97.0,
            "perLevel": 1.10000002384,
            "variance": 0.15000000596,
            "baseLevel": 40,
            "maxLevel": 49,
            "spellPowerCoefficient": 0.71399998665
          }
        ]
      },
      {
        "rank": 2,
        "level": 50,
        "id": 1293812,
        "mana": 265,
        "castSeconds": 2.5,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Deals 134 to 156 Fire damage to your target and an additional 25% damage if the target is afflicted by Immolate.",
        "effects": [
          {
            "id": 1314812,
            "owner": 1293812,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 145.0,
            "perLevel": 1.29999995232,
            "variance": 0.15000000596,
            "baseLevel": 50,
            "maxLevel": 59,
            "spellPowerCoefficient": 0.71399998665
          }
        ]
      },
      {
        "rank": 3,
        "level": 60,
        "id": 1293813,
        "mana": 325,
        "castSeconds": 2.5,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Deals 201 to 233 Fire damage to your target and an additional 25% damage if the target is afflicted by Immolate.",
        "effects": [
          {
            "id": 1314814,
            "owner": 1293813,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 217.0,
            "perLevel": 1.39999997616,
            "variance": 0.15000000596,
            "baseLevel": 60,
            "maxLevel": 69,
            "spellPowerCoefficient": 0.71399998665
          }
        ]
      }
    ],
    "talentSetting": "warlockTalentIncinerate",
    "periodicCanCrit": false,
    "immolateBonusPercent": 25,
    "description": "Deals 25% more damage to a target affected by Immolate."
  },
  {
    "name": "Soul Fire",
    "school": "Fire",
    "kind": "direct",
    "class": "Warlock",
    "tree": "Destruction",
    "ranks": [
      {
        "rank": 1,
        "level": 48,
        "id": 6353,
        "mana": 305,
        "castSeconds": 6.0,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Burn the enemy's soul, causing 334 to 420 Fire damage.",
        "effects": [
          {
            "id": 685235,
            "owner": 6353,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 377.0,
            "perLevel": 1.70000004768,
            "variance": 0.22759601474,
            "baseLevel": 48,
            "maxLevel": 54,
            "spellPowerCoefficient": 1.0
          }
        ]
      },
      {
        "rank": 2,
        "level": 56,
        "id": 17924,
        "mana": 335,
        "castSeconds": 6.0,
        "cooldown": 0.0,
        "duration": 0,
        "tooltip": "Burn the enemy's soul, causing 383 to 479 Fire damage.",
        "effects": [
          {
            "id": 696430,
            "owner": 17924,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 431.0,
            "perLevel": 1.89999997616,
            "variance": 0.22474747896,
            "baseLevel": 56,
            "maxLevel": 62,
            "spellPowerCoefficient": 1.0
          }
        ]
      }
    ],
    "talentSetting": null,
    "periodicCanCrit": false
  },
  {
    "name": "Corruption",
    "school": "Shadow",
    "kind": "dot",
    "class": "Warlock",
    "tree": "Affliction",
    "ranks": [
      {
        "rank": 1,
        "level": 4,
        "id": 172,
        "mana": 35,
        "castSeconds": 2.0,
        "cooldown": 0.0,
        "duration": 12.0,
        "tooltip": "Corrupts the target, causing 40 Shadow damage over 12 sec.",
        "effects": [
          {
            "id": 678915,
            "owner": 172,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 3000,
            "basePoints": 10.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 4,
            "maxLevel": 9,
            "spellPowerCoefficient": 0.20000000298
          }
        ]
      },
      {
        "rank": 2,
        "level": 14,
        "id": 6222,
        "mana": 55,
        "castSeconds": 2.0,
        "cooldown": 0.0,
        "duration": 15.0,
        "tooltip": "Corrupts the target, causing 65 Shadow damage over 15 sec.",
        "effects": [
          {
            "id": 683870,
            "owner": 6222,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 3000,
            "basePoints": 13.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 14,
            "maxLevel": 19,
            "spellPowerCoefficient": 0.20000000298
          }
        ]
      },
      {
        "rank": 3,
        "level": 24,
        "id": 6223,
        "mana": 100,
        "castSeconds": 2.0,
        "cooldown": 0.0,
        "duration": 18.0,
        "tooltip": "Corrupts the target, causing 132 Shadow damage over 18 sec.",
        "effects": [
          {
            "id": 685034,
            "owner": 6223,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 3000,
            "basePoints": 22.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 24,
            "maxLevel": 29,
            "spellPowerCoefficient": 0.20000000298
          }
        ]
      },
      {
        "rank": 4,
        "level": 34,
        "id": 7648,
        "mana": 160,
        "castSeconds": 2.0,
        "cooldown": 0.0,
        "duration": 18.0,
        "tooltip": "Corrupts the target, causing 168 Shadow damage over 18 sec.",
        "effects": [
          {
            "id": 685415,
            "owner": 7648,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 3000,
            "basePoints": 28.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 34,
            "maxLevel": 39,
            "spellPowerCoefficient": 0.20000000298
          }
        ]
      },
      {
        "rank": 5,
        "level": 44,
        "id": 11671,
        "mana": 225,
        "castSeconds": 2.0,
        "cooldown": 0.0,
        "duration": 18.0,
        "tooltip": "Corrupts the target, causing 240 Shadow damage over 18 sec.",
        "effects": [
          {
            "id": 689546,
            "owner": 11671,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 3000,
            "basePoints": 40.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 44,
            "maxLevel": 49,
            "spellPowerCoefficient": 0.20000000298
          }
        ]
      },
      {
        "rank": 6,
        "level": 54,
        "id": 11672,
        "mana": 290,
        "castSeconds": 2.0,
        "cooldown": 0.0,
        "duration": 18.0,
        "tooltip": "Corrupts the target, causing 342 Shadow damage over 18 sec.",
        "effects": [
          {
            "id": 689848,
            "owner": 11672,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 3000,
            "basePoints": 57.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 54,
            "maxLevel": 59,
            "spellPowerCoefficient": 0.20000000298
          }
        ]
      },
      {
        "rank": 7,
        "level": 60,
        "id": 25311,
        "mana": 340,
        "castSeconds": 2.0,
        "cooldown": 0.0,
        "duration": 18.0,
        "tooltip": "Corrupts the target, causing 438 Shadow damage over 18 sec.",
        "effects": [
          {
            "id": 702741,
            "owner": 25311,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 3000,
            "basePoints": 73.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 60,
            "maxLevel": 65,
            "spellPowerCoefficient": 0.20000000298
          }
        ]
      }
    ],
    "talentSetting": null,
    "periodicCanCrit": true
  },
  {
    "name": "Bane of Agony",
    "school": "Shadow",
    "kind": "dot",
    "class": "Warlock",
    "tree": "Affliction",
    "ranks": [
      {
        "rank": 1,
        "level": 8,
        "id": 980,
        "mana": 25,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 24.0,
        "tooltip": "Afflicts the target with agony, causing 72 Shadow damage over 24 sec. This damage is dealt slowly at first, and builds up as the Bane reaches its full duration. Only one Bane per Warlock can be active on any one target.",
        "effects": [
          {
            "id": 686215,
            "owner": 980,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 2000,
            "basePoints": 6.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 8,
            "maxLevel": null,
            "spellPowerCoefficient": 0.13300000131
          }
        ]
      },
      {
        "rank": 2,
        "level": 18,
        "id": 1014,
        "mana": 50,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 24.0,
        "tooltip": "Afflicts the target with agony, causing 120 Shadow damage over 24 sec. This damage is dealt slowly at first, and builds up as the Bane reaches its full duration. Only one Bane per Warlock can be active on any one target.",
        "effects": [
          {
            "id": 679932,
            "owner": 1014,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 2000,
            "basePoints": 10.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 18,
            "maxLevel": null,
            "spellPowerCoefficient": 0.13300000131
          }
        ]
      },
      {
        "rank": 3,
        "level": 28,
        "id": 6217,
        "mana": 90,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 24.0,
        "tooltip": "Afflicts the target with agony, causing 168 Shadow damage over 24 sec. This damage is dealt slowly at first, and builds up as the Bane reaches its full duration. Only one Bane per Warlock can be active on any one target.",
        "effects": [
          {
            "id": 685161,
            "owner": 6217,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 2000,
            "basePoints": 14.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 28,
            "maxLevel": null,
            "spellPowerCoefficient": 0.13300000131
          }
        ]
      },
      {
        "rank": 4,
        "level": 38,
        "id": 11711,
        "mana": 130,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 24.0,
        "tooltip": "Afflicts the target with agony, causing 252 Shadow damage over 24 sec. This damage is dealt slowly at first, and builds up as the Bane reaches its full duration. Only one Bane per Warlock can be active on any one target.",
        "effects": [
          {
            "id": 689366,
            "owner": 11711,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 2000,
            "basePoints": 21.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 38,
            "maxLevel": null,
            "spellPowerCoefficient": 0.13300000131
          }
        ]
      },
      {
        "rank": 5,
        "level": 48,
        "id": 11712,
        "mana": 170,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 24.0,
        "tooltip": "Afflicts the target with agony, causing 396 Shadow damage over 24 sec. This damage is dealt slowly at first, and builds up as the Bane reaches its full duration. Only one Bane per Warlock can be active on any one target.",
        "effects": [
          {
            "id": 689314,
            "owner": 11712,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 2000,
            "basePoints": 33.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 48,
            "maxLevel": null,
            "spellPowerCoefficient": 0.13300000131
          }
        ]
      },
      {
        "rank": 6,
        "level": 58,
        "id": 11713,
        "mana": 215,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 24.0,
        "tooltip": "Afflicts the target with agony, causing 552 Shadow damage over 24 sec. This damage is dealt slowly at first, and builds up as the Bane reaches its full duration. Only one Bane per Warlock can be active on any one target.",
        "effects": [
          {
            "id": 689623,
            "owner": 11713,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 2000,
            "basePoints": 46.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 58,
            "maxLevel": null,
            "spellPowerCoefficient": 0.13300000131
          }
        ]
      }
    ],
    "talentSetting": null,
    "periodicCanCrit": true,
    "variableTickPattern": true,
    "description": "The base total is exact; ticks ramp across the 24-second duration. Per-tick figures are the mean, not a claim that each tick is equal."
  },
  {
    "name": "Drain Soul",
    "school": "Shadow",
    "kind": "channel-dot",
    "class": "Warlock",
    "tree": "Affliction",
    "ranks": [
      {
        "rank": 1,
        "level": 10,
        "id": 1120,
        "mana": 55,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 15.0,
        "tooltip": "Drains the soul of the target, causing 85 Shadow damage over 15 sec. Non-trivial targets damaged by Drain Soul have a chance to grant you a Soul Shard. Non-trivial targets killed by Drain Soul will always grant you a Soul shard. Soul Shards are required for other spells.",
        "effects": [
          {
            "id": 680520,
            "owner": 1120,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 3000,
            "basePoints": 17.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 10,
            "maxLevel": null,
            "spellPowerCoefficient": 0.10000000149
          }
        ]
      },
      {
        "rank": 2,
        "level": 24,
        "id": 8288,
        "mana": 125,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 15.0,
        "tooltip": "Drains the soul of the target, causing 170 Shadow damage over 15 sec. Non-trivial targets damaged by Drain Soul have a chance to grant you a Soul Shard. Non-trivial targets killed by Drain Soul will always grant you a Soul shard. Soul Shards are required for other spells.",
        "effects": [
          {
            "id": 687623,
            "owner": 8288,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 3000,
            "basePoints": 34.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 24,
            "maxLevel": null,
            "spellPowerCoefficient": 0.10000000149
          }
        ]
      },
      {
        "rank": 3,
        "level": 38,
        "id": 8289,
        "mana": 210,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 15.0,
        "tooltip": "Drains the soul of the target, causing 270 Shadow damage over 15 sec. Non-trivial targets damaged by Drain Soul have a chance to grant you a Soul Shard. Non-trivial targets killed by Drain Soul will always grant you a Soul shard. Soul Shards are required for other spells.",
        "effects": [
          {
            "id": 687430,
            "owner": 8289,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 3000,
            "basePoints": 54.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 38,
            "maxLevel": null,
            "spellPowerCoefficient": 0.10000000149
          }
        ]
      },
      {
        "rank": 4,
        "level": 52,
        "id": 11675,
        "mana": 290,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 15.0,
        "tooltip": "Drains the soul of the target, causing 420 Shadow damage over 15 sec. Non-trivial targets damaged by Drain Soul have a chance to grant you a Soul Shard. Non-trivial targets killed by Drain Soul will always grant you a Soul shard. Soul Shards are required for other spells.",
        "effects": [
          {
            "id": 690015,
            "owner": 11675,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 3000,
            "basePoints": 84.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 52,
            "maxLevel": null,
            "spellPowerCoefficient": 0.10000000149
          }
        ]
      }
    ],
    "talentSetting": null,
    "periodicCanCrit": true
  },
  {
    "name": "Drain Life",
    "school": "Shadow",
    "kind": "channel-dot",
    "class": "Warlock",
    "tree": "Affliction",
    "ranks": [
      {
        "rank": 1,
        "level": 14,
        "id": 689,
        "mana": 55,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 5.0,
        "tooltip": "Transfers 10 health every 1 second from the target to the caster. Lasts 5 sec.",
        "effects": []
      },
      {
        "rank": 2,
        "level": 22,
        "id": 699,
        "mana": 85,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 5.0,
        "tooltip": "Transfers 14 health every 1 second from the target to the caster. Lasts 5 sec.",
        "effects": []
      },
      {
        "rank": 3,
        "level": 30,
        "id": 709,
        "mana": 135,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 5.0,
        "tooltip": "Transfers 22 health every 1 second from the target to the caster. Lasts 5 sec.",
        "effects": []
      },
      {
        "rank": 4,
        "level": 38,
        "id": 7651,
        "mana": 185,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 5.0,
        "tooltip": "Transfers 28 health every 1 second from the target to the caster. Lasts 5 sec.",
        "effects": []
      },
      {
        "rank": 5,
        "level": 46,
        "id": 11699,
        "mana": 240,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 5.0,
        "tooltip": "Transfers 39 health every 1 second from the target to the caster. Lasts 5 sec.",
        "effects": []
      },
      {
        "rank": 6,
        "level": 54,
        "id": 11700,
        "mana": 300,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 5.0,
        "tooltip": "Transfers 51 health every 1 second from the target to the caster. Lasts 5 sec.",
        "effects": []
      }
    ],
    "talentSetting": null,
    "periodicCanCrit": true
  },
  {
    "name": "Siphon Life",
    "school": "Shadow",
    "kind": "dot",
    "class": "Warlock",
    "tree": "Affliction",
    "ranks": [
      {
        "rank": 1,
        "level": 30,
        "id": 18265,
        "mana": 150,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 30.0,
        "tooltip": "Transfers 11 health from the target to the caster every 3 sec. Lasts 30 sec.",
        "effects": []
      },
      {
        "rank": 2,
        "level": 38,
        "id": 18879,
        "mana": 205,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 30.0,
        "tooltip": "Transfers 19 health from the target to the caster every 3 sec. Lasts 30 sec.",
        "effects": []
      },
      {
        "rank": 3,
        "level": 48,
        "id": 18880,
        "mana": 285,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 30.0,
        "tooltip": "Transfers 29 health from the target to the caster every 3 sec. Lasts 30 sec.",
        "effects": []
      },
      {
        "rank": 4,
        "level": 58,
        "id": 18881,
        "mana": 365,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 30.0,
        "tooltip": "Transfers 41 health from the target to the caster every 3 sec. Lasts 30 sec.",
        "effects": []
      }
    ],
    "talentSetting": "warlockTalentSiphonLife",
    "periodicCanCrit": true
  },
  {
    "name": "Wrack",
    "school": "Shadow",
    "kind": "dot",
    "class": "Warlock",
    "tree": "Affliction",
    "ranks": [
      {
        "rank": 1,
        "level": 40,
        "id": 1316697,
        "mana": 200,
        "castSeconds": 0.0,
        "cooldown": 0.0,
        "duration": 6.0,
        "tooltip": "Tears the target apart from within, dealing 36 Shadow damage every sec and increasing the damage they take from your other Shadow damage over time effects by 10%. Lasts 6 sec. 200 mana instant 30 yd # 1316697",
        "effects": [
          {
            "id": 1349556,
            "owner": 1316697,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 1000,
            "basePoints": 36.0,
            "perLevel": 2.5,
            "variance": 0.0,
            "baseLevel": 40,
            "maxLevel": 60,
            "spellPowerCoefficient": 0.28600001335
          }
        ]
      }
    ],
    "talentSetting": "warlockTalentWrack",
    "periodicCanCrit": true
  },
  {
    "name": "Death Coil",
    "school": "Shadow",
    "kind": "direct",
    "class": "Warlock",
    "tree": "Affliction",
    "ranks": [
      {
        "rank": 1,
        "level": 42,
        "id": 6789,
        "mana": 435,
        "castSeconds": 0.0,
        "cooldown": 120.0,
        "duration": 3.0,
        "tooltip": "Causes the enemy target to run in horror for 3 sec and causes 272 Shadow damage. The caster gains 100% of the damage caused in health.",
        "effects": [
          {
            "id": 684930,
            "owner": 6789,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 272.0,
            "perLevel": 2.20000004768,
            "variance": 0.0,
            "baseLevel": 42,
            "maxLevel": 48,
            "spellPowerCoefficient": 0.21400000155
          }
        ]
      },
      {
        "rank": 2,
        "level": 50,
        "id": 17925,
        "mana": 525,
        "castSeconds": 0.0,
        "cooldown": 120.0,
        "duration": 3.0,
        "tooltip": "Causes the enemy target to run in horror for 3 sec and causes 359 Shadow damage. The caster gains 100% of the damage caused in health.",
        "effects": [
          {
            "id": 695364,
            "owner": 17925,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 359.0,
            "perLevel": 2.59999990463,
            "variance": 0.0,
            "baseLevel": 50,
            "maxLevel": 56,
            "spellPowerCoefficient": 0.21400000155
          }
        ]
      },
      {
        "rank": 3,
        "level": 58,
        "id": 17926,
        "mana": 600,
        "castSeconds": 0.0,
        "cooldown": 120.0,
        "duration": 3.0,
        "tooltip": "Causes the enemy target to run in horror for 3 sec and causes 454 Shadow damage. The caster gains 100% of the damage caused in health.",
        "effects": [
          {
            "id": 696431,
            "owner": 17926,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "periodMs": null,
            "basePoints": 454.0,
            "perLevel": 3.0,
            "variance": 0.0,
            "baseLevel": 58,
            "maxLevel": 64,
            "spellPowerCoefficient": 0.21400000155
          }
        ]
      }
    ],
    "talentSetting": null,
    "periodicCanCrit": false,
    "selfHealingPercent": 100,
    "description": "Instant Shadow damage with a 3-second horror; heals the caster for damage dealt."
  },
  {
    "name": "Bane of Doom",
    "school": "Shadow",
    "kind": "dot",
    "class": "Warlock",
    "tree": "Affliction",
    "ranks": [
      {
        "rank": 1,
        "level": 60,
        "id": 603,
        "mana": 300,
        "castSeconds": 0.0,
        "cooldown": 60.0,
        "duration": 60.0,
        "tooltip": "Afflicts the target with impending doom, causing 1742 Shadow damage after 60 sec. If the target dies from this damage, there is a chance that a Doomguard will be summoned. Cannot be cast on players. Only one Bane per Warlock can be active on any one target. 300 mana instant 60 s cooldown 30 yd # 603",
        "effects": [
          {
            "id": 679099,
            "owner": 603,
            "type": "A_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "periodMs": 60000,
            "basePoints": 1742.0,
            "perLevel": 0.0,
            "variance": 0.0,
            "baseLevel": 60,
            "maxLevel": null,
            "spellPowerCoefficient": 4.0
          }
        ]
      }
    ],
    "talentSetting": null,
    "periodicCanCrit": true,
    "description": "Single Shadow hit after 60 seconds; unavailable against players. Only one Bane per target."
  },
  {
    "name": "Inferno",
    "school": "Fire",
    "kind": "aoe",
    "class": "Warlock",
    "tree": "Demonology",
    "ranks": [
      {
        "rank": 1,
        "level": 50,
        "id": 1122,
        "mana": null,
        "manaCostText": "100% base mana",
        "castSeconds": 2.0,
        "cooldown": 3600.0,
        "duration": 0.0,
        "tooltip": "Summons a meteor from the Twisting Nether, causing 200 Fire damage and stunning all enemy targets in the area for 2 sec. An Infernal rises from the crater, under the command of the caster for 5 min. Once control is lost, the Infernal must be Subjugated to maintain control. Can only be used outdoors.",
        "effects": []
      }
    ],
    "talentSetting": null,
    "periodicCanCrit": false,
    "description": "Deals 200 Fire damage and stuns enemies in a 10 yd area; requires an Infernal Stone and summons an Infernal. The summon’s attacks are excluded because their damage and uptime depend on pet behavior."
  }
];
