import { type Collection, type DownloadedData } from './types';
import { getRecord, listRecords, resolveHandle } from '$lib/oauth/atproto';
import type { Record as ListRecord } from '@atproto/api/dist/client/types/com/atproto/repo/listRecords';
import { data } from './data';

export function parseUri(uri: string) {
	// at://did:plc:257wekqxg4hyapkq6k47igmp/link.flo-bit.dev/3lnblfznvhr2a
	const [did, collection, rkey] = uri.split('/').slice(2);
	return { did, collection, rkey } as {
		collection: `${string}.${string}.${string}`;
		rkey: string;
		did: string;
	};
}

export async function loadData(handle: string) {
	const did = await resolveHandle({ handle });

	const downloadedData = {} as DownloadedData;

	const promises: { collection: string; rkey?: string; record: ListRecord }[] = [];

	for (const collection of Object.keys(data) as Collection[]) {
		const cfg = data[collection];

		try {
			if (Array.isArray(cfg)) {
				for (const rkey of cfg) {
					const record = getRecord({ did, collection, rkey });
					promises.push({
						collection,
						rkey,
						record
					});
				}
			} else if (cfg === 'all') {
				const records = listRecords({ did, collection });
				promises.push({ collection, record: records });
			}
		} catch (error) {
			console.error('failed getting', collection, cfg, error);
		}
	}

	await Promise.all(promises.map((v) => v.record));

	for (const promise of promises) {
		if (promise.rkey) {
			downloadedData[promise.collection] ??= {} as Record<string, ListRecord>;
			downloadedData[promise.collection][promise.rkey] = await promise.record;
		} else {
			downloadedData[promise.collection] ??= await promise.record;
		}
	}

	console.log(downloadedData);

	return { did, data: JSON.parse(JSON.stringify(downloadedData)) as DownloadedData };
}
