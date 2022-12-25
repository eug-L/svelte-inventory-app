<script>
  import { onMount } from "svelte";
  import { item } from "$lib/stores";
  import { Heading, Button } from "$lib/components";
  import Pencil from 'svelte-material-icons/Pencil.svelte';

  let id = '';
  let name = '';
  let inventory_id = '';

  onMount(() => {
    id = $item.id;
    name = $item.name;
    inventory_id = $item.inventory_id;
  })

</script>

<div class="flex justify-between my-2">
  <Button as="a" href="/inventory/{inventory_id}" size="sm" class="flex items-center px-3 gap-1">
    Back
  </Button>
  <Button as="a" href="/inventory/{inventory_id}/{id}/edit" size="sm" class="flex items-center pl-3 gap-1">
    Edit Item
    <Pencil />
  </Button>
</div>
<Heading size="subheading" class="py-4">{name}</Heading>
<div>{id}</div>
