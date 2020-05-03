const csv = require('csv-parser');
const fs = require('fs');

const input = require('./input');
const champ = require('./champions')[input.champion];
const util = require('./util');
const optimise = require('./optimise').optimise

util.l(`Running for ${input.champion}.`);
util.d(`Champion stats ${input.champion}: ${util.pp(champ)}`);

// Apply the great hall and masteries bonus
var bonus = {}
util.add_stats(bonus, input.masteries);
util.add_stats(bonus, input.gh_tier);
if (champ.affinity == "magic") {
    util.add_stats(bonus, input.gh_magic);
} else if (champ.affinity == "spirit") {
    util.add_stats(bonus, input.gh_spirit);
} else if (champ.affinity == "force") {
    util.add_stats(bonus, input.gh_force);
} else if (champ.affinity == "void") {
    util.add_stats(bonus, input.gh_void);
} else {
  util.l("No affinity bonus for champion affinity: " + champ.affinity);
}


util.d(`Bonus from masteries and Great Hall: ${util.pp(bonus)}`);

gear_file = process.argv[2] || 'gear.csv';
util.l(`Loading items from ${gear_file}`);
all_gear=[];
var num_skipped = 0;
fs.createReadStream(gear_file)
  .pipe(csv())
  .on('data', (row) => {
    if (row['skip'] && !row['unskip']) {
      num_skipped++;
      return;
    }
    all_gear.push(row);
  })
  .on('end', () => {
    console.log(`Loaded ${all_gear.length} items (skipped ${num_skipped}).`);
    optimise(champ, all_gear, bonus, input.score, input.min_goal, input.max_goal);
  });
