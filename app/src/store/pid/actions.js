export const PID = 'PID'
export function savePID(pid) {
    return { type: PID, pid };
}