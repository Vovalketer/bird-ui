"use client";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import SecondaryItemStyle from "./SecondaryItemStyle";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();
	useEffect(() => {
		setMounted(true);
	}, []);
	//TODO: return placeholder instead of null
	return mounted ? (
		resolvedTheme === "dark" ? (
			<SecondaryItemStyle>
				<button
					className="px-4 py-2 -mx-1 -my-0.5"
					onClick={() => setTheme("light")}
				>
					<SunIcon role="img" width={24} height={24} />
				</button>
			</SecondaryItemStyle>
		) : (
			<SecondaryItemStyle>
				<button
					className="px-4 py-2 -mx-1 -my-0.5"
					onClick={() => setTheme("dark")}
				>
					<MoonIcon role="img" width={24} height={24} />
				</button>
			</SecondaryItemStyle>
		)
	) : null;
}
