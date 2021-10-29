export function add_building_task(building: ConstructionSite) {
    const room_name = building.room.name;
    building.room.memory.build_task[0].push(building.id);
}

export function add_repair_task(build: Structure) {
    const room_name = build.room.name;
    build.room.memory.build_task[1].push(build.id);
}