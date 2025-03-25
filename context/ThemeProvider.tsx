"use client";
import {
	ThemeProvider as NextThemesProvider,
	ThemeProviderProps as NextThemesProviderProps,
} from "next-themes";
import { ReactNode } from "react";

interface ThemeProviderProps extends NextThemesProviderProps {
	children: ReactNode;
}
export default function ThemeProvider({
	children,
	...props
}: ThemeProviderProps) {
	return (
		<NextThemesProvider
			attribute="data-theme"
			defaultTheme="system"
			enableSystem
			{...props}
		>
			{children}
		</NextThemesProvider>
	);
}
