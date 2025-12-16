<script lang="ts">
	const {
		title,
		description,
		keywords,
	}: {
		title: string;
		description?: string | null;
		keywords?: string | null;
	} = $props();
</script>

<svelte:head>
	<title>{title} | Tradao by ITea Lab&trade;</title>

	<meta name="application-name" content="Tradao" />
	<meta name="generator" content="SvelteKit" />
	<meta name="author" content="ITea Lab" />
	{#if description}<meta name="description" content={description} />{/if}
	{#if keywords}<meta name="keywords" content={keywords} />{/if}

	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_VN" />
	<meta property="og:site_name" content="Tradao by ITea Lab&trade;" />
	{#if description}<meta property="og:description" content={description} />{/if}

	<!-- Twitter Card -->
	<meta name="twitter:site" content="@itealab" />
	<meta name="twitter:creator" content="@TuritoYuenan" />
</svelte:head>
