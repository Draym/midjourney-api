import ArtRequestRepo from "./art-request.repo"
import LogRepo from "./log.repo"
const logRepo = new LogRepo()

const artRequestRepo = new ArtRequestRepo()

export {
	artRequestRepo,
	logRepo,
}
