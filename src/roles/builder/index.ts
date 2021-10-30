import { find_source, get_source } from '../index';
export function builder(creep: Creep) {
    if (!creep.memory.target) {
        if (creep.room.memory.tasks[0].length) {
            creep.memory.target = creep.room.memory.tasks[0].shift();
            if (!Memory.build[creep.memory.target])
                creep.memory.target = undefined;
            else
                Memory.build[creep.memory.target].in_task--;
        }
        let max_hit = 0;
        if (!creep.memory.target) {
            const structures = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_ROAD)
                }
            });
            for (const i of structures) {
                if (i instanceof StructureController)
                    continue;
                const temp = (i.hitsMax - i.hits) / i.hitsMax;
                if (temp > max_hit) {
                    max_hit = temp;
                    creep.memory.target = i.id;
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
        if (!target) {
            delete Memory.build[creep.memory.target];
            creep.memory.target = undefined;
            return;
        }

        let temp = undefined;
        if (target instanceof ConstructionSite) {
            temp = creep.build(target);
        } else if (target instanceof StructureRoad || target instanceof StructureContainer) {
            temp = creep.repair(target);
        } else {
            creep.memory.target = undefined;
        }
        if (temp == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else if (temp == ERR_NOT_ENOUGH_RESOURCES) {
            creep.memory.state = "carry";
            if (!(target instanceof ConstructionSite))
                creep.memory.target = undefined;
        } else if (temp == ERR_INVALID_TARGET) {
            delete Memory.build[creep.memory.target];
            creep.memory.target = undefined;
        } else if (temp != 0) {
            creep.memory.target = undefined;
        }
    }

}