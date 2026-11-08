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
function optionalNumber(value) { return value === "" || value == null ? null : Number(value); }
function sumInfo(key) {
  const items = Object.values(gear);
  return {value:items.reduce((total,item) => total + number(item[key]),0), unknown:items.filter(item => item[key] == null).length};
}
function displayTotal(info) { return `${info.value}${info.unknown ? " + ?" : ""}`; }
function wowheadItems() { return "https://www.wowhead.com/forever/items/class:5"; }
function renderGear() {
  const host = document.querySelector("#gearGrid");
  host.innerHTML = SLOTS.map(([id,label]) => {
    const item = gear[id];
    const slotType = ["head","shoulders","back","chest","wrists","hands","waist","legs","feet"].includes(id) ? "CLOTH" : (["neck","finger1","finger2","trinket1","trinket2"].includes(id) ? "ACCESSORY" : "HELD ITEM");
    const itemHref = item?.id ? `https://www.wowhead.com/forever/item=${encodeURIComponent(item.id)}` : wowheadItems();
    const stats = item ? `<div class="slot-stats"><span>${item.healing == null ? "? heal" : `+${item.healing} heal`}</span><span>${item.intellect == null ? "? int" : `${item.intellect} int`}</span><span>${item.spirit == null ? "? spi" : `${item.spirit} spi`}</span><span>${item.mp5 == null ? "? mp5" : `${item.mp5} mp5`}</span></div>` : "";
    const source = item?.source ? `<a class="slot-source" href="https://www.wowhead.com/forever/search?q=${encodeURIComponent(item.source)}" target="_blank" rel="noreferrer">Loot source: ${esc(item.source)} ↗</a>` : "";
    return `<article class="gear-slot ${item ? "filled" : ""}">
      <div class="slot-top"><span class="slot-label">${label}</span><span class="cloth-tag">${slotType}</span></div>
      ${item ? `<a class="slot-item" href="${itemHref}" target="_blank" rel="noreferrer">${esc(item.name || `Wowhead item ${item.id || ""}`)} ↗</a>${source}${stats}` : `<span class="empty-slot">No item selected</span>`}
      <div class="slot-actions"><a href="${wowheadItems()}" target="_blank" rel="noreferrer">Wowhead finder ↗</a><button type="button" data-edit="${id}">${item ? "Edit" : "Add item"}</button></div>
    </article>`;
  }).join("");
  host.querySelectorAll("[data-edit]").forEach(button => button.addEventListener("click", () => openItem(button.dataset.edit)));
  const totals = {healing:sumInfo("healing"),intellect:sumInfo("intellect"),spirit:sumInfo("spirit"),mp5:sumInfo("mp5")};
  for (const [key,value] of Object.entries(totals)) document.querySelector(`#total${key[0].toUpperCase()}${key.slice(1)}`).textContent = displayTotal(value);
  document.querySelector("#heroHealing").textContent = displayTotal(totals.healing);
  document.querySelector("#bonusHealing").value = totals.healing.value;
  renderSpells();
}

function openItem(slot) {
  editingSlot = slot;
  const item = gear[slot] || {};
  document.querySelector("#dialogTitle").textContent = `${item.name ? "Edit" : "Add"} ${SLOTS.find(s => s[0] === slot)[1]} item`;
  document.querySelector("#itemName").value = item.name || "";
  document.querySelector("#itemId").value = item.id || "";
  document.querySelector("#itemHealing").value = item.healing ?? "";
  document.querySelector("#itemIntellect").value = item.intellect ?? "";
  document.querySelector("#itemSpirit").value = item.spirit ?? "";
  document.querySelector("#itemMp5").value = item.mp5 ?? "";
  document.querySelector("#lookupStatus").textContent = "";
  document.querySelector("#itemSource").value = item.source || "";
  document.querySelector("#removeItem").disabled = !item.name && !item.id;
  document.querySelector("#itemDialog").showModal();
}
function saveItem() {
  const idInput = document.querySelector("#itemId");
  const wowheadId = idInput.value.trim().replace(/\D/g,"");
  const name = document.querySelector("#itemName").value.trim();
  const vals = {healing:optionalNumber(document.querySelector("#itemHealing").value),intellect:optionalNumber(document.querySelector("#itemIntellect").value),spirit:optionalNumber(document.querySelector("#itemSpirit").value),mp5:optionalNumber(document.querySelector("#itemMp5").value)};
  if (!wowheadId && !name && Object.values(vals).every(v => v == null)) {
    idInput.setCustomValidity("Enter an item name, Wowhead ID, or at least one stat."); idInput.reportValidity(); return false;
  }
  idInput.setCustomValidity("");
  gear[editingSlot] = {name,id:wowheadId,...vals,source:document.querySelector("#itemSource").value.trim(),armorType:"cloth"};
  document.querySelector("#itemDialog").close(); saveGear(); return true;
}
document.querySelector("#itemForm").addEventListener("submit", event => {
  event.preventDefault();
  if (event.submitter?.value === "cancel") { document.querySelector("#itemDialog").close(); return; }
  saveItem();
});
document.querySelector("#removeItem").addEventListener("click", () => {
  if (editingSlot) delete gear[editingSlot];
  document.querySelector("#itemDialog").close(); saveGear();
});

