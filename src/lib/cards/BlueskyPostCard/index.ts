import type { CardDefinition } from '../types';
import BlueskyPostEditingCard from './BlueskyPostEditingCard.svelte';
import BlueskyPostCard from './BlueskyPostCard.svelte';
import SidebarItemBlueskyPostCard from './SidebarItemBlueskyPostCard.svelte';

export const BlueskyPostCardDefinition = {
	type: 'latestPost',
	cardComponent: BlueskyPostCard,
	editingCardComponent: BlueskyPostEditingCard,
	createNew: (card) => {
		card.cardType = 'latestPost';
	},
	sidebarComponent: SidebarItemBlueskyPostCard
} as CardDefinition & { type: 'latestPost' };
