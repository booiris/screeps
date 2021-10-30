import { find_source, get_source } from '../index';
export function carryer(creep: Creep) {
    if (!creep.memory.target) {
        if (creep.room.memory.tasks[1].length) {
            creep.memory.target = creep.room.memory.tasks[1].shift();
        }
        let max_store = 0;
        if (!creep.memory.target) {
            const structures: StructureExtension | StructureSpawn | StructureTower[] = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER)
                }
            });
            for (const i of structures) {
                const temp: number = i.store.getFreeCapacity(RESOURCE_ENERGY);
                if (temp <= 0)
                    continue;
                if (temp > max_store) {
                    max_store = temp;
                    creep.memory.target = i.id;
                }
            }
        }
        if (!creep.memory.target) {
            creep.moveTo(creep.room.find(FIND_MY_SPAWNS)[0]);
            return;
        }

        creep.memory.state = "carry";
    }

    if (creep.memory.state == "carry") {
        if (!creep.memory.source) {
            creep.memory.source = find_source(creep);
        }
        get_source(creep);
    }
    else {
        const target: Structure = Game.getObjectById(creep.memory.target);
        if (!target) {
            creep.memory.target = undefined;
        }
        const temp = creep.transfer(target, RESOURCE_ENERGY);
        if (temp == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else if (temp == ERR_NOT_ENOUGH_RESOURCES) {
            creep.memory.state = "carry";
            creep.memory.target = undefined;
        } else if (temp != 0) {
            creep.memory.target = undefined;
        }
    }
}