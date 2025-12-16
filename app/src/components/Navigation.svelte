<script lang="ts">
	import TextClock from "./TextClock.svelte";

	let {
		menuItems,
	}: {
		menuItems: {
			name: string;
			href: string;
			icon: string;
			external: boolean;
		}[];
	} = $props();
</script>

<!-- Medium & Large Screen: Top navigation bar -->
<nav class="top m l">
	<p class="large-text">
		<a href="/">
			<img src="/logos/logo_dark.svg" alt="Tradao Logo" id="wordmark" />
		</a>
	</p>

	<div class="max"></div>

	<div class="row">
		<TextClock />
		<span>|</span>
		{#each menuItems as item}
			<a
				href={item.href}
				target={item.external ? "_blank" : "_self"}
				rel={item.external ? "noopener noreferrer" : ""}
			>
				<i class="prefix-icon">{item.icon}</i>
				{item.name}
			</a>
		{/each}
	</div>
</nav>

<!-- Small Screen: Bottom navigation bar -->
<nav class="bottom s">
	{#each menuItems as item}
		<a
			href={item.href}
			target={item.external ? "_blank" : "_self"}
			rel={item.external ? "noopener noreferrer" : ""}
		>
			<i class="prefix-icon">{item.icon}</i>
			{item.name}
		</a>
	{/each}
</nav>

<style>
	#wordmark {
		height: 3rem;
	}
</style>
