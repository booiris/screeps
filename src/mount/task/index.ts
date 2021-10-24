export class Task {
    task_name: string;
    from: string;
    to: string;
    item: string;
    constructor(task_name: string, from = null, to = null, item = null) {
        this.task_name = task_name;
        this.from = from;
        this.to = to;
        this.item = item;
    }
}

export function mount_task(): void {

}

export function use(task: Task, creep: Creep): void {
    switch (task.task_name) {
        case "harvest":
            harvest(task, creep);
            break;
        case "build":
            build(task, creep);
            break
        case "update":
            update(task, creep);
            break
        case "carry":
            carry(task, creep);
        default:
            break;
    }
}

function harvest(task: Task, creep: Creep): void {
    let source: Source = Game.getObjectById(task.item);
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    };
}

function build(task: Task, creep: Creep): void { }

function update(task: Task, creep: Creep): void { }

function carry(task: Task, creep: Creep): void {

}