
import { useState } from "react";

// ─────────────────────────────────────────────────────────────
// FESTIVAL BOSS — maximalist festival poster
// WHITE canvas. Bold overlapping type. Multiple loud colours.
// Looks like a real Glastonbury / Reading bill stuck on a wall.
// Absolutely NO dark mode. This is ink on paper, not a screen.
// ─────────────────────────────────────────────────────────────

const C = {
  // Canvas — paper white
  bg:        "#ffffff",
  surface:   "#f5f0e8",   // aged cream
  card:      "#faf6ee",   // card cream
  ink:       "#0a0a0a",   // near-black ink

  // Type hierarchy
  text:      "#0a0a0a",
  textMid:   "#4a4a4a",
  textDim:   "#999999",
  textFaint: "#cccccc",

  // Bold poster colours — all work on white
  red:       "#e8191f",   // classic festival red
  redDim:    "rgba(232,25,31,0.1)",
  blue:      "#0038a8",   // deep poster blue
  blueDim:   "rgba(0,56,168,0.1)",
  orange:    "#f47920",   // warm festival orange
  orangeDim: "rgba(244,121,32,0.1)",
  purple:    "#7b2d8b",   // psychedelic purple
  purpleDim: "rgba(123,45,139,0.1)",
  green:     "#1a7a3c",   // forest green
  greenDim:  "rgba(26,122,60,0.1)",
  yellow:    "#ffd400",   // bright poster yellow
  yellowDim: "rgba(255,212,0,0.15)",

  // Semantic
  win:       "#1a7a3c",
  winDim:    "rgba(26,122,60,0.1)",
  loss:      "#e8191f",
  lossDim:   "rgba(232,25,31,0.1)",

  border:    "rgba(10,10,10,0.12)",
  borderHi:  "rgba(10,10,10,0.25)",
  borderBold:"rgba(10,10,10,0.8)",
};


