import 'dotenv/config'

const discordConfig = {
    DISCORD_USERNAME: process.env.DISCORD_USERNAME!,
    DISCORD_PASSWORD: process.env.DISCORD_PASSWORD!,
    DISCORD_USER_DATA_DIR: process.env.DISCORD_USER_DATA_DIR!,
    APP_PUPPET_HEADLESS: process.env.APP_PUPPET_HEADLESS! === 'true',
    APP_PUPPET_ARGS: JSON.parse(process.env.APP_PUPPET_ARGS!) as string[],
    RUNNERS: JSON.parse(process.env.RUNNERS!) as string[]
}

export default discordConfig