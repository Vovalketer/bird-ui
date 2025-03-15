import submitPost from "@/lib/actions/posts/submitPost";
import Post from "@/lib/types/domain/post";
import { CreatePostRequestSchema } from "@/lib/types/external/createPostRequest";
import toast from "react-hot-toast";
import FormButton from "./form/FormButton";
import Modal from "./Modal";
import PostCard from "./PostCard";
import UserAvatar from "./UserAvatar";

interface NewPostModalProps {
	isOpen: boolean;
	onClose: () => void;
	profileImage?: string;
	post?: Post;
}
export default function NewPostModal({
	isOpen,
	onClose,
	profileImage,
	post,
}: NewPostModalProps) {
	const handlePost = async (formData: FormData) => {
		//TODO: handle media
		const form = {
			text: formData.get("text"),
			replyType: post ? "EVERYONE" : formData.get("replyType"),
		};
		const parsedForm = CreatePostRequestSchema.safeParse(form);
		if (!parsedForm.success) {
			toast.error(parsedForm.error.message);
			return;
		}

		const res = await submitPost(parsedForm.data, post?.id);
		if (res.success) {
			toast.success(
				post ? "Reply sent successfully" : "Post sent successfully",
			);
		} else {
			res.errors?.forEach((error) => {
				toast.error(`${error.cause}: ${error.message}`);
			});
			toast.error("Failed to send post");
		}
	};
	return (
		<Modal onClose={onClose} isOpen={isOpen}>
			<section className="flex flex-col gap-y-4 m-2 ">
				{post && <PostCard key={post.id} post={post} />}
				<form action={handlePost} className="flex">
					<div>
						<UserAvatar profileImage={profileImage} />
					</div>
					<div className="flex flex-col w-full gap-y-4">
						<div className="pl-2 pr-1">
							<textarea
								name="text"
								placeholder={post ? "Write your reply" : "What's happening?"}
								className="textarea textarea-ghost box-border resize-none w-full min-h-32"
							/>
						</div>
						<div className="flex justify-between">
							<select
								name="replyType"
								defaultValue={"EVERYONE"}
								className="select"
							>
								<option value="EVERYONE">Everyone can reply</option>
								<option value="FOLLOWERS">Followers can reply</option>
								<option value="MENTIONS">Mentioned users can reply</option>
							</select>
							<div className="place-self-end">
								<FormButton type="submit">
									{!post ? "Post" : "Reply"}
								</FormButton>
							</div>
						</div>
					</div>
				</form>
			</section>
		</Modal>
	);
}
