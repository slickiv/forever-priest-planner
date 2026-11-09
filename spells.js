/* Detailed client data: Forever build 1.60.1.70862, extracted 2026-11-08.
   Blizzard's 2026-11-06 live hotfix list has no Priest spell changes; this is not
   post-launch in-game verification. Rank rows are [rank, learned level, min, max, mana, spell ID, coefficient, cast].
   Acquisition levels were cross-checked by rank against The Forever Era's level list,
   updated 2026-11-08. Rank level data is cross-checked against The Forever Era spell list.
   Level-growth metadata is sourced from live-client spell data:
   https://bindonforever.com/spell/2050, /2052, /2053, /2054, /2061, /17, /592, /600.
   Downranking: https://foreverchanges.pro/downranking.
   Lesser Heal R1 exception measurement: https://www.curseforge.com/wow/addons/heal-rank-advisor.
   Growth caps are the last level at which that rank's base continues to rise; LH R3's
   cap at 15 is supported by its level-15 tooltip and Annadra's later tooltip readings.
   LH R1's coefficient exception is fit to the L21/L22 observations and the addon report
   of ~24% retained at L30; this is a measured exception, not the generic rank formula.
   Other coefficient checks: Wowhead Forever records show Prayer of Healing 0.286,
   Holy Nova 0.107, Prayer of Mending 0.429, and PW:S 0.1.
   Penance has three direct bolt impacts per cast; rank-2 and rank-4 healing values
   include the Nov 2 development-note tuning. Per-level Penance values are client-derived
   and capped at the next-rank level. Holy Nova damage growth metadata is rank-specific;
   damage rank effects are visible separately from the combined heal spell tooltip.
   Direct-heal ranges are calculated from client BasePoints, PPL, Variance, BaseLevel,
   and MaxLevel. Each endpoint is rounded to nearest integer after level growth.
   https://github.com/wowsims/forever/blob/ae9b8c23a94aafd6f42876030d8ba07ff230e960/sim/core/spelldata/spells_auto_gen.go
   Racial direct heals use 0.429. */
