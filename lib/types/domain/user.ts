export default interface User {
	id: string;
	username: string;
	handle: string;
	bio?: string;
	dateOfBirth?: string | Date;
	location?: string;
	profileImage?: string;
	createdAt: string | Date;
}
