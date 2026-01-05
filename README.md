# blento

WORK IN PROGRESS, not ready for use yet, but you can test it out at: https://blento.app

your personal website in a bento style layout, using your bluesky PDS as a backend.

made with svelte, tailwind.


## Selfhosting

- fork this repo
- create a cloudflare worker application and connect it to your fork
- change the vars in `wrangler.jsonc`

```json
	"vars": {
		"PUBLIC_HANDLE": "your-bluesky-handle",
		"PUBLIC_IS_SELFHOSTED": "true",
		"PUBLIC_DOMAIN": "https://your-cloudflare-worker-or-custom-domain.com"
	}
```

DONE :)