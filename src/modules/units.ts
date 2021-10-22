export function doing(...hashMaps: object[]): void {
    hashMaps.forEach((obj, index) => {
        // let startCost = Game.cpu.getUsed()

        // 遍历执行 work
        Object.values(obj).forEach(item => {
            if (item.work) item.work()
        })

        // 如果有需求的话就显示 cpu 消耗
        // if (Memory.showCost) log(`消耗 ${Game.cpu.getUsed() - startCost}`, [`[${index}]`])
    })
}