// ─── ARTIST DB ───────────────────────────────────────────────
const ALL_ARTISTS = [
  // HEADLINERS
  {id:1,  name:"Radiohead",            fee:2.2,  draw:9.8, genre:"Alt Rock",        tier:"Headliner"},
  {id:2,  name:"Beyoncé",              fee:4.5,  draw:10.0,genre:"Pop / R&B",       tier:"Headliner"},
  {id:3,  name:"The Rolling Stones",   fee:5.5,  draw:9.5, genre:"Rock",            tier:"Headliner"},
  {id:4,  name:"Coldplay",             fee:3.5,  draw:9.7, genre:"Pop Rock",        tier:"Headliner"},
  {id:5,  name:"Adele",                fee:4.0,  draw:9.9, genre:"Pop",             tier:"Headliner"},
  {id:6,  name:"Taylor Swift",         fee:5.0,  draw:10.0,genre:"Pop",             tier:"Headliner"},
  {id:7,  name:"Foo Fighters",         fee:2.8,  draw:9.3, genre:"Rock",            tier:"Headliner"},
  {id:8,  name:"Arctic Monkeys",       fee:2.6,  draw:9.4, genre:"Indie Rock",      tier:"Headliner"},
  {id:9,  name:"Jay-Z",                fee:3.2,  draw:9.1, genre:"Hip-Hop",         tier:"Headliner"},
  {id:10, name:"Kendrick Lamar",       fee:3.8,  draw:9.6, genre:"Hip-Hop",         tier:"Headliner"},
  {id:11, name:"Blur",                 fee:2.4,  draw:9.0, genre:"Britpop",         tier:"Headliner"},
  {id:12, name:"Muse",                 fee:2.5,  draw:9.2, genre:"Alt Rock",        tier:"Headliner"},
  {id:13, name:"David Bowie",          fee:3.0,  draw:9.9, genre:"Rock",            tier:"Headliner"},
  {id:14, name:"Eminem",               fee:3.6,  draw:9.5, genre:"Hip-Hop",         tier:"Headliner"},
  {id:15, name:"Bruce Springsteen",    fee:3.2,  draw:9.3, genre:"Rock",            tier:"Headliner"},
  {id:16, name:"The Who",              fee:2.8,  draw:9.0, genre:"Rock",            tier:"Headliner"},
  {id:17, name:"Paul McCartney",       fee:3.5,  draw:9.8, genre:"Rock",            tier:"Headliner"},
  {id:18, name:"Elton John",           fee:3.8,  draw:9.7, genre:"Pop / Rock",      tier:"Headliner"},
  {id:19, name:"Guns N' Roses",        fee:3.4,  draw:9.2, genre:"Rock",            tier:"Headliner"},
  {id:20, name:"The Prodigy",          fee:1.8,  draw:8.8, genre:"Electronic",      tier:"Headliner"},
  {id:21, name:"Chemical Brothers",   fee:1.6,  draw:8.5, genre:"Electronic",      tier:"Headliner"},
  {id:22, name:"Dua Lipa",             fee:3.0,  draw:9.4, genre:"Pop",             tier:"Headliner"},
  {id:23, name:"Ed Sheeran",           fee:4.2,  draw:9.8, genre:"Pop",             tier:"Headliner"},
  {id:24, name:"Gorillaz",             fee:2.2,  draw:9.0, genre:"Alternative",     tier:"Headliner"},
  {id:25, name:"Stormzy",              fee:2.0,  draw:8.9, genre:"Grime",           tier:"Headliner"},
  {id:26, name:"Oasis",                fee:3.8,  draw:9.9, genre:"Britpop",         tier:"Headliner"},
  {id:27, name:"Pulp",                 fee:1.8,  draw:8.7, genre:"Britpop",         tier:"Headliner"},
  {id:28, name:"Neil Young",           fee:2.5,  draw:8.8, genre:"Rock",            tier:"Headliner"},
  {id:29, name:"Arcade Fire",          fee:1.8,  draw:8.6, genre:"Indie",           tier:"Headliner"},
  {id:30, name:"Fleetwood Mac",        fee:3.0,  draw:9.2, genre:"Rock",            tier:"Headliner"},
  {id:176,name:"Green Day",            fee:2.2,  draw:9.0, genre:"Punk Rock",       tier:"Headliner"},
  {id:189,name:"Blur (reunion)",       fee:2.6,  draw:9.3, genre:"Britpop",         tier:"Headliner"},
  // MAIN STAGE
  {id:31, name:"Florence + the Machine",fee:1.4, draw:8.3, genre:"Indie",           tier:"Main Stage"},
  {id:32, name:"Jack White",           fee:1.2,  draw:8.0, genre:"Rock",            tier:"Main Stage"},
  {id:33, name:"The National",         fee:0.9,  draw:7.8, genre:"Indie Rock",      tier:"Main Stage"},
  {id:34, name:"Haim",                 fee:0.8,  draw:7.5, genre:"Pop Rock",        tier:"Main Stage"},
  {id:35, name:"Billie Eilish",        fee:2.4,  draw:9.2, genre:"Pop",             tier:"Main Stage"},
  {id:36, name:"Lizzo",                fee:1.4,  draw:8.4, genre:"Pop / R&B",       tier:"Main Stage"},
  {id:37, name:"Hozier",               fee:1.0,  draw:8.1, genre:"Folk Rock",       tier:"Main Stage"},
  {id:38, name:"Alt-J",                fee:0.9,  draw:7.9, genre:"Indie",           tier:"Main Stage"},
  {id:39, name:"Wolf Alice",           fee:0.7,  draw:7.6, genre:"Alt Rock",        tier:"Main Stage"},
  {id:40, name:"Idles",                fee:0.7,  draw:7.7, genre:"Post-Punk",       tier:"Main Stage"},
  {id:41, name:"LCD Soundsystem",      fee:1.2,  draw:8.0, genre:"Electronic",      tier:"Main Stage"},
  {id:42, name:"Disclosure",           fee:0.9,  draw:7.8, genre:"Electronic",      tier:"Main Stage"},
  {id:43, name:"Massive Attack",       fee:1.1,  draw:8.2, genre:"Trip-Hop",        tier:"Main Stage"},
  {id:44, name:"Portishead",           fee:1.0,  draw:8.0, genre:"Trip-Hop",        tier:"Main Stage"},
  {id:45, name:"The Killers",          fee:2.0,  draw:8.9, genre:"Indie Rock",      tier:"Main Stage"},
  {id:46, name:"Queens of the Stone Age",fee:1.5,draw:8.5, genre:"Rock",            tier:"Main Stage"},
  {id:47, name:"Pearl Jam",            fee:2.4,  draw:9.0, genre:"Grunge",          tier:"Main Stage"},
  {id:48, name:"Nine Inch Nails",      fee:1.8,  draw:8.6, genre:"Industrial",      tier:"Main Stage"},
  {id:49, name:"Frank Ocean",          fee:2.8,  draw:9.0, genre:"R&B",             tier:"Main Stage"},
  {id:50, name:"SZA",                  fee:1.6,  draw:8.7, genre:"R&B",             tier:"Main Stage"},
  {id:51, name:"Limp Bizkit",          fee:1.2,  draw:7.8, genre:"Nu-Metal",        tier:"Main Stage"},
  {id:52, name:"System of a Down",     fee:2.0,  draw:8.8, genre:"Metal",           tier:"Main Stage"},
  {id:53, name:"Metallica",            fee:3.0,  draw:9.3, genre:"Metal",           tier:"Main Stage"},
  {id:54, name:"Slipknot",             fee:1.6,  draw:8.4, genre:"Metal",           tier:"Main Stage"},
  {id:55, name:"Dizzee Rascal",        fee:0.7,  draw:7.5, genre:"Grime",           tier:"Main Stage"},
  {id:56, name:"Skepta",               fee:0.8,  draw:7.7, genre:"Grime",           tier:"Main Stage"},
  {id:57, name:"Dave",                 fee:0.9,  draw:7.9, genre:"Hip-Hop",         tier:"Main Stage"},
  {id:58, name:"Little Simz",          fee:0.7,  draw:7.6, genre:"Hip-Hop",         tier:"Main Stage"},
  {id:59, name:"Rosalía",              fee:1.2,  draw:8.1, genre:"Latin / Alt",     tier:"Main Stage"},
  {id:60, name:"Lana Del Rey",         fee:1.8,  draw:8.7, genre:"Indie Pop",       tier:"Main Stage"},
  {id:61, name:"Calvin Harris",        fee:1.8,  draw:8.8, genre:"EDM",             tier:"Main Stage"},
  {id:62, name:"Aphex Twin",           fee:1.2,  draw:8.2, genre:"Electronic",      tier:"Main Stage"},
  {id:63, name:"Daft Punk",            fee:3.5,  draw:9.5, genre:"Electronic",      tier:"Main Stage"},
  {id:64, name:"Underworld",           fee:0.9,  draw:7.9, genre:"Electronic",      tier:"Main Stage"},
  {id:65, name:"The Cure",             fee:1.6,  draw:8.5, genre:"Post-Punk",       tier:"Main Stage"},
  {id:66, name:"Depeche Mode",         fee:2.0,  draw:8.8, genre:"Synth-Pop",       tier:"Main Stage"},
  {id:67, name:"New Order",            fee:1.4,  draw:8.3, genre:"Post-Punk",       tier:"Main Stage"},
  {id:68, name:"Pet Shop Boys",        fee:1.2,  draw:8.1, genre:"Synth-Pop",       tier:"Main Stage"},
  {id:69, name:"Suede",                fee:0.8,  draw:7.7, genre:"Britpop",         tier:"Main Stage"},
  {id:70, name:"Primal Scream",        fee:0.9,  draw:7.8, genre:"Rock",            tier:"Main Stage"},
  {id:71, name:"The Libertines",       fee:1.0,  draw:7.9, genre:"Indie Rock",      tier:"Main Stage"},
  {id:72, name:"Amy Winehouse",        fee:1.4,  draw:8.5, genre:"Soul",            tier:"Main Stage"},
  {id:73, name:"Noel Gallagher's HFB", fee:1.4,  draw:8.5, genre:"Rock",            tier:"Main Stage"},
  {id:74, name:"Liam Gallagher",       fee:1.6,  draw:8.7, genre:"Rock",            tier:"Main Stage"},
  {id:75, name:"Sam Fender",           fee:0.9,  draw:8.0, genre:"Indie Rock",      tier:"Main Stage"},
  {id:76, name:"Wet Leg",              fee:0.6,  draw:7.5, genre:"Indie Rock",      tier:"Main Stage"},
  {id:77, name:"Fontaines D.C.",       fee:0.7,  draw:7.7, genre:"Post-Punk",       tier:"Main Stage"},
  {id:78, name:"Jungle",               fee:0.7,  draw:7.6, genre:"Funk / Soul",     tier:"Main Stage"},
  {id:79, name:"Glass Animals",        fee:0.8,  draw:7.8, genre:"Indie",           tier:"Main Stage"},
  {id:80, name:"Róisín Murphy",        fee:0.7,  draw:7.5, genre:"Electronic",      tier:"Main Stage"},
  {id:81, name:"Justice",              fee:0.9,  draw:7.9, genre:"Electronic",      tier:"Main Stage"},
  {id:82, name:"Bonobo",               fee:0.6,  draw:7.3, genre:"Electronic",      tier:"Main Stage"},
  {id:83, name:"Four Tet",             fee:0.7,  draw:7.5, genre:"Electronic",      tier:"Main Stage"},
  {id:84, name:"Jamie xx",             fee:0.7,  draw:7.4, genre:"Electronic",      tier:"Main Stage"},
  {id:85, name:"Robyn",                fee:1.0,  draw:8.0, genre:"Pop / Electronic",tier:"Main Stage"},
  {id:86, name:"Kylie Minogue",        fee:1.6,  draw:8.6, genre:"Pop",             tier:"Main Stage"},
  {id:87, name:"Sam Smith",            fee:1.2,  draw:8.2, genre:"Pop / Soul",      tier:"Main Stage"},
  {id:88, name:"Years & Years",        fee:0.7,  draw:7.4, genre:"Pop / Electronic",tier:"Main Stage"},
  {id:89, name:"Elbow",                fee:1.0,  draw:7.9, genre:"Indie Rock",      tier:"Main Stage"},
  {id:90, name:"James",                fee:0.7,  draw:7.3, genre:"Indie Rock",      tier:"Main Stage"},
  {id:177,name:"Blink-182",            fee:1.8,  draw:8.7, genre:"Pop Punk",        tier:"Main Stage"},
  {id:178,name:"My Chemical Romance",  fee:2.0,  draw:8.9, genre:"Emo Rock",        tier:"Main Stage"},
  {id:179,name:"Fall Out Boy",         fee:1.2,  draw:8.2, genre:"Pop Punk",        tier:"Main Stage"},
  {id:180,name:"Panic! At the Disco",  fee:1.4,  draw:8.4, genre:"Pop Rock",        tier:"Main Stage"},
  {id:181,name:"twenty one pilots",    fee:1.8,  draw:8.7, genre:"Indie Pop",       tier:"Main Stage"},
  {id:182,name:"Paramore",             fee:1.6,  draw:8.6, genre:"Pop Punk",        tier:"Main Stage"},
  {id:183,name:"Halsey",               fee:1.0,  draw:8.0, genre:"Alt Pop",         tier:"Main Stage"},
  {id:184,name:"Lorde",                fee:1.4,  draw:8.4, genre:"Pop",             tier:"Main Stage"},
  {id:185,name:"Charli XCX",           fee:1.4,  draw:8.5, genre:"Pop",             tier:"Main Stage"},
  {id:186,name:"Olivia Rodrigo",       fee:2.2,  draw:9.1, genre:"Pop",             tier:"Main Stage"},
  {id:195,name:"The Streets",          fee:0.8,  draw:7.8, genre:"Garage / Rap",    tier:"Main Stage"},
  {id:197,name:"Kasabian",             fee:1.2,  draw:8.2, genre:"Indie Rock",      tier:"Main Stage"},
  {id:198,name:"Kaiser Chiefs",        fee:0.9,  draw:7.9, genre:"Indie Rock",      tier:"Main Stage"},
  {id:200,name:"Bloc Party",           fee:0.8,  draw:7.7, genre:"Indie Rock",      tier:"Main Stage"},
  {id:203,name:"Biffy Clyro",          fee:0.9,  draw:7.9, genre:"Alt Rock",        tier:"Main Stage"},
  {id:205,name:"Mumford & Sons",       fee:1.4,  draw:8.4, genre:"Folk Rock",       tier:"Main Stage"},
  {id:215,name:"Grace Jones",          fee:0.8,  draw:7.7, genre:"Funk / Electronic",tier:"Main Stage"},
  {id:216,name:"Kraftwerk",            fee:1.2,  draw:8.1, genre:"Electronic",      tier:"Main Stage"},
  // SECOND STAGE
  {id:91, name:"The xx",               fee:0.9,  draw:7.8, genre:"Indie"},
  {id:92, name:"Daughter",             fee:0.4,  draw:6.9, genre:"Indie Folk"},
  {id:93, name:"Alvvays",              fee:0.35, draw:6.7, genre:"Indie Pop"},
  {id:94, name:"Shame",                fee:0.3,  draw:6.8, genre:"Post-Punk"},
  {id:95, name:"black midi",           fee:0.35, draw:6.9, genre:"Art Rock"},
  {id:96, name:"Squid",                fee:0.3,  draw:6.7, genre:"Post-Punk"},
  {id:97, name:"The Murder Capital",   fee:0.28, draw:6.5, genre:"Post-Punk"},
  {id:98, name:"Yard Act",             fee:0.25, draw:6.6, genre:"Post-Punk"},
  {id:99, name:"Dry Cleaning",         fee:0.28, draw:6.5, genre:"Post-Punk"},
  {id:100,name:"Phoebe Bridgers",      fee:0.8,  draw:7.7, genre:"Indie Folk"},
  {id:101,name:"beabadoobee",          fee:0.4,  draw:7.0, genre:"Indie Pop"},
  {id:102,name:"Grimes",               fee:0.7,  draw:7.3, genre:"Electronic"},
  {id:103,name:"Caroline Polachek",    fee:0.5,  draw:7.1, genre:"Art Pop"},
  {id:104,name:"Arca",                 fee:0.45, draw:6.8, genre:"Electronic"},
  {id:106,name:"Loyle Carner",         fee:0.45, draw:7.1, genre:"Hip-Hop"},
  {id:107,name:"Jorja Smith",          fee:0.7,  draw:7.5, genre:"R&B / Soul"},
  {id:108,name:"Mahalia",              fee:0.35, draw:6.9, genre:"R&B / Soul"},
  {id:109,name:"AJ Tracey",            fee:0.5,  draw:7.2, genre:"Grime / Rap"},
  {id:110,name:"Joy Crookes",          fee:0.35, draw:6.8, genre:"Soul / Pop"},
  {id:111,name:"Self Esteem",          fee:0.4,  draw:7.0, genre:"Alt Pop"},
  {id:112,name:"Pa Salieu",            fee:0.3,  draw:6.6, genre:"Afro-Swing"},
  {id:113,name:"Ghetts",               fee:0.35, draw:6.7, genre:"Grime"},
  {id:114,name:"Kano",                 fee:0.4,  draw:7.0, genre:"Grime"},
  {id:116,name:"M.I.A.",               fee:0.7,  draw:7.6, genre:"Electronic / Rap"},
  {id:117,name:"Diplo",                fee:0.6,  draw:7.4, genre:"Electronic"},
  {id:118,name:"Hot Chip",             fee:0.6,  draw:7.4, genre:"Electronic"},
  {id:119,name:"Friendly Fires",       fee:0.4,  draw:7.0, genre:"Indie / Dance"},
  {id:120,name:"Django Django",        fee:0.35, draw:6.8, genre:"Art Rock"},
  {id:121,name:"Two Door Cinema Club", fee:0.55, draw:7.3, genre:"Indie Rock"},
  {id:122,name:"Everything Everything",fee:0.4,  draw:7.0, genre:"Art Rock"},
  {id:123,name:"Foals",                fee:0.9,  draw:7.9, genre:"Indie Rock"},
  {id:124,name:"The Wombats",          fee:0.5,  draw:7.2, genre:"Indie Rock"},
  {id:125,name:"Bombay Bicycle Club",  fee:0.55, draw:7.3, genre:"Indie Rock"},
  {id:126,name:"Bastille",             fee:0.7,  draw:7.5, genre:"Indie Pop"},
  {id:127,name:"Nothing But Thieves",  fee:0.6,  draw:7.4, genre:"Alt Rock"},
  {id:128,name:"Pale Waves",           fee:0.35, draw:6.9, genre:"Indie Pop"},
  {id:129,name:"YUNGBLUD",             fee:0.5,  draw:7.2, genre:"Punk Pop"},
  {id:131,name:"Frank Turner",         fee:0.5,  draw:7.3, genre:"Folk Punk"},
  {id:132,name:"Enter Shikari",        fee:0.45, draw:7.1, genre:"Post-Hardcore"},
  {id:134,name:"Bring Me the Horizon", fee:1.1,  draw:8.1, genre:"Metal / Pop"},
  {id:135,name:"Architects",           fee:0.55, draw:7.3, genre:"Metalcore"},
  {id:136,name:"Amyl and the Sniffers",fee:0.3,  draw:6.8, genre:"Punk"},
  {id:137,name:"Bob Vylan",            fee:0.25, draw:6.6, genre:"Punk / Grime"},
  {id:138,name:"Rina Sawayama",        fee:0.45, draw:7.0, genre:"Pop / Rock"},
  {id:140,name:"Bicep",                fee:0.7,  draw:7.6, genre:"Electronic"},
  {id:141,name:"Fred again..",         fee:0.9,  draw:8.0, genre:"Electronic"},
  {id:144,name:"Peggy Gou",            fee:0.6,  draw:7.4, genre:"Electronic"},
  {id:145,name:"Honey Dijon",          fee:0.4,  draw:7.0, genre:"Electronic / DJ"},
  {id:148,name:"Skrillex",             fee:1.0,  draw:7.9, genre:"EDM"},
  {id:149,name:"Chase & Status",       fee:0.7,  draw:7.5, genre:"Drum & Bass"},
  {id:150,name:"Rudimental",           fee:0.6,  draw:7.3, genre:"Drum & Bass"},
  {id:172,name:"Khruangbin",           fee:0.7,  draw:7.5, genre:"Global / Psych"},
  {id:192,name:"Caribou",              fee:0.5,  draw:7.1, genre:"Electronic"},
  {id:193,name:"Jon Hopkins",          fee:0.45, draw:7.0, genre:"Electronic"},
  {id:196,name:"Plan B",               fee:0.5,  draw:7.2, genre:"Rap / Soul"},
  {id:199,name:"Razorlight",           fee:0.5,  draw:7.1, genre:"Indie Rock"},
  {id:201,name:"Placebo",              fee:0.6,  draw:7.3, genre:"Alt Rock"},
  {id:206,name:"The Lumineers",        fee:0.7,  draw:7.5, genre:"Folk Rock"},
  {id:207,name:"Laura Marling",        fee:0.5,  draw:7.2, genre:"Folk"},
  {id:208,name:"Sharon Van Etten",     fee:0.4,  draw:7.0, genre:"Indie Folk"},
  {id:209,name:"Big Thief",            fee:0.5,  draw:7.2, genre:"Indie Folk"},
  {id:210,name:"Angel Olsen",          fee:0.4,  draw:7.0, genre:"Indie Folk"},
  {id:211,name:"Weyes Blood",          fee:0.4,  draw:7.0, genre:"Art Pop / Folk"},
  {id:212,name:"Sufjan Stevens",       fee:0.7,  draw:7.4, genre:"Folk / Classical"},
  {id:217,name:"Metronomy",            fee:0.45, draw:7.0, genre:"Indie / Electronic"},
  // SMALLER STAGE — all default to "Smaller Stage" tier
  {id:151,name:"Inhaler",              fee:0.35, draw:7.0, genre:"Indie Rock"},
  {id:153,name:"Manic Street Preachers",fee:0.6, draw:7.3, genre:"Alt Rock"},
  {id:154,name:"Interpol",             fee:0.7,  draw:7.4, genre:"Post-Punk"},
  {id:155,name:"Editors",              fee:0.5,  draw:7.1, genre:"Post-Punk"},
  {id:156,name:"White Lies",           fee:0.35, draw:6.8, genre:"Post-Punk"},
  {id:158,name:"Let's Eat Grandma",    fee:0.2,  draw:6.4, genre:"Art Pop"},
  {id:159,name:"MUNA",                 fee:0.28, draw:6.7, genre:"Indie Pop"},
  {id:160,name:"Soccer Mommy",         fee:0.25, draw:6.5, genre:"Indie Rock"},
  {id:161,name:"Snail Mail",           fee:0.25, draw:6.4, genre:"Indie Rock"},
  {id:162,name:"Lucy Dacus",           fee:0.25, draw:6.5, genre:"Indie Rock"},
  {id:163,name:"Cassandra Jenkins",    fee:0.18, draw:6.2, genre:"Folk"},
  {id:164,name:"Wednesday",            fee:0.18, draw:6.3, genre:"Indie Rock"},
  {id:165,name:"The Smile",            fee:0.6,  draw:7.3, genre:"Alternative"},
  {id:166,name:"Mogwai",               fee:0.4,  draw:7.0, genre:"Post-Rock"},
  {id:167,name:"65daysofstatic",       fee:0.2,  draw:6.3, genre:"Post-Rock"},
  {id:168,name:"Porridge Radio",       fee:0.18, draw:6.3, genre:"Indie Rock"},
  {id:169,name:"Indigo De Souza",      fee:0.18, draw:6.2, genre:"Indie Folk"},
  {id:170,name:"Arlo Parks",           fee:0.4,  draw:7.0, genre:"Indie Pop"},
  {id:173,name:"Black Country New Road",fee:0.4, draw:7.0, genre:"Art Rock"},
  {id:174,name:"Tirzah",               fee:0.2,  draw:6.2, genre:"Electronic"},
  {id:175,name:"Florist",              fee:0.15, draw:6.0, genre:"Folk"},
  {id:202,name:"Feeder",               fee:0.35, draw:6.8, genre:"Alt Rock"},
  {id:218,name:"Wild Beasts",          fee:0.3,  draw:6.7, genre:"Indie Rock"},
  {id:220,name:"Honeyblood",           fee:0.15, draw:6.0, genre:"Indie Rock"},
].map(a=>({...a, tier: a.tier || (a.fee>=0.9?"Second Stage":"Smaller Stage")}));

