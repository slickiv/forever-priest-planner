const SLOTS = [
  ["head","Head"],["neck","Neck"],["shoulders","Shoulders"],["back","Back"],["chest","Chest"],
  ["wrists","Wrists"],["hands","Hands"],["waist","Waist"],["legs","Legs"],["feet","Feet"],
  ["finger1","Ring 1"],["finger2","Ring 2"],["trinket1","Trinket 1"],["trinket2","Trinket 2"],
  ["mainhand","Main hand"],["offhand","Off hand"],["ranged","Ranged"]
];
const STORE_KEY = "forever-priest-planner-v1";
const CHARACTER_LEVEL_KEY = "forever-priest-planner-character-level-v1";
const SPELL_UI_STATE_KEY = "forever-priest-planner-spell-ui-v1";
const CORS_RELAY = "https://proxy.cors.dev/";
let gear = readGear();
const TALENT_STORE_KEY = "forever-priest-planner-talents-v1";
const RANK2_FIT_MIGRATION_KEY = "forever-priest-planner-rank2-fit-migrated-v1";
let talents = readTalents();
let characterLevel = readCharacterLevel();
let spellUiState = readSpellUIState();
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
function readCharacterLevel() {
  try {
    const saved=Number(localStorage.getItem(CHARACTER_LEVEL_KEY));
    return Number.isInteger(saved) && saved >= 1 && saved <= 60 ? saved : 22;
  } catch { return 22; }
}
function readSpellUIState() {
  try { return JSON.parse(localStorage.getItem(SPELL_UI_STATE_KEY) || "{}"); }
  catch { return {}; }
}
function readTalents() {
  try {
    const saved=JSON.parse(localStorage.getItem(TALENT_STORE_KEY) || "null");
    const defaults={twinDisciplines:3,improvedPws:0,improvedRenew:0,holyBinding:0,flashHealOtherTarget:false,bonusHealingAdjustment:0,holySpecialization:0,divineFury:0,spiritualHealing:0,spiritualGuidance:0,renewedHope:0,divineAegis:0,inspiration:0,soulWarding:0,mentalAgility:0,litanyOfLight:0,improvedHealing:0,innerFocus:0,innerFocusReady:false,searingLight:0,holyNovaProcReady:false,powerInfusionTalent:0,powerInfusionActive:false,spiritOfRedemptionTalent:0,spiritOfRedemptionActive:false,differentPreviousHeal:false,baseCrit:0,totalSpirit:0,weakenedSoulTarget:false};
    if(!saved) { localStorage.setItem(RANK2_FIT_MIGRATION_KEY,"1"); return defaults; }
    if(localStorage.getItem(RANK2_FIT_MIGRATION_KEY)!=="1") {
      if(saved.bonusHealingAdjustment===3) saved.bonusHealingAdjustment=0;
      localStorage.setItem(RANK2_FIT_MIGRATION_KEY,"1");
    }
    return Object.fromEntries(Object.entries(defaults).map(([key,value])=>[key,key.endsWith("Ready")||key.endsWith("Active")||key==="weakenedSoulTarget"||key==="differentPreviousHeal"||key==="flashHealOtherTarget"?Boolean(saved[key]??value):key==="baseCrit"||key==="totalSpirit"||key==="bonusHealingAdjustment"?Math.max(0,Number(saved[key]??value)||0):clampRank(saved[key]??value,key==="litanyOfLight"||key==="searingLight"?2:key==="twinDisciplines"||key==="holySpecialization"||key==="divineFury"||key==="spiritualGuidance"||key==="renewedHope"?5:key==="soulWarding"||key==="innerFocus"||key==="powerInfusionTalent"||key==="spiritOfRedemptionTalent"||key==="holyBinding"?1:3)]));
  } catch { return {twinDisciplines:3,improvedPws:0,improvedRenew:0,holyBinding:0,flashHealOtherTarget:false,bonusHealingAdjustment:0,holySpecialization:0,divineFury:0,spiritualHealing:0,spiritualGuidance:0,renewedHope:0,divineAegis:0,inspiration:0,soulWarding:0,mentalAgility:0,litanyOfLight:0,improvedHealing:0,innerFocus:0,innerFocusReady:false,searingLight:0,holyNovaProcReady:false,powerInfusionTalent:0,powerInfusionActive:false,spiritOfRedemptionTalent:0,spiritOfRedemptionActive:false,differentPreviousHeal:false,baseCrit:0,totalSpirit:0,weakenedSoulTarget:false}; }
}
function clampRank(value,max) { return Math.max(0,Math.min(max,Math.floor(Number(value)||0))); }
function saveTalents() {
  talents={twinDisciplines:clampRank(document.querySelector("#twinDisciplines").value,5),improvedPws:clampRank(document.querySelector("#improvedPws").value,3),improvedRenew:clampRank(document.querySelector("#improvedRenew").value,3),holyBinding:clampRank(document.querySelector("#holyBinding").value,1),flashHealOtherTarget:document.querySelector("#flashHealOtherTarget").checked,bonusHealingAdjustment:Math.max(0,number(document.querySelector("#bonusHealingAdjustment").value)),holySpecialization:clampRank(document.querySelector("#holySpecialization").value,5),divineFury:clampRank(document.querySelector("#divineFury").value,5),spiritualHealing:clampRank(document.querySelector("#spiritualHealing").value,3),spiritualGuidance:clampRank(document.querySelector("#spiritualGuidance").value,5),renewedHope:clampRank(document.querySelector("#renewedHope").value,5),divineAegis:clampRank(document.querySelector("#divineAegis").value,3),inspiration:clampRank(document.querySelector("#inspiration").value,3),soulWarding:clampRank(document.querySelector("#soulWarding").value,1),mentalAgility:clampRank(document.querySelector("#mentalAgility").value,3),litanyOfLight:clampRank(document.querySelector("#litanyOfLight").value,2),improvedHealing:clampRank(number(document.querySelector("#manaReduction").value)/5,3),innerFocus:clampRank(document.querySelector("#innerFocus").value,1),innerFocusReady:document.querySelector("#innerFocusReady").checked,searingLight:clampRank(document.querySelector("#searingLight").value,2),holyNovaProcReady:document.querySelector("#holyNovaProcReady").checked,powerInfusionTalent:clampRank(document.querySelector("#powerInfusionTalent").value,1),powerInfusionActive:document.querySelector("#powerInfusionActive").checked,spiritOfRedemptionTalent:clampRank(document.querySelector("#spiritOfRedemptionTalent").value,1),spiritOfRedemptionActive:document.querySelector("#spiritOfRedemptionActive").checked,differentPreviousHeal:document.querySelector("#differentPreviousHeal").checked,baseCrit:Math.max(0,Math.min(100,number(document.querySelector("#baseCrit").value))),totalSpirit:Math.max(0,number(document.querySelector("#totalSpirit").value)),weakenedSoulTarget:document.querySelector("#weakenedSoulTarget").checked};
  document.querySelector("#bonusHealing").value=sumInfo("healing").value+talents.bonusHealingAdjustment;
  localStorage.setItem(TALENT_STORE_KEY,JSON.stringify(talents));
  localStorage.setItem(RANK2_FIT_MIGRATION_KEY,"1");
  renderSpells();
}
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
  document.querySelector("#bonusHealing").value = totals.healing.value+number(talents.bonusHealingAdjustment);
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
  const gearBonus = number(document.querySelector("#bonusHealing").value);
  const guidanceRates=[0,.05,.10,.15,.20,.25];
  const bonus = gearBonus + Math.floor(number(talents.totalSpirit) * guidanceRates[talents.spiritualGuidance]);
  const reduction = number(document.querySelector("#manaReduction").value) / 100;
  const improvedHealingApplies = ["Lesser Heal","Heal","Greater Heal","Penance","Prayer of Mending"].includes(spell.name);
  const mentalAgilityApplies = spell.instant || spell.kind === "shield";
  const mentalAgilityRates=[0,.03,.07,.10];
  const innerFocusApplies=talents.innerFocus>0 && talents.innerFocusReady;
  const freeFormActive=talents.spiritOfRedemptionTalent>0 && talents.spiritOfRedemptionActive;
  const holyNovaFree=spell.name==="Holy Nova" && talents.searingLight>0 && talents.holyNovaProcReady;
  const manaReductionPercent = (improvedHealingApplies ? Math.round(reduction * 100) : 0) + (mentalAgilityApplies ? [0,3,7,10][talents.mentalAgility] : 0) + (spell.kind === "shield" && talents.soulWarding ? 15 : 0);
  const targetCap=spell.name==="Prayer of Mending"?6:5;
  const targets = Math.max(1, Math.min(targetCap, number(document.querySelector("#partyTargets").value) || 1));
  const baseCast = rank[7] ?? spell.cast;
  const cast = spell.instant ? 1.5 : Math.max(0.5,baseCast - (["Heal","Greater Heal"].includes(spell.name) ? talents.divineFury * 0.1 : 0));
  const coefficient = rank[6] ?? spell.coefficient;
  let mana = rank[4] == null ? null : Math.floor(rank[4] * (100 - manaReductionPercent) / 100);
  if(mana!=null && innerFocusApplies) mana=0;
  if(mana!=null && holyNovaFree) mana=0;
  if(mana!=null && freeFormActive) mana=0;
  const litanyRefund=rank[4]!=null && spell.kind!=="shield" && talents.differentPreviousHeal ? Math.floor(rank[4]*talents.litanyOfLight*5/100) : 0;
  const netMana=mana==null?null:Math.max(0,mana-litanyRefund);
  const learnedLevel=rank[1];
  const castId=rank[5];
  const effectId=rank[8] ?? castId;
  const hitCount=spell.bolts ?? 1;
  const growth=spell.levelGrowth?.[effectId] ?? spell.levelGrowth?.[castId];
  const growthLevels=growth && learnedLevel != null ? Math.max(0,Math.min(characterLevel,growth.cap)-learnedLevel) : 0;
  const rangeGrowth=spell.baseGrowth?.[effectId] ?? spell.baseGrowth?.[castId];
  const rangeGrowthLevels=rangeGrowth ? Math.max(0,Math.min(characterLevel,rangeGrowth.cap)-rangeGrowth.baseLevel) : 0;
  const growthCenter=rangeGrowth?.basePoints + rangeGrowth?.perLevel * rangeGrowthLevels;
  const basePerHitMin = rank[2] == null ? null : rangeGrowth
    ? Math.round(growthCenter * (1-rangeGrowth.variance/2))
    : rank[2] + (growth?.perLevel || 0) * growthLevels;
  const basePerHitMax = rank[3] == null ? null : rangeGrowth
    ? Math.round(growthCenter * (1+rangeGrowth.variance/2))
    : rank[3] + (growth?.perLevel || 0) * growthLevels;
  const baseMin = basePerHitMin == null ? null : Math.round(basePerHitMin) * hitCount;
  const baseMax = basePerHitMax == null ? null : Math.round(basePerHitMax) * hitCount;
  const growthIncomplete = (spell.incompleteGrowthRanks || []).includes(castId) && characterLevel > learnedLevel;
  const generalRetention=learnedLevel == null ? 1 : Math.max(0,1-Math.max(0,characterLevel-learnedLevel-17)*0.05);
  const coefficientRetention=Math.max(0,generalRetention-(growth?.downrankOffset || 0));
  const effectiveCoefficient=coefficient*coefficientRetention;
  const improvedRenewRate=[0,.05,.10,.15][talents.improvedRenew];
  const spiritualHealingRate=[0,.03,.07,.10][talents.spiritualHealing];
  const inspirationArmor=[0,.08,.17,.25][talents.inspiration];
  const improvedPwsRates=[0,.07,.14,.20];
  const powerInfusionMultiplier=talents.powerInfusionTalent>0 && talents.powerInfusionActive && spell.kind!=="shield"?1.2:1;
  const talentMultiplier=(spell.kind === "shield"
    ? 1 + improvedPwsRates[talents.improvedPws]
    : (spell.instant || spell.name === "Penance" ? 1 + talents.twinDisciplines / 100 : 1)
      * (spell.name === "Renew" ? 1 + improvedRenewRate : 1)
      * (1 + spiritualHealingRate)) * powerInfusionMultiplier;
  const calculationBaseMin=basePerHitMin==null?null:(hitCount>1?Math.round(basePerHitMin):basePerHitMin);
  const calculationBaseMax=basePerHitMax==null?null:(hitCount>1?Math.round(basePerHitMax):basePerHitMax);
  // User's L22 in-game Heal R2 tooltip is 3 higher at both endpoints than +101 × 0.857.
  const tooltipCorrection=spell.name==="Heal"&&castId===2055?3:0;
  const rawPerHitMin = calculationBaseMin == null ? null : (calculationBaseMin + bonus * effectiveCoefficient + tooltipCorrection) * talentMultiplier;
  const rawPerHitMax = calculationBaseMax == null ? null : (calculationBaseMax + bonus * effectiveCoefficient + tooltipCorrection) * talentMultiplier;
  const healPerHitMin = rawPerHitMin == null ? null : Math.floor(rawPerHitMin + 1e-9);
  const healPerHitMax = rawPerHitMax == null ? null : (basePerHitMin === basePerHitMax ? Math.floor(rawPerHitMax + 1e-9) : Math.ceil(rawPerHitMax - 1e-9));
  const healMin = healPerHitMin == null ? null : healPerHitMin * hitCount;
  const healMax = healPerHitMax == null ? null : healPerHitMax * hitCount;
  const heal = healMin == null || healMax == null ? null : (healMin + healMax) / 2;
  let total = heal;
  if (total != null && spell.name === "Prayer of Healing") total *= targets;
  if (total != null && spell.name === "Holy Nova") total *= targets;
  if (total != null && ["Prayer of Mending","Circle of Healing","Lightwell"].includes(spell.name)) total *= targets;
  const amountLabel = spell.kind === "shield" ? "Absorb" : "Healing";
  const perSecond = total == null ? null : total / cast;
  const perMana = total == null || !netMana ? null : total / netMana;
  const renewHopeApplies=["Flash Heal","Lesser Heal","Heal","Greater Heal","Penance"].includes(spell.name) && talents.weakenedSoulTarget;
  const canCrit=spell.canCrit!==false && spell.kind!=="shield";
  const innerFocusCrit=innerFocusApplies && canCrit && !spell.periodicTicks ? 25:0;
  const critChance=canCrit ? Math.min(1,(number(talents.baseCrit)+(spell.school === "discipline" ? 0 : talents.holySpecialization)+ (renewHopeApplies ? talents.renewedHope*2 : 0)+innerFocusCrit)/100) : 0;
  const inspirationProcChance=canCrit&&!spell.periodicTicks ? 1-Math.pow(1-critChance,spell.name==="Penance"?hitCount:1) : 0;
  const inspirationExpected=inspirationArmor*inspirationProcChance;
  const critUnit=spell.name==="Penance"?1/3:1/(spell.periodicTicks||1);
  const critHeal=heal == null || !canCrit ? null : heal*critUnit*1.5;
  const critHealMin=healMin == null || !canCrit ? null : healMin*critUnit*1.5;
  const critHealMax=healMax == null || !canCrit ? null : healMax*critUnit*1.5;
  const expectedHeal=heal == null ? null : heal*(1+critChance*0.5);
  let expectedTotal=expectedHeal;
  if(expectedTotal!=null && ["Prayer of Healing","Holy Nova"].includes(spell.name)) expectedTotal*=targets;
  if(expectedTotal!=null && ["Prayer of Mending","Circle of Healing","Lightwell"].includes(spell.name)) expectedTotal*=targets;
  const holyBindingExpected=spell.name==="Flash Heal"&&talents.holyBinding>0&&talents.flashHealOtherTarget?expectedHeal*0.5:0;
  if(expectedTotal!=null) expectedTotal+=holyBindingExpected;
  const expectedPerSecond=expectedTotal==null?null:expectedTotal/cast;
  const expectedPerMana=expectedTotal==null||!netMana?null:expectedTotal/netMana;
  const aegisRate=[0,.05,.10,.15][talents.divineAegis];
  const aegisTargets=["Prayer of Healing","Holy Nova","Circle of Healing","Prayer of Mending"].includes(spell.name)?targets:1;
  let aegisExpected=0;
  if(heal!=null&&aegisRate&&canCrit&&!spell.periodicTicks){
    if(spell.name==="Penance"){
      const perBoltAegis=((healPerHitMin+healPerHitMax)/2)*1.5*aegisRate;
      // All three bolts hit the same target and Divine Aegis does not stack.
      // With identical bolt amounts, any one or more crits leave one per-bolt shield.
      aegisExpected=Math.min(1200,perBoltAegis)*(1-Math.pow(1-critChance,hitCount));
    } else {
      aegisExpected=Math.min(1200,heal*1.5*aegisRate)*critChance*aegisTargets;
    }
  }
  return {bonus,targets,mana,netMana,litanyRefund,baseMin,baseMax,basePerHitMin,basePerHitMax,healPerHitMin,healPerHitMax,healMin,healMax,heal,total,perSecond,perMana,amountLabel,talentMultiplier,effectiveCoefficient,coefficientRetention,cast,critChance,critHeal,critHealMin,critHealMax,expectedHeal,expectedTotal,expectedPerSecond,expectedPerMana,aegisExpected,inspirationArmor,inspirationProcChance,inspirationExpected,growthIncomplete,holyBindingExpected,innerFocusApplies,holyNovaFree,freeFormActive};
}
function fmt(value, places=1) { return value == null || !Number.isFinite(value) ? "—" : Number(value.toFixed(places)).toLocaleString(undefined,{maximumFractionDigits:places}); }
function fmtRange(min,max,places=1) { return min == null || max == null ? "—" : min === max ? fmt(min,places) : `${fmt(min,places)}–${fmt(max,places)}`; }
function fmtTrainingCost(copper, spell, rank) {
  if (copper == null) {
    if ((spell.name === "Penance" && rank[5] === 402174) || (spell.name === "Prayer of Mending" && rank[5] === 401859)) return "Talent";
    if (["Lightwell","Circle of Healing"].includes(spell.name)) return "Acquisition unverified";
    if (["Desperate Prayer","Divine Grace"].includes(spell.name)) return "Racial ability";
    return "Price unknown";
  }
  const gold = Math.floor(copper / 10000);
  const silver = Math.floor((copper % 10000) / 100);
  const coins = copper % 100;
  return [gold ? `${gold}g` : "", silver ? `${silver}s` : "", coins ? `${coins}c` : ""].filter(Boolean).join(" ");
}
function sortSpellRows(table,key,direction) {
  const rows=[...table.querySelectorAll(".rank-row")];
  rows.sort((a,b)=>{
    const av=Number(a.dataset[`sort${key[0].toUpperCase()}${key.slice(1)}`]??0),bv=Number(b.dataset[`sort${key[0].toUpperCase()}${key.slice(1)}`]??0);
    return (av-bv)*(direction==="asc"?1:-1);
  }).forEach(row=>table.append(row));
}
function renderSpells() {
  const host = document.querySelector("#spellList");
  if (!host) return;
  host.querySelectorAll(".spell-card[data-spell-index]").forEach(card=>{
    const index=card.dataset.spellIndex,header=card.querySelector(".rank-header");
    spellUiState[index]={open:card.open,sortKey:header?.dataset.sortKey||"",direction:header?.dataset.sortDirection||""};
  });
  try { localStorage.setItem(SPELL_UI_STATE_KEY,JSON.stringify(spellUiState)); } catch {}
  let ranksShown = 0;
  host.innerHTML = window.HEALING_SPELLS.map((spell,index) => {
    const ui=spellUiState[index]??{open:index<3,sortKey:"",direction:""};
    ranksShown += spell.ranks.length;
    const shield = spell.kind === "shield";
    const kindLabel = shield ? "ABSORB" : "HEAL";
    const rows = spell.ranks.map(rank => {
      const [rankNo,learned,baseMin,baseMax,mana,id] = rank;
      const m = spellMetrics(spell,rank);
      const rankLink = `https://www.wowhead.com/forever/spell=${encodeURIComponent(id)}`;
      const freeReason=m.innerFocusApplies?"Inner Focus":m.holyNovaFree?"Searing Light proc":m.freeFormActive?"Spirit of Redemption":"";
      const note = mana == null ? `<small>${esc(spell.manaNote || "Mana cost unavailable")}</small>` : freeReason?`${mana} → 0 (${freeReason})`:`${m.mana.toLocaleString()} mana${m.litanyRefund?` · ${m.netMana} net`:""}`;
      const range = fmtRange(m.healMin,m.healMax);
      const group = ["Prayer of Healing","Holy Nova","Circle of Healing"].includes(spell.name) ? `${range} / target` : range;
      const learnedText = `${learned == null ? "Lv —" : `Lv ${learned}`} · ${fmtTrainingCost(window.TRAINING_COSTS[id],spell,rank)}`;
      const perTime = m.perSecond == null ? "—" : `${fmt(m.perSecond)} / sec`;
      const perMana = m.perMana == null ? "—" : `${fmt(m.perMana,2)} / mana`;
      const effectiveCast = rank[7] ?? spell.cast;
      const shieldCooldown=shield?(talents.soulWarding?" · no cooldown":" · 4s cooldown"):"";
      const castText = spell.duration ? `${spell.instant ? "Instant · 1.5s GCD" : `${m.cast}s cast`} · ${spell.duration}s effect` : spell.instant ? `Instant · 1.5s GCD${shieldCooldown}` : `${m.cast}s ${spell.channel?"channel":"cast"}`;
      const details = spell.detail ? `<span class="rank-extra">${esc(spell.detail)}</span>` : "";
      const incompleteGrowth = m.growthIncomplete ? `<span class="rank-extra warning">Learned-level base shown; higher-level growth is incomplete.</span>` : "";
      const tickLine = spell.periodicTicks && m.healMin != null ? `<span class="rank-extra">Healing per tick: ${fmtRange(m.healMin/spell.periodicTicks,m.healMax/spell.periodicTicks)}</span>` : "";
      const tooltipValue = m.baseMin == null ? "Heal amount not exposed" : `Base ${fmtRange(m.baseMin,m.baseMax)} · with gear / talents ${range}`;
      const totalLine = ["Prayer of Healing","Holy Nova","Circle of Healing"].includes(spell.name) ? `<span class="rank-extra">Party mean total (${m.targets}): ${fmt(m.total)}</span>` : spell.name === "Prayer of Mending" ? `<span class="rank-extra">Mean total across ${m.targets} successful heal${m.targets===1?"":"s"}: ${fmt(m.total)}</span>` : spell.name === "Lightwell" ? `<span class="rank-extra">Mean total for ${m.targets} click${m.targets===1?"":"s"}: ${fmt(m.total)}</span>` : "";
      const critPct=m.critChance*100;
      return `<div class="rank-row ${shield ? "shield-row" : ""}" data-sort-rank="${rankNo}" data-sort-range="${m.heal??-1}" data-sort-cast="${m.cast}" data-sort-cost="${m.netMana??-1}" data-sort-throughput="${m.perSecond??-1}" data-sort-efficiency="${m.perMana??-1}" data-sort-crit="${critPct}" data-sort-critheal="${m.critHeal??-1}" data-sort-expected="${m.expectedPerSecond??-1}" data-sort-hpm="${m.expectedPerMana??-1}" data-sort-aegis="${m.aegisExpected}" data-sort-holybinding="${m.holyBindingExpected}" data-sort-inspiration="${m.inspirationExpected}">
        <div class="rank-name"><a href="${rankLink}" target="_blank" rel="noreferrer">R${rankNo} ↗</a><span>${learnedText}</span></div>
        <div class="rank-amount"><b>${group}</b><span>${kindLabel} · ${tooltipValue}</span>${totalLine}${tickLine}${incompleteGrowth}${details}</div>
        <div class="rank-stat"><span>Cast / timing</span><b>${castText}</b></div>
        <div class="rank-stat"><span>Mana cost</span><b>${note}</b></div>
        <div class="rank-stat"><span>${shield ? "Absorb / cast time" : "Healing / cast time"}</span><b>${perTime}</b></div>
        <div class="rank-stat"><span>${shield ? "Absorb / mana" : "Healing / mana"}</span><b>${perMana}</b></div>
        <div class="rank-stat"><span>Crit chance</span><b>${shield ? "—" : `${fmt(critPct,1)}%`}</b></div>
        <div class="rank-stat"><span>Crit heal / event</span><b>${m.critHealMin==null?"—":fmtRange(m.critHealMin,m.critHealMax)}</b></div>
        <div class="rank-stat"><span>Expected / sec</span><b>${m.expectedPerSecond==null?"—":`${fmt(m.expectedPerSecond)} / sec`}</b></div>
        <div class="rank-stat"><span>Holy Binding</span><b>${m.holyBindingExpected?`${fmt(m.holyBindingExpected)} extra / cast`:"—"}</b></div>
        <div class="rank-stat"><span>Expected / mana</span><b>${m.expectedPerMana==null?"—":`${fmt(m.expectedPerMana,2)} / mana`}</b></div>
        <div class="rank-stat"><span>Expected Aegis</span><b>${m.aegisExpected?`${fmt(m.aegisExpected)} / cast`:"—"}</b></div>
        <div class="rank-stat"><span>Inspiration</span><b>${m.inspirationArmor?`+${fmt(m.inspirationArmor*100,0)}% armor · ${fmt(m.inspirationProcChance*100,1)}% proc`:`—`}</b></div>
      </div>`;
    }).join("");
    return `<details class="spell-card" data-spell-index="${index}" ${ui.open ? "open" : ""}>
      <summary><span class="spell-glyph ${shield ? "shield-glyph" : ""}">${shield ? "◈" : "✦"}</span><span class="spell-title"><b>${esc(spell.name)}</b><small>${esc(spell.group)}</small></span><span class="spell-kind ${shield ? "shield-kind" : ""}">${kindLabel}</span><span class="rank-pill">${spell.ranks.length} ${spell.ranks.length === 1 ? "rank" : "ranks"}</span><span class="chevron">⌄</span></summary>
      <div class="rank-table"><div class="rank-header" data-sort-key="${ui.sortKey}" data-sort-direction="${ui.direction}">${[["rank","Rank / level · training"],["range","Healing range"],["cast","Cast"],["cost","Mana"],["throughput","Mean / time"],["efficiency","Mean / mana"],["crit","Crit chance"],["critheal","Crit heal / event"],["expected","Expected / sec"],["holybinding","Holy Binding"],["hpm","Expected / mana"],["aegis","Aegis / cast"],["inspiration","Inspiration value"]].map(([key,label])=>`<button type="button" class="sort-header" data-sort="${key}" aria-label="Sort ${label}">${label} ${ui.sortKey===key?(ui.direction==="asc"?"↑":"↓"):"↕"}</button>`).join("")}</div>${rows}</div>
    </details>`;
  }).join("");
  host.querySelectorAll(".spell-card[data-spell-index]").forEach(card=>{
    const ui=spellUiState[card.dataset.spellIndex]??{};
    card.addEventListener("toggle",()=>{
      spellUiState[card.dataset.spellIndex]={...spellUiState[card.dataset.spellIndex],open:card.open};
      try { localStorage.setItem(SPELL_UI_STATE_KEY,JSON.stringify(spellUiState)); } catch {}
    });
    const header=card.querySelector(".rank-header");
    if(ui.sortKey&&ui.direction)sortSpellRows(card.querySelector(".rank-table"),ui.sortKey,ui.direction);
  });
  document.querySelector("#rankCount").textContent = `${ranksShown} ranks · ${window.HEALING_SPELLS.length} spells`;
  host.querySelectorAll(".rank-header [data-sort]").forEach(button=>button.addEventListener("click",()=>{
    const table=button.closest(".rank-table"),key=button.dataset.sort,header=button.parentElement;
    const old=header.dataset.sortKey===key?header.dataset.sortDirection:"";
    const direction=old==="asc"?"desc":"asc";
    header.dataset.sortKey=key;header.dataset.sortDirection=direction;
    header.querySelectorAll("button").forEach(item=>item.textContent=item.textContent.replace(/[↑↓↕]$/,"↕"));
    button.textContent=button.textContent.replace(/↕$/,direction==="asc"?"↑":"↓");
    sortSpellRows(table,key,direction);
    const card=button.closest(".spell-card"),index=card.dataset.spellIndex;
    spellUiState[index]={open:card.open,sortKey:key,direction};
    try { localStorage.setItem(SPELL_UI_STATE_KEY,JSON.stringify(spellUiState)); } catch {}
  }));
}

