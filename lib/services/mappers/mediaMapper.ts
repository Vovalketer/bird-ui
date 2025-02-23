import Media from "@/lib/types/domain/media";
import { MediaResource } from "@/lib/types/external/mediaApi";

export function mediaMapper(media?: MediaResource[]): Media[] {
	if (!media) return [];
	return media.map((m) => {
		const mappedMedia: Media = {
			fileSize: m.attributes.fileSize,
			format: m.attributes.format,
			height: m.attributes.height,
			url: m.attributes.url,
			width: m.attributes.width,
			description: m.attributes.description,
			duration: m.attributes.duration,
		};
		return mappedMedia;
	});
}