const ARTISTS = [...new Map(ALL_ARTISTS.map(a=>[a.id,a])).values()];

// ─── GAME CONFIG ─────────────────────────────────────────────
// Budget: £14m. Target: £4m profit after £2m overheads.
// Effective target revenue: £20m+
// 5 spins to fill 10 slots — genuinely difficult.
// Silent genre penalty + tier balance + stage mismatch all bite.
const BUDGET        = 14;    // £14m booking budget
const OVERHEADS     = 2;     // £2m fixed costs (staging/security/infra)
const TICKET_REV    = 22;    // max possible revenue at perfection
const TARGET_PROFIT = 4;     // £4m profit after overheads
const TOTAL_SLOTS   = 10;
const MAX_SPINS     = 5;
const HL_MIN        = 2;
const HAND_SIZE     = 10;

const GENRE_MIN     = 5;     // for About page reference only — genre variety is silent in scoring

// Stage multipliers — harsher than before
const STAGE_MULS = {
  "Main Stage":    1.0,
  "Second Stage":  0.75,
  "Smaller Stage": 0.50,
};

// Ideal stage by tier
const IDEAL_STAGE = {
  "Headliner":     "Main Stage",
  "Main Stage":    "Main Stage",
  "Second Stage":  "Second Stage",
  "Smaller Stage": "Smaller Stage",
};

// Tier balance requirements (Option D)
const TIER_REQUIRED = {
  "Main Stage":    1,   // at least 1
  "Second Stage":  2,   // at least 2
  "Smaller Stage": 2,   // at least 2
};

function calcCost(lu){ return +lu.reduce((s,a)=>s+a.fee,0).toFixed(2); }

function calcRevenue(lu){
  if(!lu.length) return 0;
  const avg = lu.reduce((s,a)=>s+a.draw,0)/lu.length;

  // ── Tier balance check (Option D) ──────────────────────────
  const mainCount    = lu.filter(a=>a.assignedStage==="Main Stage").length;
  const secondCount  = lu.filter(a=>a.assignedStage==="Second Stage").length;
  const smallerCount = lu.filter(a=>a.assignedStage==="Smaller Stage").length;
  const balancedMain    = mainCount    >= TIER_REQUIRED["Main Stage"];
  const balancedSecond  = secondCount  >= TIER_REQUIRED["Second Stage"];
  const balancedSmaller = smallerCount >= TIER_REQUIRED["Smaller Stage"];
  const fullyBalanced   = balancedMain && balancedSecond && balancedSmaller;
  const balanceMul = fullyBalanced ? 1.10 : (balancedMain ? 0.82 : 0.60);

  // ── Headliner cliff ─────────────────────────────────────────
  const hl    = lu.filter(a=>a.tier==="Headliner").length;
  const hMul  = hl>=HL_MIN ? 1.08 : hl===1 ? 0.65 : 0.40;

  // ── Stage assignment score ───────────────────────────────────
  const stageMul = lu.reduce((s,a)=>{
    const ideal    = IDEAL_STAGE[a.tier] || "Second Stage";
    const assigned = a.assignedStage || ideal;
    // Harsh penalties for misplacement
    let match = 1.0;
    if(assigned !== ideal){
      if(assigned==="Smaller Stage") match = 0.50;
      else if(assigned==="Main Stage" && ideal!=="Main Stage") match = 0.72;
      else match = 0.78;
    }
    return s + match;
  }, 0) / lu.length;

  // ── Silent genre penalty (variety bonus) ────────────────────
  const genreCounts = {};
  lu.forEach(a=>{
    genreCounts[a.genre] = (genreCounts[a.genre]||0)+1;
  });
  const maxSameGenre = Math.max(...Object.values(genreCounts));
  const genreMul = maxSameGenre>=4 ? 0.78
                 : maxSameGenre===3 ? 0.91
                 : maxSameGenre===2 ? 1.05
                 : maxSameGenre===1 ? 1.05
                 : 1.0;

  // ── Draw quality ─────────────────────────────────────────────
  const drawMul = avg>=9.0 ? 1.10
                : avg>=8.5 ? 1.03
                : avg>=8.0 ? 0.94
                : avg>=7.5 ? 0.83
                : 0.68;

  // ── Slot fill ────────────────────────────────────────────────
  const slotMul = 0.1 + 0.9*(lu.length/TOTAL_SLOTS);

  // ── Headliner quality ────────────────────────────────────────
  const hlActs = lu.filter(a=>a.tier==="Headliner");
  const hlQual = hlActs.length>0 ? hlActs.reduce((s,a)=>s+a.draw,0)/hlActs.length : 7;
  const qualMul = hlQual>=9.8?1.08 : hlQual>=9.5?1.04 : hlQual>=9.0?1.0 : 0.90;

  const gross = TICKET_REV * hMul * balanceMul * stageMul * genreMul * drawMul * slotMul * qualMul;
  // Overheads always deducted from revenue for display purposes
  return +(gross).toFixed(2);
}

// Total cost includes artist fees + fixed overheads
function calcTotalCost(lu){ return +(calcCost(lu) + OVERHEADS).toFixed(2); }

// ── Tier colour (by ASSIGNED stage) ──────────────────────────
function tCol(t){
  return {Headliner:C.red,"Main Stage":C.blue,"Second Stage":C.purple,"Smaller Stage":C.orange}[t]||C.textMid;
}

// Stage colours
function stageColor(stage){
  return {"Main Stage":C.blue,"Second Stage":C.purple,"Smaller Stage":C.orange}[stage]||C.textMid;
}
function stageBg(stage){
  return {"Main Stage":C.blueDim,"Second Stage":C.purpleDim,"Smaller Stage":C.orangeDim}[stage]||"rgba(0,0,0,0.04)";
}

// ── Formatters ───────────────────────────────────────────────
function fmt(v){
  const a=Math.abs(v);
  if(a===0) return "£0m";
  return `£${a>=1?a.toFixed(1):a.toFixed(2).replace(/\.?0+$/,"")}m`;
}
function fmtS(v){return `${v>=0?"+":"−"}${fmt(v)}`;}

// ── Share ────────────────────────────────────────────────────
function shareText(n,res,lu){
  const hls=lu.filter(a=>a.tier==="Headliner").map(a=>a.name).join(", ")||"none";
  return `🎪 ${n} — Festival Boss\nHeadliners: ${hls}\nRevenue: ${fmt(res.revenue)}  Costs: ${fmt(res.totalCost)}\n${res.win?"✅":"❌"} ${fmtS(res.profit)}\nCan you beat it? → festivalbossgame.com`;
}
async function doCopy(t){try{await navigator.clipboard.writeText(t);return true;}catch{return false;}}
function doTweet(t){window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}`,"_blank");}
function doFb(){window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://festivalbossgame.com")}`,"_blank");}

