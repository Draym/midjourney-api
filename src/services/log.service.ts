import db from "../db/database"
import {LogModel} from "../models"
import {LogEvent, LogScope} from "../enums"
import {nowUTC} from "@d-lab/common-kit"

export default class LogService {

    async create(scope: LogScope, event: LogEvent, message: string | null, code: string | null, createdBy: string): Promise<LogModel> {
        return await db.Logs.create({
            scope: scope,
            event: event,
            message: message,
            code: code,
            createdBy: createdBy,
            createdAt: nowUTC()
        })
    }
}