function spellMetrics(spell, rank) {
  const bonus = number(document.querySelector("#bonusHealing").value);
  const reduction = number(document.querySelector("#manaReduction").value) / 100;
  const improvedHealingApplies = ["Lesser Heal","Heal","Greater Heal","Penance","Prayer of Mending"].includes(spell.name);
  const targets = Math.max(1, Math.min(5, number(document.querySelector("#partyTargets").value) || 1));
  const cast = rank[6] ?? spell.cast;
  const coefficient = rank[5] ?? spell.coefficient;
  const mana = rank[3] == null ? null : Math.floor(rank[3] * (1 - (improvedHealingApplies ? reduction : 0)));
  const heal = rank[2] == null ? null : rank[2] + bonus * coefficient;
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
      const tooltipValue = base == null ? "Heal amount not exposed" : `${fmt(base,1)} ${shield ? "absorb" : "heal"}`;
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
["#bonusHealing","#manaReduction","#partyTargets"].forEach(selector => document.querySelector(selector).addEventListener("input",renderSpells));
document.querySelector("#resetBtn").addEventListener("click", () => {
  if (!confirm("Clear all saved gear slots?")) return;
  gear = {}; saveGear();
});
// Wowhead tooltip data is the canonical stat lookup; if its endpoint blocks browser requests,
// the item can still be saved by name/ID with unknown stats shown explicitly.
function tooltipStats(html) {
  const doc = new DOMParser().parseFromString(html,"text/html");
  const text = (doc.body.textContent || "").replace(/\u00a0/g," ");
  const values = {healing:null,intellect:null,spirit:null,mp5:null};
  const patterns = {
    healing:[/\+([\d,]+)\s+(?:spell )?healing/i,/\+([\d,]+)\s+spell power/i],
    intellect:[/\+([\d,]+)\s+intellect/i], spirit:[/\+([\d,]+)\s+spirit/i],
    mp5:[/\+([\d,]+)\s+(?:mana regeneration per 5 sec|mana per 5 sec|mana every 5 sec)/i]
  };
  for (const [key,regexes] of Object.entries(patterns)) for (const re of regexes) { const m=text.match(re); if(m){values[key]=Number(m[1].replace(/,/g,""));break;} }
  return values;
}
document.querySelector("#lookupItem").addEventListener("click", async () => {
  const id=document.querySelector("#itemId").value.trim().replace(/\D/g,"");
  const name=document.querySelector("#itemName").value.trim();
  const status=document.querySelector("#lookupStatus");
  if(!id){
    if(name) window.open(`https://www.wowhead.com/forever/search?q=${encodeURIComponent(name)}`,"_blank","noopener");
    status.textContent=name ? "Choose the matching item on Wowhead and enter its ID, then use Fill stats." : "Enter an item name or Wowhead ID first.";
    return;
  }
  status.textContent="Looking up Wowhead tooltip…";
  try {
    const url=`https://www.wowhead.com/forever/tooltip/item/${encodeURIComponent(id)}?dataEnv=7&locale=0`;
    const response=await fetch(url,{headers:{Accept:"application/json,text/html"}});
    if(!response.ok) throw new Error(`Wowhead returned ${response.status}`);
    const payload=await response.json();
    const found=tooltipStats(payload.tooltip || payload.html || JSON.stringify(payload));
    for(const [key,value] of Object.entries(found)) document.querySelector(`#item${key[0].toUpperCase()}${key.slice(1)}`).value=value ?? 0;
    const count=Object.values(found).filter(v=>v!=null).length;
    if(count){ if(!name && payload.name) document.querySelector("#itemName").value=payload.name; status.textContent=`Filled ${count} available stats from Wowhead. Check the item link for loot source.`; }
    else status.textContent="Wowhead returned no matching stats. Check the item ID, or enter the stats manually.";
  } catch { status.textContent="Could not read Wowhead from this browser. You can still save the item by name or ID and fill stats manually."; }
});

document.querySelector("#armoryBtn").addEventListener("click",()=>document.querySelector("#armoryDialog").showModal());
function parseArmory(html) {
  const script=html.match(/var\s+characterProfileInitialState\s*=\s*(\{[\s\S]*?\})\s*;\s*<\/script/i);
  if(!script) throw new Error("No embedded Armory character data was found. Make sure the page source is from a character profile.");
  const state=JSON.parse(script[1]); const character=state.character;
  if(!character?.gear) throw new Error("The Armory page does not include equipped gear data.");
  const slotMap={head:"head",neck:"neck",shoulder:"shoulders",back:"back",chest:"chest",wrist:"wrists",hand:"hands",waist:"waist",leg:"legs",foot:"feet",leftFinger:"finger1",rightFinger:"finger2",trinket1:"trinket1",trinket2:"trinket2",weapon:"mainhand",offHand:"offhand",ranged:"ranged"};
  const accepted=new Set(["head","shoulders","back","chest","wrists","hands","waist","legs","feet"]);
  const imported={};
  for(const [armorySlot,entry] of Object.entries(character.gear)){
    const slot=slotMap[armorySlot]; if(!slot || !entry || armorySlot==="shirt") continue;
    const isArmor=accepted.has(slot);
    const type=String(entry.item_subclass?.name || entry.itemSubClass?.type || entry.subclass?.type || entry.armorType || "").toUpperCase();
    if(isArmor && type !== "CLOTH") continue;
    const values={healing:0,intellect:0,spirit:0,mp5:0};
    const hasStats=Array.isArray(entry.stats);
    const statTypes=new Set();
    for(const stat of entry.stats || []){
      const kind=String(stat.type?.type || stat.type || "").toUpperCase(); const value=Number(stat.value || 0);
      if(kind==="SPELL_HEALING_DONE" || kind==="SPELL_POWER") {values.healing+=value;statTypes.add("healing");}
      if(kind==="INTELLECT"){values.intellect+=value;statTypes.add("intellect");}
      if(kind==="SPIRIT"){values.spirit+=value;statTypes.add("spirit");}
      if(kind==="MANA_REGENERATION" || kind==="MANA_PER_5_SEC"){values.mp5+=value;statTypes.add("mp5");}
    }
    imported[slot]={name:String(entry.name || ""),id:String(entry.id || ""),source:"",armorType:"cloth",healing:hasStats?values.healing:null,intellect:hasStats?values.intellect:null,spirit:hasStats?values.spirit:null,mp5:hasStats?values.mp5:null};
  }
  return {name:character.name,gear:imported};
}
document.querySelector("#armoryForm").addEventListener("submit",async event=>{
  event.preventDefault(); if(event.submitter?.value==="cancel"){document.querySelector("#armoryDialog").close();return;}
  const status=document.querySelector("#armoryStatus"); status.textContent="Reading public Armory profile…";
  const source=document.querySelector("#armorySource").value.trim(); const url=document.querySelector("#armoryUrl").value.trim();
  try {
    let html=source;
    if(!html){const response=await fetch(url,{credentials:"omit"}); if(!response.ok) throw new Error("Browser blocked or could not read Blizzard’s Armory page. Paste the page source as the fallback."); html=await response.text();}
    const result=parseArmory(html); gear=result.gear; saveGear(); status.textContent=`Imported ${Object.keys(gear).length} equipped items from ${result.name}.`;
    setTimeout(()=>document.querySelector("#armoryDialog").close(),900);
  } catch(error) { status.textContent=error.message || "Could not read this Armory page. Paste its page source and retry."; }
});
renderGear();
