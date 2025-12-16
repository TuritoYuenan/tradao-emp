<script lang="ts">
	let { redirectTo }: { redirectTo?: string } = $props();

	let isSubmitting = $state(false);
	let errors = $state<string[]>([]);

	async function handleLogin(e: Event) {
		isSubmitting = true;
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const data = Object.fromEntries(new FormData(form).entries());

		const response = await fetch("/api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...data, redirectTo }),
		});

		switch (response.status) {
			case 400: {
				// 4xx errors
				const data = await response.json();
				errors = data.errors;
				isSubmitting = false;
				break;
			}

			case 500: {
				// 5xx errors
				errors = [
					"Something went wrong on our end. Please try again later.",
				];
				isSubmitting = false;
				break;
			}

			case 200: {
				// Success - redirecting
				const data = await response.json();
				const redirectUrl = data.redirectTo || "/manage";
				window.location.href = redirectUrl;
				break;
			}

			default: {
				// Unexpected status code
				errors = ["Unexpected error. Please try again later."];
			}
		}
	}
</script>

<article style="max-width: 90ch; margin: auto">
	<form method="POST" onsubmit={handleLogin} novalidate>
		<div class="field border label">
			<input type="email" name="email" id="email" required />
			<label for="email" class="font-bold">Email</label>
		</div>

		<div class="field border label">
			<input type="password" name="password" id="password" required />
			<label for="password" class="font-bold">Password</label>
		</div>

		<div class="medium-space"></div>

		{#if errors.length > 0}
			<div class="error">
				{#each errors as error}
					<p>{error}</p>
				{/each}
			</div>
		{/if}

		<button type="submit" class="responsive" disabled={isSubmitting}>
			Login
		</button>

		<p class="hr-text small-text">OR</p>

		<button type="submit" class="responsive" disabled={isSubmitting}>
			Sign in with Google
		</button>
	</form>
</article>
