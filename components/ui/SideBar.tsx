"use client";
import { BellIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import ThemeSwitcher from "./ThemeSwitcher";
import SecondaryNavigationElement from "./SecondaryNavigationElement";

interface SidebarProps {
	className?: string;
}
export default function Sidebar({ className }: SidebarProps) {
	return (
		<aside className={`sticky top-0 flex flex-col h-screen ${className}`}>
			<nav>
				<ul className="menu gap-y-5">
					<li>
						<SecondaryNavigationElement href={"/"}>
							<HomeIcon role="img" width={24} height={24} />
							<span>Home</span>
						</SecondaryNavigationElement>
					</li>
					<li>
						<SecondaryNavigationElement href={"/profile"}>
							<UserIcon role="img" width={24} height={24} />
							<span>Profile</span>
						</SecondaryNavigationElement>
					</li>
					<li>
						<SecondaryNavigationElement href={"/notifications"}>
							<BellIcon role="img" width={24} height={24} />
							<span>Notifications</span>
						</SecondaryNavigationElement>
					</li>
				</ul>
			</nav>
			<div className="mt-auto m-2">
				<ThemeSwitcher />
			</div>
		</aside>
	);
}
