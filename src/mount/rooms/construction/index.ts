import { add_building_task } from '../../task/index';
export class construction_ex extends ConstructionSite {
    public onWork() {
        if (!Memory.build[this.id]) {
            Memory.build[this.id] = {};
            Memory.build[this.id].in_task = 0;
            Memory.build[this.id].query = 2;
        }
        const temp = Memory.build[this.id].query - Memory.build[this.id].in_task;

        for (let i = 0; i < temp; i++) {
            add_building_task(this);
            Memory.build[this.id].in_task++;
        }
        Memory.build[this.id].query = 2;
    }
}