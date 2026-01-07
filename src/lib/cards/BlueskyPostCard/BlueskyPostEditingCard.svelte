<script lang="ts">
	import { getAdditionalUserData } from '$lib/helper';
	import type { Item } from '$lib/types';
	import BaseEditingCard, { type BaseEditingCardProps } from '../BaseCard/BaseEditingCard.svelte';
	import { BlueskyPost } from '@foxui/social';

	let { item = $bindable<Item>(), ...rest }: BaseEditingCardProps = $props();
	const feed = getAdditionalUserData().recentPosts?.feed;
</script>

<BaseEditingCard {item} {...rest}>
	<div class="flex max-h-full overflow-y-scroll p-4">
		{#if feed?.[0].post}
			<BlueskyPost showLogo showReply={false} showBookmark={false} feedViewPost={feed?.[0].post}
			></BlueskyPost>
		{:else}
			Your latest bluesky post will appear here.
		{/if}
	</div>
</BaseEditingCard>
