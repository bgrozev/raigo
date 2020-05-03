 const STATS = ["hp", "hpp", "atk", "atkp", "def", "defp", "spd", 'spdp', "crate", "cdmg", "res", "acc"];
 const BASIC_STATS = ["hp", "atk", "def", "spd", "crate", "cdmg", "res", "acc"];
 const enable_debug = false;
module.exports = {
    STATS,
    BASIC_STATS,
    add_stats: function (base, to_add) {
        STATS.forEach(stat => {
            base[stat] = (base[stat] || 0) + Number(to_add[stat] || 0);
        });
    },
    d: function(m) { if (enable_debug) { console.log(m); } },
    l: function(m) { console.log(m); },
    pp: function(o) { return JSON.stringify(o, null, 2)},
    filter_basic: function(stats) {
        var ret = {}
        BASIC_STATS.forEach(s => {
            ret[s] = stats[s];
        })
        return ret
    }
}