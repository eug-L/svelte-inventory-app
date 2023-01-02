<script>
  import { customAlphabet } from "nanoid";
  import { goto } from "$app/navigation";

  import { Button, Input } from "$lib/components";
  import { header, inventories } from "$lib/stores";

  const nanoid = customAlphabet('1234567890abcdefg', 10)

  let name = '';

  header.set("New Inventory");

  const handleSubmit = () => {
    const newInventory = {
      id: nanoid(),
      name: name,
      owner: 'admin',
      invited: [],
      items: []
    };

    inventories.update(current => {
      return [newInventory, ...current];
    })

    goto('/');
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="my-6 grid gap-6">
    <Input label="Name" name="name" bind:value={name} />
    <div class="flex justify-end gap-2">
      <Button on:click={() => window.history.back()} variant="secondary">Cancel</Button>
      <Button type="submit">Create</Button>
    </div>
  </div>
</form>
