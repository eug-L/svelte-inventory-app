<script>
  import { onMount } from "svelte";
  import {Html5QrcodeScanner} from "html5-qrcode"

  import { Button, Input, Select } from "$lib/components";
  import { header } from "$lib/stores";

  /** @type {import('./$types').PageData} */
  export let data;

  let name = '';
  let inventory_id = '';
  let expiry_date = '';
  let barcode = '';
  let scanner = undefined;

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
    if (data.id) {
      inventory_id = data.id
    }
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

<form method="POST">
  <div class="my-6 grid gap-6">
    {#if !scanner}
      <label for="barcode" class="text-label text-primary font-semibold">Barcode</label>
      {#if barcode !== ''}
        <Input readonly={true} name="barcode" bind:value={barcode} />
      {/if}
      <Button on:click={startScanner}>
        {#if barcode !== ''}
          Scan Again
        {:else}
          Scan
        {/if}
      </Button>

      <Input label="Name" name="name" bind:value={name} />

      <Input label="Expiry date" name="expiry_date" bind:value={expiry_date} type="date" />

      <Input label="Image" name="image" type="file" accept="image/*" capture="environment" />

      {#if data.inventories?.length > 0}
        <Select label="Inventory" name="inventory" options={data.inventories} />
      {/if}

      <div class="flex justify-end gap-2">
        <Button on:click={() => window.history.back()} variant="secondary">Cancel</Button>
        <Button type="submit">Create</Button>
      </div>
    {/if}

    <div id="reader" width="600px"></div>
  </div>
</form>
