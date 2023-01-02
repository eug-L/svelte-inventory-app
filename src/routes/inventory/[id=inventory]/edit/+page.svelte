<script>
  import { onMount } from "svelte";

  import { Button, Input } from "$lib/components";
  import { header, inventories } from "$lib/stores";

  /** @type {import('./$types').PageData} */
  export let data;

  let id = '';
  let name = '';

  let foundInventory = $inventories.find(inventory => inventory.id === data.id);
  if (foundInventory) {
    id = foundInventory.id
    name = foundInventory.name;
  }

  onMount(() => {
    header.update(() => `${foundInventory ? foundInventory.name + ' - ' : ''}Edit`);
  });

  const handleSubmit = () => {
    console.log('submitting');
    inventories.update(current => {
      current.forEach(inventory => {
        if (inventory.id === id) {
          inventory.name = name;
        }
      })
      return current;
    })

    window.history.back();
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="my-6 grid gap-6">
    <Input label="Name" name="name" bind:value={name} />
    <div class="flex justify-end gap-2">
      <Button on:click={() => window.history.back()} variant="ghost">Cancel</Button>
      <Button type="submit">Submit</Button>
    </div>
  </div>
</form>
