const scoring = require('./scoring');

module.exports = {
    // Great Hall bonuses. These are all %-based and entered once for the account.
    gh_tier: {
        hpp: 20,
        atkp: 20,
        defp: 20
    },
    // Great hall Magic bonus
    gh_magic: {
        hpp: 8,
        atkp: 6,
        defp: 10,
        cdmg: 25,
        res: 20,
        acc: 80
    },

    // Great hall Spirit bonus
    gh_spirit: {
        hpp: 6,
        atkp: 6,
        defp: 8,
        cdmg: 21,
        res: 20,
        acc: 60
    },

    // Great hall Force bonus
    gh_force: {
        hpp: 4,
        atkp: 6,
        defp: 4,
        cdmg: 12,
        res: 15,
        acc: 60
    },

    // Great hall Void bonus
    gh_void: {
        hpp: 6,
        atkp: 6,
        defp: 8,
        cdmg: 12,
        res: 20,
        acc: 80
    },

    // TODO: Allow certain sets to be required (e.g. lifesteal)
    //requiredSets: [],

    // TODO: skip_rare
    // TODO: skip_5_star

    // The champion to optimise for. Must be included in champions.js (easy to add if missing).
    champion: 'Septimus',

    // Extra stats from masteries for the particular champion, take from the "Total Stats" page.
    masteries: {
        hp: 0,
        atk: 0,
        def: 0,
        spd: 0,
        crate: 5,
        cdmg: 10,
        res: 0,
        acc: 10
    },

    // Minimum acceptable stats (leave at 0 for no minimum)
    min_goal: {
        hp: 0,
        atk: 0,
        def: 0,
        spd: 0,
        crate: 0,
        cdmg: 0,
        res: 0,
        acc: 0
    },

    // Maximum acceptable stats (only useful to limit speed?)
    max_goal: {
        hp: 9999999,
        atk: 9999999,
        def: 9999999,
        spd: 9999999,
        crate: 9999999,
        cdmg: 9999999,
        res: 9999999,
        acc: 9999999
    },

    // Scoring function, i.e. what to optimise for.
    // Use 'hp', 'atk', 'def', 'spd', 'cdmg', 'res', 'acc' to maximize a single stat.
    // Use 'attack_based_damage' and 'defense_based_damage' to maximize damage based on atk or def
    // (taking into account crit rate and damage, as well as sets that add ignore defense).
    // 
    // See scoring.js for a full list.
    score: scoring.spd
}
