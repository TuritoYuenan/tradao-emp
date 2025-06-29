<script lang="ts">
	import Banner from "$components/Banner.svelte";
	import Title from "$components/Title.svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();

	console.dir(data);
</script>

<Title title="Ticket manager" />

<Banner title="Ticket Manager" />

<article>
	<code>
	</code>
</article>
