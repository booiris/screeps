import { source_ex } from './source/index';
import { construction_ex } from './construction/index';
export class room_ex extends Room {
    public onWork() {
        const name = this.name;
        // TODO 数据是否存在于 global 的判断位置可以修改

        if (!global.rooms[name]) {
            global.rooms[name] = {};
            global.rooms[name].terrian = Game.map.getRoomTerrain(name);
        }

        if (!this.memory.build_task) {
            this.memory.build_task = new Array();
            for (let i = 0; i < 3; i++) {
                this.memory.build_task.push(new Array());
            }
        }

        const targets: source_ex[] = this.find(FIND_SOURCES);

        for (const name in targets)
            targets[name].onWork();

        const constructions: construction_ex[] = this.find(FIND_MY_CONSTRUCTION_SITES);
        if (!Memory.build)
            Memory.build = {};
        for (const name in constructions)
            constructions[name].onWork();
    }
}