import { z } from "zod";

export const CreatePostRequestSchema = z.object({
	text: z.string().max(255).optional(),
	replyType: z.enum(["EVERYONE", "FOLLOWERS", "MENTIONS"]),
	media: z.array(z.instanceof(File)).optional(),
});
