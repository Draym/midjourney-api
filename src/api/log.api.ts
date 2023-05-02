import {GetRequest, ListRequest, LogResponse, LogsResponse} from "./dtos/log"
import {PathRequest, QueryRequest} from "@d-lab/api-kit"

export default interface LogApi {
    get(req: PathRequest<GetRequest>): Promise<LogResponse>
    list(req: QueryRequest<ListRequest>): Promise<LogsResponse>
}