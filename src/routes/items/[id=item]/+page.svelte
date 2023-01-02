<script>
  import { Heading, Button, Text } from "$lib/components";
  import Pencil from 'svelte-material-icons/Pencil.svelte';
  import { header } from "$lib/stores";

  /** @type {import('./$types').PageData} */
  export let data;

  let deleteForm;

  header.set(data.item?.name);
</script>

<div class="flex justify-between my-2">
  <Button on:click={() => window.history.back()} class="flex items-center px-3 gap-1">
    Back
  </Button>
  <Button as="a" href="/items/{data.item?.id}/edit" class="flex items-center pl-3 gap-1">
    Edit Item
    <Pencil />
  </Button>
</div>

<Heading size="subheading" class="py-4">{data.item?.name}</Heading>

<div class="flex flex-col lg:flex-row">
  <div class="flex flex-col w-full">
    <Text>Barcode: {data.item?.barcode}</Text>
    <!-- <Text>Inventory: {data.item?.inventory_name}</Text> -->
    <Text>Quantity: {data.item?.quantity}</Text>
  </div>
  <div class="lg:w-1/3 flex justify-center">
    <img src="{data.item?.image || 'https://placeimg.com/400/225/tech/grayscale'}" alt="{data.item?.name}" />
  </div>
</div>

<div class="flex justify-end my-4">
  <label for="confirm-delete" class="btn btn-error btn-outline">Delete</label>
</div>

<input type="checkbox" id="confirm-delete" class="modal-toggle" />
<label for="confirm-delete" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-lg font-bold">Confirm delete {data.item?.name}?</h3>
    <div class="modal-action">
      <label for="confirm-delete" class="btn btn-ghost">No</label>
      <form bind:this={deleteForm} method="POST" action="/items?/delete" >
        <input type="hidden" name="id" value={data.item?.id ?? ''} />
        <label for="confirm-delete" class="btn btn-primary" on:click={() => deleteForm.submit()} on:keydown>Yes</label>
      </form>
    </div>
  </label>
</label>
