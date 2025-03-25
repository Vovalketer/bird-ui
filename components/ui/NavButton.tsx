import Link from "next/link";

interface NavButtonProps {
	children: React.ReactNode;
	href: string;
}
export default function NavButton({ children, href }: NavButtonProps) {
	return (
		<Link
			href={href}
			className="btn btn-neutral flex items-center gap-x-3 px-4 py-2 font-medium text-lg rounded-lg"
		>
			{children}
		</Link>
	);
}
