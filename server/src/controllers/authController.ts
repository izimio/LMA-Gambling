import { Context } from "koa";
import * as authServices from "../services/authService";
import { validateEmail } from "../utils/validators";
import { ValidationError } from "yup";

export const getAuthCode = async (ctx: Context) => {
    const address = await validateEmail.validate(ctx.request.query.email);

    await authServices.createAuthCode(address);

    ctx.status = 201;
    ctx.body = {
        ok: true,
    };
};

export const verifyAuthCode = async (ctx: Context) => {
    const { code, email } = ctx.request.body;

    if (!code || !email) {
        throw new ValidationError("Missing required fields code or email");
    }

    const token = await authServices.verifyAuthCode(email, code);

    ctx.cookies.set("token", token, {
        httpOnly: true,
    });

    ctx.status = 200;
    ctx.body = {
        ok: true,
        data: token,
    };
};
