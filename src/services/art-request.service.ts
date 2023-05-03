import db from "../db/database"
import {ArtRequestModel} from "../models"
import {EnlargeType, VariationType} from "@d-lab/discord-puppet"
import {RequestState} from "../enums"
import {artRequestRepo} from "../repositories"
import {isEmpty} from "@d-lab/common-kit"
import Errors from "../utils/errors/Errors"
import discordConfig from "../config/discord.config"

export default class ArtRequestService {
    currentRunner = 0

    async create(clientId: number,
                 requestId: string,
                 type: RequestType,
                 prompt: string | null,
                 promptAction: EnlargeType | VariationType | null,
                 actionTargetId: string | null): Promise<ArtRequestModel> {
        this.validateRequest(type, prompt, promptAction, actionTargetId)
        return await db.ArtRequests.create({
            clientId: clientId,
            requestId: requestId,
            type: type,
            prompt: prompt,
            promptAction: promptAction,
            actionTargetId: actionTargetId,
            state: RequestState.CREATED,
            imageUrl: null,
            runnerId: this.nextRunnerId()
        })
    }

    private nextRunnerId() {
        const runnerId = this.currentRunner + 1
        if (runnerId < discordConfig.RUNNERS.length) {
            this.currentRunner = runnerId
            return runnerId
        } else {
            this.currentRunner = 0
            return 0
        }
    }

    async processed(id: number, imageUrl: string): Promise<ArtRequestModel> {
        const request = await artRequestRepo.get(id)
        await request.update({
            imageUrl: imageUrl,
            state: RequestState.PROCESSED
        })
        // TODO notify with apiKey endpoint
        //Http.post()
        return request
    }

    async processedFailure(id: number): Promise<ArtRequestModel> {
        const request = await artRequestRepo.get(id)
        await request.update({
            state: RequestState.ERROR
        })
        // TODO notify with apiKey endpoint
        //Http.post()
        return request
    }

    validateRequest(type: RequestType,
                    prompt: string | null,
                    promptAction: EnlargeType | VariationType | null,
                    actionTargetId: string | null) {
        switch (type) {
            case RequestType.ENLARGE:
                if (isEmpty(promptAction) || isEmpty(actionTargetId)) {
                    throw Errors.INVALID_ART_Request(`missing promptAction[${promptAction}] or actionTargetId[${actionTargetId}]`)
                }
                if (!Object.values<string>(EnlargeType).includes(promptAction!)) {
                    throw Errors.INVALID_ART_Request(`promptAction[${promptAction}] is not available for type[${type}]`)
                }
                break
            case RequestType.VARIATION:
                if (isEmpty(promptAction) || isEmpty(actionTargetId)) {
                    throw Errors.INVALID_ART_Request(`missing promptAction[${promptAction}] or actionTargetId[${actionTargetId}]`)
                }
                if (!Object.values<string>(VariationType).includes(promptAction!)) {
                    throw Errors.INVALID_ART_Request(`promptAction[${promptAction}] is not available for type[${type}]`)
                }
                break
            case RequestType.IMAGINE:
                if (isEmpty(prompt)) {
                    throw Errors.INVALID_ART_Request(`prompt is empty`)
                }
                break
            case RequestType.IMAGINE_VARIATION:
                if (isEmpty(prompt)) {
                    throw Errors.INVALID_ART_Request(`prompt is empty`)
                }
                if (!Object.values<string>(VariationType).includes(promptAction!)) {
                    throw Errors.INVALID_ART_Request(`promptAction[${promptAction}] is not available for type[${type}]`)
                }
                break
            case RequestType.IMAGINE_ENLARGE:
                if (isEmpty(prompt)) {
                    throw Errors.INVALID_ART_Request(`prompt is empty`)
                }
                if (!Object.values<string>(EnlargeType).includes(promptAction!)) {
                    throw Errors.INVALID_ART_Request(`promptAction[${promptAction}] is not available for type[${type}]`)
                }
                break
            default:
                throw Errors.INVALID_ART_Request("type not recognize.")
        }
    }
}
