import {RequestState} from "../enums"
import {EnlargeType, VariationType} from "@d-lab/discord-puppet"

export default interface ArtRequest {
	id: number
	clientId: number
	requestId: string
	type: RequestType
	prompt: string | null
	promptAction: EnlargeType | VariationType | null
	actionTargetId: string | null
	state: RequestState
	imageUrl: string | null
	runnerId: number
	createdAt: Date
	updatedAt: Date
}