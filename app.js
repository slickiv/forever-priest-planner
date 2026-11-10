const SLOTS = [
  ["head","Head"],["neck","Neck"],["shoulders","Shoulders"],["back","Back"],["chest","Chest"],
  ["wrists","Wrists"],["hands","Hands"],["waist","Waist"],["legs","Legs"],["feet","Feet"],
  ["finger1","Ring 1"],["finger2","Ring 2"],["trinket1","Trinket 1"],["trinket2","Trinket 2"],
  ["mainhand","Main hand"],["offhand","Off hand"],["ranged","Ranged"]
];
const STORE_KEY = "forever-priest-planner-v1";
const CHARACTER_LEVEL_KEY = "forever-priest-planner-character-level-v1";
const CHARACTER_RACE_KEY = "forever-priest-planner-character-race-v1";
const SPELL_UI_STATE_KEY = "forever-priest-planner-spell-ui-v1";
const SPELL_LIST_PREFS_KEY = "forever-priest-planner-spell-list-v1";
const CORS_RELAY = "https://proxy.cors.dev/";
let gear = readGear();
const TALENT_STORE_KEY = "forever-priest-planner-talents-v1";
const RANK2_FIT_MIGRATION_KEY = "forever-priest-planner-rank2-fit-migrated-v1";
let talents = readTalents();
let characterLevel = readCharacterLevel();
let characterRace = readCharacterRace();
let spellUiState = readSpellUIState();
let spellListPrefs = readSpellListPrefs();
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
function readCharacterRace() {
  try { const race=localStorage.getItem(CHARACTER_RACE_KEY)||""; return ["Human","Dwarf","Night Elf","Gnome","Troll","Undead"].includes(race)?race:""; }
  catch { return ""; }
}
function readSpellListPrefs() {
  try {
    const saved=JSON.parse(localStorage.getItem(SPELL_LIST_PREFS_KEY)||"{}");
    return {sort:["learned","name","category","rank-count"].includes(saved.sort)?saved.sort:"learned",scope:saved.scope==="all"?"all":"level"};
  } catch { return {sort:"learned",scope:"level"}; }
}
function saveSpellListPrefs() { try { localStorage.setItem(SPELL_LIST_PREFS_KEY,JSON.stringify(spellListPrefs)); } catch {} }
function readSpellUIState() {
  try { return JSON.parse(localStorage.getItem(SPELL_UI_STATE_KEY) || "{}"); }
  catch { return {}; }
}
function readTalents() {
  try {
    const saved=JSON.parse(localStorage.getItem(TALENT_STORE_KEY) || "null");
    const defaults={twinDisciplines:3,improvedPws:0,improvedRenew:0,holyBinding:0,holyNovaTalent:false,penanceTalent:false,prayerOfMendingTalent:false,mindFlayTalent:false,flashHealOtherTarget:false,bonusHealingAdjustment:0,bonusSpellDamageAdjustment:0,holySpecialization:0,divineFury:0,spiritualHealing:0,spiritualGuidance:0,renewedHope:0,divineAegis:0,inspiration:0,soulWarding:0,mentalAgility:0,litanyOfLight:0,improvedHealing:0,innerFocus:0,innerFocusReady:false,searingLight:0,powerInLight:0,powerInLightTarget:false,holyNovaProcReady:false,warlockTalentShadowburn:false,warlockTalentConflagrate:false,warlockTalentIncinerate:false,warlockTalentSiphonLife:false,warlockTalentWrack:false,warlockTalentBaneOfHavoc:false,warlockBaneOfHavocScenario:0,warlockImprovedCorruption:0,warlockShadowMastery:0,warlockMalevolence:0,warlockPandemic:0,warlockRuin:0,warlockAgonizingFlames:0,warlockFireAndBrimstone:0,warlockDemonicKnowledge:0,warlockDemonicKnowledgeActive:false,warlockPetSpellPower:0,warlockUnholyPower:0,warlockImprovedImp:false,warlockImprovedSayaad:0,warlockMasterDemonologist:0,warlockTargetImmolate:false,powerInfusionTalent:0,powerInfusionActive:false,spiritOfRedemptionTalent:0,spiritOfRedemptionActive:false,darkness:0,improvedMindFlay:0,improvedShadowWordPain:0,improvedMindBlast:0,improvedManaBurn:0,devouringContagion:0,shadowform:false,shadowWeaving:0,shadowWeavingStacks:0,earlyDemise:0,darkInspiration:0,darkInspirationActive:false,targetUnder20:false,differentPreviousHeal:false,baseCrit:0,totalSpirit:0,weakenedSoulTarget:false};
    if(!saved) { localStorage.setItem(RANK2_FIT_MIGRATION_KEY,"1"); return defaults; }
    if(localStorage.getItem(RANK2_FIT_MIGRATION_KEY)!=="1") {
      if(saved.bonusHealingAdjustment===3) saved.bonusHealingAdjustment=0;
      localStorage.setItem(RANK2_FIT_MIGRATION_KEY,"1");
    }
    return Object.fromEntries(Object.entries(defaults).map(([key,value])=>[key,typeof value==="boolean"?Boolean(saved[key]??value):key==="baseCrit"||key==="totalSpirit"||key==="bonusHealingAdjustment"||key==="bonusSpellDamageAdjustment"||key==="warlockPetSpellPower"?Math.max(0,Number(saved[key]??value)||0):clampRank(saved[key]??value,key==="warlockPandemic"||key==="warlockAgonizingFlames"||key==="warlockFireAndBrimstone"||key==="warlockImprovedSayaad"?3:key==="litanyOfLight"||key==="searingLight"||key==="improvedShadowWordPain"||key==="earlyDemise"||key==="improvedMindFlay"||key==="improvedManaBurn"||key==="devouringContagion"?2:key==="powerInLight"||key==="darkness"||key==="darkInspiration"||key==="improvedMindBlast"||key==="shadowWeaving"||key==="shadowWeavingStacks"||key==="warlockImprovedCorruption"||key==="warlockShadowMastery"||key==="warlockMalevolence"||key==="warlockRuin"||key==="warlockUnholyPower"||key==="warlockMasterDemonologist"?5:key==="soulWarding"||key==="innerFocus"||key==="powerInfusionTalent"||key==="spiritOfRedemptionTalent"||key==="holyBinding"?1:key==="warlockBaneOfHavocScenario"?4:key==="warlockDemonicKnowledge"?3:3)]));
  } catch { return {twinDisciplines:3,improvedPws:0,improvedRenew:0,holyBinding:0,holyNovaTalent:false,penanceTalent:false,prayerOfMendingTalent:false,mindFlayTalent:false,flashHealOtherTarget:false,bonusHealingAdjustment:0,bonusSpellDamageAdjustment:0,holySpecialization:0,divineFury:0,spiritualHealing:0,spiritualGuidance:0,renewedHope:0,divineAegis:0,inspiration:0,soulWarding:0,mentalAgility:0,litanyOfLight:0,improvedHealing:0,innerFocus:0,innerFocusReady:false,searingLight:0,powerInLight:0,powerInLightTarget:false,holyNovaProcReady:false,warlockTalentShadowburn:false,warlockTalentConflagrate:false,warlockTalentIncinerate:false,warlockTalentSiphonLife:false,warlockTalentWrack:false,warlockTalentBaneOfHavoc:false,warlockBaneOfHavocScenario:0,warlockImprovedCorruption:0,warlockShadowMastery:0,warlockMalevolence:0,warlockPandemic:0,warlockRuin:0,warlockAgonizingFlames:0,warlockFireAndBrimstone:0,warlockDemonicKnowledge:0,warlockDemonicKnowledgeActive:false,warlockPetSpellPower:0,warlockUnholyPower:0,warlockImprovedImp:false,warlockImprovedSayaad:0,warlockMasterDemonologist:0,warlockTargetImmolate:false,powerInfusionTalent:0,powerInfusionActive:false,spiritOfRedemptionTalent:0,spiritOfRedemptionActive:false,darkness:0,improvedMindFlay:0,improvedShadowWordPain:0,improvedMindBlast:0,improvedManaBurn:0,devouringContagion:0,shadowform:false,shadowWeaving:0,shadowWeavingStacks:0,earlyDemise:0,darkInspiration:0,darkInspirationActive:false,targetUnder20:false,differentPreviousHeal:false,baseCrit:0,totalSpirit:0,weakenedSoulTarget:false}; }
}
function clampRank(value,max) { return Math.max(0,Math.min(max,Math.floor(Number(value)||0))); }
function saveTalents() {
  talents={twinDisciplines:clampRank(document.querySelector("#twinDisciplines").value,5),improvedPws:clampRank(document.querySelector("#improvedPws").value,3),improvedRenew:clampRank(document.querySelector("#improvedRenew").value,3),holyBinding:clampRank(document.querySelector("#holyBinding").value,1),holyNovaTalent:document.querySelector("#holyNovaTalent").checked,penanceTalent:document.querySelector("#penanceTalent").checked,prayerOfMendingTalent:document.querySelector("#prayerOfMendingTalent").checked,mindFlayTalent:document.querySelector("#mindFlayTalent").checked,flashHealOtherTarget:document.querySelector("#flashHealOtherTarget").checked,bonusHealingAdjustment:Math.max(0,number(document.querySelector("#bonusHealingAdjustment").value)),bonusSpellDamageAdjustment:Math.max(0,number(document.querySelector("#bonusSpellDamageAdjustment").value)),holySpecialization:clampRank(document.querySelector("#holySpecialization").value,5),divineFury:clampRank(document.querySelector("#divineFury").value,5),spiritualHealing:clampRank(document.querySelector("#spiritualHealing").value,3),spiritualGuidance:clampRank(document.querySelector("#spiritualGuidance").value,5),renewedHope:clampRank(document.querySelector("#renewedHope").value,5),divineAegis:clampRank(document.querySelector("#divineAegis").value,3),inspiration:clampRank(document.querySelector("#inspiration").value,3),soulWarding:clampRank(document.querySelector("#soulWarding").value,1),mentalAgility:clampRank(document.querySelector("#mentalAgility").value,3),litanyOfLight:clampRank(document.querySelector("#litanyOfLight").value,2),improvedHealing:clampRank(number(document.querySelector("#manaReduction").value)/5,3),innerFocus:clampRank(document.querySelector("#innerFocus").value,1),innerFocusReady:document.querySelector("#innerFocusReady").checked,searingLight:clampRank(document.querySelector("#searingLight").value,2),powerInLight:clampRank(document.querySelector("#powerInLight").value,5),powerInLightTarget:document.querySelector("#powerInLightTarget").checked,holyNovaProcReady:document.querySelector("#holyNovaProcReady").checked,warlockTalentShadowburn:document.querySelector("#warlockTalentShadowburn").checked,warlockTalentConflagrate:document.querySelector("#warlockTalentConflagrate").checked,warlockTalentIncinerate:document.querySelector("#warlockTalentIncinerate").checked,warlockTalentSiphonLife:document.querySelector("#warlockTalentSiphonLife").checked,warlockTalentWrack:document.querySelector("#warlockTalentWrack").checked,warlockTalentBaneOfHavoc:document.querySelector("#warlockTalentBaneOfHavoc").checked,warlockBaneOfHavocScenario:clampRank(document.querySelector("#warlockBaneOfHavocScenario").value,4),warlockImprovedCorruption:clampRank(document.querySelector("#warlockImprovedCorruption").value,5),warlockShadowMastery:clampRank(document.querySelector("#warlockShadowMastery").value,5),warlockMalevolence:clampRank(document.querySelector("#warlockMalevolence").value,5),warlockPandemic:clampRank(document.querySelector("#warlockPandemic").value,3),warlockRuin:clampRank(document.querySelector("#warlockRuin").value,5),warlockAgonizingFlames:clampRank(document.querySelector("#warlockAgonizingFlames").value,3),warlockFireAndBrimstone:clampRank(document.querySelector("#warlockFireAndBrimstone").value,3),warlockDemonicKnowledge:clampRank(document.querySelector("#warlockDemonicKnowledge").value,3),warlockDemonicKnowledgeActive:document.querySelector("#warlockDemonicKnowledgeActive").checked,warlockPetSpellPower:Math.max(0,number(document.querySelector("#warlockPetSpellPower").value)),warlockUnholyPower:clampRank(document.querySelector("#warlockUnholyPower").value,5),warlockImprovedImp:document.querySelector("#warlockImprovedImp").checked,warlockImprovedSayaad:clampRank(document.querySelector("#warlockImprovedSayaad").value,3),warlockMasterDemonologist:clampRank(document.querySelector("#warlockMasterDemonologist").value,5),warlockTargetImmolate:document.querySelector("#warlockTargetImmolate").checked,powerInfusionTalent:clampRank(document.querySelector("#powerInfusionTalent").value,1),powerInfusionActive:document.querySelector("#powerInfusionActive").checked,spiritOfRedemptionTalent:clampRank(document.querySelector("#spiritOfRedemptionTalent").value,1),spiritOfRedemptionActive:document.querySelector("#spiritOfRedemptionActive").checked,differentPreviousHeal:document.querySelector("#differentPreviousHeal").checked,baseCrit:Math.max(0,Math.min(100,number(document.querySelector("#baseCrit").value))),totalSpirit:Math.max(0,number(document.querySelector("#totalSpiritInput").value)),weakenedSoulTarget:document.querySelector("#weakenedSoulTarget").checked,darkness:clampRank(document.querySelector("#darkness").value,5),improvedMindFlay:clampRank(document.querySelector("#improvedMindFlay").value,2),improvedShadowWordPain:clampRank(document.querySelector("#improvedShadowWordPain").value,2),improvedMindBlast:clampRank(document.querySelector("#improvedMindBlast").value,5),improvedManaBurn:clampRank(document.querySelector("#improvedManaBurn").value,2),devouringContagion:clampRank(document.querySelector("#devouringContagion").value,2),shadowform:document.querySelector("#shadowform").checked,shadowWeaving:clampRank(document.querySelector("#shadowWeaving").value,5),shadowWeavingStacks:clampRank(document.querySelector("#shadowWeavingStacks").value,5),earlyDemise:clampRank(document.querySelector("#earlyDemise").value,2),darkInspiration:clampRank(document.querySelector("#darkInspiration").value,5),darkInspirationActive:document.querySelector("#darkInspirationActive").checked,targetUnder20:document.querySelector("#targetUnder20").checked};
  document.querySelector("#bonusHealing").value=sumInfo("healing").value+talents.bonusHealingAdjustment;
  document.querySelector("#bonusSpellDamage").value=sumInfo("damage").value+talents.bonusSpellDamageAdjustment;
  document.querySelector("#warlockBaneOfHavocScenario").disabled=!talents.warlockTalentBaneOfHavoc;
  localStorage.setItem(TALENT_STORE_KEY,JSON.stringify(talents));
  localStorage.setItem(RANK2_FIT_MIGRATION_KEY,"1");
  renderSpells();
  renderDamageSpells();
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
    const stats = item ? `<div class="slot-stats"><span>${item.healing == null ? "? heal" : `+${item.healing} heal`}</span><span>${item.damage == null ? "? dmg" : `+${item.damage} dmg`}</span><span>${item.intellect == null ? "? int" : `${item.intellect} int`}</span><span>${item.spirit == null ? "? spi" : `${item.spirit} spi`}</span><span>${item.mp5 == null ? "? mp5" : `${item.mp5} mp5`}</span></div>` : "";
    const source = item?.source ? `<a class="slot-source" href="https://www.wowhead.com/forever/search?q=${encodeURIComponent(item.source)}" target="_blank" rel="noreferrer">Loot source: ${esc(item.source)} ↗</a>` : "";
    return `<article class="gear-slot ${item ? "filled" : ""}">
      <div class="slot-top"><span class="slot-label">${label}</span><span class="cloth-tag">${slotType}</span></div>
      ${item ? `<a class="slot-item" href="${itemHref}" target="_blank" rel="noreferrer">${esc(item.name || `Wowhead item ${item.id || ""}`)} ↗</a>${source}${stats}` : `<span class="empty-slot">No item selected</span>`}
      <div class="slot-actions"><a href="${wowheadItems()}" target="_blank" rel="noreferrer">Wowhead finder ↗</a><button type="button" data-edit="${id}">${item ? "Edit" : "Add item"}</button></div>
    </article>`;
  }).join("");
  host.querySelectorAll("[data-edit]").forEach(button => button.addEventListener("click", () => openItem(button.dataset.edit)));
  const totals = {healing:sumInfo("healing"),damage:sumInfo("damage"),intellect:sumInfo("intellect"),spirit:sumInfo("spirit"),mp5:sumInfo("mp5")};
  for (const [key,value] of Object.entries(totals)) document.querySelector(`#total${key[0].toUpperCase()}${key.slice(1)}`).textContent = displayTotal(value);
  document.querySelector("#heroHealing").textContent = displayTotal(totals.healing);
  document.querySelector("#bonusHealing").value = totals.healing.value+number(talents.bonusHealingAdjustment);
  document.querySelector("#bonusSpellDamage").value = totals.damage.value+number(talents.bonusSpellDamageAdjustment);
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
  document.querySelector("#itemDamage").value = item.damage ?? "";
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
  let vals = {healing:optionalNumber(document.querySelector("#itemHealing").value),damage:optionalNumber(document.querySelector("#itemDamage").value),intellect:optionalNumber(document.querySelector("#itemIntellect").value),spirit:optionalNumber(document.querySelector("#itemSpirit").value),mp5:optionalNumber(document.querySelector("#itemMp5").value)};
  if (!wowheadId && !name && Object.values(vals).every(v => v == null)) {
    idInput.setCustomValidity("Enter an item name, Wowhead ID, or at least one stat."); idInput.reportValidity(); return false;
  }
  idInput.setCustomValidity("");
  const statsUntouched=editingOriginalItem && ["healing","damage","intellect","spirit","mp5"].every(key=>(vals[key]??null)===(editingOriginalItem[key]??null));
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
      if(editingOriginalItem && itemChanged && statsUntouched) vals={healing:null,damage:null,intellect:null,spirit:null,mp5:null};
      if(editingOriginalItem && itemChanged && !name) document.querySelector("#itemName").value="";
      document.querySelector("#itemHealing").value=vals.healing??"";
      document.querySelector("#itemDamage").value=vals.damage??"";
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
  const bonus = gearBonus + Math.floor((sumInfo("spirit").value+number(talents.totalSpirit)) * guidanceRates[talents.spiritualGuidance]);
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
  const cast = spell.channel ? baseCast : spell.instant ? 1.5 : Math.max(0.5,baseCast - (["Heal","Greater Heal"].includes(spell.name) ? talents.divineFury * 0.1 : 0));
  const coefficient = rank[6] ?? spell.coefficient;
  let mana = rank[4] == null ? null : Math.floor(rank[4] * (100 - manaReductionPercent) / 100);
  if(mana!=null && innerFocusApplies) mana=0;
  if(mana!=null && holyNovaFree) mana=0;
  if(mana!=null && freeFormActive) mana=0;
  const litanyRefund=rank[4]!=null && spell.kind!=="shield" && talents.differentPreviousHeal ? Math.floor(rank[4]*talents.litanyOfLight*5/100) : 0;
  const netMana=mana==null?null:Math.max(0,mana-litanyRefund);
  const learnedLevel=rank[1];
  const castId=rank[5];
  const effectId=rank[8] ?? spell.healingEffectIds?.[castId] ?? castId;
  const hitCount=spell.bolts ?? 1;
  const damageTargets=spell.name==="Holy Nova"?Math.max(1,Math.min(10,number(document.querySelector("#enemyTargets")?.value)||1)):1;
  const growth=spell.levelGrowth?.[effectId] ?? spell.levelGrowth?.[castId];
  const rangeGrowth=window.HEALING_RANGE_EFFECTS?.[effectId];
  const rangeOverride=window.HEALING_RANGE_OVERRIDES?.[effectId];
  const growthCap=rangeOverride?.maxLevel ?? rangeGrowth?.[4];
  const growthBaseLevel=rangeOverride?.baseLevel ?? rangeGrowth?.[3];
  const rangeGrowthLevels=growthCap==null?0:Math.max(0,Math.min(characterLevel,growthCap)-growthBaseLevel);
  const rangeBonus=rangeOverride?rangeOverride.perLevel*rangeGrowthLevels:rangeGrowth?rangeGrowth[1]*rangeGrowthLevels:0;
  const basePerHitMin = rank[2] == null ? null : rangeOverride
    ? rangeOverride.min+rangeBonus
    : rangeGrowth ? Math.round(rangeGrowth[0]*(1-rangeGrowth[2]/2)+rangeBonus) : rank[2];
  const basePerHitMax = rank[3] == null ? null : rangeOverride
    ? rangeOverride.max+rangeBonus
    : rangeGrowth ? Math.round(rangeGrowth[0]*(1+rangeGrowth[2]/2)+rangeBonus) : rank[3];
  const baseMin = basePerHitMin == null ? null : (rangeOverride?basePerHitMin:Math.round(basePerHitMin)) * hitCount;
  const baseMax = basePerHitMax == null ? null : (rangeOverride?basePerHitMax:Math.round(basePerHitMax)) * hitCount;
  const growthCanApply=["Lesser Heal","Heal","Flash Heal","Greater Heal","Prayer of Healing","Power Word: Shield","Desperate Prayer","Divine Grace","Holy Nova","Penance"].includes(spell.name);
  const growthIncomplete = ((spell.incompleteGrowthRanks || []).includes(castId)||(growthCanApply&&!rangeGrowth&&!rangeOverride)) && characterLevel > learnedLevel;
  const generalRetention=learnedLevel == null ? 1 : Math.max(0,1-Math.max(0,characterLevel-learnedLevel-17)*0.05);
  const coefficientRetention=Math.max(0,generalRetention-(growth?.downrankOffset || 0));
  const effectiveCoefficient=coefficient*coefficientRetention;
  const damageGrowth=spell.damageGrowth?.[castId];
  const damageGrowthLevels=damageGrowth&&learnedLevel!=null?Math.max(0,Math.min(characterLevel,damageGrowth.cap)-learnedLevel):0;
  const damageBaseMin=damageGrowth?(damageGrowth.min===damageGrowth.max?Math.round(damageGrowth.min+damageGrowth.perLevel*damageGrowthLevels):Math.floor(damageGrowth.min+damageGrowth.perLevel*damageGrowthLevels+1e-9)):null;
  const damageBaseMax=damageGrowth?(damageGrowth.min===damageGrowth.max?Math.round(damageGrowth.max+damageGrowth.perLevel*damageGrowthLevels):Math.ceil(damageGrowth.max+damageGrowth.perLevel*damageGrowthLevels-1e-9)):null;
  const improvedRenewRate=[0,.05,.10,.15][talents.improvedRenew];
  const spiritualHealingRate=[0,.03,.07,.10][talents.spiritualHealing];
  const inspirationArmor=[0,.08,.17,.25][talents.inspiration];
  const improvedPwsRates=[0,.07,.14,.20];
  const searingLightDamage=[0,.02,.05][talents.searingLight];
  const powerInLightDamage=spell.name==="Penance"&&talents.powerInLightTarget?[0,.02,.04,.06,.08,.10][talents.powerInLight]:0;
  const powerInfusionMultiplier=talents.powerInfusionTalent>0 && talents.powerInfusionActive && spell.kind!=="shield"?1.2:1;
  const talentMultiplier=(spell.kind === "shield"
    ? 1 + improvedPwsRates[talents.improvedPws]
    : (spell.instant ? 1 + talents.twinDisciplines / 100 : 1)
      * (spell.name === "Renew" ? 1 + improvedRenewRate : 1)
      * (1 + spiritualHealingRate)) * powerInfusionMultiplier;
  const damageTalentMultiplier=(spell.instant?1+talents.twinDisciplines/100:1)*(1+searingLightDamage)*(1+powerInLightDamage)*powerInfusionMultiplier;
  const calculationBaseMin=basePerHitMin==null?null:(hitCount>1?Math.round(basePerHitMin):basePerHitMin);
  const calculationBaseMax=basePerHitMax==null?null:(hitCount>1?Math.round(basePerHitMax):basePerHitMax);
  const tooltipCorrection=0;
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
  if (total != null && ["Prayer of Mending","Lightwell"].includes(spell.name)) total *= targets;
  const amountLabel = spell.kind === "shield" ? "Absorb" : "Healing";
  const perSecond = total == null ? null : total / cast;
  const perMana = total == null || !netMana ? null : total / netMana;
  const renewHopeApplies=["Flash Heal","Lesser Heal","Heal","Greater Heal","Penance"].includes(spell.name) && talents.weakenedSoulTarget;
  const canCrit=spell.canCrit!==false && spell.kind!=="shield";
  const innerFocusCrit=innerFocusApplies && canCrit && (!spell.periodicTicks || spell.name==="Penance") ? 25:0;
  const critChance=canCrit ? Math.min(1,(number(talents.baseCrit)+(spell.school === "discipline" ? 0 : talents.holySpecialization)+ (renewHopeApplies ? talents.renewedHope*2 : 0)+innerFocusCrit)/100) : 0;
  const damageCanCrit=damageBaseMin!=null&&spell.canCrit!==false;
  const damageCritChance=damageCanCrit?Math.min(1,(number(talents.baseCrit)+(spell.school === "discipline" ? 0 : talents.holySpecialization)+innerFocusCrit)/100):0;
  const inspirationProcChance=canCrit&&(!spell.periodicTicks||spell.name==="Penance") ? 1-Math.pow(1-critChance,spell.name==="Penance"?hitCount:1) : 0;
  const inspirationExpected=inspirationArmor*inspirationProcChance;
  const critUnit=spell.name==="Penance"?1/3:1/(spell.periodicTicks||1);
  const healPerEvent=heal == null ? null : heal*critUnit;
  const healPerEventMin=healMin == null ? null : healMin*critUnit;
  const healPerEventMax=healMax == null ? null : healMax*critUnit;
  const critHeal=healPerEvent == null || !canCrit ? null : healPerEvent*1.5;
  const critHealMin=healPerEventMin == null || !canCrit ? null : healPerEventMin*1.5;
  const critHealMax=healPerEventMax == null || !canCrit ? null : healPerEventMax*1.5;
  const expectedHeal=heal == null ? null : heal*(1+critChance*0.5);
  let expectedTotal=expectedHeal;
  if(expectedTotal!=null && ["Prayer of Healing","Holy Nova"].includes(spell.name)) expectedTotal*=targets;
  if(expectedTotal!=null && ["Prayer of Mending","Lightwell"].includes(spell.name)) expectedTotal*=targets;
  const holyBindingExpected=spell.name==="Flash Heal"&&talents.holyBinding>0&&talents.flashHealOtherTarget?expectedHeal*0.5:0;
  if(expectedTotal!=null) expectedTotal+=holyBindingExpected;
  const expectedPerSecond=expectedTotal==null?null:expectedTotal/cast;
  const expectedPerMana=expectedTotal==null||!netMana?null:expectedTotal/netMana;
  const damageRetention=learnedLevel==null?1:Math.max(0,1-Math.max(0,characterLevel-learnedLevel-17)*0.05);
  const damageCoef=rank[9]??spell.damageCoefficient??0;
  const damageBonus=number(document.querySelector("#bonusSpellDamage").value)*damageCoef*damageRetention;
  const damageMultiplier=damageTalentMultiplier;
  const damagePerHitMin=damageBaseMin==null?null:(damageBaseMin+damageBonus)*damageMultiplier;
  const damagePerHitMax=damageBaseMax==null?null:(damageBaseMax+damageBonus)*damageMultiplier;
  const damageTotal=damagePerHitMin==null?null:(damagePerHitMin+damagePerHitMax)/2*hitCount*damageTargets;
  const expectedDamage=damageTotal==null?null:damageTotal*(1+damageCritChance*0.5);
  const expectedDamagePerSecond=expectedDamage==null?null:expectedDamage/cast;
  const damageMana=spell.name==="Penance"?mana:netMana;
  const expectedDamagePerMana=expectedDamage==null||!damageMana?null:expectedDamage/damageMana;
  const critDamageMin=damagePerHitMin==null?null:damagePerHitMin*1.5;
  const critDamageMax=damagePerHitMax==null?null:damagePerHitMax*1.5;
  const aegisRate=[0,.05,.10,.15][talents.divineAegis];
  const aegisTargets=["Prayer of Healing","Holy Nova","Prayer of Mending"].includes(spell.name)?targets:1;
  let aegisExpected=0;
  if(heal!=null&&aegisRate&&canCrit&&(!spell.periodicTicks||spell.name==="Penance")){
    if(spell.name==="Penance"){
      const perBoltAegis=((healPerHitMin+healPerHitMax)/2)*1.5*aegisRate;
      // All three bolts hit the same target and Divine Aegis does not stack.
      // With identical bolt amounts, any one or more crits leave one per-bolt shield.
      aegisExpected=Math.min(1200,perBoltAegis)*(1-Math.pow(1-critChance,hitCount));
    } else {
      aegisExpected=Math.min(1200,heal*1.5*aegisRate)*critChance*aegisTargets;
    }
  }
  return {bonus,targets,damageTargets,mana,netMana,damageMana,litanyRefund,baseMin,baseMax,basePerHitMin,basePerHitMax,healPerHitMin,healPerHitMax,healMin,healMax,heal,healPerEventMin,healPerEventMax,healPerEvent,total,perSecond,perMana,amountLabel,talentMultiplier,effectiveCoefficient,coefficientRetention,cast,critChance,damageCritChance,critHeal,critHealMin,critHealMax,expectedHeal,expectedTotal,expectedPerSecond,expectedPerMana,damageBaseMin,damageBaseMax,damagePerHitMin,damagePerHitMax,damageTotal,expectedDamagePerSecond,expectedDamagePerMana,critDamageMin,critDamageMax,aegisExpected,inspirationArmor,inspirationProcChance,inspirationExpected,growthIncomplete,holyBindingExpected,innerFocusApplies,holyNovaFree,freeFormActive};
}
function fmt(value, places=1) { return value == null || !Number.isFinite(value) ? "—" : Number(value.toFixed(places)).toLocaleString(undefined,{maximumFractionDigits:places}); }
function fmtCooldown(seconds) { return seconds >= 3600 ? `${fmt(seconds/3600,1)}h` : seconds >= 60 ? `${fmt(seconds/60,1)}m` : `${fmt(seconds,1)}s`; }
function fmtRange(min,max,places=1) { return min == null || max == null ? "—" : min === max ? fmt(min,places) : `${fmt(min,places)}–${fmt(max,places)}`; }
function fmtTrainingCost(copper, spell, rank) {
  const acquisition=rankAcquisition(spell,rank);
  if(acquisition.startsWith("Talent") || spell.acquisition==="automatic" || copper?.type==="free") return "";
  const fmtCoins = amount => {
    const gold = Math.floor(amount / 10000);
    const silver = Math.floor((amount % 10000) / 100);
    const coins = amount % 100;
    return [gold ? `${gold}g` : "", silver ? `${silver}s` : "", coins ? `${coins}c` : ""].filter(Boolean).join(" ") || "Free";
  };
  const trainingSource="https://urgametips.com/wow-forever/priest-guides/spells/";
  const sourceLabel=url=>url?.includes("urgametips.com")?"UrGameTips":url?.includes("wowforever.ninja")?"X’yera":url?.includes("warcraftforever.games")?"Beta recorder":copper?.source||"Source";
  const marker=(url,label)=>url?` <a class="training-source-marker" href="${url}" target="_blank" rel="noreferrer" title="${esc(label)}" aria-label="${esc(label)}">reference</a>`:` <span class="training-source-marker" title="${esc(label)}">reference</span>`;
  if(spell.acquisitionConflictRanks?.includes(rank[0])) return copper==null?"Price unknown":`${fmtCoins(typeof copper==="number"?copper:copper?.copper)}${marker(trainingSource,"Trainer price reference · acquisition source conflict")}`;
  if (copper && typeof copper === "object") {
    if (copper.type === "reference") return `${fmtCoins(copper.copper)}${marker(copper.url,sourceLabel(copper.url))}`;
    if (copper.type === "free") return `${marker(copper.url,`${sourceLabel(copper.url)} · starter rank`)}`;
    if (copper.type === "manual") return `${esc(copper.name)}${copper.requirement?` · ${esc(copper.requirement)}`:""}${marker(copper.url,sourceLabel(copper.url))}`;
  }
  if (copper == null) {
    return "Price unknown";
  }
  return `${fmtCoins(copper)}${marker(trainingSource,"Trainer price reference")}`;
}
function rankAcquisition(spell,rank){
  const price=window.TRAINING_COSTS[rank[5]];
  if(spell.race)return price?.type==="free"?`Racial · ${spell.race} · Class quest · Free`:`Racial · ${spell.race} · Trainer`;
  if(spell.acquisition==="talent"||rank[0]===(spell.talentRank||0))return spell.talentPoints?`Talent · ${spell.talentPoints} ${spell.talentTree} points`:"Talent";
  if(spell.acquisitionConflictRanks?.includes(rank[0]))return "Conflict · verify source";
  if(spell.talentRank&&rank[0]>spell.talentRank)return "Talent-gated · trainer";
  if(spell.acquisition==="unknown")return "";
  if(spell.acquisition==="automatic")return "Level-up · Free";
  if(price?.type==="free")return price.acquisition==="class quest"?"Class quest · Free":"Starter · Free";
  if(price?.type==="manual")return "Manual";
  if(price==null)return "Trainer · price unknown";
  return "Trainer";
}
function renderTrainingSources(spell) {
  const trainingSource="https://urgametips.com/wow-forever/priest-guides/spells/";
  const references=new Map();
  for (const rank of spell.ranks) {
    const price=window.TRAINING_COSTS[rank[5]];
    if (typeof price === "number") references.set(trainingSource,"Trainer price reference");
    if (price && typeof price === "object") for (const url of [price.url,price.secondaryUrl]) if (url) references.set(url,url.includes("urgametips.com")?"UrGameTips":url.includes("wowforever.ninja")?"X’yera":price.source||"Reference");
  }
  for (const url of spell.acquisitionSources||[]) references.set(url,"Acquisition reference");
  const link=(url,label)=>`<a href="${url}" target="_blank" rel="noreferrer" aria-label="${esc(label)}" title="${esc(label)}">reference</a>`;
  return references.size?`<div class="rank-sources"><span>References</span><small>${Array.from(references,([url,label])=>link(url,label)).join(" · ")}</small></div>`:"";
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
  let ranksShown = 0, spellsShown = 0;
  host.innerHTML = window.HEALING_SPELLS.map((spell,index) => {
    if(spell.race&&spell.race!==characterRace)return "";
    if(!window.WARLOCK_DAMAGE_MODEL.isTalentSpellVisible(spell,talents))return "";
    const ui=spellUiState[index]??{open:index<3,sortKey:"",direction:""};
    const renew = spell.name === "Renew";
    const visibleRanks=spell.ranks.filter(rank=>spellListPrefs.scope==="all"||(rank[1]!=null&&rank[1]<=characterLevel));
    if (!visibleRanks.length) return "";
    spellsShown++;
    ranksShown += visibleRanks.length;
    const shield = spell.kind === "shield";
    const mixed = ["Holy Nova","Penance"].includes(spell.name);
    const kindLabel = shield ? "ABSORB" : mixed ? "HEAL + DAMAGE" : "HEAL";
    const rows = visibleRanks.map(rank => {
      const [rankNo,learned,baseMin,baseMax,mana,id] = rank;
      const m = spellMetrics(spell,rank);
      const rankLink = `https://www.wowhead.com/forever/spell=${encodeURIComponent(id)}`;
      const freeReason=m.innerFocusApplies?"Inner Focus":m.holyNovaFree?"Searing Light proc":m.freeFormActive?"Spirit of Redemption":"";
      const note = mana == null ? `<small>${esc(spell.manaNote || "Mana cost unavailable")}</small>` : freeReason?`${mana} → 0 (${freeReason})`:`${m.mana.toLocaleString()} mana${m.litanyRefund?` · ${m.netMana} net`:""}`;
      const range = fmtRange(m.healMin,m.healMax);
      const perTickRange = fmtRange(m.healPerEventMin,m.healPerEventMax);
      const group = ["Prayer of Healing","Holy Nova"].includes(spell.name) ? `${range} / target` : range;
      const learnedText = `<span>${learned == null ? "Lv —" : `Lv ${learned}`}</span><span class="acquisition-label">${rankAcquisition(spell,rank)}</span><span class="training-cost">${fmtTrainingCost(window.TRAINING_COSTS[id],spell,rank)}</span>`;
      const perTime = renew||spell.name==="Penance" ? fmt(m.healPerEvent) : m.perSecond == null ? "—" : `${fmt(m.perSecond)} / sec`;
      const perMana = m.perMana == null ? "—" : `${fmt(m.perMana,2)} / mana`;
      const effectiveCast = rank[7] ?? spell.cast;
      const shieldCooldown=shield?(talents.soulWarding?" · no cooldown":" · 4s cooldown"):"";
      const castText = spell.duration ? `${spell.instant ? "1.5s GCD" : `${m.cast}s cast`} · ${spell.duration}s effect` : spell.channel ? `${m.cast}s channel` : spell.instant ? `1.5s GCD${shieldCooldown}` : `${m.cast}s cast`;
      const incompleteGrowth = m.growthIncomplete ? `<span class="rank-extra warning">Learned-level base shown; higher-level growth is incomplete.</span>` : "";
      const tickLine = !renew && spell.periodicTicks && m.healMin != null ? `<span class="rank-extra">Healing per tick: ${fmtRange(m.healMin/spell.periodicTicks,m.healMax/spell.periodicTicks)}</span>` : "";
      const tooltipValue = m.baseMin == null ? "Heal amount not exposed" : renew||spell.name==="Penance" ? `Base total ${fmtRange(m.baseMin,m.baseMax)}` : `Base ${fmtRange(m.baseMin,m.baseMax)}`;
      const totalLine = renew||spell.name==="Penance" ? "" : ["Prayer of Healing","Holy Nova"].includes(spell.name) ? `<span class="rank-extra">Party mean total (${m.targets}): ${fmt(m.total)}</span>` : spell.name === "Prayer of Mending" ? `<span class="rank-extra">Mean total across ${m.targets} successful heal${m.targets===1?"":"s"}: ${fmt(m.total)}</span>` : spell.name === "Lightwell" ? `<span class="rank-extra">Mean total for ${m.targets} click${m.targets===1?"":"s"}: ${fmt(m.total)}</span>` : "";
      const damageLine=m.damageBaseMin==null?"":`<span class="rank-extra">${spell.name==="Penance"?`Base damage per bolt: ${fmtRange(m.damageBaseMin,m.damageBaseMax)} · total per cast ${fmtRange(m.damageBaseMin*(spell.bolts||1),m.damageBaseMax*(spell.bolts||1))}`:`Base damage per target: ${fmtRange(m.damageBaseMin,m.damageBaseMax)}${spell.name==="Holy Nova"?` · ${m.damageTargets} enemies`:""}`}</span>`;
      const critPct=m.critChance*100,damageCritPct=m.damageCritChance*100;
      const displayedExpected = renew ? m.expectedHeal/(spell.periodicTicks||1) : spell.name==="Penance" ? m.expectedHeal/3 : m.expectedPerSecond;
      const displayedMean = renew||spell.name==="Penance" ? m.healPerEvent : m.perSecond;
      const expectedText = displayedExpected == null ? "—" : Math.abs(displayedExpected-(displayedMean??Infinity))<0.05 ? "Same as mean" : renew||spell.name==="Penance" ? fmt(displayedExpected) : `${fmt(displayedExpected)} / sec`;
      const expectedPerManaText = m.expectedPerMana == null ? "—" : Math.abs(m.expectedPerMana-(m.perMana??Infinity))<0.005 ? "Same as mean" : `${fmt(m.expectedPerMana,2)} / mana`;
      return `<div class="rank-row ${shield ? "shield-row" : ""}" data-sort-rank="${rankNo}" data-sort-range="${m.heal??-1}" data-sort-cast="${m.cast}" data-sort-cost="${m.netMana??-1}" data-sort-throughput="${renew||spell.name==="Penance"?m.healPerEvent:m.perSecond??-1}" data-sort-efficiency="${m.perMana??-1}" data-sort-crit="${critPct}" data-sort-damagecrit="${damageCritPct}" data-sort-critheal="${m.critHeal??-1}" data-sort-expected="${displayedExpected??-1}" data-sort-hpm="${m.expectedPerMana??-1}" data-sort-damage="${m.expectedDamagePerSecond??-1}" data-sort-dpm="${m.expectedDamagePerMana??-1}" data-sort-critdamage="${m.critDamageMin??-1}" data-sort-aegis="${m.aegisExpected}" data-sort-holybinding="${m.holyBindingExpected}" data-sort-inspiration="${m.inspirationExpected}">
        <div class="rank-name"><a href="${rankLink}" target="_blank" rel="noreferrer" title="Wowhead Forever ${esc(spell.name)} Rank ${rankNo}" aria-label="Open Wowhead Forever ${esc(spell.name)} Rank ${rankNo}">R${rankNo} ↗</a><span>${learnedText}</span></div>
        <div class="rank-amount"><b>${group}</b><span>${kindLabel} · ${tooltipValue}</span>${totalLine}${renew||spell.name==="Penance"||spell.name==="Contingency Plan"?`<span class="rank-extra">Healing per tick: ${perTickRange}</span>`:tickLine}${damageLine}${spell.name==="Contingency Plan"?`<span class="rank-extra">Absorb on trigger: ${fmt(spell.shieldBase[rankNo-1])}</span>`:""}${incompleteGrowth}</div>
        <div class="rank-stat"><span>Cast / timing</span><b>${castText}</b></div>
        <div class="rank-stat"><span>Mana cost</span><b>${note}</b></div>
        <div class="rank-stat"><span>${shield ? "Absorb / cast time" : renew||spell.name==="Penance"?"Healing / tick":"Healing / cast time"}</span><b>${perTime}</b></div>
        <div class="rank-stat"><span>${shield ? "Absorb / mana" : "Healing / mana"}</span><b>${perMana}</b></div>
        <div class="rank-stat"><span>Heal crit chance</span><b>${shield ? "—" : `${fmt(critPct,1)}%`}</b></div>
        <div class="rank-stat"><span>Damage crit chance</span><b>${m.damageBaseMin==null?"—":`${fmt(damageCritPct,1)}%`}</b></div>
        <div class="rank-stat"><span>Crit heal / event</span><b>${m.critHealMin==null?"—":fmtRange(m.critHealMin,m.critHealMax)}</b></div>
        <div class="rank-stat"><span>${renew||spell.name==="Penance"?"Expected / tick":"Expected / sec"}</span><b>${expectedText}</b></div>
        <div class="rank-stat"><span>Holy Binding</span><b>${m.holyBindingExpected?`${fmt(m.holyBindingExpected)} extra / cast`:"—"}</b></div>
        <div class="rank-stat"><span>Expected / mana</span><b>${expectedPerManaText}</b></div>
        <div class="rank-stat"><span>Expected damage / sec</span><b>${m.expectedDamagePerSecond==null?"—":`${fmt(m.expectedDamagePerSecond)} / sec`}</b></div>
        <div class="rank-stat"><span>Expected damage / mana</span><b>${m.expectedDamagePerMana==null?"—":`${fmt(m.expectedDamagePerMana,2)} / mana`}</b></div>
        <div class="rank-stat"><span>Crit damage / hit</span><b>${m.critDamageMin==null?"—":fmtRange(m.critDamageMin,m.critDamageMax)}</b></div>
        <div class="rank-stat"><span>Expected Aegis</span><b>${m.aegisExpected?`${fmt(m.aegisExpected)} / cast`:"—"}</b></div>
        <div class="rank-stat"><span>Inspiration</span><b>${m.inspirationArmor?`+${fmt(m.inspirationArmor*100,0)}% armor · ${fmt(m.inspirationProcChance*100,1)}% proc`:`—`}</b></div>
      </div>`;
    }).join("");
    const firstKnown=spell.ranks.map(r=>r[1]).filter(v=>v!=null).sort((a,b)=>a-b)[0]??999;
    const category=spell.group.split("·").slice(1).join(" ").trim()||spell.group.split("·")[0].trim();
    return `<details class="spell-card" data-spell-index="${index}" data-card-learned="${firstKnown}" data-card-name="${esc(spell.name.toLowerCase())}" data-card-category="${esc(category.toLowerCase())}" data-card-ranks="${spell.ranks.length}" ${ui.open ? "open" : ""}>
      <summary><span class="spell-glyph ${shield ? "shield-glyph" : ""}">${shield ? "◈" : "✦"}</span><span class="spell-title"><b>${esc(spell.name)}</b><small>${esc(spell.group)}</small></span><span class="spell-kind ${shield ? "shield-kind" : mixed ? "mixed-kind" : ""}">${kindLabel}</span><span class="rank-pill">${visibleRanks.length}${visibleRanks.length!==spell.ranks.length?` / ${spell.ranks.length}`:""} ${visibleRanks.length === 1 ? "rank" : "ranks"}</span><span class="chevron">⌄</span></summary>
      ${spell.description?`<div class="spell-description">${esc(spell.description)}</div>`:""}
      <div class="rank-table"><div class="rank-header" data-sort-key="${ui.sortKey}" data-sort-direction="${ui.direction}">${[["rank","Rank / level · acquisition"],["range","Healing range"],["cast","Cast"],["cost","Mana"],["throughput",renew||spell.name==="Penance"?"Mean / tick":"Mean / time"],["efficiency","Mean / mana"],["crit","Heal crit chance"],["damagecrit","Damage crit chance"],["critheal","Crit heal / event"],["expected",renew||spell.name==="Penance"?"Expected / tick":"Expected / sec"],["holybinding","Holy Binding"],["hpm","Expected / mana"],["damage","Damage / sec"],["dpm","Damage / mana"],["critdamage","Crit damage / hit"],["aegis","Aegis / cast"],["inspiration","Inspiration value"]].map(([key,label])=>`<button type="button" class="sort-header" data-sort="${key}" aria-label="Sort ${label}">${label} ${ui.sortKey===key?(ui.direction==="asc"?"↑":"↓"):"↕"}</button>`).join("")}</div>${rows}${renderTrainingSources(spell)}</div>
    </details>`;
  }).join("");
  sortSpellCards(host);
  host.querySelectorAll(".spell-card[data-spell-index]").forEach(card=>{
    const ui=spellUiState[card.dataset.spellIndex]??{};
    card.addEventListener("toggle",()=>{
      spellUiState[card.dataset.spellIndex]={...spellUiState[card.dataset.spellIndex],open:card.open};
      try { localStorage.setItem(SPELL_UI_STATE_KEY,JSON.stringify(spellUiState)); } catch {}
    });
    const header=card.querySelector(".rank-header");
    if(ui.sortKey&&ui.direction)sortSpellRows(card.querySelector(".rank-table"),ui.sortKey,ui.direction);
  });
  document.querySelector("#rankCount").textContent = `${ranksShown} ranks · ${spellsShown} spells${spellListPrefs.scope==="level"?` at level ${characterLevel}`:" · all levels"}`;
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
  renderDamageSpells();
}

