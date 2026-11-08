/* Forever build 1.60.1.70790 values; see README for source and coefficient notes. */
window.HEALING_SPELLS = [
  { name:"Lesser Heal", group:"Holy", kind:"heal", cast:1.5, coefficient:0.429, wowhead:2050, ranks:[
    [1,1,51,30,2050,0.429,1.5],[2,4,78,45,2052,0.571,2],[3,10,141,75,2053,0.714,2.5]
  ]},
  { name:"Renew", group:"Holy", kind:"heal", cast:1.5, instant:true, duration:15, coefficient:1, wowhead:139, ranks:[
    [1,8,45,30,139],[2,14,75,65,6074],[3,20,125,105,6075],[4,26,160,140,6076],[5,32,205,170,6077],
    [6,38,270,205,6078],[7,44,370,250,10927],[8,50,510,305,10928],[9,56,670,365,10929],[10,60,830,410,25315]
  ]},
  { name:"Desperate Prayer", group:"Holy · racial", kind:"heal", cast:1.5, instant:true, coefficient:0, wowhead:13908, ranks:[
    [1,10,149,null,13908],[2,18,276,null,19236],[3,26,458,null,19238],[4,34,595,null,19240],
    [5,42,856,null,19241],[6,50,1143,null,19242],[7,58,1383,null,19243]
  ], manaNote:"Mana cost varies by rank / character; check spell tooltip."},
  { name:"Heal", group:"Holy", kind:"heal", cast:3, coefficient:0.857, wowhead:2054, ranks:[
    [1,16,291,155,2054],[2,22,405,205,2055],[3,28,523,255,6063],[4,34,651,305,6064]
  ]},
  { name:"Flash Heal", group:"Holy", kind:"heal", cast:1.5, coefficient:0.429, wowhead:2061, ranks:[
    [1,20,194,125,2061],[2,26,249,155,9472],[3,32,312,185,9473],[4,38,383,215,9474],
    [5,44,507,265,10915],[6,50,644,315,10916],[7,56,825,380,10917]
  ]},
  { name:"Holy Nova", group:"Holy · group", kind:"group", cast:1.5, instant:true, coefficient:0, wowhead:15237, ranks:[
    [1,20,51,185,15237],[2,28,82,290,15430],[3,36,116,400,15431],[4,44,159,520,27799],[5,52,238,635,27800],[6,60,311,750,27801]
  ], detail:"Heals nearby party members; value is per target."},
  { name:"Binding Heal", group:"Holy · two targets", kind:"group", cast:1.5, coefficient:0.429, wowhead:401937, ranks:[
    [1,25,247,155,401937],[2,32,312,185,1240770],[3,38,383,215,1240771],[4,44,507,265,1240772],[5,50,644,315,1240773],[6,56,825,380,1240774]
  ], detail:"Heals both the target and caster; two-target total is used for HPM."},
  { name:"Prayer of Healing", group:"Holy · group", kind:"group", cast:3, coefficient:0.286, wowhead:596, ranks:[
    [1,30,178,410,596],[2,40,265,560,996],[3,50,401,770,10960],[4,60,583,1030,10961],[5,60,649,1070,25316]
  ], detail:"Per-target value; party target count is adjustable."},
  { name:"Greater Heal", group:"Holy", kind:"heal", cast:3, coefficient:0.857, wowhead:2060, ranks:[
    [1,40,844,370,2060],[2,46,1099,455,10963],[3,52,1403,545,10964],[4,58,1782,655,10965],[5,60,1960,710,25314]
  ]},
  { name:"Lightwell", group:"Holy · setup / charges", kind:"heal", cast:1.5, duration:10, coefficient:0, wowhead:724, ranks:[
    [1,40,800,225,724],[2,50,1165,295,27870],[3,60,1600,365,27871]
  ], detail:"Healing per click over 10 seconds; up to five charges. The target count control estimates one through five successful clicks."},
  { name:"Prayer of Mending", group:"Holy · reactive / jumps", kind:"group", cast:1.5, instant:true, coefficient:0, wowhead:401859, ranks:[
    [1,40,172,210,401859],[2,50,298,305,1240826],[3,60,413,390,1240827]
  ], detail:"Per jump; use the target count control for the number of jumps that land (up to five)."},
  { name:"Circle of Healing", group:"Holy · group", kind:"group", cast:1.5, instant:true, coefficient:0, wowhead:401946, ranks:[
    [1,null,null,null,401946]
  ], detail:"Forever spell recorder does not expose its heal range or mana amount; ratios are omitted until verified."},
  { name:"Divine Grace", group:"Holy · racial", kind:"heal", cast:1.5, instant:true, coefficient:0, wowhead:1277370, ranks:[
    [1,10,149,null,1277370],[2,18,276,null,1277371],[3,26,458,null,1277372],[4,34,595,null,1277374],
    [5,42,856,null,1277376],[6,50,1143,null,1277377],[7,58,1383,null,1277378]
  ], manaNote:"Mana cost not exposed by the spell recorder."},
  { name:"Penance", group:"Discipline · channeled", kind:"heal", cast:2, coefficient:0, wowhead:402174, ranks:[
    [1,30,552,100,402174],[2,40,873,185,1240720],[3,50,1446,270,1240721],[4,60,2019,355,1316991]
  ], detail:"Total covers three bolts over a 2 sec channel; the client list does not publish its bonus-healing share."},
  { name:"Power Word: Shield", group:"Discipline · absorb", kind:"shield", cast:1.5, instant:true, coefficient:0.1, wowhead:17, ranks:[
    [1,6,44,45,17],[2,12,86,80,592],[3,18,154,130,600],[4,24,226,175,3747],[5,30,291,210,6065],
    [6,36,368,250,6066],[7,42,470,300,10898],[8,48,591,355,10899],[9,54,749,425,10900],[10,60,928,500,10901]
  ], detail:"Absorb amount is shown as effective shielding; actual value is capped by incoming damage."}
];
