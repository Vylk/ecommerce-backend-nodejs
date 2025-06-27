

type Environment = 'dev' | 'product'

const env = (process.env.NODE_ENV as Environment) || "dev"

const dev = {
    app : {
        port: parseInt(process.env.DEV_SERVER_PORT || "3000")
    },
    database : {
        host: process.env.DEV_MONGODB_HOST,
        port: parseInt(process.env.DEV_MONGODB_PORT || "27017"),
        user: process.env.DEV_MONGODB_USER,
        password: process.env.DEV_MONGODB_PASSWORD,
        db_name: process.env.DEV_MONGODB_DBNAME || "shopPro"
    }
}
const product = {
    ...dev,
    app : {
        port: parseInt(process.env.PRO_SERVER_PORT || "3000")
    },
    database : {
        host: process.env.PRO_MONGODB_HOST,
        port: parseInt(process.env.PRO_MONGODB_PORT || "27017"),
        user: process.env.PRO_MONGODB_USER,
        password: process.env.PRO_MONGODB_PASSWORD,
        db_name: process.env.PRO_MONGODB_DBNAME || "shopPro"
    }
}

type AppConfig = typeof dev

const config : Record<Environment, AppConfig> = {dev, product}

export default config[env]