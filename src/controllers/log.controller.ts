import {AuthPathRequest, AuthQueryRequest, Filter, Page} from "@d-lab/api-kit"
import {GetRequest, ListRequest, LogResponse, LogsResponse} from "../api/dtos/log"
import LogApi from "../api/log.api"
import {toOptDate} from "@d-lab/common-kit"
import {logRepo} from "../repositories"

export default class LogController implements LogApi {

    async list(req: AuthQueryRequest<ListRequest>): Promise<LogsResponse> {
        const params = req.query
        const page = Page.from(params)
        const filter = new Filter()
        filter.equals({scope: params.scope, event: params.event, code: params.code})
        filter.like({message: params.message})
        filter.gt({createdAt: toOptDate(params.createdAfter)})
        filter.lt({createdAt: toOptDate(params.createdBefore)})
        filter.paginate(page)
        const logs = await logRepo.findAll(filter)
        return {
            logs,
            ...page.result(logs)
        }
    }

    async get(req: AuthPathRequest<GetRequest>): Promise<LogResponse> {
        const payload = req.params
        const log = await logRepo.get(Number.parseInt(payload.logId))
        return {
            log
        }
    }
}