interface PrimaryButtonProps extends React.ComponentPropsWithoutRef<"button"> {
	children: React.ReactNode;
}
export default function PrimaryButton({
	children,
	...props
}: PrimaryButtonProps) {
	return (
		<button
			className="btn rounded-md font-extrabold text-lg bg-light-primary hover:bg-light-primary-hover dark:bg-dark-primary dark:hover:bg-dark-primary-hover"
			{...props}
		>
			{children}
		</button>
	);
}
