import { useState, useRef } from "react";

// Load Inter font
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;900&display=swap";
document.head.appendChild(fontLink);

// ─── COLOURS ─────────────────────────────────────────────────
const BG       = "#1a3344";
const SURFACE  = "#1e3d52";
const CARD     = "#243f55";
const CREAM    = "#f5f0e8";
const MID      = "#b8c9d4";
const DIM      = "#6a8a9a";
const FAINT    = "#3a5a6a";
const ORANGE   = "#f47920";
const ORANGE_D = "rgba(244,121,32,0.15)";
const TEAL     = "#4db8d4";
const TEAL_D   = "rgba(77,184,212,0.15)";
const GREEN    = "#4caf82";
const GREEN_D  = "rgba(76,175,130,0.15)";
const RED      = "#e8191f";
const RED_D    = "rgba(232,25,31,0.15)";
const YELLOW   = "#ffd400";
const YELLOW_D = "rgba(255,212,0,0.15)";
const PURPLE   = "#b07fd4";
const PURPLE_D = "rgba(176,127,212,0.15)";
const BORDER   = "rgba(245,240,232,0.12)";
const BORDER_HI= "rgba(245,240,232,0.25)";

// ─── GAME CONFIG ─────────────────────────────────────────────
const BUDGET         = 14;
const OVERHEADS      = 2;
const TICKET_REV     = 31;
const TOTAL_SLOTS    = 10;
const MAX_SPINS      = 3;
const HAND_SIZE      = 8;
const SOLD_OUT_MARK  = 4.0;

const STAGE_CAPS = {"Main Stage":3,"Second Stage":4,"Smaller Stage":3};
const STAGE_MULS = {"Main Stage":1.0,"Second Stage":0.65,"Smaller Stage":0.35};
const STAGES     = ["Main Stage","Second Stage","Smaller Stage"];

// ─── TIERS ───────────────────────────────────────────────────
const TIERS = [
  {min:3.5, stars:4, label:"On the Map",    sub:"Your festival is a name people know. You made it.",  color:CREAM,  poster:"ON THE MAP"},
  {min:2.0, stars:3, label:"Established", sub:"People are talking. You're a name in the game.",  color:GREEN,   poster:"ESTABLISHED"},
  {min:0.5, stars:2, label:"In the Black",sub:"You turned a profit. Real promoters dream of this.",color:TEAL,  poster:"IN THE BLACK"},
  {min:-1.0,stars:1, label:"Bad Year",    sub:"We lost money but we'll be back next summer.",     color:ORANGE,  poster:"BAD YEAR"},
  {min:-999,stars:0, label:"Cancelled",   sub:"Nobody came. The site is empty. Creditors are circling.",color:RED,poster:"CANCELLED"},
];
function getTier(p){ return TIERS.find(t=>p>=t.min)||TIERS[TIERS.length-1]; }

// ─── CROWD REVIEWS ───────────────────────────────────────────
const REVIEWS = {
  4:["Best festival ever. I can't even find my knickers.","I lost my shoes and found my soulmate.","I'm never going home. Someone bring my post here.","I cried. My mate cried. The security guard cried."],
  3:["Already bought tickets for next year before I left the site.","My mate cried during the headline set. In a good way.","Best weekend of the year. And my wedding was this year.","I don't know what happened but I need to do it again."],
  2:["Decent. Not life-changing, but decent.","The halloumi wrap queue was only 45 minutes. Respect.","I lost my phone but found it again. Net neutral.","Better than Reading 2011. And that's saying something."],
  1:["It rained. Then it rained some more. Then it rained again.","The sound cut out twice during the headline set.","Queue for the bar was longer than one of the headline sets.","My tent flooded on night one. Slept in the car."],
  0:["I got locked in a portaloo for 6 hours.","Me and my mate were the only ones there. We left at 3pm.","The catering gave everyone food poisoning. Everyone.","I drove 4 hours for this. 4 hours."],
};
function getReview(stars){ const r=REVIEWS[stars]||REVIEWS[0]; return r[Math.floor(Math.random()*r.length)]; }

