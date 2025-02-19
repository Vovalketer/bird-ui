import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				"light-primary": "#1DA1F2",
				"light-primary-hover": "#1A91DA",
				"light-background": "#FFFFFF",
				"light-secondary-background": "#F5F8FA",
				"light-border": "#E1E8ED",
				"light-text-primary": "#14171A",
				"light-text-secondary": "#657786",
				"light-disabled": "#AAB8C2",

				"dark-primary": "#1DA1F2",
				"dark-primary-hover": "#1A91DA",
				"dark-background": "#15202B",
				"dark-secondary-background": "#192734",
				"dark-border": "#38444D",
				"dark-text-primary": "#FFFFFF",
				"dark-text-secondary": "#8899A6",
				"dark-disabled": "#8899A6",
			},
		},
	},
	plugins: [],
} satisfies Config;
