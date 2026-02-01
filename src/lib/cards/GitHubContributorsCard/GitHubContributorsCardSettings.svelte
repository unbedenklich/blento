<script lang="ts">
	import type { SettingsComponentProps } from '../types';
	import { Label } from '@foxui/core';

	let { item = $bindable() }: SettingsComponentProps = $props();

	const layoutOptions = [
		{ value: 'hex', label: 'Hexagon' },
		{ value: 'grid', label: 'Grid' }
	];

	let layout = $derived(item.cardData.layout ?? 'hex');
</script>

<div class="flex flex-col gap-2">
	<Label>Layout</Label>
	<div class="flex gap-2">
		{#each layoutOptions as opt (opt.value)}
			<button
				class={[
					'flex-1 rounded-xl border px-3 py-2 text-sm transition-colors',
					layout === opt.value
						? 'bg-accent-500 border-accent-500 text-white'
						: 'bg-base-100 dark:bg-base-800 border-base-300 dark:border-base-700 text-base-900 dark:text-base-100 hover:border-accent-400'
				]}
				onclick={() => (item.cardData.layout = opt.value)}
			>
				{opt.label}
			</button>
		{/each}
	</div>
</div>
