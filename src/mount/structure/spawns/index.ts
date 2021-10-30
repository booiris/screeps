import { priority_role, config, spawn_level } from './creep_config';
export class spawn_ex extends Spawn {
    public onWork() {


        if (!global.spawns[this.id]) {
            global.spawns[this.id] = {};
            global.spawns[this.id].source_path = [];
            const sources: Source[] = this.room.find(FIND_SOURCES);
            for (let source of sources) {
                const path = PathFinder.search(this.pos, global.source[source.id].stand_pos).path;
                global.spawns[this.id].source_path.push(path);
            }
        }

        for (let path of global.spawns[this.id].source_path) {
            this.room.visual.poly(path, { stroke: '#ffffff', strokeWidth: .8, opacity: .2, lineStyle: 'dashed' });
        }


        if (Game.time % 100 == 0) {
            check_creep_number();
        }
        // check_creep_number();

        for (const name in Game.spawns) {
            const spawn = Game.spawns[name];
            const spawn_task = spawn.room.memory.spawn_task;
            if (spawn_task.length) {
                const role = spawn_task[0];
                const level = this.room.controller.level;
                const make_config = spawn_level[role][level];
                if (!spawn.spawnCreep(make_config, "1", { dryRun: true })) {
                    const newName = '' + Game.time;
                    console.log('Spawning new harvester: ' + newName);
                    spawn.spawnCreep(make_config, newName, { memory: { role: role } });
                    spawn.room.memory.spawn_task.shift();
                }
            }
        }
    }
}

global.spawn = check_creep_number;

function check_creep_number(): void {
    console.log("check creeps num");
    let creep_cnt = {};

    for (const name in Memory.build) {
        if (!Game.getObjectById(name)) {
            delete Memory.build[name];
        }
    }

    for (const name in Game.rooms) {
        creep_cnt[name] = {};
        if (!Game.rooms[name].memory.spawn_task)
            Game.rooms[name].memory.spawn_task = [];
        for (const role of priority_role) {
            creep_cnt[name][role] = 0;
        }
        for (let role of Game.rooms[name].memory.spawn_task) {
            creep_cnt[name][role]++;
        }
    }

    for (const name in Memory.rooms) {
        if (!Game.rooms[name])
            delete Memory.rooms[name];
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