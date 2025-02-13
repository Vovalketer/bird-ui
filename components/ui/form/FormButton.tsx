interface FormButtonProps extends React.ComponentPropsWithoutRef<"button"> {
	children: React.ReactNode;
}

export default function FormButton({ children, ...rest }: FormButtonProps) {
	return (
		<button
			className="bg-light-primary text-light px-4 py-2 rounded-md font-semibold hover:bg-light-primary-hover dark:bg-dark-primary dark:text-dark hover:dark:bg-dark-primary-hover"
			{...rest}
		>
			{children}
		</button>
	);
}
