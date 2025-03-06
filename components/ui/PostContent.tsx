import Media from "@/lib/types/domain/media";
import Image from "next/image";
import Link from "next/link";

interface PostContentProps {
	text?: string;
	createdAt: string | Date;
	media?: Media[];
	url: string;
}
export default function PostContent({
	text,
	createdAt,
	media,
	url,
}: PostContentProps) {
	//TODO: expand the link section so it covers the whole area except images
	return (
		<>
			<Link href={url}>
				<p>{text}</p>
			</Link>
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
