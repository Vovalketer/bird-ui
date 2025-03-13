import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteListProps {
	children: React.ReactNode;
	isLoading: boolean;
	onLoadMore: () => void;
	hasMore: boolean;
}
export default function InfiniteList({
	children,
	onLoadMore,
	isLoading,
	hasMore,
}: InfiniteListProps) {
	const { ref, inView } = useInView({ threshold: 0, delay: 1000 });

	useEffect(() => {
		if (inView && !isLoading && hasMore) {
			onLoadMore();
		}
	}, [inView, isLoading, hasMore, onLoadMore]);

	return (
		<>
			<section>{children}</section>
			<div className="observer" ref={ref}></div>
		</>
	);
}
