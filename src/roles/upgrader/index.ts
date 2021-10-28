export function upgrader(creep: Creep): void {

    if (!creep.memory.state) {
        creep.memory.state = "carry";
    }

    if (creep.memory.state == "carry") {
        if (!creep.memory.source) {
            creep.memory.source = find_source(creep);
        }

        const source = Game.getObjectById(creep.memory.source);
        if (source instanceof Source) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
            else {
                creep.memory.source = undefined;
            }
        } else if (source instanceof Structure) {
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
            else {
                creep.memory.source = undefined;
            }
        }

        if (creep.store[RESOURCE_ENERGY] >= creep.store.getCapacity()) {
            creep.memory.state = "working";
        }
    }
    else {
        if (!creep.memory.target) {
            creep.memory.target = creep.room.controller.id;
        }
        const control: StructureController = Game.getObjectById(creep.memory.target);
        const temp = creep.upgradeController(control);
        if (temp == ERR_NOT_IN_RANGE) {
            creep.moveTo(control);
        } else if (temp == ERR_NOT_ENOUGH_RESOURCES) {
            creep.memory.state = "carry";
        }
    }
}

export function find_source(creep: Creep): string {
    //TODO 寻找最近的资源点
    const source:Source = creep.room.find(FIND_SOURCES)[0];
    return source.id;
}