// ─── ARTISTS ─────────────────────────────────────────────────
const ARTISTS = [
  {id:1,name:"Radiohead",fee:2.2,draw:9.8,genre:"Alt Rock"},
  {id:2,name:"Beyonce",fee:4.5,draw:10.0,genre:"Pop / R&B"},
  {id:3,name:"The Rolling Stones",fee:5.5,draw:9.5,genre:"Rock"},
  {id:4,name:"Coldplay",fee:3.5,draw:9.7,genre:"Pop Rock"},
  {id:5,name:"Adele",fee:4.0,draw:9.9,genre:"Pop"},
  {id:6,name:"Taylor Swift",fee:5.0,draw:10.0,genre:"Pop"},
  {id:7,name:"Foo Fighters",fee:3.5,draw:9.3,genre:"Rock"},
  {id:8,name:"Arctic Monkeys",fee:3.2,draw:9.4,genre:"Indie Rock"},
  {id:9,name:"Jay-Z",fee:3.2,draw:9.1,genre:"Hip-Hop"},
  {id:10,name:"Kendrick Lamar",fee:3.8,draw:9.6,genre:"Hip-Hop"},
  {id:11,name:"Blur",fee:3.0,draw:9.0,genre:"Britpop"},
  {id:12,name:"Muse",fee:3.0,draw:9.2,genre:"Alt Rock"},
  {id:13,name:"David Bowie",fee:3.0,draw:9.9,genre:"Rock"},
  {id:14,name:"Eminem",fee:3.6,draw:9.5,genre:"Hip-Hop"},
  {id:15,name:"Bruce Springsteen",fee:3.2,draw:9.3,genre:"Rock"},
  {id:16,name:"The Who",fee:2.8,draw:9.0,genre:"Rock"},
  {id:17,name:"Paul McCartney",fee:3.5,draw:9.8,genre:"Rock"},
  {id:18,name:"Elton John",fee:3.8,draw:9.7,genre:"Pop / Rock"},
  {id:19,name:"Guns N Roses",fee:3.4,draw:9.2,genre:"Rock"},
  {id:20,name:"The Prodigy",fee:2.2,draw:8.8,genre:"Electronic"},
  {id:21,name:"Chemical Brothers",fee:1.6,draw:8.5,genre:"Electronic"},
  {id:22,name:"Dua Lipa",fee:3.0,draw:9.4,genre:"Pop"},
  {id:23,name:"Ed Sheeran",fee:4.2,draw:9.8,genre:"Pop"},
  {id:24,name:"Gorillaz",fee:2.8,draw:9.0,genre:"Alternative"},
  {id:25,name:"Stormzy",fee:2.5,draw:8.9,genre:"Grime"},
  {id:26,name:"Oasis",fee:3.8,draw:9.9,genre:"Britpop"},
  {id:27,name:"Pulp",fee:2.2,draw:8.7,genre:"Britpop"},
  {id:28,name:"Neil Young",fee:2.5,draw:8.8,genre:"Rock"},
  {id:29,name:"Arcade Fire",fee:1.8,draw:8.6,genre:"Indie"},
  {id:30,name:"Fleetwood Mac",fee:3.0,draw:9.2,genre:"Rock"},
  {id:176,name:"Green Day",fee:3.0,draw:9.0,genre:"Punk Rock"},
  {id:31,name:"Florence and the Machine",fee:1.4,draw:8.3,genre:"Indie"},
  {id:32,name:"Jack White",fee:1.2,draw:8.0,genre:"Rock"},
  {id:33,name:"The National",fee:0.9,draw:7.8,genre:"Indie Rock"},
  {id:34,name:"Haim",fee:0.8,draw:7.5,genre:"Pop Rock"},
  {id:35,name:"Billie Eilish",fee:2.4,draw:9.2,genre:"Pop"},
  {id:36,name:"Lizzo",fee:1.4,draw:8.4,genre:"Pop / R&B"},
  {id:37,name:"Hozier",fee:1.0,draw:8.1,genre:"Folk Rock"},
  {id:38,name:"Alt-J",fee:0.9,draw:7.9,genre:"Indie"},
  {id:39,name:"Wolf Alice",fee:0.7,draw:7.6,genre:"Alt Rock"},
  {id:40,name:"Idles",fee:0.7,draw:7.7,genre:"Post-Punk"},
  {id:41,name:"LCD Soundsystem",fee:1.2,draw:8.0,genre:"Electronic"},
  {id:42,name:"Disclosure",fee:0.9,draw:7.8,genre:"Electronic"},
  {id:43,name:"Massive Attack",fee:1.1,draw:8.2,genre:"Trip-Hop"},
  {id:44,name:"Portishead",fee:1.0,draw:8.0,genre:"Trip-Hop"},
  {id:45,name:"The Killers",fee:2.5,draw:8.9,genre:"Indie Rock"},
  {id:46,name:"Queens of the Stone Age",fee:1.5,draw:8.5,genre:"Rock"},
  {id:47,name:"Pearl Jam",fee:2.4,draw:9.0,genre:"Grunge"},
  {id:48,name:"Nine Inch Nails",fee:1.8,draw:8.6,genre:"Industrial"},
  {id:49,name:"Frank Ocean",fee:2.8,draw:9.0,genre:"R&B"},
  {id:50,name:"SZA",fee:1.6,draw:8.7,genre:"R&B"},
  {id:52,name:"System of a Down",fee:2.0,draw:8.8,genre:"Metal"},
  {id:53,name:"Metallica",fee:3.0,draw:9.3,genre:"Metal"},
  {id:54,name:"Slipknot",fee:1.6,draw:8.4,genre:"Metal"},
  {id:55,name:"Dizzee Rascal",fee:0.7,draw:7.5,genre:"Grime"},
  {id:56,name:"Skepta",fee:0.8,draw:7.7,genre:"Grime"},
  {id:57,name:"Dave",fee:0.9,draw:7.9,genre:"Hip-Hop"},
  {id:58,name:"Little Simz",fee:0.7,draw:7.6,genre:"Hip-Hop"},
  {id:59,name:"Rosalia",fee:1.2,draw:8.1,genre:"Latin / Alt"},
  {id:60,name:"Lana Del Rey",fee:1.8,draw:8.7,genre:"Indie Pop"},
  {id:61,name:"Calvin Harris",fee:1.8,draw:8.8,genre:"EDM"},
  {id:62,name:"Aphex Twin",fee:1.2,draw:8.2,genre:"Electronic"},
  {id:63,name:"Daft Punk",fee:3.5,draw:9.5,genre:"Electronic"},
  {id:64,name:"Underworld",fee:0.9,draw:7.9,genre:"Electronic"},
  {id:65,name:"The Cure",fee:2.0,draw:8.5,genre:"Post-Punk"},
  {id:66,name:"Depeche Mode",fee:2.4,draw:8.8,genre:"Synth-Pop"},
  {id:67,name:"New Order",fee:1.8,draw:8.3,genre:"Post-Punk"},
  {id:68,name:"Pet Shop Boys",fee:1.2,draw:8.1,genre:"Synth-Pop"},
  {id:69,name:"Suede",fee:0.8,draw:7.7,genre:"Britpop"},
  {id:70,name:"Primal Scream",fee:1.2,draw:7.8,genre:"Rock"},
  {id:71,name:"The Libertines",fee:1.0,draw:7.9,genre:"Indie Rock"},
  {id:72,name:"Amy Winehouse",fee:1.4,draw:8.5,genre:"Soul"},
  {id:73,name:"Noel Gallagher HFB",fee:1.4,draw:8.5,genre:"Rock"},
  {id:74,name:"Liam Gallagher",fee:2.0,draw:8.7,genre:"Rock"},
  {id:75,name:"Sam Fender",fee:0.9,draw:8.0,genre:"Indie Rock"},
  {id:76,name:"Wet Leg",fee:0.6,draw:7.5,genre:"Indie Rock"},
  {id:77,name:"Fontaines DC",fee:0.7,draw:7.7,genre:"Post-Punk"},
  {id:78,name:"Jungle",fee:0.7,draw:7.6,genre:"Funk / Soul"},
  {id:79,name:"Glass Animals",fee:0.8,draw:7.8,genre:"Indie"},
  {id:81,name:"Justice",fee:0.9,draw:7.9,genre:"Electronic"},
  {id:82,name:"Bonobo",fee:0.6,draw:7.3,genre:"Electronic"},
  {id:83,name:"Four Tet",fee:0.7,draw:7.5,genre:"Electronic"},
  {id:84,name:"Jamie xx",fee:0.7,draw:7.4,genre:"Electronic"},
  {id:85,name:"Robyn",fee:1.0,draw:8.0,genre:"Pop / Electronic"},
  {id:86,name:"Kylie Minogue",fee:1.6,draw:8.6,genre:"Pop"},
  {id:87,name:"Sam Smith",fee:1.2,draw:8.2,genre:"Pop / Soul"},
  {id:88,name:"Years and Years",fee:0.7,draw:7.4,genre:"Pop / Electronic"},
  {id:89,name:"Elbow",fee:1.0,draw:7.9,genre:"Indie Rock"},
  {id:90,name:"James",fee:0.7,draw:7.3,genre:"Indie Rock"},
  {id:177,name:"Blink-182",fee:2.2,draw:8.7,genre:"Pop Punk"},
  {id:178,name:"My Chemical Romance",fee:2.5,draw:8.9,genre:"Emo Rock"},
  {id:179,name:"Fall Out Boy",fee:1.2,draw:8.2,genre:"Pop Punk"},
  {id:180,name:"Panic At the Disco",fee:1.4,draw:8.4,genre:"Pop Rock"},
  {id:181,name:"twenty one pilots",fee:1.8,draw:8.7,genre:"Indie Pop"},
  {id:182,name:"Paramore",fee:2.0,draw:8.6,genre:"Pop Punk"},
  {id:183,name:"Halsey",fee:1.0,draw:8.0,genre:"Alt Pop"},
  {id:184,name:"Lorde",fee:1.4,draw:8.4,genre:"Pop"},
  {id:185,name:"Charli XCX",fee:1.4,draw:8.5,genre:"Pop"},
  {id:186,name:"Olivia Rodrigo",fee:2.2,draw:9.1,genre:"Pop"},
  {id:195,name:"The Streets",fee:0.8,draw:7.8,genre:"Garage / Rap"},
  {id:197,name:"Kasabian",fee:1.2,draw:8.2,genre:"Indie Rock"},
  {id:198,name:"Kaiser Chiefs",fee:0.9,draw:7.9,genre:"Indie Rock"},
  {id:200,name:"Bloc Party",fee:0.8,draw:7.7,genre:"Indie Rock"},
  {id:203,name:"Biffy Clyro",fee:0.9,draw:7.9,genre:"Alt Rock"},
  {id:205,name:"Mumford and Sons",fee:1.4,draw:8.4,genre:"Folk Rock"},
  {id:215,name:"Grace Jones",fee:0.8,draw:7.7,genre:"Funk / Electronic"},
  {id:216,name:"Kraftwerk",fee:1.2,draw:8.1,genre:"Electronic"},
  {id:91,name:"The xx",fee:0.9,draw:7.8,genre:"Indie"},
  {id:92,name:"Daughter",fee:0.4,draw:6.9,genre:"Indie Folk"},
  {id:93,name:"Alvvays",fee:0.35,draw:6.7,genre:"Indie Pop"},
  {id:94,name:"Shame",fee:0.3,draw:6.8,genre:"Post-Punk"},
  {id:95,name:"black midi",fee:0.35,draw:6.9,genre:"Art Rock"},
  {id:96,name:"Squid",fee:0.3,draw:6.7,genre:"Post-Punk"},
  {id:97,name:"The Murder Capital",fee:0.28,draw:6.5,genre:"Post-Punk"},
  {id:98,name:"Yard Act",fee:0.25,draw:6.6,genre:"Post-Punk"},
  {id:99,name:"Dry Cleaning",fee:0.28,draw:6.5,genre:"Post-Punk"},
  {id:100,name:"Phoebe Bridgers",fee:0.8,draw:7.7,genre:"Indie Folk"},
  {id:101,name:"beabadoobee",fee:0.4,draw:7.0,genre:"Indie Pop"},
  {id:102,name:"Grimes",fee:0.7,draw:7.3,genre:"Electronic"},
  {id:103,name:"Caroline Polachek",fee:0.5,draw:7.1,genre:"Art Pop"},
  {id:104,name:"Arca",fee:0.45,draw:6.8,genre:"Electronic"},
  {id:106,name:"Loyle Carner",fee:0.45,draw:7.1,genre:"Hip-Hop"},
  {id:107,name:"Jorja Smith",fee:0.7,draw:7.5,genre:"R&B / Soul"},
  {id:108,name:"Mahalia",fee:0.35,draw:6.9,genre:"R&B / Soul"},
  {id:109,name:"AJ Tracey",fee:0.5,draw:7.2,genre:"Grime / Rap"},
  {id:110,name:"Joy Crookes",fee:0.35,draw:6.8,genre:"Soul / Pop"},
  {id:111,name:"Self Esteem",fee:0.4,draw:7.0,genre:"Alt Pop"},
  {id:112,name:"Pa Salieu",fee:0.3,draw:6.6,genre:"Afro-Swing"},
  {id:113,name:"Ghetts",fee:0.35,draw:6.7,genre:"Grime"},
  {id:114,name:"Kano",fee:0.4,draw:7.0,genre:"Grime"},
  {id:116,name:"MIA",fee:0.7,draw:7.6,genre:"Electronic / Rap"},
  {id:117,name:"Diplo",fee:0.6,draw:7.4,genre:"Electronic"},
  {id:118,name:"Hot Chip",fee:0.6,draw:7.4,genre:"Electronic"},
  {id:119,name:"Friendly Fires",fee:0.4,draw:7.0,genre:"Indie / Dance"},
  {id:120,name:"Django Django",fee:0.35,draw:6.8,genre:"Art Rock"},
  {id:121,name:"Two Door Cinema Club",fee:0.55,draw:7.3,genre:"Indie Rock"},
  {id:122,name:"Everything Everything",fee:0.4,draw:7.0,genre:"Art Rock"},
  {id:123,name:"Foals",fee:0.9,draw:7.9,genre:"Indie Rock"},
  {id:124,name:"The Wombats",fee:0.5,draw:7.2,genre:"Indie Rock"},
  {id:125,name:"Bombay Bicycle Club",fee:0.55,draw:7.3,genre:"Indie Rock"},
  {id:126,name:"Bastille",fee:0.7,draw:7.5,genre:"Indie Pop"},
  {id:127,name:"Nothing But Thieves",fee:0.6,draw:7.4,genre:"Alt Rock"},
  {id:128,name:"Pale Waves",fee:0.35,draw:6.9,genre:"Indie Pop"},
  {id:129,name:"YUNGBLUD",fee:0.5,draw:7.2,genre:"Punk Pop"},
  {id:131,name:"Frank Turner",fee:0.5,draw:7.3,genre:"Folk Punk"},
  {id:132,name:"Enter Shikari",fee:0.45,draw:7.1,genre:"Post-Hardcore"},
  {id:134,name:"Bring Me the Horizon",fee:1.1,draw:8.1,genre:"Metal / Pop"},
  {id:135,name:"Architects",fee:0.55,draw:7.3,genre:"Metalcore"},
  {id:136,name:"Amyl and the Sniffers",fee:0.3,draw:6.8,genre:"Punk"},
  {id:137,name:"Bob Vylan",fee:0.25,draw:6.6,genre:"Punk / Grime"},
  {id:138,name:"Rina Sawayama",fee:0.45,draw:7.0,genre:"Pop / Rock"},
  {id:140,name:"Bicep",fee:0.7,draw:7.6,genre:"Electronic"},
  {id:141,name:"Fred again",fee:0.9,draw:8.0,genre:"Electronic"},
  {id:144,name:"Peggy Gou",fee:0.6,draw:7.4,genre:"Electronic"},
  {id:145,name:"Honey Dijon",fee:0.4,draw:7.0,genre:"Electronic / DJ"},
  {id:148,name:"Skrillex",fee:1.0,draw:7.9,genre:"EDM"},
  {id:149,name:"Chase and Status",fee:0.7,draw:7.5,genre:"Drum and Bass"},
  {id:150,name:"Rudimental",fee:0.6,draw:7.3,genre:"Drum and Bass"},
  {id:151,name:"Inhaler",fee:0.35,draw:7.0,genre:"Indie Rock"},
  {id:153,name:"Manic Street Preachers",fee:0.6,draw:7.3,genre:"Alt Rock"},
  {id:154,name:"Interpol",fee:0.7,draw:7.4,genre:"Post-Punk"},
  {id:155,name:"Editors",fee:0.5,draw:7.1,genre:"Post-Punk"},
  {id:156,name:"White Lies",fee:0.35,draw:6.8,genre:"Post-Punk"},
  {id:158,name:"Lets Eat Grandma",fee:0.2,draw:6.4,genre:"Art Pop"},
  {id:159,name:"MUNA",fee:0.28,draw:6.7,genre:"Indie Pop"},
  {id:160,name:"Soccer Mommy",fee:0.25,draw:6.5,genre:"Indie Rock"},
  {id:161,name:"Snail Mail",fee:0.25,draw:6.4,genre:"Indie Rock"},
  {id:162,name:"Lucy Dacus",fee:0.25,draw:6.5,genre:"Indie Rock"},
  {id:163,name:"Cassandra Jenkins",fee:0.18,draw:6.2,genre:"Folk"},
  {id:164,name:"Wednesday",fee:0.18,draw:6.3,genre:"Indie Rock"},
  {id:165,name:"The Smile",fee:0.6,draw:7.3,genre:"Alternative"},
  {id:166,name:"Mogwai",fee:0.4,draw:7.0,genre:"Post-Rock"},
  {id:167,name:"65daysofstatic",fee:0.2,draw:6.3,genre:"Post-Rock"},
  {id:168,name:"Porridge Radio",fee:0.18,draw:6.3,genre:"Indie Rock"},
  {id:169,name:"Indigo De Souza",fee:0.18,draw:6.2,genre:"Indie Folk"},
  {id:170,name:"Arlo Parks",fee:0.4,draw:7.0,genre:"Indie Pop"},
  {id:172,name:"Khruangbin",fee:0.7,draw:7.5,genre:"Global / Psych"},
  {id:173,name:"Black Country New Road",fee:0.4,draw:7.0,genre:"Art Rock"},
  {id:174,name:"Tirzah",fee:0.2,draw:6.2,genre:"Electronic"},
  {id:175,name:"Florist",fee:0.15,draw:6.0,genre:"Folk"},
  {id:192,name:"Caribou",fee:0.5,draw:7.1,genre:"Electronic"},
  {id:193,name:"Jon Hopkins",fee:0.45,draw:7.0,genre:"Electronic"},
  {id:196,name:"Plan B",fee:0.5,draw:7.2,genre:"Rap / Soul"},
  {id:199,name:"Razorlight",fee:0.5,draw:7.1,genre:"Indie Rock"},
  {id:201,name:"Placebo",fee:0.6,draw:7.3,genre:"Alt Rock"},
  {id:202,name:"Feeder",fee:0.35,draw:6.8,genre:"Alt Rock"},
  {id:206,name:"The Lumineers",fee:0.7,draw:7.5,genre:"Folk Rock"},
  {id:207,name:"Laura Marling",fee:0.5,draw:7.2,genre:"Folk"},
  {id:208,name:"Sharon Van Etten",fee:0.4,draw:7.0,genre:"Indie Folk"},
  {id:209,name:"Big Thief",fee:0.5,draw:7.2,genre:"Indie Folk"},
  {id:210,name:"Angel Olsen",fee:0.4,draw:7.0,genre:"Indie Folk"},
  {id:211,name:"Weyes Blood",fee:0.4,draw:7.0,genre:"Art Pop / Folk"},
  {id:212,name:"Sufjan Stevens",fee:0.7,draw:7.4,genre:"Folk / Classical"},
  {id:217,name:"Metronomy",fee:0.45,draw:7.0,genre:"Indie / Electronic"},
  {id:218,name:"Wild Beasts",fee:0.3,draw:6.7,genre:"Indie Rock"},
  {id:220,name:"Honeyblood",fee:0.15,draw:6.0,genre:"Indie Rock"},
  // R&B / Soul
  {id:221,name:"Alicia Keys",fee:3.8,draw:9.2,genre:"R&B / Soul"},
  {id:222,name:"Mary J Blige",fee:2.8,draw:8.8,genre:"R&B / Soul"},
  {id:223,name:"Lauryn Hill",fee:2.5,draw:8.7,genre:"R&B / Soul"},
  {id:224,name:"D'Angelo",fee:1.8,draw:8.2,genre:"R&B / Soul"},
  {id:225,name:"Lianne La Havas",fee:0.7,draw:7.4,genre:"R&B / Soul"},
  {id:226,name:"Corinne Bailey Rae",fee:0.6,draw:7.2,genre:"Soul / Pop"},
  {id:227,name:"Leon Bridges",fee:0.8,draw:7.5,genre:"Soul"},
  // Hip-Hop
  {id:228,name:"Drake",fee:5.0,draw:9.8,genre:"Hip-Hop"},
  {id:229,name:"J Cole",fee:3.2,draw:9.0,genre:"Hip-Hop"},
  {id:230,name:"Tyler the Creator",fee:2.8,draw:9.0,genre:"Hip-Hop"},
  {id:231,name:"Nas",fee:1.8,draw:8.4,genre:"Hip-Hop"},
  {id:232,name:"Missy Elliott",fee:2.2,draw:8.6,genre:"Hip-Hop"},
  {id:233,name:"Run DMC",fee:1.5,draw:8.0,genre:"Hip-Hop"},
  {id:234,name:"Public Enemy",fee:1.2,draw:7.8,genre:"Hip-Hop"},
  {id:235,name:"Doja Cat",fee:3.0,draw:9.1,genre:"Pop / Hip-Hop"},
  // Pop
  {id:236,name:"Rihanna",fee:5.5,draw:9.8,genre:"Pop / R&B"},
  {id:237,name:"Lady Gaga",fee:5.0,draw:9.7,genre:"Pop"},
  {id:238,name:"Katy Perry",fee:3.5,draw:9.0,genre:"Pop"},
  {id:239,name:"Madonna",fee:4.5,draw:9.2,genre:"Pop"},
  {id:240,name:"Shakira",fee:3.2,draw:9.0,genre:"Pop"},
  {id:241,name:"Harry Styles",fee:4.2,draw:9.5,genre:"Pop / Rock"},
  // Electronic / Dance
  {id:242,name:"Fatboy Slim",fee:1.2,draw:8.3,genre:"Electronic"},
  {id:243,name:"Basement Jaxx",fee:1.0,draw:8.0,genre:"Electronic"},
  {id:244,name:"Orbital",fee:0.9,draw:7.9,genre:"Electronic"},
  {id:245,name:"Groove Armada",fee:0.7,draw:7.4,genre:"Electronic"},
  {id:246,name:"Chappell Roan",fee:3.5,draw:9.3,genre:"Pop"},
];

