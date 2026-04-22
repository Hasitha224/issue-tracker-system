import { z } from "zod";

export const signupSchema = z.object({
  firstName: z
    .string()
    .nonempty("First Name is required")
    .regex(/^[A-Za-z\s]+$/, "Only letters allowed"),
  lastName: z
    .string()
    .nonempty("Last Name is required")
    .regex(/^[A-Za-z\s]+$/, "Only letters allowed"),
  email: z.string().nonempty("Email is required").email("Please enter a valid email"),
  password: z.string().nonempty("Password is required"),
  confirmPassword: z.string().nonempty("Confirm Password is required"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignUpSchemaType = z.infer<typeof signupSchema>;
