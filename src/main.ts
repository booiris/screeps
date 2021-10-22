import { errorMapper } from './modules/errorMapper'
import { stateScannerPlugin } from './modules/StatusScanner'
import App from './mount/FrameWork/index';

const app = new App({ name: "myApp" });

app.catcher = errorMapper;

app.on(stateScannerPlugin)

export const loop = () => app.run();