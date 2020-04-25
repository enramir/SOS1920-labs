<script>
	import Router from 'svelte-spa-router';
	import ContactsTable from './ContactsTable.svelte';
	import NotFound from './NotFound.svelte';
	import EditContact from './EditContact.svelte';

	const routes = {
		"/" : ContactsTable,
		"/contact/:contactName" : EditContact,
		"*" : NotFound
	}
</script>

<main>
	<h1>Contact Manager</h1>
	<Router {routes}></Router>
</main>
