export function builder(creep: Creep) {
    if (!creep.memory.target) {
        if (creep.room.memory.build_task[0].length) {
            creep.memory.target = creep.room.memory.build_task[0].shift();
            creep.room.memory.building[creep.memory.target].in_task--;
        }
    }
    creep.room.memory.building[creep.memory.target].query--;

    
}