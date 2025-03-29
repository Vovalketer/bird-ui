import Post from "@/lib/types/domain/post";
import Modal from "./Modal";
import PostView from "./PostView";
import PostComposer from "./PostComposer";

interface NewPostModalProps {
	isOpen: boolean;
	onClose: () => void;
	post?: Post;
}
export default function NewPostModal({
	isOpen,
	onClose,
	post,
}: NewPostModalProps) {
	return (
		<Modal onClose={onClose} isOpen={isOpen}>
			<section className="flex flex-col gap-y-4 m-2 ">
				{post && <PostView key={post.id} post={post} />}
				<PostComposer replyingToPostId={post?.id} minRows={3} maxRows={10} />
			</section>
		</Modal>
	);
}
