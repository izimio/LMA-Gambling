import { Context, Middleware } from "koa";
import {
    ValidationError,
    AuthError,
    InternalError,
    ForbiddenError,
    ObjectNotFoundError,
    errorHandler,
    ConflictError,
} from "../utils/error";

export const errorMiddleware: Middleware = async (ctx: Context, next: any) => {
    try {
        await next();
    } catch (error) {
        errorHandler(error, { type: "request", request: ctx.request });
        if (error instanceof AuthError) {
            console.log("AuthError", error);
            ctx.status = 401;
            ctx.body = {
                ok: false,
                error: error.message || "Invalid authorization",
            };
            return;
        }
        if (error instanceof InternalError) {
            console.log("InternalError", error);
            ctx.status = 500;
            ctx.body = {
                ok: false,
                error:
                    error.message ||
                    "Something went wrong, you should retry later.",
            };
            return;
        }
        if (error instanceof ValidationError) {
            console.log("ValidationError:", error.message);
            ctx.status = 400;
            ctx.body = { ok: false, error: error.message };
            return;
        }
        if (error instanceof ForbiddenError) {
            console.log("ForbiddenError:", error.message);
            ctx.status = 403;
            ctx.body = { ok: false, error: error.message };
            return;
        }
        if (error instanceof ConflictError) {
            console.log("ConflictError:", error.message);
            ctx.status = 409;
            ctx.body = { ok: false, error: error.message };
            return;
        }
        if (error instanceof ObjectNotFoundError) {
            console.log("ObjectNotFoundError:", error.message);
            ctx.status = 404;
            ctx.body = { ok: false, error: error.message };
            return;
        }
    }
};
