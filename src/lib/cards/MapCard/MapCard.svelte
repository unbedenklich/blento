<script lang="ts">
	import type { Item } from '$lib/types';
	import Map from './Map.svelte';

	let { item = $bindable() }: { item: Item } = $props();
</script>

<Map bind:item />
