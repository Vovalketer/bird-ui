"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabProps {
	href: string;
	children: React.ReactNode;
}
export default function Tab({ href, children }: TabProps) {
	const pathname = usePathname();
	const className =
		href === pathname
			? "tab tab-active text-lg font-semibold"
			: "tab text-lg font-semibold";
	return (
		<Link role="tab" href={href} className={className}>
			{children}
		</Link>
	);
}
