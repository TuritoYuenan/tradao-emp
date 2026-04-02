<script lang="ts">
	import TextClock from "./TextClock.svelte";

	const modes = [
		{ id: 'auto', icon: 'routine' },
		{ id: 'light', icon: 'light_mode' },
		{ id: 'dark', icon: 'dark_mode' },
	];

	let iMode = $state(0);

	function updateTheme() {
		iMode = (iMode + 1) % modes.length;
		ui("mode", modes[iMode].id);
	}

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
		<button
			class="transparent circle"
			onclick={updateTheme}
			data-testid="theme-toggle-button"
		>
			<i>{modes[iMode].icon}</i>
		</button>
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

<!-- Small Screen: Top wordmark -->
<nav class="top s" data-testid="navigation-top-s">
	<div>
		<a href="https://itealab.vercel.app">
			<img class="light" src="/logos/logo-lab.svg" alt="ITea Lab Logo" id="wordmark" />
			<img class="dark" src="/logos/logo-lab_dark.svg" alt="ITea Lab Logo" id="wordmark" />
		</a>
		<a href="/">
			<img class="light" src="/logos/logo.svg" alt="Tradao Logo" id="wordmark" />
			<img class="dark" src="/logos/logo_dark.svg" alt="Tradao Logo" id="wordmark" />
		</a>
	</div>
</nav>

<style>
	#wordmark {
		height: 3rem;
	}

	@media (prefers-color-scheme: dark) {
		.light {
			display: none;
		}
	}

	@media (prefers-color-scheme: light) {
		.dark {
			display: none;
		}
	}
</style>
