import { Task } from '../mount/task';

export function tasks_builder(): void {
    for (const name in Game.rooms) {
        const sources = Game.rooms[name].find(FIND_SOURCES);
        for (const s_name in sources) {
            const id = sources[s_name].id;
            if (!Memory.is_in_task[id]) {
                Game.rooms[name].memory.tasks.push(new Task("harvest", null, null, sources[s_name].id));
                Memory.is_in_task[id] = true;
            }
        }
    }
}