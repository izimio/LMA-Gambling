import * as yup from "yup";

const regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

const validateSolanaString = yup
    .string()
    .required()
    .matches(regex, "Invalid Solana address");

export const validateEmail = yup.string().email().required();

export const validateWithdraw = yup.object().shape({
    key: yup.string().required(),
    amount: yup.number().required(),
});

export const validateChallengeToken = yup.object().shape({
    address: validateSolanaString,
    signature: yup.string().required(),
});

export const validateGambling = yup.object().shape({
    title: yup.string().required(),
    imageUrl: yup.string().required(),
    choices: yup.array().of(yup.string().required()).required().min(2),
    multiChoices: yup.bool().required(),
});

export const validateChoice = yup.object().shape({
    choice: yup.array().of(yup.number().required()).required().min(1),
    gamble: yup.number().required().min(0),
});
