export var config = {
    harvester: [2, 2, 2, 2, 2],
    carryer: [0, 1, 1, 1, 1],
    builder: [0, 2, 3, 3, 6],
    upgrader: [0, 1, 3, 3, 3],
}

export var priority_role = ["harvester", "upgrader", "carryer", "builder"]

export var spawn_level = {
    harvester: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, MOVE],
        [WORK, WORK, WORK, MOVE, MOVE],
        [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE]
    ],
    carryer: [
        [CARRY, CARRY, MOVE, MOVE],
        [CARRY, CARRY, MOVE, MOVE],
        [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
        [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
    ],
    builder: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, MOVE],
        [WORK, WORK, CARRY, MOVE, MOVE],
        [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
    ],
    upgrader: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, MOVE],
        [WORK, WORK, CARRY, MOVE, MOVE],
        [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
    ]
}