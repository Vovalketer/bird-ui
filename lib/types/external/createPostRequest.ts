import { z } from "zod";

export interface CreatePostRequest {
	text: string;
	replyType: "EVERYONE" | "FOLLOWERS" | "MENTIONS";
	media: File[];
}

export const CreatePostRequestSchema = z.object({
	text: z.string().max(255),
	replyType: z.enum(["EVERYONE", "FOLLOWERS", "MENTIONS"]),
	media: z.array(z.instanceof(File).optional()),
});
