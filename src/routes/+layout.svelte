<script lang="ts">
	import Nav from '$lib/Components/Nav.svelte';
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { Toast, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// For toasting
	import { initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();

	import { onMount } from 'svelte';
	import type { LayoutServerData } from './$types';
	import { statics } from '$lib';
	export let data: LayoutServerData;

	onMount( async () => {
		
		$statics.session = data.data;
		
		$statics.defaultNav = $statics.noAuthNav;

		if($statics.session){
			$statics.defaultNav = $statics.hasAuthNav;
		}
	});

	


	
</script>

<Nav />
<Toast position="br" transitions={true} max={7} spacing="space-x-5" buttonDismiss="btn-icon btn-icon-sm variant-outline-success text-white bg-green-500"/>
<div class="min-h-screen">
	<slot />
</div>
