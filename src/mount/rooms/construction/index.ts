import { add_building_task } from '../../task/index';
export class construction_ex extends ConstructionSite {
    public onWork() {
        if (!this.room.memory.building[this.id]) {
            this.room.memory.building[this.id] = {};
            this.room.memory.building[this.id].in_task = 0;
        }
        const temp = this.room.memory.building[this.id].query - this.room.memory.building[this.id].in_task;

        for (let i = 0; i < temp; i++) {
            add_building_task(this);
            this.room.memory.building[this.id].in_task++;
        }
        this.room.memory.building[this.id].query = 2;
    }
}