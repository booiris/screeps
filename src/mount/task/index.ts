export function add_building_task(building: ConstructionSite) {
    const room_name = building.room.name;
    building.room.memory.build_task[0].push(building.id);
}