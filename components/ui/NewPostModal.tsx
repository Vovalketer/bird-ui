import Post from "@/lib/types/domain/post";
import Modal from "./Modal";
import PostCard from "./PostCard";
import PostComposer from "./PostComposer";

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
	return (
		<Modal onClose={onClose} isOpen={isOpen}>
			<section className="flex flex-col gap-y-4 m-2 ">
				{post && <PostCard key={post.id} post={post} />}
				<PostComposer
					profileImage={profileImage}
					replyingToPostId={post?.id}
					minRows={3}
					maxRows={10}
				/>
			</section>
		</Modal>
	);
}
