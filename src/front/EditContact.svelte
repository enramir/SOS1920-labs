<script>
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { 
        onMount 
    } from "svelte";
    import { 
        pop 
    } from "svelte-spa-router";
    
    export let params = {};
    let contact = {};
    let updatedName = "XXX";
    let updatedPhone = 12345;
    let updatedEmail = "XXX@xxxx.com";
    let errorMsg = "";

    onMount(getContact);

	async function getContact(){
		
        console.log("Fetching contact...");
		const res = await fetch("/api/v1/contacts/" + params.contactName);

		if(res.ok){
            
            console.log("Ok:");
			const json = await res.json();
            contact = json;
            updatedName = contact.name;
            updatedPhone = contact.phone;
            updatedEmail = contact.email;
            console.log("Received contact.");
        
        }else{
            errorMsg = res.status + ": " + res.statusText;
			console.log("ERROR!" +  errorMsg);
		}
	}

    async function updateContact(){
        console.log("Updating contact..." + JSON.stringify(params.contactName));

        const res = await fetch("/api/v1/contacts/" + params.contactName, {
            method: "PUT",
            body: JSON.stringify({
                name : params.contactName,
                phone : updatedPhone,
                email : updatedEmail
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            getContact();
        });

    }
</script>

<main>
    <h3>Edit Contact <strong>{params.contactName}</strong></h3>
    {#await contact}
		Loading contact...
	{:then contact}
		<Table bordered>
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{updatedName}</td>
					<td><input bind:value="{updatedEmail}"></td>
					<td><input bind:value="{updatedPhone}"></td>
					<td><Button outline color="primary" on:click="{updateContact}">Update</Button></td>
				</tr>
			</tbody>
		</Table>
    {/await}
    
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    
    <Button outline color = "secondary" on:click="{pop}">Back</Button>

</main>