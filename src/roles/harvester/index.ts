export function harvester(source_id: string, creep: Creep): void {

    const stand_pos: RoomPosition = global.source[source_id];

    if (!creep.pos.isEqualTo(stand_pos)) {
        creep.moveTo(stand_pos);
    }
    else {
        const building: Array<ConstructionSite> = stand_pos.lookFor(LOOK_CONSTRUCTION_SITES);
        if (creep.store[RESOURCE_ENERGY] > 0 && building.length)
            creep.build(building[0]);
        else {
            const source: Source = Game.getObjectById(source_id);
            creep.harvest(source);
        }
    }
}
