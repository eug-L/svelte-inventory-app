<script>
  import {Html5QrcodeScanner} from "html5-qrcode";
  import { enhance, applyAction } from '$app/forms';
  import toast, { Toaster } from 'svelte-french-toast';
  import { base } from '$app/paths';

  import { Button, Input, Select } from "$lib/components";
  import { header } from "$lib/stores";

  header.set("New Item");

  /** @type {import('./$types').PageData} */
  export let data;
  export let form;

  let barcode = '';
  let scanner = undefined;
  let image = '';
  let fileInput;

  $: formUpdate(form);

  function formUpdate(form) {
    if (form?.errors?.server) {
      toast.error(form.errors.server)
    }

    barcode = form?.data?.barcode ?? '';
  }

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

<form method="POST" action="{base}/items?/create" enctype="multipart/form-data" use:enhance={({ form }) => {
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

    <Input label="Name" name="name" value={form?.data?.name ?? ''} error={form?.errors?.name} />

    <Input label="Expiry date" name="expiry_date" value={form?.data?.expiry_date ?? ''} type="date" error={form?.errors?.expiry_date} />

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

    <!-- {#if data.inventories?.length > 0} -->
    <!--   <Select label="Inventory" name="inventory" value={form?.data?.inventory ?? ''} options={data.inventories} error={form?.errors?.inventory} /> -->
    <!-- {/if} -->

    <Input label="Quantity" name="quantity" type="number" min="0" value={form?.data?.quantity ?? ''} error={form?.errors?.quantity} />

    <div class="flex justify-end gap-2">
      <Button on:click={() => window.history.back()} variant="ghost">Cancel</Button>
      <Button type="submit">Create</Button>
    </div>
  </div>

  <div id="reader" width="600px"></div>
  <Button on:click={clearScanner} class="w-full {!scanner && 'hidden'}">
    Cancel
  </Button>

  <Toaster />

</form>
