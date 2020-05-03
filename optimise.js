const util = require('./util')
function optimise(champ, gear, bonus, score, min_goal, max_goal) {

    var weapons = gear.filter(i => i.type == 'weapon');
    var helmets = gear.filter(i => i.type == 'helmet');
    var shields = gear.filter(i => i.type == 'shield');

    var gloves = gear.filter(i => i.type == 'gauntlets');
    var chests = gear.filter(i => i.type == 'chestplate');
    var boots = gear.filter(i => i.type == 'boots');

    var rings = gear.filter(i => i.type == 'ring' && i.set == champ.faction);
    var amulets = gear.filter(i => i.type == 'amulet' && i.set == champ.faction);
    var banners = gear.filter(i => i.type == 'banner' && i.set == champ.faction);

    NO_GEAR = {};
    if (weapons.length == 0) { weapons.push(NO_GEAR); };
    if (helmets.length == 0) { helmets.push(NO_GEAR); };
    if (shields.length == 0) { shields.push(NO_GEAR); };
    if (gloves.length == 0) { gloves.push(NO_GEAR); };
    if (chests.length == 0) { chests.push(NO_GEAR); };
    if (boots.length == 0) { boots.push(NO_GEAR); };
    if (rings.length == 0) { rings.push(NO_GEAR); };
    if (amulets.length == 0) { amulets.push(NO_GEAR); };
    if (banners.length == 0) { banners.push(NO_GEAR); };

    var gear_by_type = [
        weapons, helmets, shields,
        gloves, chests, boots,
        rings, amulets, banners
    ].filter(b => b.length > 0);


    util.l(`Optimizing for: ${score.name}.`);
    var combinations = 1;
    gear_by_type.forEach(x => combinations *= x.length);
    const combinations_per_second = 110000; // what I get on my machine
    util.l(`Will examine ${combinations} combinations (~${(combinations / (60*combinations_per_second)).toFixed(2)} minutes).`);

    var patterns = ['...', '.-.', '.|.', '.-.'];
    process.stdout.write(patterns[0])
    var count = 0

    var best_stats = null;
    var best_score = 0;
    var best_set = null;
    for (var w in weapons) {
    for (var h in helmets) {
    for (var s in shields) {
    for (var g in gloves) {
    for (var c in chests) {
    for (var b in boots) {
    for (var r in rings) {
    for (var a in amulets) {
    for (var ba in banners) {
        count++;
        if (count % combinations_per_second == 0) {
            var progress = count * 100 / combinations;
            process.stdout.write(`\r${progress.toFixed(1)}% ${patterns[count/combinations_per_second % patterns.length]}`)
        }

        var gear_set = [weapons[w], helmets[h], shields[s], gloves[g], chests[c], boots[b], rings[r], amulets[a], banners[ba]];
        var set_bonus = get_set_bonus(gear_set);
        var total_bonus = {};
        util.add_stats(total_bonus, bonus);
        util.add_stats(total_bonus, set_bonus);
        var total_stats = apply_bonus_to_champion(champ, total_bonus);

        if (accept(total_stats, min_goal, max_goal)) {
            var current_score = score.f(total_stats, get_sets(gear_set))
            if (!best_stats || (current_score > best_score)) {
                best_stats = total_stats;
                best_set = gear_set;
                best_score = current_score;
            }
        }

    }}}}}}}}}

    util.l('')
    util.l('Completed.')
    if (best_stats) {
        util.l(`The optimal set has a score of ${best_score.toFixed(2)} and yields: ${util.pp(util.filter_basic(best_stats))}`);
        best_set.forEach(i => util.l(JSON.stringify(i)));
    }
    else {
        util.l('No sets satisfy the min/max conditions.');
    }
}

function accept(stats, min, max) {
    for(var i in util.BASIC_STATS) {
        var stat = util.BASIC_STATS[i];

        if((stats[stat] || 0) < min[stat]) { 
            return false; 
        }

        if((stats[stat] || 99999999) > max[stat]) { 
            return false; 
        }

    };

    return true;
}

function apply_bonus_to_champion(champ, bonus) {
  totalStats = {};
  util.add_stats(totalStats, champ);
  totalStats["hp"] += (bonus["hpp"] || 0) * champ["hp"] * 0.01 + (bonus["hp"] || 0);
  totalStats["atk"] += (bonus["atkp"] || 0) * champ["atk"] * 0.01 + (bonus["atk"] || 0);
  totalStats["def"] += (bonus["defp"] || 0) * champ["def"] * 0.01 + (bonus["def"] || 0);
  totalStats["spd"] += (bonus['spdp'] || 0) * champ['spd'] * 0.01 + (bonus["spd"] || 0);
  totalStats["crate"] += (bonus["crate"] || 0);
  totalStats["cdmg"] += (bonus["cdmg"] || 0);
  totalStats["res"] += (bonus["res"] || 0);
  totalStats["acc"] += (bonus["acc"] || 0);

  return totalStats;
}

function get_set_bonus(gear_set) {
    var set_bonus = {};
    gear_set.forEach(item => {
        util.add_stats(set_bonus, item);
    });

    get_sets(gear_set).forEach(set_name => {
        switch (set_name) {
            case 'life':
            case 'divine life':
            case 'immortal':
                set_bonus['hpp'] += 15;
                break;
            case 'offense':
            case 'divine offense':
            case 'cruel':
                set_bonus['atkp'] += 15;
                break;
            case 'defense':
                set_bonus['defp'] += 15;
                break;
            case 'critical rate':
            case 'divine critical rate':
                set_bonus['crate'] += 12;
                break;
            case 'accuracy':
                set_bonus['acc'] += 40;
                break;
            case 'speed':
            case 'divine speed':
                set_bonus['spdp'] += 12;
                break;
            case 'resistance':
                set_bonus['res'] += 40;
                break;
            case 'crit damage':
                set_bonus['cdmg'] += 20;
                break;
        }
    })
    return set_bonus;
}

const two_sets = ['life', 'offense', 'defense', 'speed', 'critical rate', 'crit damage', 'accuracy', 'resistance',
    'cruel', 'immortal', 'divine offense', 'divine critical rate', 'divine life', 'divine speed'];
const four_sets = ['lifesteal', 'fury', 'daze', 'cursed', 'frost', 'regeneration', 'immunity', 'shield', 'relentless',
    'savage', 'destroy', 'stun', 'toxic', 'taunting', 'retaliation', 'avenging', 'stalwart', 'reflex', 'curing'];

function get_sets(gear_set) {
    var ret = [];
    two_sets.forEach(set_name => {
        var count = gear_set.filter(item => item.set == set_name).length;
        for (var i = 2; i <= 6; i+= 2) {
            if (count >= i) {
                ret.push(set_name);
            }
        }
    })
    four_sets.forEach(set_name => {
        var count = gear_set.filter(item => item.set == set_name).length;
        if (count >= 4) {
            ret.push(set_name);
        }
    });
    return ret
}

module.exports = { optimise }