// ── Spin / deal hand ─────────────────────────────────────────
function dealHand(usedIds){
  const maxCards = 10;
  const available = ARTISTS.filter(a=>!usedIds.includes(a.id));
  if(available.length <= maxCards) return available;
  const shuffle = arr=>[...arr].sort(()=>Math.random()-0.5);
  const headliners  = shuffle(available.filter(a=>a.tier==="Headliner"));
  const mainStage   = shuffle(available.filter(a=>a.tier==="Main Stage"));
  const secondStage = shuffle(available.filter(a=>a.tier==="Second Stage"));
  const smaller     = shuffle(available.filter(a=>a.tier==="Smaller Stage"));
  const hand = [
    ...headliners.slice(0,2),
    ...mainStage.slice(0,2),
    ...secondStage.slice(0,3),
    ...smaller.slice(0,2),
  ];
  const handIds = new Set(hand.map(a=>a.id));
  const rest = shuffle(available.filter(a=>!handIds.has(a.id)));
  while(rest.length > 0 && hand.length !== maxCards) hand.push(rest.pop());
  return shuffle(hand).slice(0, maxCards);
}


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
  const [picking,   setPicking]   = useState(null);  // stage picker modal
  const [drawerOpen,setDrawerOpen]= useState(false); // mobile lineup drawer

  const spent      = calcCost(lineup);
  const rem        = +(BUDGET - spent).toFixed(2);
  const revenue    = calcRevenue(lineup);
  const totalCost  = calcTotalCost(lineup);
  const profit     = +(revenue - totalCost).toFixed(2);
  const hlCount    = lineup.filter(a=>a.tier==="Headliner").length;
  const full       = lineup.length >= TOTAL_SLOTS;

  // Tier balance status
  const mainCount    = lineup.filter(a=>a.assignedStage==="Main Stage").length;
  const secondCount  = lineup.filter(a=>a.assignedStage==="Second Stage").length;
  const smallerCount = lineup.filter(a=>a.assignedStage==="Smaller Stage").length;

  // Genre variety status (for hint display)
  const genreCounts  = {};
  lineup.forEach(a=>{ genreCounts[a.genre]=(genreCounts[a.genre]||0)+1; });
  const maxSameGenre = lineup.length > 0 ? Math.max(...Object.values(genreCounts)) : 0;
  const varietyGood  = maxSameGenre <= 2;

  function spin(){
    if(spinsLeft<=0||full||spinning) return;
    setSpinning(true);
    setTimeout(()=>{
      setHand(dealHand(lineup.map(a=>a.id)));
      setSpinsLeft(p=>p-1);
      setSpinning(false);
    }, 500);
  }

  function pickAct(artist){
    if(full||rem<artist.fee-0.001) return;
    setPicking(artist);
  }

  function assignStage(stage){
    if(!picking) return;
    setLineup(p=>[...p,{...picking, assignedStage:stage}]);
    setHand(p=>p.filter(a=>a.id!==picking.id));
    setPicking(null);
  }

  function removeAct(id){ setLineup(p=>p.filter(a=>a.id!==id)); }

  function submit(){
    // Name festival after booking — go to naming screen
    setScreen("name");
  }

  function finalise(){
    const cost=calcCost(lineup), rev=calcRevenue(lineup), tc=calcTotalCost(lineup), pnl=+(rev-tc).toFixed(2);
    setResult({revenue:rev, cost:tc, profit:pnl, artistCost:cost, win:pnl>=TARGET_PROFIT&&hlCount>=HL_MIN});
    setScreen("result");
  }

  function reset(){
    setLineup([]);setHand([]);setSpinsLeft(MAX_SPINS);
    setResult(null);setCopied(false);setPicking(null);setName("");setScreen("game");
  }

  if(legal)             return <Legal    type={legal} onBack={()=>setLegal(null)}/>;
  if(screen==="about")  return <About    onBack={()=>setScreen("home")} onLegal={setLegal}/>;
  if(screen==="home")   return <HomeScreen onStart={()=>setScreen("game")} onLegal={setLegal} onAbout={()=>setScreen("about")}/>;
  if(screen==="name")   return <NameScreen name={name} setName={setName} lineup={lineup} onConfirm={finalise} onBack={()=>setScreen("game")}/>;
  if(screen==="result") return(
    <Result
      result={result} lineup={lineup} name={name||"My Festival"}
      onReset={reset} onHome={()=>setScreen("home")}
      copied={copied}
      onCopy={async()=>{const ok=await doCopy(shareText(name||"My Festival",result,lineup));setCopied(ok);}}
      onTweet={()=>doTweet(shareText(name||"My Festival",result,lineup))}
      onFb={doFb}
      onLegal={setLegal} onAbout={()=>setScreen("about")}
    />
  );

  const budPct  = Math.min((spent/BUDGET)*100,100);
  const slotPct = (lineup.length/TOTAL_SLOTS)*100;

  return(
    <div style={s.app}>
      <style>{`
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:${C.surface}}
        ::-webkit-scrollbar-thumb{background:${C.textDim};border-radius:2px}
        @keyframes spinAnim{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes deal{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(200,241,53,0.4)}50%{box-shadow:0 0 0 12px rgba(200,241,53,0)}}
      `}</style>

      {/* STAGE PICKER MODAL */}
      {picking&&(
        <div style={gm.overlay}>
          <div style={gm.modal}>
            <div style={gm.modalName}>{picking.name}</div>
            <div style={gm.modalSub}>Which stage are they playing?</div>
            <div style={gm.modalFee}>{fmt(picking.fee)} · Draw {picking.draw} · {picking.genre}</div>
            {Object.keys(STAGE_MULS).map(stage=>{
              const isIdeal = stage===IDEAL_STAGE[picking.tier];
              return(
                <button key={stage} style={{...gm.stageBtn, borderColor:stageColor(stage)+(isIdeal?"cc":"44"), background:isIdeal?stageBg(stage):"transparent"}} onClick={()=>assignStage(stage)}>
                  <span style={{color:stageColor(stage),fontWeight:700,fontSize:14}}>{stage}</span>
                  <span style={gm.stageMulTxt}>{isIdeal?"✓ Perfect fit":"⚠ Revenue penalty"}</span>
                </button>
              );
            })}
            <button style={gm.cancelBtn} onClick={()=>setPicking(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header style={s.hdr}>
        <div style={s.brand}>
          <span style={s.brandF}>F</span>
          <div style={s.brandText}>
            <span style={s.brandTitle}>Festival Boss</span>
          </div>
        </div>
        <div style={s.kpis}>
          <Kpi l="Budget" v={fmt(rem)}                          c={rem<2?C.red:'#fff'}/>
          <div style={s.kdiv}/>
          <Kpi l="Acts"   v={`${lineup.length}/${TOTAL_SLOTS}`} c={full?C.yellow:'#fff'}/>
          <div style={s.kdiv}/>
          <Kpi l="Spins"  v={spinsLeft}                         c={spinsLeft<=1?C.yellow:'#fff'}/>
          <div style={s.kdiv}/>
          <Kpi l="P&L"    v={fmtS(profit)}                     c={profit>=TARGET_PROFIT?C.yellow:C.red}/>
        </div>
      </header>

      {/* RAILS */}
      <div style={s.railWrap}>
        <div style={s.rail}><div style={{...s.railFill,width:`${budPct}%`,background:rem<2?C.red:C.green}}/></div>
        <div style={s.rail}><div style={{...s.railFill,width:`${slotPct}%`,background:C.blue}}/></div>
      </div>

      {/* ── MOBILE-FIRST LAYOUT ──
          On mobile: single column — spin top, cards below, drawer floats at bottom.
          On desktop (≥680px): side-by-side via CSS class override.
      */}
      <style>{`
        @media(min-width:680px){
          .fb-body{ flex-direction:row!important; height:calc(100vh - 74px)!important; overflow:hidden!important; }
          .fb-sidebar{ display:flex!important; position:static!important; transform:none!important; height:auto!important; max-height:none!important; border-top:none!important; box-shadow:none!important; z-index:auto!important; width:300px!important; min-width:260px!important; border-right:3px solid #0a0a0a!important; overflow:hidden!important; flex-shrink:0!important; }
          .fb-drawer-btn{ display:none!important; }
          .fb-main{ overflow-y:auto!important; flex:1!important; }
        }
      `}</style>

      <div className="fb-body" style={gm.body}>

        {/* DESKTOP SIDEBAR / MOBILE DRAWER */}
        <aside
          className="fb-sidebar"
          style={{
            ...gm.sidebar,
            display:"none", // hidden on mobile by default; shown via drawer state
            ...(drawerOpen ? {display:"flex"} : {}),
          }}
        >
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 14px 10px",borderBottom:`2px solid ${C.ink}`,marginBottom:8}}>
            <div style={s.panelLabel2}>My Lineup</div>
            <button style={gm.drawerClose} onClick={()=>setDrawerOpen(false)}>✕ Close</button>
          </div>
          <div style={gm.lineupScroll}>
            {lineup.length===0&&<p style={s.sideEmpty}>Spin to get your first acts</p>}
            {lineup.map(a=>(
              <div key={a.id} style={{...gm.lineupRow, borderLeftColor:stageColor(a.assignedStage)}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={s.aName}>{a.name}</div>
                  <div style={s.aMeta}>
                    <span style={{...s.pill, background:stageBg(a.assignedStage), color:stageColor(a.assignedStage)}}>{a.assignedStage}</span>
                    <span style={s.aGenre}>{a.genre}</span>
                  </div>
                </div>
                <div style={s.aRight}>
                  <span style={{color:stageColor(a.assignedStage),fontWeight:800,fontSize:12}}>{fmt(a.fee)}</span>
                  <button style={s.xBtn} onClick={()=>removeAct(a.id)}>✕</button>
                </div>
              </div>
            ))}
          </div>

          {/* CHECKLIST */}
          <div style={gm.checkBox}>
            <Chk ok={hlCount>=HL_MIN}                              t={`${hlCount}/${HL_MIN} headliners`}/>
            <Chk ok={mainCount>=TIER_REQUIRED["Main Stage"]}       t={`${mainCount}/${TIER_REQUIRED["Main Stage"]} Main Stage`}/>
            <Chk ok={secondCount>=TIER_REQUIRED["Second Stage"]}   t={`${secondCount}/${TIER_REQUIRED["Second Stage"]} Second Stage`}/>
            <Chk ok={smallerCount>=TIER_REQUIRED["Smaller Stage"]} t={`${smallerCount}/${TIER_REQUIRED["Smaller Stage"]} Smaller Stage`}/>
            <Chk ok={varietyGood}                                  t={varietyGood?"Good genre variety":"Too many same genre"}/>
            <Chk ok={full}                                         t={`${lineup.length}/${TOTAL_SLOTS} slots filled`}/>
            <div style={gm.pnlLine}/>
            <div style={{fontSize:11,color:C.textDim,marginBottom:6}}>Incl. £{OVERHEADS}m overheads</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:C.textMid,fontSize:12}}>Projected P&L</span>
              <span style={{color:profit>=TARGET_PROFIT?C.green:C.red,fontWeight:900,fontSize:18}}>{fmtS(profit)}</span>
            </div>
          </div>

          {full&&(
            <button style={gm.releaseBtn} onClick={()=>{setDrawerOpen(false);submit();}}>
              Name &amp; Release Lineup →
            </button>
          )}
          <Ad text="🎟 Ticketmaster — sell out in seconds"/>
        </aside>

        {/* MAIN SPIN AREA */}
        <main className="fb-main" style={gm.main}>

          {/* SPIN BUTTON — always visible at top */}
          <div style={gm.spinWrap}>
            <button
              style={{
                ...gm.spinBtn,
                opacity:(spinsLeft<=0||full)?0.25:1,
                cursor:(spinsLeft<=0||full)?"not-allowed":"pointer",
                animation:spinning?"spinAnim 0.5s linear infinite":"none",
              }}
              onClick={spin}
              disabled={spinsLeft<=0||full||spinning}
            >⟳</button>
            <div style={gm.spinLabel}>
              {full?"Lineup full!"
                :spinsLeft<=0?"No spins left"
                :hand.length===0?"Tap to spin your first acts"
                :`${spinsLeft} spin${spinsLeft!==1?"s":""} remaining`}
            </div>
            {hand.length>0&&!full&&(
              <div style={gm.spinHint}>Pick one · or spin again for a new hand</div>
            )}
          </div>

          {/* DEALT CARDS — 2-col on mobile, auto-fill on desktop */}
          {hand.length>0&&!full&&(
            <div style={gm.hand}>
              {hand.map((a,i)=>{
                const canAfford = rem>=a.fee-0.001;
                return(
                  <div key={a.id}
                    style={{
                      ...gm.actCard,
                      opacity:canAfford?1:0.25,
                      cursor:canAfford?"pointer":"not-allowed",
                      borderTop:`3px solid ${tCol(a.tier)}`,
                      animationDelay:`${i*0.04}s`,
                    }}
                    onClick={()=>canAfford&&pickAct(a)}
                  >
                    <div style={{color:tCol(a.tier),fontSize:8,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4}}>{a.tier}</div>
                    <div style={gm.actName}>{a.name}</div>
                    <div style={gm.actGenre}>{a.genre}</div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginTop:6}}>
                      <span style={{color:tCol(a.tier),fontWeight:900,fontSize:13}}>{fmt(a.fee)}</span>
                      <span style={{color:C.textDim,fontSize:10}}>Draw {a.draw}</span>
                    </div>
                    {!canAfford&&<div style={{fontSize:9,color:C.red,fontWeight:700,marginTop:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Over budget</div>}
                  </div>
                );
              })}
            </div>
          )}

          {hand.length===0&&!full&&(
            <div style={gm.emptyState}>
              <div style={{fontSize:64,marginBottom:12,opacity:0.25,fontFamily:"serif"}}>⟳</div>
              <div style={{color:C.textMid,fontSize:16,fontWeight:700,fontFamily:"'Georgia',serif"}}>Hit spin to get your acts</div>
              <div style={{color:C.textDim,fontSize:12,marginTop:8}}>{MAX_SPINS} spins · {TOTAL_SLOTS} slots · £{BUDGET}m budget</div>
              <div style={{color:C.textDim,fontSize:11,marginTop:4}}>Need {fmt(TARGET_PROFIT)}+ profit to win</div>
            </div>
          )}

          {/* Spacer so content clears the floating drawer button */}
          <div style={{height:80}}/>
        </main>
      </div>

      {/* FLOATING DRAWER BUTTON — mobile only, always visible */}
      <button
        className="fb-drawer-btn"
        style={{
          ...gm.drawerBtn,
          background: full ? C.green : C.ink,
        }}
        onClick={()=>{ if(full){ setDrawerOpen(false); submit(); } else setDrawerOpen(p=>!p); }}
      >
        {full
          ? "🚀 Name & Release Lineup →"
          : `🎤 My Lineup (${lineup.length}/${TOTAL_SLOTS})  ${drawerOpen?"▼":"▲"}`
        }
      </button>
    </div>
  );
}


// ─── MINI COMPONENTS ─────────────────────────────────────────
function Kpi({l,v,c}){
  return(
    <div style={{textAlign:"center"}}>
      <div style={{color:c,fontWeight:900,fontSize:16,letterSpacing:"-0.3px",fontFamily:"'Georgia',serif"}}>{v}</div>
      <div style={{color:"rgba(255,255,255,0.6)",fontSize:9,textTransform:"uppercase",letterSpacing:"0.1em",marginTop:1}}>{l}</div>
    </div>
  );
}
function Chk({ok,t}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:7,fontSize:11,color:ok?C.green:C.textDim,marginTop:4}}>
      <span style={{
        width:14,height:14,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",
        background:ok?C.green:"transparent",border:`2px solid ${ok?C.green:C.textFaint}`,
        fontSize:9,color:"#fff",fontWeight:900,
      }}>{ok?"✓":""}</span>
      {t}
    </div>
  );
}
function Ad({text}){
  return(
    <div style={{margin:"10px 12px 0",padding:"6px 10px",border:`1px dashed ${C.border}`,display:"flex",gap:7,alignItems:"center"}}>
      <span style={{fontSize:8,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:C.textDim,background:C.surface,padding:"1px 4px",flexShrink:0}}>Ad</span>
      <span style={{fontSize:11,color:C.textMid}}>{text}</span>
    </div>
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────
function HomeScreen({onStart,onLegal,onAbout}){
  return(
    <div style={h.page}>
      <style>{`
        @keyframes deal{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spinAnim{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>

      {/* BIG POSTER TITLE */}
      <div style={h.heroWrap}>
        {/* Coloured stripe */}
        <div style={h.stripe}/>
        <div style={h.poster}>
          <span style={h.line1}>Festival</span>
          <span style={h.line2}>Boss</span>
        </div>
        <div style={h.tagline}>Spin the acts · Book the lineup · Turn a profit</div>
      </div>

      {/* RULES CARD */}
      <div style={h.card}>
        <div style={{fontWeight:900,fontSize:11,letterSpacing:"0.2em",textTransform:"uppercase",color:C.textMid,marginBottom:14,borderBottom:`2px solid ${C.ink}`,paddingBottom:8}}>How to play</div>
        <div style={h.rulesGrid}>
          <RuleItem icon="⟳"  label={`${MAX_SPINS} spins`}       desc="to fill your lineup" col={C.red}/>
          <RuleItem icon="💷" label={`£${BUDGET}m budget`}       desc="inc. £2m overheads"  col={C.blue}/>
          <RuleItem icon="🎤" label={`${TOTAL_SLOTS} acts`}      desc="to book"             col={C.orange}/>
          <RuleItem icon="🎪" label="Stage placement"            desc="matters — get it right" col={C.purple}/>
          <RuleItem icon="🎸" label="Genre variety"              desc="stacking same genre hurts" col={C.green}/>
          <RuleItem icon="📈" label={`£${TARGET_PROFIT}m+ profit`} desc="to win"            col={C.red}/>
        </div>

        <button style={h.startBtn} onClick={onStart}>
          Build Your Festival
        </button>

        <CarbonAd/>
        <SponsorSlot/>

        <div style={h.legalRow}>
          <button style={h.lBtn} onClick={onAbout}>About</button>
          <span style={{color:C.textDim}}>·</span>
          <button style={h.lBtn} onClick={()=>onLegal("terms")}>Terms</button>
          <span style={{color:C.textDim}}>·</span>
          <button style={h.lBtn} onClick={()=>onLegal("privacy")}>Privacy</button>
        </div>
      </div>

      <SiteFooter onLegal={onLegal} onAbout={onAbout}/>
    </div>
  );
}
function RuleItem({icon,label,desc,col}){
  return(
    <div style={{display:"flex",alignItems:"flex-start",gap:10,padding:"6px 0",borderBottom:`1px solid ${C.border}`}}>
      <span style={{fontSize:15,flexShrink:0,marginTop:1}}>{icon}</span>
      <div>
        <span style={{color:col,fontWeight:900,fontSize:13,fontFamily:"'Georgia',serif"}}>{label}</span>
        <span style={{color:C.textMid,fontSize:13}}> — {desc}</span>
      </div>
    </div>
  );
}

// ─── NAME SCREEN ─────────────────────────────────────────────
function NameScreen({name,setName,lineup,onConfirm,onBack}){
  const ok  = name.trim().length >= 2;
  const hls = lineup.filter(a=>a.tier==="Headliner");
  return(
    <div style={h.page}>
      <div style={{...h.card, marginTop:32}}>
        <button style={{background:"none",border:"none",color:C.textMid,cursor:"pointer",fontFamily:"inherit",fontSize:13,padding:0,marginBottom:20,display:"block"}} onClick={onBack}>← Back to lineup</button>

        {/* Mini poster preview */}
        <div style={{background:C.ink,padding:"12px 14px",marginBottom:20,textAlign:"center"}}>
          <div style={{fontSize:9,letterSpacing:"0.3em",color:"rgba(255,255,255,0.5)",textTransform:"uppercase",marginBottom:6}}>Your headliners</div>
          {hls.length>0
            ? hls.map(a=><div key={a.id} style={{fontWeight:900,fontSize:16,color:C.yellow,letterSpacing:"0.06em",textTransform:"uppercase",fontFamily:"'Georgia',serif",lineHeight:1.3}}>{a.name}</div>)
            : <div style={{color:C.red,fontSize:13}}>No headliners booked</div>
          }
        </div>

        <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.14em",color:C.textMid,marginBottom:10}}>Name your festival</div>
        <input
          style={h.nameInput}
          placeholder="e.g. Dave's Fantastic Fest"
          value={name}
          maxLength={32}
          onChange={e=>setName(e.target.value)}
          autoFocus
        />
        <div style={{fontSize:11,color:C.textDim,marginBottom:16}}>{name.length}/32 characters</div>
        <button
          style={{...h.startBtn,background:ok?C.green:C.textFaint,opacity:ok?1:0.5,cursor:ok?"pointer":"not-allowed",boxShadow:ok?`4px 4px 0 ${C.ink}`:"none"}}
          onClick={()=>ok&&onConfirm()}
        >
          Release Lineup →
        </button>
      </div>
    </div>
  );
}

// ─── RESULT SCREEN ────────────────────────────────────────────
function Result({result,lineup,name,onReset,onHome,copied,onCopy,onTweet,onFb,onLegal,onAbout}){
  const {revenue,cost,profit,win,artistCost}=result;
  const hls = lineup.filter(a=>a.tier==="Headliner");
  const ms  = lineup.filter(a=>a.assignedStage==="Main Stage"&&a.tier!=="Headliner");
  const ss  = lineup.filter(a=>a.assignedStage==="Second Stage");
  const sm  = lineup.filter(a=>a.assignedStage==="Smaller Stage");

  return(
    <div style={r.page}>
      <Ad text="🎪 Eventbrite — sell your tickets in minutes"/>

      {/* VERDICT */}
      <div style={{...r.verdict, background:win?C.greenDim:C.lossDim, borderLeft:`4px solid ${win?C.green:C.red}`}}>
        <span style={{fontSize:28}}>{win?"✦":"✕"}</span>
        <div>
          <div style={{fontWeight:900,fontSize:22,color:win?C.green:C.red,fontFamily:"'Georgia',serif",lineHeight:1}}>
            {win?"In the Black.":"Bankrupt."}
          </div>
          <div style={{color:C.textMid,fontSize:13,marginTop:3}}>{name}</div>
        </div>
      </div>

      {/* FIGURES */}
      <div style={r.figs}>
        <Fig l="Revenue"   v={fmt(revenue)}    c={C.green}/>
        <Fig l="All Costs" v={`−${fmt(cost)}`} c={C.red}/>
        <Fig l={profit>=0?"Profit":"Loss"} v={fmtS(profit)} c={profit>=TARGET_PROFIT?C.green:C.red} big/>
      </div>
      <div style={{color:C.textDim,fontSize:11,textAlign:"center",marginBottom:12}}>
        Includes £{OVERHEADS}m overheads · Artist fees: {fmt(artistCost||cost-OVERHEADS)}
      </div>

      <p style={r.msg}>
        {win
          ?`${name} turned ${fmt(profit)} profit. ${hls[0]?.name||"Your headliner"} packed the field. The crowd won't forget it.`
          :profit>0
            ?`So close — ${fmt(profit)} profit but you needed ${fmt(TARGET_PROFIT)}. Check your stage placements and genre mix.`
            :`${name} lost ${fmt(Math.abs(profit))}. Even the portaloos turned a profit.`
        }
      </p>

      {/* POSTER */}
      <div style={po.wrap}>
        <div style={po.poster}>
          <div style={po.topBand}/>
          <div style={po.hBar}><span style={po.hBarText}>Festival Boss Presents</span></div>
          <div style={po.festName}>{name.toUpperCase()}</div>
          <div style={po.festSub}>ONE WEEKEND · ONE CHANCE</div>
          <div style={po.divider}/>
          {hls.length>0
            ? hls.map(a=><div key={a.id} style={po.hlAct}>{a.name.toUpperCase()}</div>)
            : <div style={{...po.hlAct,opacity:0.2,fontSize:16}}>NO HEADLINER BOOKED</div>}
          {ms.length>0&&<><div style={po.divider}/>
            <div style={po.tier}>{ms.map((a,i)=><span key={a.id} style={po.msAct}>{a.name}{i<ms.length-1?" · ":""}</span>)}</div></>}
          {ss.length>0&&<><div style={po.thinRule}/>
            <div style={po.tier}>{ss.map((a,i)=><span key={a.id} style={po.ssAct}>{a.name}{i<ss.length-1?"  ":""}</span>)}</div></>}
          {sm.length>0&&<><div style={po.thinRule}/>
            <div style={po.tier}>{sm.map((a,i)=><span key={a.id} style={po.smAct}>{a.name}{i<sm.length-1?"  ":""}</span>)}</div></>}
          <div style={po.divider}/>
          <div style={po.footer}>{win?"★★ SOLD OUT — ALL WEEKEND ★★":"✕ EVENT CANCELLED ✕"}</div>
          <div style={po.bottomBand}/>
        </div>
      </div>

      {/* SHARE */}
      <div style={r.shareWrap}>
        <div style={r.shareLabel}>Share your festival</div>
        <div style={r.shareBtns}>
          <SBtn onClick={onTweet}>𝕏 Post</SBtn>
          <SBtn onClick={onFb}>f Share</SBtn>
          <SBtn onClick={onCopy} hi={copied}>{copied?"✓ Copied":"⧉ Copy"}</SBtn>
        </div>
      </div>

      <div style={r.actions}>
        <button style={r.btnPrimary} onClick={onReset}>Try Again</button>
        <button style={r.btnGhost}   onClick={onHome}>Home</button>
      </div>

      <SponsorSlot/>
      <CarbonAd/>
      <SiteFooter onLegal={onLegal} onAbout={onAbout}/>
    </div>
  );
}
function Fig({l,v,c,big}){
  return(
    <div style={{flex:1,textAlign:"center",background:C.surface,padding:"10px 6px",border:`2px solid ${C.ink}`,boxShadow:`2px 2px 0 ${C.ink}`}}>
      <div style={{color:c,fontWeight:900,fontSize:big?22:17,fontFamily:"'Georgia',serif"}}>{v}</div>
      <div style={{color:C.textDim,fontSize:10,marginTop:3}}>{l}</div>
    </div>
  );
}
function SBtn({onClick,hi,children}){
  return(
    <button onClick={onClick} style={{
      background:hi?C.greenDim:"transparent",
      border:`2px solid ${hi?C.green:C.ink}`,
      color:hi?C.green:C.ink,
      padding:"8px 14px",cursor:"pointer",fontSize:12,
      fontFamily:"inherit",fontWeight:700,
      boxShadow:hi?"none":`2px 2px 0 ${C.ink}`,
    }}>{children}</button>
  );
}

function Legal({type,onBack}){
  const isT=type==="terms";
  // helper so legal screen can link to the other doc
  return(
    <div style={lg.page}>
      <div style={lg.card}>
        <button style={lg.back} onClick={onBack}>← Back</button>
        <h2 style={lg.title}>{isT?"Terms & Conditions":"Privacy Policy"}</h2>
        <p style={lg.date}>Last updated: June 2026 · festivalbossgame.com</p>

        {isT ? <>

          <Cl h="1. Nature of the game">
            Festival Boss is a free-to-play browser-based entertainment game. It is a work of
            fiction and is provided for amusement purposes only. Festival Boss is not a real
            festival booking service, talent agency, ticketing platform, or financial product
            of any kind. No real festival is being organised, promoted, or represented through
            this game.
          </Cl>

          <Cl h="2. Artist names, likenesses and trademarks">
            The names of musical artists, bands and performers that appear in Festival Boss are
            used solely for the purposes of a fictional entertainment game. Their inclusion does
            not imply any affiliation with, endorsement by, sponsorship of, or participation in
            Festival Boss by any artist, their management, record label, booking agency, or any
            associated party. All artist names, likenesses, and associated trademarks remain the
            exclusive property of their respective owners. No artist has authorised, approved,
            or is associated with this game in any way.
          </Cl>

          <Cl h="3. Fictional data — fees, ratings and figures">
            All booking fees, draw ratings, popularity scores, revenue projections and any other
            numerical data displayed within Festival Boss are entirely invented for game-balance
            purposes. They bear no relation to any artist's real-world booking fees, earnings,
            commercial value, popularity, or market position. No inference should be drawn from
            any figure shown in the game about any real person or entity. The display of any
            figure alongside an artist's name does not constitute a statement of fact about that
            artist.
          </Cl>

          <Cl h="4. No financial transactions">
            Festival Boss does not involve any real money. No purchase is required to play.
            No real booking, ticket sale, financial transaction, or contract of any kind is
            created or implied by use of this game. All in-game currency and financial results
            are fictional and have no monetary value whatsoever.
          </Cl>

          <Cl h="5. Intellectual property — the game itself">
            The Festival Boss game, its design, code, branding, and all original content are
            the intellectual property of their respective creators. You may not copy, reproduce,
            distribute, or create derivative works from any part of Festival Boss without
            express written permission.
          </Cl>

          <Cl h="6. No affiliation with festivals or promoters">
            Festival Boss is not affiliated with, endorsed by, or connected to any music
            festival, concert promoter, ticketing company, venue, or event organisation.
            Any similarity to real festival names, structures, or events is coincidental.
          </Cl>

          <Cl h="7. Advertising">
            Festival Boss displays third-party banner advertisements to support free access to
            the game. All advertisements are clearly labelled. We do not endorse the products
            or services advertised, and we are not responsible for the content of
            third-party advertisements or any websites they link to. Advertising is served
            in compliance with applicable advertising standards.
          </Cl>

          <Cl h="8. Disclaimer of warranties">
            Festival Boss is provided on an "as is" and "as available" basis without any
            warranties of any kind, express or implied, including but not limited to warranties
            of merchantability, fitness for a particular purpose, or non-infringement. We do
            not warrant that the game will be uninterrupted, error-free, or free of viruses
            or other harmful components.
          </Cl>

          <Cl h="9. Limitation of liability">
            To the fullest extent permitted by law, the operators of Festival Boss shall not
            be liable for any direct, indirect, incidental, consequential, or punitive damages
            arising from your use of or inability to use the game, including but not limited
            to loss of data, loss of profits, or any other loss, even if we have been advised
            of the possibility of such damages.
          </Cl>

          <Cl h="10. Age restriction">
            Festival Boss is intended for users aged 13 and over. By using the game you confirm
            that you are aged 13 or over. If you are under 13, please do not use this game.
          </Cl>

          <Cl h="11. User conduct">
            You agree not to use Festival Boss in any way that is unlawful, harmful, or
            disruptive. You agree not to attempt to reverse-engineer, scrape, or reproduce
            the game's code or content without permission.
          </Cl>

          <Cl h="12. Modifications">
            We reserve the right to modify or discontinue Festival Boss at any time without
            notice. We may update these Terms at any time. Continued use of the game after
            changes are posted constitutes acceptance of the revised Terms.
          </Cl>

          <Cl h="13. Governing law and jurisdiction">
            These Terms are governed by the laws of England and Wales. Any disputes arising
            from these Terms or your use of Festival Boss shall be subject to the exclusive
            jurisdiction of the courts of England and Wales.
          </Cl>

          <Cl h="14. Contact">
            For any queries relating to these Terms, please contact: festivalboss.game@mail.com
          </Cl>

        </> : <>

          <Cl h="1. Who we are">
            Festival Boss ("we", "us", "our") operates the game at festivalbossgame.com. This
            Privacy Policy explains how we handle information in connection with your use of
            the game. We are committed to protecting your privacy and complying with the UK
            General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
          </Cl>

          <Cl h="2. What personal data we collect">
            Festival Boss does not require you to create an account or provide any personal
            information to play. Your chosen festival name and lineup selections exist only
            within your browser session and are not transmitted to or stored on our servers.
            We do not collect your name, email address, or any directly identifying information
            through the game itself.
          </Cl>

          <Cl h="3. Cookies and analytics">
            We may use cookies and similar tracking technologies to collect anonymised,
            aggregated data about how the game is used — for example, the number of visitors,
            session duration, and which features are used most. This may be collected via
            tools such as Google Analytics. This data cannot be used to identify you
            personally. You can disable or delete cookies at any time through your browser
            settings. Disabling cookies may affect the game's functionality.
          </Cl>

          <Cl h="4. Cookie consent">
            Where required by law, we will ask for your consent before setting non-essential
            cookies (such as analytics or advertising cookies). You can withdraw consent at
            any time via the cookie settings on the site. Essential cookies required for the
            game to function are set without consent on the basis of legitimate interest.
          </Cl>

          <Cl h="5. Advertising and third-party cookies">
            Festival Boss displays third-party banner advertisements, which may be served by
            advertising networks such as Google AdSense. These networks may set their own
            cookies on your device to serve relevant advertisements based on your browsing
            behaviour. We do not control these cookies and do not share your personal data
            with advertisers. You can opt out of personalised advertising via
            Google's Ad Settings at adssettings.google.com or via the Network Advertising
            Initiative opt-out tool at optout.networkadvertising.org.
          </Cl>

          <Cl h="6. Social sharing">
            When you use the Share buttons within the game, information you choose to share
            (your festival name and result) is sent directly to the relevant platform
            (X/Twitter or Facebook). We do not intercept, store, or process this data. Your
            use of those platforms is governed by their own privacy policies. We have no
            control over how those platforms handle data you submit to them.
          </Cl>

          <Cl h="7. Legal basis for processing">
            Where we process any personal data (for example, anonymised analytics data),
            we do so on the basis of legitimate interests in understanding how the game is
            used and improving it, or with your consent where required. We do not sell
            personal data to any third party.
          </Cl>

          <Cl h="8. Data retention">
            We do not store personal gameplay data. Anonymised analytics data may be retained
            for up to 26 months in line with Google Analytics default retention settings.
          </Cl>

          <Cl h="9. Children">
            Festival Boss is not directed at children under the age of 13. We do not knowingly
            collect personal data from children under 13. If you believe a child under 13 has
            provided us with personal data, please contact us at the address below and we will
            take steps to delete it promptly.
          </Cl>

          <Cl h="10. Your rights under UK GDPR">
            You have the right to: access any personal data we hold about you; request
            correction of inaccurate data; request deletion of your data ("right to be
            forgotten"); object to or restrict processing of your data; and lodge a complaint
            with the Information Commissioner's Office (ICO) at ico.org.uk if you believe
            your rights have been infringed. To exercise any of these rights, contact us at:
            festivalboss.game@mail.com
          </Cl>

          <Cl h="11. International transfers">
            Some of our service providers (such as Google Analytics) may transfer data
            outside the UK or EEA. Where this occurs, we ensure appropriate safeguards are
            in place in accordance with UK GDPR requirements, such as Standard Contractual
            Clauses.
          </Cl>

          <Cl h="12. Changes to this policy">
            We may update this Privacy Policy from time to time. Changes will be posted on
            this page with a revised "last updated" date. We encourage you to review this
            policy periodically.
          </Cl>

          <Cl h="13. Contact us">
            For any privacy-related queries, requests, or complaints:
            Email: festivalboss.game@mail.com
            For complaints to the regulator: ico.org.uk / 0303 123 1113
          </Cl>

        </>}
        <button style={lg.closeBtn} onClick={onBack}>Close</button>
      </div>
      <SiteFooter onLegal={()=>{}} onAbout={()=>{}} minimal/>
    </div>
  );
}
function Cl({h,children}){
  return(
    <div style={{marginBottom:18}}>
      <div style={{color:C.red,fontWeight:700,fontSize:13,marginBottom:5}}>{h}</div>
      <p style={{color:C.textMid,fontSize:13,lineHeight:1.75,margin:0}}>{children}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// GAME STYLES — mobile-first, drawer pattern
// ─────────────────────────────────────────────────────────────
const gm={
  body:        {display:"flex",flexDirection:"column",flex:1,overflow:"hidden",position:"relative"},
  // Sidebar — on mobile this becomes a slide-up drawer
  sidebar:     {
    position:"fixed",bottom:0,left:0,right:0,zIndex:100,
    background:C.surface,
    borderTop:`3px solid ${C.ink}`,
    maxHeight:"75vh",
    display:"flex",flexDirection:"column",overflow:"hidden",
    boxShadow:`0 -4px 24px rgba(0,0,0,0.15)`,
  },
  lineupScroll:{flex:1,overflowY:"auto",padding:"0 10px"},
  lineupRow:   {
    display:"flex",alignItems:"center",gap:8,
    borderLeft:"4px solid",padding:"7px 8px 7px 10px",
    marginBottom:5,background:C.card,
    borderBottom:`1px solid ${C.border}`,
  },
  checkBox:    {margin:"8px 12px",padding:"11px 12px",background:C.card,border:`2px solid ${C.ink}`,flexShrink:0},
  pnlLine:     {height:2,background:C.ink,margin:"8px 0"},
  releaseBtn:  {
    margin:"10px 12px",flexShrink:0,
    background:C.red,border:"none",color:"#fff",
    fontWeight:900,fontSize:14,padding:"13px 0",
    cursor:"pointer",fontFamily:"inherit",
    letterSpacing:"0.05em",textTransform:"uppercase",
    boxShadow:`3px 3px 0 ${C.ink}`,
  },
  // Floating drawer toggle button — mobile only
  drawerBtn:   {
    position:"fixed",bottom:0,left:0,right:0,zIndex:101,
    color:"#fff",fontWeight:900,fontSize:14,
    padding:"16px 20px",border:"none",
    cursor:"pointer",fontFamily:"'Georgia',serif",
    letterSpacing:"0.03em",textAlign:"center",
    boxShadow:`0 -2px 0 ${C.ink}`,
  },
  drawerClose: {
    background:"none",border:"none",color:C.textMid,
    cursor:"pointer",fontFamily:"inherit",fontSize:12,
    fontWeight:600,padding:0,flexShrink:0,
  },
  // Main spin area — full width on mobile
  main:        {flex:1,display:"flex",flexDirection:"column",overflowY:"auto",background:C.bg},
  spinWrap:    {
    textAlign:"center",padding:"20px 16px 14px",
    borderBottom:`2px solid ${C.ink}`,background:C.surface,
    flexShrink:0,
  },
  spinBtn:     {
    width:88,height:88,borderRadius:"50%",
    background:C.red,
    border:`4px solid ${C.ink}`,
    color:"#fff",fontSize:40,fontWeight:900,
    display:"inline-flex",alignItems:"center",justifyContent:"center",
    cursor:"pointer",marginBottom:10,transformOrigin:"center",
    boxShadow:`5px 5px 0 ${C.ink}`,fontFamily:"serif",
  },
  spinLabel:   {color:C.ink,fontWeight:900,fontSize:15,textTransform:"uppercase",letterSpacing:"0.05em"},
  spinHint:    {color:C.textMid,fontSize:11,marginTop:5},
  // 2 columns on mobile, auto-fill on desktop
  hand:        {
    padding:"12px 12px",
    display:"grid",
    gridTemplateColumns:"repeat(2,1fr)",
    gap:10,alignContent:"start",
  },
  actCard:     {
    background:C.card,border:`2px solid ${C.ink}`,
    padding:"10px 11px",cursor:"pointer",userSelect:"none",
    animation:"deal 0.18s ease both",
    boxShadow:`3px 3px 0 ${C.ink}`,
  },
  actName:     {fontWeight:900,fontSize:13,color:C.ink,lineHeight:1.2,marginBottom:3,fontFamily:"'Georgia',serif"},
  actGenre:    {fontSize:10,color:C.textMid,textTransform:"uppercase",letterSpacing:"0.06em"},
  emptyState:  {flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,textAlign:"center"},
  overlay:     {position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:16},
  modal:       {background:C.bg,border:`3px solid ${C.ink}`,padding:"24px 20px",width:"100%",maxWidth:340,boxShadow:`6px 6px 0 ${C.ink}`},
  modalName:   {fontWeight:900,fontSize:22,color:C.ink,marginBottom:4,fontFamily:"'Georgia',serif"},
  modalSub:    {color:C.textMid,fontSize:13,marginBottom:4},
  modalFee:    {color:C.textDim,fontSize:12,marginBottom:16},
  stageBtn:    {
    display:"flex",justifyContent:"space-between",alignItems:"center",
    width:"100%",border:`2px solid ${C.ink}`,background:"transparent",
    padding:"11px 13px",marginBottom:8,cursor:"pointer",fontFamily:"inherit",
    boxShadow:`2px 2px 0 ${C.ink}`,
  },
  stageMulTxt: {color:C.textMid,fontSize:11},
  cancelBtn:   {
    width:"100%",background:"transparent",border:`1px solid ${C.border}`,
    color:C.textMid,padding:"10px 0",cursor:"pointer",fontFamily:"inherit",fontSize:13,marginTop:4,
  },
};

// ─── MAIN APP STYLES ─────────────────────────────────────────
const s={
  app:       {minHeight:"100vh",background:C.bg,color:C.ink,fontFamily:"'Georgia',serif",display:"flex",flexDirection:"column"},
  hdr:       {
    display:"flex",justifyContent:"space-between",alignItems:"center",
    padding:"0 20px",height:64,background:C.red,
    borderBottom:`3px solid ${C.ink}`,flexWrap:"wrap",gap:10,
  },
  brand:     {display:"flex",alignItems:"center",gap:0},
  brandF:    {color:"#fff",fontWeight:900,fontSize:13,letterSpacing:"0.2em",textTransform:"uppercase",fontFamily:"'Georgia',serif"},
  brandText: {display:"flex",flexDirection:"column",lineHeight:1},
  brandTitle:{fontWeight:900,fontSize:20,color:"#fff",letterSpacing:"-0.5px",fontFamily:"'Georgia',serif"},
  kpis:      {display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"},
  kdiv:      {width:1,height:24,background:"rgba(255,255,255,0.3)"},
  railWrap:  {display:"flex",flexDirection:"column"},
  rail:      {height:5,background:C.surface},
  railFill:  {height:"100%",transition:"width 0.3s"},
  panelLabel:{
    fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.16em",
    color:C.textDim,padding:"0 14px 10px",
    borderBottom:`2px solid ${C.ink}`,marginBottom:8,
  },
  panelLabel2:{
    fontSize:11,fontWeight:900,textTransform:"uppercase",letterSpacing:"0.12em",color:C.ink,
  },
  sideEmpty: {color:C.textDim,fontSize:13,padding:"28px 0",textAlign:"center",margin:0},
  aName:     {fontWeight:700,fontSize:13,color:C.ink,marginBottom:2,lineHeight:1.2,fontFamily:"'Georgia',serif"},
  aMeta:     {display:"flex",gap:5,alignItems:"center",flexWrap:"wrap"},
  aGenre:    {fontSize:10,color:C.textMid,textTransform:"uppercase",letterSpacing:"0.04em"},
  aRight:    {display:"flex",alignItems:"center",gap:7,flexShrink:0},
  xBtn:      {background:"none",border:"none",color:C.textDim,cursor:"pointer",fontSize:11,padding:0,fontFamily:"inherit"},
  pill:      {fontSize:8,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",padding:"2px 7px",border:`1px solid`},
};

// ─── HOME STYLES ─────────────────────────────────────────────
const h={
  page:    {minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",padding:"0 16px 60px",position:"relative",overflow:"hidden"},
  heroWrap:{width:"100%",maxWidth:640,padding:"32px 0 20px",textAlign:"center",position:"relative"},
  // Big overlapping poster typography
  poster:  {position:"relative",userSelect:"none",lineHeight:0.85,marginBottom:8},
  line1:   {
    display:"block",fontSize:"clamp(56px,16vw,110px)",fontWeight:900,
    fontFamily:"'Georgia','Times New Roman',serif",
    color:C.red,letterSpacing:"-2px",textTransform:"uppercase",
    WebkitTextStroke:`2px ${C.ink}`,
  },
  line2:   {
    display:"block",fontSize:"clamp(72px,20vw,140px)",fontWeight:900,
    fontFamily:"'Georgia','Times New Roman',serif",
    color:C.blue,letterSpacing:"-4px",textTransform:"uppercase",
    WebkitTextStroke:`2px ${C.ink}`,
    marginTop:-8,
  },
  tagline: {fontSize:13,color:C.textMid,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:24,marginTop:16},
  // Poster decorative elements
  stripe:  {height:8,background:`repeating-linear-gradient(90deg,${C.red} 0,${C.red} 20px,${C.yellow} 20px,${C.yellow} 40px,${C.blue} 40px,${C.blue} 60px,${C.orange} 60px,${C.orange} 80px,${C.purple} 80px,${C.purple} 100px)`,marginBottom:20,border:`2px solid ${C.ink}`},
  card:    {background:C.surface,border:`3px solid ${C.ink}`,padding:"24px 22px",width:"100%",maxWidth:460,boxShadow:`6px 6px 0 ${C.ink}`},
  rulesGrid:{marginBottom:20},
  startBtn:{
    width:"100%",marginTop:4,
    background:C.blue,border:`3px solid ${C.ink}`,
    color:"#fff",fontWeight:900,fontSize:16,padding:"15px 0",
    borderRadius:0,cursor:"pointer",fontFamily:"'Georgia',serif",
    letterSpacing:"0.08em",textTransform:"uppercase",
    boxShadow:`5px 5px 0 ${C.ink}`,
  },
  nameInput:{
    width:"100%",background:C.bg,border:`3px solid ${C.ink}`,
    padding:"13px 14px",color:C.ink,fontSize:17,
    outline:"none",fontFamily:"'Georgia',serif",marginBottom:6,
    boxSizing:"border-box",fontWeight:700,
  },
  legalRow:{display:"flex",gap:10,justifyContent:"center",marginTop:14,alignItems:"center"},
  lBtn:   {background:"none",border:"none",color:C.textDim,fontSize:11,cursor:"pointer",fontFamily:"inherit",textDecoration:"underline",padding:0},
};

// ─── POSTER STYLES ────────────────────────────────────────────
const po={
  wrap:      {margin:"14px 0"},
  poster:    {
    background:"#fffff8",
    border:`3px solid ${C.ink}`,
    padding:"0 0 20px",textAlign:"center",
    fontFamily:"'Georgia','Times New Roman',serif",
    boxShadow:`6px 6px 0 ${C.ink}`,
    overflow:"hidden",
  },
  topBand:   {
    background:`repeating-linear-gradient(90deg,${C.red} 0,${C.red} 14%,${C.yellow} 14%,${C.yellow} 28%,${C.orange} 28%,${C.orange} 42%,${C.green} 42%,${C.green} 57%,${C.blue} 57%,${C.blue} 71%,${C.purple} 71%,${C.purple} 85%,${C.red} 85%,${C.red} 100%)`,
    height:22,marginBottom:0,
  },
  hBar:      {background:C.ink,padding:"6px 0",marginBottom:14},
  hBarText:  {fontSize:10,fontWeight:900,letterSpacing:"0.35em",color:"#fff",textTransform:"uppercase"},
  festName:  {
    fontSize:"clamp(28px,7vw,48px)",fontWeight:900,color:C.ink,
    letterSpacing:"0.06em",textTransform:"uppercase",lineHeight:1,
    marginBottom:4,padding:"0 16px",wordBreak:"break-word",
  },
  festSub:   {fontSize:9,color:C.textMid,letterSpacing:"0.3em",textTransform:"uppercase",marginBottom:10},
  divider:   {height:2,background:C.ink,margin:"12px 16px"},
  thinRule:  {height:1,background:C.border,margin:"8px 16px"},
  hlAct:     {
    fontSize:"clamp(18px,4.5vw,28px)",fontWeight:900,color:C.red,
    letterSpacing:"0.06em",textTransform:"uppercase",lineHeight:1.25,marginBottom:4,
    fontFamily:"'Georgia','Times New Roman',serif",
  },
  tier:      {display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"2px 8px",padding:"4px 16px"},
  msAct:     {fontSize:14,fontWeight:700,color:C.blue,letterSpacing:"0.03em",fontFamily:"'Georgia',serif"},
  ssAct:     {fontSize:11,fontWeight:600,color:C.ink,letterSpacing:"0.02em"},
  smAct:     {fontSize:9,fontWeight:500,color:C.textMid,letterSpacing:"0.01em"},
  footer:    {fontSize:12,fontWeight:900,color:C.ink,letterSpacing:"0.25em",textTransform:"uppercase",marginTop:8,padding:"0 16px"},
  bottomBand:{
    background:`repeating-linear-gradient(90deg,${C.purple} 0,${C.purple} 14%,${C.blue} 14%,${C.blue} 28%,${C.green} 28%,${C.green} 42%,${C.orange} 42%,${C.orange} 57%,${C.yellow} 57%,${C.yellow} 71%,${C.red} 71%,${C.red} 85%,${C.purple} 85%,${C.purple} 100%)`,
    height:22,marginTop:16,
  },
};

// ─── RESULT STYLES ────────────────────────────────────────────
const r={
  page:      {minHeight:"100vh",background:C.bg,padding:"18px 16px 40px",maxWidth:540,margin:"0 auto"},
  verdict:   {display:"flex",alignItems:"center",gap:14,marginBottom:12,padding:"14px 16px",border:`3px solid ${C.ink}`,boxShadow:`4px 4px 0 ${C.ink}`},
  figs:      {display:"flex",gap:8,marginBottom:6},
  msg:       {color:C.textMid,fontSize:13,lineHeight:1.6,background:C.surface,padding:"12px 14px",marginBottom:14,border:`2px solid ${C.border}`,fontStyle:"italic"},
  shareWrap: {background:C.surface,padding:"14px",marginBottom:12,border:`2px solid ${C.ink}`},
  shareLabel:{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.14em",color:C.textDim,marginBottom:10,textAlign:"center"},
  shareBtns: {display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"},
  actions:   {display:"flex",gap:10,marginTop:4,marginBottom:14},
  btnPrimary:{flex:1,background:C.red,border:`2px solid ${C.ink}`,color:"#fff",fontWeight:900,fontSize:14,padding:"13px 0",cursor:"pointer",fontFamily:"inherit",boxShadow:`3px 3px 0 ${C.ink}`},
  btnGhost:  {flex:1,background:"transparent",border:`2px solid ${C.ink}`,color:C.ink,fontWeight:700,fontSize:14,padding:"13px 0",cursor:"pointer",fontFamily:"inherit"},
};

// ─── LEGAL STYLES ─────────────────────────────────────────────
const lg={
  page:    {minHeight:"100vh",background:C.bg,display:"flex",justifyContent:"center",padding:"32px 16px 60px"},
  card:    {background:C.surface,border:`2px solid ${C.ink}`,padding:"28px 24px",width:"100%",maxWidth:560},
  back:    {background:"none",border:"none",color:C.textMid,cursor:"pointer",fontSize:13,padding:0,fontFamily:"inherit",marginBottom:18,display:"block"},
  title:   {fontSize:22,fontWeight:900,color:C.ink,marginBottom:4,letterSpacing:"-0.5px",fontFamily:"'Georgia',serif"},
  date:    {color:C.textDim,fontSize:12,marginBottom:22},
  closeBtn:{width:"100%",marginTop:8,background:"transparent",border:`2px solid ${C.ink}`,color:C.ink,fontWeight:700,fontSize:14,padding:"12px 0",cursor:"pointer",fontFamily:"inherit"},
};


function SiteFooter({onLegal, onAbout, minimal}){
  return(
    <footer style={ft.wrap}>
      <div style={ft.inner}>
        <div style={ft.brand}>
          <span style={ft.brandName}>Festival Boss</span>
          <span style={ft.brandTag}>The festival booking game</span>
        </div>
        {!minimal && (
          <div style={ft.links}>
            <FtBtn onClick={onAbout}>About</FtBtn>
            <FtBtn onClick={()=>onLegal("terms")}>Terms &amp; Conditions</FtBtn>
            <FtBtn onClick={()=>onLegal("privacy")}>Privacy Policy</FtBtn>
            <a href="mailto:festivalboss.game@mail.com" style={ft.link}>Contact</a>
          </div>
        )}
        <div style={ft.legal}>
          <p style={ft.legalText}>
            Festival Boss is a free entertainment game. Artist names are used for fictional
            game purposes only and do not imply endorsement, affiliation, or association.
            All booking fees, draw ratings and figures are entirely invented and bear no
            relation to any real-world values. © {new Date().getFullYear()} Festival Boss.
            All rights reserved.
          </p>
          <p style={ft.legalText}>
            Advertising is served by third-party networks. We are not responsible for
            advertiser content. Cookie and privacy settings can be managed via our{" "}
            <button onClick={()=>onLegal&&onLegal("privacy")} style={ft.inlineLink}>
              Privacy Policy
            </button>.
          </p>
        </div>
      </div>
    </footer>
  );
}
function FtBtn({onClick, children}){
  return(
    <button onClick={onClick} style={ft.link}>{children}</button>
  );
}

// ─────────────────────────────────────────────────────────────
// CARBON ADS SLOT
// To activate: replace the placeholder div below with your
// Carbon Ads script tag from carbonads.com.
// It looks like:
//   <script async type="text/javascript"
//     src="//cdn.carbonads.com/carbon.js?serve=YOURCODE&placement=festivalbossgamecom"
//     id="_carbonads_js"></script>
// ─────────────────────────────────────────────────────────────
function CarbonAd(){
  // ─────────────────────────────────────────────────────
  // TO ACTIVATE: replace the inner placeholder div with
  // your Carbon Ads <script> tag from carbonads.com.
  // The script renders a single small ad automatically.
  // Keep the outer carbonWrap div — it handles the styling.
  // ─────────────────────────────────────────────────────
  return(
    <div style={ad.carbonWrap}>
      {/* ↓ REPLACE FROM HERE with your Carbon Ads script ↓ */}
      <div style={ad.carbonPlaceholder}>
        <span style={ad.adLabel}>Ad</span>
        <span style={{color:C.textDim,fontSize:11}}>
          Carbon Ads will appear here once approved
        </span>
      </div>
      {/* ↑ REPLACE TO HERE with your Carbon Ads script ↑ */}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SPONSOR SLOT
// When a sponsor comes in, replace the content of this
// component with their branding. Keep the "Sponsored by"
// label to stay compliant with ASA/CAP advertising rules.
// Example: change the inner div to show sponsor logo + message.
// ─────────────────────────────────────────────────────────────
function SponsorSlot(){
  // ─────────────────────────────────────────────────────
  // TO ACTIVATE A SPONSOR:
  // 1. Change SPONSOR_ACTIVE to true
  // 2. Fill in SPONSOR_NAME, SPONSOR_MSG, SPONSOR_URL
  // 3. Save and redeploy — that's it.
  // The "Sponsored by" label stays visible for ASA compliance.
  // ─────────────────────────────────────────────────────
  const SPONSOR_ACTIVE = false;
  const SPONSOR_NAME   = "Your Brand";
  const SPONSOR_MSG    = "Your sponsor message here";
  const SPONSOR_URL    = "https://example.com";

  if(!SPONSOR_ACTIVE) return null;

  return(
    <div style={ad.sponsorWrap}>
      <span style={ad.sponsorLabel}>Sponsored by</span>
      <a
        href={SPONSOR_URL}
        target="_blank"
        rel="noopener noreferrer sponsored"
        style={ad.sponsorLink}
      >
        <strong style={{color:C.blue,fontSize:14}}>{SPONSOR_NAME}</strong>
        <span style={{color:C.textMid,fontSize:12,marginLeft:10}}>{SPONSOR_MSG}</span>
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COOKIE CONSENT BANNER
// Shown on first visit. Stores consent in localStorage.
// Required under UK GDPR / PECR before setting analytics
// or advertising cookies.
// ─────────────────────────────────────────────────────────────
export function CookieBanner({onAccept, onDecline}){
  return(
    <div style={ck.overlay}>
      <div style={ck.banner}>
        <div style={ck.text}>
          <strong style={{color:C.text}}>We use cookies</strong>
          <p style={ck.body}>
            Festival Boss uses cookies to measure how the game is used (analytics) and to
            serve relevant advertisements. No personally identifying information is collected.
            You can accept all cookies, or decline non-essential ones. See our{" "}
            <button style={ck.inlineLink} onClick={()=>{}}>Privacy Policy</button>{" "}
            for details.
          </p>
        </div>
        <div style={ck.btns}>
          <button style={ck.accept}  onClick={onAccept}>Accept all</button>
          <button style={ck.decline} onClick={onDecline}>Essential only</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ABOUT SCREEN — required by AdSense for site legitimacy
// ─────────────────────────────────────────────────────────────
function About({onBack, onLegal}){
  return(
    <div style={ab.page}>
      <div style={ab.card}>
        <button style={lg.back} onClick={onBack}>← Back to game</button>
        <div style={ab.logoRow}>
          <span style={{fontSize:32}}>🎪</span>
          <div>
            <h1 style={ab.title}>Festival Boss</h1>
            <p style={ab.sub}>The festival booking game</p>
          </div>
        </div>

        <AbSection title="What is Festival Boss?">
          Festival Boss is a free browser-based strategy game where you take on the role of
          a festival promoter. You have a fixed budget and must book a lineup of real musical
          artists — balancing headliner costs, genre diversity, and crowd draw — to build a
          festival that turns a profit. The bigger and more balanced your lineup, the more
          tickets you sell. But the budget is tight and the profit target is unforgiving.
          Most players lose on their first attempt.
        </AbSection>

        <AbSection title="How to play">
          Spin to get a random hand of 10 acts from across the roster. Pick one,
          assign them to a stage — Main Stage, Second Stage, or Smaller Stage — then spin
          again. You have {MAX_SPINS} spins to fill {TOTAL_SLOTS} slots. You need at least{" "}
          {HL_MIN} headliners and {GENRE_MIN} different genres. Putting the right act on
          the right stage matters — mismatch and your revenue drops. Generate enough to
          clear {fmt(TARGET_PROFIT)} profit and you win.
        </AbSection>

        <AbSection title="The artists">
          The artist roster features over 200 real musicians and bands drawn from decades
          of major UK festival history. All booking fees, draw ratings and popularity scores
          displayed in the game are entirely fictional and invented for game-balance purposes
          only. They bear no relation to any artist's real-world fees, earnings, or
          commercial value. No artist has endorsed or is affiliated with Festival Boss in
          any way.
        </AbSection>

        <AbSection title="Free to play">
          Festival Boss is completely free. The game is supported by non-intrusive banner
          advertising. We do not sell in-app purchases, subscriptions, or user data.
        </AbSection>

        <AbSection title="Contact us">
          Questions, feedback, or press enquiries: festivalboss.game@mail.com{"\n"}
          Legal and privacy matters: festivalboss.game@mail.com
        </AbSection>

        <div style={{display:"flex",gap:10,marginTop:24,flexWrap:"wrap"}}>
          <button style={ab.legalBtn} onClick={()=>onLegal("terms")}>
            Terms &amp; Conditions
          </button>
          <button style={ab.legalBtn} onClick={()=>onLegal("privacy")}>
            Privacy Policy
          </button>
        </div>
      </div>
      <SiteFooter onLegal={onLegal} onAbout={()=>{}} minimal/>
    </div>
  );
}
function AbSection({title, children}){
  return(
    <div style={{marginBottom:20}}>
      <div style={{color:C.red,fontWeight:700,fontSize:14,marginBottom:6}}>{title}</div>
      <p style={{color:C.textMid,fontSize:13,lineHeight:1.75,margin:0,whiteSpace:"pre-line"}}>{children}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// NEW STYLE OBJECTS
// ─────────────────────────────────────────────────────────────

const ft={
  wrap:{background:C.surface,borderTop:`2px solid ${C.ink}`,marginTop:32,padding:"24px 16px 32px"},
  inner:{maxWidth:540,margin:"0 auto"},
  brand:{marginBottom:12},
  brandName:{color:C.text,fontWeight:700,fontSize:15,display:"block"},
  brandTag:{color:C.textDim,fontSize:11,marginTop:2,display:"block"},
  links:{display:"flex",gap:16,flexWrap:"wrap",marginBottom:14},
  link:{background:"none",border:"none",color:C.textMid,fontSize:12,cursor:"pointer",
        fontFamily:"inherit",padding:0,textDecoration:"none"},
  legal:{borderTop:`1px solid ${C.border}`,paddingTop:12,marginTop:4},
  legalText:{color:C.textDim,fontSize:11,lineHeight:1.6,margin:"0 0 6px"},
  inlineLink:{background:"none",border:"none",color:C.textMid,cursor:"pointer",
              fontFamily:"inherit",padding:0,fontSize:11,textDecoration:"underline"},
};

const ad={
  carbonWrap:{marginTop:12},
  carbonPlaceholder:{
    display:"flex",alignItems:"center",gap:8,padding:"6px 10px",
    border:`1px solid ${C.border}`,borderRadius:5,opacity:0.6,
  },
  adLabel:{fontSize:7,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",
           color:C.textDim,background:C.card,padding:"1px 4px",borderRadius:2,flexShrink:0},
  sponsorWrap:{
    display:"flex",alignItems:"center",gap:10,padding:"12px 14px",
    background:C.card,border:`1px solid ${C.border}`,borderRadius:8,marginTop:14,
  },
  sponsorLabel:{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",
                color:C.textDim,flexShrink:0},
  sponsorLink:{display:"flex",alignItems:"center",textDecoration:"none",flex:1,flexWrap:"wrap"},
};

const ck={
  overlay:{
    position:"fixed",bottom:0,left:0,right:0,zIndex:9999,
    padding:"0 16px 16px",
  },
  banner:{
    background:C.surface,border:`1px solid ${C.borderHi}`,borderRadius:12,
    padding:"16px",maxWidth:600,margin:"0 auto",
    boxShadow:"0 -4px 24px rgba(0,0,0,0.4)",
  },
  text:{marginBottom:14},
  body:{color:C.textMid,fontSize:12,lineHeight:1.6,margin:"6px 0 0"},
  inlineLink:{background:"none",border:"none",color:C.blue,cursor:"pointer",
              fontFamily:"inherit",padding:0,fontSize:12,textDecoration:"underline"},
  btns:{display:"flex",gap:8},
  accept:{
    flex:1,background:`linear-gradient(90deg,${C.red},${C.blue})`,
    border:"none",color:C.bg,fontWeight:700,fontSize:13,padding:"10px 0",
    borderRadius:7,cursor:"pointer",fontFamily:"inherit",
  },
  decline:{
    flex:1,background:"transparent",border:`2px solid ${C.ink}`,
    color:C.ink,fontWeight:700,fontSize:13,padding:"10px 0",
    cursor:"pointer",fontFamily:"inherit",
  },
};

const ab={
  page:{minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",
        alignItems:"center",padding:"32px 16px 0"},
  card:{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,
        padding:"28px 24px",width:"100%",maxWidth:560,marginBottom:0},
  logoRow:{display:"flex",alignItems:"center",gap:14,marginBottom:24},
  title:{fontSize:26,fontWeight:900,color:C.text,margin:0,letterSpacing:"-0.5px"},
  sub:{color:C.textMid,fontSize:13,margin:"3px 0 0"},
  legalBtn:{
    flex:1,background:"transparent",border:`2px solid ${C.ink}`,
    color:C.ink,fontWeight:700,fontSize:13,padding:"10px 0",
    cursor:"pointer",fontFamily:"inherit",
  },
};
