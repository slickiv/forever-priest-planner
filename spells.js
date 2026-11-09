/* Forever build 1.60.1.70862 values. Rank rows are [rank, learned level, min, max, mana, spell ID, coefficient, cast].
   Level-growth metadata is sourced from live-client spell data:
   https://bindonforever.com/spell/2050, /2052, /2053, /2054, /2061, /17, /592, /600.
   Downranking: https://foreverchanges.pro/downranking.
   Lesser Heal R1 exception measurement: https://www.curseforge.com/wow/addons/heal-rank-advisor.
   Growth caps are the last level at which that rank's base continues to rise; LH R3's
   cap at 15 is supported by its level-15 tooltip and Annadra's later tooltip readings.
   LH R1's coefficient exception is fit to the L21/L22 observations and the addon report
   of ~24% retained at L30; this is a measured exception, not the generic rank formula.
   Other coefficient checks: Wowhead Forever records show Prayer of Healing 0.286,
   Holy Nova 0.107, Prayer of Mending 0.429, Circle of Healing 0.214, and PW:S 0.1.
   Penance base/effect IDs are separate from its cast IDs. Each rank has three bolt heals;
   per-level Penance values are from client effect data and capped at the next-rank level.
   Heal R2 uses generated client midpoint 375, PPL 2.9, variance 0.1347826123, base level 22,
   and max level 27; endpoints are rounded to the nearest base-heal integer.
   https://github.com/wowsims/forever/blob/ae9b8c23a94aafd6f42876030d8ba07ff230e960/sim/core/spelldata/spells_auto_gen.go#L1614
   Racial direct heals use 0.429. */