window.HEALING_SPELLS = [
  { name:"Lesser Heal", group:"Holy", acquisitionConflictRanks:[2,3], acquisitionSources:["https://urgametips.com/wow-forever/priest-guides/spells/","https://warcraftforever.games/classes/priest/spells"], kind:"heal", cast:1.5, coefficient:0.429, wowhead:2050,
    levelGrowth:{2050:{downrankOffset:0.15}}, ranks:[
    [1,1,46,56,30,2050,0.429,1.5],[2,4,86,102,45,2052,0.571,2],[3,10,151,175,75,2053,0.714,2.5]
  ], description:"A 40-yard direct heal. Higher ranks have longer cast times and larger base healing."},
  { name:"Renew", group:"Holy", kind:"heal", cast:1.5, instant:true, duration:15, periodicTicks:5, coefficient:1, wowhead:139, ranks:[
    [1,8,45,45,30,139],[2,14,75,75,65,6074],[3,20,125,125,105,6075],[4,26,160,160,140,6076],[5,32,205,205,170,6077],
    [6,38,270,270,205,6078],[7,44,370,370,250,10927],[8,50,510,510,305,10928],[9,56,670,670,365,10929],[10,60,830,830,410,25315]
  ], description:"Applies a 15-second heal over time in five 3-second ticks, starting when the aura is applied. In Forever, each tick can critically heal."},
  { name:"Desperate Prayer", group:"Holy · racial · Dwarf", race:"Dwarf", acquisition:"racial", kind:"heal", cast:1.5, instant:true, coefficient:0.429, wowhead:13908, ranks:[
    [1,10,131,167,0,13908],[2,18,247,305,0,19236],[3,26,414,502,0,19238],[4,34,540,650,0,19240],
    [5,42,781,931,0,19241],[6,50,1046,1240,0,19242],[7,58,1269,1497,0,19243]
  ], description:"Dwarf Priest racial. Instantly heals the caster; it is self-only and has a 10-minute cooldown."},
  { name:"Heal", group:"Holy", kind:"heal", cast:3, coefficient:0.857, wowhead:2054, ranks:[
    [1,16,250,290,155,2054],[2,22,350,400,205,2055],[3,28,490,556,255,6063],[4,34,611,691,305,6064]
  ], description:"A 40-yard, 3-second direct heal for one friendly target."},
  { name:"Flash Heal", group:"Holy", kind:"heal", cast:1.5, coefficient:0.429, wowhead:2061,
    levelGrowth:{2061:{perLevel:2,cap:25}}, ranks:[
    [1,20,174,214,125,2061],[2,26,225,273,155,9472],[3,32,283,341,185,9473],[4,38,349,417,215,9474],
    [5,44,463,551,265,10915],[6,50,589,699,315,10916],[7,56,757,893,380,10917]
  ], description:"A fast 40-yard direct heal for one friendly target."},
  { name:"Holy Nova", group:"Holy · group · mixed", talentSetting:"holyNovaTalent", kind:"group", school:"holy", cast:1.5, instant:true, coefficient:0.107, damageCoefficient:0.107, healingEffectIds:{15237:23455,15430:23458,15431:23459,27799:27803,27800:27804,27801:27805}, damageGrowth:{15237:{min:25.2,max:28.8,perLevel:0.2,cap:27},15430:{min:45.36,max:52.64,perLevel:0.4,cap:35},15431:{min:69.6,max:80.4,perLevel:0.6,cap:43},27799:{min:98.8,max:113.2,perLevel:0.8,cap:51},27800:{min:132.5,max:153.5,perLevel:1,cap:59},27801:{min:174,max:200,perLevel:1.2,cap:60}}, wowhead:15237, talentRank:1, talentPoints:11, talentTree:"Holy", ranks:[
    [1,20,47,55,185,15237],[2,28,77,87,290,15430],[3,36,108,124,400,15431],[4,44,147,171,520,27799],[5,52,221,255,635,27800],[6,60,288,334,750,27801]
  ], description:"Requires the Holy Nova talent. An instant explosion around the caster that damages nearby enemies and heals nearby party members; it causes no threat."},
  { name:"Prayer of Healing", group:"Holy · group", kind:"group", cast:3, coefficient:0.286, wowhead:596, ranks:[
    [1,30,172,184,410,596],[2,40,257,273,560,996],[3,50,390,412,770,10960],[4,60,567,599,1030,10961],[5,60,631,667,1070,25316]
  ], description:"A 40-yard prayer that heals the selected friendly target and their party members within 40 yards of that target."},
  { name:"Greater Heal", group:"Holy", kind:"heal", cast:3, coefficient:0.857, wowhead:2060, ranks:[
    [1,40,794,894,370,2060],[2,46,1036,1162,455,10963],[3,52,1324,1482,545,10964],[4,58,1685,1879,655,10965],[5,60,1853,2067,710,25314]
  ], description:"A slow 40-yard direct heal for one friendly target."},
  { name:"Lightwell", group:"Holy · setup / charges", acquisition:"unknown", kind:"heal", cast:1.5, duration:10, periodicTicks:5, coefficient:0, wowhead:724, ranks:[
    [1,40,800,800,225,724],[2,50,1165,1165,295,27870],[3,60,1600,1600,365,27871]
  ], description:"Each click heals over 10 seconds. Lightwell has up to five charges; totals use the selected number of successful clicks."},
  { name:"Prayer of Mending", group:"Holy · reactive / jumps", talentSetting:"prayerOfMendingTalent", kind:"group", cast:1.5, instant:true, coefficient:0.429, wowhead:401859, talentRank:1, talentPoints:31, talentTree:"Holy", ranks:[
    [1,40,172,172,210,401859],[2,50,298,298,305,1240826],[3,60,413,413,390,1240827]
  ], description:"Places a 30-second effect on one target. The next damage taken or non-periodic heal triggers its heal, then it jumps to a nearby party or raid member up to five times. Only one target per caster can carry it."},
  { name:"Divine Grace", group:"Holy · racial · Human", race:"Human", acquisition:"racial", kind:"heal", cast:1.5, instant:true, coefficient:0.429, wowhead:1277370, ranks:[
    [1,10,131,167,0,1277370],[2,18,247,305,0,1277371],[3,26,414,502,0,1277372],[4,34,540,650,0,1277374],
    [5,42,781,931,0,1277376],[6,50,1046,1240,0,1277377],[7,58,1269,1497,0,1277378]
  ], description:"Human Priest racial. Instantly heals a friendly target below 50% health and removes Weakened Soul; cannot be cast on self. It has a 10-minute cooldown."},
  { name:"Penance", group:"Discipline · mixed channel", talentSetting:"penanceTalent", kind:"heal", school:"holy", cast:2, instant:true, channel:true, bolts:3, periodicTicks:3, coefficient:0.19, damageCoefficient:0.19, damageGrowth:{402174:{min:42,max:42,perLevel:0.33,cap:39},1240720:{min:50,max:50,perLevel:0.33,cap:49},1240721:{min:68,max:68,perLevel:0.44,cap:59},1316995:{min:92,max:92,perLevel:0,cap:60}}, wowhead:402174, talentRank:1, talentPoints:21, talentTree:"Discipline",
    levelGrowth:{402289:{perLevel:0.87,cap:39},1240723:{perLevel:0.98,cap:49},1240724:{perLevel:1.27,cap:59}}, ranks:[
    [1,30,126,126,150,402174,0.19,2,402289],[2,40,200,200,220,1240720,0.19,2,1240723],
    [3,50,268,268,270,1240721,0.19,2,1240724],[4,60,425,425,385,1316995,0.19,2,1316991]
  ], description:"Choose an ally to heal or an enemy to damage. Three holy bolts hit instantly and once per second for 2 seconds; the spell has a 12-second cooldown."},
  { name:"Contingency Plan", group:"Discipline · racial · Gnome", race:"Gnome", acquisition:"racial", kind:"heal", cast:1.5, instant:true, duration:15, periodicTicks:5, coefficient:1, canCrit:true, wowhead:1277462, ranks:[
    [1,20,125,125,0,1277462],[2,30,200,200,0,1277634],[3,40,280,280,0,1277638],[4,50,510,510,0,1277639],[5,60,670,670,0,1277640]
  ], shieldBase:[155,290,467,596,926], description:"Gnome-only racial ward. If an incoming hit drops the target below 35% Health within 30 seconds, it grants the listed absorb and applies five healing ticks over 15 seconds. One ward per target; 10-minute cooldown."},
  { name:"Power Word: Shield", group:"Discipline · absorb", kind:"shield", cast:1.5, instant:true, coefficient:0.1, wowhead:17, ranks:[
    [1,6,44,44,45,17],[2,12,86,86,80,592],[3,18,154,154,130,600],[4,24,226,226,175,3747],[5,30,291,291,210,6065],
    [6,36,368,368,250,6066],[7,42,470,470,300,10898],[8,48,591,591,355,10899],[9,54,749,749,425,10900],[10,60,928,928,500,10901]
  ], description:"Shields a friendly target for 30 seconds. While the shield holds, damage does not interrupt spellcasting; after it is applied, the target cannot be shielded again for 15 seconds."}
];