const DAMAGE_PREFS_KEY="forever-priest-damage-prefs-v1";
let damagePrefs=(()=>{try{const p=JSON.parse(localStorage.getItem(DAMAGE_PREFS_KEY)||"{}");return {sort:["learned","name","category","rank-count"].includes(p.sort)?p.sort:"learned",scope:p.scope==="all"?"all":"level",class:p.class==="warlock"?"warlock":"priest"};}catch{return {sort:"learned",scope:"level",class:"priest"};}})();
function saveDamagePrefs(){try{localStorage.setItem(DAMAGE_PREFS_KEY,JSON.stringify(damagePrefs));}catch{}}
function damageMetrics(spell,rank){
  const shadow=spell.school==="Shadow",holy=spell.school==="Holy";
  const effect=rank.effects?.find(e=>e.spellPowerCoefficient!=null);
  const coefficient=effect?.spellPowerCoefficient||0;
  const manaBase=rank.mana??null;
  const contagionReduction=spell.name==="Devouring Plague"?[0,.25,.5][talents.devouringContagion]||0:0;
  const manaReductionStackingUnknown=spell.name==="Devouring Plague"&&contagionReduction>0&&talents.shadowform;
  const improvedHealingApplies=["Lesser Heal","Heal","Greater Heal","Penance","Prayer of Mending"].includes(spell.name);
  const mentalAgilityApplies=rank.castSeconds===0||["Smite","Holy Fire","Penance"].includes(spell.name);
  const manaReductionPercent=(improvedHealingApplies?talents.improvedHealing*5:0)+(mentalAgilityApplies?[0,3,7,10][talents.mentalAgility]:0);
  const innerFocusReady=talents.innerFocus>0&&talents.innerFocusReady;
  const costReduction=Math.min(1,manaReductionPercent/100+contagionReduction+(shadow&&talents.shadowform ? .5 : 0));
  const freeHolyNova=spell.name==="Holy Nova"&&talents.searingLight>0&&talents.holyNovaProcReady;
  const mana=manaBase==null||manaReductionStackingUnknown?null:innerFocusReady||freeHolyNova?0:Math.floor(manaBase*(1-costReduction));
  const baseCrit=Math.max(0,Math.min(100,number(talents.baseCrit)));
  const directCanCrit=["direct","direct-dot","direct-backlash","humanoid","aoe","channel-bolts"].includes(spell.kind);
  const periodicCanCrit=Boolean(spell.periodicCanCrit);
  const canCrit=directCanCrit||periodicCanCrit;
  const holyCrit=holy?talents.holySpecialization:0;
  const earlyDemise=spell.name==="Shadow Word: Death"&&talents.targetUnder20?talents.earlyDemise*15:0;
  const directCritChance=Math.min(100,baseCrit+holyCrit+earlyDemise+(innerFocusReady&&directCanCrit?25:0))/100;
  const periodicCritChance=Math.min(100,baseCrit+holyCrit)/100;
  const critChance=directCanCrit?directCritChance:periodicCanCrit?periodicCritChance:0;
  const critMultiplier=shadow&&talents.shadowform?2:1.5;
  const dotEffect=rank.effects?.find(e=>e.aura==="A_PERIODIC_DAMAGE"||e.aura==="A_PERIODIC_LEECH");
  const directEffect=rank.effects?.find(e=>e.type==="E_SCHOOL_DAMAGE");
  let ticks=0;
  if(rank.duration&&dotEffect?.periodMs)ticks=Math.round(rank.duration*1000/dotEffect.periodMs);
  const modelLevel=Math.max(number(characterLevel),number(rank.level));
  const effectBaseRange=effect=>{
    if(!effect||effect.basePoints==null)return null;
    const cappedLevel=effect.maxLevel==null?modelLevel:Math.min(modelLevel,effect.maxLevel);
    const growthLevels=Math.max(0,cappedLevel-(effect.baseLevel??cappedLevel));
    const mean=effect.basePoints+(effect.perLevel??0)*growthLevels;
    const spread=effect.variance??0;
    return {min:Math.round(mean*(1-spread/2)),max:Math.round(mean*(1+spread/2))};
  };
  const directBase=effectBaseRange(directEffect)??(rank.damageMin==null?null:{min:rank.damageMin,max:rank.damageMax});
  const tickBase=effectBaseRange(dotEffect)??(rank.dotTotalMin==null?null:{min:rank.dotTotalMin/Math.max(1,ticks),max:rank.dotTotalMax/Math.max(1,ticks)});
  const drainBase=effectBaseRange(rank.effects?.find(e=>e.type==="E_POWER_BURN"))??(rank.drainMin==null?null:{min:rank.drainMin,max:rank.drainMax});
  let baseTotalMin=tickBase==null?null:tickBase.min*ticks,baseTotalMax=tickBase==null?null:tickBase.max*ticks;
  if(spell.name==="Shadow Word: Pain"&&baseTotalMin!=null){ticks+=talents.improvedShadowWordPain;baseTotalMin=tickBase.min*ticks;baseTotalMax=tickBase.max*ticks;}
  let directMin=directBase?.min??null,directMax=directBase?.max??null;
  let perTickMin=null,perTickMax=null,totalMin=null,totalMax=null;
  if(spell.kind==="mana-burn"){
    directMin=(drainBase?.min||0)*rank.damagePerMana;directMax=(drainBase?.max||0)*rank.damagePerMana;
  }
  const shadowMultiplier=shadow?1+talents.darkness*.02+(talents.shadowWeaving?talents.shadowWeavingStacks*.02:0)+(talents.shadowform ? .10 : 0):1;
  const holyMultiplier=holy?1+([0,.02,.05][talents.searingLight]||0):1;
  const instantMultiplier=(rank.castSeconds===0||["Mind Flay","Starshards","Penance","Shadow Word: Death"].includes(spell.name))&&!['reactive','mana-burn'].includes(spell.kind)?1+talents.twinDisciplines/100:1;
  const powerInfusionMultiplier=talents.powerInfusionTalent&&talents.powerInfusionActive?1.2:1;
  const powerInLightApplies=talents.powerInLightTarget&&["Penance","Smite"].includes(spell.name);
  const powerInLightMultiplier=powerInLightApplies?1+talents.powerInLight*.02:1;
  const talentMultiplier=shadowMultiplier*holyMultiplier*instantMultiplier*powerInLightMultiplier*powerInfusionMultiplier;
  if(spell.kind==="mana-burn"){directMin*=shadowMultiplier;directMax*=shadowMultiplier;}
  const guidanceRates=[0,.01,.03,.05,.06,.08];
  const spiritBase=sumInfo("spirit").value+number(talents.totalSpirit);
  const spiritTotal=spiritBase*(talents.darkInspirationActive?1+talents.darkInspiration*.03:1);
  const healingPower=sumInfo("healing").value+number(talents.bonusHealingAdjustment);
  const spellPower=sumInfo("damage").value+number(talents.bonusSpellDamageAdjustment)+healingPower/3+spiritTotal*guidanceRates[talents.spiritualGuidance];
  const rankDelta=Math.max(0,number(characterLevel)-number(rank.level));
  const downrankRetention=Math.max(.05,1-Math.max(0,rankDelta-17)*.05);
  const powerPerCoefficient=spellPower*downrankRetention;
  const hitCount=spell.kind==="channel-bolts"?(rank.hits||3):1;
  if(spell.kind==="direct-dot"){
    const directCoef=directEffect?.spellPowerCoefficient||0;
    const dotCoef=dotEffect?.spellPowerCoefficient||0;
    const directMultiplier=holyMultiplier*instantMultiplier*powerInfusionMultiplier;
    directMin=directBase==null?null:(directBase.min+powerPerCoefficient*directCoef)*directMultiplier;
    directMax=directBase==null?null:(directBase.max+powerPerCoefficient*directCoef)*directMultiplier;
    perTickMin=baseTotalMin==null?null:baseTotalMin/ticks+powerPerCoefficient*dotCoef;
    perTickMax=baseTotalMax==null?null:baseTotalMax/ticks+powerPerCoefficient*dotCoef;
    totalMin=baseTotalMin==null?null:(baseTotalMin+powerPerCoefficient*dotCoef*ticks)*talentMultiplier;
    totalMax=baseTotalMax==null?null:(baseTotalMax+powerPerCoefficient*dotCoef*ticks)*talentMultiplier;
    perTickMin=totalMin==null?null:totalMin/ticks;perTickMax=totalMax==null?null:totalMax/ticks;
  } else if(ticks>0&&baseTotalMin!=null){
    const perTickPower=powerPerCoefficient*(dotEffect?.spellPowerCoefficient||coefficient);
    const tickFactors=Array.from({length:ticks},(_,i)=>spell.name==="Mind Flay"?Math.pow(1+talents.improvedMindFlay*.1,i):1);
    const tickMeanFactor=tickFactors.reduce((sum,value)=>sum+value,0)/ticks;
    totalMin=(baseTotalMin+perTickPower*ticks)*tickMeanFactor*talentMultiplier;
    totalMax=(baseTotalMax+perTickPower*ticks)*tickMeanFactor*talentMultiplier;
    perTickMin=totalMin/ticks;perTickMax=totalMax/ticks;
  } else if(directMin!=null&&spell.kind!=="mana-burn"&&spell.kind!=="reactive"){
    directMin=(directMin+powerPerCoefficient*coefficient)*talentMultiplier;
    directMax=(directMax+powerPerCoefficient*coefficient)*talentMultiplier;
  }
  const directTotalMin=directMin==null?0:directMin*hitCount;
  const directTotalMax=directMax==null?0:directMax*hitCount;
  const fullTotalMin=directTotalMin+(totalMin||0),fullTotalMax=directTotalMax+(totalMax||0);
  const enemyTargets=spell.kind==="aoe"?Math.max(1,Math.min(10,number(document.querySelector("#enemyTargets").value)||1)):1;
  const directMean=(directTotalMin+directTotalMax)/2,periodicMean=totalMin==null?0:(totalMin+totalMax)/2;
  const expectedMean=(directMean*(directCanCrit?1+directCritChance*(critMultiplier-1):1)+periodicMean*(periodicCanCrit?1+periodicCritChance*(critMultiplier-1):1))*enemyTargets;
  const effectiveDuration=ticks&&dotEffect?.periodMs?ticks*dotEffect.periodMs/1000:rank.duration||0;
  const castBase=rank.castSeconds||1.5;
  const castAdjusted=spell.name==="Mana Burn"?Math.max(1.5,castBase-talents.improvedManaBurn*.5):(spell.name==="Smite"||spell.name==="Holy Fire")?Math.max(.5,castBase-talents.divineFury*.1):castBase;
  const cooldown=spell.name==="Mind Blast"?Math.max(0,rank.cooldown-talents.improvedMindBlast*.5):rank.cooldown||0;
  const cycle=spell.kind==="reactive"?null:Math.max(castAdjusted,cooldown,(["dot","direct-dot","channel-dot"].includes(spell.kind)?effectiveDuration:0));
  const expectedDps=cycle?expectedMean/cycle:null;
  const perMana=mana&&spell.kind!=="reactive"?expectedMean/mana:null;
  const directCritMin=directMin==null||!directCanCrit?null:directMin*critMultiplier,directCritMax=directMax==null||!directCanCrit?null:directMax*critMultiplier;
  const tickCritMin=perTickMin==null||!periodicCanCrit?null:perTickMin*critMultiplier,tickCritMax=perTickMax==null||!periodicCanCrit?null:perTickMax*critMultiplier;
  return {coefficient,ticks,directMin,directMax,directBaseMin:directBase?.min??null,directBaseMax:directBase?.max??null,drainBaseMin:drainBase?.min??null,drainBaseMax:drainBase?.max??null,baseTotalMin,baseTotalMax,tickBaseMin:tickBase?.min??null,tickBaseMax:tickBase?.max??null,perTickMin,perTickMax,totalMin,totalMax,hitCount,fullTotalMin,fullTotalMax,expectedMean,expectedDps,perMana,mana,manaReductionStackingUnknown,critChance,directCritChance,periodicCritChance,critMultiplier,directCritMin,directCritMax,tickCritMin,tickCritMax,cycle,cooldown,castAdjusted,enemyTargets,spellPower,talentMultiplier,downrankRetention,improvedHealingApplies,mentalAgilityApplies,hasDamageEffect:Boolean(directEffect||dotEffect||drainBase)};
}
function warlockTooltipBase(spell, rank, modelLevel){
  return window.WARLOCK_DAMAGE_MODEL.tooltipBase(spell, rank, modelLevel);
}
function warlockDamageMetrics(spell, rank){
  return window.WARLOCK_DAMAGE_MODEL.metrics(spell, rank, {
    characterLevel,
    spellPower: sumInfo("damage").value + number(talents.bonusSpellDamageAdjustment),
    talents,
    enemyTargets: number(document.querySelector("#enemyTargets").value),
  });
}
function renderWarlockPetAttacks(){
  const host=document.querySelector("#warlockPetAttackList");
  if(!host)return;
  host.classList.remove("hidden");
  const attacks=window.WARLOCK_PET_ATTACKS||[];
  const sections=attacks.map(spell=>{
    const ranks=spell.ranks.filter(rank=>damagePrefs.scope==="all"||rank.level<=characterLevel);
    if(!ranks.length)return "";
    const rows=ranks.map(rank=>{
      const result=window.WARLOCK_PET_MODEL.perCast(spell,rank,{
        characterLevel,
        petSpellPower:talents.warlockPetSpellPower,
        talents
      });
      const timing=spell.castSeconds?`${fmt(spell.castSeconds,1)}s cast`:"1.5s GCD";
      return `<div class="pet-attack-row"><div><a href="https://www.wowhead.com/forever/spell=${encodeURIComponent(rank.id)}" target="_blank" rel="noreferrer">R${rank.rank} ↗</a><small>Level ${rank.level}</small></div><div><b>${fmtRange(result.min,result.max)} / cast</b><small>Base ${result.baseMin}–${result.baseMax} + ${fmt(result.coefficient,2)} × ${fmt(result.spellPower,1)} pet SP${result.damageMultiplier!==1?` · damage ×${fmt(result.damageMultiplier,3)}`:""}</small></div><div><b>${timing}${spell.cooldown?` · ${fmt(spell.cooldown,1)}s cooldown`:""}</b><small>${spell.range} range</small></div><div><b>${rank.mana} mana</b><small>Rank cost</small></div><div><a class="rank-reference" href="https://www.wowhead.com/forever/spell=${encodeURIComponent(rank.id)}" target="_blank" rel="noreferrer">link</a></div></div>`;
    }).join("");
    return `<details class="pet-attack-card" open><summary><b>${esc(spell.pet)} · ${esc(spell.name)}</b><small>${ranks.length}${ranks.length!==spell.ranks.length?` / ${spell.ranks.length}`:""} ranks</small><span class="chevron">⌄</span></summary><div class="pet-attack-table"><div class="pet-attack-header"><span>Rank / level</span><span>Damage per cast</span><span>Cast / cooldown</span><span>Mana</span><span>Reference</span></div>${rows}</div></details>`;
  }).join("");
  const activeTalents=[talents.warlockDemonicKnowledgeActive&&talents.warlockDemonicKnowledge?`Demonic Knowledge +${fmt(resultDemonicKnowledgeBonus(),1)} spell power`:"",talents.warlockUnholyPower?`Unholy Power ${talents.warlockUnholyPower}/5`:"",talents.warlockImprovedImp?"Improved Imp":"",talents.warlockImprovedSayaad?`Improved Sayaad ${talents.warlockImprovedSayaad}/3`:"",talents.warlockMasterDemonologist?`Master Demonologist ${talents.warlockMasterDemonologist}/5`:""].filter(Boolean).join(" · ");
  host.innerHTML=`<section class="pet-attack-section"><div class="section-head"><div><p class="eyebrow">RANK-BY-RANK · PER CAST</p><h3>Pet attacks</h3></div><span>${attacks.reduce((n,spell)=>n+spell.ranks.filter(rank=>damagePrefs.scope==="all"||rank.level<=characterLevel).length,0)} ranks</span></div><p class="helper">Ranges use client rank tooltips, then add entered pet spell power × the listed coefficient. Selected pet talents multiply their applicable attack. This is damage per cast, not pet DPS: pet attack uptime, critical hits, target resistance, and active-pet uptime are not inferred. Firebolt ranks 1–4 use the November 10, 19:12 UTC client-cache tooltip ranges; see the <a href="https://foreverchanges.pro/spellbook/warlock" target="_blank" rel="noreferrer">spellbook</a>.</p>${activeTalents?`<p class="pet-active-talents">Active inputs: ${esc(activeTalents)}.</p>`:""}${sections||`<p class="helper">No pet attack ranks are available at this level.</p>`}</section>`;
}
function resultDemonicKnowledgeBonus(){
  return characterLevel*[0,0.33,0.67,1][talents.warlockDemonicKnowledge]||0;
}
function renderWarlockDamageSpells(host){
  const list=window.WARLOCK_DAMAGE_SPELLS||[];
  const visible=list.map((spell,index)=>({spell,index})).filter(({spell})=>window.WARLOCK_DAMAGE_MODEL.isTalentSpellVisible(spell,talents)).map(x=>({...x,ranks:x.spell.ranks.filter(r=>damagePrefs.scope==="all"||r.level<=characterLevel)})).filter(x=>x.ranks.length);
  let shownRanks=0;
  host.innerHTML=visible.map(({spell,index,ranks})=>{
    shownRanks+=ranks.length;
    const lines=ranks.map(r=>{
      const m=warlockDamageMetrics(spell,r), baseText=m.directBaseMin!=null&&m.dotBaseMin!=null?`${fmtRange(m.directBaseMin,m.directBaseMax)} hit · ${fmtRange(m.dotBaseMin,m.dotBaseMax)} total DoT`:m.dotBaseMin!=null?`${fmtRange(m.dotBaseMin,m.dotBaseMax)} total · ${m.ticks?fmtRange(m.dotBaseMin/m.ticks,m.dotBaseMax/m.ticks):"—"} mean / tick`:fmtRange(m.directBaseMin,m.directBaseMax);
      const href=`https://www.wowhead.com/forever/spell=${encodeURIComponent(r.id)}`;
      const cast=spell.kind.includes("channel")||spell.kind==="aoe-dot"?`${fmt(r.duration,1)}s channel`:m.castTime?`${fmt(m.castTime,1)}s cast`:`1.5s GCD`;
      const effectText=[m.directCoef||m.tickCoef?`SP coefficients: ${m.directCoef?`hit ${fmt(m.directCoef,3)}`:"hit —"}${m.tickCoef?`, tick ${fmt(m.tickCoef,3)}`:""}`:"No client spell-power coefficient exposed",m.demonicKnowledgeBonus?`Demonic Knowledge: +${fmt(m.demonicKnowledgeBonus,1)} spell power`:"",m.talentDamageMultiplier!==1?`Selected damage talents ×${fmt(m.talentDamageMultiplier,3)}`:"",m.baneScenarioNote].filter(Boolean).join(" · ");
      const count=spell.kind.includes("dot")||spell.kind==="channel-dot"?` · ${m.ticks} ticks`:"";
      const eligible=m.eligible;
      return `<div class="damage-rank-row" data-rank="${r.rank}" data-base="${m.totalMin+m.totalMax}" data-damage="${m.expectedDps??-1}" data-dps="${m.expectedDps??-1}" data-mana="${m.mana??-1}" data-efficiency="${m.perMana??-1}" data-crit="${m.critChance*100}" data-cast="${m.cycle}"><div><a href="${href}" target="_blank" rel="noreferrer">R${r.rank} ↗</a><small>Lv ${r.level} · ${spell.talentSetting?"Talent required":"Acquisition unverified"}</small></div><div><b>${!m.damageKnown?"Client damage unavailable":baseText}</b><small>${esc(spell.name)} rank tooltip · <a class="rank-reference" href="${href}" target="_blank" rel="noreferrer">link</a></small></div><div><b>${!m.damageKnown?"—":`${fmtRange(m.totalMin,m.totalMax)} total${count}`}</b><small>${effectText}</small></div><div><b>${cast}${r.cooldown?` · ${fmtCooldown(r.cooldown)} cooldown`:""}${r.duration&&!spell.kind.includes("channel")?` · ${fmt(r.duration,1)}s effect`:""}</b><small>${m.immolateRequired?"Requires Immolate on target":""}</small></div><div><b>${m.mana==null?esc(r.manaCostText||"—"):`${m.mana} mana`}</b><small>${spell.name==="Inferno"?"Base mana share; mana efficiency unavailable":"Base rank cost"}</small></div><div><b>${eligible&&m.expectedDps!=null?`${fmt(m.expectedDps)} / sec`:"—"}</b><small>${spell.name==="Inferno"?"Long-run average over 1h cooldown; impact only":m.isAoe?`At ${m.targets} enemy target${m.targets===1?"":"s"}`:"One target · crit expectation"}</small></div><div><b>${eligible&&m.perMana!=null?`${fmt(m.perMana,2)} / mana`:"—"}</b><small>${eligible?"Expected damage / mana":"Requires Immolate first"}</small></div><div><b>${m.critChance?`${fmt(m.critChance*100,1)}%`:"—"}</b><small>${m.critChance?`Crit multiplier ${fmt(m.critMultiplier,1)}×`:"Crit not modeled for this effect"}</small></div></div>`;
    }).join("");
    return `<details class="damage-spell-card" data-card-name="${esc(spell.name.toLowerCase())}" data-card-school="${esc(spell.school.toLowerCase())}" data-card-level="${spell.ranks[0].level}" data-card-count="${spell.ranks.length}" ${index<3?"open":""}><summary><span class="spell-glyph damage-glyph">✦</span><span class="spell-title"><b>${esc(spell.name)}</b><small>${esc(spell.school)} · ${spell.kind.replaceAll("-"," ")}</small></span><span class="spell-kind mixed-kind">DAMAGE</span><span class="rank-pill">${ranks.length}${ranks.length!==spell.ranks.length?` / ${spell.ranks.length}`:""} ${ranks.length===1?"rank":"ranks"}</span><span class="chevron">⌄</span></summary><div class="spell-description">${esc(spell.description||"")}${spell.talentSetting?" Talent requirement is controlled under Planner settings.":""}</div><div class="damage-table"><div class="damage-rank-header">${[["rank","Rank / level"],["base","Base hit / DoT"],["damage","Damage / event and total"],["cast","Cast / cooldown"],["mana","Mana"],["dps","Expected / sec"],["efficiency","Expected / mana"],["crit","Crit chance"]].map(([key,label])=>`<button type="button" data-sort="${key}">${label} ↕</button>`).join("")}</div>${lines}</div></details>`;
  }).join("");
  const cards=[...host.querySelectorAll(".damage-spell-card")];
  cards.sort((a,b)=>damagePrefs.sort==="name"?a.dataset.cardName.localeCompare(b.dataset.cardName):damagePrefs.sort==="category"?a.dataset.cardSchool.localeCompare(b.dataset.cardSchool)||a.dataset.cardName.localeCompare(b.dataset.cardName):damagePrefs.sort==="rank-count"?Number(b.dataset.cardCount)-Number(a.dataset.cardCount)||a.dataset.cardName.localeCompare(b.dataset.cardName):Number(a.dataset.cardLevel)-Number(b.dataset.cardLevel)||a.dataset.cardName.localeCompare(b.dataset.cardName)).forEach(card=>host.append(card));
  host.querySelectorAll(".damage-rank-header [data-sort]").forEach(button=>button.addEventListener("click",()=>{const table=button.closest(".damage-table"),key=button.dataset.sort,rows=[...table.querySelectorAll(".damage-rank-row")],direction=button.dataset.direction==="asc"?"desc":"asc";table.querySelectorAll("button").forEach(b=>{delete b.dataset.direction;b.textContent=b.textContent.replace(/[↑↓↕]$/,"↕");});button.dataset.direction=direction;button.textContent=button.textContent.replace(/↕$/,"")+(direction==="asc"?"↑":"↓");rows.sort((a,b)=>{const av=Number(a.dataset[key]??-1),bv=Number(b.dataset[key]??-1);return(av-bv)*(direction==="asc"?1:-1);}).forEach(row=>table.append(row));}));
  renderWarlockPetAttacks();
  document.querySelector("#damageRankCount").textContent=`${shownRanks} ranks · ${visible.length} spells${damagePrefs.scope==="level"?` at level ${characterLevel}`:" · all levels"}`;
  document.querySelector("#damageStatSummary").textContent=`Warlock view: rank tooltip base, client level scaling, exposed spell-power coefficients, and selected damage talents. Talent-granted spells stay hidden until selected in Planner settings. Damage talents selected there apply only to their listed spell families; periodic crit damage uses Pandemic and Destruction crit damage uses Ruin. Conflagrate requires Immolate; Incinerate gains its tooltip’s 25% bonus when Immolate is selected. Bane of Havoc models the selected marked-target scenario: 15% transfers per other target hit; the selected scenario is shown beside the damage coefficient. Inferno reports its impact only; Infernal attacks are excluded. Periodic totals assume all ticks land. Rain of Fire uses its rank tooltip base; its spell-power coefficient is unavailable.`;
}
function renderDamageSpells(){
  const host=document.querySelector("#damageSpellList");if(!host||!window.DAMAGE_SPELLS)return;
  document.querySelector("#warlockPetAttackList")?.classList.add("hidden");
  if(damagePrefs.class==="warlock"){renderWarlockDamageSpells(host);return;}
  document.querySelector("#damageStatSummary").textContent="Priest damage is shown for one target unless the spell is an area effect. Instant spells use the global cooldown; channels use their full channel time. Reactive spells show damage per trigger. Choose race and talents under Planner settings to reveal restricted spells.";
  const visible=window.DAMAGE_SPELLS.map((spell,index)=>({spell,index})).filter(({spell})=>!spell.race||spell.race===characterRace).filter(({spell})=>window.WARLOCK_DAMAGE_MODEL.isTalentSpellVisible(spell,talents)).map(({spell,index})=>({spell,index,ranks:spell.ranks.filter(r=>damagePrefs.scope==="all"||r.level<=characterLevel)})).filter(({ranks})=>ranks.length);
  const shownRanks=visible.reduce((n,s)=>n+s.ranks.length,0);
  host.innerHTML=visible.map(({spell,index,ranks})=>{
    const lines=ranks.map(r=>{
      const m=damageMetrics(spell,r),id=r.id,learned="Lv "+r.level;
      const freeHolyNovaProc=spell.name==="Holy Nova"&&talents.searingLight>0&&talents.holyNovaProcReady;
      const href=`https://www.wowhead.com/forever/spell=${encodeURIComponent(id)}`;
      const damageBaseText=spell.kind==="reactive"?fmtRange(m.directMin,m.directMax):spell.kind==="direct-dot"?`${fmtRange(m.directMin,m.directMax)} hit · ${fmtRange(m.totalMin,m.totalMax)} total DoT`:m.ticks?`${fmtRange(m.perTickMin,m.perTickMax)} / tick · ${fmtRange(m.totalMin,m.totalMax)} total`:spell.kind==="channel-bolts"?`${fmtRange(m.directMin,m.directMax)} / bolt · ${fmtRange(m.fullTotalMin,m.fullTotalMax)} / cast`:fmtRange(m.directMin,m.directMax);
      const damageText=damageBaseText+(spell.name==="Shadow Word: Death"?" · 30% max-health backlash if target survives":"");
      const tooltipBaseText=spell.kind==="mana-burn"?`${fmtRange(r.drainMin,r.drainMax)} mana drained`:spell.kind==="direct-dot"?`${fmtRange(r.damageMin,r.damageMax)} hit · ${fmtRange(r.dotTotalMin,r.dotTotalMax)} total DoT`:r.dotTotalMin!=null?`${fmtRange(r.dotTotalMin,r.dotTotalMax)} total · ${m.ticks} ticks`:spell.kind==="channel-bolts"?`${fmtRange(r.damageMin,r.damageMax)} / bolt · ${r.hits||3} bolts`:fmtRange(r.damageMin,r.damageMax);
      const baseText=spell.kind==="mana-burn"?`${fmtRange(m.drainBaseMin,m.drainBaseMax)} mana drained`:spell.kind==="direct-dot"?`${fmtRange(m.directBaseMin,m.directBaseMax)} hit · ${fmtRange(m.baseTotalMin,m.baseTotalMax)} DoT total`:m.ticks?`${fmtRange(m.tickBaseMin,m.tickBaseMax)} / tick · ${fmtRange(m.baseTotalMin,m.baseTotalMax)} total`:spell.kind==="channel-bolts"?`${fmtRange(m.directBaseMin,m.directBaseMax)} / bolt · ${fmtRange(m.directBaseMin*m.hitCount,m.directBaseMax*m.hitCount)} / cast`:fmtRange(m.directBaseMin,m.directBaseMax);
      const baseSourceText=`${m.hasDamageEffect?`Client base at level ${Math.max(characterLevel,r.level)}`:"Rank tooltip only; no level effect"} · Tooltip snapshot: ${tooltipBaseText}`;
      const effectPeriod=r.effects?.find(e=>e.periodMs)?.periodMs;
      const effectDuration=m.ticks&&effectPeriod?fmt(m.ticks*effectPeriod/1000,1):null;
      const timing=spell.kind==="reactive"?"Reactive · per trigger":`${["channel-dot","channel-bolts"].includes(spell.kind)?`${fmt(m.castAdjusted,1)}s channel`:r.castSeconds===0?"1.5s GCD":`${fmt(m.castAdjusted,1)}s cast`}${m.cooldown?` · ${fmt(m.cooldown,1)}s cooldown`:""}${spell.kind==="direct-dot"&&r.duration?` · ${fmt(r.duration,1)}s DoT`:spell.kind==="dot"&&effectDuration?` · ${effectDuration}s DoT`:""}`;
      const dps=m.expectedDps==null?"—":`${fmt(m.expectedDps)} / sec`;
      const perMana=m.perMana==null?"—":`${fmt(m.perMana,2)} / mana`;
      const critValue=spell.kind==="direct-dot"?`${fmt(m.directCritChance*100,1)}% hit ${fmtRange(m.directCritMin,m.directCritMax)} · ${fmt(m.periodicCritChance*100,1)}% tick ${fmtRange(m.tickCritMin,m.tickCritMax)}`:m.ticks?`${fmt(m.periodicCritChance*100,1)}% · ${fmtRange(m.tickCritMin,m.tickCritMax)} / tick`:`${fmt(m.directCritChance*100,1)}% · ${fmtRange(m.directCritMin,m.directCritMax)}`;
      const crit=m.critChance?critValue:"—";
      const acquisition=spell.talentSetting?(r.rank===1?"Talent":"Talent required · trainer"):r.rank===1&&spell.race?`${spell.race} racial`:"Trainer · price unknown";
      const costModifiers=[];
      if(talents.innerFocusReady&&talents.innerFocus)costModifiers.push("Inner Focus: free cast");
      if(freeHolyNovaProc)costModifiers.push("Searing Light: free proc");
      if(spell.name==="Devouring Plague"&&talents.devouringContagion)costModifiers.push(`Devouring Contagion: ${[0,25,50][talents.devouringContagion]}% reduction`);
      if(m.manaReductionStackingUnknown)costModifiers.push("Devouring Contagion + Shadowform stacking unverified; mana and damage / mana withheld");
      if(m.improvedHealingApplies&&talents.improvedHealing)costModifiers.push(`Improved Healing: ${talents.improvedHealing*5}% reduction`);
      if(m.mentalAgilityApplies&&talents.mentalAgility)costModifiers.push(`Mental Agility: ${[0,3,7,10][talents.mentalAgility]}% reduction`);
      if(spell.school==="Shadow"&&talents.shadowform)costModifiers.push("Shadowform: 50% reduction");
      return `<div class="damage-rank-row" data-rank="${r.rank}" data-base="${m.fullTotalMin+m.fullTotalMax}" data-damage="${m.expectedMean}" data-dps="${m.expectedDps??-1}" data-mana="${m.mana??-1}" data-efficiency="${m.perMana??-1}" data-crit="${m.critChance*100}" data-cast="${m.cycle??-1}"><div><a href="${href}" target="_blank" rel="noreferrer">R${r.rank} ↗</a><small>${learned} · ${acquisition}</small></div><div><b>${baseText}</b><small>${baseSourceText}</small></div><div><b>${damageText}</b><small>${spell.kind==="reactive"?"Per trigger; no proc rate assumed":spell.kind==="direct-dot"?`${fmt(r.effects.find(e=>e.type==="E_SCHOOL_DAMAGE")?.spellPowerCoefficient||0,3)} direct · ${fmt(r.effects.find(e=>e.aura==="A_PERIODIC_DAMAGE")?.spellPowerCoefficient||0,3)} per tick`: `${fmt(m.coefficient,3)} spell-power coefficient${m.ticks?" per tick":""}`}</small></div><div><b>${timing}</b><small>${spell.kind==="humanoid"?"Humanoid targets only":spell.kind==="mana-burn"?"Assumes the target has enough Mana for the full drain":""}</small></div><div><b>${m.mana==null?"—":`${m.mana} mana`}</b><small>${costModifiers.join(" · ")||"Mana per cast"}</small></div><div><b>${dps}</b><small>${spell.kind==="aoe"?`At ${m.enemyTargets} target${m.enemyTargets===1?"":"s"}`:spell.kind==="reactive"?"No proc rate":`Includes crit expectation`}</small></div><div><b>${perMana}</b><small>Expected damage / mana</small></div><div><b>${crit}</b><small>${m.critChance?`Crit impact: ${fmt(m.critMultiplier*100,0)}`:"No crit modeled for this event"}</small></div></div>`;
    }).join("");
    const firstRank=spell.ranks[0];
    const cat=`${spell.school} · ${spell.kind.replaceAll("-"," ")}`;
      return `<details class="damage-spell-card" data-card-name="${esc(spell.name.toLowerCase())}" data-card-school="${esc(spell.school.toLowerCase())}" data-card-level="${firstRank.level}" data-card-count="${spell.ranks.length}" ${index<3?"open":""}><summary><span class="spell-glyph damage-glyph">✦</span><span class="spell-title"><b>${esc(spell.name)}</b><small>${cat}${spell.race?` · ${esc(spell.race)}`:""}</small></span><span class="spell-kind mixed-kind">DAMAGE</span><span class="rank-pill">${ranks.length}${ranks.length!==spell.ranks.length?` / ${spell.ranks.length}`:""} ${ranks.length===1?"rank":"ranks"}</span><span class="chevron">⌄</span></summary><div class="spell-description">${esc(spell.description||"")}${spell.talentSetting?` <b>Talent requirement:</b> ${esc(spell.talentTree)} ${spell.talentPoints} points.`:""}</div><div class="damage-table"><div class="damage-rank-header">${[["rank","Rank / level"],["base","Base hit / DoT"],["damage","Damage / event and total"],["cast","Cast / cooldown"],["mana","Mana"],["dps","Expected / sec"],["efficiency","Expected / mana"],["crit","Crit / hit or tick"]].map(([key,label])=>`<button type="button" data-sort="${key}">${label} ↕</button>`).join("")}</div>${lines}</div></details>`;
  }).join("");
  document.querySelector("#damageRankCount").textContent=`${shownRanks} ranks · ${visible.length} spells${damagePrefs.scope==="level"?` at level ${characterLevel}`:" · all levels"}`;
  const cardHost=host;const cards=[...cardHost.querySelectorAll(".damage-spell-card")];
  cards.sort((a,b)=>damagePrefs.sort==="name"?a.dataset.cardName.localeCompare(b.dataset.cardName):damagePrefs.sort==="category"?a.dataset.cardSchool.localeCompare(b.dataset.cardSchool)||a.dataset.cardName.localeCompare(b.dataset.cardName):damagePrefs.sort==="rank-count"?Number(b.dataset.cardCount)-Number(a.dataset.cardCount)||a.dataset.cardName.localeCompare(b.dataset.cardName):Number(a.dataset.cardLevel)-Number(b.dataset.cardLevel)||a.dataset.cardName.localeCompare(b.dataset.cardName)).forEach(card=>cardHost.append(card));
  host.querySelectorAll(".damage-rank-header [data-sort]").forEach(button=>button.addEventListener("click",()=>{const table=button.closest(".damage-table"),key=button.dataset.sort,rows=[...table.querySelectorAll(".damage-rank-row")],direction=button.dataset.direction==="asc"?"desc":"asc";table.querySelectorAll("button").forEach(b=>{delete b.dataset.direction;b.textContent=b.textContent.replace(/[↑↓↕]$/,"↕");});button.dataset.direction=direction;button.textContent=button.textContent.replace(/↕$/,"" )+(direction==="asc"?"↑":"↓");rows.sort((a,b)=>{const av=Number(a.dataset[key]??-1),bv=Number(b.dataset[key]??-1);return (av-bv)*(direction==="asc"?1:-1);}).forEach(row=>table.append(row));}));
}

