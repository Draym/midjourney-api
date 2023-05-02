import 'dotenv/config'

const dbConfig = {
    username: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
    database: process.env.MYSQL_DB_NAME!,
    host: process.env.MYSQL_HOST!,
    port: parseInt(process.env.MYSQL_PORT!),
};

export default dbConfig