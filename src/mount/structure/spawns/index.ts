import { priority_role, config } from './creep_config';
export class spawn_ex extends Spawn {
    public onWork() {

        if (Game.time % 300 == 0) {
            check_creep_number();
        }

        for (const name in Game.spawns) {
            const spawn = Game.spawns[name];
            const spawn_task = spawn.room.memory.spawn_task;
            if (spawn_task.length) {
                const role = spawn_task[0];
                if (!spawn.spawnCreep([WORK, CARRY, MOVE], "1", { dryRun: true })) {
                    const newName = '' + Game.time;
                    console.log('Spawning new harvester: ' + newName);
                    spawn.spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: role } });
                    spawn.room.memory.spawn_task.shift();
                }
            }
        }
    }
}

export const start_spawn_task = check_creep_number;

function check_creep_number(): void {
    console.log("check creeps num");
    let creep_cnt = {};

    for (const name in Game.rooms) {
        creep_cnt[name] = {};
        for (const role of priority_role) {
            creep_cnt[name][role] = 0;
        }
        for (let role of Game.rooms[name].memory.spawn_task) {
            creep_cnt[name][role]++;
        }
    }

    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
        else {
            const creep = Game.creeps[name];
            const room_name = creep.room.name;
            creep_cnt[room_name][creep.memory.role]++;
        }
    }
    for (const room_name in creep_cnt) {
        const level = Game.rooms[room_name].controller.level;
        for (const role of priority_role) {
            for (let i = creep_cnt[room_name][role]; i < config[role][level]; i++)
                Game.rooms[room_name].memory.spawn_task.push(role);
        }
    }
}