import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import UserProfileHeader from "../UserProfileHeader";
import User from "@/lib/types/domain/user";

const user: User = {
	id: "testId",
	username: "testUser",
	handle: "testHandle",
	profileImage: "https://test.com/profileImage.jpg",
	bio: "testBio",
	location: "testLocation",
	dateOfBirth: new Date(),
	followingCount: 10,
	followersCount: 20,
	isFollowing: true,
	createdAt: new Date(),
};

describe("UserProfileHeader", () => {
	it("should render the user profile header", () => {
		render(<UserProfileHeader user={user} />);
	});

	it("should display the user's username", () => {
		render(<UserProfileHeader user={user} />);
		const username = screen.getByText("testUser");
		expect(username).toBeInTheDocument();
	});

	it("should display the user's handle", () => {
		render(<UserProfileHeader user={user} />);
		const handle = screen.getByText("@testHandle");
		expect(handle).toBeInTheDocument();
	});

	it("should display the user's profile image", () => {
		render(<UserProfileHeader user={user} />);
		const profileImage = screen.getByAltText("profile image");
		expect(profileImage).toBeInTheDocument();
	});

	it("should display fallback image when the profile image is not available", () => {
		const userWithoutProfileImage: User = { ...user, profileImage: undefined };
		render(<UserProfileHeader user={userWithoutProfileImage} />);
		const profileImage = screen.getByAltText("profile image");
		expect(profileImage).toBeInTheDocument();
	});

	it("should display the user's bio", () => {
		render(<UserProfileHeader user={user} />);
		const bio = screen.getByText("testBio");
		expect(bio).toBeInTheDocument();
	});

	it("should display the user's location", () => {
		render(<UserProfileHeader user={user} />);
		const location = screen.getByText("testLocation");
		expect(location).toBeInTheDocument();
	});

	it("should display the user's date of birth", () => {
		render(<UserProfileHeader user={user} />);
		const dateOfBirth = screen.getByText(user.dateOfBirth!.toLocaleString());
		expect(dateOfBirth).toBeInTheDocument();
	});

	it("should display the user's following count", () => {
		render(<UserProfileHeader user={user} />);
		const followingCount = screen.getByText("10");
		expect(followingCount).toBeInTheDocument();
	});

	it("should display the user's followers count", () => {
		render(<UserProfileHeader user={user} />);
		const followersCount = screen.getByText("20");
		expect(followersCount).toBeInTheDocument();
	});

	it("should display the follow button when the user is not following", () => {
		const userToFollow: User = { ...user, isFollowing: false };
		render(<UserProfileHeader user={userToFollow} onFollowToggle={() => {}} />);
		const followButton = screen.getByRole("button", { name: "Follow" });
		expect(followButton).toBeInTheDocument();
	});

	it("should call the onFollow function when the follow button is clicked", () => {
		const onFollow = jest.fn();
		const userToFollow: User = { ...user, isFollowing: false };

		render(<UserProfileHeader user={userToFollow} onFollowToggle={onFollow} />);
		const followButton = screen.getByRole("button", { name: "Follow" });
		fireEvent.click(followButton);
		expect(onFollow).toHaveBeenCalled();
	});

	it("should display the unfollow button when the user is following", () => {
		const userToUnfollow: User = { ...user, isFollowing: true };
		render(
			<UserProfileHeader user={userToUnfollow} onFollowToggle={() => {}} />,
		);
		const followButton = screen.getByRole("button", { name: "Unfollow" });
		expect(followButton).toBeInTheDocument();
	});

	it("should call the onFollow function when the unfollow button is clicked", () => {
		const onFollow = jest.fn();
		const userToUnfollow: User = { ...user, isFollowing: true };

		render(
			<UserProfileHeader user={userToUnfollow} onFollowToggle={onFollow} />,
		);
		const followButton = screen.getByRole("button", { name: "Unfollow" });
		fireEvent.click(followButton);
		expect(onFollow).toHaveBeenCalled();
	});

	it("should not render the button when isFollowing is undefined", () => {
		const userToUnfollow: User = { ...user, isFollowing: undefined };
		render(
			<UserProfileHeader user={userToUnfollow} onFollowToggle={() => {}} />,
		);
		const followButton = screen.queryByRole("button", { name: "Unfollow" });
		expect(followButton).not.toBeInTheDocument();
		const unfollowButton = screen.queryByRole("button", { name: "Unfollow" });
		expect(unfollowButton).not.toBeInTheDocument();
	});
});