/* Exact base healing effect records from the client spell table above.
   Shape: [base points, points per level, variance, base level, max level].
   Holy Nova uses the separate heal-effect ID; other keys are rank spell IDs. */
window.HEALING_RANGE_EFFECTS = {
  13908:[149,2.4,.2368421108,10,16],19236:[276,3.4,.2108843476,18,24],19238:[458,4.5,.1939393878,26,32],19240:[595,5.3,.1851851791,34,40],19241:[856,6.4,.1750546992,42,48],19242:[1143,7.4,.1695760638,50,56],19243:[1383,8.2,.1649341583,58,64],
  1277370:[149,2.4,.2368421108,10,16],1277371:[276,3.4,.2108840048,18,24],1277372:[458,4.5,.1939393878,26,32],1277374:[595,5.3,.1851850003,34,40],1277376:[856,6.4,.1750549972,42,48],1277377:[1143,7.4,.1695760041,50,56],1277378:[1383,8.2,.1649339944,58,64],
  2050:[51,.3,.1960784346,1,3],2052:[94,.7,.1794871837,4,9],2053:[163,1.2,.1506849378,10,15],
  2054:[270,2,.1446540952,16,21],2055:[375,2.9,.1347826123,22,27],6063:[523,4,.1258278191,28,33],6064:[651,4.5,.1213720292,34,39],
  2061:[194,1.9,.204651162,20,25],9472:[249,2.2,.1958041936,26,31],9473:[312,2.5,.1833333373,32,37],9474:[383,2.8,.1776765436,38,43],10915:[507,3.3,.1728395075,44,49],10916:[644,3.7,.1704545468,50,55],10917:[825,4.2,.164971754,56,61],
  596:[178,.8,.0643086806,30,39],996:[265,1,.0611353703,40,49],10960:[401,1.3,.0562130176,50,59],10961:[583,1.5,.0538860112,60,69],25316:[649,1.6,.0542056076,60,69],
  2060:[844,5.1,.1192468628,40,45],10963:[1099,5.8,.1148482263,46,51],10964:[1403,6.6,.1129349992,52,57],10965:[1782,7.5,.1093585715,58,63],25314:[1960,8.1,.1096153929,60,65],
  17:[44,.8,0,6,11],592:[86,1.2,0,12,17],600:[154,1.6,0,18,23],3747:[226,2,0,24,29],6065:[291,2.3,0,30,35],6066:[368,2.6,0,36,41],10898:[470,3,0,42,47],10899:[591,3.4,0,48,53],10900:[749,3.9,0,54,59],10901:[928,4.3,0,60,65],
  23455:[51,.4,.1428571492,20,26],23458:[82,.5,.1304347813,28,34],23459:[116,.6,.1384615451,36,42],27803:[159,.7,.1494252831,44,50],27804:[238,.8,.1422924846,52,58],27805:[311,.9,.1472392678,60,66],
  402289:[126,.87,0,30,39],1240723:[200,.98,0,40,49],1240724:[268,1.27,0,50,59],1316991:[425,0,0,60,60]
};

