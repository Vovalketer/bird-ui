const colorMap = {
	primary: "btn-primary",
	secondary: "btn-secondary",
	neutral: "btn-neutral",
	accent: "btn-accent",
	info: "btn-info",
	success: "btn-success",
	warning: "btn-warning",
	error: "btn-error",
};
interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
	children: React.ReactNode;
	color?:
		| "primary"
		| "secondary"
		| "neutral"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error";
}
export default function Button({
	children,
	color = "primary",
	...props
}: ButtonProps) {
	return (
		<button
			className={`btn ${colorMap[color]} rounded-4xl font-bold text-xl`}
			{...props}
		>
			{children}
		</button>
	);
}
