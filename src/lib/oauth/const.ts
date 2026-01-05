import { base } from '$app/paths';

import { PUBLIC_DOMAIN } from '$env/static/public';

export const metadata = {
	client_id: `${PUBLIC_DOMAIN}${base}/client-metadata.json`,

	redirect_uris: [PUBLIC_DOMAIN + base],

	scope: 'atproto transition:generic',
	grant_types: ['authorization_code', 'refresh_token'],
	response_types: ['code'],
	token_endpoint_auth_method: 'none',
	application_type: 'web',
	dpop_bound_access_tokens: true
};
