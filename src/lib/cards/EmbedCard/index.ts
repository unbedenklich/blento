import type { CardDefinition } from '../types';
import CreateEmbedCardModal from './CreateEmbedCardModal.svelte';
import EmbedCard from './EmbedCard.svelte';
import SidebarItemEmbedCard from './SidebarItemEmbedCard.svelte';

export const EmbedCardDefinition = {
	type: 'embed',
	contentComponent: EmbedCard,
	creationModalComponent: CreateEmbedCardModal,
	sidebarComponent: SidebarItemEmbedCard,
	createNew: (card) => {
		card.w = 2;
		card.h = 2;
		card.mobileH = 4;
		card.mobileW = 4;
	}
} as CardDefinition & { type: 'embed' };
