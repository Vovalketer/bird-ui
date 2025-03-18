import Link from "next/link";

interface SecondaryNavigationItemProps {
	children: React.ReactNode;
	href: string;
}
export default function SecondaryNavigationItem({
	children,
	href,
}: SecondaryNavigationItemProps) {
	return (
		<Link
			href={href}
			className="flex items-center gap-x-3 px-4 py-2 font-medium text-lg rounded-lg hover:bg-light-secondary-hover dark:hover:bg-dark-secondary-hover"
		>
			{children}
		</Link>
	);
}
