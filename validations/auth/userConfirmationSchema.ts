import { object, string, number } from "yup";

export const userConfirmationSchema = object({
    email: string().required().email(),
    code: number().required(),
});