import Post from "@/lib/types/domain/post";
import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import NewPostModal from "../NewPostModal";
import { NewPostModalProvider } from "@/context/NewPostModalContext";
import { SessionProvider } from "next-auth/react";

// workaround since jsdom doesn't support HTMLDialogElement, issue #3294
HTMLDialogElement.prototype.show = jest.fn(function () {
	this.open = true;
});

HTMLDialogElement.prototype.showModal = jest.fn(function () {
	this.open = true;
});

HTMLDialogElement.prototype.close = jest.fn(function () {
	this.open = false;
});

beforeAll(() => {
	global.fetch = jest.fn(() =>
		Promise.resolve(
			new Response(
				JSON.stringify({
					user: {
						id: "123",
						username: "testUser",
						handle: "testHandle",
						profileImage: "https://example.com/postProfileImage.jpg",
					},
					expires: new Date(Date.now() + 3600 * 1000).toISOString(), // Add expires
				}),
				{
					status: 200,
					statusText: "OK",
					headers: { "Content-Type": "application/json" },
				},
			),
		),
	);
});
afterEach(() => {
	jest.clearAllMocks();
});

const sessionMock = {
	user: {
		id: "123",
		username: "testUser",
		handle: "testHandle",
		profileImage: "https://example.com/signedInUser.jpg",
	},
	accessToken: "testAccessToken",
	expires: new Date(Date.now() + 3600 * 1000).toISOString(), // Add expires
};

const mockPost: Post = {
	id: 1,
	text: "This is a test post",
	replyType: "EVERYONE",
	user: {
		id: "60cac580-63cc-484c-9ac3-508b72a5cfdc",
		username: "testUser",
		handle: "testHandle",
		profileImage: "https://example.com/postProfileImage.jpg",
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

const renderOpenNewPostModal = async () => {
	await act(() =>
		render(
			<SessionProvider session={sessionMock}>
				<NewPostModalProvider>
					<NewPostModal isOpen={true} onClose={() => {}} />
				</NewPostModalProvider>
			</SessionProvider>,
		),
	);
};

const renderOpenNewPostModalWithPost = async () => {
	await act(() =>
		render(
			<SessionProvider session={sessionMock}>
				<NewPostModalProvider>
					<NewPostModal isOpen={true} onClose={() => {}} post={mockPost} />
				</NewPostModalProvider>
			</SessionProvider>,
		),
	);
};

describe("NewPostModal", () => {
	it("should render the modal", () => {
		renderOpenNewPostModal();
	});

	it("should render the post card if post is provided", () => {
		renderOpenNewPostModalWithPost();
		const postCard = screen.getByText("This is a test post");
		expect(postCard).toBeInTheDocument();
	});

	it("should render the user avatars", () => {
		renderOpenNewPostModalWithPost();
		const userAvatars = screen.getAllByAltText("profile image");
		expect(userAvatars).toHaveLength(2);
		expect(userAvatars[0]).toBeInTheDocument();
		expect(userAvatars[1]).toBeInTheDocument();

		const hasReplyProfileImage = userAvatars.some((avatar) =>
			avatar.getAttribute("src")?.includes("postProfileImage.jpg"),
		);
		expect(hasReplyProfileImage).toBe(true);

		const hasSignedInUserProfileImage = userAvatars.some((avatar) =>
			avatar.getAttribute("src")?.includes("signedInUser.jpg"),
		);
		expect(hasSignedInUserProfileImage).toBe(true);
	});

	it("should render the text area with new post placeholder", () => {
		renderOpenNewPostModal();
		const textArea = screen.getByRole("textbox");
		expect(textArea).toBeInTheDocument();

		expect(textArea).toHaveAttribute("placeholder", "What's happening?");
	});

	it("should render the text area with reply placeholder", () => {
		renderOpenNewPostModalWithPost();
		const textArea = screen.getByRole("textbox");
		expect(textArea).toBeInTheDocument();

		expect(textArea).toHaveAttribute("placeholder", "Write your reply");
	});

	it("should render the reply type dropdown", () => {
		renderOpenNewPostModal();
		const replyTypeDropdown = screen.getByRole("combobox");
		expect(replyTypeDropdown).toBeInTheDocument();
	});

	it("should render the reply type options", () => {
		renderOpenNewPostModal();
		const replyTypeOptions = screen.getAllByRole("option");
		expect(replyTypeOptions).toHaveLength(3);

		const hasValueEverone = replyTypeOptions.some(
			(option) => option.getAttribute("value") === "EVERYONE",
		);
		expect(hasValueEverone).toBe(true);

		const hasValueFollowers = replyTypeOptions.some(
			(option) => option.getAttribute("value") === "FOLLOWERS",
		);
		expect(hasValueFollowers).toBe(true);

		const hasValueMentions = replyTypeOptions.some(
			(option) => option.getAttribute("value") === "MENTIONS",
		);
		expect(hasValueMentions).toBe(true);
	});

	it("should render the Post button", () => {
		renderOpenNewPostModal();
		const postButton = screen.getByRole("button", { name: "Post" });
		expect(postButton).toBeInTheDocument();

		const replyButton = screen.queryByRole("button", { name: "Reply" });
		expect(replyButton).not.toBeInTheDocument();
	});

	it("should render the Reply button", () => {
		renderOpenNewPostModalWithPost();
		const replyButton = screen.getByRole("button", { name: "Reply" });
		expect(replyButton).toBeInTheDocument();

		const postButton = screen.queryByRole("button", { name: "Post" });
		expect(postButton).not.toBeInTheDocument();
	});

	it("should render the cancel button", () => {
		renderOpenNewPostModal();
		const closeModalButton = screen.getByRole("button", { name: /x|✕/i });
		expect(closeModalButton).toBeInTheDocument();
	});
});
