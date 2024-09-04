import Mailjet from "node-mailjet";
import {
    MAILJET_API_KEY,
    MAILJET_API_SECRET,
    MAILJET_FROM_EMAIL,
} from "../utils/config";
import { InternalError } from "../utils/error";

export const sendEmail = async (email: string, code: any) => {
    try {
        const mailjet = Mailjet.apiConnect(MAILJET_API_KEY, MAILJET_API_SECRET);
        await mailjet.post("send", { version: "v3.1" }).request({
            Messages: [
                {
                    From: {
                        Email: MAILJET_FROM_EMAIL,
                        Name: "LMA-Fourre-la",
                    },
                    To: [
                        {
                            Email: email,
                        },
                    ],
                    Subject: "LMA-Fourre-la | Your verification code",
                    TextPart: "Your code is " + code,
                    HTMLPart:
                        "<h3>Your verification code is <u>" +
                        code +
                        "</u></h3>",
                },
            ],
        });
    } catch (err: any) {
        throw new InternalError(err.message);
    }
};