/* LH R2 tooltip endpoints are rounded at the learned level before PPL is added.
   Keeping this observed per-rank sequence preserves its L21/L22 tooltip fixtures. */
window.HEALING_RANGE_OVERRIDES = {
  2052:{min:86,max:102,perLevel:.7,baseLevel:4,maxLevel:9}
};

/* Trainer prices (copper) are from the detailed per-rank table at
   https://urgametips.com/wow-forever/priest-guides/spells/ checked 2026-11-09.
   Prices are reference listings before discounts, not independently verified
   at every in-game trainer. A null value means no price was listed. */
window.TRAINING_COSTS = {
  2050:{type:"free",source:"UrGameTips",url:"https://urgametips.com/wow-forever/priest-guides/spells/",note:"Starter rank; no trainer fee listed"},
  2052:100,
  2053:300,
  139:200,
  6074:1200,
  6075:3000,
  6076:6000,
  6077:11000,
  6078:16000,
  10927:24000,
  10928:30000,
  10929:42000,
  25315:{type:"manual",name:"Codex of Renew X",requirement:"Requires level 60",source:"UrGameTips",url:"https://urgametips.com/wow-forever/priest-guides/spells/"},
  13908:{type:"free",acquisition:"class quest",source:"UrGameTips",url:"https://urgametips.com/wow-forever/priest-guides/spells/"},19236:100,19238:300,19240:600,19241:1100,19242:1500,19243:2200,
  2054:1600,2055:4000,6063:8000,6064:12000,
  2061:3000,9472:6000,9473:11000,9474:16000,10915:24000,10916:30000,10917:42000,
  15237:null,15430:400,15431:700,27799:1200,27800:1900,27801:2300,
  724:null,27870:null,27871:null,
  596:10000,996:18000,10960:30000,10961:46000,25316:{type:"manual",name:"Codex of Prayer of Healing V",requirement:"Requires level 60",source:"UrGameTips",url:"https://urgametips.com/wow-forever/priest-guides/spells/"},
  2060:18000,10963:26000,10964:38000,10965:44000,25314:{type:"manual",name:"Codex of Greater Heal V",requirement:"Requires level 60",source:"UrGameTips",url:"https://urgametips.com/wow-forever/priest-guides/spells/"},
  401859:null,1240826:30000,1240827:46000,
  1277370:{type:"free",acquisition:"class quest",source:"UrGameTips",url:"https://urgametips.com/wow-forever/priest-guides/spells/"},1277371:100,1277372:300,1277374:600,1277376:1100,1277377:1500,1277378:2200,
  1277462:{type:"free",acquisition:"class quest",source:"UrGameTips",url:"https://urgametips.com/wow-forever/priest-guides/spells/"},1277634:157,1277638:526,1277639:947,1277640:1578,
  402174:null,1240720:16000,1240721:30000,1316995:46000,
  17:100,592:800,600:2000,3747:5000,6065:10000,6066:14000,10898:22000,10899:28000,10900:40000,10901:46000
};
