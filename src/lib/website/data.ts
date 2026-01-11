export const image_collection = 'com.example.image' as const;

// collections and records we want to grab
export const data = {
	'app.bsky.actor.profile': ['self'],

	'app.blento.card': 'all',
	'app.blento.settings': ['self']
} as const;
