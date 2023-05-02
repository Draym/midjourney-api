import {NextFunction, Request, RequestHandler, Response} from "express"
import sso from "../clients/sso.client"
import {AuthRawData, logger} from "@d-lab/api-kit"
import {AuthMeResponse} from "@d-lab/sso"
import {isNotNull, throwIfNull} from "@d-lab/common-kit"
import Errors from "../utils/errors/Errors"

declare global {
    namespace Express {
        interface Request {
            auth?: AuthRawData | undefined
            caller?: AuthMeResponse | undefined
        }
    }
}

export const authMiddleware = (): RequestHandler => {

    async function verifyJWT(Authorization: string): Promise<AuthMeResponse> {
        return await sso.auth.me(Authorization)
    }

    return async <R extends Request>(req: R, res: Response, next: NextFunction) => {
        try {
            const bearerToken = req.header("Authorization")?.split("Bearer ")[1] || null
            const apiKey = req.header("x-api-key") || null

            if (isNotNull(bearerToken)) {
                const user = await verifyJWT(bearerToken!)
                req.auth = {
                    token: bearerToken!,
                    apiKey : null
                }
                req.caller = user
            }
            if (isNotNull(apiKey)) {
                req.auth = {
                    token: req.auth?.token || null,
                    apiKey: apiKey!
                }
            }
            throwIfNull(req.auth, Errors.REQUIRE_Token())
            next()
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }
}

export default authMiddleware
