<script lang="ts">
	import Leaf from "./Leaf.svelte";

	/**
	 * Explore - Links to internal ITea Lab sections
	 */
	const explore = [
		{ name: "About", href: "/" },
		{ name: "Community", href: "/" },
		{ name: "Join Us", href: "/" },
	];

	/**
	 * Community - Links to external ITea Lab social media
	 */
	const community = [
		{ name: "GitHub", href: "https://github.com/itea-lab" },
		{ name: "Facebook", href: "https://facebook.com/ITeaLabTeam/" },
		{ name: "LinkedIn", href: "https://linkedin.com/company/itea-lab" },
	];

	/**
	 * Contact - Contact information for ITea Lab
	 */
	const contact = {
		email: "contact.itealab@gmail.com",
		address:
			"A35 Bach Dang street, Tan Binh district, Ho Chi Minh city, Vietnam",
	};
</script>

<footer>
	<div id="curve"></div>
	<section id="menu">
		<div>
			<h1>ITea Lab</h1>
			<p>Where tech meets its quali-tea</p>
		</div>
		<div>
			<h2>Explore</h2>
			{#each explore as item}
				<p><a href={item.href}>{item.name}</a></p>
			{/each}
		</div>
		<div>
			<h2>Community</h2>
			{#each community as item}
				<p>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={item.href}
					>
						{item.name}
					</a>
				</p>
			{/each}
		</div>
		<div>
			<h2>Contact</h2>
			<p>
				<a href="mailto:{contact.email}">{contact.email}</a>
			</p>
			<p id="address">{contact.address}</p>
		</div>
		<div id="leaf">
			<Leaf />
		</div>
	</section>
</footer>

<style>
	footer {
		margin-top: 2rem;
		background-color: var(--green);
		overflow: hidden;
	}

	#curve {
		height: 3rem;
		background-color: var(--background);
		border-radius: 0 0 100% 100%;
	}

	#menu {
		margin-inline: 3rem;
		padding: 2rem;
		display: flex;
		align-items: first baseline;
		justify-content: space-around;
		position: relative;
	}

	#menu > div {
		margin-inline: 1rem;
		flex-grow: 0;
	}

	#address {
		width: 60%;
	}

	#leaf {
		width: 20rem;
		height: 15rem;
		bottom: 0;
		right: -10rem;
		position: absolute;
		overflow: hidden;
		z-index: 0;
	}

	@media (max-width: 768px) {
		#menu {
			padding: 1rem;
			padding-bottom: 0;
			flex-wrap: wrap;
		}

		#menu > div {
			margin-inline: 0;
			text-align: center;
		}

		#address {
			width: 100%;
		}

		#leaf {
			position: static;
		}
	}
</style>
