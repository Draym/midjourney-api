import {EnlargeType, Message, MidjourneyPuppet, options, VariationType} from "@d-lab/discord-puppet"
import discordConfig from "../config/discord.config"
import {artRequestRepo} from "../repositories"
import {eq, logger} from "@d-lab/api-kit"
import {artRequestService, logService} from "../services"
import RequestState from "../enums/request-state.enum"
import {isNotNull, isNull} from "@d-lab/common-kit"
import {LogEvent, LogScope} from "../enums"

export default class MidjourneyClient {
    running = false
    interval?: NodeJS.Timer
    processing: boolean
    puppet: MidjourneyPuppet
    runnerId: number
    channelName: string

    constructor(runnerId: number, channelName: string) {
        this.processing = false
        this.interval = undefined
        this.runnerId = runnerId
        this.channelName = channelName
        this.puppet = new MidjourneyPuppet(options(
            discordConfig.DISCORD_USERNAME,
            discordConfig.DISCORD_PASSWORD,
            discordConfig.APP_PUPPET_ARGS,
            discordConfig.DISCORD_USER_DATA_DIR,
            true,
            discordConfig.APP_PUPPET_HEADLESS
        ))
        this.processRequests = this.processRequests.bind(this);
    }

    async start() {
        await this.puppet.start()
        await this.puppet.clickServer("My AI Art")
        await this.puppet.clickChannel(this.channelName)
        await this.puppet.sendMessage(`[midjourney-api-${this.runnerId}] ready`)
        this.running = true
    }

    private async processRequests() {
        if (this.processing) {
            logger.info('[Midjourney] Skipping execution - previous run still in progress')
            return
        }
        this.processing = true
        const requests = await artRequestRepo.findAll(eq({state: RequestState.CREATED, runnerId: this.runnerId}).orderAsc("id"))
        for (const request of requests) {
            try {
                let result: Message | null = null
                switch (request.type) {
                    case RequestType.ENLARGE:
                        try {
                            result = await this.puppet.imageEnlarge(request.actionTargetId!, request.promptAction! as EnlargeType)
                        } catch (e) {
                            await logService.create(LogScope.ART_REQUEST, LogEvent.UPDATE, request.id.toString(), e.message, "service")
                        }
                        break
                    case RequestType.VARIATION:
                        try {
                            result = await this.puppet.imageVariation(request.actionTargetId!, request.promptAction! as VariationType)
                        } catch (e) {
                            await logService.create(LogScope.ART_REQUEST, LogEvent.UPDATE, request.id.toString(), e.message, "service")
                        }
                        break
                    case RequestType.IMAGINE:
                        result = await this.puppet.imagine(request.prompt!)
                        break
                    case RequestType.IMAGINE_ENLARGE:
                        result = await this.puppet.imagineLarge(request.prompt!, request.promptAction! as EnlargeType)
                        break
                    case RequestType.IMAGINE_VARIATION:
                        result = await this.puppet.imagineVariant(request.prompt!, request.promptAction! as VariationType)
                        break
                    default:
                        await logService.create(LogScope.ART_REQUEST, LogEvent.UPDATE, request.id.toString(), `unknown request type[${request.type}]`, "service")
                        break
                }
                if (isNull(result)) {
                    await artRequestService.processedFailure(request.id)
                } else if (isNotNull(result!.imageUrl)) {
                    await artRequestService.processed(request.id, result!.imageUrl!)
                }
            } catch (e) {
                logger.error(e.message)
                await logService.create(LogScope.ART_REQUEST, LogEvent.UPDATE, request.id.toString(), e.message, "service")
            }
        }
        this.processing = false
    }

    async listen() {
        this.interval = setInterval(this.processRequests, 60000)
    }

    async stop() {
        if (isNotNull(this.interval)) {
            clearInterval(this.interval)
        }
        if (this.running) {
            await this.puppet.shutdown()
        }
        this.running = false
    }
}