/* THE MASTER PLAN. Reset and the game plan page both read this. Update the whole object when the master changes. */
window.MASTER_PLAN = {
 "v": 2,
 "riders": [
  {
   "id": "r1",
   "name": "Waldo",
   "team": "black",
   "type": "",
   "note": "Road captain. Rolls steady, leads the pushing. Pulls single line turns after ODT if he has legs. Stay calm in S2 for absolute S3 ripper."
  },
  {
   "id": "r2",
   "name": "Darren",
   "team": "black",
   "type": "",
   "note": "Rolls steady, pulls single line turns after ODT if he has legs. Stay calm in S2 for absolute S3 ripper."
  },
  {
   "id": "r3",
   "name": "Miguel",
   "team": "black",
   "type": "",
   "note": "Just does Migs things. Fires bullets, easy early in S2 and S3 where useful, to fire the rest."
  },
  {
   "id": "r4",
   "name": "Corbin",
   "team": "red",
   "type": "",
   "note": "Be there, roll all the way. Leave pushing and hero turns to the WMDs until S3, then start adding what you have in reserve."
  },
  {
   "id": "r5",
   "name": "Jason",
   "team": "red",
   "type": "",
   "note": "Contribute to the rolling, stop the clock. David to stay calm in S1, start adding more watts through S2 and S3A as the legs play out."
  },
  {
   "id": "r6",
   "name": "David",
   "team": "red",
   "type": "",
   "note": "Contribute to the rolling, stop the clock. David to stay calm in S1, start adding more watts through S2 and S3A as the legs play out."
  },
  {
   "id": "r7",
   "name": "Cam",
   "team": "blue",
   "type": "Diesel",
   "note": "Rolling S1. No need for heroic after ODT if there's enough pace. Midway through S3 until the top of the Big Dawg drag is where you earn your lifetime of glory. Huge pulls, nothing to lose."
  },
  {
   "id": "r8",
   "name": "Sean",
   "team": "blue",
   "type": "Diesel",
   "note": "Rolling S1. No need for heroic after ODT if there's enough pace. Midway through S3 until the top of the Big Dawg drag is where you earn your lifetime of glory. Huge pulls, nothing to lose."
  },
  {
   "id": "r9",
   "name": "Ben",
   "team": "blue",
   "type": "Diesel",
   "note": "The ultimate secret weapon. Ben being free to not stop the clock means an unleash of watts with Sean and Cam halfway through S2 until the sisters. Get over the drag alive, and then show nuke squad levels of driving into/through the sisters."
  },
  {
   "id": "r10",
   "name": "Emil",
   "team": "blue",
   "type": "Diesel",
   "note": "Roll all the way, moderate turns, big ones in 1E at your discretion. Be there in S3 to allow the others a safety net. No work on the drag, start ripping the downhill into the sisters, then ramp up till there's 7."
  },
  {
   "id": "r11",
   "name": "Brendon",
   "team": "white",
   "type": "Bomb",
   "note": "Contribute as much time as possible up to ODT. Bang S2 until there's nothing left. S3, captain's last pull."
  },
  {
   "id": "r12",
   "name": "Matt",
   "team": "white",
   "type": "Bomb",
   "note": "Contribute as much time as possible up to ODT. Bang S2 until there's nothing left. S3, drink beer with Guillaume."
  }
 ],
 "sectors": [
  {
   "id": "s1a",
   "grp": 1,
   "name": "Start to Tradouw",
   "a": 0,
   "b": 30,
   "goal": "12 riders rolling through and off, fast but with no one hurting. Easy for the rider behind and keep it super tight. Do not burn legs early. \n",
   "style": "Rolling (through and off)",
   "kph": 44,
   "wf": 4.5,
   "wb": 3,
   "speed": false,
   "easy": false
  },
  {
   "id": "s1b",
   "grp": 1,
   "name": "Tradouw Pass",
   "a": 30,
   "b": 33.5,
   "goal": "4-4.2 W/kg on the front. Sean and Cam set the pace. Matt and Brendon sit mid-pack and get support from WMD.  We want 12 riders to the base of ODT",
   "style": "Two lines",
   "kph": 20,
   "wf": 4.2,
   "wb": 3.8,
   "speed": false,
   "easy": false
  },
  {
   "id": "s1c",
   "grp": 1,
   "name": "Tradouw to ODT",
   "a": 33.5,
   "b": 60,
   "goal": "Team rolling all the way. Bombsquad rolls with nothing to lose\n",
   "style": "Single line",
   "kph": 36,
   "wf": 4.5,
   "wb": 3.2,
   "speed": false,
   "easy": false
  },
  {
   "id": "s1d",
   "grp": 1,
   "name": "ODT",
   "a": 60,
   "b": 63.9,
   "goal": "Jason and David set the pace. Target is 4.3 W/kg. Waldo and Miguel sit at the back as sweepers keeping all ten riders together.",
   "style": "Two lines",
   "kph": 20,
   "wf": 4.2,
   "wb": 3.8,
   "speed": false,
   "easy": false
  },
  {
   "id": "s1e",
   "grp": 1,
   "name": "ODT to Ashton",
   "a": 63.9,
   "b": 112.26,
   "goal": "Hammer. Keep momentum, 10 riders as far as possible. \n5-10mins each in business class. ",
   "style": "Rolling (through and off)",
   "kph": 49,
   "wf": 4.5,
   "wb": 3.5,
   "speed": true,
   "easy": false
  },
  {
   "id": "s2a",
   "grp": 2,
   "name": "Out of Ashton",
   "a": 118.3,
   "b": 146,
   "goal": "Start calmly, all roll, then put a ton of work on the Bombsquad and the Diesels. ",
   "style": "Rolling (through and off)",
   "kph": 45,
   "wf": 4.5,
   "wb": 3.5,
   "speed": true,
   "easy": false
  },
  {
   "id": "s2b",
   "grp": 2,
   "name": "Into Bonnievale",
   "a": 146,
   "b": 156,
   "goal": "The Diesels do stupid things to themselves. Waldo and Darren take it frustratingly easy, save energy for S3. ",
   "style": "Single line",
   "kph": 45,
   "wf": 4.5,
   "wb": 3.5,
   "speed": false,
   "easy": false
  },
  {
   "id": "s3a",
   "grp": 3,
   "name": "Big Dawg Drag",
   "a": 162.04,
   "b": 174.3,
   "goal": "Sean, Cam and Ben make that drag faaast.",
   "style": "Rolling (through and off)",
   "kph": 33,
   "wf": 4,
   "wb": 3.6,
   "speed": false,
   "easy": false
  },
  {
   "id": "s3b",
   "grp": 3,
   "name": "Descent",
   "a": 174.3,
   "b": 183.6,
   "goal": "Fire into the sisters. Ben drives extra, and the WMDs needn't hold back.",
   "style": "Single line",
   "kph": 55,
   "wf": 4.5,
   "wb": 3,
   "speed": false,
   "easy": false
  },
  {
   "id": "s3c",
   "grp": 3,
   "name": "4 Sisters to finish",
   "a": 183.6,
   "b": 206.94,
   "goal": "Rip it. The 7th rider creates safety for the Township Dogs to go deep, with no risk. If we drop the 7th rider, he keeps riding so puncture backup is close, but we don't wait",
   "style": "Rolling (through and off)",
   "kph": 35,
   "wf": 4.5,
   "wb": 4.2,
   "speed": false,
   "easy": false
  }
 ],
 "stops": [
  {
   "after": "s1e",
   "name": "Neutral 1 Ashton TSZ",
   "km": 112.26,
   "tsz": 118.3,
   "mins": 45
  },
  {
   "after": "s2b",
   "name": "Neutral 2 Bonnievale TSZ",
   "km": 156,
   "tsz": 162.04,
   "mins": 45
  }
 ],
 "plan": {
  "r1": {
   "s1a": "L",
   "s1b": "B",
   "s1c": "L",
   "s1d": "L",
   "s1e": "L",
   "s2a": "L",
   "s2b": "P",
   "s3a": "L",
   "s3b": "S",
   "s3c": "S"
  },
  "r2": {
   "s1a": "L",
   "s1b": "B",
   "s1c": "L",
   "s1d": "L",
   "s1e": "L",
   "s2a": "L",
   "s2b": "P",
   "s3a": "L",
   "s3b": "S",
   "s3c": "S"
  },
  "r3": {
   "s1a": "L",
   "s1b": "L",
   "s1c": "L",
   "s1d": "L",
   "s1e": "L",
   "s2a": "P",
   "s2b": "L",
   "s3a": "L",
   "s3b": "L",
   "s3c": "S"
  },
  "r4": {
   "s1a": "L",
   "s1b": "L",
   "s1c": "L",
   "s1d": "L",
   "s1e": "L",
   "s2a": "L",
   "s2b": "L",
   "s3a": "L",
   "s3b": "L",
   "s3c": "S"
  },
  "r5": {
   "s1a": "L",
   "s1b": "L",
   "s1c": "L",
   "s1d": "L",
   "s1e": "P",
   "s2a": "L",
   "s2b": "L",
   "s3a": "L",
   "s3b": "L",
   "s3c": "S"
  },
  "r6": {
   "s1a": "L",
   "s1b": "L",
   "s1c": "L",
   "s1d": "L",
   "s1e": "L",
   "s2a": "L",
   "s2b": "L",
   "s3a": "L",
   "s3b": "S",
   "s3c": "S"
  },
  "r7": {
   "s1a": "L",
   "s1b": "L",
   "s1c": "L",
   "s1d": "L",
   "s1e": "P",
   "s2a": "S",
   "s2b": "S",
   "s3a": "S",
   "s3b": "R",
   "s3c": "R"
  },
  "r8": {
   "s1a": "L",
   "s1b": "L",
   "s1c": "L",
   "s1d": "L",
   "s1e": "L",
   "s2a": "S",
   "s2b": "S",
   "s3a": "S",
   "s3b": "R",
   "s3c": "R"
  },
  "r9": {
   "s1a": "L",
   "s1b": "L",
   "s1c": "L",
   "s1d": "L",
   "s1e": "L",
   "s2a": "L",
   "s2b": "S",
   "s3a": "S",
   "s3b": "S",
   "s3c": "R"
  },
  "r10": {
   "s1a": "L",
   "s1b": "L",
   "s1c": "L",
   "s1d": "L",
   "s1e": "L",
   "s2a": "L",
   "s2b": "S",
   "s3a": "P",
   "s3b": "B",
   "s3c": "S"
  },
  "r11": {
   "s1a": "L",
   "s1b": "P",
   "s1c": "S",
   "s1d": "R",
   "s1e": "R",
   "s2a": "S",
   "s2b": "S",
   "s3a": "R",
   "s3b": "R",
   "s3c": "R"
  },
  "r12": {
   "s1a": "L",
   "s1b": "P",
   "s1c": "S",
   "s1d": "R",
   "s1e": "R",
   "s2a": "S",
   "s2b": "S",
   "s3a": "R",
   "s3b": "R",
   "s3c": "R"
  }
 },
 "roles": {},
 "tasks": {},
 "rev": 1795081294843
};

