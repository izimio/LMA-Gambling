import { GamblingModel, IGambling } from "../models/GamblingModel";
import {
    AuthError,
    ForbiddenError,
    ObjectNotFoundError,
    ValidationError,
} from "../utils/error";

export const createGambling = async (
    gambling: {
        title: string;
        imageUrl: string | undefined;
        choices: string[];
        multiChoices: boolean;
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
        multiChoices: gambling.multiChoices,
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

    if (gambling.ended == true) {
        throw new ForbiddenError("You can vote for this gamble anymore");
    }

    if (
        gambling.multiChoices == true &&
        choice.length != gambling.choices.length
    ) {
        throw new ValidationError(
            "Invalid number of choice, needed multiple here"
        );
    }

    if (gambling.multiChoices == false && choice.length != 1) {
        throw new ValidationError(
            "Invalid number of choice, only one possible here"
        );
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

export const closeGambling = async (gamblingId: string, me: string) => {
    const gambling = await GamblingModel.findById(gamblingId);

    if (!gambling) {
        throw new ObjectNotFoundError("Gambling not found");
    }

    if (gambling.owner != me) {
        throw new AuthError("Nope");
    }

    if (gambling.ended == true) {
        throw new ForbiddenError("Already closed gamble");
    }

    await GamblingModel.findByIdAndUpdate(gamblingId, {
        ended: true,
    });

    return {
        ok: true,
    };
};
