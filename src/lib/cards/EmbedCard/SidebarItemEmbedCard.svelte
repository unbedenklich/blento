<script lang="ts">
	import { Button } from '@foxui/core';

	let { onclick }: { onclick: () => void } = $props();
</script>

<Button {onclick} variant="ghost" class="w-full" size="lg">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="text-accent-600 dark:text-accent-400"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
		/>
	</svg>

	iFrame Embed</Button
>
