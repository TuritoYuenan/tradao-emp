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
<nav class="top m l" data-testid="navigation-top">
	<p class="large-text">
		<a href="/">
			<img src="/logos/logo_dark.svg" alt="Tradao Logo" id="wordmark" />
		</a>
	</p>

	<div class="max"></div>

	<div class="row">
		<TextClock />
		<span>|</span>
		{#each menuItems as item, index}
			<a
				href={item.href}
				target={item.external ? "_blank" : "_self"}
				rel={item.external ? "noopener noreferrer" : ""}
				data-testid="{`${item.icon}-t${index}`}"
			>
				<i class="prefix-icon">{item.icon}</i>
				{item.name}
			</a>
		{/each}
	</div>
</nav>

<!-- Small Screen: Bottom navigation bar -->
<nav class="bottom s" data-testid="navigation-bottom">
	{#each menuItems as item, index}
		<a
			href={item.href}
			target={item.external ? "_blank" : "_self"}
			rel={item.external ? "noopener noreferrer" : ""}
			data-testid="{`${item.icon}-b${index}`}"
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
