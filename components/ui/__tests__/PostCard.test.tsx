import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import PostCard from "../PostCard";
import Post from "@/lib/types/domain/post";

const mockPostWithoutUserInteractions: Post = {
	id: 1,
	text: "This is a test post",
	replyType: "EVERYONE",
	user: {
		id: "60cac580-63cc-484c-9ac3-508b72a5cfdc",
		username: "testUser",
		handle: "testHandle",
		profileImage: "https://example.com/profile.jpg",
		createdAt: "2023-03-14T00:00:00.000Z",
	},
	createdAt: "2023-03-14T00:00:00.000Z",
	interactions: {
		likesCount: 10,
		repostsCount: 8,
		repliesCount: 4,
		isLiked: false,
		isReposted: false,
	},
	media: [],
};

const mockPostWithUserInteractionsAndNoProfileImage: Post = {
	id: 1,
	text: "This is a test post",
	replyType: "EVERYONE",
	user: {
		id: "60cac580-63cc-484c-9ac3-508b72a5cfdc",
		username: "testUser",
		handle: "testHandle",
		createdAt: "2023-03-14T00:00:00.000Z",
	},
	createdAt: "2023-03-14T00:00:00.000Z",
	interactions: {
		likesCount: 10,
		repostsCount: 8,
		repliesCount: 4,
		isLiked: true,
		isReposted: true,
	},
	media: [],
};

const renderPostCardWithoutUserInteractions = () => {
	render(<PostCard post={mockPostWithoutUserInteractions} />);
};

const renderPostCardWithUserInteractionsAndNoProfileImage = () => {
	render(<PostCard post={mockPostWithUserInteractionsAndNoProfileImage} />);
};

describe("PostCard non liked or reposted", () => {
	it("should render the post card", () => {
		renderPostCardWithoutUserInteractions();
	});

	it("should render the user's username", () => {
		renderPostCardWithoutUserInteractions();
		const username = screen.getByText("@testUser");
		expect(username).toBeInTheDocument();
	});
	it("should render the user's handle", () => {
		renderPostCardWithoutUserInteractions();
		const handle = screen.getByText("testHandle");
		expect(handle).toBeInTheDocument();
	});
	it("should render the user's profile image", () => {
		renderPostCardWithoutUserInteractions();
		const profileImage = screen.getByAltText("profile image");
		const expectedSrc = expect.stringContaining("profile.jpg");
		expect(profileImage).toBeInTheDocument();
		expect(profileImage).toHaveAttribute("src", expectedSrc);
	});
	it("should render a placeholder image if user has no profile image", () => {
		renderPostCardWithUserInteractionsAndNoProfileImage();
		const profileImage = screen.getByAltText("profile image");
		//img.jpg seems to be the default name given for the import
		const expectedSrc = expect.stringContaining("img.jpg");
		expect(profileImage).toBeInTheDocument();
		expect(profileImage).toHaveAttribute("src", expectedSrc);
	});
	it("should render the post text", () => {
		renderPostCardWithoutUserInteractions();
		const postText = screen.getByText("This is a test post");
		expect(postText).toBeInTheDocument();
	});
	it("should render the number of likes", () => {
		renderPostCardWithoutUserInteractions();
		const likesCount = screen.getByText("10");
		expect(likesCount).toBeInTheDocument();
	});
	it("should render the number of reposts", () => {
		renderPostCardWithoutUserInteractions();
		const repostsCount = screen.getByText("8");
		expect(repostsCount).toBeInTheDocument();
	});
	it("should render the number of replies", () => {
		renderPostCardWithoutUserInteractions();
		const repliesCount = screen.getByText("4");
		expect(repliesCount).toBeInTheDocument();
	});
	it("should render the like button without fill", () => {
		renderPostCardWithoutUserInteractions();
		const likeButton = screen.getByTestId("likeButton");
		expect(likeButton).toBeInTheDocument();

		const likeIcon = within(likeButton).getByRole("img", { hidden: true });
		expect(likeIcon).toBeInTheDocument();
		expect(likeIcon).toHaveAttribute("fill", "none");
	});
	it("should render the like button with fill", () => {
		renderPostCardWithUserInteractionsAndNoProfileImage();
		const likeButton = screen.getByTestId("likeButton");
		expect(likeButton).toBeInTheDocument();

		const likeIcon = within(likeButton).getByRole("img", { hidden: true });
		expect(likeIcon).toBeInTheDocument();
		expect(likeIcon).toHaveAttribute("fill", "red");
	});
	it("should render the repost button without fill", () => {
		renderPostCardWithoutUserInteractions();
		const repostButton = screen.getByTestId("repostButton");
		expect(repostButton).toBeInTheDocument();

		const repostIcon = within(repostButton).getByRole("img", {
			hidden: true,
		});
		expect(repostIcon).toBeInTheDocument();
		expect(repostIcon).toHaveAttribute("fill", "none");
	});
	it("should render the repost button with fill", () => {
		renderPostCardWithUserInteractionsAndNoProfileImage();
		const repostButton = screen.getByTestId("repostButton");
		expect(repostButton).toBeInTheDocument();

		const repostIcon = within(repostButton).getByRole("img", {
			hidden: true,
		});
		expect(repostIcon).toBeInTheDocument();
		expect(repostIcon).toHaveAttribute("color", "lime");
	});
	it("should render the reply button", () => {
		renderPostCardWithoutUserInteractions();
		const replyButton = screen.getByTestId("replyButton");
		expect(replyButton).toBeInTheDocument();

		const replyIcon = within(replyButton).getByRole("img", {
			hidden: true,
		});
		expect(replyIcon).toBeInTheDocument();
		expect(replyIcon).toHaveAttribute("fill", "none");
	});
	it("should render the post date", () => {
		renderPostCardWithoutUserInteractions();
		const postDate = screen.getByText("2023-03-14T00:00:00.000Z");
		expect(postDate).toBeInTheDocument();
	});
});
