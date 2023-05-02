import 'dotenv/config'

const ssoConfig = {
    SSO_ENDPOINT: process.env.SSO_ENDPOINT!,
    SSO_API_KEY: process.env.SSO_API_KEY!
};

export default ssoConfig