<script lang="ts">
	import "../global.css";
	import Navbar from "$components/Navbar.svelte";
	import Footer from "$components/Footer.svelte";

	import type { Snippet } from "svelte";

	let { children }: { children: Snippet } = $props();
</script>

<Navbar />

<main>
	{@render children()}
</main>

<Footer />
