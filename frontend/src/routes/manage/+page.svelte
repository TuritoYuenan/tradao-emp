<script lang="ts">
	import Banner from "$components/Banner.svelte";
	import Title from "$components/Title.svelte";

	const username = "Minh-Triet";
</script>

<Title title="Management Home" />

<Banner title="Welcome back, {username}" description="Manage ITea Lab events and Tradao tickets here" />

<article>
	<section>
		<div>
			<a href="/manage-events">
				<span class="material-symbols-rounded">event</span>
				<h2>Events CRUD</h2>
			</a>
		</div>
		<div>
			<a href="/manage-tickets">
				<span class="material-symbols-rounded">local_activity</span>
				<h2>Tickets CRUD</h2>
			</a>
		</div>
		<div>
			<a href="/manage-admins">
				<span class="material-symbols-rounded">manage_accounts</span>
				<h2>Admins CRUD</h2>
			</a>
		</div>
	</section>
</article>

<style>
	section {
		max-width: 800px;
		min-height: 30vh;
		margin: 0 auto;
		display: grid;
		align-content: center;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	section > div {
		padding: 1rem;
		text-align: center;
		background-color: var(--green);
		border-radius: 1rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	section span.material-symbols-rounded {
		font-size: 6em;
	}
</style>
