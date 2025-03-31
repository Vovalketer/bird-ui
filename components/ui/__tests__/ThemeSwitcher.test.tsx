import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ThemeSwitcher from "../ThemeSwitcher";

let currentTheme: "light" | "dark" | undefined;
const setMockTheme = (theme: "light" | "dark") => {
	currentTheme = theme;
};
jest.mock("next-themes", () => ({
	useTheme: () => ({ resolvedTheme: currentTheme, setTheme: setMockTheme }),
}));

describe("ThemeSwitcher", () => {
	beforeEach(() => {
		currentTheme = undefined;
	});
	it("should render the theme switcher", () => {
		render(<ThemeSwitcher />);
	});

	it("should render the sun icon when the theme is dark", () => {
		setMockTheme("dark");
		render(<ThemeSwitcher />);
		const sunIcon = screen.getByTestId("sunIcon");
		expect(sunIcon).toBeInTheDocument();
	});

	it("should render the moon icon when the theme is light", () => {
		setMockTheme("light");
		render(<ThemeSwitcher />);
		const moonIcon = screen.getByTestId("moonIcon");
		expect(moonIcon).toBeInTheDocument();
	});

	it("should switch to the light theme when the sun icon is clicked", () => {
		setMockTheme("dark");
		render(<ThemeSwitcher />);
		const sunIcon = screen.getByTestId("sunIcon");
		fireEvent.click(sunIcon);
		expect(currentTheme).toBe("light");
	});

	it("should switch to the dark theme when the moon icon is clicked", () => {
		setMockTheme("light");
		render(<ThemeSwitcher />);
		const moonIcon = screen.getByTestId("moonIcon");
		fireEvent.click(moonIcon);
		expect(currentTheme).toBe("dark");
	});

	it("should default to display the moon icon when the theme is undefined", () => {
		render(<ThemeSwitcher />);
		const moonIcon = screen.getByTestId("moonIcon");
		expect(moonIcon).toBeInTheDocument();
	});
});
