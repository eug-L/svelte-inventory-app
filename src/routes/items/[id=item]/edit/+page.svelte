<script>
  import { onMount } from "svelte";
  import {Html5QrcodeScanner} from "html5-qrcode";
  import { enhance, applyAction } from '$app/forms';
  import dayjs from 'dayjs';

  import { Button, Input, Select } from "$lib/components";
  import { header } from "$lib/stores";

  header.set("Edit Item");

  /** @type {import('./$types').PageData} */
  export let data;
  export let form;

  let id = '';
  let barcode = '';
  let name = '';
  let expiry_date = '';
  let image = '';
  let scanner = undefined;
  let quantity = '';
  let fileInput;

  $: restoreForm(form);

  function restoreForm(form) {
    barcode = form?.data?.barcode ?? '';
  }

  onMount(() => {
    id = data?.item?.id ?? '';
    barcode = data?.item?.barcode ?? '';
    name = data?.item?.name ?? '';
    expiry_date = dayjs(data?.item?.expiry_date).format('YYYY-MM-DD') ?? '';
    image = data?.item?.image ?? '';
    quantity = data?.item?.quantity ?? '';
  });

  function onScanSuccess(decodedText) {
    barcode = decodedText;

    if (scanner) {
      clearScanner();
    }
  }

  function clearScanner() {
    scanner.clear();
    scanner = undefined;
  }

  // Square QR box with edge size = 70% of the smaller edge of the viewfinder.
  let qrboxFunction = function(viewfinderWidth, viewfinderHeight) {
    let minEdgePercentage = 0.7; // 70%
    let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
    let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
    return {
      width: qrboxSize,
      height: qrboxSize
    };
  }

  const startScanner = () => {
    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        /* qrbox: {width: 250, height: 250}, */
        qrbox: qrboxFunction,
        showTorchButtonIfSupported: true
      },
      /* verbose= */ false);
    html5QrcodeScanner.render(onScanSuccess);
    scanner = html5QrcodeScanner;
  }

  const focusBarcodeInput = () => {
    startScanner();
  }

  const handleFileInput = (e) => {
    image = URL.createObjectURL(e.detail);
  }

</script>

<form method="POST" action="/items?/update" enctype="multipart/form-data" use:enhance={({ form }) => {
  return async ({ result, update }) => {
    if (result.type === 'success') {
      window.history.back();
    }
    if (result.type === 'failure') {
      await applyAction(result);
    }
    update();
  };
}}>
  <input type="hidden" name="id" value={id ?? ''} />
  <div class="my-6 grid gap-6 {scanner && 'hidden'}">
    <label for="barcode" class="text-label text-primary font-semibold">Barcode</label>
    <Input readonly={true} name="barcode" value={barcode ?? ''} error={form?.errors?.barcode} on:focus-input={focusBarcodeInput} />
    <Button on:click={startScanner}>
      {#if barcode !== ''}
        Scan Again
      {:else}
        Scan
      {/if}
    </Button>

    <Input label="Name" name="name" value={name ?? ''} error={form?.errors?.name} />

    <Input label="Expiry date" name="expiry_date" value={expiry_date ?? ''} type="date" error={form?.errors?.expiry_date} />

    <Input label="Image" name="image" type="file" accept="image/*" capture="environment" error={form?.errors?.image} class="{image && 'hidden'}" bind:node={fileInput} on:change-input={handleFileInput} />
    {#if image !== ''}
      <div class="flex items-center gap-2">
        <label for="#" class="text-label text-primary font-semibold">Image</label>
        <Button size="sm" on:click={() => fileInput.click()}>Change</Button>
      </div>
      <div class="flex justify-center sm:justify-start">
        <img src={image} alt="#" class="h-64"/>
      </div>
    {/if}

    <Input label="Quantity" name="quantity" type="number" min="0" value={quantity ?? ''} error={form?.errors?.quantity} />

    <div class="flex justify-end gap-2">
      <Button on:click={() => window.history.back()} variant="ghost">Cancel</Button>
      <Button type="submit">Save</Button>
    </div>
  </div>

  <div id="reader" width="600px"></div>
  <Button on:click={clearScanner} class="w-full {!scanner && 'hidden'}">
    Cancel
  </Button>

</form>
