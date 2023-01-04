export interface StatsResult extends Record<string, any> {
    count_messages: number | null,
    size_messages: number | null
}
