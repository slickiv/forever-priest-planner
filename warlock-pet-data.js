/* Current client rank effects for the two supported Warlock pet damage spells. */
(function attachWarlockPetData(root) {
  root.WARLOCK_PET_ATTACKS = [
    {
      pet: "Imp",
      name: "Firebolt",
      school: "Fire",
      range: "30 yd",
      castSeconds: 2,
      cooldown: 0,
      ranks: [
        { rank: 1, level: 1, id: 3110, mana: 10, baseValue: 7, variance: 0, tooltipRange: { min: 6, max: 8 }, coefficient: 0.164 },
        { rank: 2, level: 8, id: 7799, mana: 20, baseValue: 13, variance: 0, tooltipRange: { min: 12, max: 14 }, coefficient: 0.314 },
        { rank: 3, level: 18, id: 7800, mana: 35, baseValue: 17, variance: 0, tooltipRange: { min: 15, max: 19 }, coefficient: 0.529 },
        { rank: 4, level: 28, id: 7801, mana: 50, baseValue: 20, variance: 0, tooltipRange: { min: 18, max: 22 }, coefficient: 0.571 },
        { rank: 5, level: 38, id: 7802, mana: 70, baseValue: 25, variance: 0.12, coefficient: 0.57 },
        { rank: 6, level: 48, id: 11762, mana: 95, baseValue: 35, variance: 0.11, coefficient: 0.57 },
        { rank: 7, level: 58, id: 11763, mana: 115, baseValue: 44, variance: 0.11, coefficient: 0.57 }
      ]
    },
    {
      pet: "Sayaad (Succubus/Incubus)",
      name: "Lash of Pain",
      school: "Shadow",
      range: "5 yd",
      castSeconds: 0,
      cooldown: 12,
      ranks: [
        { rank: 1, level: 20, id: 7814, mana: 65, baseValue: 16, variance: 0, coefficient: 0.43 },
        { rank: 2, level: 28, id: 7815, mana: 80, baseValue: 22, variance: 0, coefficient: 0.43 },
        { rank: 3, level: 36, id: 7816, mana: 105, baseValue: 30, variance: 0, coefficient: 0.43 },
        { rank: 4, level: 44, id: 11778, mana: 125, baseValue: 36, variance: 0, coefficient: 0.43 },
        { rank: 5, level: 52, id: 11779, mana: 145, baseValue: 43, variance: 0, coefficient: 0.43 },
        { rank: 6, level: 60, id: 11780, mana: 160, baseValue: 50, variance: 0, coefficient: 0.43 }
      ]
    }
  ];
})(typeof window === "undefined" ? globalThis : window);
