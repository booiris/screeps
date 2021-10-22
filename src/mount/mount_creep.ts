import { use } from './mount_task';

export function mount_creep(): void {
    if (!Creep.prototype.work) {
        Creep.prototype.work = function (): void {
            if (!this.memory.work_task) {
                if (this.room.memory.tasks.length) {
                    this.memory.work_task = this.room.memory.tasks.pop();
                }
            }
            if (this.memory.work_task) {
                use(this.memory.work_task, this);
            }
        }
    }
}

