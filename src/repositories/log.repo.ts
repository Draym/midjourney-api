import db from "../db/database"
import {LogModel} from "../models"
import Errors from "../utils/errors/Errors"
import {Filter} from "@d-lab/api-kit"
import {throwIfNull} from "@d-lab/common-kit"

export default class LogRepo {
    public async getAll(): Promise<LogModel[]> {
        return await db.Logs.findAll()
    }

    async findBy(filter: Filter): Promise<LogModel | null> {
        return db.Logs.findOne(filter.get())
    }

    async getBy(filter: Filter): Promise<LogModel> {
        const it = await this.findBy(filter)
        throwIfNull(it, Errors.NOT_FOUND_Log(filter.stringify()))
        return it!
    }

    async findAll(filter: Filter): Promise<LogModel[]> {
        return db.Logs.findAll(filter.get())
    }
    
    async find(id: number): Promise<LogModel | null> {
        return db.Logs.findByPk(id)
    }
    
    async get(id: number): Promise<LogModel> {
        const it = await this.find(id)
        throwIfNull(it, Errors.NOT_FOUND_Log(`id[${id}`))
        return it!
    }
}
