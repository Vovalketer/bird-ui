"use client";

import FormButton from "@/components/ui/form/FormButton";
import FormInput from "@/components/ui/form/FormInput";
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
			<FormInput
				type="text"
				name="username"
				placeholder="username"
				label={"Username"}
			/>
			<FormInput
				type="text"
				name="handle"
				placeholder="handle"
				label={"Handle"}
			/>
			<FormInput
				type="email"
				name="email"
				placeholder="email@example.com"
				label={"Email"}
			/>
			<FormInput
				type="password"
				name="password"
				placeholder="password"
				label={"Password"}
			/>
			<FormButton type="submit">Register</FormButton>
		</form>
	);
}
