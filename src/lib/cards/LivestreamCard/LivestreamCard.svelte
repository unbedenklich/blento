<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';
	import { getDidContext } from '$lib/website/context';
	import { listRecords } from '$lib/oauth/atproto';
	import { getIsMobile } from '$lib/helper';
	import type { ContentComponentProps } from '../types';
	import { getImageBlobUrl } from '$lib/website/utils';
	import { RelativeTime } from '@foxui/time';

	let { item = $bindable() }: ContentComponentProps = $props();

	let did = getDidContext();

	let isMobile = getIsMobile();

	let isLoaded = $state(false);

	let latestLivestream:
		| {
				createdAt: string;
				title: string;
				thumb?: string;
				href: string;
		  }
		| undefined = $state();

	onMount(async () => {
		const records = await listRecords({ did, collection: 'place.stream.livestream', limit: 3 });
		console.log(records);

		const values = Object.values(records);
		if (values?.length > 0) {
			const latest = JSON.parse(JSON.stringify(values[0]));
			console.log(latest);

			latestLivestream = {
				createdAt: latest.value.createdAt,
				title: latest.value.title as string,
				thumb: getImageBlobUrl({ link: latest.value.thumb?.ref.$link, did }),
				href: latest.value.canonicalUrl || latest.value.url
			};
		}

		isLoaded = true;
	});
</script>

<div class="h-full overflow-y-scroll p-4">
	{#if latestLivestream}
		<div class="flex min-h-full flex-col justify-between">
			<div>
				<div class="mb-4 flex items-center gap-2">
					<Icon class="size-6" />
					<div class="font-semibold">Latest Livestream</div>
				</div>

				<div class="mb-2 text-xs font-medium">
					started <RelativeTime date={new Date(latestLivestream.createdAt)} locale="en-US" /> ago
				</div>

				<a href={latestLivestream?.href} target="_blank" rel="noopener noreferrer">
					<div
						class="text-accent-700 dark:text-accent-300 hover:text-accent-600 dark:hover:text-accent-400 text-xl font-semibold transition-colors duration-150"
					>
						{latestLivestream?.title}
					</div>
				</a>
			</div>

			{#if ((isMobile() && item.mobileH >= 4) || (!isMobile() && item.h >= 2)) && latestLivestream?.thumb}
				<a href={latestLivestream?.href} target="_blank" rel="noopener noreferrer">
					<img
						class="my-4 max-h-32 w-full rounded-xl object-cover"
						src={latestLivestream?.thumb}
						alt=""
					/>
					<span class="sr-only">open livestream</span>
				</a>
			{/if}
		</div>
	{:else if isLoaded}
		<div class="flex h-full w-full items-center justify-center">No latest stream found!</div>
	{:else}
		<div class="flex h-full w-full items-center justify-center">Looking for the latest stream</div>
	{/if}
</div>
