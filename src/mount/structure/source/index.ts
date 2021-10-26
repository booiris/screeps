import { find } from "lodash";

let key = [[0, 1], [1, 0], [-1, 0], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];

export class source_ex extends Source {

    public onWork(): void {
        const id = this.id;
        if (!global.source)
            global.source = {};
        if (!global.source[id]) {
            for (let i = 0; i < 8; i++) {
                let nx = this.pos.x + key[i][0], ny = this.pos.y + key[i][1];
                if (!global.rooms[this.room.name].get(nx, ny)) {
                    global.source[id] = new RoomPosition(nx, ny, this.room.name);
                    const find = global.source[id].lookFor(LOOK_CONSTRUCTION_SITES);
                    // 判断位置是否有正在建造或者已经造好的容器
                    if (!find.length) {
                        const find = new RoomPosition(nx, ny, this.room.name).lookFor(LOOK_STRUCTURES);
                        if (!find.length) {
                            this.room.createConstructionSite(nx, ny, STRUCTURE_CONTAINER);
                        }
                    }
                    break;
                }
            }
        }
        else {
            const pos: RoomPosition = global.source[id];
            const find1 = pos.lookFor(LOOK_CONSTRUCTION_SITES);
            const find2 = pos.lookFor(LOOK_STRUCTURES);
            if (!find1.length && !find2.length)
                this.room.createConstructionSite(pos.x, pos.y, STRUCTURE_CONTAINER);
        }
    }

}