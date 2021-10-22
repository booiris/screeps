interface Memory {
    stats: StatsMemory
}
interface StatsMemory {
    /**
     * GCl/GPL 升级百分比
     */
    gcl?: number
    gclLevel?: number
    gpl?: number
    gplLevel?: number
    /**
     * CPU 当前数值及百分比
     */
    cpu?: number
    /**
     * bucket 当前数值
     */
    bucket?: number
}