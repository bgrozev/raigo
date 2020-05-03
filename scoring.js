function crit_multiplier(crate, cdmg) {
    return 1 + (Math.min(crate,100)/100) * (cdmg/100)
}
function set_multiplier(sets) {
    // The effectiveness of Ignore Defence depends on the target's defense. 
    // For reasonable defense values (3000-5000), a ratio of 0.8 (1% ID increases dmg by 0.8%) is a good approximation
    // See https://docs.google.com/spreadsheets/d/1a_L6FbAmDGWO5KI_xiUw-8MLSV1QIhBMjoHBTGQUEMQ/edit#gid=1875308691
    var ignore_defense_multiplier = 0.8;
    var ignore_defense = 0;
    var relentless_multiplier = 1;
    // TODO: are there other sets that we can estimate the effects of?

    sets.forEach(set_name => {
        if (set_name == 'cruel') {
            ignore_defense += 0.05;
        } else if (set_name == 'savage') {
            ignore_defense += 0.25;
        } else if (set_name == 'relentless') {
          relentless_multiplier = 1.18
        }
    });

    return relentless_multiplier * (1 + ignore_defense * ignore_defense_multiplier);
}

module.exports = {
    hp: {
      name: 'Maximum HP',
      f: (stats) => stats['hp']
    },
    atk: {
      name: 'Maximum ATK',
      f: (stats) => stats['atk']
    },
    def: {
      name: 'Maximum DEF',
      f: (stats) => stats['def']
    },
    spd: {
      name: 'Maximum SPD',
      f: (stats) => stats['spd']
    },
    crate: {
      name: 'Maximum CRATE',
      f: (stats) => stats['crate']
    },
    cdmg: {
      name: 'Maximum CDMG',
      f: (stats) => stats['cdmg']
    },
    res: {
      name: 'Maximum RES',
      f: (stats) => stats['res']
    },
    acc: {
      name: 'Maximum ACC',
      f: (stats) => stats['acc']
    },
    attack_based_damage_with_speed: {
      name: 'Maximum DAMAGE based on ATK (with speed)',
      f: (stats, sets) => {
        // Assume damage grows proportional to speed
        return stats['atk'] * stats['spd'] * crit_multiplier(stats['crate'], stats['cdmg']) * set_multiplier(sets);
      }
    },
    attack_based_damage: {
      name: 'Maximum DAMAGE based on ATK',
      f: (stats, sets) => {
        // Assume damage grows proportional to speed
        return stats['atk'] * crit_multiplier(stats['crate'], stats['cdmg']) * set_multiplier(sets);
      }
    },
    defense_based_damage_with_speed: {
      name: 'Maximum DAMAGE based on DEF (with speed)',
      f: (stats, sets) => {
        // Assume damage grows proportional to speed
        return stats['atk'] * stats['spd'] * crit_multiplier(stats['crate'], stats['cdmg']) * set_multiplier(sets);
      }
    },
    defense_based_damage: {
      name: 'Maximum DAMAGE based on DEF',
      f: (stats, sets) => {
        // Assume damage grows proportional to speed
        return stats['atk'] * crit_multiplier(stats['crate'], stats['cdmg']) * set_multiplier(sets);
      }
    }
}