/* THE BRIEF. Shown in the intro box on the game plan and the tool. */
window.MASTER_BRIEF = {
  "title": "Overall brief",
  "paras": [
    "Our plan is built on using every rider as hard as we can. Every watt and every kilojoule gets spent. We use every rider up at the right time so we cross the line with six riders plus a backup.",
    "The pivot of the whole race is Sector 3. We need 7 riders smashing it like it's Killarney Thursday night, hitting VO2 max on the climbs, and aim to take four or five minutes out of our rivals. We can do that because of our depth. The team is strong right down to the top ten riders, and many of us are big 80kg, 6ft units, giving us pace and protection on the fast flat section.",
    "Everyone knows their own effort, and everyone knows where they are meant to be burnt up. The point of your designated sectors is just about where you give effort and where you save it. We're all rolling most of the time, just taking key \"business class\" breaks when needed, and longer single-line turns when the watts are spare. If you last longer than you're supposed to you haven't given enough. If we finish with 8 riders we failed."
  ]
};

/* GENERAL NOTES and SECTOR HEADLINES from the handoff brief. Stored here; the app has no slot for them yet. */
window.MASTER_NOTES = {
  "general": [
    "Waldo is road captain. No fuckn questions. I'll chat at the breaks.",
    "Off the back is always by design.",
    "When it is a rider's sector to drive the pace, they give longer turns and skip minimal turns. A rider with real legs to share signals, switches from rolling to single line and gives 30-90 seconds on the front. This is not prescriptive. Riders know where their focus is and where they should be burnt up.",
    "Business class is a protected status. Any rider should ask road captain Waldo for 5 to 10 minutes in business class, one rider at a time.",
    "We start every sector with all 12."
  ],
  "headlines": [
    {
      "title": "Sector 1",
      "text": "momentum and conservation. Roll as a big group and keep as many riders together as possible, so everyone gets longer rests and shorter turns. Nobody outside of the bombsquad dies, and we get to Ashton quickly."
    },
    {
      "title": "Sector 2",
      "text": "the Bombsquad and the Diesels push big pace. They hold 45 plus, maybe 50 kph, through the whole sector. The strong riders who in a normal year would be among the top few are used here, while some of the traditionally strongest are saved. Easy on the Township Dogs and WMD. Start with 3 to 5 minutes rolling to find the routine, then kick on. In the headwinds, roll through, and if the headwind is as big as expected drop into single file for most of the sector. Matt and Brendon burn up what they have, the Diesels rip it through to the finish, and Waldo and Darren save legs to come into Sector 3 with more pushing capacity."
    },
    {
      "title": "Sector 3",
      "text": "the pivot. Sean and Cam set the pace up the Big Dawg Drag with longer turns in the wind while everyone else rolls through. In the last bends they push hard with long ripper turns and drop themselves. Emil is mainly the backup rider (lasts long, holds on well) so others can go deep. The aim is to deliver the top seven or eight riders to the Four Sisters with momentum and some kilojoules left. The finishers then fire the Sisters at short road race pace, VO2 max on the climbs, to find four or five minutes. Even at seven or eight riders, anyone who thinks they will pop tells Waldo, efforts are reallocated and a backup comes in. Halfway through the Sisters with too many riders, the remaining riders keep pushing until each is done. Seven riders go full gas to the third Sister, and we should finish with six."
    }
  ]
};
