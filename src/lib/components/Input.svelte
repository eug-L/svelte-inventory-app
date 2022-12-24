<script>
  export let label = undefined;
  export let name = undefined;
  export let type = 'text';
  export let value = '';
  export let accept = undefined;
  export let capture = undefined;
  export let readonly = false;
  export let disabled = false;

  const onInput = (e) => {
    value = e.target?.value || ''
  }
</script>

<div>
  {#if label}
    <label for={name} class="text-label text-primary font-semibold">{label}</label>
  {/if}
  {#if type == 'file'}
    <input type="file" {accept} {capture} {name} {value} class="bg-transparent rounded px-2 py-2 w-full focus:ring-0 border-x-0 border-t-0 transition border-b-2 border-primary/10 focus:border-primary/90 focus:outline-none"/>
  {:else}
    <input {type} {name} {value} {readonly} {disabled} on:input|self={onInput} class="bg-transparent rounded px-2 py-2 w-full focus:ring-0 border-x-0 border-t-0 transition border-b-2 border-primary/10 focus:border-primary/90 focus:outline-none"/>
  {/if}
</div>
