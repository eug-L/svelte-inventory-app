<script>
  import { onMount } from "svelte";
  import {Html5QrcodeScanner} from "html5-qrcode"

  import { Button, Input, Select } from "$lib/components";
  import { header } from "$lib/stores";

  /** @type {import('./$types').PageData} */
  export let data;
  export let form;
  console.log(form);

  let barcode = '';
  let name = '';
  let expiry_date = '';
  let inventory = '';
  let scanner = undefined;

  $: restoreForm(form);

  function restoreForm(form) {
    if (form?.data) {
      barcode = form?.data.barcode ?? '';
      name = form?.data.name ?? '';
      expiry_date = form?.data.expiry_date ?? '';
      inventory = form?.data.inventory ?? '';
    }
  }

  function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    barcode = decodedText;
    if (scanner) {
      scanner.clear();
      scanner = undefined;
    }
  }

  function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
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

  onMount(() => {
    header.update(() => "New Item");
  });

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
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    scanner = html5QrcodeScanner;
  }
</script>

<form method="POST" enctype="multipart/form-data">
  <div>
    {#each data.items as item}
      <p>{item.name}</p>
    {/each}
  </div>
  <div class="my-6 grid gap-6">
    {#if !scanner}
      <label for="barcode" class="text-label text-primary font-semibold">Barcode</label>
      <Input readonly={true} name="barcode" bind:value={barcode} error={form?.errors?.barcode} />
      <Button on:click={startScanner}>
        {#if barcode !== ''}
          Scan Again
        {:else}
          Scan
        {/if}
      </Button>

      <Input label="Name" name="name" bind:value={name} error={form?.errors?.name} />

      <Input label="Expiry date" name="expiry_date" bind:value={expiry_date} type="date" error={form?.errors?.expiry_date} />

      <Input label="Image" name="image" type="file" accept="image/*" capture="environment" error={form?.errors?.image} />

      {#if data.inventories?.length > 0}
        <Select label="Inventory" name="inventory" bind:value={inventory} options={data.inventories} error={form?.errors?.inventory} />
      {/if}

      <div class="flex justify-end gap-2">
        <Button on:click={() => window.history.back()} variant="secondary">Cancel</Button>
        <Button type="submit">Create</Button>
      </div>
    {/if}

    <div id="reader" width="600px"></div>
  </div>
</form>
