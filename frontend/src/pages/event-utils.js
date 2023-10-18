let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
    {
    id: createEventId(),
    title: 'First Group Meeting',
    start: todayStr
    },
    {
    id: createEventId(),
    title: 'Meet Time',
    start: todayStr + 'T12:00:00'
    }
]

export function createEventId() {
    return String(eventGuid++)
}
