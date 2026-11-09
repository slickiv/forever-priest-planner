/* Damage rank tooltips, levels, costs and effects from build 1.60.1.70862.
   Rank tooltip data is from ForeverChanges’ build-stamped spellbook; effect fields are from the client spell table.
   Reactive damage is reported per triggering event, not as cast throughput. */
window.DAMAGE_SPELLS = [
  {
    "name": "Chastise",
    "school": "Holy",
    "race": "Dwarf",
    "kind": "humanoid",
    "description": "Dwarf racial. Instant 20-yard holy strike, roots Humanoids for up to 2 seconds; 2-minute cooldown.",
    "ranks": [
      {
        "rank": 1,
        "level": 20,
        "id": 1277331,
        "mana": 50,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 120,
        "tooltip": "Chastise the target, causing 43 to 49 Holy damage and immobilizing them for up to 2 sec. Only works against Humanoids. This spell causes very low threat.",
        "damageMin": 43,
        "damageMax": 49,
        "effects": [
          {
            "id": 1289640,
            "owner": 1277331,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 46,
            "perLevel": null,
            "variance": 0.11999999731779099,
            "baseLevel": 20,
            "maxLevel": 29,
            "spellPowerCoefficient": 0.14300000667572021,
            "periodMs": null
          }
        ],
        "school": "Holy"
      },
      {
        "rank": 2,
        "level": 30,
        "id": 1277332,
        "mana": 100,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 120,
        "tooltip": "Chastise the target, causing 87 to 99 Holy damage and immobilizing them for up to 2 sec. Only works against Humanoids. This spell causes very low threat.",
        "damageMin": 87,
        "damageMax": 99,
        "effects": [
          {
            "id": 1289642,
            "owner": 1277332,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 93,
            "perLevel": null,
            "variance": 0.11999999731779099,
            "baseLevel": 30,
            "maxLevel": 39,
            "spellPowerCoefficient": 0.14300000667572021,
            "periodMs": null
          }
        ],
        "school": "Holy"
      },
      {
        "rank": 3,
        "level": 40,
        "id": 1277333,
        "mana": 135,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 120,
        "tooltip": "Chastise the target, causing 132 to 148 Holy damage and Immobilizing them for up to 2 sec. Only works against Humanoids. This spell causes very low threat.",
        "damageMin": 132,
        "damageMax": 148,
        "effects": [
          {
            "id": 1289644,
            "owner": 1277333,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 140,
            "perLevel": null,
            "variance": 0.11999999731779099,
            "baseLevel": 40,
            "maxLevel": 49,
            "spellPowerCoefficient": 0.14300000667572021,
            "periodMs": null
          }
        ],
        "school": "Holy"
      },
      {
        "rank": 4,
        "level": 50,
        "id": 1277334,
        "mana": 180,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 120,
        "tooltip": "Chastise the target, causing 201 to 227 Holy damage and Immobilizing them for up to 2 sec. Only works against Humanoids. This spell causes very low threat.",
        "damageMin": 201,
        "damageMax": 227,
        "effects": [
          {
            "id": 1289646,
            "owner": 1277334,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 214,
            "perLevel": null,
            "variance": 0.11999999731779099,
            "baseLevel": 50,
            "maxLevel": 59,
            "spellPowerCoefficient": 0.14300000667572021,
            "periodMs": null
          }
        ],
        "school": "Holy"
      },
      {
        "rank": 5,
        "level": 60,
        "id": 1277335,
        "mana": 225,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 120,
        "tooltip": "Chastise the target, causing 272 to 306 Holy damage and Immobilizing them for up to 2 sec. Only works against Humanoids. This spell causes very low threat.",
        "damageMin": 272,
        "damageMax": 306,
        "effects": [
          {
            "id": 1289648,
            "owner": 1277335,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 289,
            "perLevel": null,
            "variance": 0.11999999731779099,
            "baseLevel": 60,
            "maxLevel": 69,
            "spellPowerCoefficient": 0.14300000667572021,
            "periodMs": null
          }
        ],
        "school": "Holy"
      }
    ]
  },
  {
    "name": "Devouring Plague",
    "school": "Shadow",
    "race": null,
    "kind": "dot",
    "description": "Deals Shadow damage over 24 seconds and heals the Priest for damage dealt. 24-second cooldown.",
    "ranks": [
      {
        "rank": 1,
        "level": 20,
        "id": 2944,
        "mana": 215,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 24,
        "tooltip": "Afflicts the target with a disease that causes 128 Shadow damage over 24 sec. Damage caused by the Devouring Plague heals the caster.",
        "dotTotalMin": 128,
        "dotTotalMax": 128,
        "duration": 24,
        "effects": [
          {
            "id": 680594,
            "owner": 2944,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_LEECH",
            "basePoints": 16,
            "perLevel": null,
            "variance": null,
            "baseLevel": 20,
            "maxLevel": null,
            "spellPowerCoefficient": 0.10000000149011612,
            "periodMs": 3000
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 2,
        "level": 28,
        "id": 19276,
        "mana": 350,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 24,
        "tooltip": "Afflicts the target with a disease that causes 232 Shadow damage over 24 sec. Damage caused by the Devouring Plague heals the caster.",
        "dotTotalMin": 232,
        "dotTotalMax": 232,
        "duration": 24,
        "effects": [
          {
            "id": 694894,
            "owner": 19276,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_LEECH",
            "basePoints": 29,
            "perLevel": null,
            "variance": null,
            "baseLevel": 28,
            "maxLevel": null,
            "spellPowerCoefficient": 0.10000000149011612,
            "periodMs": 3000
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 3,
        "level": 36,
        "id": 19277,
        "mana": 495,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 24,
        "tooltip": "Afflicts the target with a disease that causes 344 Shadow damage over 24 sec. Damage caused by the Devouring Plague heals the caster.",
        "dotTotalMin": 344,
        "dotTotalMax": 344,
        "duration": 24,
        "effects": [
          {
            "id": 696060,
            "owner": 19277,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_LEECH",
            "basePoints": 43,
            "perLevel": null,
            "variance": null,
            "baseLevel": 36,
            "maxLevel": null,
            "spellPowerCoefficient": 0.10000000149011612,
            "periodMs": 3000
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 4,
        "level": 44,
        "id": 19278,
        "mana": 645,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 24,
        "tooltip": "Afflicts the target with a disease that causes 488 Shadow damage over 24 sec. Damage caused by the Devouring Plague heals the caster.",
        "dotTotalMin": 488,
        "dotTotalMax": 488,
        "duration": 24,
        "effects": [
          {
            "id": 696061,
            "owner": 19278,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_LEECH",
            "basePoints": 61,
            "perLevel": null,
            "variance": null,
            "baseLevel": 44,
            "maxLevel": null,
            "spellPowerCoefficient": 0.10000000149011612,
            "periodMs": 3000
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 5,
        "level": 52,
        "id": 19279,
        "mana": 810,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 24,
        "tooltip": "Afflicts the target with a disease that causes 656 Shadow damage over 24 sec. Damage caused by the Devouring Plague heals the caster.",
        "dotTotalMin": 656,
        "dotTotalMax": 656,
        "duration": 24,
        "effects": [
          {
            "id": 696303,
            "owner": 19279,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_LEECH",
            "basePoints": 82,
            "perLevel": null,
            "variance": null,
            "baseLevel": 52,
            "maxLevel": null,
            "spellPowerCoefficient": 0.10000000149011612,
            "periodMs": 3000
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 6,
        "level": 60,
        "id": 19280,
        "mana": 985,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 24,
        "tooltip": "Afflicts the target with a disease that causes 848 Shadow damage over 24 sec. Damage caused by the Devouring Plague heals the caster.",
        "dotTotalMin": 848,
        "dotTotalMax": 848,
        "duration": 24,
        "effects": [
          {
            "id": 696311,
            "owner": 19280,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_LEECH",
            "basePoints": 106,
            "perLevel": null,
            "variance": null,
            "baseLevel": 60,
            "maxLevel": null,
            "spellPowerCoefficient": 0.10000000149011612,
            "periodMs": 3000
          }
        ],
        "school": "Shadow"
      }
    ],
    "periodicCanCrit": true
  },
  {
    "name": "Feedback",
    "school": "Shadow",
    "race": "Human",
    "kind": "reactive",
    "description": "Human racial. Reflects damage when hostile spells hit the Priest; each proc burns attacker Mana. Fifteen-second effect, three-minute cooldown.",
    "ranks": [
      {
        "rank": 1,
        "level": 20,
        "id": 13896,
        "mana": 55,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 180,
        "tooltip": "The priest becomes surrounded with anti-magic energy. Any successful spell cast against the priest will burn 18 of the attacker's Mana, causing 1 Shadow damage for each point of Mana burned. Lasts 15 sec.",
        "damageMin": 18,
        "damageMax": 18,
        "effects": [],
        "school": "Shadow"
      },
      {
        "rank": 2,
        "level": 30,
        "id": 19271,
        "mana": 100,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 180,
        "tooltip": "The priest becomes surrounded with anti-magic energy. Any successful spell cast against the priest will burn 35 of the attacker's Mana, causing 1 Shadow damage for each point of Mana burned. Lasts 15 sec.",
        "damageMin": 35,
        "damageMax": 35,
        "effects": [],
        "school": "Shadow"
      },
      {
        "rank": 3,
        "level": 40,
        "id": 19273,
        "mana": 140,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 180,
        "tooltip": "The priest becomes surrounded with anti-magic energy. Any successful spell cast against the priest will burn 54 of the attacker's Mana, causing 1 Shadow damage for each point of Mana burned. Lasts 15 sec.",
        "damageMin": 54,
        "damageMax": 54,
        "effects": [],
        "school": "Shadow"
      },
      {
        "rank": 4,
        "level": 50,
        "id": 19274,
        "mana": 190,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 180,
        "tooltip": "The priest becomes surrounded with anti-magic energy. Any successful spell cast against the priest will burn 77 of the attacker's Mana, causing 1 Shadow damage for each point of Mana burned. Lasts 15 sec.",
        "damageMin": 77,
        "damageMax": 77,
        "effects": [],
        "school": "Shadow"
      },
      {
        "rank": 5,
        "level": 60,
        "id": 19275,
        "mana": 230,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 180,
        "tooltip": "The priest becomes surrounded with anti-magic energy. Any successful spell cast against the priest will burn 105 of the attacker's Mana, causing 1 Shadow damage for each point of Mana burned. Lasts 15 sec.",
        "damageMin": 105,
        "damageMax": 105,
        "effects": [],
        "school": "Shadow"
      }
    ]
  },
  {
    "name": "Holy Fire",
    "school": "Holy",
    "race": null,
    "kind": "direct-dot",
    "description": "A 3.5-second cast that deals direct Holy damage and a separate 10-second damage-over-time effect.",
    "ranks": [
      {
        "rank": 1,
        "level": 20,
        "id": 14914,
        "mana": 85,
        "castSeconds": 3.5,
        "castType": "3.5 sec cast",
        "cooldown": 0,
        "tooltip": "Consumes the enemy in holy flames that cause 53 to 65 Holy damage and an additional 20 Holy damage over 10 sec.",
        "damageMin": 53,
        "damageMax": 65,
        "dotTotalMin": 20,
        "dotTotalMax": 20,
        "duration": 10,
        "effects": [
          {
            "id": 687113,
            "owner": 14914,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 54,
            "perLevel": 1.2999999523162842,
            "variance": 0.22727273404598236,
            "baseLevel": 20,
            "maxLevel": 24,
            "spellPowerCoefficient": 0.75,
            "periodMs": null
          },
          {
            "id": 687114,
            "owner": 14914,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 4,
            "perLevel": null,
            "variance": null,
            "baseLevel": 20,
            "maxLevel": 24,
            "spellPowerCoefficient": 0.05000000074505806,
            "periodMs": 2000
          }
        ],
        "school": "Holy"
      },
      {
        "rank": 2,
        "level": 24,
        "id": 15262,
        "mana": 95,
        "castSeconds": 3.5,
        "castType": "3.5 sec cast",
        "cooldown": 0,
        "tooltip": "Consumes the enemy in holy flames that cause 64 to 78 Holy damage and an additional 25 Holy damage over 10 sec.",
        "damageMin": 64,
        "damageMax": 78,
        "dotTotalMin": 25,
        "dotTotalMax": 25,
        "duration": 10,
        "effects": [
          {
            "id": 693006,
            "owner": 15262,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 63,
            "perLevel": 1.399999976158142,
            "variance": 0.2222222238779068,
            "baseLevel": 24,
            "maxLevel": 30,
            "spellPowerCoefficient": 0.75,
            "periodMs": null
          },
          {
            "id": 693007,
            "owner": 15262,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 5,
            "perLevel": null,
            "variance": null,
            "baseLevel": 24,
            "maxLevel": 30,
            "spellPowerCoefficient": 0.05000000074505806,
            "periodMs": 2000
          }
        ],
        "school": "Holy"
      },
      {
        "rank": 3,
        "level": 30,
        "id": 15263,
        "mana": 125,
        "castSeconds": 3.5,
        "castType": "3.5 sec cast",
        "cooldown": 0,
        "tooltip": "Consumes the enemy in holy flames that cause 80 to 98 Holy damage and an additional 30 Holy damage over 10 sec.",
        "damageMin": 80,
        "damageMax": 98,
        "dotTotalMin": 30,
        "dotTotalMax": 30,
        "duration": 10,
        "effects": [
          {
            "id": 691090,
            "owner": 15263,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 80,
            "perLevel": 1.5,
            "variance": 0.2281879186630249,
            "baseLevel": 30,
            "maxLevel": 36,
            "spellPowerCoefficient": 0.75,
            "periodMs": null
          },
          {
            "id": 691091,
            "owner": 15263,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 6,
            "perLevel": null,
            "variance": null,
            "baseLevel": 30,
            "maxLevel": 36,
            "spellPowerCoefficient": 0.05000000074505806,
            "periodMs": 2000
          }
        ],
        "school": "Holy"
      },
      {
        "rank": 4,
        "level": 36,
        "id": 15264,
        "mana": 145,
        "castSeconds": 3.5,
        "castType": "3.5 sec cast",
        "cooldown": 0,
        "tooltip": "Consumes the enemy in holy flames that cause 90 to 112 Holy damage and an additional 35 Holy damage over 10 sec.",
        "damageMin": 90,
        "damageMax": 112,
        "dotTotalMin": 35,
        "dotTotalMax": 35,
        "duration": 10,
        "effects": [
          {
            "id": 691050,
            "owner": 15264,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 92,
            "perLevel": 1.5,
            "variance": 0.23529411852359772,
            "baseLevel": 36,
            "maxLevel": 42,
            "spellPowerCoefficient": 0.75,
            "periodMs": null
          },
          {
            "id": 691051,
            "owner": 15264,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 7,
            "perLevel": null,
            "variance": null,
            "baseLevel": 36,
            "maxLevel": 42,
            "spellPowerCoefficient": 0.05000000074505806,
            "periodMs": 2000
          }
        ],
        "school": "Holy"
      },
      {
        "rank": 5,
        "level": 42,
        "id": 15265,
        "mana": 170,
        "castSeconds": 3.5,
        "castType": "3.5 sec cast",
        "cooldown": 0,
        "tooltip": "Consumes the enemy in holy flames that cause 103 to 127 Holy damage and an additional 45 Holy damage over 10 sec.",
        "damageMin": 103,
        "damageMax": 127,
        "dotTotalMin": 45,
        "dotTotalMax": 45,
        "duration": 10,
        "effects": [
          {
            "id": 692082,
            "owner": 15265,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 106,
            "perLevel": 1.5,
            "variance": 0.23376622796058655,
            "baseLevel": 42,
            "maxLevel": 48,
            "spellPowerCoefficient": 0.75,
            "periodMs": null
          },
          {
            "id": 692083,
            "owner": 15265,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 9,
            "perLevel": null,
            "variance": null,
            "baseLevel": 42,
            "maxLevel": 48,
            "spellPowerCoefficient": 0.05000000074505806,
            "periodMs": 2000
          }
        ],
        "school": "Holy"
      },
      {
        "rank": 6,
        "level": 48,
        "id": 15266,
        "mana": 200,
        "castSeconds": 3.5,
        "castType": "3.5 sec cast",
        "cooldown": 0,
        "tooltip": "Consumes the enemy in holy flames that cause 133 to 166 Holy damage and an additional 50 Holy damage over 10 sec.",
        "damageMin": 133,
        "damageMax": 166,
        "dotTotalMin": 50,
        "dotTotalMax": 50,
        "duration": 10,
        "effects": [
          {
            "id": 692556,
            "owner": 15266,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 139,
            "perLevel": 1.7000000476837158,
            "variance": 0.2361111044883728,
            "baseLevel": 48,
            "maxLevel": 54,
            "spellPowerCoefficient": 0.75,
            "periodMs": null
          },
          {
            "id": 692557,
            "owner": 15266,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 10,
            "perLevel": null,
            "variance": null,
            "baseLevel": 48,
            "maxLevel": 54,
            "spellPowerCoefficient": 0.05000000074505806,
            "periodMs": 2000
          }
        ],
        "school": "Holy"
      },
      {
        "rank": 7,
        "level": 54,
        "id": 15267,
        "mana": 230,
        "castSeconds": 3.5,
        "castType": "3.5 sec cast",
        "cooldown": 0,
        "tooltip": "Consumes the enemy in holy flames that cause 164 to 205 Holy damage and an additional 65 Holy damage over 10 sec.",
        "damageMin": 164,
        "damageMax": 205,
        "dotTotalMin": 65,
        "dotTotalMax": 65,
        "duration": 10,
        "effects": [
          {
            "id": 692558,
            "owner": 15267,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 173,
            "perLevel": 1.899999976158142,
            "variance": 0.23768116533756256,
            "baseLevel": 54,
            "maxLevel": 60,
            "spellPowerCoefficient": 0.75,
            "periodMs": null
          },
          {
            "id": 692559,
            "owner": 15267,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 13,
            "perLevel": null,
            "variance": null,
            "baseLevel": 54,
            "maxLevel": 60,
            "spellPowerCoefficient": 0.05000000074505806,
            "periodMs": 2000
          }
        ],
        "school": "Holy"
      },
      {
        "rank": 8,
        "level": 60,
        "id": 15261,
        "mana": 255,
        "castSeconds": 3.5,
        "castType": "3.5 sec cast",
        "cooldown": 0,
        "tooltip": "Consumes the enemy in holy flames that cause 184 to 232 Holy damage and an additional 75 Holy damage over 10 sec.",
        "damageMin": 184,
        "damageMax": 232,
        "dotTotalMin": 75,
        "dotTotalMax": 75,
        "duration": 10,
        "effects": [
          {
            "id": 691020,
            "owner": 15261,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 208,
            "perLevel": 2,
            "variance": 0.23383083939552307,
            "baseLevel": 60,
            "maxLevel": 66,
            "spellPowerCoefficient": 0.75,
            "periodMs": null
          },
          {
            "id": 691021,
            "owner": 15261,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 15,
            "perLevel": null,
            "variance": null,
            "baseLevel": 60,
            "maxLevel": 66,
            "spellPowerCoefficient": 0.05000000074505806,
            "periodMs": 2000
          }
        ],
        "school": "Holy"
      }
    ],
    "periodicCanCrit": true
  },
  {
    "name": "Holy Nova",
    "school": "Holy",
    "race": null,
    "kind": "aoe",
    "description": "Requires the Holy Nova talent. Instant area spell that damages nearby enemies and heals nearby party members; no threat.",
    "ranks": [
      {
        "rank": 1,
        "level": 20,
        "id": 15237,
        "mana": 185,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "Causes an explosion of holy light around the caster, causing 26 to 30 Holy damage to all enemy targets within 10 yards and healing all party members within 10 yards for 50 to 57. These effects cause no threat.",
        "damageMin": 26,
        "damageMax": 30,
        "effects": [
          {
            "id": 691863,
            "owner": 15237,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 27,
            "perLevel": 0.20000000298023224,
            "variance": 0.13333334028720856,
            "baseLevel": 20,
            "maxLevel": 26,
            "spellPowerCoefficient": 0.10700000077486038,
            "periodMs": null
          }
        ],
        "school": "Holy",
        "damageTargetCap": 10
      },
      {
        "rank": 2,
        "level": 28,
        "id": 15430,
        "mana": 290,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "Causes an explosion of holy light around the caster, causing 48 to 55 Holy damage to all enemy targets within 10 yards and healing all party members within 10 yards for 80 to 90. These effects cause no threat.\\n\\nEach time Holy Fire deals damage, you have a 5% chance for your next Holy Nova to cost no Mana.",
        "damageMin": 48,
        "damageMax": 55,
        "effects": [
          {
            "id": 693819,
            "owner": 15430,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 49,
            "perLevel": 0.4000000059604645,
            "variance": 0.14814814925193787,
            "baseLevel": 28,
            "maxLevel": 34,
            "spellPowerCoefficient": 0.10700000077486038,
            "periodMs": null
          }
        ],
        "school": "Holy",
        "damageTargetCap": 10
      },
      {
        "rank": 3,
        "level": 36,
        "id": 15431,
        "mana": 400,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "Causes an explosion of holy light around the caster, causing 73 to 84 Holy damage to all enemy targets within 10 yards and healing all party members within 10 yards for 112 to 128. These effects cause no threat.\\n\\nEach time Holy Fire deals damage, you have a 5% chance for your next Holy Nova to cost no Mana.",
        "damageMin": 73,
        "damageMax": 84,
        "effects": [
          {
            "id": 692793,
            "owner": 15431,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 75,
            "perLevel": 0.6000000238418579,
            "variance": 0.1463414579629898,
            "baseLevel": 36,
            "maxLevel": 42,
            "spellPowerCoefficient": 0.10700000077486038,
            "periodMs": null
          }
        ],
        "school": "Holy",
        "damageTargetCap": 10
      },
      {
        "rank": 4,
        "level": 44,
        "id": 27799,
        "mana": 520,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "Causes an explosion of holy light around the caster, causing 103 to 118 Holy damage to all enemy targets within 10 yards and healing all party members within 10 yards for 151 to 175. These effects cause no threat.\\n\\nEach time Holy Fire deals damage, you have a 5% chance for your next Holy Nova to cost no Mana.",
        "damageMin": 103,
        "damageMax": 118,
        "effects": [
          {
            "id": 704735,
            "owner": 27799,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 106,
            "perLevel": 0.800000011920929,
            "variance": 0.14035087823867798,
            "baseLevel": 44,
            "maxLevel": 50,
            "spellPowerCoefficient": 0.10700000077486038,
            "periodMs": null
          }
        ],
        "school": "Holy",
        "damageTargetCap": 10
      },
      {
        "rank": 5,
        "level": 52,
        "id": 27800,
        "mana": 635,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "Causes an explosion of holy light around the caster, causing 139 to 159 Holy damage to all enemy targets within 10 yards and healing all party members within 10 yards for 226 to 260. These effects cause no threat.\\n\\nEach time Holy Fire deals damage, you have a 5% chance for your next Holy Nova to cost no Mana.",
        "damageMin": 139,
        "damageMax": 159,
        "effects": [
          {
            "id": 704705,
            "owner": 27800,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 143,
            "perLevel": 1,
            "variance": 0.14569535851478577,
            "baseLevel": 52,
            "maxLevel": 58,
            "spellPowerCoefficient": 0.10700000077486038,
            "periodMs": null
          }
        ],
        "school": "Holy",
        "damageTargetCap": 10
      },
      {
        "rank": 6,
        "level": 60,
        "id": 27801,
        "mana": 750,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "Causes an explosion of holy light around the caster, causing 174 to 200 Holy damage to all enemy targets within 10 yards and healing all party members within 10 yards for 288 to 334. These effects cause no threat.\\n\\nEach time Holy Fire deals damage, you have a 5% chance for your next Holy Nova to cost no Mana.",
        "damageMin": 174,
        "damageMax": 200,
        "effects": [
          {
            "id": 704706,
            "owner": 27801,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 187,
            "perLevel": 1.2000000476837158,
            "variance": 0.14358974993228912,
            "baseLevel": 60,
            "maxLevel": 66,
            "spellPowerCoefficient": 0.10700000077486038,
            "periodMs": null
          }
        ],
        "school": "Holy",
        "damageTargetCap": 10
      }
    ],
    "talentSetting": "holyNovaTalent",
    "talentPoints": 11,
    "talentTree": "Holy",
    "targetsSetting": "enemyTargets"
  },
  {
    "name": "Mana Burn",
    "school": "Shadow",
    "race": null,
    "kind": "mana-burn",
    "description": "Drains Mana and deals 0.5 Shadow damage per Mana actually removed; if the target has less Mana, damage falls accordingly.",
    "ranks": [
      {
        "rank": 1,
        "level": 24,
        "id": 8129,
        "mana": 95,
        "castSeconds": 3,
        "castType": "3 sec cast",
        "cooldown": 0,
        "tooltip": "Drains 199 to 210 mana from a target. For each mana drained in this way, the target takes 0.5 Shadow damage.",
        "drainMin": 199,
        "drainMax": 210,
        "damagePerMana": 0.5,
        "effects": [
          {
            "id": 686159,
            "owner": 8129,
            "type": "E_POWER_BURN",
            "aura": null,
            "basePoints": 197,
            "perLevel": 1.5,
            "variance": 0.060913704335689545,
            "baseLevel": 24,
            "maxLevel": 29,
            "spellPowerCoefficient": null,
            "periodMs": 0.5
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 2,
        "level": 32,
        "id": 8131,
        "mana": 140,
        "castSeconds": 3,
        "castType": "3 sec cast",
        "cooldown": 0,
        "tooltip": "Drains 315 to 336 mana from a target. For each mana drained in this way, the target takes 0.5 Shadow damage.",
        "drainMin": 315,
        "drainMax": 336,
        "damagePerMana": 0.5,
        "effects": [
          {
            "id": 686716,
            "owner": 8131,
            "type": "E_POWER_BURN",
            "aura": null,
            "basePoints": 319,
            "perLevel": 1.2999999523162842,
            "variance": 0.0626959279179573,
            "baseLevel": 32,
            "maxLevel": 37,
            "spellPowerCoefficient": null,
            "periodMs": 0.5
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 3,
        "level": 40,
        "id": 10874,
        "mana": 185,
        "castSeconds": 3,
        "castType": "3 sec cast",
        "cooldown": 0,
        "tooltip": "Drains 450 to 476 mana from a target. For each mana drained in this way, the target takes 0.5 Shadow damage.",
        "drainMin": 450,
        "drainMax": 476,
        "damagePerMana": 0.5,
        "effects": [
          {
            "id": 689020,
            "owner": 10874,
            "type": "E_POWER_BURN",
            "aura": null,
            "basePoints": 455,
            "perLevel": 1.600000023841858,
            "variance": 0.05714285746216774,
            "baseLevel": 40,
            "maxLevel": 45,
            "spellPowerCoefficient": null,
            "periodMs": 0.5
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 4,
        "level": 48,
        "id": 10875,
        "mana": 225,
        "castSeconds": 3,
        "castType": "3 sec cast",
        "cooldown": 0,
        "tooltip": "Drains 586 to 619 mana from a target. For each mana drained in this way, the target takes 0.5 Shadow damage.",
        "drainMin": 586,
        "drainMax": 619,
        "damagePerMana": 0.5,
        "effects": [
          {
            "id": 689023,
            "owner": 10875,
            "type": "E_POWER_BURN",
            "aura": null,
            "basePoints": 593,
            "perLevel": 1.899999976158142,
            "variance": 0.05733558163046837,
            "baseLevel": 48,
            "maxLevel": 53,
            "spellPowerCoefficient": null,
            "periodMs": 0.5
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 5,
        "level": 56,
        "id": 10876,
        "mana": 270,
        "castSeconds": 3,
        "castType": "3 sec cast",
        "cooldown": 0,
        "tooltip": "Drains 746 to 788 mana from a target. For each mana drained in this way, the target takes 0.5 Shadow damage.",
        "drainMin": 746,
        "drainMax": 788,
        "damagePerMana": 0.5,
        "effects": [
          {
            "id": 689256,
            "owner": 10876,
            "type": "E_POWER_BURN",
            "aura": null,
            "basePoints": 759,
            "perLevel": 2.0999999046325684,
            "variance": 0.05533596873283386,
            "baseLevel": 56,
            "maxLevel": 61,
            "spellPowerCoefficient": null,
            "periodMs": 0.5
          }
        ],
        "school": "Shadow"
      }
    ]
  },
  {
    "name": "Mind Blast",
    "school": "Shadow",
    "race": null,
    "kind": "direct",
    "description": "A 1.5-second Shadow strike with an eight-second cooldown, reduced by Improved Mind Blast.",
    "ranks": [
      {
        "rank": 1,
        "level": 10,
        "id": 8092,
        "mana": 50,
        "castSeconds": 1.5,
        "castType": "1.5 sec cast",
        "cooldown": 8,
        "tooltip": "Blasts the target for 40 to 44 Shadow damage, but causes a high amount of threat.",
        "damageMin": 40,
        "damageMax": 44,
        "effects": [
          {
            "id": 687704,
            "owner": 8092,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 39,
            "perLevel": 0.6000000238418579,
            "variance": 0.09756097197532654,
            "baseLevel": 10,
            "maxLevel": 15,
            "spellPowerCoefficient": 0.42899999022483826,
            "periodMs": null
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 2,
        "level": 16,
        "id": 8102,
        "mana": 80,
        "castSeconds": 1.5,
        "castType": "1.5 sec cast",
        "cooldown": 8,
        "tooltip": "Blasts the target for 70 to 75 Shadow damage, but causes a high amount of threat.",
        "damageMin": 70,
        "damageMax": 75,
        "effects": [
          {
            "id": 693173,
            "owner": 8102,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 68,
            "perLevel": 0.8999999761581421,
            "variance": 0.07999999821186066,
            "baseLevel": 16,
            "maxLevel": 21,
            "spellPowerCoefficient": 0.42899999022483826,
            "periodMs": null
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 3,
        "level": 22,
        "id": 8103,
        "mana": 110,
        "castSeconds": 1.5,
        "castType": "1.5 sec cast",
        "cooldown": 8,
        "tooltip": "Blasts the target for 103 to 110 Shadow damage, but causes a high amount of threat.",
        "damageMin": 103,
        "damageMax": 110,
        "effects": [
          {
            "id": 687334,
            "owner": 8103,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 101,
            "perLevel": 1.100000023841858,
            "variance": 0.06896551698446274,
            "baseLevel": 22,
            "maxLevel": 27,
            "spellPowerCoefficient": 0.42899999022483826,
            "periodMs": null
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 4,
        "level": 28,
        "id": 8104,
        "mana": 150,
        "castSeconds": 1.5,
        "castType": "1.5 sec cast",
        "cooldown": 8,
        "tooltip": "Blasts the target for 154 to 162 Shadow damage, but causes a high amount of threat.",
        "damageMin": 154,
        "damageMax": 162,
        "effects": [
          {
            "id": 686110,
            "owner": 8104,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 151,
            "perLevel": 1.399999976158142,
            "variance": 0.058139536529779434,
            "baseLevel": 28,
            "maxLevel": 33,
            "spellPowerCoefficient": 0.42899999022483826,
            "periodMs": null
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 5,
        "level": 34,
        "id": 8105,
        "mana": 185,
        "castSeconds": 1.5,
        "castType": "1.5 sec cast",
        "cooldown": 8,
        "tooltip": "Blasts the target for 198 to 210 Shadow damage, but causes a high amount of threat.",
        "damageMin": 198,
        "damageMax": 210,
        "effects": [
          {
            "id": 686184,
            "owner": 8105,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 196,
            "perLevel": 1.600000023841858,
            "variance": 0.0625,
            "baseLevel": 34,
            "maxLevel": 39,
            "spellPowerCoefficient": 0.42899999022483826,
            "periodMs": null
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 6,
        "level": 40,
        "id": 8106,
        "mana": 225,
        "castSeconds": 1.5,
        "castType": "1.5 sec cast",
        "cooldown": 8,
        "tooltip": "Blasts the target for 259 to 276 Shadow damage, but causes a high amount of threat.",
        "damageMin": 259,
        "damageMax": 276,
        "effects": [
          {
            "id": 686207,
            "owner": 8106,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 258,
            "perLevel": 1.899999976158142,
            "variance": 0.0625,
            "baseLevel": 40,
            "maxLevel": 45,
            "spellPowerCoefficient": 0.42899999022483826,
            "periodMs": null
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 7,
        "level": 46,
        "id": 10945,
        "mana": 265,
        "castSeconds": 1.5,
        "castType": "1.5 sec cast",
        "cooldown": 8,
        "tooltip": "Blasts the target for 325 to 344 Shadow damage, but causes a high amount of threat.",
        "damageMin": 325,
        "damageMax": 344,
        "effects": [
          {
            "id": 689529,
            "owner": 10945,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 324,
            "perLevel": 2.0999999046325684,
            "variance": 0.056179776787757874,
            "baseLevel": 46,
            "maxLevel": 51,
            "spellPowerCoefficient": 0.42899999022483826,
            "periodMs": null
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 8,
        "level": 52,
        "id": 10946,
        "mana": 310,
        "castSeconds": 1.5,
        "castType": "1.5 sec cast",
        "cooldown": 8,
        "tooltip": "Blasts the target for 406 to 428 Shadow damage, but causes a high amount of threat.",
        "damageMin": 406,
        "damageMax": 428,
        "effects": [
          {
            "id": 688676,
            "owner": 10946,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 405,
            "perLevel": 2.4000000953674316,
            "variance": 0.05491990968585014,
            "baseLevel": 52,
            "maxLevel": 57,
            "spellPowerCoefficient": 0.42899999022483826,
            "periodMs": null
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 9,
        "level": 58,
        "id": 10947,
        "mana": 350,
        "castSeconds": 1.5,
        "castType": "1.5 sec cast",
        "cooldown": 8,
        "tooltip": "Blasts the target for 477 to 503 Shadow damage, but causes a high amount of threat.",
        "damageMin": 477,
        "damageMax": 503,
        "effects": [
          {
            "id": 689115,
            "owner": 10947,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 485,
            "perLevel": 2.5999999046325684,
            "variance": 0.05415860563516617,
            "baseLevel": 58,
            "maxLevel": 63,
            "spellPowerCoefficient": 0.42899999022483826,
            "periodMs": null
          }
        ],
        "school": "Shadow"
      }
    ]
  },
  {
    "name": "Mind Flay",
    "school": "Shadow",
    "race": null,
    "kind": "channel-dot",
    "description": "Requires the Mind Flay talent. Channeled Shadow damage over three seconds; slows the target.",
    "ranks": [
      {
        "rank": 1,
        "level": 20,
        "id": 15407,
        "mana": 45,
        "castSeconds": 3,
        "castType": "Channeled",
        "cooldown": 0,
        "tooltip": "Assault the target's mind with Shadow energy, causing 63 Shadow damage over 3 sec and slowing their movement speed by 50%.",
        "dotTotalMin": 63,
        "dotTotalMax": 63,
        "duration": 3,
        "effects": [
          {
            "id": 693750,
            "owner": 15407,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 21,
            "perLevel": null,
            "variance": null,
            "baseLevel": 20,
            "maxLevel": 28,
            "spellPowerCoefficient": 0.16699999570846558,
            "periodMs": 1000
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 2,
        "level": 28,
        "id": 17311,
        "mana": 70,
        "castSeconds": 3,
        "castType": "Channeled",
        "cooldown": 0,
        "tooltip": "Assault the target's mind with Shadow energy, causing 102 Shadow damage over 3 sec and slowing their movement speed by 50%.",
        "dotTotalMin": 102,
        "dotTotalMax": 102,
        "duration": 3,
        "effects": [
          {
            "id": 693024,
            "owner": 17311,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 34,
            "perLevel": null,
            "variance": null,
            "baseLevel": 28,
            "maxLevel": 36,
            "spellPowerCoefficient": 0.16699999570846558,
            "periodMs": 1000
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 3,
        "level": 36,
        "id": 17312,
        "mana": 100,
        "castSeconds": 3,
        "castType": "Channeled",
        "cooldown": 0,
        "tooltip": "Assault the target's mind with Shadow energy, causing 153 Shadow damage over 3 sec and slowing their movement speed by 50%.",
        "dotTotalMin": 153,
        "dotTotalMax": 153,
        "duration": 3,
        "effects": [
          {
            "id": 695277,
            "owner": 17312,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 51,
            "perLevel": null,
            "variance": null,
            "baseLevel": 36,
            "maxLevel": 44,
            "spellPowerCoefficient": 0.16699999570846558,
            "periodMs": 1000
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 4,
        "level": 44,
        "id": 17313,
        "mana": 135,
        "castSeconds": 3,
        "castType": "Channeled",
        "cooldown": 0,
        "tooltip": "Assault the target's mind with Shadow energy, causing 225 Shadow damage over 3 sec and slowing their movement speed by 50%.",
        "dotTotalMin": 225,
        "dotTotalMax": 225,
        "duration": 3,
        "effects": [
          {
            "id": 695229,
            "owner": 17313,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 75,
            "perLevel": null,
            "variance": null,
            "baseLevel": 44,
            "maxLevel": 52,
            "spellPowerCoefficient": 0.16699999570846558,
            "periodMs": 1000
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 5,
        "level": 52,
        "id": 17314,
        "mana": 165,
        "castSeconds": 3,
        "castType": "Channeled",
        "cooldown": 0,
        "tooltip": "Assault the target's mind with Shadow energy, causing 294 Shadow damage over 3 sec and slowing their movement speed by 50%.",
        "dotTotalMin": 294,
        "dotTotalMax": 294,
        "duration": 3,
        "effects": [
          {
            "id": 694607,
            "owner": 17314,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 98,
            "perLevel": null,
            "variance": null,
            "baseLevel": 52,
            "maxLevel": 60,
            "spellPowerCoefficient": 0.16699999570846558,
            "periodMs": 1000
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 6,
        "level": 60,
        "id": 18807,
        "mana": 205,
        "castSeconds": 3,
        "castType": "Channeled",
        "cooldown": 0,
        "tooltip": "Assault the target's mind with Shadow energy, causing 390 Shadow damage over 3 sec and slowing their movement speed by 50%.",
        "dotTotalMin": 390,
        "dotTotalMax": 390,
        "duration": 3,
        "effects": [
          {
            "id": 696948,
            "owner": 18807,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 130,
            "perLevel": null,
            "variance": null,
            "baseLevel": 60,
            "maxLevel": 68,
            "spellPowerCoefficient": 0.16699999570846558,
            "periodMs": 1000
          }
        ],
        "school": "Shadow"
      }
    ],
    "talentPoints": 11,
    "talentTree": "Shadow",
    "periodicCanCrit": true,
    "talentSetting": "mindFlayTalent"
  },
  {
    "name": "Penance",
    "school": "Holy",
    "race": null,
    "kind": "channel-bolts",
    "description": "Requires the Penance talent. A two-second channel of three holy bolts; cast on an ally to heal or an enemy to damage. Twelve-second cooldown.",
    "ranks": [
      {
        "rank": 1,
        "level": 30,
        "id": 402174,
        "mana": 150,
        "castSeconds": 2,
        "castType": "Channeled",
        "cooldown": 12,
        "tooltip": "Launches a volley of holy light at the target, causing 45 Holy damage to an enemy, or 134 healing to an ally, instantly and every 1 sec for 2 sec.",
        "damageMin": 45,
        "damageMax": 45,
        "hits": 3,
        "duration": 2,
        "effects": [
          {
            "id": 1048631,
            "owner": 402284,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 42,
            "perLevel": 0.28999999165534973,
            "variance": null,
            "baseLevel": 30,
            "maxLevel": 39,
            "spellPowerCoefficient": 0.1899999976158142,
            "periodMs": null
          }
        ],
        "school": "Holy",
        "boltIntervalSeconds": 1
      },
      {
        "rank": 2,
        "level": 40,
        "id": 1240720,
        "mana": 220,
        "castSeconds": 2,
        "castType": "Channeled",
        "cooldown": 12,
        "tooltip": "Launches a volley of holy light at the target, causing 53 Holy damage to an enemy, or 209 healing to an ally, instantly and every 1 sec for 2 sec.",
        "damageMin": 53,
        "damageMax": 53,
        "hits": 3,
        "duration": 2,
        "effects": [
          {
            "id": 1239263,
            "owner": 1240727,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 50,
            "perLevel": 0.33000001311302185,
            "variance": null,
            "baseLevel": 40,
            "maxLevel": 49,
            "spellPowerCoefficient": 0.1899999976158142,
            "periodMs": null
          }
        ],
        "school": "Holy",
        "boltIntervalSeconds": 1
      },
      {
        "rank": 3,
        "level": 50,
        "id": 1240721,
        "mana": 270,
        "castSeconds": 2,
        "castType": "Channeled",
        "cooldown": 12,
        "tooltip": "Launches a volley of holy light at the target, causing 72 Holy damage to an enemy, or 279 healing to an ally, instantly and every 1 sec for 2 sec.",
        "damageMin": 72,
        "damageMax": 72,
        "hits": 3,
        "duration": 2,
        "effects": [
          {
            "id": 1239266,
            "owner": 1240730,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 68,
            "perLevel": 0.4300000071525574,
            "variance": null,
            "baseLevel": 50,
            "maxLevel": 59,
            "spellPowerCoefficient": 0.1899999976158142,
            "periodMs": null
          }
        ],
        "school": "Holy",
        "boltIntervalSeconds": 1
      },
      {
        "rank": 4,
        "level": 60,
        "id": 1316995,
        "mana": 385,
        "castSeconds": 2,
        "castType": "Channeled",
        "cooldown": 12,
        "tooltip": "Launches a volley of holy light at the target, causing 92 Holy damage to an enemy, or 425 healing to an ally, instantly and every 1 sec for 2 sec.",
        "damageMin": 92,
        "damageMax": 92,
        "hits": 3,
        "duration": 2,
        "effects": [],
        "school": "Holy",
        "boltIntervalSeconds": 1
      }
    ],
    "talentSetting": "penanceTalent",
    "talentPoints": 21,
    "talentTree": "Discipline"
  },
  {
    "name": "Shadow Word: Death",
    "school": "Shadow",
    "race": null,
    "kind": "direct-backlash",
    "description": "Instant Shadow strike. If a hit does not kill the target, the Priest takes backlash equal to 30% of maximum health; misses do not cause backlash.",
    "ranks": [
      {
        "rank": 1,
        "level": 32,
        "id": 1309595,
        "mana": 175,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 18,
        "tooltip": "A word of dark binding that inflicts 294 to 311 Shadow damage to the target. If your target is not killed by Shadow Word: Death, you take backlash damage equal to 30% of your maximum health.",
        "damageMin": 294,
        "damageMax": 311,
        "effects": [
          {
            "id": 1338637,
            "owner": 1309595,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 295,
            "perLevel": 1.5,
            "variance": 0.060499999672174454,
            "baseLevel": 32,
            "maxLevel": 37,
            "spellPowerCoefficient": 0.42899999022483826,
            "periodMs": null
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 2,
        "level": 40,
        "id": 1309633,
        "mana": 205,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 18,
        "tooltip": "A word of dark binding that inflicts 368 to 391 Shadow damage to the target. If your target is not killed by Shadow Word: Death, you take backlash damage equal to 30% of your maximum health.",
        "damageMin": 368,
        "damageMax": 391,
        "effects": [
          {
            "id": 1338678,
            "owner": 1309633,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 370,
            "perLevel": 1.899999976158142,
            "variance": 0.060499999672174454,
            "baseLevel": 40,
            "maxLevel": 45,
            "spellPowerCoefficient": 0.42899999022483826,
            "periodMs": null
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 3,
        "level": 48,
        "id": 1309635,
        "mana": 250,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 18,
        "tooltip": "A word of dark binding that inflicts 402 to 426 Shadow damage to the target. If your target is not killed by Shadow Word: Death, you take backlash damage equal to 30% of your maximum health.",
        "damageMin": 402,
        "damageMax": 426,
        "effects": [
          {
            "id": 1338682,
            "owner": 1309635,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 403,
            "perLevel": 2.200000047683716,
            "variance": 0.060499999672174454,
            "baseLevel": 48,
            "maxLevel": 53,
            "spellPowerCoefficient": 0.42899999022483826,
            "periodMs": null
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 4,
        "level": 56,
        "id": 1309636,
        "mana": 340,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 18,
        "tooltip": "A word of dark binding that inflicts 444 to 472 Shadow damage to the target. If your target is not killed by Shadow Word: Death, you take backlash damage equal to 30% of your maximum health.",
        "damageMin": 444,
        "damageMax": 472,
        "effects": [
          {
            "id": 1338685,
            "owner": 1309636,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 448,
            "perLevel": 2.5,
            "variance": 0.060499999672174454,
            "baseLevel": 56,
            "maxLevel": 61,
            "spellPowerCoefficient": 0.42899999022483826,
            "periodMs": null
          }
        ],
        "school": "Shadow"
      }
    ]
  },
  {
    "name": "Shadow Word: Pain",
    "school": "Shadow",
    "race": null,
    "kind": "dot",
    "description": "Instant Shadow damage over 18 seconds; with Improved Shadow Word: Pain, duration increases by 6 seconds.",
    "ranks": [
      {
        "rank": 1,
        "level": 4,
        "id": 589,
        "mana": 25,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "A word of darkness that causes 30 Shadow damage over 18 sec.",
        "dotTotalMin": 30,
        "dotTotalMax": 30,
        "duration": 18,
        "effects": [
          {
            "id": 679085,
            "owner": 589,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 5,
            "perLevel": null,
            "variance": null,
            "baseLevel": 4,
            "maxLevel": null,
            "spellPowerCoefficient": 0.20000000298023224,
            "periodMs": 3000
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 2,
        "level": 10,
        "id": 594,
        "mana": 50,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "A word of darkness that causes 60 Shadow damage over 18 sec.",
        "dotTotalMin": 60,
        "dotTotalMax": 60,
        "duration": 18,
        "effects": [
          {
            "id": 679135,
            "owner": 594,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 10,
            "perLevel": null,
            "variance": null,
            "baseLevel": 10,
            "maxLevel": null,
            "spellPowerCoefficient": 0.20000000298023224,
            "periodMs": 3000
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 3,
        "level": 18,
        "id": 970,
        "mana": 95,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "A word of darkness that causes 108 Shadow damage over 18 sec.",
        "dotTotalMin": 108,
        "dotTotalMax": 108,
        "duration": 18,
        "effects": [
          {
            "id": 680485,
            "owner": 970,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 18,
            "perLevel": null,
            "variance": null,
            "baseLevel": 18,
            "maxLevel": null,
            "spellPowerCoefficient": 0.20000000298023224,
            "periodMs": 3000
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 4,
        "level": 26,
        "id": 992,
        "mana": 155,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "A word of darkness that causes 180 Shadow damage over 18 sec.",
        "dotTotalMin": 180,
        "dotTotalMax": 180,
        "duration": 18,
        "effects": [
          {
            "id": 685502,
            "owner": 992,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 30,
            "perLevel": null,
            "variance": null,
            "baseLevel": 26,
            "maxLevel": null,
            "spellPowerCoefficient": 0.20000000298023224,
            "periodMs": 3000
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 5,
        "level": 34,
        "id": 2767,
        "mana": 230,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "A word of darkness that causes 288 Shadow damage over 18 sec.",
        "dotTotalMin": 288,
        "dotTotalMax": 288,
        "duration": 18,
        "effects": [
          {
            "id": 680965,
            "owner": 2767,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 48,
            "perLevel": null,
            "variance": null,
            "baseLevel": 34,
            "maxLevel": null,
            "spellPowerCoefficient": 0.20000000298023224,
            "periodMs": 3000
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 6,
        "level": 42,
        "id": 10892,
        "mana": 305,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "A word of darkness that causes 426 Shadow damage over 18 sec.",
        "dotTotalMin": 426,
        "dotTotalMax": 426,
        "duration": 18,
        "effects": [
          {
            "id": 687736,
            "owner": 10892,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 71,
            "perLevel": null,
            "variance": null,
            "baseLevel": 42,
            "maxLevel": null,
            "spellPowerCoefficient": 0.20000000298023224,
            "periodMs": 3000
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 7,
        "level": 50,
        "id": 10893,
        "mana": 385,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "A word of darkness that causes 582 Shadow damage over 18 sec.",
        "dotTotalMin": 582,
        "dotTotalMax": 582,
        "duration": 18,
        "effects": [
          {
            "id": 689287,
            "owner": 10893,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 97,
            "perLevel": null,
            "variance": null,
            "baseLevel": 50,
            "maxLevel": null,
            "spellPowerCoefficient": 0.20000000298023224,
            "periodMs": 3000
          }
        ],
        "school": "Shadow"
      },
      {
        "rank": 8,
        "level": 58,
        "id": 10894,
        "mana": 470,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "A word of darkness that causes 762 Shadow damage over 18 sec.",
        "dotTotalMin": 762,
        "dotTotalMax": 762,
        "duration": 18,
        "effects": [
          {
            "id": 688996,
            "owner": 10894,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 127,
            "perLevel": null,
            "variance": null,
            "baseLevel": 58,
            "maxLevel": null,
            "spellPowerCoefficient": 0.20000000298023224,
            "periodMs": 3000
          }
        ],
        "school": "Shadow"
      }
    ],
    "periodicCanCrit": true
  },
  {
    "name": "Shadowguard",
    "school": "Shadow",
    "race": "Troll",
    "kind": "reactive",
    "description": "Troll racial. Three reactive Shadow charges over 10 minutes; an attacker can be damaged at most once every few seconds.",
    "ranks": [
      {
        "rank": 1,
        "level": 20,
        "id": 18137,
        "mana": 50,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "The caster is surrounded by shadows. When a spell, melee or ranged attack hits the caster, the attacker will be struck for 13 Shadow damage. Attackers can only be damaged once every few seconds. This damage causes no threat. 3 charges. Lasts 10 min.",
        "damageMin": 13,
        "damageMax": 13,
        "effects": [],
        "school": "Shadow"
      },
      {
        "rank": 2,
        "level": 28,
        "id": 19308,
        "mana": 85,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "The caster is surrounded by shadows. When a spell, melee or ranged attack hits the caster, the attacker will be struck for 22 Shadow damage. Attackers can only be damaged once every few seconds. This damage causes no threat. 3 charges. Lasts 10 min.",
        "damageMin": 22,
        "damageMax": 22,
        "effects": [],
        "school": "Shadow"
      },
      {
        "rank": 3,
        "level": 36,
        "id": 19309,
        "mana": 120,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "The caster is surrounded by shadows. When a spell, melee or ranged attack hits the caster, the attacker will be struck for 33 Shadow damage. Attackers can only be damaged once every few seconds. This damage causes no threat. 3 charges. Lasts 10 min.",
        "damageMin": 33,
        "damageMax": 33,
        "effects": [],
        "school": "Shadow"
      },
      {
        "rank": 4,
        "level": 44,
        "id": 19310,
        "mana": 160,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "The caster is surrounded by shadows. When a spell, melee or ranged attack hits the caster, the attacker will be struck for 50 Shadow damage. Attackers can only be damaged once every few seconds. This damage causes no threat. 3 charges. Lasts 10 min.",
        "damageMin": 50,
        "damageMax": 50,
        "effects": [],
        "school": "Shadow"
      },
      {
        "rank": 5,
        "level": 52,
        "id": 19311,
        "mana": 200,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "The caster is surrounded by shadows. When a spell, melee or ranged attack hits the caster, the attacker will be struck for 70 Shadow damage. Attackers can only be damaged once every few seconds. This damage causes no threat. 3 charges. Lasts 10 min.",
        "damageMin": 70,
        "damageMax": 70,
        "effects": [],
        "school": "Shadow"
      },
      {
        "rank": 6,
        "level": 60,
        "id": 19312,
        "mana": 250,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "The caster is surrounded by shadows. When a spell, melee or ranged attack hits the caster, the attacker will be struck for 96 Shadow damage. Attackers can only be damaged once every few seconds. This damage causes no threat. 3 charges. Lasts 10 min.",
        "damageMin": 96,
        "damageMax": 96,
        "effects": [],
        "school": "Shadow"
      }
    ]
  },
  {
    "name": "Smite",
    "school": "Holy",
    "race": null,
    "kind": "direct",
    "description": "Holy direct damage; cast time varies by rank and can be reduced by Divine Fury.",
    "ranks": [
      {
        "rank": 1,
        "level": 1,
        "id": 585,
        "mana": 20,
        "castSeconds": 1.5,
        "castType": "1.5 sec cast",
        "cooldown": 0,
        "tooltip": "Smite an enemy for 13 to 18 Holy damage.",
        "damageMin": 13,
        "damageMax": 18,
        "effects": [
          {
            "id": 678981,
            "owner": 585,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 15,
            "perLevel": 0.10000000149011612,
            "variance": 0.2666666805744171,
            "baseLevel": 1,
            "maxLevel": 6,
            "spellPowerCoefficient": 0.42899999022483826,
            "periodMs": null
          }
        ],
        "school": "Holy"
      },
      {
        "rank": 2,
        "level": 6,
        "id": 591,
        "mana": 30,
        "castSeconds": 2,
        "castType": "2 sec cast",
        "cooldown": 0,
        "tooltip": "Smite an enemy for 26 to 31 Holy damage.",
        "damageMin": 26,
        "damageMax": 31,
        "effects": [
          {
            "id": 679112,
            "owner": 591,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 27,
            "perLevel": 0.30000001192092896,
            "variance": 0.2142857164144516,
            "baseLevel": 6,
            "maxLevel": 11,
            "spellPowerCoefficient": 0.5709999799728394,
            "periodMs": null
          }
        ],
        "school": "Holy"
      },
      {
        "rank": 3,
        "level": 14,
        "id": 598,
        "mana": 60,
        "castSeconds": 2.5,
        "castType": "2.5 sec cast",
        "cooldown": 0,
        "tooltip": "Smite an enemy for 44 to 51 Holy damage.",
        "damageMin": 44,
        "damageMax": 51,
        "effects": [
          {
            "id": 678920,
            "owner": 598,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 45,
            "perLevel": 0.5,
            "variance": 0.13793103396892548,
            "baseLevel": 14,
            "maxLevel": 19,
            "spellPowerCoefficient": 0.7139999866485596,
            "periodMs": null
          }
        ],
        "school": "Holy"
      },
      {
        "rank": 4,
        "level": 22,
        "id": 984,
        "mana": 95,
        "castSeconds": 2.5,
        "castType": "2.5 sec cast",
        "cooldown": 0,
        "tooltip": "Smite an enemy for 59 to 68 Holy damage.",
        "damageMin": 59,
        "damageMax": 68,
        "effects": [
          {
            "id": 679210,
            "owner": 984,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 60,
            "perLevel": 0.699999988079071,
            "variance": 0.1428571492433548,
            "baseLevel": 22,
            "maxLevel": 27,
            "spellPowerCoefficient": 0.7139999866485596,
            "periodMs": null
          }
        ],
        "school": "Holy"
      },
      {
        "rank": 5,
        "level": 30,
        "id": 1004,
        "mana": 140,
        "castSeconds": 2.5,
        "castType": "2.5 sec cast",
        "cooldown": 0,
        "tooltip": "Smite an enemy for 81 to 91 Holy damage.",
        "damageMin": 81,
        "damageMax": 91,
        "effects": [
          {
            "id": 679387,
            "owner": 1004,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 81,
            "perLevel": 1,
            "variance": 0.125,
            "baseLevel": 30,
            "maxLevel": 35,
            "spellPowerCoefficient": 0.7139999866485596,
            "periodMs": null
          }
        ],
        "school": "Holy"
      },
      {
        "rank": 6,
        "level": 38,
        "id": 6060,
        "mana": 185,
        "castSeconds": 2.5,
        "castType": "2.5 sec cast",
        "cooldown": 0,
        "tooltip": "Smite an enemy for 94 to 105 Holy damage.",
        "damageMin": 94,
        "damageMax": 105,
        "effects": [
          {
            "id": 683188,
            "owner": 6060,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 94,
            "perLevel": 1.100000023841858,
            "variance": 0.12389379739761353,
            "baseLevel": 38,
            "maxLevel": 43,
            "spellPowerCoefficient": 0.7139999866485596,
            "periodMs": null
          }
        ],
        "school": "Holy"
      },
      {
        "rank": 7,
        "level": 46,
        "id": 10933,
        "mana": 230,
        "castSeconds": 2.5,
        "castType": "2.5 sec cast",
        "cooldown": 0,
        "tooltip": "Smite an enemy for 124 to 139 Holy damage.",
        "damageMin": 124,
        "damageMax": 139,
        "effects": [
          {
            "id": 689202,
            "owner": 10933,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 126,
            "perLevel": 1.100000023841858,
            "variance": 0.1180327832698822,
            "baseLevel": 46,
            "maxLevel": 51,
            "spellPowerCoefficient": 0.7139999866485596,
            "periodMs": null
          }
        ],
        "school": "Holy"
      },
      {
        "rank": 8,
        "level": 54,
        "id": 10934,
        "mana": 280,
        "castSeconds": 2.5,
        "castType": "2.5 sec cast",
        "cooldown": 0,
        "tooltip": "Smite an enemy for 167 to 186 Holy damage.",
        "damageMin": 167,
        "damageMax": 186,
        "effects": [
          {
            "id": 689263,
            "owner": 10934,
            "type": "E_SCHOOL_DAMAGE",
            "aura": null,
            "basePoints": 170,
            "perLevel": 1.2999999523162842,
            "variance": 0.1119592934846878,
            "baseLevel": 54,
            "maxLevel": 59,
            "spellPowerCoefficient": 0.7139999866485596,
            "periodMs": null
          }
        ],
        "school": "Holy"
      }
    ]
  },
  {
    "name": "Starshards",
    "school": "Arcane",
    "race": "Night Elf",
    "kind": "channel-dot",
    "description": "Night Elf racial. A six-second Arcane damage channel; 30-second cooldown.",
    "ranks": [
      {
        "rank": 1,
        "level": 10,
        "id": 10797,
        "mana": 50,
        "castSeconds": 6,
        "castType": "Channeled",
        "cooldown": 30,
        "tooltip": "Rains starshards down on the enemy target's head, causing 162 Arcane damage over 6 sec.",
        "dotTotalMin": 162,
        "dotTotalMax": 162,
        "duration": 6,
        "effects": [
          {
            "id": 687770,
            "owner": 10797,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 27,
            "perLevel": null,
            "variance": null,
            "baseLevel": 10,
            "maxLevel": 16,
            "spellPowerCoefficient": 0.16699999570846558,
            "periodMs": 1000
          }
        ],
        "school": "Arcane"
      },
      {
        "rank": 2,
        "level": 18,
        "id": 19296,
        "mana": 85,
        "castSeconds": 6,
        "castType": "Channeled",
        "cooldown": 30,
        "tooltip": "Rains starshards down on the enemy target's head, causing 300 Arcane damage over 6 sec.",
        "dotTotalMin": 300,
        "dotTotalMax": 300,
        "duration": 6,
        "effects": [
          {
            "id": 697586,
            "owner": 19296,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 50,
            "perLevel": null,
            "variance": null,
            "baseLevel": 18,
            "maxLevel": 24,
            "spellPowerCoefficient": 0.16699999570846558,
            "periodMs": 1000
          }
        ],
        "school": "Arcane"
      },
      {
        "rank": 3,
        "level": 26,
        "id": 19299,
        "mana": 140,
        "castSeconds": 6,
        "castType": "Channeled",
        "cooldown": 30,
        "tooltip": "Rains starshards down on the enemy target's head, causing 528 Arcane damage over 6 sec.",
        "dotTotalMin": 528,
        "dotTotalMax": 528,
        "duration": 6,
        "effects": [
          {
            "id": 696734,
            "owner": 19299,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 88,
            "perLevel": null,
            "variance": null,
            "baseLevel": 26,
            "maxLevel": 32,
            "spellPowerCoefficient": 0.16699999570846558,
            "periodMs": 1000
          }
        ],
        "school": "Arcane"
      },
      {
        "rank": 4,
        "level": 34,
        "id": 19302,
        "mana": 190,
        "castSeconds": 6,
        "castType": "Channeled",
        "cooldown": 30,
        "tooltip": "Rains starshards down on the enemy target's head, causing 762 Arcane damage over 6 sec.",
        "dotTotalMin": 762,
        "dotTotalMax": 762,
        "duration": 6,
        "effects": [
          {
            "id": 696959,
            "owner": 19302,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 127,
            "perLevel": null,
            "variance": null,
            "baseLevel": 34,
            "maxLevel": 40,
            "spellPowerCoefficient": 0.16699999570846558,
            "periodMs": 1000
          }
        ],
        "school": "Arcane"
      },
      {
        "rank": 5,
        "level": 42,
        "id": 19303,
        "mana": 245,
        "castSeconds": 6,
        "castType": "Channeled",
        "cooldown": 30,
        "tooltip": "Rains starshards down on the enemy target's head, causing 1068 Arcane damage over 6 sec.",
        "dotTotalMin": 1068,
        "dotTotalMax": 1068,
        "duration": 6,
        "effects": [
          {
            "id": 696865,
            "owner": 19303,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 178,
            "perLevel": null,
            "variance": null,
            "baseLevel": 42,
            "maxLevel": 48,
            "spellPowerCoefficient": 0.16699999570846558,
            "periodMs": 1000
          }
        ],
        "school": "Arcane"
      },
      {
        "rank": 6,
        "level": 50,
        "id": 19304,
        "mana": 300,
        "castSeconds": 6,
        "castType": "Channeled",
        "cooldown": 30,
        "tooltip": "Rains starshards down on the enemy target's head, causing 1440 Arcane damage over 6 sec.",
        "dotTotalMin": 1440,
        "dotTotalMax": 1440,
        "duration": 6,
        "effects": [
          {
            "id": 695479,
            "owner": 19304,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 240,
            "perLevel": null,
            "variance": null,
            "baseLevel": 50,
            "maxLevel": 56,
            "spellPowerCoefficient": 0.16699999570846558,
            "periodMs": 1000
          }
        ],
        "school": "Arcane"
      },
      {
        "rank": 7,
        "level": 58,
        "id": 19305,
        "mana": 350,
        "castSeconds": 6,
        "castType": "Channeled",
        "cooldown": 30,
        "tooltip": "Rains starshards down on the enemy target's head, causing 1800 Arcane damage over 6 sec.",
        "dotTotalMin": 1800,
        "dotTotalMax": 1800,
        "duration": 6,
        "effects": [
          {
            "id": 695483,
            "owner": 19305,
            "type": "E_APPLY_AURA",
            "aura": "A_PERIODIC_DAMAGE",
            "basePoints": 300,
            "perLevel": null,
            "variance": null,
            "baseLevel": 58,
            "maxLevel": 64,
            "spellPowerCoefficient": 0.16699999570846558,
            "periodMs": 1000
          }
        ],
        "school": "Arcane"
      }
    ],
    "periodicCanCrit": true
  },
  {
    "name": "Touch of Weakness",
    "school": "Shadow",
    "race": "Undead",
    "kind": "reactive",
    "description": "Undead racial. The next melee attack against the Priest triggers Shadow damage and reduces attacker melee attack power.",
    "ranks": [
      {
        "rank": 1,
        "level": 10,
        "id": 2652,
        "mana": 25,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "The next melee attack against the caster will cause 8 Shadow damage and reduce the attacker's melee attack power by 43 for 2 min.",
        "damageMin": 8,
        "damageMax": 8,
        "effects": [],
        "school": "Shadow"
      },
      {
        "rank": 2,
        "level": 20,
        "id": 19261,
        "mana": 45,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "The next melee attack against the caster will cause 12 Shadow damage and reduce the attacker's melee attack power by 57 for 2 min.",
        "damageMin": 12,
        "damageMax": 12,
        "effects": [],
        "school": "Shadow"
      },
      {
        "rank": 3,
        "level": 30,
        "id": 19262,
        "mana": 75,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "The next melee attack against the caster will cause 18 Shadow damage and reduce the attacker's melee attack power by 85 for 2 min.",
        "damageMin": 18,
        "damageMax": 18,
        "effects": [],
        "school": "Shadow"
      },
      {
        "rank": 4,
        "level": 40,
        "id": 19264,
        "mana": 105,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "The next melee attack against the caster will cause 28 Shadow damage and reduce the attacker's melee attack power by 106 for 2 min.",
        "damageMin": 28,
        "damageMax": 28,
        "effects": [],
        "school": "Shadow"
      },
      {
        "rank": 5,
        "level": 50,
        "id": 19265,
        "mana": 145,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "The next melee attack on the caster will cause 40 Shadow damage and reduce the attacker's melee attack power by the attacker by 155 for 2 min.",
        "damageMin": 40,
        "damageMax": 40,
        "effects": [],
        "school": "Shadow"
      },
      {
        "rank": 6,
        "level": 60,
        "id": 19266,
        "mana": 195,
        "castSeconds": 0,
        "castType": "Instant",
        "cooldown": 0,
        "tooltip": "The next melee attack on the caster will cause 56 Shadow damage and reduce the attacker's melee attack power by the attacker by 204 for 2 min.",
        "damageMin": 56,
        "damageMax": 56,
        "effects": [],
        "school": "Shadow"
      }
    ]
  }
];
