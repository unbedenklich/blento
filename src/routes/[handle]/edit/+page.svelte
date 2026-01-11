<script lang="ts">
	import { page } from '$app/state';
	import EditableWebsite from '$lib/EditableWebsite.svelte';
	import { setAdditionalUserData } from '$lib/helper.js';
	import { type Item } from '$lib/types.js';

	let { data } = $props();

	// svelte-ignore state_referenced_locally
	setAdditionalUserData(data.additionalData);
</script>

<EditableWebsite
	handle={page.params.handle}
	did={data.did}
	{data}
	items={Object.values(data.data['app.blento.card']).map((i) => i.value) as Item[]}

	settings={data.data['app.blento.settings']?.['self']?.value}
/>
