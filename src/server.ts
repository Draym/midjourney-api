import 'dotenv/config'
import {connectionParams, sequelize} from "./db/database"
import {logger} from "@d-lab/api-kit"
import app from "./app"

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

/**
 * Error handler
 */
process.on('SIGINT', () => {
    logger.error('SIGINT signal received.')
})
process.on('SIGTERM', () => {
    logger.error('SIGTERM signal received.')
})
process.on('uncaughtException', error => {
    logger.error('Uncaught Exception:', error)
})