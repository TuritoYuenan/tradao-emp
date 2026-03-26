<script lang="ts">
	import { page } from "$app/state";
</script>

<article class="medium middle-align center-align">
	<div>
		<i data-testid="error-icon" class="extra">error</i>
		<h1 data-testid="error-status" class="small">{page.status}</h1>
		<p data-testid="error-message" class="large-text">{page.error?.message}</p>
	</div>
</article>
