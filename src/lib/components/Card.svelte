<script>
  let className = '';

  export { className as class };
  export let as = 'div';
  export let href = '';
</script>

<svelte:element this={as} class="p-4 border rounded-md shadow-lg {className}" {href}>
  <slot />
</svelte:element>
