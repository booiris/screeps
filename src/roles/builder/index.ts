import { find_source, get_source } from '../index';
export function builder(creep: Creep) {
    if (!creep.memory.target) {
        for (let i = 0; i < 3; i++) {
            if (creep.room.memory.build_task[i].length) {
                creep.memory.target = creep.room.memory.build_task[i].shift();
                Memory.build[creep.memory.target].in_task--;
            }
        }

        if (!creep.memory.target) {
            const structures = creep.room.find(FIND_MY_STRUCTURES);
            for (const i of structures) {
                if (i.hits < i.hitsMax >> 1) {
                    creep.memory.target = i.id;
                    break;
                }
            }
        }

        creep.memory.state = "carry";
    }
    if (Memory.build[creep.memory.target])
        Memory.build[creep.memory.target].query--;

    if (creep.memory.state == "carry") {
        if (!creep.memory.source) {
            creep.memory.source = find_source(creep);
        }
        get_source(creep);
    }
    else {
        const target: ConstructionSite | Structure = Game.getObjectById(creep.memory.target);
        let temp = undefined;
        if (target instanceof ConstructionSite) {
            temp = creep.build(target);
        } else if (target instanceof Structure) {
            temp = creep.repair(target);
        } else {
            delete Memory.build[creep.memory.target];
            creep.memory.target = undefined;
            return;
        }
        if (temp == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else if (temp == ERR_NOT_ENOUGH_RESOURCES) {
            creep.memory.state = "carry";
        } else if (temp == ERR_INVALID_TARGET) {
            delete Memory.build[creep.memory.target];
            creep.memory.target = undefined;
        }
    }

}