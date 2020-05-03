# Raigo
Raigo is a tool to automatically optimise gear selection for [Raid: Shadow
Legends](https://plarium.com/en/mobile-games/raid-shadow-legends/).

# Running
## Prerequisites
First check out the repository and install the dependencies:
```
$ git clone https://github.com/bgrozev/raigo .
$npm install
```

## Input
Edit `input.js` to specify your account stats (great hall bonuses), select 
the champion to optimize for, the minimum required stats, and the stat to optimize.
You may need to add your champion to `champions.js` if it's missing.

## List of gear
Raigo operates on a list of items in CSV format. The format is described in
this [google sheet](https://docs.google.com/spreadsheets/d/14LJ_YrleIoahbuDJmIcTylUEosv-MF0mgQwMuZVTwdo).
You can just copy thee sheet, add your items, then download in CSV format.

## Running
After saving your gear in `gear.csv`, run raigo with `node main.js gear.csv` 

