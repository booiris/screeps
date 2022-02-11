export function harvester(creep: Creep): void {


    if (!creep.memory.target) {
        const targets: Source[] = creep.room.find(FIND_SOURCES);
        for (const source of targets) {
            if (!global.source[source.id].is_creep_working) {
                creep.memory.target = source.id;
                break;
            }
        }
    }

    const source_id = creep.memory.target;
    global.source[source_id].is_creep_working = true;

    const stand_pos: RoomPosition = global.source[source_id].stand_pos;

    if (!creep.pos.isEqualTo(stand_pos)) {
        creep.moveTo(stand_pos);
    }
    else {
        const building: Array<ConstructionSite> = stand_pos.lookFor(LOOK_CONSTRUCTION_SITES);
        if (creep.store[RESOURCE_ENERGY] > 0 && building.length)
            creep.build(building[0]);
        else {
            const source: Source = Game.getObjectById(source_id as Id<Source>);
            creep.harvest(source);
        }
    }

    if (creep.ticksToLive < 2) {
        creep.drop(RESOURCE_ENERGY);
    }
}
