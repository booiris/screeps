import { harvester } from '../../roles/harvester/index';
export class creep_ex extends Creep {

    public onWork() {
        switch (this.memory.role) {
            case "harvester":
                this.say("Hello world");
                harvester(this.memory.source_id, this);
                break;
        
            default:
                break;
        }
    }
}

