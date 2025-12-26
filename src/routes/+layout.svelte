<script lang="ts">
		import { ThemeToggle } from '@foxui/core';

	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { initClient } from '$lib/oauth';

	let { children } = $props();

	onMount(() => {
		initClient();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<ThemeToggle class="fixed top-2 left-2 z-10" />