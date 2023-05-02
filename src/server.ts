import 'dotenv/config'
import {connectionParams, sequelize} from "./db/database"
import {logger} from "@d-lab/api-kit"

const app = require("./app");

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    logger.success(`[server] API is running on port ${PORT}`)
})

async function setupDatabase() {
    await sequelize.authenticate({
        retry: {
            max: 5,
        },
    })
}

setupDatabase()
    .then(() => {
        logger.success(`[server] Database is running on ${connectionParams.host}:${connectionParams.port}`)
    })
    .catch(logger.error)