export function find_source(creep: Creep): string {
    let res = undefined;
    const room_name = creep.room.name;

    let containers: StructureContainer[] = creep.room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER } });

    let min = 1000000000;
    for (const i of containers) {
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
        res = creep.room.find(FIND_SOURCES)[Game.time & 1].id;
    }

    return res;
}

export function get_source(creep: Creep) {
    const source = Game.getObjectById(creep.memory.source);
    if (source instanceof Source) {
        const temp = creep.harvest(source);
        if (temp == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
            check_stand(creep);
        }
        else if (temp != 0) {
            creep.memory.source = undefined;
        }
    } else if (source instanceof Structure) {
        const temp = creep.withdraw(source, RESOURCE_ENERGY);
        if (temp == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
            check_stand(creep);
        }
        else if (temp != 0) {
            creep.memory.source = undefined;
        }
    }

    if (creep.store[RESOURCE_ENERGY] >= creep.store.getCapacity()) {
        creep.memory.source = undefined;
        creep.memory.state = "working";
    }
}

function check_stand(creep: Creep) {
    const pos = creep.memory.pre_pos.split("/");
    const x = parseInt(pos[0]);
    const y = parseInt(pos[1]);
    if (creep.pos.isEqualTo(x, y)) {

        if (global.creeps[creep.id].stand_cnt > 3) {
            creep.memory.source = undefined;
            global.creeps[creep.id].stand_cnt = 0;
        } else {
            global.creeps[creep.id].stand_cnt++;
        }
    }
    else {
        global.creeps[creep.id].stand_cnt = 0;
    }
}