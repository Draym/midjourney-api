import {LogEvent, LogScope} from "../../../enums"

export default interface LogDto {
    id: number
    scope: LogScope
    event: LogEvent
    message: string | null
    code: string | null
    createdBy: string
    createdAt: Date
}