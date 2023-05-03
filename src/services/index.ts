import ArtRequestService from "./art-request.service"
import LogService from "./log.service"

const logService = new LogService()

const artRequestService = new ArtRequestService()

export {
	artRequestService,
    logService
}