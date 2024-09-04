// =================== [Application] =================== //

export const PORT = process.env.PORT as string;
if (!PORT) {
    throw new Error("PORT is not defined");
}

export const VERSION = process.env.VERSION as string;
if (!VERSION) {
    throw new Error("VERSION is not defined");
}

// =================== [CORS] =================== //

export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS as string;
if (!ALLOWED_ORIGINS) {
    throw new Error("ALLOWED_ORIGINS is not defined");
}

// =================== [Kraken API] =================== //

export const API_KEY = process.env.API_KEY as string;
if (!API_KEY) {
    throw new Error("API_KEY is not defined");
}

export const API_SECRET = process.env.API_SECRET as string;
if (!API_SECRET) {
    throw new Error("API_SECRET is not defined");
}

// =================== [Redis] =================== //

export const REDIS_HOST = process.env.REDIS_HOST as string;
if (!REDIS_HOST) {
    throw new Error("REDIS_HOST is not defined");
}

export const REDIS_PORT = process.env.REDIS_PORT as string;
if (!REDIS_PORT) {
    throw new Error("REDIS_PORT is not defined");
}

export const REDIS_PASSWORD = process.env.REDIS_PASSWORD as string;

// =================== [JWT] =================== //

export const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

// =================== [MongoDB] =================== //

export const MONGO_HOST = process.env.MONGO_HOST as string;
if (!MONGO_HOST) {
    throw new Error("MONGO_HOST is not defined");
}

export const MONGO_PORT = process.env.MONGO_PORT as string;
if (!MONGO_PORT) {
    throw new Error("MONGO_PORT is not defined");
}

export const MONGO_INITDB_DATABASE = process.env
    .MONGO_INITDB_DATABASE as string;
if (!MONGO_INITDB_DATABASE) {
    throw new Error("MONGO_INITDB_DATABASE is not defined");
}

export const MONGO_USER = process.env.MONGO_USER as string;
if (!MONGO_USER) {
    throw new Error("MONGO_USER is not defined");
}

export const MONGO_PASSWORD = process.env.MONGO_PASSWORD as string;
if (!MONGO_PASSWORD) {
    throw new Error("MONGO_PASSWORD is not defined");
}

export const MONGO_INITDB_ROOT_USERNAME = process.env
    .MONGO_INITDB_ROOT_USERNAME as string;
if (!MONGO_INITDB_ROOT_USERNAME) {
    throw new Error("MONGO_INITDB_ROOT_USERNAME is not defined");
}

export const MONGO_INITDB_ROOT_PASSWORD = process.env
    .MONGO_INITDB_ROOT_PASSWORD as string;
if (!MONGO_INITDB_ROOT_PASSWORD) {
    throw new Error("MONGO_INITDB_ROOT_PASSWORD is not defined");
}

// =================== [Solana] =================== //

export const SOLANA_RPC = process.env.SOLANA_RPC as string;
if (!SOLANA_RPC) {
    throw new Error("SOLANA_RPC is not defined");
}

export const P2P_PROGRAM_ID = process.env.P2P_PROGRAM_ID as string;
if (!P2P_PROGRAM_ID) {
    throw new Error("P2P_PROGRAM_ID is not defined");
}

export const MAILJET_API_KEY = process.env.MAILJET_API_KEY as string;
if (!MAILJET_API_KEY) {
    throw new Error("MAILJET_API_KEY is not defined");
}

export const MAILJET_API_SECRET = process.env.MAILJET_API_SECRET as string;
if (!MAILJET_API_SECRET) {
    throw new Error("MAILJET_API_SECRET is not defined");
}

export const MAILJET_FROM_EMAIL = process.env.MAILJET_FROM_EMAIL as string;
if (!MAILJET_FROM_EMAIL) {
    throw new Error("MAILJET_FROM_EMAIL is not defined");
}
