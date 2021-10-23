import { errorMapper } from './modules/errorMapper/index'
import { stateScannerPlugin } from './modules/StatusScanner'
import App from './modules/FrameWork/index';
import { primary_part } from './modules/primary_part';

const app = new App({ name: "myApp" });

app.catcher = errorMapper;

app.on(primary_part);

app.on(stateScannerPlugin);

export const loop = () => app.run();