window.HEALING_SPELLS = [
  { name:"Lesser Heal", group:"Holy", kind:"heal", cast:1.5, coefficient:0.429, wowhead:2050,
    levelGrowth:{2050:{perLevel:0.3,cap:3,downrankOffset:0.15},2052:{perLevel:0.7,cap:9},2053:{perLevel:1.2,cap:15}}, ranks:[
    [1,1,46,56,30,2050,0.429,1.5],[2,4,86,102,45,2052,0.571,2],[3,10,151,175,75,2053,0.714,2.5]
  ]},
  { name:"Renew", group:"Holy", kind:"heal", cast:1.5, instant:true, duration:15, periodicTicks:5, coefficient:1, wowhead:139, ranks:[
    [1,8,45,45,30,139],[2,14,75,75,65,6074],[3,20,125,125,105,6075],[4,26,160,160,140,6076],[5,32,205,205,170,6077],
    [6,38,270,270,205,6078],[7,44,370,370,250,10927],[8,50,510,510,305,10928],[9,56,670,670,365,10929],[10,60,830,830,410,25315]
  ]},
  { name:"Desperate Prayer", group:"Holy · racial", kind:"heal", cast:1.5, instant:true, coefficient:0.429, wowhead:13908, ranks:[
    [1,10,131,167,0,13908],[2,18,247,305,0,19236],[3,26,414,502,0,19238],[4,34,540,650,0,19240],
    [5,42,781,931,0,19241],[6,50,1046,1240,0,19242],[7,58,1269,1497,0,19243]
  ]},
  { name:"Heal", group:"Holy", kind:"heal", cast:3, coefficient:0.857, wowhead:2054,
    levelGrowth:{2054:{perLevel:2,cap:21}},
    baseGrowth:{2055:{baseLevel:22,basePoints:375,perLevel:2.9,variance:0.1347826123,cap:27}}, ranks:[
    [1,16,250,290,155,2054],[2,22,350,400,205,2055],[3,28,490,556,255,6063],[4,34,611,691,305,6064]
  ]},
  { name:"Flash Heal", group:"Holy", kind:"heal", cast:1.5, coefficient:0.429, wowhead:2061,
    levelGrowth:{2061:{perLevel:2,cap:25}}, ranks:[
    [1,20,174,214,125,2061],[2,26,225,273,155,9472],[3,32,283,341,185,9473],[4,38,349,417,215,9474],
    [5,44,463,551,265,10915],[6,50,589,699,315,10916],[7,56,757,893,380,10917]
  ]},
  { name:"Holy Nova", group:"Holy · group", kind:"group", cast:1.5, instant:true, coefficient:0.107, wowhead:15237, ranks:[
    [1,20,47,55,185,15237],[2,28,77,87,290,15430],[3,36,108,124,400,15431],[4,44,147,171,520,27799],[5,52,221,255,635,27800],[6,60,288,334,750,27801]
  ], detail:"Heals nearby party members; value is per target."},
  { name:"Prayer of Healing", group:"Holy · group", kind:"group", cast:3, coefficient:0.286, wowhead:596, ranks:[
    [1,30,172,184,410,596],[2,40,257,273,560,996],[3,50,390,412,770,10960],[4,60,567,599,1030,10961],[5,60,631,667,1070,25316]
  ], detail:"Per-target value; party target count is adjustable."},
  { name:"Greater Heal", group:"Holy", kind:"heal", cast:3, coefficient:0.857, wowhead:2060, ranks:[
    [1,40,794,894,370,2060],[2,46,1036,1162,455,10963],[3,52,1324,1482,545,10964],[4,58,1685,1879,655,10965],[5,60,1853,2067,710,25314]
  ]},
  { name:"Lightwell", group:"Holy · setup / charges", kind:"heal", cast:1.5, duration:10, periodicTicks:5, coefficient:0, wowhead:724, ranks:[
    [1,40,800,800,225,724],[2,50,1165,1165,295,27870],[3,60,1600,1600,365,27871]
  ], detail:"Healing per click over 10 seconds; up to five charges. Total healing assumes the number of successful clicks selected above."},
  { name:"Prayer of Mending", group:"Holy · reactive / jumps", kind:"group", cast:1.5, instant:true, coefficient:0.429, wowhead:401859, ranks:[
    [1,40,172,172,210,401859],[2,50,298,298,305,1240826],[3,60,413,413,390,1240827]
  ], detail:"Use successful heals: one initial heal plus up to five transfers. Six total heals is the client-described maximum; verify that all five transfers land in game."},
  { name:"Circle of Healing", group:"Holy · group", kind:"group", cast:1.5, instant:true, coefficient:0.214, wowhead:401946, ranks:[
    [1,null,875.1986,969.4507,770,401946]
  ], detail:"Level 60 baseline from Wowhead's 875.1986–969.4507 formula range, averaged. Cost uses 56% × 1,376 Priest base mana, floored to 770."},
  { name:"Divine Grace", group:"Holy · racial", kind:"heal", cast:1.5, instant:true, coefficient:0.429, wowhead:1277370, ranks:[
    [1,10,131,167,0,1277370],[2,18,247,305,0,1277371],[3,26,414,502,0,1277372],[4,34,540,650,0,1277374],
    [5,42,781,931,0,1277376],[6,50,1046,1240,0,1277377],[7,58,1269,1497,0,1277378]
  ]},
  { name:"Penance", group:"Discipline · channeled", kind:"heal", school:"discipline", cast:2, channel:true, bolts:3, coefficient:0.19, wowhead:402174,
    levelGrowth:{402289:{perLevel:0.87,cap:39},1240723:{perLevel:0.98,cap:49},1240724:{perLevel:1.27,cap:59}}, ranks:[
    [1,30,126,126,150,402174,0.19,2,402289],[2,40,200,200,220,1240720,0.19,2,1240723],
    [3,50,268,268,270,1240721,0.19,2,1240724],[4,60,425,425,385,1316995,0.19,2,1316991]
  ], detail:"Shown healing is three per-bolt amounts across a 2 sec channel. Rank links and mana use the cast spell ID; base healing and the 19% coefficient use the separate bolt effect ID. Twin Disciplines is applied based on Blizzard's note. Inner Focus is assumed to add 25 percentage points to every bolt; confirm that interaction in game."},
  { name:"Power Word: Shield", group:"Discipline · absorb", kind:"shield", cast:1.5, instant:true, coefficient:0.1, wowhead:17,
    levelGrowth:{17:{perLevel:0.8,cap:11},592:{perLevel:1.2,cap:17},600:{perLevel:1.6,cap:23}}, ranks:[
    [1,6,44,44,45,17],[2,12,86,86,80,592],[3,18,154,154,130,600],[4,24,226,226,175,3747],[5,30,291,291,210,6065],
    [6,36,368,368,250,6066],[7,42,470,470,300,10898],[8,48,591,591,355,10899],[9,54,749,749,425,10900],[10,60,928,928,500,10901]
  ], detail:"Absorb amount is shown as effective shielding; actual value is capped by incoming damage."}
];

