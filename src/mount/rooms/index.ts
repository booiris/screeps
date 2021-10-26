import { source_ex } from '../structure/source/index';
export class room_ex extends Room {
    public onWork() {
        const name = this.name;
        if (!global.rooms)
            global.rooms = {}
        if (!global.rooms[name]) {
            global.rooms[name] = Game.map.getRoomTerrain(name);
        }
        const targets: source_ex[] = this.find(FIND_SOURCES);
        for (const name in targets)
            targets[name].onWork();
    }
}