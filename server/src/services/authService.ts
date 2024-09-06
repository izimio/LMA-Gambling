import { EmailAuthModel } from "../models/EmailAuthModel";
import { JWT_SECRET } from "../utils/config";
import { ForbiddenError, ObjectNotFoundError } from "../utils/error";
import jwt from "jsonwebtoken";
import { sendEmail } from "./mailing";

export const createAuthCode = async (email: string) => {
    const code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    const alreadyExists = await EmailAuthModel.findOne({
        email,
    });

    if (alreadyExists) {
        throw new ForbiddenError(
            "Auth code already exists, attends 3 minutes stp"
        );
    }

    console.log(code);
    await sendEmail(email, code);

    await EmailAuthModel.create({
        email,
        code,
    });
};

export const verifyAuthCode = async (email: string, code: string) => {
    const auth = await EmailAuthModel.findOne({
        email,
    });

    if (!auth) {
        throw new ObjectNotFoundError("Auth code not found");
    }

    if (auth.code !== code) {
        throw new ForbiddenError("Auth code not valid");
    }

    const token = jwt.sign(
        {
            email: auth.email,
        },
        JWT_SECRET,
        { expiresIn: "48h" }
    );

    return token;
};
