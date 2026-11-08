const SLOTS = [
  ["head","Head"],["neck","Neck"],["shoulders","Shoulders"],["back","Back"],["chest","Chest"],
  ["wrists","Wrists"],["hands","Hands"],["waist","Waist"],["legs","Legs"],["feet","Feet"],
  ["finger1","Ring 1"],["finger2","Ring 2"],["trinket1","Trinket 1"],["trinket2","Trinket 2"],
  ["mainhand","Main hand"],["offhand","Off hand"],["ranged","Ranged"]
];
const STORE_KEY = "forever-priest-planner-v1";
const CORS_RELAY = "https://proxy.cors.dev/";
let gear = readGear();
let editingSlot = null;
let editingOriginalItem = null;
let resolvedItemSubclass = "";

function readGear() {
  try {
    const saved=JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    for(const item of Object.values(saved)) if(item && !item.name && ["healing","intellect","spirit","mp5"].every(key=>Number(item[key]||0)===0))
      for(const key of ["healing","intellect","spirit","mp5"]) item[key]=null;
    return saved;
  } catch { return {}; }
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
    const slotType = id === "back" ? "CLOAK" : (["head","shoulders","chest","wrists","hands","waist","legs","feet"].includes(id) ? "CLOTH" : (["neck","finger1","finger2","trinket1","trinket2"].includes(id) ? "ACCESSORY" : "HELD ITEM"));
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
  editingOriginalItem = Object.keys(item).length ? structuredClone(item) : null;
  document.querySelector("#dialogTitle").textContent = `${item.name ? "Edit" : "Add"} ${SLOTS.find(s => s[0] === slot)[1]} item`;
  document.querySelector("#itemName").value = item.name || "";
  document.querySelector("#itemId").value = item.id || "";
  document.querySelector("#itemHealing").value = item.healing ?? "";
  document.querySelector("#itemIntellect").value = item.intellect ?? "";
  document.querySelector("#itemSpirit").value = item.spirit ?? "";
  document.querySelector("#itemMp5").value = item.mp5 ?? "";
  document.querySelector("#lookupStatus").textContent = "";
  document.querySelector("#itemSource").value = item.source || "";
  resolvedItemSubclass = item.armorType || "";
  document.querySelector("#removeItem").disabled = !item.name && !item.id;
  document.querySelector("#itemDialog").showModal();
}
document.querySelector("#itemForm .close").addEventListener("click",()=>document.querySelector("#itemDialog").close());
async function saveItem() {
  const idInput = document.querySelector("#itemId");
  let wowheadId = idInput.value.trim().replace(/\D/g,"");
  let name = document.querySelector("#itemName").value.trim();
  let vals = {healing:optionalNumber(document.querySelector("#itemHealing").value),intellect:optionalNumber(document.querySelector("#itemIntellect").value),spirit:optionalNumber(document.querySelector("#itemSpirit").value),mp5:optionalNumber(document.querySelector("#itemMp5").value)};
  if (!wowheadId && !name && Object.values(vals).every(v => v == null)) {
    idInput.setCustomValidity("Enter an item name, Wowhead ID, or at least one stat."); idInput.reportValidity(); return false;
  }
  idInput.setCustomValidity("");
  const statsUntouched=editingOriginalItem && ["healing","intellect","spirit","mp5"].every(key=>(vals[key]??null)===(editingOriginalItem[key]??null));
  const itemChanged=editingOriginalItem ? wowheadId!==String(editingOriginalItem.id||"") : Boolean(wowheadId) && Object.values(vals).every(value=>value==null);
  if(wowheadId && itemChanged && (!editingOriginalItem || statsUntouched)) {
    const status=document.querySelector("#lookupStatus"); status.textContent="Filling item stats from Wowhead…";
    try {
      const result=await fetchWowheadItem(wowheadId);
      wowheadId=result.id; name=result.name;
      vals={...result.stats}; resolvedItemSubclass=result.subclass;
      document.querySelector("#itemName").value=name; idInput.value=wowheadId;
      for(const [key,value] of Object.entries(vals)) document.querySelector(`#item${key[0].toUpperCase()}${key.slice(1)}`).value=value;
      status.textContent=`Filled stats for ${name} from Wowhead.`;
    } catch(error) {
      if(editingOriginalItem && itemChanged && statsUntouched) vals={healing:null,intellect:null,spirit:null,mp5:null};
      if(editingOriginalItem && itemChanged && !name) document.querySelector("#itemName").value="";
      document.querySelector("#itemHealing").value=vals.healing??"";
      document.querySelector("#itemIntellect").value=vals.intellect??"";
      document.querySelector("#itemSpirit").value=vals.spirit??"";
      document.querySelector("#itemMp5").value=vals.mp5??"";
      document.querySelector("#lookupStatus").textContent="Wowhead lookup failed. Saving the item ID with unknown stats; retry the lookup or enter stats manually.";
    }
  }
  const clothSlots=new Set(["head","shoulders","chest","wrists","hands","waist","legs","feet"]);
  if(clothSlots.has(editingSlot) && !String(resolvedItemSubclass).toLowerCase().includes("cloth")) {
    document.querySelector("#lookupStatus").textContent="Verify this is Cloth Armor with Wowhead before saving an armor slot."; return false;
  }
  if(editingSlot==="back" && !String(resolvedItemSubclass).toLowerCase().includes("cloak")) {
    document.querySelector("#lookupStatus").textContent="Verify this is a cloak with Wowhead before saving the back slot."; return false;
  }
  gear[editingSlot] = {name,id:wowheadId,...vals,source:document.querySelector("#itemSource").value.trim(),armorType:resolvedItemSubclass};
  document.querySelector("#itemDialog").close(); saveGear(); return true;
}
document.querySelector("#itemForm").addEventListener("submit", async event => {
  event.preventDefault();
  if (event.submitter?.value === "cancel") { document.querySelector("#itemDialog").close(); return; }
  await saveItem();
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
  const cast = rank[7] ?? spell.cast;
  const coefficient = rank[6] ?? spell.coefficient;
  const mana = rank[4] == null ? null : Math.floor(rank[4] * (1 - (improvedHealingApplies ? reduction : 0)));
  const baseMin = rank[2] == null ? null : rank[2];
  const baseMax = rank[3] == null ? null : rank[3];
  const healMin = baseMin == null ? null : baseMin + bonus * coefficient;
  const healMax = baseMax == null ? null : baseMax + bonus * coefficient;
  const heal = healMin == null || healMax == null ? null : (healMin + healMax) / 2;
  let total = heal;
  if (total != null && spell.name === "Binding Heal") total *= 2;
  if (total != null && spell.name === "Prayer of Healing") total *= targets;
  if (total != null && spell.name === "Holy Nova") total *= targets;
  if (total != null && (spell.name === "Prayer of Mending" || spell.name === "Lightwell")) total *= targets;
  const amountLabel = spell.kind === "shield" ? "Absorb" : "Healing";
  const perSecond = heal == null ? null : heal / cast;
  const perMana = total == null || !mana ? null : total / mana;
  return {bonus,targets,mana,baseMin,baseMax,healMin,healMax,heal,total,perSecond,perMana,amountLabel};
}
function fmt(value, places=1) { return value == null || !Number.isFinite(value) ? "—" : Number(value.toFixed(places)).toLocaleString(undefined,{maximumFractionDigits:places}); }
function fmtRange(min,max,places=1) { return min == null || max == null ? "—" : min === max ? fmt(min,places) : `${fmt(min,places)}–${fmt(max,places)}`; }
function renderSpells() {
  const host = document.querySelector("#spellList");
  if (!host) return;
  let ranksShown = 0;
  host.innerHTML = window.HEALING_SPELLS.map((spell,index) => {
    ranksShown += spell.ranks.length;
    const shield = spell.kind === "shield";
    const kindLabel = shield ? "ABSORB" : "HEAL";
    const rows = spell.ranks.map(rank => {
      const [rankNo,learned,baseMin,baseMax,mana,id] = rank;
      const m = spellMetrics(spell,rank);
      const rankLink = `https://www.wowhead.com/forever/spell=${encodeURIComponent(id)}`;
      const note = mana == null ? `<small>${esc(spell.manaNote || "Mana cost unavailable")}</small>` : `${m.mana.toLocaleString()} mana`;
      const range = fmtRange(m.healMin,m.healMax);
      const group = spell.name === "Binding Heal" ? `${range} × 2` : (spell.name === "Prayer of Healing" || spell.name === "Holy Nova" || spell.name === "Circle of Healing" ? `${range} / target` : range);
      const learnedText = learned == null ? "—" : `Lv ${learned}`;
      const perTime = m.perSecond == null ? "—" : `${fmt(m.perSecond)} / sec`;
      const perMana = m.perMana == null ? "—" : `${fmt(m.perMana,2)} / mana`;
      const effectiveCast = rank[7] ?? spell.cast;
      const castText = spell.duration ? `${spell.instant ? "Instant · 1.5s GCD" : `${effectiveCast}s cast`} · ${spell.duration}s effect` : spell.instant ? "Instant · 1.5s GCD" : `${effectiveCast}s cast`;
      const details = spell.detail ? `<span class="rank-extra">${esc(spell.detail)}</span>` : "";
      const tickRate = spell.duration && m.heal != null ? `<span class="rank-extra">Arrival rate while ticking: ${fmt(m.heal / spell.duration)} / sec</span>` : "";
      const tooltipValue = baseMin == null ? "Heal amount not exposed" : `Base ${fmtRange(baseMin,baseMax)} · with gear ${range}`;
      const totalLine = spell.name === "Binding Heal" ? `<span class="rank-extra">Two-target mean total: ${fmt(m.total)}${mana ? ` · ${fmt(m.perMana,2)} total per mana` : ""}</span>` : (spell.name === "Prayer of Healing" || spell.name === "Holy Nova" || spell.name === "Circle of Healing" ? `<span class="rank-extra">Party mean total (${m.targets}): ${fmt(m.total)}</span>` : (spell.name === "Prayer of Mending" ? `<span class="rank-extra">Mean total for ${m.targets} jump${m.targets === 1 ? "" : "s"}: ${fmt(m.total)}</span>` : (spell.name === "Lightwell" ? `<span class="rank-extra">Mean total for ${m.targets} click${m.targets === 1 ? "" : "s"}: ${fmt(m.total)}</span>` : "")));
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
      <div class="rank-table"><div class="rank-header"><span>Rank / learned</span><span>Healing range</span><span>Cast / mana</span><span>Mean / time</span><span>Mean / mana</span></div>${rows}</div>
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
function throughCorsRelay(url) { return `${CORS_RELAY}${url}`; }
async function fetchWowheadItem(itemId) {
  const url=`https://www.wowhead.com/forever/item=${encodeURIComponent(itemId)}&xml`;
  const response=await fetch(throughCorsRelay(url));
  if(!response.ok) throw new Error(`Wowhead lookup returned ${response.status}.`);
  return parseWowheadItem(await response.text());
}
function parseWowheadItem(xmlText) {
  const doc=new DOMParser().parseFromString(xmlText,"application/xml");
  if(doc.querySelector("parsererror")) throw new Error("Wowhead returned unreadable item data.");
  const item=doc.querySelector("wowhead > item");
  if(!item) throw new Error("Wowhead did not find a matching item.");
  const name=item.querySelector("name")?.textContent?.trim() || "";
  const id=item.getAttribute("id") || "";
  const subclass=item.querySelector("subclass")?.textContent?.trim() || "";
  const equipText=item.querySelector("jsonEquip")?.textContent?.trim() || "";
  let equip={};
  if(equipText) { try { equip=JSON.parse(`{${equipText.replace(/^\{|\}$/g,"")}}`); } catch { throw new Error("Could not read the Wowhead item stats."); } }
  return {id,name,subclass,stats:{
    healing:(Number(equip.splheal)||0)+(Number(equip.splpwr)||0),
    intellect:Number(equip.int)||0,spirit:Number(equip.spi)||0,
    mp5:Number(equip.manargn ?? equip.m5)||0
  }};
}
document.querySelector("#lookupItem").addEventListener("click", async () => {
  const id=document.querySelector("#itemId").value.trim().replace(/\D/g,"");
  const name=document.querySelector("#itemName").value.trim();
  const status=document.querySelector("#lookupStatus");
  if(!id && !name){status.textContent="Enter an item name or Wowhead ID first.";return;}
  status.textContent="Looking up item on Wowhead…";
  try {
    const query=id ? `item=${encodeURIComponent(id)}` : `item=${encodeURIComponent(name)}`;
    const result=id ? await fetchWowheadItem(id) : await (async()=>{
      const response=await fetch(throughCorsRelay(`https://www.wowhead.com/forever/${query}&xml`));
      if(!response.ok) throw new Error(`The lookup service returned ${response.status}.`);
      return parseWowheadItem(await response.text());
    })();
    document.querySelector("#itemId").value=result.id;
    document.querySelector("#itemName").value=result.name;
    for(const [key,value] of Object.entries(result.stats)) document.querySelector(`#item${key[0].toUpperCase()}${key.slice(1)}`).value=value;
    resolvedItemSubclass=result.subclass;
    const slot=editingSlot;
    if(slot==="back" && !result.subclass.toLowerCase().includes("cloak")) status.textContent=`${result.name} is ${result.subclass || "not a cloak"}. Choose a cloak for this slot.`;
    else if(["head","shoulders","chest","wrists","hands","waist","legs","feet"].includes(slot) && !result.subclass.toLowerCase().includes("cloth")) status.textContent=`${result.name} is ${result.subclass || "not cloth armor"}. Only cloth armor can go in this slot.`;
    else status.textContent=`Filled stats for ${result.name} from Wowhead.`;
  } catch(error) { status.textContent=error.message || "Could not read this item from Wowhead. Try its item ID, or enter the stats manually."; }
});

document.querySelector("#armoryBtn").addEventListener("click",()=>document.querySelector("#armoryDialog").showModal());
document.querySelector("#armoryForm .close").addEventListener("click",()=>document.querySelector("#armoryDialog").close());
document.querySelector("#cancelArmory").addEventListener("click",()=>document.querySelector("#armoryDialog").close());
function parseArmory(html) {
  const script=html.match(/var\s+characterProfileInitialState\s*=\s*(\{[\s\S]*?\})\s*;\s*<\/script/i);
  if(!script) throw new Error("No embedded Armory character data was found. Make sure the page source is from a character profile.");
  const state=JSON.parse(script[1]); const character=state.character;
  const className=typeof character?.class==="string" ? character.class : character?.class?.name;
  if(className && className.toLowerCase()!=="priest") throw new Error(`${className}s cannot be imported.`);
  if(!character?.gear) throw new Error("The Armory page does not include equipped gear data.");
  const slotMap={head:"head",neck:"neck",shoulder:"shoulders",back:"back",chest:"chest",wrist:"wrists",hand:"hands",waist:"waist",leg:"legs",foot:"feet",leftFinger:"finger1",rightFinger:"finger2",trinket1:"trinket1",trinket2:"trinket2",weapon:"mainhand",offHand:"offhand",ranged:"ranged"};
  const accepted=new Set(["head","shoulders","back","chest","wrists","hands","waist","legs","feet"]);
  const imported={};
  for(const [armorySlot,entry] of Object.entries(character.gear)){
    const slot=slotMap[armorySlot]; if(!slot || !entry || armorySlot==="shirt") continue;
    const isArmor=accepted.has(slot);
    const type=slot==="back" ? "CLOAKS" : String(entry.item_subclass?.name || entry.itemSubClass?.type || entry.subclass?.type || entry.armorType || "").toUpperCase();
    if(isArmor && slot!=="back" && !type.includes("CLOTH")) continue;
    if(slot==="back" && !type.includes("CLOAK")) continue;
    const values={healing:0,intellect:0,spirit:0,mp5:0};
    const hasStats=Array.isArray(entry.stats);
    let hasHealingStat=false;
    for(const stat of entry.stats || []){
      const kind=String(stat.type?.type || stat.type || "").toUpperCase(); const value=Number(stat.value || 0);
      if(kind==="SPELL_HEALING_DONE" || kind==="SPELL_POWER") {values.healing+=value;hasHealingStat=true;}
      if(kind==="INTELLECT") values.intellect+=value;
      if(kind==="SPIRIT") values.spirit+=value;
      if(kind==="MANA_REGENERATION" || kind==="MANA_PER_5_SEC") values.mp5+=value;
    }
    imported[slot]={name:String(entry.name || ""),id:String(entry.id || ""),source:"",armorType:type,healing:hasStats?values.healing:null,intellect:hasStats?values.intellect:null,spirit:hasStats?values.spirit:null,mp5:hasStats?values.mp5:null,_needsWowheadHealingLookup:!hasHealingStat && Boolean(entry.id)};
  }
  return {name:character.name,gear:imported};
}
function armoryUrlFromCharacterName(name) {
  const slug=String(name).normalize("NFKD").replace(/[\u0300-\u036f]/g,"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  if(!slug) throw new Error("Enter a character name to look up.");
  return `https://worldofwarcraft.blizzard.com/en-us/forever/us/armory/character/${encodeURIComponent(slug)}`;
}
async function fillArmoryHealingFromWowhead(imported) {
  const candidates=Object.entries(imported).filter(([,item])=>item._needsWowheadHealingLookup);
  let filled=0,failed=0,next=0;
  const worker=async()=>{
    while(next<candidates.length){
      const index=next++, [slot,item]=candidates[index];
      try {
        const result=await fetchWowheadItem(item.id);
        if(result.stats.healing>0){item.healing=number(item.healing)+result.stats.healing;filled++;}
        delete item._needsWowheadHealingLookup;
      } catch {
        failed++;
        if(item.healing===0) item.healing=null;
        delete item._needsWowheadHealingLookup;
      }
    }
  };
  await Promise.all(Array.from({length:Math.min(3,candidates.length)},worker));
  return {filled,failed};
}
async function refreshStoredWowheadHealing() {
  const candidates=Object.entries(gear).filter(([,item])=>item?.id && (item.healing==null || Number(item.healing)===0 || !item.name));
  let next=0,changed=false;
  const worker=async()=>{
    while(next<candidates.length){
      const [slot,snapshot]=candidates[next++];
      try {
        const result=await fetchWowheadItem(snapshot.id);
        const current=gear[slot];
        if(!current || current.id!==snapshot.id || current.healing!==snapshot.healing) continue;
        const namesMatch=!current.name || current.name===result.name || current.name===`Wowhead item ${current.id}`;
        if(namesMatch){
          current.name=result.name;
          current.healing=result.stats.healing;
          current.intellect=current.intellect==null?result.stats.intellect:current.intellect;
          current.spirit=current.spirit==null?result.stats.spirit:current.spirit;
          current.mp5=current.mp5==null?result.stats.mp5:current.mp5;
          changed=true;
        }
      } catch {}
    }
  };
  await Promise.all(Array.from({length:Math.min(3,candidates.length)},worker));
  if(changed) saveGear();
}
document.querySelector("#armoryForm").addEventListener("submit",async event=>{
  event.preventDefault(); if(event.submitter?.value==="cancel"){document.querySelector("#armoryDialog").close();return;}
  const status=document.querySelector("#armoryStatus"); status.textContent="Reading public Armory profile…";
  const source=document.querySelector("#armorySource").value.trim(); const characterName=document.querySelector("#characterName").value.trim();
  try {
    let html=source;
    if(!html){const url=armoryUrlFromCharacterName(characterName); const response=await fetch(throughCorsRelay(url)); if(!response.ok){if(response.status===404||response.status===500) throw new Error(`No public profile found for ${characterName}.`); throw new Error("The public profile relay returned an error. Paste the page source as a fallback.");} html=await response.text();}
    const result=parseArmory(html); status.textContent="Checking equipped items on Wowhead for healing stats…";
    const enrichment=await fillArmoryHealingFromWowhead(result.gear);
    gear=result.gear; saveGear();
    status.textContent=`Imported ${Object.keys(gear).length} equipped items from ${result.name}.${enrichment.filled?` Filled healing stats from Wowhead on ${enrichment.filled} item${enrichment.filled===1?"":"s"}.`:""}${enrichment.failed?` ${enrichment.failed} item lookup${enrichment.failed===1?"":"s"} failed; those stats remain unknown.`:""}`;
    setTimeout(()=>document.querySelector("#armoryDialog").close(),900);
  } catch(error) {
    const fallback="Could not reach Blizzard through the public relay. Paste the Armory page source and retry.";
    status.textContent=source ? (error.message || "Could not read this Armory page source.") : error.name==="TypeError" ? fallback : (error.message || fallback);
  }
});
const themeToggle=document.querySelector("#themeToggle");
const prefersDark=window.matchMedia("(prefers-color-scheme: dark)");
function currentTheme() { return document.documentElement.dataset.theme || (prefersDark.matches ? "dark" : "light"); }
function syncThemeToggle() { themeToggle.setAttribute("aria-pressed",String(currentTheme()==="dark")); }
themeToggle.addEventListener("click",()=>{
  const theme=currentTheme()==="dark" ? "light" : "dark";
  document.documentElement.dataset.theme=theme;
  try { localStorage.setItem("forever-priest-planner-theme",theme); } catch {}
  syncThemeToggle();
});
prefersDark.addEventListener("change",()=>{ if(!document.documentElement.dataset.theme) syncThemeToggle(); });
syncThemeToggle();
renderGear();
refreshStoredWowheadHealing();
