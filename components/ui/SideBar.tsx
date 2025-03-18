"use client";
import { BellIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

interface SidebarProps {
	className?: string;
}
export default function Sidebar({ className }: SidebarProps) {
	//issue applying gap-y-10
	return (
		<aside className={`w-52 ${className}`}>
			<nav className="fixed h-full gap-y-20">
				<ul className="menu gap-y-10">
					<SidebarItem href={"/"}>
						<HomeIcon role="img" width={24} height={24} />
						<span>Home</span>
					</SidebarItem>
					<SidebarItem href={"/profile"}>
						<UserIcon role="img" width={24} height={24} />
						<span>Profile</span>
					</SidebarItem>
					<SidebarItem href={"/notifications"}>
						<BellIcon role="img" width={24} height={24} />
						<span>Notifications</span>
					</SidebarItem>
				</ul>
			</nav>
			<div className="fixed left-3 bottom-3 ">
				<ThemeSwitcher />
			</div>
		</aside>
	);
}

interface SidebarItemProps {
	children: React.ReactNode;
	href: string;
}
function SidebarItem({ href, children }: SidebarItemProps) {
	return (
		<li>
			<Link
				href={href}
				className="flex items-center gap-x-3 px-4 py-2 font-medium text-lg rounded-lg hover:bg-light-secondary-hover dark:hover:bg-dark-secondary-hover"
			>
				{children}
			</Link>
		</li>
	);
}