function sortSpellCards(host) {
  const cards=[...host.querySelectorAll(".spell-card[data-spell-index]")];
  const key=spellListPrefs.sort;
  cards.sort((a,b)=>{
    let order=0;
    if(key==="name") order=a.dataset.cardName.localeCompare(b.dataset.cardName);
    else if(key==="category") order=a.dataset.cardCategory.localeCompare(b.dataset.cardCategory)||a.dataset.cardName.localeCompare(b.dataset.cardName);
    else if(key==="rank-count") order=Number(b.dataset.cardRanks)-Number(a.dataset.cardRanks)||a.dataset.cardName.localeCompare(b.dataset.cardName);
    else order=Number(a.dataset.cardLearned)-Number(b.dataset.cardLearned)||a.dataset.cardName.localeCompare(b.dataset.cardName);
    return order;
  }).forEach(card=>host.append(card));
}

document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active",t === tab));
  document.querySelector("#gearPanel").classList.toggle("hidden",tab.dataset.tab !== "gear");
  document.querySelector("#spellsPanel").classList.toggle("hidden",tab.dataset.tab !== "spells");
  document.querySelector("#damagePanel").classList.toggle("hidden",tab.dataset.tab !== "damage");
}));
document.querySelector("#characterLevel").value=String(characterLevel);
document.querySelector("#spellSort").value=spellListPrefs.sort;
document.querySelector("#spellLevelScope").value=spellListPrefs.scope;
document.querySelector("#spellSort").addEventListener("change",event=>{
  spellListPrefs.sort=event.currentTarget.value;
  saveSpellListPrefs();
  sortSpellCards(document.querySelector("#spellList"));
});
document.querySelector("#spellLevelScope").addEventListener("change",event=>{
  spellListPrefs.scope=event.currentTarget.value;
  saveSpellListPrefs();
  renderSpells();
});
damagePrefs.class=damagePrefs.class==="warlock"?"warlock":"priest";
document.querySelector("#damageClass").value=damagePrefs.class;
document.querySelector("#damageClass").addEventListener("change",event=>{damagePrefs.class=event.currentTarget.value;saveDamagePrefs();renderDamageSpells();});
document.querySelector("#damageSort").value=damagePrefs.sort;
document.querySelector("#damageLevelScope").value=damagePrefs.scope;
document.querySelector("#damageSort").addEventListener("change",event=>{damagePrefs.sort=event.currentTarget.value;saveDamagePrefs();renderDamageSpells();});
document.querySelector("#damageLevelScope").addEventListener("change",event=>{damagePrefs.scope=event.currentTarget.value;saveDamagePrefs();renderDamageSpells();});
document.querySelector("#characterLevel").addEventListener("input",event=>{
  const value=Number(event.currentTarget.value);
  if(Number.isInteger(value) && value >= 1 && value <= 60){
    characterLevel=value;
    try { localStorage.setItem(CHARACTER_LEVEL_KEY,String(value)); } catch {}
    renderSpells();
    renderDamageSpells();
  }
});
["#bonusHealing","#bonusSpellDamage","#manaReduction","#partyTargets"].forEach(selector => document.querySelector(selector).addEventListener("input",renderSpells));
document.querySelector("#enemyTargets").addEventListener("input",()=>{renderSpells();renderDamageSpells();});
document.querySelector("#characterRace").value=characterRace;
document.querySelector("#characterRace").addEventListener("change",event=>{characterRace=event.currentTarget.value;try{localStorage.setItem(CHARACTER_RACE_KEY,characterRace);}catch{}renderSpells();});
const talentLimits={twinDisciplines:5,improvedPws:3,improvedRenew:3,holyBinding:1,holySpecialization:5,divineFury:5,spiritualHealing:3,spiritualGuidance:5,renewedHope:5,divineAegis:3,inspiration:3,soulWarding:1,mentalAgility:3,litanyOfLight:2,innerFocus:1,searingLight:2,powerInLight:5,powerInfusionTalent:1,spiritOfRedemptionTalent:1,darkness:5,improvedMindFlay:2,improvedShadowWordPain:2,improvedMindBlast:5,improvedManaBurn:2,devouringContagion:2,shadowWeaving:5,shadowWeavingStacks:5,earlyDemise:2,darkInspiration:5,warlockImprovedCorruption:5,warlockShadowMastery:5,warlockMalevolence:5,warlockPandemic:3,warlockRuin:5,warlockAgonizingFlames:3,warlockFireAndBrimstone:3,warlockDemonicKnowledge:3,warlockUnholyPower:5,warlockImprovedSayaad:3,warlockMasterDemonologist:5};
document.querySelector("#manaReduction").addEventListener("change",saveTalents);
for(const [key] of Object.entries(talentLimits)) document.querySelector(`#${key}`).addEventListener("change",saveTalents);
for(const selector of ["#warlockTalentShadowburn","#warlockTalentConflagrate","#warlockTalentIncinerate","#warlockTalentSiphonLife","#warlockTalentWrack","#warlockTalentBaneOfHavoc","#warlockBaneOfHavocScenario","#warlockTargetImmolate","#warlockDemonicKnowledgeActive","#warlockImprovedImp","#warlockPetSpellPower","#baseCrit","#totalSpiritInput","#bonusHealingAdjustment","#bonusSpellDamageAdjustment","#weakenedSoulTarget","#differentPreviousHeal","#flashHealOtherTarget","#innerFocusReady","#holyNovaProcReady","#powerInLightTarget","#powerInfusionActive","#spiritOfRedemptionActive","#holyNovaTalent","#penanceTalent","#prayerOfMendingTalent","#mindFlayTalent","#shadowform","#darkInspirationActive","#targetUnder20"]) document.querySelector(selector).addEventListener("input",saveTalents);
for(const [key] of Object.entries(talentLimits)) document.querySelector(`#${key}`).value=String(talents[key]);
document.querySelector("#warlockBaneOfHavocScenario").value=String(talents.warlockBaneOfHavocScenario);
document.querySelector("#warlockBaneOfHavocScenario").disabled=!talents.warlockTalentBaneOfHavoc;
document.querySelector("#manaReduction").value=String(talents.improvedHealing*5);
document.querySelector("#baseCrit").value=String(talents.baseCrit);
document.querySelector("#totalSpiritInput").value=String(talents.totalSpirit);
document.querySelector("#bonusHealingAdjustment").value=String(talents.bonusHealingAdjustment);
document.querySelector("#bonusSpellDamageAdjustment").value=String(talents.bonusSpellDamageAdjustment);
document.querySelector("#warlockPetSpellPower").value=String(talents.warlockPetSpellPower);
document.querySelector("#weakenedSoulTarget").checked=talents.weakenedSoulTarget;
document.querySelector("#flashHealOtherTarget").checked=talents.flashHealOtherTarget;
document.querySelector("#innerFocusReady").checked=talents.innerFocusReady;
document.querySelector("#holyNovaProcReady").checked=talents.holyNovaProcReady;
document.querySelector("#powerInLightTarget").checked=talents.powerInLightTarget;
document.querySelector("#powerInfusionActive").checked=talents.powerInfusionActive;
document.querySelector("#spiritOfRedemptionActive").checked=talents.spiritOfRedemptionActive;
for(const key of ["warlockTalentShadowburn","warlockTalentConflagrate","warlockTalentIncinerate","warlockTalentSiphonLife","warlockTalentWrack","warlockTalentBaneOfHavoc","warlockTargetImmolate","warlockDemonicKnowledgeActive","warlockImprovedImp","holyNovaTalent","penanceTalent","prayerOfMendingTalent","mindFlayTalent","shadowform","darkInspirationActive","targetUnder20"]) document.querySelector(`#${key}`).checked=talents[key];
document.querySelector("#improvedMindFlay").value=String(talents.improvedMindFlay);
document.querySelector("#earlyDemise").value=String(talents.earlyDemise);
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
    damage:(Number(equip.spldmg)||0)+(Number(equip.splpwr)||0),
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
  const raceName=typeof character?.race==="string"?character.race:character?.race?.name;
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
    const values={healing:0,damage:0,intellect:0,spirit:0,mp5:0};
    const hasStats=Array.isArray(entry.stats);
    let hasHealingStat=false;
    let hasDamageStat=false;
    for(const stat of entry.stats || []){
      const kind=String(stat.type?.type || stat.type || "").toUpperCase(); const value=Number(stat.value || 0);
      if(kind==="SPELL_HEALING_DONE" || kind==="SPELL_POWER") {values.healing+=value;hasHealingStat=true;}
      if(kind==="SPELL_POWER" || kind==="SPELL_DAMAGE_DONE") {values.damage+=value;hasDamageStat=true;}
      if(kind==="INTELLECT") values.intellect+=value;
      if(kind==="SPIRIT") values.spirit+=value;
      if(kind==="MANA_REGENERATION" || kind==="MANA_PER_5_SEC") values.mp5+=value;
    }
    imported[slot]={name:String(entry.name || ""),id:String(entry.id || ""),source:"",armorType:type,healing:hasStats?values.healing:null,damage:hasStats?values.damage:null,intellect:hasStats?values.intellect:null,spirit:hasStats?values.spirit:null,mp5:hasStats?values.mp5:null,_needsWowheadHealingLookup:!hasHealingStat && Boolean(entry.id),_needsWowheadDamageLookup:!hasDamageStat && Boolean(entry.id)};
  }
  const importedTalents={twinDisciplines:0,improvedPws:0,improvedRenew:0,holyBinding:0,holyNovaTalent:false,penanceTalent:false,prayerOfMendingTalent:false,holySpecialization:0,divineFury:0,spiritualHealing:0,spiritualGuidance:0,renewedHope:0,divineAegis:0,inspiration:0,soulWarding:0,mentalAgility:0,litanyOfLight:0,improvedHealing:0,innerFocus:0,searingLight:0,powerInLight:0,powerInfusionTalent:0,spiritOfRedemptionTalent:0};
  for(const spec of character.specs || []) for(const talent of spec.talents || []) {
    const name=String(talent.name || "").toLowerCase();
    const talentMap={"twin disciplines":["twinDisciplines",5],"improved power word: shield":["improvedPws",3],"improved renew":["improvedRenew",3],"holy binding":["holyBinding",1],"holy nova":["holyNovaTalent",1],"penance":["penanceTalent",1],"prayer of mending":["prayerOfMendingTalent",1],"mind flay":["mindFlayTalent",1],"holy specialization":["holySpecialization",5],"divine fury":["divineFury",5],"spiritual healing":["spiritualHealing",3],"spiritual guidance":["spiritualGuidance",5],"renewed hope":["renewedHope",5],"divine aegis":["divineAegis",3],"inspiration":["inspiration",3],"soul warding":["soulWarding",1],"mental agility":["mentalAgility",3],"litany of light":["litanyOfLight",2],"improved healing":["improvedHealing",3],"inner focus":["innerFocus",1],"searing light":["searingLight",2],"power in light":["powerInLight",5],"power infusion":["powerInfusionTalent",1],"spirit of redemption":["spiritOfRedemptionTalent",1],"darkness":["darkness",5],"improved mind flay":["improvedMindFlay",2],"improved shadow word: pain":["improvedShadowWordPain",2],"improved mind blast":["improvedMindBlast",5],"shadowform":["shadowform",1],"shadow weaving":["shadowWeaving",5],"early demise":["earlyDemise",2],"dark inspiration":["darkInspiration",5]};
    if(talentMap[name]) { const [key,max]=talentMap[name]; importedTalents[key]=typeof importedTalents[key]==="boolean"?Number(talent.rank)>0:clampRank(talent.rank,max); }
  }
  const levelValue=typeof character.level==="object" ? (character.level.level ?? character.level.value) : character.level;
  const level=Number(levelValue);
  const race=["Human","Dwarf","Night Elf","Gnome","Troll","Undead"].find(value=>String(raceName||"").toLowerCase()===value.toLowerCase())||"";
  return {name:character.name,level:Number.isInteger(level) && level >= 1 && level <= 60 ? level : null,race,gear:imported,talents:importedTalents,talentsAvailable:Array.isArray(character.specs)};
}
function armoryUrlFromCharacterName(name) {
  const slug=String(name).normalize("NFKD").replace(/[\u0300-\u036f]/g,"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  if(!slug) throw new Error("Enter a character name to look up.");
  return `https://worldofwarcraft.blizzard.com/en-us/forever/us/armory/character/${encodeURIComponent(slug)}`;
}
async function fillArmorySpellStatsFromWowhead(imported) {
  const candidates=Object.entries(imported).filter(([,item])=>item._needsWowheadHealingLookup||item._needsWowheadDamageLookup);
  let filled=0,failed=0,next=0;
  const worker=async()=>{
    while(next<candidates.length){
      const index=next++, [slot,item]=candidates[index];
      try {
        const result=await fetchWowheadItem(item.id);
        let itemFilled=false;
        if(item._needsWowheadHealingLookup&&result.stats.healing>0){item.healing=number(item.healing)+result.stats.healing;itemFilled=true;}
        if(item._needsWowheadDamageLookup&&result.stats.damage>0){item.damage=number(item.damage)+result.stats.damage;itemFilled=true;}
        if(itemFilled)filled++;
        delete item._needsWowheadHealingLookup;
        delete item._needsWowheadDamageLookup;
      } catch {
        failed++;
        if(item.healing===0) item.healing=null;
        if(item.damage===0) item.damage=null;
        delete item._needsWowheadHealingLookup;
        delete item._needsWowheadDamageLookup;
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
    const result=parseArmory(html); status.textContent="Checking equipped items on Wowhead for healing and damage stats…";
    const enrichment=await fillArmorySpellStatsFromWowhead(result.gear);
    gear=result.gear; saveGear();
    if(result.level){
      characterLevel=result.level;
      document.querySelector("#characterLevel").value=String(characterLevel);
      try { localStorage.setItem(CHARACTER_LEVEL_KEY,String(characterLevel)); } catch {}
      renderSpells();
    }
    if(result.race){characterRace=result.race;document.querySelector("#characterRace").value=characterRace;try{localStorage.setItem(CHARACTER_RACE_KEY,characterRace);}catch{}renderSpells();}
    if(result.talentsAvailable){
      talents={...talents,...result.talents};
      for(const [key] of Object.entries(talentLimits)) document.querySelector(`#${key}`).value=String(talents[key]);
      for(const key of ["warlockTalentShadowburn","warlockTalentConflagrate","warlockTalentIncinerate","warlockTalentSiphonLife","warlockTalentWrack","warlockTalentBaneOfHavoc","warlockTargetImmolate","warlockDemonicKnowledgeActive","warlockImprovedImp","holyNovaTalent","penanceTalent","prayerOfMendingTalent","mindFlayTalent","shadowform","darkInspirationActive","targetUnder20"]) document.querySelector(`#${key}`).checked=talents[key];
      for(const key of ["improvedMindFlay","earlyDemise"]) document.querySelector(`#${key}`).value=String(talents[key]);
      document.querySelector("#warlockBaneOfHavocScenario").value=String(talents.warlockBaneOfHavocScenario);
document.querySelector("#warlockBaneOfHavocScenario").disabled=!talents.warlockTalentBaneOfHavoc;
document.querySelector("#manaReduction").value=String(talents.improvedHealing*5);
      document.querySelector("#powerInLightTarget").checked=talents.powerInLightTarget;
      localStorage.setItem(TALENT_STORE_KEY,JSON.stringify(talents));
      renderSpells();
    }
    status.textContent=`Imported ${Object.keys(gear).length} equipped items${result.level?` at level ${result.level}`:""}${result.talentsAvailable?" and current talent ranks":""} from ${result.name}.${enrichment.filled?` Filled item healing and damage stats from Wowhead on ${enrichment.filled} item${enrichment.filled===1?"":"s"}.`:""}${enrichment.failed?` ${enrichment.failed} item lookup${enrichment.failed===1?"":"s"} failed; those stats remain unknown.`:""}`;
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
