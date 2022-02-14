export class structuretower_ex extends StructureTower {
    public onWork() {
        const hostile_targets = this.room.find(FIND_HOSTILE_CREEPS || FIND_HOSTILE_POWER_CREEPS || FIND_HOSTILE_STRUCTURES);
        if (hostile_targets.length != 0) {
            this.attack(hostile_targets[0])
            return
        }
        // const my_creeps = this.room.find(FIND_MY_CREEPS, {
        //     filter: function (object) {
        //         return object.hits != object.hitsMax;
        //     }
        // });
        // if (my_creeps.length != 0) {
        //     this.heal(my_creeps[0])
        //     return
        // }
        const my_struct = this.pos.findInRange(FIND_MY_STRUCTURES, 5, {
            filter: function (object) {
                return object.hits < object.hitsMax / 2;
            }
        });
        if (my_struct.length != 0) {
            this.repair(my_struct[0])
            return
        }
    }
}