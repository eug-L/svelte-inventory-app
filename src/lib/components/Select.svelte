<script>
  export let label = undefined;
  export let name = undefined;
  export let options = [];
</script>

<div>
  {#if label != ''}
    <label for={name} class="text-label text-primary font-semibold">{label}</label>
  {/if}
  <select {name} class="bg-transparent rounded px-2 py-2 w-full focus:ring-0 border-x-0 border-t-0 transition border-b-2 border-primary/10 focus:border-primary/90" >
    {#each options as option}
      <option value="{option.value}">{option.name}</option>
    {/each}
  </select>
</div>
