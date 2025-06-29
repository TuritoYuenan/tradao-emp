<script lang="ts">
    import { page } from '$app/state';
</script>

<article>
	<h1>{page.status}</h1>
	<p>{page.error?.message}</p>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	h1 {
		font-size: 2rem;
		color: var(--foreground);
		text-align: center;
	}
</style>
