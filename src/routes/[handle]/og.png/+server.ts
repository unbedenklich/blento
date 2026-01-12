import { loadData } from '$lib/website/load';
import { ImageResponse } from '@ethercorps/sveltekit-og';

export async function GET({ params, platform }) {
	const handle = params.handle;
	const data = await loadData(params.handle, platform);

	console.log(data.data['app.bsky.actor.profile'].self);
	const image =
		'https://cdn.bsky.app/img/avatar/plain/' +
		data.did +
		'/' +
		data.data['app.bsky.actor.profile'].self.value.avatar.ref.$link;

	const htmlString = `
<div class="flex flex-col p-8 w-full h-full bg-neutral-900">
    <div class="flex items-center mb-8 mt-16">
      <img src="${image}" width="128" height="128" class="rounded-full" />

	    <h1 class="text-neutral-50 text-7xl ml-4">${handle}</h1>
    </div>

	<p class="mt-8 text-4xl text-neutral-300">Check out my blento</p>

	<div class="w-20 h-20 rounded-xl bg-rose-700 text-transparent absolute top-70 right-20">h</div>
	<div class="w-20 h-40 rounded-xl bg-rose-400 text-transparent absolute top-94 right-20">h</div>
	<div class="w-40 h-40 rounded-xl bg-rose-300 text-transparent absolute top-70 right-44">h</div>
	<div class="w-20 h-40 rounded-xl bg-rose-600 text-transparent absolute top-70 right-88">h</div>
	<div class="w-40 h-20 rounded-xl bg-rose-500 text-transparent absolute top-114 right-68">h</div>
</div>
`;

	return new ImageResponse(htmlString, {
		width: 1200,
		height: 630
	});
}
