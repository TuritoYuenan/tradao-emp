<script lang="ts">
	import { type Tables } from "$lib/models";
	import Banner from "../../../components/Banner.svelte";

	let { data }: { data: { event: Tables<"community_events"> } } = $props();
</script>

<Banner title={data.event.name} description={data.event.description} />