/* Numeric trainer prices (copper) are beta recorder observations read from
   https://warcraftforever.games/classes/priest/spells on 2026-11-08.
   Object values preserve non-live reference/acquisition metadata instead of
   treating a published reference as a live quote. A null value is unknown. */
window.TRAINING_COSTS = {
  2050:{type:"free",source:"UrGameTips",url:"https://urgametips.com/wow-forever/priest-guides/spells/",note:"Starter rank; no trainer fee listed"},
  2052:{type:"reference",copper:100,source:"UrGameTips + X’yera",url:"https://urgametips.com/wow-forever/priest-guides/spells/",secondaryUrl:"https://wowforever.ninja/npcs/6014-xyera/"},
  2053:{type:"reference",copper:300,source:"UrGameTips + X’yera",url:"https://urgametips.com/wow-forever/priest-guides/spells/",secondaryUrl:"https://wowforever.ninja/npcs/6014-xyera/"},
  139:{type:"reference",copper:200,source:"UrGameTips + X’yera",url:"https://urgametips.com/wow-forever/priest-guides/spells/",secondaryUrl:"https://wowforever.ninja/npcs/6014-xyera/"},
  6074:{type:"reference",copper:1200,source:"UrGameTips + X’yera",url:"https://urgametips.com/wow-forever/priest-guides/spells/",secondaryUrl:"https://wowforever.ninja/npcs/6014-xyera/"},
  6075:{type:"reference",copper:3000,source:"UrGameTips + X’yera",url:"https://urgametips.com/wow-forever/priest-guides/spells/",secondaryUrl:"https://wowforever.ninja/npcs/6014-xyera/"},
  6076:{type:"reference",copper:6000,source:"UrGameTips + X’yera",url:"https://urgametips.com/wow-forever/priest-guides/spells/",secondaryUrl:"https://wowforever.ninja/npcs/6014-xyera/"},
  6077:{type:"reference",copper:11000,source:"UrGameTips + X’yera",url:"https://urgametips.com/wow-forever/priest-guides/spells/",secondaryUrl:"https://wowforever.ninja/npcs/6014-xyera/"},
  6078:{type:"reference",copper:16000,source:"UrGameTips + X’yera",url:"https://urgametips.com/wow-forever/priest-guides/spells/",secondaryUrl:"https://wowforever.ninja/npcs/6014-xyera/"},
  10927:{type:"reference",copper:24000,source:"UrGameTips + X’yera",url:"https://urgametips.com/wow-forever/priest-guides/spells/",secondaryUrl:"https://wowforever.ninja/npcs/6014-xyera/"},
  10928:{type:"reference",copper:30000,source:"UrGameTips + X’yera",url:"https://urgametips.com/wow-forever/priest-guides/spells/",secondaryUrl:"https://wowforever.ninja/npcs/6014-xyera/"},
  10929:{type:"reference",copper:42000,source:"UrGameTips + X’yera",url:"https://urgametips.com/wow-forever/priest-guides/spells/",secondaryUrl:"https://wowforever.ninja/npcs/6014-xyera/"},
  25315:{type:"manual",name:"Codex of Renew X",requirement:"Requires level 60",source:"UrGameTips",url:"https://urgametips.com/wow-forever/priest-guides/spells/"},
  13908:null,19236:null,19238:null,19240:null,19241:null,19242:null,19243:null,
  2054:3800,2055:7600,6063:11400,6064:{type:"reference",copper:12000,source:"UrGameTips + X’yera",url:"https://urgametips.com/wow-forever/priest-guides/spells/",secondaryUrl:"https://wowforever.ninja/npcs/6014-xyera/"},
  2061:2850,9472:5700,9473:10450,9474:15200,10915:22800,10916:28500,10917:39900,
  15237:380,15430:665,15431:1140,27799:1805,27800:2185,27801:null,
  724:null,27870:null,27871:null,
  596:9500,996:17100,10960:28500,10961:43700,25316:null,
  2060:17100,10963:24700,10964:36100,10965:41800,25314:null,
  401859:28500,1240826:43700,1240827:null,
  401946:null,
  1277370:null,1277371:null,1277372:null,1277374:null,1277376:null,1277377:null,1277378:null,
  402174:null,1240720:28500,1240721:43700,1316995:null,
  17:4750,592:9500,600:13300,3747:20900,6065:26600,6066:38000,10898:43700,10899:null,10900:null,10901:null
};
