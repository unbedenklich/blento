import type { CardDefinition } from '../../types';
import CreatePlyrFMCardModal from './CreatePlyrFMCardModal.svelte';
import PlyrFMCard from './PlyrFMCard.svelte';

const cardType = 'plyr-fm';

export const PlyrFMCardDefinition = {
	type: cardType,
	contentComponent: PlyrFMCard,
	creationModalComponent: CreatePlyrFMCardModal,
	createNew: (item) => {
		item.cardType = cardType;
		item.cardData = {};
		item.w = 4;
		item.mobileW = 8;
		item.h = 2;
		item.mobileH = 4;
	},

	onUrlHandler: (url, item) => {
		const embedUrl = toPlyrFMEmbedUrl(url);
		if (!embedUrl) return null;

		item.cardData.href = embedUrl;

		item.w = 4;
		item.mobileW = 8;
		item.h = 2;
		item.mobileH = 4;

		return item;
	},

	urlHandlerPriority: 2,

	name: 'Plyr.fm Song',
	canResize: true,
	minW: 2,
	minH: 2,

	keywords: ['music', 'song', 'plyr', 'plyrfm', 'audio'],
	groups: ['Media'],
	icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V4.125A2.25 2.25 0 0 0 17.378 1.9l-7.056 2.018A2.25 2.25 0 0 0 8.69 6.08v7.353m0 0v2.929a2.25 2.25 0 0 1-1.244 2.013L6.07 19.21a1.803 1.803 0 1 1-1.758-3.14l1.88-1.003A2.25 2.25 0 0 0 7.378 13.1v-.065Z" /></svg>`
} as CardDefinition & { type: typeof cardType };

// Match plyr.fm track URLs (both embed and regular)
// https://plyr.fm/embed/track/56
// https://plyr.fm/track/595
export function toPlyrFMEmbedUrl(url: string | undefined): string | null {
	if (!url) return null;

	const match = url.match(/plyr\.fm\/(embed\/)?track\/(\d+)/);
	if (!match) return null;

	return `https://plyr.fm/embed/track/${match[2]}`;
}
