import { find_source, get_source } from '../index';
export function carryer(creep: Creep) {
    if (!creep.memory.target) {
        if (creep.room.memory.tasks[1].length) {
            creep.memory.target = creep.room.memory.tasks[1].shift();
        }

        let min_store = 1000000000;
        if (!creep.memory.target) {
            const structures: StructureExtension | StructureSpawn | StructureTower[] = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER)
                }
            });
            for (const i of structures) {
                if (i.store[RESOURCE_ENERGY] == i.store.getCapacity())
                    continue;
                if (i.store[RESOURCE_ENERGY] < min_store) {
                    min_store = i.store[RESOURCE_ENERGY];
                    creep.memory.target = i.id;
                }
            }
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