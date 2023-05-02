import LogDto from "./log.dto"
import {PageResponse} from "@d-lab/api-kit"

export default interface LogsResponse extends PageResponse {
    logs: LogDto[]
}