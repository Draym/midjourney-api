import db from "../db/database"
import {ArtRequestModel} from "../models"
import Errors from "../utils/errors/Errors"
import {Filter} from "@d-lab/api-kit"
import {throwIfNull} from "@d-lab/common-kit"

export default class ArtRequestRepo {
    public async getAll(): Promise<ArtRequestModel[]> {
        return await db.ArtRequests.findAll()
    }

    async findBy(filter: Filter): Promise<ArtRequestModel | null> {
        return db.ArtRequests.findOne(filter.get())
    }

    async getBy(filter: Filter): Promise<ArtRequestModel> {
        const it = await this.findBy(filter)
        throwIfNull(it, Errors.NOT_FOUND_ArtRequest(filter.stringify()))
        return it!
    }

    async findAll(filter: Filter): Promise<ArtRequestModel[]> {
        return db.ArtRequests.findAll(filter.get())
    }
    
    async find(id: number): Promise<ArtRequestModel | null> {
        return db.ArtRequests.findByPk(id)
    }
    
    async get(id: number): Promise<ArtRequestModel> {
        const it = await this.find(id)
        throwIfNull(it, Errors.NOT_FOUND_ArtRequest(`id[${id}`))
        return it!
    }
}
