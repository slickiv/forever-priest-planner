const SLOTS = [
  ["head","Head"],["neck","Neck"],["shoulders","Shoulders"],["back","Back"],["chest","Chest"],
  ["wrists","Wrists"],["hands","Hands"],["waist","Waist"],["legs","Legs"],["feet","Feet"],
  ["finger1","Ring 1"],["finger2","Ring 2"],["trinket1","Trinket 1"],["trinket2","Trinket 2"],
  ["mainhand","Main hand"],["offhand","Off hand"],["ranged","Ranged"]
];
const STORE_KEY = "forever-priest-planner-v1";
let gear = readGear();
let editingSlot = null;

function readGear() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || "{}"); }
  catch { return {}; }
}
function saveGear() { localStorage.setItem(STORE_KEY, JSON.stringify(gear)); renderGear(); }
function esc(value) { return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function number(value) { return Number(value || 0); }
function sum(key) { return Object.values(gear).reduce((total, item) => total + number(item[key]), 0); }
function wowheadItems() { return "https://www.wowhead.com/forever/items/class:5"; }
function renderGear() {
  const host = document.querySelector("#gearGrid");
  host.innerHTML = SLOTS.map(([id,label]) => {
    const item = gear[id];
    const slotType = ["head","shoulders","back","chest","wrists","hands","waist","legs","feet"].includes(id) ? "CLOTH" : (["neck","finger1","finger2","trinket1","trinket2"].includes(id) ? "ACCESSORY" : "HELD ITEM");
    const itemHref = item?.id ? `https://www.wowhead.com/forever/item=${encodeURIComponent(item.id)}` : wowheadItems();
    const stats = item ? `<div class="slot-stats"><span>+${number(item.healing)} heal</span><span>+${number(item.spellPower)} SP</span><span>${number(item.intellect)} int</span><span>${number(item.spirit)} spi</span><span>${number(item.mp5)} mp5</span></div>` : "";
    const source = item?.source ? `<a class="slot-source" href="https://www.wowhead.com/forever/search?q=${encodeURIComponent(item.source)}" target="_blank" rel="noreferrer">Loot source: ${esc(item.source)} ↗</a>` : "";
    return `<article class="gear-slot ${item ? "filled" : ""}">
      <div class="slot-top"><span class="slot-label">${label}</span><span class="cloth-tag">${slotType}</span></div>
      ${item ? `<a class="slot-item" href="${itemHref}" target="_blank" rel="noreferrer">${esc(item.name || `Wowhead item ${item.id || ""}`)} ↗</a>${source}${stats}` : `<span class="empty-slot">No item selected</span>`}
      <div class="slot-actions"><a href="${wowheadItems()}" target="_blank" rel="noreferrer">Wowhead finder ↗</a><button type="button" data-edit="${id}">${item ? "Edit" : "Add item"}</button></div>
    </article>`;
  }).join("");
  host.querySelectorAll("[data-edit]").forEach(button => button.addEventListener("click", () => openItem(button.dataset.edit)));
  const totals = {healing:sum("healing"),spellPower:sum("spellPower"),intellect:sum("intellect"),spirit:sum("spirit"),mp5:sum("mp5")};
  for (const [key,value] of Object.entries(totals)) document.querySelector(`#total${key[0].toUpperCase()}${key.slice(1)}`).textContent = value;
  document.querySelector("#heroHealing").textContent = totals.healing;
  document.querySelector("#bonusHealing").value = totals.healing;
  document.querySelector("#bonusSpellPower").value = totals.spellPower;
  renderSpells();
}

function openItem(slot) {
  editingSlot = slot;
  const item = gear[slot] || {};
  document.querySelector("#dialogTitle").textContent = `${item.name ? "Edit" : "Add"} ${SLOTS.find(s => s[0] === slot)[1]} item`;
  document.querySelector("#itemName").value = item.name || "";
  document.querySelector("#itemId").value = item.id || "";
  document.querySelector("#itemHealing").value = item.healing || 0;
  document.querySelector("#itemSpellPower").value = item.spellPower || 0;
  document.querySelector("#itemIntellect").value = item.intellect || 0;
  document.querySelector("#itemSpirit").value = item.spirit || 0;
  document.querySelector("#itemMp5").value = item.mp5 || 0;
  document.querySelector("#itemSource").value = item.source || "";
  document.querySelector("#removeItem").disabled = !item.name && !item.id;
  document.querySelector("#itemDialog").showModal();
}
document.querySelector("#itemForm").addEventListener("submit", event => {
  if (event.submitter?.value !== "save") return;
  event.preventDefault();
  const wowheadId = document.querySelector("#itemId").value.trim().replace(/\D/g,"");
  if (!wowheadId) { document.querySelector("#itemId").setCustomValidity("Enter the item's Wowhead ID."); document.querySelector("#itemId").reportValidity(); return; }
  document.querySelector("#itemId").setCustomValidity("");
  gear[editingSlot] = {
    name:document.querySelector("#itemName").value.trim(), id:wowheadId,
    healing:number(document.querySelector("#itemHealing").value), spellPower:number(document.querySelector("#itemSpellPower").value), intellect:number(document.querySelector("#itemIntellect").value),
    spirit:number(document.querySelector("#itemSpirit").value), mp5:number(document.querySelector("#itemMp5").value),
    source:document.querySelector("#itemSource").value.trim(), armorType:"cloth"
  };
  if (!gear[editingSlot].name && !gear[editingSlot].id) delete gear[editingSlot];
  document.querySelector("#itemDialog").close(); saveGear();
});
document.querySelector("#removeItem").addEventListener("click", () => {
  if (editingSlot) delete gear[editingSlot];
  document.querySelector("#itemDialog").close(); saveGear();
});

function spellMetrics(spell, rank) {
  const bonus = number(document.querySelector("#bonusHealing").value);
  const spellPower = number(document.querySelector("#bonusSpellPower").value);
  const reduction = number(document.querySelector("#manaReduction").value) / 100;
  const improvedHealingApplies = ["Lesser Heal","Heal","Greater Heal","Penance","Prayer of Mending"].includes(spell.name);
  const targets = Math.max(1, Math.min(5, number(document.querySelector("#partyTargets").value) || 1));
  const cast = rank[6] ?? spell.cast;
  const coefficient = rank[5] ?? spell.coefficient;
  const mana = rank[3] == null ? null : Math.floor(rank[3] * (1 - (improvedHealingApplies ? reduction : 0)));
  const heal = rank[2] == null ? null : rank[2] + (spell.kind === "shield" ? spellPower * coefficient : bonus * coefficient);
  let total = heal;
  if (total != null && spell.name === "Binding Heal") total *= 2;
  if (total != null && spell.name === "Prayer of Healing") total *= targets;
  if (total != null && spell.name === "Holy Nova") total *= targets;
  if (total != null && (spell.name === "Prayer of Mending" || spell.name === "Lightwell")) total *= targets;
  const amountLabel = spell.kind === "shield" ? "Absorb" : "Healing";
  const perSecond = heal == null ? null : heal / cast;
  const perMana = total == null || !mana ? null : total / mana;
  return {bonus,targets,mana,heal,total,perSecond,perMana,amountLabel};
}
function fmt(value, places=1) { return value == null || !Number.isFinite(value) ? "—" : Number(value.toFixed(places)).toLocaleString(undefined,{maximumFractionDigits:places}); }
function renderSpells() {
  const host = document.querySelector("#spellList");
  if (!host) return;
  let ranksShown = 0;
  host.innerHTML = window.HEALING_SPELLS.map((spell,index) => {
    ranksShown += spell.ranks.length;
    const shield = spell.kind === "shield";
    const kindLabel = shield ? "ABSORB" : "HEAL";
    const rows = spell.ranks.map(rank => {
      const [rankNo,learned,base,mana,id] = rank;
      const m = spellMetrics(spell,rank);
      const rankLink = `https://www.wowhead.com/forever/spell=${encodeURIComponent(id)}`;
      const note = mana == null ? `<small>${esc(spell.manaNote || "Mana cost unavailable")}</small>` : `${m.mana.toLocaleString()} mana`;
      const group = spell.name === "Binding Heal" ? `${fmt(m.heal)} × 2` : (spell.name === "Prayer of Healing" || spell.name === "Holy Nova" ? `${fmt(m.heal)} / target` : fmt(m.heal));
      const learnedText = learned == null ? "—" : `Lv ${learned}`;
      const perTime = m.perSecond == null ? "—" : `${fmt(m.perSecond)} / sec`;
      const perMana = m.perMana == null ? "—" : `${fmt(m.perMana,2)} / mana`;
      const effectiveCast = rank[6] ?? spell.cast;
      const castText = spell.duration ? `${spell.instant ? "Instant · 1.5s GCD" : `${effectiveCast}s cast`} · ${spell.duration}s effect` : spell.instant ? "Instant · 1.5s GCD" : `${effectiveCast}s cast`;
      const details = spell.detail ? `<span class="rank-extra">${esc(spell.detail)}</span>` : "";
      const tickRate = spell.duration && m.heal != null ? `<span class="rank-extra">Arrival rate while ticking: ${fmt(m.heal / spell.duration)} / sec</span>` : "";
      const tooltipValue = base == null ? "Heal amount not exposed" : `${base} ${shield ? "absorb" : "heal"}`;
      const totalLine = spell.name === "Binding Heal" ? `<span class="rank-extra">Two-target total: ${fmt(m.total)}${mana ? ` · ${fmt(m.perMana,2)} total per mana` : ""}</span>` : (spell.name === "Prayer of Healing" || spell.name === "Holy Nova" ? `<span class="rank-extra">Party total (${m.targets}): ${fmt(m.total)}</span>` : (spell.name === "Prayer of Mending" ? `<span class="rank-extra">Total for ${m.targets} jump${m.targets === 1 ? "" : "s"}: ${fmt(m.total)}</span>` : (spell.name === "Lightwell" ? `<span class="rank-extra">Total for ${m.targets} click${m.targets === 1 ? "" : "s"}: ${fmt(m.total)}</span>` : "")));
      return `<div class="rank-row ${shield ? "shield-row" : ""}">
        <div class="rank-name"><a href="${rankLink}" target="_blank" rel="noreferrer">R${rankNo} ↗</a><span>${learnedText}</span></div>
        <div class="rank-amount"><b>${group}</b><span>${kindLabel} · ${tooltipValue}</span>${totalLine}${tickRate}${details}</div>
        <div class="rank-stat"><span>${castText}</span><b>${note}</b></div>
        <div class="rank-stat"><span>${shield ? "Absorb / cast time" : "Healing / cast time"}</span><b>${perTime}</b></div>
        <div class="rank-stat"><span>${shield ? "Absorb / mana" : "Healing / mana"}</span><b>${perMana}</b></div>
      </div>`;
    }).join("");
    return `<details class="spell-card" ${index < 3 ? "open" : ""}>
      <summary><span class="spell-glyph ${shield ? "shield-glyph" : ""}">${shield ? "◈" : "✦"}</span><span class="spell-title"><b>${esc(spell.name)}</b><small>${esc(spell.group)}</small></span><span class="spell-kind ${shield ? "shield-kind" : ""}">${kindLabel}</span><span class="rank-pill">${spell.ranks.length} ${spell.ranks.length === 1 ? "rank" : "ranks"}</span><span class="chevron">⌄</span></summary>
      <div class="rank-table"><div class="rank-header"><span>Rank / learned</span><span>Base healing</span><span>Cast / mana</span><span>Per time</span><span>Per mana</span></div>${rows}</div>
    </details>`;
  }).join("");
  document.querySelector("#rankCount").textContent = `${ranksShown} ranks · ${window.HEALING_SPELLS.length} spells`;
}

document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active",t === tab));
  document.querySelector("#gearPanel").classList.toggle("hidden",tab.dataset.tab !== "gear");
  document.querySelector("#spellsPanel").classList.toggle("hidden",tab.dataset.tab !== "spells");
}));
["#bonusHealing","#bonusSpellPower","#manaReduction","#partyTargets"].forEach(selector => document.querySelector(selector).addEventListener("input",renderSpells));
document.querySelector("#resetBtn").addEventListener("click", () => {
  if (!confirm("Clear all saved gear slots?")) return;
  gear = {}; saveGear();
});
document.querySelector("#exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify({format:"forever-priest-planner",version:1,gear},null,2)],{type:"application/json"});
  const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "forever-priest-set.json"; a.click(); URL.revokeObjectURL(url);
});
document.querySelector("#importFile").addEventListener("change", async event => {
  const file = event.target.files?.[0]; if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    const incoming = parsed.gear || parsed;
    const next = {};
    for (const [slot,item] of Object.entries(incoming)) if (SLOTS.some(s => s[0] === slot) && item && typeof item === "object") {
      next[slot] = {name:String(item.name || "").slice(0,70),id:String(item.id || "").replace(/\D/g,""),healing:number(item.healing),spellPower:number(item.spellPower),intellect:number(item.intellect),spirit:number(item.spirit),mp5:number(item.mp5),source:String(item.source || "").slice(0,80),armorType:"cloth"};
    }
    gear = next; saveGear();
  } catch { alert("That file is not a valid planner export."); }
  event.target.value = "";
});
renderGear();
