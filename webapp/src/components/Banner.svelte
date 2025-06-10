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
		margin: 1rem;
		margin-bottom: 2rem;
		padding: 3rem;
		color: var(--dark-green);
		background-color: var(--green);
		text-align: center;
		border-radius: 8rem 1rem;
	}

	header h1 {
		font-size: 2.5rem;
		font-weight: bold;
	}
</style>
