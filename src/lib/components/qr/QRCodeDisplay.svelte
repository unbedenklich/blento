<script lang="ts">
	import { browser } from '$app/environment';

	let { url, size = 280, logo }: { url: string; size?: number; logo?: string } = $props();

	let container: HTMLDivElement | undefined = $state();

	$effect(() => {
		if (!browser || !container) return;

		const render = async () => {
			const QRCodeStylingModule = await import('qr-code-styling');
			const QRCodeStyling = QRCodeStylingModule.default;

			container!.innerHTML = '';

			const options: ConstructorParameters<typeof QRCodeStyling>[0] = {
				width: size,
				height: size,
				data: url,
				dotsOptions: {
					color: '#000',
					type: 'rounded'
				},
				backgroundOptions: {
					color: '#fff'
				},
				cornersSquareOptions: {
					type: 'extra-rounded'
				},
				cornersDotOptions: {
					type: 'dot'
				}
			};

			if (logo) {
				options.image = logo;
				options.imageOptions = {
					crossOrigin: 'anonymous',
					margin: 4
				};
			}

			const qrCode = new QRCodeStyling(options);
			qrCode.append(container!);
		};

		render();
	});
</script>

<div bind:this={container} class="flex items-center justify-center"></div>
