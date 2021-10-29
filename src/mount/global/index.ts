export function mount_global() {
    if (!global.rooms)
        global.rooms = {};
    if (!global.source)
        global.source = {};
    if (!global.creeps)
        global.creeps = {};
    if (!global.spawns)
        global.spawns = {};
}