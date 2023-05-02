import {IsNumberString} from "class-validator"

export default class GetRequest {
    @IsNumberString()
    logId: string
}