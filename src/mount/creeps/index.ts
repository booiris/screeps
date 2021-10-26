import { harvester } from '../../roles/harvester/index';
export class creep_ex extends Creep {

    public onWork() {

        if (this.spawning) return;

        switch (this.memory.role) {
            case "harvester":
                harvester(this);
                break;
            case "carryer":
                break;
            case "builder":
                break;
            default:
                break;
        }
    }
}

