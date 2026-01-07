<script lang="ts">
	import { page } from '$app/state';
	import { setAdditionalUserData } from '$lib/helper.js';
	import { type Item } from '$lib/types.js';
	import Website from '$lib/Website.svelte';

	let { data } = $props();

	// svelte-ignore state_referenced_locally
	setAdditionalUserData(data.additionalData);
</script>

<Website
	{data}
	handle={page.params.handle}
	did={data.did}
	items={Object.values(data.data['app.blento.card']).map((i) => i.value) as Item[]}
/>
