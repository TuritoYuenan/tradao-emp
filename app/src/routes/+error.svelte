<script lang="ts">
	import { page } from "$app/state";
</script>

<article class="medium middle-align center-align">
	<div>
		<i class="extra">error</i>
		<h1 class="small">{page.status}</h1>
		<p class="large-text">{page.error?.message}</p>
	</div>
</article>
