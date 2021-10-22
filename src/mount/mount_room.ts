import { Task } from './mount_task';

export function mount_room(): void {
    for (const name in Game.rooms) {
        if (!Game.rooms[name].memory.tasks) {
            Game.rooms[name].memory.tasks = new Array<Task>();
        }
    }

    if (!Memory.is_in_task) {
        Memory.is_in_task = {};
    }

}