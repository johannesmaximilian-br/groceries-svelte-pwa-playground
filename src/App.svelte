<script>
	import Login from "./Login.svelte";
</script>

<main class="content">
	<Login />
</main>

<style>
	main {
        min-height: 100vh;
        display: grid;
        grid-template-rows: auto auto 1fr auto;
		padding: 0;
		margin: 0 auto;
	}
</style>