import {ErrorCode} from "../../enums"
import {HttpException} from "@d-lab/api-kit"

const Errors = {
	NOT_FOUND_ArtRequest: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_ArtRequest, `ArtRequest not found for ${reason}`),
    NOT_FOUND_Log: (reason: string) => new HttpException(ErrorCode.NOT_FOUND_Log, `${reason}`),
    REQUIRE_Token: () => new HttpException(ErrorCode.REQUIRE_Token, `Authentication token missing.`),
    REQUIRE_Role: (role: string) => new HttpException(ErrorCode.REQUIRE_Role, `User has not the required[${role}] role.`),
    INVALID_ART_Request: (reason: string) => new HttpException(ErrorCode.INVALID_ART_Request, `ArtRequest is invalid: ${reason}`),
}

export default Errors