import { find_source, get_source } from '../index';
export function upgrader(creep: Creep): void {

    if (!creep.memory.target) {
        creep.memory.target = creep.room.controller.id;
        creep.memory.state = "carry";
    }

    if (creep.memory.state == "carry") {
        if (!creep.memory.source) {
            creep.memory.source = find_source(creep);
        }
        get_source(creep);
    }
    else {
        const control = Game.getObjectById(creep.memory.target as Id<StructureController>);
        const temp = creep.upgradeController(control);
        if (temp == ERR_NOT_IN_RANGE) {
            creep.moveTo(control);
        } else if (temp == ERR_NOT_ENOUGH_RESOURCES) {
            creep.memory.state = "carry";
        }
    }
}