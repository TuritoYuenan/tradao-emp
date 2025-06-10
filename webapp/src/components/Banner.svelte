<script lang="ts">
	export let title: string = "Title";
	export let description: string | null = null;
</script>

<header>
	<h1>{title}</h1>
	{#if description}<p>{description}</p>{/if}
</header>

<style>
	header {
		margin-bottom: 2rem;
		padding: 2rem;
		background-color: var(--dark-green);
		color: var(--green);
		text-align: center;
	}

	header h1 {
		font-size: 2.5rem;
		font-weight: bold;
	}
</style>
