interface SecondaryElementStyleProps {
	children: React.ReactNode;
}
export default function SecondaryElementStyle({
	children,
}: SecondaryElementStyleProps) {
	return (
		<div className="h-fit w-fit gap-x-3 font-medium text-lg rounded-lg hover:bg-light-secondary-hover dark:hover:bg-dark-secondary-hover">
			{children}
		</div>
	);
}
