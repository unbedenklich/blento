import { getDetailedProfile } from '$lib/atproto';
import { json } from '@sveltejs/kit';
import type { AppBskyActorDefs } from '@atcute/bluesky';

export async function GET({ platform }) {
	if (!platform?.env?.USER_DATA_CACHE) return json('no cache');
	const existingUsers = await platform?.env?.USER_DATA_CACHE?.get('updatedBlentos');

	const existingUsersArray: AppBskyActorDefs.ProfileViewDetailed[] = existingUsers
		? JSON.parse(existingUsers)
		: [];

	const existingUsersSet = new Set(existingUsersArray.map((v) => v.did));

	const newProfilesPromises: Promise<AppBskyActorDefs.ProfileViewDetailed | undefined>[] = [];
	for (const did of Array.from(existingUsersSet)) {
		const profile = getDetailedProfile({ did });
		newProfilesPromises.push(profile);
		if (newProfilesPromises.length > 20) break;
	}

	const newProfiles = await Promise.all(newProfilesPromises);

	await platform?.env?.USER_DATA_CACHE.put('updatedBlentos', JSON.stringify(newProfiles));

	return json('ok');
}
