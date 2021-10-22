export const primary_part = function () {
    // TODO wait for update
    if (Game.cpu.bucket == 10000)
        Game.cpu.generatePixel();
    for (const room in Game.rooms) {
        let controller = Game.rooms[room].controller;
        if (controller.my && typeof (controller.safeModeCooldown) == "undefined" && typeof (controller.safeMode) == "undefined") {
            controller.activateSafeMode();
        }
    }
}