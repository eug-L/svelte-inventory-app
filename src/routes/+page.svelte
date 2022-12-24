<script>
  import Plus from 'svelte-material-icons/Plus.svelte';
  import Pencil from 'svelte-material-icons/Pencil.svelte';
  import { onMount } from "svelte";

  import { Card, Text, Button } from "$lib/components";
  import { header, inventories } from "$lib/stores";

  onMount(() => {
    header.update(() => "Inventories");
  });
</script>

<div class="flex items-center justify-end gap-2 my-2">
  <Button as="a" href="/item/new" size="sm" class="flex items-center pl-3 gap-1">
    New Item
    <Plus size="1.2rem" />
  </Button>
  <Button as="a" href="/inventory/new" size="sm" class="flex items-center pl-3 gap-1">
    New Inventory
    <Plus size="1.2rem" />
  </Button>
</div>
{#each $inventories as inventory}
  <Card as="a" href="/inventory/{inventory.id}" class="mb-4 flex justify-between items-center cursor-pointer">
    <Text>{inventory.name} - {inventory.owner}</Text>
    <Button as="a" href="/inventory/{inventory.id}/edit" size="sm" variant="secondary">
      <Pencil />
    </Button>
  </Card>
{/each}
