import TextareaAutosize from "react-textarea-autosize";
import UserAvatar from "./UserAvatar";
import submitPost from "@/lib/actions/posts/submitPost";
import { CreatePostRequestSchema } from "@/lib/types/external/createPostRequest";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Button from "./Button";

interface ReplyTextAreaProps {
	minRows?: number;
	maxRows?: number;
	replyingToPostId?: number | string;
}
export default function PostComposer({
	minRows,
	maxRows,
	replyingToPostId,
}: ReplyTextAreaProps) {
	const session = useSession();
	const isReply = replyingToPostId !== undefined;
	const handlePost = async (formData: FormData) => {
		//TODO: handle media
		const form = {
			text: formData.get("text"),
			replyType: isReply ? "EVERYONE" : formData.get("replyType"),
		};
		const parsedForm = CreatePostRequestSchema.safeParse(form);
		if (!parsedForm.success) {
			toast.error(parsedForm.error.message);
			return;
		}

		const res = await submitPost(parsedForm.data, replyingToPostId);
		if (res.success) {
			toast.success(
				isReply ? "Reply sent successfully" : "Post sent successfully",
			);
		} else {
			res.errors?.forEach((error) => {
				toast.error(`${error.cause}: ${error.message}`);
			});
			toast.error("Failed to send post");
		}
	};
	if (session.status === "unauthenticated" || session.status === "loading") {
		return null;
	}

	return (
		<form action={handlePost} className="flex p-2 gap-y-4">
			<UserAvatar profileImage={session.data?.user.profileImage} />
			<div className="flex flex-col w-full gap-y-4 ml-2">
				<div className="pl-2 pr-1">
					<TextareaAutosize
						name="text"
						placeholder={isReply ? "Write your reply" : "What's happening?"}
						className="textarea textarea-ghost box-border resize-none w-full min-h-2 mt-1"
						minRows={minRows}
						maxRows={maxRows}
					/>
				</div>
				<div className="flex justify-between my-2">
					{!isReply && (
						<select
							name="replyType"
							defaultValue={"EVERYONE"}
							className="select w-fit"
						>
							<option value="EVERYONE">Everyone can reply</option>
							<option value="FOLLOWERS">Followers can reply</option>
							<option value="MENTIONS">Mentioned users can reply</option>
						</select>
					)}
					<div className="ml-auto">
						<Button type="submit" color="primary">
							{isReply ? "Reply" : "Post"}
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}