// ─── HELPERS ─────────────────────────────────────────────────
function stageColor(s){ return s==="Main Stage"?ORANGE:s==="Second Stage"?TEAL:GREEN; }
function stageBg(s){ return s==="Main Stage"?ORANGE_D:s==="Second Stage"?TEAL_D:GREEN_D; }
function fmt(v){ const a=Math.abs(v); if(a===0) return "£0m"; return "£"+(a>=1?a.toFixed(1):a.toFixed(2).replace(/\.?0+$/,""))+"m"; }
function fmtS(v){ return (v>=0?"+":"-")+fmt(Math.abs(v)); }

function calcCost(lu){ return +lu.reduce((s,a)=>s+a.fee,0).toFixed(2); }
function calcRevenue(lu){
  if(!lu.length) return 0;
  const ss=lu.reduce((s,a)=>s+a.draw*(STAGE_MULS[a.assignedStage]||0.5),0);
  const sr=ss/(TOTAL_SLOTS*10);
  const gc={};lu.forEach(a=>{gc[a.genre]=(gc[a.genre]||0)+1;});
  const mg=Math.max(...Object.values(gc));
  const gm=mg>=5?0.60:mg>=4?0.72:mg===3?0.85:1.0;
  const sl=0.1+0.9*(lu.length/TOTAL_SLOTS);
  const ma=lu.filter(a=>a.assignedStage==="Main Stage");
  const mad=ma.length>0?ma.reduce((s,a)=>s+a.draw,0)/ma.length:0;
  const mm=mad>=9.7?1.12:mad>=9.4?1.07:mad>=9.2?1.02:mad>=9.0?0.96:mad>=8.7?0.88:mad>=8.3?0.77:mad>=7.5?0.58:0.35;
  return +(TICKET_REV*sr*gm*sl*mm).toFixed(2);
}
function calcTotalCost(lu){ return +(calcCost(lu)+OVERHEADS).toFixed(2); }

function calcFeedback(lu,profit){
  const tips=[];
  const gc={};lu.forEach(a=>{gc[a.genre]=(gc[a.genre]||0)+1;});
  const mg=Math.max(...Object.values(gc));
  const wg=Object.entries(gc).sort((a,b)=>b[1]-a[1])[0];
  if(mg>=4) tips.push("Too many "+wg[0]+" acts — genre stacking killed your revenue.");
  else if(mg===3) tips.push(wg[0]+" is overrepresented — more variety helps.");
  const ma=lu.filter(a=>a.assignedStage==="Main Stage");
  const mad=ma.length>0?ma.reduce((s,a)=>s+a.draw,0)/ma.length:0;
  if(mad<8.5&&ma.length>0) tips.push("Your Main Stage averaged only "+mad.toFixed(1)+" draw — stronger acts there multiply your revenue.");
  const sm=lu.filter(a=>a.assignedStage==="Smaller Stage");
  const es=sm.filter(a=>a.fee>1.0);
  if(es.length>0) tips.push(es[0].name+" wasted on Smaller Stage — high-fee acts need big stages.");
  if(tips.length===0&&profit<3.5){
    if(profit>=2.0) tips.push("Great run! To hit On the Map you need perfect Main Stage acts AND tight budget management.");
    else if(profit>=0) tips.push("Try stronger acts on Main Stage — that's where the revenue multiplier really kicks in.");
    else tips.push("Try premium acts on Main Stage and cheap acts on Smaller Stage — and mix your genres.");
  }
  return tips.slice(0,2);
}

function getBest(){ try{ return parseFloat(localStorage.getItem("fb_best")||"-999"); }catch{ return -999; } }
function saveBest(p){ try{ const b=getBest(); if(p>b) localStorage.setItem("fb_best",String(p)); }catch{} }

