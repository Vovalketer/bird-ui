"use client";

import register from "@/lib/actions/users/register";
import { RegistrationSchema } from "@/lib/types/Registration";
import toast from "react-hot-toast";

async function submitForm(formData: FormData) {
	const form = {
		username: formData.get("username"),
		handle: formData.get("handle"),
		email: formData.get("email"),
		password: formData.get("password"),
	};
	const result = RegistrationSchema.safeParse(form);

	if (!result.success) {
		result.error.issues.forEach((issue) => {
			toast.error(issue.path[0] + ": " + issue.message);
			console.log("issue:" + issue.message);
		});
		return;
	}

	const response = await register(result.data);
	if (!response.success) {
		response.errors?.forEach((error) => {
			toast.error(error.id + ": " + error.message);
		});
	} else {
		toast.success("Registered successfully. Please check your email");
	}
	return;
}

export default function RegistrationForm() {
	return (
		<form
			action={submitForm}
			className="flex flex-col items-center justify-center w-full gap-5 mt-5"
		>
			<label>
				<p>{"Username"}</p>
				<input
					type="text"
					name="username"
					placeholder="username"
					className="bg-transparent text-xl dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
				/>
			</label>
			<label>
				<p>{"Handle"}</p>
				<input
					type="text"
					name="handle"
					placeholder="handle"
					className="bg-transparent text-xl dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
				/>
			</label>
			<label className="flex flex-col">
				<p>{"Email"}</p>
				<input
					type="email"
					name="email"
					placeholder="email@example.com"
					className="bg-transparent text-xl dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
				/>
			</label>
			<label>
				<p>{"Password"}</p>
				<input
					type="password"
					name="password"
					placeholder="password"
					className="bg-transparent text-xl dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
				/>
			</label>
			<button
				type="submit"
				className="bg-blue-500 text-white px-4 py-2 rounded-md"
			>
				SignUp
			</button>
		</form>
	);
}
