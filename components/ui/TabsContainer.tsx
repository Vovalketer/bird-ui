interface TabsContainerProps {
	children: React.ReactNode;
}
export default function TabsContainer({ children }: TabsContainerProps) {
	return (
		<nav className="tabs tabs-border font-semibold text-xl">{children}</nav>
	);
}