function shareText(n,res,lu){
  const main=lu.filter(a=>a.assignedStage==="Main Stage").map(a=>a.name).join(", ")||"nobody";
  const s=res.tier.stars;
  if(res.profit>=SOLD_OUT_MARK) return "SOLD OUT on Festival Boss! "+n+" turned "+fmtS(res.profit)+" profit. The holy grail. https://festivalbossgame.com";
  if(s===4) return "ON THE MAP on Festival Boss! "+n+" turned "+fmtS(res.profit)+" profit with "+main+" on Main Stage. Can you beat it? https://festivalbossgame.com";
  if(s===3) return "Established promoter on Festival Boss! "+n+" — "+fmtS(res.profit)+" in the black. Think you can get On the Map? https://festivalbossgame.com";
  if(s===2) return "In the Black on Festival Boss! "+n+" turned "+fmtS(res.profit)+" profit. Can you do better? https://festivalbossgame.com";
  if(s===1) return "Bad year but we go again. "+n+" on Festival Boss — "+fmtS(res.profit)+". https://festivalbossgame.com";
  return "I just cancelled my own festival on Festival Boss. "+n+" lost "+fmtS(res.profit)+". The crowd never came. The mud did. https://festivalbossgame.com";
}
async function doCopy(t){ try{ await navigator.clipboard.writeText(t); return true; }catch{ return false; } }
function doTweet(t){ window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(t),"_blank"); }
function doFb(){ window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent("https://festivalbossgame.com"),"_blank"); }
function doWhatsApp(t){ window.open("https://wa.me/?text="+encodeURIComponent(t),"_blank"); }
async function doShare(t){ if(navigator.share){ try{ await navigator.share({title:"Festival Boss",text:t,url:"https://festivalbossgame.com"}); }catch{} } }

function dealHand(usedIds){
  const avail=ARTISTS.filter(a=>!usedIds.includes(a.id));
  const shuffle=arr=>[...arr].sort(()=>Math.random()-0.5);
  if(avail.length<=HAND_SIZE) return shuffle(avail);

  const premium=shuffle(avail.filter(a=>a.draw>=9.0));
  const mid=shuffle(avail.filter(a=>a.draw>=8.0&&a.draw<9.0));
  const small=shuffle(avail.filter(a=>a.draw<8.0));
  const expensive=shuffle(avail.filter(a=>a.fee>=3.5));
  const cheap=shuffle(avail.filter(a=>a.fee<1.0));

  // Hand types with weights: balanced=40%, budget trap=15%, genre trap=15%, stage trap=15%, bargain=15%
  const rand=Math.random();
  let hand=[];

  if(rand<0.40){
    // BALANCED — fair hand, mix of all tiers
    hand=[...premium.slice(0,2),...mid.slice(0,3),...small.slice(0,3)];

  } else if(rand<0.55){
    // BUDGET TRAP — lots of expensive premium acts, tempts overspend
    hand=[...expensive.slice(0,5),...small.slice(0,3)];

  } else if(rand<0.70){
    // GENRE TRAP — 4-5 acts from same genre, looks appealing
    const genreCounts={};
    avail.forEach(a=>{genreCounts[a.genre]=(genreCounts[a.genre]||0)+1;});
    const bigGenre=Object.entries(genreCounts).sort((a,b)=>b[1]-a[1])[0][0];
    const sameGenre=shuffle(avail.filter(a=>a.genre===bigGenre));
    const other=shuffle(avail.filter(a=>a.genre!==bigGenre));
    hand=[...sameGenre.slice(0,4),...other.slice(0,4)];

  } else if(rand<0.85){
    // STAGE TRAP — all high draw acts, nothing cheap for smaller stage
    hand=[...premium.slice(0,4),...mid.slice(0,4)];

  } else {
    // BARGAIN HAND — cheap lower draw acts, tests value building
    hand=[...cheap.slice(0,5),...mid.slice(0,3)];
  }

  // Top up to HAND_SIZE if needed
  const ids=new Set(hand.map(a=>a.id));
  const rest=shuffle(avail.filter(a=>!ids.has(a.id)));
  while(rest.length>0&&hand.length<HAND_SIZE) hand.push(rest.pop());
  return shuffle(hand).slice(0,HAND_SIZE);
}

