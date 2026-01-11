<script lang="ts">
	import { Modal } from '@foxui/core';

	export type Settings = {
		title: string;
	};

	let { open = $bindable(), settings }: { open: boolean; settings: Settings } = $props();
</script>

<Modal bind:open>Settings</Modal>
