<script lang="ts">
	import type { BannerProps } from '$lib/props';

	let { title, description }: BannerProps = $props();
</script>

<header class="large-padding transparent">
	<div class="space"></div>

	<h1 class="small center-align">{title}</h1>
	{#if description}
		<p class="large-text center-align">{description}</p>
	{/if}

	<div class="space"></div>
</header>
