import { errorMapper } from './modules/errorMapper/index'
import { stateScannerPlugin } from './modules/StatusScanner'
import App from './modules/FrameWork/index';
import { primary_part } from './modules/primary_part';
import { creep_ex } from './mount/creeps/index';
import { room_ex } from './mount/rooms/index';
import { source_ex } from './mount/rooms/source/index';
import { spawn_ex } from './mount/structure/spawns/index';
import { structure_ex } from './mount/structure/index';
import { construction_ex } from './mount/rooms/construction/index';
import { mount_global } from './mount/global/index';

const mount_list: [AnyClass, AnyClass][] = [
    [Creep, creep_ex],
    [Room, room_ex],
    [Source, source_ex],
    [Spawn, spawn_ex],
    [Structure, structure_ex],
    [ConstructionSite, construction_ex]
]

const app = new App({ name: "myApp", mountList: mount_list });

app.catcher = errorMapper;

app.on(primary_part);

app.on(stateScannerPlugin);

app.on({ tickStart: mount_global, tickEnd: () => { console.log(Game.cpu.getUsed()) } });

export const loop = () => app.run();
