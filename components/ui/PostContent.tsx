import Media from "@/lib/types/domain/media";
import Image from "next/image";

interface PostContentProps {
	text?: string;
	createdAt: string | Date;
	media?: Media[];
}
export default function PostContent({
	text,
	createdAt,
	media,
}: PostContentProps) {
	return (
		<>
			<p>{text}</p>
			<MediaSection media={media} />
			<time>{createdAt.toString()}</time>
		</>
	);
}

interface MediaSectionProps {
	media?: Media[];
}
function MediaSection({ media }: MediaSectionProps) {
	if (!media || media.length === 0) return null;
	return (
		<figure>
			{media.map((m, i) => {
				return (
					<Image
						key={i}
						src={m.url}
						alt={m.description || ""}
						width={m.width}
						height={m.height}
					/>
				);
			})}
		</figure>
	);
}
