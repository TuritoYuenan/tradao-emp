<script lang="ts">
	import Banner from '$components/Banner.svelte';
	import LoginForm from '$components/LoginForm.svelte';
	import PageMetadata from '$components/PageMetadata.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let redirectTo = $derived.by(() => {
		if (!data.url) return undefined;
		const url = new URL(data.url);
		return url.searchParams.get('redirectTo') || undefined;
	});
</script>

<PageMetadata
	title="Login as Event Organiser"
	description="Access the management dashboard to manage events and tickets"
	keywords="ITea Lab, Tradao, Login, Management Dashboard, Events, Tickets, Technology, Innovation, Community, Vietnam"
/>

<Banner title="Login as Event Organiser" />
<LoginForm {redirectTo} />
