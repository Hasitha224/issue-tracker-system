import { z } from "zod";

export const signinSchema = z.object({
    email: z.string().nonempty("Email is required").email("Please enter a valid email"),
    password: z.string().nonempty("Password is required"),
})

export type SignInSchemaType = z.infer<typeof signinSchema>