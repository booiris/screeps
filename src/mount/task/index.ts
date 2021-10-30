export function add_building_task(building: ConstructionSite) {
    const room_name = building.room.name;
    building.room.memory.tasks[0].push(building.id);
}

export function add_spawn_task(spawn: Structure) {
    const room_name = spawn.room.name;
    spawn.room.memory.tasks[1].push(spawn.id);
}