document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active",t === tab));
  document.querySelector("#gearPanel").classList.toggle("hidden",tab.dataset.tab !== "gear");
  document.querySelector("#spellsPanel").classList.toggle("hidden",tab.dataset.tab !== "spells");
}));
document.querySelector("#characterLevel").value=String(characterLevel);
document.querySelector("#characterLevel").addEventListener("input",event=>{
  const value=Number(event.currentTarget.value);
  if(Number.isInteger(value) && value >= 1 && value <= 60){
    characterLevel=value;
    try { localStorage.setItem(CHARACTER_LEVEL_KEY,String(value)); } catch {}
    renderSpells();
  }
});
["#bonusHealing","#manaReduction","#partyTargets"].forEach(selector => document.querySelector(selector).addEventListener("input",renderSpells));
const talentLimits={twinDisciplines:5,improvedPws:3,improvedRenew:3,holyBinding:1,holySpecialization:5,divineFury:5,spiritualHealing:3,spiritualGuidance:5,renewedHope:5,divineAegis:3,inspiration:3,soulWarding:1,mentalAgility:3,litanyOfLight:2,innerFocus:1,searingLight:2,powerInfusionTalent:1,spiritOfRedemptionTalent:1};
document.querySelector("#manaReduction").addEventListener("change",saveTalents);
for(const [key] of Object.entries(talentLimits)) document.querySelector(`#${key}`).addEventListener("change",saveTalents);
for(const selector of ["#baseCrit","#totalSpirit","#bonusHealingAdjustment","#weakenedSoulTarget","#differentPreviousHeal","#flashHealOtherTarget","#innerFocusReady","#holyNovaProcReady","#powerInfusionActive","#spiritOfRedemptionActive"]) document.querySelector(selector).addEventListener("input",saveTalents);
for(const [key] of Object.entries(talentLimits)) document.querySelector(`#${key}`).value=String(talents[key]);
document.querySelector("#manaReduction").value=String(talents.improvedHealing*5);
document.querySelector("#baseCrit").value=String(talents.baseCrit);
document.querySelector("#totalSpirit").value=String(talents.totalSpirit);
document.querySelector("#bonusHealingAdjustment").value=String(talents.bonusHealingAdjustment);
document.querySelector("#weakenedSoulTarget").checked=talents.weakenedSoulTarget;
document.querySelector("#flashHealOtherTarget").checked=talents.flashHealOtherTarget;
document.querySelector("#innerFocusReady").checked=talents.innerFocusReady;
document.querySelector("#holyNovaProcReady").checked=talents.holyNovaProcReady;
document.querySelector("#powerInfusionActive").checked=talents.powerInfusionActive;
document.querySelector("#spiritOfRedemptionActive").checked=talents.spiritOfRedemptionActive;
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
  const importedTalents={twinDisciplines:0,improvedPws:0,improvedRenew:0,holyBinding:0,holySpecialization:0,divineFury:0,spiritualHealing:0,spiritualGuidance:0,renewedHope:0,divineAegis:0,inspiration:0,soulWarding:0,mentalAgility:0,litanyOfLight:0,improvedHealing:0,innerFocus:0,searingLight:0,powerInfusionTalent:0,spiritOfRedemptionTalent:0};
  for(const spec of character.specs || []) for(const talent of spec.talents || []) {
    const name=String(talent.name || "").toLowerCase();
    const talentMap={"twin disciplines":["twinDisciplines",5],"improved power word: shield":["improvedPws",3],"improved renew":["improvedRenew",3],"holy binding":["holyBinding",1],"holy specialization":["holySpecialization",5],"divine fury":["divineFury",5],"spiritual healing":["spiritualHealing",3],"spiritual guidance":["spiritualGuidance",5],"renewed hope":["renewedHope",5],"divine aegis":["divineAegis",3],"inspiration":["inspiration",3],"soul warding":["soulWarding",1],"mental agility":["mentalAgility",3],"litany of light":["litanyOfLight",2],"improved healing":["improvedHealing",3],"inner focus":["innerFocus",1],"searing light":["searingLight",2],"power infusion":["powerInfusionTalent",1],"spirit of redemption":["spiritOfRedemptionTalent",1]};
    if(talentMap[name]) { const [key,max]=talentMap[name]; importedTalents[key]=clampRank(talent.rank,max); }
  }
  const levelValue=typeof character.level==="object" ? (character.level.level ?? character.level.value) : character.level;
  const level=Number(levelValue);
  return {name:character.name,level:Number.isInteger(level) && level >= 1 && level <= 60 ? level : null,gear:imported,talents:importedTalents,talentsAvailable:Array.isArray(character.specs)};
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
    if(result.level){
      characterLevel=result.level;
      document.querySelector("#characterLevel").value=String(characterLevel);
      try { localStorage.setItem(CHARACTER_LEVEL_KEY,String(characterLevel)); } catch {}
      renderSpells();
    }
    if(result.talentsAvailable){
      talents={...talents,...result.talents};
      for(const [key] of Object.entries(talentLimits)) document.querySelector(`#${key}`).value=String(talents[key]);
      document.querySelector("#manaReduction").value=String(talents.improvedHealing*5);
      localStorage.setItem(TALENT_STORE_KEY,JSON.stringify(talents));
      renderSpells();
    }
    status.textContent=`Imported ${Object.keys(gear).length} equipped items${result.level?` at level ${result.level}`:""}${result.talentsAvailable?" and current talent ranks":""} from ${result.name}.${enrichment.filled?` Filled healing stats from Wowhead on ${enrichment.filled} item${enrichment.filled===1?"":"s"}.`:""}${enrichment.failed?` ${enrichment.failed} item lookup${enrichment.failed===1?"":"s"} failed; those stats remain unknown.`:""}`;
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
