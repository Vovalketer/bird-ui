interface InputFieldProps {
	label: string;
	type: string;
	name: string;
	placeholder?: string;
}
export default function FormInput({
	label,
	type,
	name,
	placeholder,
}: InputFieldProps) {
	return (
		<label className="flex flex-col items-center min-w-sm">
			<span className="text-xl self-start pl-1">{label}</span>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				className="bg-transparent w-80 text-lg dark:text-white placeholder:text-gray-400 placeholder:text-base px-2 py-1  ring-gray-600 ring-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
			/>
		</label>
	);
}
