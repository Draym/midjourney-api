import {RequestHandler} from "express"
import {Role} from "@d-lab/sso"
import sso from "../clients/sso.client"
import {Auth, isNotNull} from "@d-lab/common-kit"
import Errors from "../utils/errors/Errors"

export const hasRole = (role: Role, strict: boolean = false): RequestHandler => {
    return async (req, res, next) => {
        try {
            const auth = req.auth

            let isAllowed

            if (isNotNull(auth!.token)) {
                isAllowed = await sso.application.isUserAllowed({
                    strict: strict ? "true" : "false",
                    requiredRole: role
                }, Auth.token(auth!.token!))
            } else if (isNotNull(auth!.apiKey)) {
                const app = await sso.application.details(auth!.apiKey!)
                isAllowed = await sso.application.isUserAllowed({
                    userId: app.ownerId.toString(),
                    strict: strict ? "true" : "false",
                    requiredRole: role
                })
            } else {
                throw Errors.REQUIRE_Token()
            }

            if (isAllowed.allowed) {
                next()
            } else {
                throw Errors.REQUIRE_Role(role)
            }
        } catch (error) {
            next(error)
        }
    }
}

export default hasRole