<script>
  import Plus from 'svelte-material-icons/Plus.svelte';

  import { header } from "$lib/stores";
  import { Button, Card } from "$lib/components";

  header.set("Items");

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<div class="flex items-center justify-end gap-2 my-2">
  <Button as="a" href="/items/new" class="pl-5">
    New Item
    <Plus size="1.2rem" />
  </Button>
</div>
<div class="flex flex-wrap justify-center gap-4 my-4">
  {#each data?.items as item}
    <Card as="a" href="/items/{item.id}" hasImage={true} image={item.image ?? 'https://placeimg.com/400/225/tech/grayscale'} alt={item.name} class="relative">
      <svelte:fragment slot="title">
        {item.name}
      </svelte:fragment>
      <svelte:fragment slot="content">
        <p>{item.barcode}</p>
      </svelte:fragment>
      <svelte:fragment slot="extra">
        <div class="absolute right-0 top-0 m-4 bg-green-600 text-contrast w-9 h-9 flex items-center justify-center rounded">
          {item.quantity ?? 0}
        </div>
      </svelte:fragment>
    </Card>
  {/each}
</div>
