export const PARTITION_LIST = 'PARTITION_LIST'

export function savePartition(list) {
    return { type: PARTITION_LIST, list };
}