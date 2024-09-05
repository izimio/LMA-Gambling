import { GamblingModel, IGambling } from "../models/GamblingModel";
import { ForbiddenError, ObjectNotFoundError } from "../utils/error";

export const createGambling = async (
    gambling: {
        title: string;
        imageUrl: string | undefined;
        choices: string[];
    },
    owner: string
) => {
    const choices = gambling.choices.map((choice, id) => {
        return {
            title: choice,
            id: id,
        };
    });

    const gb = await GamblingModel.create({
        title: gambling.title,
        imageUrl: gambling.imageUrl,
        choices: choices,
        votes: [],
        owner: owner,
    });

    return gb;
};

export const voteGambling = async (
    email: string,
    gamblingId: string,
    choice: number[],
    gamble: number
) => {
    const gambling = await GamblingModel.findById(gamblingId);

    if (!gambling) {
        throw new ObjectNotFoundError("Gambling not found");
    }

    const vote = {
        email,
        choice,
        gamble,
    };

    if (gambling.votes.find((v) => v.email === email)) {
        throw new ForbiddenError("Already voted");
    }

    gambling.votes.push(vote);

    gambling.save();
};

export const getGambling = async (gamblingId: string) => {
    const gambling = await GamblingModel.findById(gamblingId);

    if (!gambling) {
        throw new ObjectNotFoundError("Gambling not found");
    }

    return gambling;
};

export const getGamblings = async () => {
    const gamblings = await GamblingModel.find();

    return gamblings;
};
