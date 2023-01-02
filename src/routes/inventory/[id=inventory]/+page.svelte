<script>
  import { onMount } from "svelte";
  import Pencil from 'svelte-material-icons/Pencil.svelte';
  import Plus from 'svelte-material-icons/Plus.svelte';
  import ViewList from 'svelte-material-icons/ViewList.svelte';
  import ViewGrid from 'svelte-material-icons/ViewGrid.svelte';

  import { header } from "$lib/stores";
  import { Button, Card, Text } from "$lib/components";

  /** @type {import('./$types').PageData} */
  export let data;

  header.set(data.foundInventory?.name || "");
</script>

<div class="grid gap-4 pt-2">
  <div class="flex justify-between">
    <Button as="a" href="/">
      Back
    </Button>
    <div class="flex gap-2">
      <Button as="a" href="/inventory/{data.id}/edit" class="pl-5">
        Edit Inventory
        <Pencil />
      </Button>
      <Button class="pl-5">
        Add Item
        <Plus size="1.2rem" />
      </Button>
    </div>
  </div>
  {#if data.foundInventory}
    <div class="flex items-center justify-between">
      <Text class="font-semibold">Items:</Text>
      <!-- <div class="flex items-center justify-end gap-1"> -->
      <!--   <Text>View:</Text> -->
      <!--   <Button size="sm"> -->
      <!--     <ViewList /> -->
      <!--   </Button> -->
      <!--   <Button size="sm"> -->
      <!--     <ViewGrid /> -->
      <!--   </Button> -->
      <!-- </div> -->
    </div>
    <div class="flex flex-wrap gap-4">
      {#each data.inventoryItems as item}
        <Card as="a" href="/items/{item.id}" title="{item.name}" hasImage={true} image={item.image} />
      {/each}
    </div>
  {/if}
  </div>
