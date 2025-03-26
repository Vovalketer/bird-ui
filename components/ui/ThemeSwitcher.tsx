"use client";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Button from "./Button";

export default function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();
	useEffect(() => {
		setMounted(true);
	}, []);
	//TODO: return placeholder instead of null
	return mounted ? (
		resolvedTheme === "dark" ? (
			<Button color="secondary" onClick={() => setTheme("light")}>
				<SunIcon role="img" width={24} height={24} />
			</Button>
		) : (
			<Button color="secondary" onClick={() => setTheme("dark")}>
				<MoonIcon role="img" width={24} height={24} />
			</Button>
		)
	) : null;
}
