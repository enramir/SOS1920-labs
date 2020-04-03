import App from './App.svelte';

const app = new App({
	target: document.querySelector("#SvelteApp"),
	props: {
		name: 'Enrique'
	}
});

export default app;