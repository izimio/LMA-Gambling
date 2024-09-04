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

export const validateSolanaAddress = yup.object().shape({
    address: validateSolanaString,
});
