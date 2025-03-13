import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteListProps {
	children: React.ReactNode;
	isLoading: boolean;
	onLoadMore: () => void;
}
export default function InfiniteList({
	children,
	onLoadMore,
	isLoading,
}: InfiniteListProps) {
	const { ref, inView } = useInView({ threshold: 0, delay: 1000 });

	useEffect(() => {
		if (inView && !isLoading) {
			onLoadMore();
		}
	}, [inView, isLoading, onLoadMore]);

	return (
		<>
			<section>{children}</section>
			<div className="observer" ref={ref}></div>
		</>
	);
}
