<script lang="ts">
	import { MarkdownText, SingleRecord } from './website/components';

	let { handle, did }: { handle: string; did: string } = $props();

	let colors = [
		'bg-red-500',
		'bg-orange-500',
		'bg-amber-500',
		'bg-yellow-500',
		'bg-lime-500',
		'bg-green-500',
		'bg-emerald-500',
		'bg-teal-500',
		'bg-cyan-500',
		'bg-sky-500',
		'bg-blue-500',
		'bg-indigo-500',
		'bg-violet-500',
		'bg-purple-500',
		'bg-fuchsia-500',
		'bg-pink-500',
		'bg-rose-500'
	];

	const items = [
		{ id: '0', x: 0, y: 0, w: 2, h: 1 },
		{ id: '1', x: 2, y: 2, w: 2, h: 2 },
		{ id: '2', x: 2, y: 0, w: 1, h: 2 },
		{ id: '2', x: 1, y: 1, w: 1, h: 2 },
		{ id: '3', x: 0, y: 3, w: 2, h: 2 },
		{ id: '4', x: 3, y: 0, w: 1, h: 1 },
		{ id: '5', x: 2, y: 4, w: 2, h: 1 }
	];

	const combined = $state(
		items.map((item, index) => ({
			...item,
			color: colors[index % colors.length],
			id: Math.random().toFixed(4)
		}))
	);

	let maxHeight = $derived(combined.reduce((max, item) => Math.max(max, item.y + item.h), 0));

	const margin = 16;

	let container: HTMLDivElement | undefined = $state();

	type Item = {
		w: number;
		h: number;
		x: number;
		y: number;
	};

	let activeDragElement: {
		element: HTMLDivElement | null;
		item: Item | null;
		w: number;
		h: number;
		x: number;
		y: number;
		mouseDeltaX: number;
		mouseDeltaY: number;
	} = $state({
		element: null,
		item: null,
		w: 0,
		h: 0,
		x: -1,
		y: -1,
		mouseDeltaX: 0,
		mouseDeltaY: 0
	});
</script>

<div class="flex px-12 py-24 md:fixed md:h-screen md:w-1/3">
	<div class="flex flex-col gap-4">
		<SingleRecord collection="app.bsky.actor.profile" rkey="self">
			{#snippet child(data)}
				<img
					class="rounded-fulll size-44 rounded-full"
					src={'https://cdn.bsky.app/img/avatar/plain/' + did + '/' + data.value.avatar.ref.$link}
					alt=""
				/>
				<div class="line-clamp-2 text-4xl font-bold wrap-anywhere">{handle}</div>

				<div
					class="text-base-600 dark:text-base-400 prose dark:prose-invert prose-a:text-accent-500 prose-a:no-underline"
				>
					<MarkdownText key="description" {data} />
				</div>
			{/snippet}
		</SingleRecord>
	</div>
</div>
<div class="md:grid md:grid-cols-3">
	<div></div>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		bind:this={container}
		ondragover={(e) => {
			e.preventDefault();
			if (!container) return;

			const x = e.clientX + activeDragElement.mouseDeltaX;
			const y = e.clientY + activeDragElement.mouseDeltaY;
			const rect = container.getBoundingClientRect();

			const gridX = Math.floor(((x - rect.left) / rect.width) * 4);
			const gridY = Math.floor(((y - rect.top) / rect.width) * 4);

			activeDragElement.x = gridX;
			activeDragElement.y = gridY;
		}}
		ondragend={(e) => {
			e.preventDefault();
			if (!container) return;

			const x = e.clientX + activeDragElement.mouseDeltaX;
			const y = e.clientY + activeDragElement.mouseDeltaY;
			const rect = container.getBoundingClientRect();

			const gridX = Math.floor(((x - rect.left) / rect.width) * 4);
			const gridY = Math.floor(((y - rect.top) / rect.width) * 4);

			activeDragElement.item.x = gridX;
			activeDragElement.item.y = gridY;
			activeDragElement.x = -1;
			activeDragElement.y = -1;
			activeDragElement.element = null;
			return true;
		}}
		class="relative col-span-2 container h-fit w-full p-8"
		style="container-type: inline-size;"
	>
		{#each combined as item}
			<div
				ondragstart={(e) => {
					const target = e.target as HTMLDivElement;
					activeDragElement.element = target;
					activeDragElement.w = item.w;
					activeDragElement.h = item.h;
					activeDragElement.item = item;

					const rect = target.getBoundingClientRect();

					activeDragElement.mouseDeltaX = rect.left + 16 - e.clientX;
					activeDragElement.mouseDeltaY = rect.top - e.clientY;
					console.log(activeDragElement.mouseDeltaY);

					console.log(e);
				}}
				draggable="true"
				class={['absolute aspect-square rounded-2xl', item.color]}
				style={`translate: calc(${(item.x / 4) * 100}cqw + ${margin}px) calc(${(item.y / 4) * 100}cqw + ${margin}px); 
                width: calc(${(item.w / 4) * 100}cqw - ${margin * 2}px);
                height: calc(${(item.h / 4) * 100}cqw - ${margin * 2}px);`}
			>
				<a href="#" tabindex={item.y * 4 + item.x + 1}>test</a>
			</div>
		{/each}

		{#if activeDragElement.element && activeDragElement.x >= 0}
			{@const item = activeDragElement}
			<div
				class={['bg-base-500/20 absolute aspect-square rounded-2xl']}
				style={`translate: calc(${(item.x / 4) * 100}cqw + ${margin / 2}px) calc(${(item.y / 4) * 100}cqw + ${margin / 2}px); 
                
                width: calc(${(item.w / 4) * 100}cqw - ${margin}px);
                height: calc(${(item.h / 4) * 100}cqw - ${margin}px);`}
			></div>
		{/if}
		<div style="height: {((maxHeight + 1) / 4) * 100}cqw;"></div>
	</div>
</div>
