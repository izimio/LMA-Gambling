// defaults imports
import http from "http";
import Koa, { Context } from "koa";
import cors from "@koa/cors";
import Router from "koa-router";
import bodyParser from "koa-body";
import mongoose from "mongoose";

// Routers
import versionRouter from "./routes/versionRoutes";
import authRouter from "./routes/authRoutes";
import gamblingRouter from "./routes/gamblingRoutes";

import { Redis } from "ioredis";

// Middleware & config
import { errorMiddleware } from "./middlewares/error";

import {
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD,
    ALLOWED_ORIGINS,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_INITDB_DATABASE,
    MONGO_USER,
    MONGO_PASSWORD,
} from "./utils/config";

const app: Koa = new Koa();
const serverKoa = http.createServer(app.callback());

// app runs behind a proxy handling TLS
app.proxy = true;

app.use(
    cors({
        origin: (ctx) => {
            const origin = verifyOrigin(ctx);
            return origin;
        },
        credentials: true,
    })
);

function verifyOrigin(ctx: Context) {
    const allowedOrigins = ALLOWED_ORIGINS.split(",");
    const origin = ctx.headers.origin as string;
    if (!origin) {
        return "";
    }
    if (allowedOrigins.includes(origin)) {
        return origin;
    }
    return "";
}

function useRoute(app: Koa, router: Router) {
    app.use(router.routes());
    app.use(router.allowedMethods());
}

mongoose.set("strictQuery", false);
mongoose
    .connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_INITDB_DATABASE}`, {
        autoCreate: true,
        user: MONGO_USER,
        pass: MONGO_PASSWORD,
    })
    .then((_) => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error", err);
    });

app.use(
    bodyParser({
        includeUnparsed: true,
    })
);

app.use(errorMiddleware);

useRoute(app, versionRouter);
useRoute(app, authRouter);
useRoute(app, gamblingRouter);

export default serverKoa;
