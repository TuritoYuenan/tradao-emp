<script lang="ts">
	const {
		title,
		description,
		keywords,
	}: { title: string; description?: string | null; keywords?: string | null } = $props();
</script>

<svelte:head>
	<title>{title} | Tradao by ITea Lab&trade;</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
	{#if keywords}
		<meta name="keywords" content={keywords} />
	{/if}
</svelte:head>
