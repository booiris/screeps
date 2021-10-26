export function harvester(creep: Creep): void {
    

    if (!creep.memory.source_id) {
        const targets: Source[] = this.find(FIND_SOURCES);
    }

    const source_id = creep.memory.source_id;

    const stand_pos: RoomPosition = global.source[source_id];

    if (!creep.pos.isEqualTo(stand_pos)) {
        creep.moveTo(stand_pos);
    }
    else {
        creep.say("I am here");
        const building: Array<ConstructionSite> = stand_pos.lookFor(LOOK_CONSTRUCTION_SITES);
        if (creep.store[RESOURCE_ENERGY] > 0 && building.length)
            creep.build(building[0]);
        else {
            const source: Source = Game.getObjectById(source_id);
            creep.harvest(source);
        }
    }

    if (creep.ticksToLive < 2) {

        creep.drop(RESOURCE_ENERGY);
    }
}
