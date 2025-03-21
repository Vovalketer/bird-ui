import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteListProps {
	children: React.ReactNode;
	className?: string;
	isLoading: boolean;
	onLoadMore: () => void;
	hasMore: boolean;
}
export default function InfiniteList({
	children,
	className,
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
			<section className={className}>{children}</section>
			<div className="observer" ref={ref}></div>
		</>
	);
}
