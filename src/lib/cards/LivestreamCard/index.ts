import type { CardDefinition } from '../types';
import LivestreamCard from './LivestreamCard.svelte';
import SidebarItemLivestreamCard from './SidebarItemLivestreamCard.svelte';

export const LivestreamCardDefitition = {
	type: 'latestLivestream',
	contentComponent: LivestreamCard,
	sidebarComponent: SidebarItemLivestreamCard,
	createNew: (card) => {
		card.w = 2;
		card.h = 1;
		card.mobileH = 2;
		card.mobileW = 4;
	}
} as CardDefinition & { type: 'latestLivestream' };
