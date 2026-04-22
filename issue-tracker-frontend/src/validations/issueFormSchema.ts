import { z } from "zod";

export const issueFormSchema = z.object({
    title: z.string().min(1, "Issue Title is required"),
    description: z.string().min(1, "Issue Description is required"),
    severity: z.string().optional(),
    priority: z.string().optional(),
    status: z.enum(["open", "in_progress", "resolved"]).optional(),
})

export type IssueFormSchemaType = z.infer<typeof issueFormSchema>