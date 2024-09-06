import { Context } from "koa";
import * as gamblingServices from "../services/gamblingService";
import {
    validateChoice,
    validateEmail,
    validateGambling,
} from "../utils/validators";
import { ValidationError } from "yup";

export const createGambling = async (ctx: Context) => {
    const gambling = await validateGambling.validate(ctx.request.body);

    const newGambling = await gamblingServices.createGambling(
        gambling,
        ctx.state.email
    );

    ctx.status = 201;
    ctx.body = {
        ok: true,
        data: newGambling,
    };
};

export const voteGambling = async (ctx: Context) => {
    const { gamblingId } = ctx.params;
    const { choice, gamble } = await validateChoice.validate(ctx.request.body);

    if (choice.length < 1) {
        throw new ValidationError("Choice must have at least one element");
    }

    if (!gamblingId) {
        throw new ValidationError("GamblingId is required");
    }
    await gamblingServices.voteGambling(
        ctx.state.email,
        gamblingId,
        choice,
        gamble
    );

    ctx.status = 200;
    ctx.body = {
        ok: true,
    };
};

export const getGambling = async (ctx: Context) => {
    const { gamblingId } = ctx.params;

    if (!gamblingId) {
        throw new ValidationError("GamblingId is required");
    }

    const gambling = await gamblingServices.getGambling(gamblingId);

    ctx.status = 200;
    ctx.body = {
        ok: true,
        data: gambling,
    };
};

export const getGamblings = async (ctx: Context) => {
    const gamblings = await gamblingServices.getGamblings();

    ctx.status = 200;
    ctx.body = {
        ok: true,
        data: gamblings,
    };
};

export const closeGambling = async (ctx: Context) => {
    const { gamblingId } = ctx.params;

    if (!gamblingId) {
        throw new ValidationError("GamblingId is required");
    }

    await gamblingServices.closeGambling(gamblingId, ctx.state.email);

    ctx.status = 200;
    ctx.body = {
        ok: true,
    };
};
