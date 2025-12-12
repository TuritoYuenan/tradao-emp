<script lang="ts">
	import PageMetadata from "$components/PageMetadata.svelte";
	import Banner from "$components/Banner.svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
	let username = $derived(data.user?.email ?? "User");
</script>

<PageMetadata
	title="Management Home"
	description="Manage ITea Lab events and Tradao tickets here"
	keywords="ITea Lab, Tradao, Management Dashboard, Events, Tickets, Technology, Innovation, Community, Vietnam"
/>

<Banner
	title={`Welcome back, ${username}`}
	description="Manage ITea Lab events and Tradao tickets here"
/>

<section style="max-width: 90ch; margin: auto">
	<a class="block" href="/manage/events">
		<article>
			<h2><i>event</i> Manage Events</h2>
			<div class="row right-align">
				<i>arrow_forward</i>
			</div>
		</article>
	</a>

	<div class="space"></div>

	<a class="block" href="/manage/check-in">
		<article>
			<h2><i>local_activity</i> Check-in Tickets</h2>
			<div class="row right-align">
				<i>arrow_forward</i>
			</div>
		</article>
	</a>

	<div class="space"></div>
</section>

<style>
	article h2 {
		font-size: 2em;
	}
</style>
