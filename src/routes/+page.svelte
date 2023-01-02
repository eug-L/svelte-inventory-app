<script>
  import Plus from 'svelte-material-icons/Plus.svelte';
  import Pencil from 'svelte-material-icons/Pencil.svelte';

  import { Card, Text, Button } from "$lib/components";
  import { header, inventories } from "$lib/stores";

  header.set("Inventories");
</script>

<div class="flex items-center justify-end gap-2 my-2">
  <Button as="a" href="/inventory/new" class="pl-5">
    New Inventory
    <Plus size="1.2rem" />
  </Button>
  <Button as="a" href="/items/new" class="pl-5">
    New Item
    <Plus size="1.2rem" />
  </Button>
</div>
<div class="flex flex-wrap gap-4">
{#each $inventories as inventory}
  <Card as="a" href="/inventory/{inventory.id}" class="mb-4 flex justify-between items-center cursor-pointer" title="{inventory.name} - {inventory.owner}">
    <svelte:fragment slot="title">
      {inventory.name} - {inventory.owner}
    </svelte:fragment>
    <svelte:fragment slot="actions">
      <Button as="a" href="/inventory/{inventory.id}/edit" size="sm" variant="ghost">
        <Pencil size="1.5rem"/>
      </Button>
    </svelte:fragment>
  </Card>
{/each}
</div>
