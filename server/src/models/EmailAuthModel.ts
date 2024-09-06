import mongoose from "mongoose";

export interface IInvest {
    createdAt: Date;
    email: string;
    code: string;
}

const EmailAuthSchema = new mongoose.Schema<IInvest>({
    createdAt: { type: Date, default: Date.now, expires: 60 * 5 },
    email: { type: String, required: true },
    code: { type: String, required: true },
});

export const EmailAuthModel = mongoose.model<IInvest>(
    "Invest",
    EmailAuthSchema
);
