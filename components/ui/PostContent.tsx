import { MediaResource } from "@/lib/types/MediaResource";
import Image from "next/image";

interface PostContentProps {
	text: string;
	createdAt: string;
	media?: MediaResource[];
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
			<time>{createdAt}</time>
		</>
	);
}

interface MediaSectionProps {
	media?: MediaResource[];
}
function MediaSection({ media }: MediaSectionProps) {
	if (!media || media.length === 0) return null;
	return (
		<figure>
			{media.map((m) => {
				return (
					<Image
						key={m.id}
						src={m.attributes.url}
						alt={m.attributes?.description || ""}
						width={m.attributes.width}
						height={m.attributes.height}
					/>
				);
			})}
		</figure>
	);
}
