import { config } from './creep_config';
export const creep_number_listener = function () {

    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    let creeps_num = _.values(Game.creeps).length;

    for (const name in Game.spawns) {
        if (!Game.spawns[name].spawnCreep([WORK, CARRY, MOVE],
            'Worker1', { dryRun: true }) && creeps_num < config.normal) {
            var newName = '' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns[name].spawnCreep([WORK, CARRY, MOVE], newName);
            creeps_num++;
        }
        // if (Game.spawns[name].spawning) {
        //     var spawningCreep = Game.creeps[Game.spawns[name].spawning.name];
        //     Game.spawns[name].room.visual.text(
        //         '🛠️' + "harvester",
        //         Game.spawns[name].pos.x + 1,
        //         Game.spawns[name].pos.y,
        //         { align: 'left', opacity: 0.8 });
        // }
    }
}