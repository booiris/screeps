import { find_source, get_source } from '../index';
export function builder(creep: Creep) {
    if (!creep.memory.target) {
        for (let i = 0; i < 3; i++) {
            if (creep.room.memory.build_task[i].length) {
                creep.memory.target = creep.room.memory.build_task[i].shift();
                Memory.build[creep.memory.target].in_task--;
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