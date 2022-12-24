<script>
  import { onMount } from "svelte";
  import Pencil from 'svelte-material-icons/Pencil.svelte';
  import Plus from 'svelte-material-icons/Plus.svelte';
  import ViewList from 'svelte-material-icons/ViewList.svelte';
  import ViewGrid from 'svelte-material-icons/ViewGrid.svelte';

  import { header, inventories } from "$lib/stores";
  import { Button, Card, Text } from "$lib/components";

  /** @type {import('./$types').PageData} */
  export let data;

  let foundInventory = $inventories.find(inventory => inventory.id === data.id)

  onMount(() => {
    header.update(() => foundInventory?.name || "");
  });
</script>

<div class="grid gap-2 pt-2">
  <div class="flex justify-between">
    <Button as="a" href="/" size="sm" class="flex items-center px-3 gap-1">
      Back
    </Button>
    <div class="flex gap-2">
      <Button as="a" href="/inventory/{data.id}/edit" size="sm" class="flex items-center pl-3 gap-1">
        Edit Inventory
        <Pencil />
      </Button>
      <Button size="sm" class="flex items-center pl-3 gap-1">
        Add Item
        <Plus size="1.2rem" />
      </Button>
    </div>
  </div>
  <div class="shadow-inner p-4 border rounded">
    <Text size="lead">Owner: {foundInventory?.owner}</Text>
  </div>
  {#if foundInventory}
    <div class="flex items-center justify-end gap-1">
      <Text>View:</Text>
      <Button size="sm">
        <ViewList />
      </Button>
      <Button size="sm">
        <ViewGrid />
      </Button>
    </div>
    <div class="grid">
      {#each foundInventory.items as item}
        <Card as="a" href="/item/{item.id}">{item.name}</Card>
      {/each}
    </div>
  {/if}
  </div>
