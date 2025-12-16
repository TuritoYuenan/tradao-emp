<script lang="ts">
	import Leaf from "./Leaf.svelte";

	let {
		explore,
		community,
		contact,
	}: {
		explore: { name: string; href: string }[];
		community: { name: string; href: string }[];
		contact: { email: string; address: string };
	} = $props();
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
		<p id="address">{contact.address}</p>
	</div>

	<div id="leaf">
		<Leaf />
	</div>
</footer>
