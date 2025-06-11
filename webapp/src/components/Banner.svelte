<script lang="ts">
	let { title, description }: { title: string; description?: string | null } =
		$props();
</script>

<header>
	<div id="leaf"></div>
	<h1>{title}</h1>
	{#if description}<p>{description}</p>{/if}
</header>

<style>
	header {
		margin: 1rem 1rem 2rem;
		padding: 3rem;
		color: var(--dark-green);
		background-color: var(--green);
		text-align: center;
		border-radius: 1rem 8rem;

		position: relative;
	}

	header h1 {
		font-size: 2.5rem;
		font-weight: bold;
	}

	header :is(p, h1) {
		position: relative;
		z-index: 1;
	}

	#leaf {
		height: calc(100% - 2rem);
		aspect-ratio: 1 / 1;
		position: absolute;
		z-index: 0;
		inset: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--background);
		border-radius: 0 100%;
	}
</style>
