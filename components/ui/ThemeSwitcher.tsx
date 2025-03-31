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
	if (!mounted) return null;

	const isDark = resolvedTheme === "dark";
	return (
		<Button
			color="secondary"
			onClick={() => (isDark ? setTheme("light") : setTheme("dark"))}
		>
			{isDark ? (
				<SunIcon data-testid={"sunIcon"} role="img" width={24} height={24} />
			) : (
				<MoonIcon data-testid={"moonIcon"} role="img" width={24} height={24} />
			)}
		</Button>
	);
}
