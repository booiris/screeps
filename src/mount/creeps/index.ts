import { harvester } from '../../roles/harvester/index';
import { builder } from '../../roles/builder/index';
import { carryer } from '../../roles/carryer/index';
import { upgrader } from '../../roles/upgrader/index';
export class creep_ex extends Creep {

    public onWork() {

        if (!global.creeps[this.id]) {
            global.creeps[this.id] = {};
            global.creeps[this.id].stand_cnt = 0;
        }

        if (this.spawning || this.fatigue > 0) return;

        switch (this.memory.role) {
            case "harvester":
                harvester(this);
                break;
            case "carryer":
                carryer(this);
                break;
            case "builder":
                builder(this);
                break;
            case "upgrader":
                upgrader(this);
            default:
                break;
        }

        this.memory.pre_pos = this.pos.x + '/' + this.pos.y;

        if (this.ticksToLive < 2) {
            this.room.memory.spawn_task.push(this.memory.role);
            this.suicide();
        }
    }
}

