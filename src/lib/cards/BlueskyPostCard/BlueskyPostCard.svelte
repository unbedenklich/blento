<script lang="ts">
	import { getAdditionalUserData } from '$lib/helper';
	import BaseCard, { type BaseCardProps } from '../BaseCard/BaseCard.svelte';
	import { BlueskyPost } from '@foxui/social';

	let { item, ...rest }: BaseCardProps = $props();

	const feed = getAdditionalUserData().recentPosts?.feed;

	$inspect(feed);
</script>

<BaseCard {item} {...rest}>
	<div class="flex max-h-full overflow-y-scroll p-4">
		{#if feed?.[0].post}
			<BlueskyPost showLogo showReply={false} showBookmark={false} feedViewPost={feed?.[0].post}
			></BlueskyPost>
		{:else}{/if}
	</div>
</BaseCard>
