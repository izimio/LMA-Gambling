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
                        Name: "LMA Gambling",
                    },
                    To: [
                        {
                            Email: email,
                        },
                    ],
                    Subject: "LMA Gambling-la | Your Verification Code",
                    TextPart: "Your verification code is " + code,
                    HTMLPart: `
                        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
                            <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                                <h2 style="color: #333333;">LMA Gambling</h2>
                                <p style="font-size: 18px; color: #666666;">Your verification code is:</p>
                                <div style="font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px 20px; background-color: #f9f9f9; border-radius: 4px; display: inline-block;">
                                    ${code}
                                </div>
                                <p style="font-size: 14px; color: #999999; margin-top: 20px;">This code is valid for 5 minutes. Please do not share it with anyone.</p>
                            </div>
                            <p style="font-size: 12px; color: #999999; margin-top: 20px;">&copy; 2024 LMA Gambling. All rights reserved.</p>
                        </div>
                    `,
                },
            ],
        });
    } catch (err: any) {
        throw new InternalError(err.message);
    }
};
