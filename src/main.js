import { errorMapper } from './modules/errorMapper'
import { creep_number_listener } from './modules/creepControl'
import { stateScanner } from './modules/statusScanner'
import { generatePix } from './modules/generatePix'

export const loop = errorMapper(() => {
    creep_number_listener()
    // doing(Game.creeps)
    generatePix();
    stateScanner()
})