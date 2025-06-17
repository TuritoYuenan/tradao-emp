<script lang="ts">
	let { title }: { title: string } = $props();
</script>

<svelte:head>
	<title>{title} | Tradao EMP</title>

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{title} | Tradao EMP" />
	<meta name="twitter:site" content="@tradaoemp" />
	<meta name="twitter:creator" content="@turitoyuenan" />
</svelte:head>
