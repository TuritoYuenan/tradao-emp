<script lang="ts">
	import type { FooterProps } from '$lib/props';
	import Leaf from './Leaf.svelte';

	let { explore, community, contact }: FooterProps = $props();
</script>

<footer class="bottom l grid padding">
	<div class="s12 m3">
		<h1 class="small">ITea Lab</h1>
		<p>Where tech meets its quali-tea</p>
	</div>
	<div class="s12 m3">
		<h2 class="small">Explore</h2>
		{#each explore as item}
			<p>
				<a href={item.href}>{item.name}</a>
			</p>
		{/each}
	</div>
	<div class="s12 m3">
		<h2 class="small">Community</h2>
		{#each community as item}
			<p>
				<a href={item.href} target="_blank" rel="noopener noreferrer">
					{item.name}
				</a>
			</p>
		{/each}
	</div>
	<div class="s12 m3">
		<h2 class="small">Contact</h2>
		<p>
			<a href={`mailto:${contact.email}`}>{contact.email}</a>
		</p>
		<p id="address" class="md:w-3/5">{contact.address}</p>
	</div>
	<div
		id="leaf"
		class="static md:absolute md:bottom-0 md:-right-40 md:w-80 md:h-60 md:overflow-hidden md:z-0"
	>
		<Leaf />
	</div>
</footer>
