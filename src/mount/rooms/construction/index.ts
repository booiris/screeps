import { add_building_task } from '../../task/index';
export class construction_ex extends ConstructionSite {
    public onWork() {
        if (!Memory.building[this.id]) {
            Memory.building[this.id] = {};
            Memory.building[this.id].in_task = 0;
        }
        const temp = Memory.building[this.id].query - Memory.building[this.id].in_task;

        for (let i = 0; i < temp; i++) {
            add_building_task(this);
            Memory.building[this.id].in_task++;
        }
        Memory.building[this.id].query = 2;
    }
}