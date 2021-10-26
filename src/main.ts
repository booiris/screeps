import { errorMapper } from './modules/errorMapper/index'
import { stateScannerPlugin } from './modules/StatusScanner'
import App from './modules/FrameWork/index';
import { primary_part } from './modules/primary_part';
import { creep_ex } from './mount/creeps/index';
import { room_ex } from './mount/rooms/index';
import { source_ex } from './mount/structure/source/index';
import { spawn_ex } from './mount/structure/spawns/index';

const mount_list: [AnyClass, AnyClass][] = [
    [Creep, creep_ex],
    [Room, room_ex],
    [Source, source_ex],
    [Spawn, spawn_ex],
]

const app = new App({ name: "myApp", mountList: mount_list });

app.catcher = errorMapper;

app.on(primary_part);

app.on(stateScannerPlugin);

app.on({ tickEnd: () => { console.log(Game.cpu.getUsed()) } });

export const loop = () => app.run();
