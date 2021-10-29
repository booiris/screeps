export function find_source(creep: Creep): string {
    let res = undefined;
    const room_name = creep.room.name;

    if (!global.rooms[room_name].containers) {
        global.rooms[room_name].containers = creep.room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER } });
    }

    let min = 1000000000;
    for (const i of global.rooms[room_name].containers) {
        const container: StructureContainer = i;
        if (container.store[RESOURCE_ENERGY] < 300)
            continue;
        const temp = creep.pos.getRangeTo(container);
        if (temp < min) {
            res = container.id;
            min = temp;
        }
    }

    if (!res) {
        res = creep.room.find(FIND_SOURCES)[0].id;
    }

    return res;
}

export function get_source(creep: Creep) {
    const source = Game.getObjectById(creep.memory.source);
    if (source instanceof Source) {
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
        else {
            creep.memory.source = undefined;
        }
    } else if (source instanceof Structure) {
        if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source)
        }
        else {
            creep.memory.source = undefined;
        }
    }

    if (creep.store[RESOURCE_ENERGY] >= creep.store.getCapacity()) {
        creep.memory.state = "working";
    }
}