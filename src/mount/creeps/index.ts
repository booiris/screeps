import { harvester } from '../../roles/harvester/index';
import { builder } from '../../roles/builder/index';
import { carryer } from '../../roles/carryer/index';
export class creep_ex extends Creep {

    public onWork() {

        if (this.spawning) return;

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
            default:
                break;
        }

        if (this.ticksToLive < 2) {
            this.room.memory.spawn_task.push(this.memory.role);
            this.suicide();
        }
    }
}

