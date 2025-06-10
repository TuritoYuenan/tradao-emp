<script lang="ts">
	const explore = [
		{ name: "About", href: "/" },
		{ name: "Community", href: "/" },
		{ name: "Join Us", href: "/" },
	];

	const community = [
		{ name: "GitHub", href: "https://github.com/itea-lab" },
		{ name: "Facebook", href: "https://github.com/itea-lab" },
		{ name: "LinkedIn", href: "https://linkedin.com/company/itea-lab" },
	];
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
				<a href="mailto:contact.itealab@gmail.com">
					contact.itealab@gmail.com
				</a>
			</p>
			<p id="address">
				A35 Bach Dang street, Tan Binh district, Ho Chi Minh city,
				Vietnam
			</p>
		</div>
		<div id="leaf">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="230"
				height="320"
				viewBox="0 0 65 90"
				style="display: block;"
			>
				<path
					d="M9.76426 0C9.76426 0 17.1691 7.18412 25.1775 10.0805C84.482 31.5312 59.4707 73.3326 58.6548 73.4704C58.6548 73.4704 55.3293 67.6792 50.837 64.376C22.331 43.4199 16.5372 19.2984 16.5372 19.2984C16.5372 19.2984 22.9339 48.3243 48.2943 66.385C53.8955 70.3719 57.6882 80.1885 59.2936 90C59.2936 90 55.3232 88.3958 53.6159 87.9613C52.9501 83.6167 51.5581 79.4564 49.2048 75.74C13.7606 79.96 2.152 51.3996 0.63549 41.4408C-2.94384 17.9203 9.76426 0 9.76426 0Z"
					style="fill: var(--foreground);"
				/>
			</svg>
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
