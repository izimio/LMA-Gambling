import jwt from "jsonwebtoken";
import { Context, Middleware } from "koa";
import { AuthError } from "../utils/error";
import { JWT_SECRET } from "../utils/config";

export const authMiddleware = async (
    ctx: Context,
    next: () => Promise<Middleware>
) => {
    const token = ctx?.cookies?.get("token");
    console.log("token", token);
    if (!token) {
        throw new AuthError("No token provided");
    }
    let decodedToken = null;
    try {
        decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new AuthError("Token invalide");
    }
    if (!decodedToken) {
        throw new AuthError("Token invalide");
    }
    const { email } = decodedToken as { email: string };
    if (!email) {
        throw new AuthError("Token invalide");
    }
    ctx.state.email = email;
    return next();
};
