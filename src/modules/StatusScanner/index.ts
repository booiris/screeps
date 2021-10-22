export const initGlobalStats = function () {
    if (!Memory.stats) Memory.stats = {};
}

export const stateScanner = function () {
    if (Game.time % 19) return

    if (!Memory.stats) Memory.stats = {}

    // 统计 GCL / GPL 的升级百分比和等级
    Memory.stats.gcl = (Game.gcl.progress / Game.gcl.progressTotal) * 100
    Memory.stats.gclLevel = Game.gcl.level
    Memory.stats.gpl = (Game.gpl.progress / Game.gpl.progressTotal) * 100
    Memory.stats.gplLevel = Game.gpl.level
    // CPU 的当前使用量
    Memory.stats.cpu = Game.cpu.getUsed()
    // bucket 当前剩余量
    Memory.stats.bucket = Game.cpu.bucket;
}



export const stateScannerPlugin = {
    reset: initGlobalStats,
    tickEnd: stateScanner
}