// ─── MAIN APP ────────────────────────────────────────────────
export default function FestivalBoss(){
  const [screen,    setScreen]    = useState("home");
  const [name,      setName]      = useState("");
  const [lineup,    setLineup]    = useState([]);
  const [hand,      setHand]      = useState([]);
  const [spinsLeft, setSpinsLeft] = useState(MAX_SPINS);
  const [spinning,  setSpinning]  = useState(false);
  const [result,    setResult]    = useState(null);
  const [copied,    setCopied]    = useState(false);
  const [legal,     setLegal]     = useState(null);
  const [picking,   setPicking]   = useState(null);
  const [drawerOpen,setDrawerOpen]= useState(false);

  const spent=calcCost(lineup);
  const rem=+(BUDGET-spent).toFixed(2);
  const revenue=calcRevenue(lineup);
  const profit=+(revenue-calcTotalCost(lineup)).toFixed(2);
  const full=lineup.length>=TOTAL_SLOTS;
  const sc={"Main Stage":lineup.filter(a=>a.assignedStage==="Main Stage").length,"Second Stage":lineup.filter(a=>a.assignedStage==="Second Stage").length,"Smaller Stage":lineup.filter(a=>a.assignedStage==="Smaller Stage").length};
  const gc={};lineup.forEach(a=>{gc[a.genre]=(gc[a.genre]||0)+1;});
  const varietyGood=lineup.length===0||Math.max(...Object.values(gc))<=2;

  function spin(){
    if(spinsLeft<=0||full||spinning) return;
    setSpinning(true);
    setTimeout(()=>{
      setHand(dealHand(lineup.map(a=>a.id)));
      if(hand.length>0) setSpinsLeft(p=>p-1);
      setSpinning(false);
    },500);
  }

  function pickAct(a){ if(!full&&rem>=a.fee-0.001) setPicking(a); }

  function assignStage(stage){
    if(!picking||sc[stage]>=STAGE_CAPS[stage]) return;
    const nl=[...lineup,{...picking,assignedStage:stage}];
    setLineup(nl);
    setPicking(null);
    if(nl.length<TOTAL_SLOTS) setHand(dealHand(nl.map(a=>a.id)));
    else setHand([]);
  }

  function removeAct(id){ setLineup(p=>p.filter(a=>a.id!==id)); }
  function submit(){ setScreen("name"); }

  function finalise(){
    const cost=calcCost(lineup),rev=calcRevenue(lineup),tc=calcTotalCost(lineup),pnl=+(rev-tc).toFixed(2);
    saveBest(pnl);
    const tier=getTier(pnl);
    const feedback=calcFeedback(lineup,pnl);
    const crowdReview=getReview(tier.stars);
    setResult({revenue:rev,cost:tc,profit:pnl,artistCost:cost,tier,feedback,crowdReview});
    setScreen("result");
  }

  function reset(){
    setLineup([]);setHand([]);setSpinsLeft(MAX_SPINS);
    setResult(null);setCopied(false);setPicking(null);setName("");setScreen("game");
  }

  if(legal)             return <Legal type={legal} onBack={()=>setLegal(null)}/>;
  if(screen==="about")  return <About onBack={()=>setScreen("home")} onLegal={setLegal}/>;
  if(screen==="home")   return <HomeScreen onStart={()=>setScreen("game")} onLegal={setLegal} onAbout={()=>setScreen("about")}/>;
  if(screen==="name")   return <NameScreen name={name} setName={setName} lineup={lineup} onConfirm={finalise} onBack={()=>setScreen("game")}/>;
  if(screen==="result") return(
    <Result result={result} lineup={lineup} name={name||"My Festival"}
      onReset={reset} onHome={()=>setScreen("home")} copied={copied}
      onCopy={async()=>{const ok=await doCopy(shareText(name||"My Festival",result,lineup));setCopied(ok);}}
      onTweet={()=>doTweet(shareText(name||"My Festival",result,lineup))}
      onFb={()=>doFb()}
      onWhatsApp={()=>doWhatsApp(shareText(name||"My Festival",result,lineup))}
      onShare={()=>doShare(shareText(name||"My Festival",result,lineup))}
      onLegal={setLegal} onAbout={()=>setScreen("about")}
    />
  );

  const budPct=Math.min((spent/BUDGET)*100,100);
  const slotPct=(lineup.length/TOTAL_SLOTS)*100;

  // Stage picker modal styles (all static strings)
  const overlayS={position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:16};
  const modalS={background:BG,border:"2px solid "+BORDER_HI,padding:"24px 20px",width:"100%",maxWidth:340,borderRadius:4};

  return(
    <div style={{minHeight:"100vh",background:BG,color:CREAM,fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif",display:"flex",flexDirection:"column"}}>
      <style>{`*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${SURFACE}}::-webkit-scrollbar-thumb{background:${DIM};border-radius:2px}@keyframes spinAnim{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes deal{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* STAGE PICKER */}
      {picking&&(
        <div style={overlayS}>
          <div style={modalS}>
            <div style={{fontWeight:900,fontSize:20,color:CREAM,marginBottom:4,fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif"}}>{picking.name}</div>
            <div style={{color:MID,fontSize:13,marginBottom:4}}>Which stage?</div>
            <div style={{color:DIM,fontSize:12,marginBottom:16}}>Fee: {fmt(picking.fee)} · Draw: {picking.draw} · {picking.genre}</div>
            {STAGES.map(stage=>{
              const count=sc[stage], cap=STAGE_CAPS[stage], isFull=count>=cap;
              const sc2=stageColor(stage), bg2=stageBg(stage);
              const btnStyle={display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",border:"2px solid "+(isFull?FAINT:sc2),background:isFull?"transparent":bg2,opacity:isFull?0.4:1,cursor:isFull?"not-allowed":"pointer",padding:"11px 13px",marginBottom:8,fontFamily:"inherit",borderRadius:3};
              return(
                <button key={stage} style={btnStyle} onClick={()=>!isFull&&assignStage(stage)}>
                  <div>
                    <span style={{color:isFull?DIM:sc2,fontWeight:700,fontSize:14}}>{stage}</span>
                    <span style={{color:DIM,fontSize:11,marginLeft:8}}>{count}/{cap} slots</span>
                  </div>
                  <span style={{color:DIM,fontSize:11}}>{isFull?"FULL":((STAGE_MULS[stage]*100).toFixed(0)+"% rev")}</span>
                </button>
              );
            })}
            <button style={{width:"100%",background:"transparent",border:"1px solid "+BORDER,color:MID,padding:"10px 0",cursor:"pointer",fontFamily:"inherit",fontSize:13,marginTop:4,borderRadius:3}} onClick={()=>setPicking(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",minHeight:52,background:SURFACE,borderBottom:"2px solid "+ORANGE,flexShrink:0,flexWrap:"wrap",gap:6}}>
        <span style={{fontWeight:900,fontSize:15,color:CREAM,letterSpacing:"-0.3px",whiteSpace:"nowrap"}}>Festival Boss</span>
        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"nowrap"}}>
          <Kpi l="Budget" v={fmt(rem)}                          c={rem<2?RED:PURPLE}/>
          <div style={{width:1,height:16,background:"rgba(245,240,232,0.2)"}}/>
          <Kpi l="Acts"   v={lineup.length+"/"+TOTAL_SLOTS}     c={full?YELLOW:CREAM}/>
          <div style={{width:1,height:16,background:"rgba(245,240,232,0.2)"}}/>
          <Kpi l="Spins"  v={spinsLeft}                         c={spinsLeft<=1?RED:YELLOW}/>
          <div style={{width:1,height:16,background:"rgba(245,240,232,0.2)"}}/>
          <Kpi l="P&L"    v={fmtS(profit)}                      c={profit>=0?GREEN:RED}/>
        </div>
      </header>

      {/* RAILS */}
      <div style={{height:4,background:SURFACE,flexShrink:0}}>
        <div style={{height:"100%",width:budPct+"%",background:rem<2?RED:GREEN,transition:"width 0.3s"}}/>
      </div>
      <div style={{height:3,background:SURFACE,flexShrink:0}}>
        <div style={{height:"100%",width:slotPct+"%",background:TEAL,transition:"width 0.3s"}}/>
      </div>

      <style>{`@media(min-width:680px){.fb-body{flex-direction:row!important;height:calc(100vh - 67px)!important;overflow:hidden!important}.fb-sidebar{display:flex!important;position:static!important;height:auto!important;max-height:none!important;border-top:none!important;box-shadow:none!important;z-index:auto!important;width:290px!important;min-width:260px!important;border-right:2px solid ${BORDER}!important;overflow:hidden!important;flex-shrink:0!important}.fb-drawer-btn{display:none!important}.fb-main{overflow-y:auto!important;flex:1!important}}`}</style>

      <div className="fb-body" style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",position:"relative"}}>

        {/* SIDEBAR */}
        <aside className="fb-sidebar" style={{position:"fixed",bottom:0,left:0,right:0,zIndex:100,background:SURFACE,borderTop:"2px solid "+BORDER,maxHeight:"75vh",display:drawerOpen?"flex":"none",flexDirection:"column",overflow:"hidden",boxShadow:"0 -4px 24px rgba(0,0,0,0.3)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 14px 10px",borderBottom:"1px solid "+BORDER,marginBottom:8}}>
            <div style={{fontSize:11,fontWeight:900,textTransform:"uppercase",letterSpacing:"0.12em",color:CREAM}}>My Lineup</div>
            <button style={{background:"none",border:"none",color:MID,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,padding:0}} onClick={()=>setDrawerOpen(false)}>Close</button>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"0 10px"}}>
            {lineup.length===0&&<p style={{color:DIM,fontSize:13,padding:"28px 0",textAlign:"center",margin:0}}>Spin to get your first acts</p>}
            {lineup.map(a=>{
              const sc2=stageColor(a.assignedStage), bg2=stageBg(a.assignedStage);
              return(
                <div key={a.id} style={{display:"flex",alignItems:"center",gap:8,borderLeft:"4px solid "+sc2,padding:"7px 8px 7px 10px",marginBottom:5,background:CARD,borderBottom:"1px solid "+BORDER}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:700,fontSize:13,color:CREAM,marginBottom:2,fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif"}}>{a.name}</div>
                    <div style={{display:"flex",gap:5,alignItems:"center",flexWrap:"wrap"}}>
                      <span style={{fontSize:8,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",padding:"2px 7px",border:"1px solid "+sc2,background:bg2,color:sc2}}>{a.assignedStage}</span>
                      <span style={{fontSize:10,color:DIM,textTransform:"uppercase",letterSpacing:"0.04em"}}>{a.genre}</span>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:7,flexShrink:0}}>
                    <span style={{color:sc2,fontWeight:800,fontSize:12}}>{fmt(a.fee)}</span>
                    <button style={{background:"none",border:"none",color:DIM,cursor:"pointer",fontSize:11,padding:0,fontFamily:"inherit"}} onClick={()=>removeAct(a.id)}>x</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{margin:"8px 12px",padding:"11px 12px",background:CARD,border:"1px solid "+BORDER,flexShrink:0}}>
            {STAGES.map(stage=>(
              <div key={stage} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <span style={{fontSize:11,color:stageColor(stage),fontWeight:700}}>{stage}</span>
                <span style={{fontSize:11,color:sc[stage]>=STAGE_CAPS[stage]?GREEN:DIM}}>{sc[stage]}/{STAGE_CAPS[stage]}</span>
              </div>
            ))}
            <div style={{height:1,background:BORDER,margin:"8px 0"}}/>
            <div style={{display:"flex",alignItems:"center",gap:7,fontSize:11,color:varietyGood?GREEN:DIM,marginTop:4}}>
              <span style={{width:14,height:14,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:varietyGood?GREEN:"transparent",border:"2px solid "+(varietyGood?GREEN:FAINT),fontSize:9,color:CREAM,fontWeight:900}}>{varietyGood?"v":""}</span>
              {varietyGood?"Good genre mix":"Too many same genre"}
            </div>
            <div style={{marginTop:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:MID,fontSize:12}}>Projected P&L</span>
              <span style={{color:profit>=0?GREEN:RED,fontWeight:900,fontSize:18}}>{fmtS(profit)}</span>
            </div>
            <div style={{fontSize:10,color:DIM,marginTop:2}}>Incl. £{OVERHEADS}m overheads</div>
          </div>
          {full&&<button style={{margin:"10px 12px",flexShrink:0,background:ORANGE,border:"none",color:BG,fontWeight:900,fontSize:14,padding:"13px 0",cursor:"pointer",fontFamily:"inherit",letterSpacing:"0.05em",textTransform:"uppercase",borderRadius:3}} onClick={()=>{setDrawerOpen(false);submit();}}>Name and Release Lineup</button>}
        </aside>

        {/* MAIN AREA */}
        <main className="fb-main" style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto",background:BG}}>
          <div style={{textAlign:"center",padding:"20px 16px 14px",borderBottom:"1px solid "+BORDER,background:SURFACE,flexShrink:0}}>
            <button
              style={{width:88,height:88,borderRadius:"50%",background:spinning?DIM:ORANGE,border:"none",color:BG,fontSize:16,fontWeight:900,display:"inline-flex",alignItems:"center",justifyContent:"center",cursor:(spinsLeft<=0||full)?"not-allowed":"pointer",marginBottom:10,opacity:(spinsLeft<=0||full)?0.3:1,animation:spinning?"spinAnim 0.5s linear infinite":"none",fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif",letterSpacing:"0.05em"}}
              onClick={spin} disabled={spinsLeft<=0||full||spinning}>
              SPIN
            </button>
            <div style={{color:CREAM,fontWeight:900,fontSize:14,textTransform:"uppercase",letterSpacing:"0.05em"}}>
              {full?"Lineup full!":spinsLeft<=0?"No spins left":hand.length===0?"Spin to get your acts":spinsLeft+" spin"+(spinsLeft!==1?"s":"")+" left"}
            </div>
            {hand.length>0&&!full&&<div style={{color:DIM,fontSize:11,marginTop:5}}>Pick one · or spin again for new acts</div>}
          </div>

          {hand.length>0&&!full&&(
            <div style={{padding:"12px",display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,alignContent:"start"}}>
              {hand.map((a,i)=>{
                const canAfford=rem>=a.fee-0.001;
                const drawColor=a.draw>=9?ORANGE:a.draw>=8?TEAL:DIM;
                return(
                  <div key={a.id}
                    style={{background:CARD,border:"1px solid "+BORDER,padding:"10px 11px",cursor:canAfford?"pointer":"not-allowed",userSelect:"none",animation:"deal 0.18s ease both",animationDelay:(i*0.04)+"s",opacity:canAfford?1:0.3,borderRadius:3}}
                    onClick={()=>canAfford&&pickAct(a)}>
                    <div style={{fontSize:10,fontWeight:800,color:drawColor,marginBottom:3}}>DRAW {a.draw}</div>
                    <div style={{fontWeight:900,fontSize:13,color:CREAM,lineHeight:1.2,marginBottom:3,fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif"}}>{a.name}</div>
                    <div style={{fontSize:10,color:DIM,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>{a.genre}</div>
                    <div style={{color:drawColor,fontWeight:900,fontSize:13}}>{fmt(a.fee)}</div>
                    {!canAfford&&<div style={{fontSize:9,color:RED,fontWeight:700,marginTop:4,textTransform:"uppercase"}}>Over budget</div>}
                  </div>
                );
              })}
            </div>
          )}

          {hand.length===0&&!full&&(
            <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,textAlign:"center"}}>
              <div style={{fontSize:40,marginBottom:12,opacity:0.3,fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif",color:ORANGE}}>SPIN</div>
              <div style={{color:MID,fontSize:16,fontWeight:700,fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif"}}>Spin to get your acts</div>
              <div style={{color:DIM,fontSize:12,marginTop:8}}>{MAX_SPINS} skips to veto acts · {TOTAL_SLOTS} slots · £{BUDGET}m budget</div>
              <div style={{color:DIM,fontSize:11,marginTop:4}}>Break even to survive · £3.5m+ for On the Map · £4.0m+ for Sold Out</div>
              <div style={{marginTop:16,display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center"}}>
                {STAGES.map(stage=>(
                  <div key={stage} style={{fontSize:11,color:stageColor(stage),fontWeight:700,textAlign:"center"}}>
                    <div>{stage}</div>
                    <div style={{fontWeight:400,color:DIM}}>{STAGE_CAPS[stage]} slots · {(STAGE_MULS[stage]*100).toFixed(0)}% rev</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{height:80}}/>
        </main>
      </div>

      {/* DRAWER BUTTON */}
      <button className="fb-drawer-btn"
        style={{position:"fixed",bottom:0,left:0,right:0,zIndex:101,color:BG,fontWeight:900,fontSize:13,padding:"16px 20px",border:"none",cursor:"pointer",fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif",letterSpacing:"0.03em",textAlign:"center",background:full?GREEN:ORANGE}}
        onClick={()=>{ if(full){setDrawerOpen(false);submit();}else setDrawerOpen(p=>!p); }}>
        {full?"NAME AND RELEASE LINEUP":"MY LINEUP ("+lineup.length+"/"+TOTAL_SLOTS+") "+(drawerOpen?"v":"^")}
      </button>
    </div>
  );
}

// ─── MINI COMPONENTS ─────────────────────────────────────────
function Kpi({l,v,c}){
  return(
    <div style={{textAlign:"center"}}>
      <div style={{color:c,fontWeight:900,fontSize:13,letterSpacing:"-0.3px"}}>{v}</div>
      <div style={{color:"rgba(245,240,232,0.5)",fontSize:8,textTransform:"uppercase",letterSpacing:"0.08em",marginTop:1}}>{l}</div>
    </div>
  );
}

function Ad({text}){
  return(
    <div style={{margin:"10px 12px 0",padding:"6px 10px",border:"1px dashed "+BORDER,display:"flex",gap:7,alignItems:"center"}}>
      <span style={{fontSize:8,fontWeight:700,textTransform:"uppercase",color:DIM,background:SURFACE,padding:"1px 4px",flexShrink:0}}>Ad</span>
      <span style={{fontSize:11,color:MID}}>{text}</span>
    </div>
  );
}

function SBtn({onClick,hi,children}){
  return(
    <button onClick={onClick} style={{background:hi?GREEN_D:"transparent",border:"2px solid "+(hi?GREEN:BORDER_HI),color:hi?GREEN:MID,padding:"8px 12px",cursor:"pointer",fontSize:11,fontFamily:"inherit",fontWeight:700,borderRadius:3}}>{children}</button>
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────
function HomeScreen({onStart,onLegal,onAbout}){
  const best=getBest();
  const hasBest=best>-50;
  const bestStars=best>=3.5?"ON THE MAP":best>=2.0?"Established":best>=0.5?"In the Black":best>=0?"Bad Year (survived!)":"Cancelled";
  const bestColor=best>=3.5?YELLOW:best>=2.0?GREEN:best>=0.5?TEAL:best>=-1.0?ORANGE:RED;
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column",alignItems:"center",padding:"0 16px 60px",overflow:"hidden"}}>
      <style>{`@keyframes deal{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}@keyframes spinAnim{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}`}</style>
      <div style={{width:"100%",maxWidth:480,padding:"16px 0 12px",textAlign:"center"}}>
        <div style={{height:3,background:ORANGE,marginBottom:16,opacity:0.8}}/>
        <div style={{userSelect:"none",lineHeight:0.88,marginBottom:4}}>
          <span style={{display:"block",fontSize:"clamp(44px,12vw,80px)",fontWeight:900,fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif",color:CREAM,letterSpacing:"-3px",textTransform:"uppercase"}}>Festival</span>
          <span style={{display:"block",fontSize:"clamp(56px,15vw,110px)",fontWeight:900,fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif",color:ORANGE,letterSpacing:"-5px",textTransform:"uppercase",marginTop:-6}}>Boss</span>
        </div>
        <div style={{fontSize:11,color:DIM,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:8,marginTop:10}}>Spin the acts · Book the lineup · Turn a profit</div>
        <div style={{fontSize:12,color:MID,lineHeight:1.6,marginBottom:14,textAlign:"center"}}>
          Don't get Cancelled. Get In the Black. Get Established.<br/>
          Put it <span style={{color:CREAM,fontWeight:700}}>On the Map</span>. The holy grail? <span style={{color:ORANGE,fontWeight:700}}>Sold Out.</span>
        </div>
      </div>

      {/* AD SLOT — activate when AdSense approved */}
      {false&&<div id="adsense-home" style={{width:"100%",maxWidth:460,marginBottom:12}}/>}

      <div style={{background:SURFACE,border:"1px solid "+BORDER,padding:"16px 18px",width:"100%",maxWidth:460,borderRadius:4}}>
        <div style={{fontWeight:700,fontSize:12,letterSpacing:"0.08em",textTransform:"uppercase",color:MID,marginBottom:12,borderBottom:"1px solid "+BORDER,paddingBottom:8}}>How to play</div>
        <div style={{marginBottom:14}}>
          {[
            [MAX_SPINS+" skips",    "veto acts you don't want",   YELLOW],
            ["£"+BUDGET+"m budget", "inc. £2m overheads",         PURPLE],
            ["Main Stage",          "3 slots · 100% revenue",     ORANGE],
            ["Second Stage",        "4 slots · 65% revenue",      TEAL],
            ["Smaller Stage",       "3 slots · 35% revenue",      GREEN],
            ["Make more than you spend", "sounds easy.",          RED],
          ].map(([lbl,desc,col],i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid "+BORDER}}>
              <span style={{color:col,fontWeight:700,fontSize:13}}>{lbl}</span>
              <span style={{color:DIM,fontSize:11,textAlign:"right"}}>{desc}</span>
            </div>
          ))}
          <div style={{padding:"8px 0",fontSize:11,color:MID,fontStyle:"italic",textAlign:"center"}}>
            Your biggest names belong on the biggest stages.
          </div>
        </div>

        <div style={{background:BG,border:"1px solid "+BORDER,padding:"10px 12px",marginBottom:14,textAlign:"center",borderRadius:3}}>
          <div style={{fontSize:12,color:MID,lineHeight:1.6}}>
            The record profit is <span style={{color:YELLOW,fontWeight:700}}>£4.0m</span>. Only 1 in 500 reach Sold Out.
          </div>
        </div>

        <button style={{width:"100%",background:ORANGE,border:"none",color:BG,fontWeight:900,fontSize:16,padding:"15px 0",borderRadius:3,cursor:"pointer",fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif",letterSpacing:"0.08em",textTransform:"uppercase"}} onClick={onStart}>
          Build Your Festival
        </button>

        <div style={{textAlign:"center",marginTop:10,fontSize:11,color:FAINT,animation:"bounce 2s ease-in-out infinite"}}>↓ scroll for your best score</div>

        {hasBest&&(
          <div style={{marginTop:12,padding:"8px 12px",background:BG,border:"1px solid "+bestColor,textAlign:"center",borderRadius:3}}>
            <span style={{fontSize:12,fontWeight:700,color:bestColor}}>Your best: {fmtS(best)} — {bestStars}</span>
          </div>
        )}


        <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:14,alignItems:"center"}}>
          <button style={{background:"none",border:"none",color:DIM,fontSize:11,cursor:"pointer",fontFamily:"inherit",textDecoration:"underline",padding:0}} onClick={onAbout}>About</button>
          <span style={{color:DIM}}>·</span>
          <button style={{background:"none",border:"none",color:DIM,fontSize:11,cursor:"pointer",fontFamily:"inherit",textDecoration:"underline",padding:0}} onClick={()=>onLegal("terms")}>Terms</button>
          <span style={{color:DIM}}>·</span>
          <button style={{background:"none",border:"none",color:DIM,fontSize:11,cursor:"pointer",fontFamily:"inherit",textDecoration:"underline",padding:0}} onClick={()=>onLegal("privacy")}>Privacy</button>
        </div>
      </div>
      <Footer onLegal={onLegal} onAbout={onAbout}/>
      <div style={{textAlign:"center",padding:"0 0 24px"}}>
        <a href="https://ko-fi.com/festivalboss" target="_blank" rel="noopener noreferrer" style={{color:DIM,fontSize:11,textDecoration:"none"}}>☕ enjoyed it? buy me a coffee</a>
      </div>
    </div>
  );
}

// ─── NAME SCREEN ─────────────────────────────────────────────
function NameScreen({name,setName,lineup,onConfirm,onBack}){
  const ok=name.trim().length>=2;
  const main=lineup.filter(a=>a.assignedStage==="Main Stage");
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column",alignItems:"center",padding:"0 16px 60px"}}>
      <div style={{background:SURFACE,border:"1px solid "+BORDER,padding:"24px 22px",width:"100%",maxWidth:460,marginTop:32,borderRadius:4}}>
        <button style={{background:"none",border:"none",color:MID,cursor:"pointer",fontFamily:"inherit",fontSize:13,padding:0,marginBottom:20,display:"block"}} onClick={onBack}>Back to lineup</button>
        <div style={{background:BG,padding:"12px 14px",marginBottom:20,textAlign:"center",borderRadius:3}}>
          <div style={{fontSize:9,letterSpacing:"0.3em",color:DIM,textTransform:"uppercase",marginBottom:6}}>Your Main Stage</div>
          {main.length>0
            ? main.map(a=><div key={a.id} style={{fontWeight:900,fontSize:15,color:ORANGE,letterSpacing:"0.06em",textTransform:"uppercase",fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif",lineHeight:1.3}}>{a.name}</div>)
            : <div style={{color:RED,fontSize:13}}>No Main Stage acts booked</div>
          }
        </div>
        <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.14em",color:MID,marginBottom:10}}>Name your festival</div>
        <input
          style={{width:"100%",background:BG,border:"2px solid "+BORDER_HI,padding:"13px 14px",color:CREAM,fontSize:17,outline:"none",fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif",marginBottom:6,boxSizing:"border-box",fontWeight:700,borderRadius:3}}
          placeholder="e.g. Dave's Fantastic Fest" value={name} maxLength={32} onChange={e=>setName(e.target.value)} autoFocus/>
        <div style={{fontSize:11,color:DIM,marginBottom:16}}>{name.length}/32</div>
        <button
          style={{width:"100%",background:ok?GREEN:DIM,border:"none",color:BG,fontWeight:900,fontSize:16,padding:"15px 0",borderRadius:3,cursor:ok?"pointer":"not-allowed",fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif",letterSpacing:"0.08em",textTransform:"uppercase",opacity:ok?1:0.5}}
          onClick={()=>ok&&onConfirm()}>
          Release Lineup
        </button>
      </div>
    </div>
  );
}

// ─── RESULT SCREEN ────────────────────────────────────────────
function Result({result,lineup,name,onReset,onHome,copied,onCopy,onTweet,onFb,onWhatsApp,onShare,onLegal,onAbout}){
  const {revenue,cost,profit,artistCost,tier,feedback,crowdReview}=result;
  const posterRef=useRef(null);
  const best=getBest();
  const isNewBest=profit>=best&&profit>-50;
  const stars=tier.stars;
  const isSoldOut=profit>=SOLD_OUT_MARK;
  const main=lineup.filter(a=>a.assignedStage==="Main Stage");
  const second=lineup.filter(a=>a.assignedStage==="Second Stage");
  const smaller=lineup.filter(a=>a.assignedStage==="Smaller Stage");

  async function downloadPoster(){
    if(!posterRef.current) return;
    try{
      const mod=await import("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.esm.min.js");
      const canvas=await mod.default(posterRef.current,{scale:2,backgroundColor:BG});
      const a=document.createElement("a");
      a.href=canvas.toDataURL("image/png");
      a.download=(name||"festival")+"-boss.png";
      a.click();
    }catch(e){console.error(e);}
  }

  const tierBg=tier.color+"22";
  const nextMsg=stars===1?"Need £0.5m+ profit for In the Black":stars===2?"Need £2m+ for Established":stars===3?"Need £3.5m+ for On the Map — and £4.0m+ for the holy grail: Sold Out":"";

  return(
    <div style={{minHeight:"100vh",background:BG,padding:"18px 16px 40px",maxWidth:540,margin:"0 auto"}}>

      {isNewBest&&(
        <div style={{background:TEAL_D,border:"1px solid "+TEAL,padding:"8px 14px",marginBottom:10,textAlign:"center",borderRadius:3}}>
          <span style={{fontWeight:900,fontSize:13,color:TEAL}}>New personal best: {fmtS(profit)}</span>
        </div>
      )}

      {/* VERDICT */}
      <div style={{textAlign:"center",marginBottom:12,padding:"18px 16px",border:"1px solid "+BORDER_HI,background:tierBg,borderRadius:4}}>
        <div style={{fontWeight:900,fontSize:28,color:tier.color,lineHeight:1,marginBottom:6}}>{tier.label}</div>
        <div style={{fontSize:stars===0?22:16,lineHeight:1,letterSpacing:"2px",marginBottom:6}}>
          {stars===0?"💀":Array.from({length:stars}).map((_,i)=><span key={i}>⭐</span>)}
        </div>
        <div style={{color:MID,fontSize:13,marginBottom:4}}>{tier.sub}</div>
        <div style={{color:DIM,fontSize:11}}>{name}</div>
      </div>

      {/* FIGURES */}
      <div style={{display:"flex",gap:8,marginBottom:6}}>
        {[[fmt(revenue),"Revenue",GREEN],["-"+fmt(cost),"All Costs",RED],[fmtS(profit),profit>=0?"Profit":"Loss",profit>=0?GREEN:RED,true]].map(([v,l,c,big])=>(
          <div key={l} style={{flex:1,textAlign:"center",background:SURFACE,padding:"10px 6px",border:"1px solid "+BORDER,borderRadius:3}}>
            <div style={{color:c,fontWeight:900,fontSize:big?22:17,fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif"}}>{v}</div>
            <div style={{color:DIM,fontSize:10,marginTop:3}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{color:DIM,fontSize:11,textAlign:"center",marginBottom:12}}>
        Incl. £{OVERHEADS}m overheads · Artist fees: {fmt(artistCost||cost-OVERHEADS)}
      </div>

      {/* TRY AGAIN — right up top for retention */}
      <div style={{display:"flex",gap:10,marginBottom:14}}>
        <button style={{flex:2,background:ORANGE,border:"none",color:BG,fontWeight:900,fontSize:15,padding:"14px 0",cursor:"pointer",fontFamily:"inherit",borderRadius:3}} onClick={onReset}>Try Again</button>
        <button style={{flex:1,background:"transparent",border:"1px solid "+BORDER_HI,color:CREAM,fontWeight:700,fontSize:14,padding:"14px 0",cursor:"pointer",fontFamily:"inherit",borderRadius:3}} onClick={onHome}>Home</button>
      </div>

      {/* TIER TEASER */}
      {isSoldOut?(
        <div style={{background:ORANGE_D,border:"1px solid "+ORANGE,padding:"10px 14px",marginBottom:12,textAlign:"center",borderRadius:3}}>
          <div style={{fontSize:13,fontWeight:900,color:ORANGE}}>SOLD OUT — You've done the impossible. Share this immediately.</div>
        </div>
      ):stars<4?(
        <div style={{background:"rgba(245,240,232,0.04)",border:"1px solid "+BORDER,padding:"10px 14px",marginBottom:12,textAlign:"center",borderRadius:3}}>
          <div style={{fontSize:11,color:DIM,marginBottom:3}}>{nextMsg}</div>
          <div style={{fontSize:10,color:FAINT}}>The Sold Out record is £4.0m+. Almost nobody gets there.</div>
        </div>
      ):(
        <div style={{background:YELLOW_D,border:"1px solid "+YELLOW,padding:"10px 14px",marginBottom:12,textAlign:"center",borderRadius:3}}>
          <div style={{fontSize:12,fontWeight:900,color:CREAM}}>On the Map! Can you go one further and hit Sold Out at £4.0m+?</div>
        </div>
      )}

      {/* FEEDBACK */}
      {stars!==0&&feedback&&feedback.length>0&&(
        <div style={{background:ORANGE_D,border:"1px solid "+ORANGE,padding:"14px 16px",marginBottom:14,borderRadius:3}}>
          <div style={{fontWeight:700,fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:ORANGE,marginBottom:10}}>{stars>=3?"What worked":"What went wrong"}</div>
          {feedback.map((tip,i)=>(
            <div key={i} style={{fontSize:13,color:MID,lineHeight:1.6,marginBottom:i<feedback.length-1?8:0}}>— {tip}</div>
          ))}
        </div>
      )}

      {/* SUMMARY */}
      <p style={{color:MID,fontSize:14,lineHeight:1.7,background:SURFACE,padding:"14px 16px",marginBottom:14,border:"1px solid "+BORDER,borderRadius:3}}>
        {stars===0
          ?name+" never opened its gates. "+(main[0]?.name||"Nobody")+" played to an empty field. The site's empty. Creditors are circling."
          :profit>=3.5
            ?name+" turned "+fmt(profit)+" profit. "+(main[0]?.name||"Your headliner")+" packed the Main Stage. Even the portaloos turned a profit."
            :profit>=0
              ?name+" made "+fmt(profit)+" profit. Still a way to go until you're On the Map."
              :name+" lost "+fmt(Math.abs(profit))+". The crowd never came. The mud did."
        }
      </p>

      {/* CROWD REVIEW */}
      <div style={{background:"rgba(245,240,232,0.04)",border:"1px solid "+BORDER,padding:"14px 16px",marginBottom:16,borderRadius:3}}>
        <div style={{fontWeight:700,fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em",color:DIM,marginBottom:8}}>One festival-goer said</div>
        <div style={{fontSize:15,color:CREAM,lineHeight:1.6}}>"{crowdReview}"</div>
      </div>

      {/* POSTER */}
      <div style={{margin:"14px 0"}}>
        <div ref={posterRef} style={{background:BG,border:"3px solid "+ORANGE,textAlign:"center",fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif",overflow:"hidden",borderRadius:4}}>

          {/* Top stripe */}
          <div style={{height:8,background:ORANGE}}/>

          {/* Header */}
          <div style={{background:ORANGE,padding:"10px 16px 8px"}}>
            <div style={{fontSize:9,fontWeight:900,letterSpacing:"0.5em",color:BG,textTransform:"uppercase",marginBottom:2}}>Festival Boss Presents</div>
            <div style={{fontSize:"clamp(32px,8vw,56px)",fontWeight:900,color:BG,letterSpacing:"-2px",textTransform:"uppercase",lineHeight:0.9}}>{name.toUpperCase()}</div>
          </div>

          {/* Tagline */}
          <div style={{padding:"10px 16px 0",fontSize:8,color:DIM,letterSpacing:"0.4em",textTransform:"uppercase"}}>ONE WEEKEND · ONE CHANCE · ONE LINEUP</div>

          {/* Main stage acts — big */}
          <div style={{padding:"14px 16px 4px"}}>
            {main.length>0
              ? main.map((a,i)=>(
                <div key={a.id} style={{
                  fontSize:i===0?"clamp(24px,6vw,40px)":"clamp(18px,4.5vw,28px)",
                  fontWeight:900,
                  color:i===0?ORANGE:CREAM,
                  letterSpacing:i===0?"-1px":"0px",
                  textTransform:"uppercase",
                  lineHeight:1.1,
                  marginBottom:i===0?4:2,
                }}>{a.name.toUpperCase()}</div>
              ))
              : <div style={{opacity:0.2,fontSize:16,color:ORANGE}}>NO MAIN STAGE BOOKED</div>}
          </div>

          {/* Divider */}
          <div style={{height:1,background:ORANGE,margin:"10px 20px",opacity:0.5}}/>

          {/* Second stage */}
          {second.length>0&&(
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"2px 10px",padding:"4px 16px"}}>
              {second.map((a,i)=>(
                <span key={a.id} style={{fontSize:13,fontWeight:700,color:TEAL,letterSpacing:"0.02em",textTransform:"uppercase"}}>
                  {a.name}{i<second.length-1?" ·":""}&nbsp;
                </span>
              ))}
            </div>
          )}

          {/* Thin rule */}
          <div style={{height:1,background:"rgba(245,240,232,0.1)",margin:"8px 20px"}}/>

          {/* Smaller stage */}
          {smaller.length>0&&(
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"1px 8px",padding:"2px 16px 4px"}}>
              {smaller.map((a,i)=>(
                <span key={a.id} style={{fontSize:10,fontWeight:600,color:DIM,letterSpacing:"0.05em",textTransform:"uppercase"}}>
                  {a.name}{i<smaller.length-1?" ·":""}&nbsp;
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div style={{height:1,background:ORANGE,margin:"10px 20px 0",opacity:0.5}}/>
          <div style={{padding:"8px 16px 10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:8,fontWeight:900,letterSpacing:"0.3em",color:DIM,textTransform:"uppercase"}}>festivalbossgame.com</div>
            <div style={{fontSize:9,fontWeight:900,color:tier.color,letterSpacing:"0.15em",textTransform:"uppercase"}}>{tier.poster}</div>
          </div>

          {/* Bottom stripe */}
          <div style={{height:8,background:ORANGE}}/>
        </div>
      </div>

      {/* SHARE */}
      <div style={{background:SURFACE,padding:"14px",marginBottom:12,border:"1px solid "+BORDER,borderRadius:3}}>
        <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.14em",color:DIM,marginBottom:10,textAlign:"center"}}>Share your festival</div>
        <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
          <SBtn onClick={onTweet}>X Post</SBtn>
          <SBtn onClick={onFb}>Facebook</SBtn>
          <SBtn onClick={onWhatsApp}>WhatsApp</SBtn>
          <SBtn onClick={onShare}>Share</SBtn>
          <SBtn onClick={onCopy} hi={copied}>{copied?"Copied!":"Copy"}</SBtn>
        </div>
        <button onClick={downloadPoster} style={{marginTop:10,width:"100%",background:ORANGE,border:"none",color:BG,fontWeight:900,fontSize:13,padding:"11px 0",cursor:"pointer",fontFamily:"inherit",letterSpacing:"0.08em",textTransform:"uppercase",borderRadius:3}}>
          Download Poster Image
        </button>
      </div>

      {/* AD SLOT — activate when AdSense approved */}
      {false&&<div id="adsense-results" style={{width:"100%",marginBottom:14}}/>}

      <Footer onLegal={onLegal} onAbout={onAbout}/>
      <div style={{textAlign:"center",padding:"0 0 8px"}}>
        <a href="https://www.skiddle.com/festivals/?sktag=15726" target="_blank" rel="noopener noreferrer" style={{color:DIM,fontSize:11,textDecoration:"none"}}>🎪 buy real festival tickets</a>
      </div>
      <div style={{textAlign:"center",padding:"0 0 24px"}}>
        <a href="https://ko-fi.com/festivalboss" target="_blank" rel="noopener noreferrer" style={{color:DIM,fontSize:11,textDecoration:"none"}}>☕ enjoyed it? buy me a coffee</a>
      </div>
    </div>
  );
}

// ─── LEGAL ───────────────────────────────────────────────────
function Legal({type,onBack}){
  const isT=type==="terms";
  const cl=(h,children)=>(
    <div style={{marginBottom:18}}>
      <div style={{color:ORANGE,fontWeight:700,fontSize:13,marginBottom:5}}>{h}</div>
      <p style={{color:MID,fontSize:13,lineHeight:1.75,margin:0}}>{children}</p>
    </div>
  );
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",justifyContent:"center",padding:"32px 16px 60px"}}>
      <div style={{background:SURFACE,border:"1px solid "+BORDER,padding:"28px 24px",width:"100%",maxWidth:560,borderRadius:4}}>
        <button style={{background:"none",border:"none",color:MID,cursor:"pointer",fontSize:13,padding:0,fontFamily:"inherit",marginBottom:18,display:"block"}} onClick={onBack}>Back</button>
        <h2 style={{fontSize:22,fontWeight:900,color:CREAM,marginBottom:4,fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif"}}>{isT?"Terms and Conditions":"Privacy Policy"}</h2>
        <p style={{color:DIM,fontSize:12,marginBottom:22}}>Last updated: June 2026 · festivalbossgame.com</p>
        {isT?<>
          {cl("1. Nature of the game","Festival Boss is a free browser-based entertainment game. Fiction for amusement only. No real festival is organised.")}
          {cl("2. Artist names","Artist names are used for fictional game purposes only and do not imply endorsement. All trademarks remain property of their owners.")}
          {cl("3. Fictional data","All fees, draw ratings, and figures are entirely invented for game balance.")}
          {cl("4. No transactions","No real money involved. No purchase required.")}
          {cl("5. Intellectual property","Festival Boss code, design, and branding are protected.")}
          {cl("6. Advertising","We display third-party ads. We do not endorse advertised products.")}
          {cl("7. Age","Intended for users aged 13 and over.")}
          {cl("8. Governing law","Laws of England and Wales.")}
          {cl("9. Contact","festivalboss.game@mail.com")}
        </>:<>
          {cl("1. Who we are","Festival Boss at festivalbossgame.com. We comply with UK GDPR.")}
          {cl("2. Data","We do not store your festival name or lineup. No account required.")}
          {cl("3. Cookies","We may use anonymised analytics. You can disable cookies in your browser.")}
          {cl("4. Ads","Third-party ad networks may use cookies. Opt out at adssettings.google.com.")}
          {cl("5. Your rights","Contact festivalboss.game@mail.com or ico.org.uk for GDPR rights.")}
        </>}
        <button style={{width:"100%",marginTop:8,background:"transparent",border:"1px solid "+BORDER_HI,color:CREAM,fontWeight:700,fontSize:14,padding:"12px 0",cursor:"pointer",fontFamily:"inherit",borderRadius:3}} onClick={onBack}>Close</button>
      </div>
    </div>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────
function About({onBack,onLegal}){
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 16px 0"}}>
      <div style={{background:SURFACE,border:"1px solid "+BORDER,borderRadius:4,padding:"28px 24px",width:"100%",maxWidth:560,marginBottom:0}}>
        <button style={{background:"none",border:"none",color:MID,cursor:"pointer",fontSize:13,padding:0,fontFamily:"inherit",marginBottom:18,display:"block"}} onClick={onBack}>Back to game</button>
        <h1 style={{fontSize:26,fontWeight:900,color:CREAM,margin:0,fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif"}}>Festival Boss</h1>
        <p style={{color:MID,fontSize:13,margin:"4px 0 20px"}}>The festival booking game</p>
        {[
          ["What is it?","A free browser game where you take on the role of festival promoter. Book acts across three stages and try to turn a profit. Most players don't on their first attempt."],
          ["How to play","You have "+MAX_SPINS+" spins to fill "+TOTAL_SLOTS+" slots. Main Stage (3 slots, 100% revenue), Second Stage (4 slots, 65%), Smaller Stage (3 slots, 35%). Budget is £"+BUDGET+"m. Break even to survive — £4.0m+ for the holy grail: Sold Out."],
          ["The artists","Over 200 real musicians from UK festival history. All fees and draw ratings are fictional, invented for game balance only."],
          ["Contact","festivalboss.game@mail.com"],
        ].map(([t,c])=>(
          <div key={t} style={{marginBottom:20}}>
            <div style={{color:ORANGE,fontWeight:700,fontSize:14,marginBottom:6}}>{t}</div>
            <p style={{color:MID,fontSize:13,lineHeight:1.75,margin:0}}>{c}</p>
          </div>
        ))}
        <div style={{display:"flex",gap:10,marginTop:24,flexWrap:"wrap"}}>
          <button style={{flex:1,background:"transparent",border:"1px solid "+BORDER_HI,color:CREAM,fontWeight:700,fontSize:13,padding:"10px 0",cursor:"pointer",fontFamily:"inherit",borderRadius:3}} onClick={()=>onLegal("terms")}>Terms and Conditions</button>
          <button style={{flex:1,background:"transparent",border:"1px solid "+BORDER_HI,color:CREAM,fontWeight:700,fontSize:13,padding:"10px 0",cursor:"pointer",fontFamily:"inherit",borderRadius:3}} onClick={()=>onLegal("privacy")}>Privacy Policy</button>
        </div>
      </div>
      <Footer onLegal={onLegal} onAbout={()=>{}} minimal/>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────
function Footer({onLegal,onAbout,minimal}){
  return(
    <footer style={{background:SURFACE,borderTop:"1px solid "+BORDER,marginTop:32,padding:"24px 16px 32px",width:"100%"}}>
      <div style={{maxWidth:540,margin:"0 auto"}}>
        <div style={{marginBottom:12}}>
          <span style={{color:CREAM,fontWeight:700,fontSize:15,display:"block"}}>Festival Boss</span>
          <span style={{color:DIM,fontSize:11,marginTop:2,display:"block"}}>The festival booking game</span>
        </div>
        {!minimal&&(
          <div style={{display:"flex",gap:16,flexWrap:"wrap",marginBottom:14}}>
            <button onClick={onAbout} style={{background:"none",border:"none",color:MID,fontSize:12,cursor:"pointer",fontFamily:"inherit",padding:0}}>About</button>
            <button onClick={()=>onLegal("terms")} style={{background:"none",border:"none",color:MID,fontSize:12,cursor:"pointer",fontFamily:"inherit",padding:0}}>Terms and Conditions</button>
            <button onClick={()=>onLegal("privacy")} style={{background:"none",border:"none",color:MID,fontSize:12,cursor:"pointer",fontFamily:"inherit",padding:0}}>Privacy Policy</button>
            <a href="mailto:festivalboss.game@mail.com" style={{color:MID,fontSize:12,textDecoration:"none"}}>Contact</a>
          </div>
        )}
        <p style={{color:FAINT,fontSize:11,lineHeight:1.6,margin:0}}>Festival Boss is a free entertainment game. Artist names are fictional use only. All fees and figures invented. Copyright {new Date().getFullYear()} Festival Boss.</p>
      </div>
    </footer>
  );
}

// ─── ADS ─────────────────────────────────────────────────────
function CarbonAd(){
  return(
    <div style={{marginTop:12}}>
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",border:"1px solid "+BORDER,borderRadius:3,opacity:0.6}}>
        <span style={{fontSize:7,fontWeight:700,textTransform:"uppercase",color:DIM,background:CARD,padding:"1px 4px",borderRadius:2,flexShrink:0}}>Ad</span>
        <span style={{color:DIM,fontSize:11}}>Carbon Ads will appear here once approved</span>
      </div>
    </div>
  );
}

export function CookieBanner({onAccept,onDecline}){
  return(
    <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:9999,padding:"0 16px 16px"}}>
      <div style={{background:SURFACE,border:"1px solid "+BORDER_HI,borderRadius:12,padding:"16px",maxWidth:600,margin:"0 auto",boxShadow:"0 -4px 24px rgba(0,0,0,0.4)"}}>
        <div style={{marginBottom:14}}>
          <strong style={{color:CREAM}}>We use cookies</strong>
          <p style={{color:MID,fontSize:12,lineHeight:1.6,margin:"6px 0 0"}}>Analytics and advertising cookies. No personal data collected.</p>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button style={{flex:1,background:ORANGE,border:"none",color:BG,fontWeight:700,fontSize:13,padding:"10px 0",borderRadius:7,cursor:"pointer",fontFamily:"inherit"}} onClick={onAccept}>Accept all</button>
          <button style={{flex:1,background:"transparent",border:"1px solid "+BORDER_HI,color:CREAM,fontWeight:700,fontSize:13,padding:"10px 0",cursor:"pointer",fontFamily:"inherit",borderRadius:7}} onClick={onDecline}>Essential only</button>
        </div>
      </div>
    </div>
  );
}
