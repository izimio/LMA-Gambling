import mongoose from "mongoose";

export interface IGambling {
    createdAt: Date;
    title: string;
    imageUrl: string;
    votes: IVote[];
    choices: {
        title: string;
        id: number;
    }[];
    owner: string;
    ended: boolean;
    multiChoices: boolean;
}

interface IVote {
    email: string;
    choice: number[];
    gamble: number;
}

const GamblingSchema = new mongoose.Schema<IGambling>({
    createdAt: { type: Date, default: Date.now },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    owner: { type: String, required: true },
    votes: {
        type: [
            {
                email: { type: String, required: true },
                choice: { type: [Number], required: true },
                gamble: { type: Number, required: true, min: 0 },
            },
        ],
        required: true,
    },
    choices: {
        type: [
            {
                title: { type: String, required: true },
                id: { type: Number, required: true },
            },
        ],
        required: true,
    },
    ended: { type: Boolean, default: false },
    multiChoices: { type: Boolean, default: false },
});

export const GamblingModel = mongoose.model<IGambling>(
    "Gambling",
    GamblingSchema
);
