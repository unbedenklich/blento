# Selfhosting with cloudflare workers

- fork this repo
- create a cloudflare worker application and connect it to your fork
- change the vars in `wrangler.jsonc` (including https:// in the PUBLIC_DOMAIN var!)

```json
	"vars": {
		"PUBLIC_HANDLE": "your-bluesky-handle",
		"PUBLIC_IS_SELFHOSTED": "true",
		"PUBLIC_DOMAIN": "https://your-cloudflare-worker-or-custom-domain.com"
	}
```

DONE :) your blento should be live after a minute or two at `your-cloudflare-worker-or-custom-domain.com` and you can edit it by signing in with your bluesky account at `your-cloudflare-worker-or-custom-domain.com/edit`
