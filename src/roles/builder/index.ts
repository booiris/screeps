export function builder(creep: Creep) {
    if (!creep.memory.target) {
        if (creep.room.memory.build_task[0].length) {
            creep.memory.target = creep.room.memory.build_task[0].shift();
            Memory.building[creep.memory.target].in_task--;
        }
    }
    Memory.building[creep.memory.target].query--;

    
}