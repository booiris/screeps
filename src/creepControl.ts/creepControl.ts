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
            const newName = '' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns[name].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: "harvester", source_id:"5bbcad2b9099fc012e636be7"}});
            creeps_num++;
        }
    }
}