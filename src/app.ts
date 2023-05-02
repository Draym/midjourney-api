import 'dotenv/config'
import express from "express"
import morgan from "morgan"
import compression from "compression"
import cors from "cors"
import helmet from "helmet"
import routers from "./routes"
import {errorMiddleware} from "@d-lab/api-kit"

const app = express()
app.use(morgan("combined"))
app.use(express.json())
app.use(compression())
app.use(express.urlencoded({extended: true}))
app.use(helmet())
app.use(
    cors({
        origin: true,
        credentials: true,
    }),
)
app.get("/api", (_, res) => res.json("API Service OK"))
app.get("/api/version", (_, res) => res.json({version: process.env.npm_package_version}))

routers.map(router => app.use('/api', router))

app.use(errorMiddleware)

export default app