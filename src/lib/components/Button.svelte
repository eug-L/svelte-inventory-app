<script>
  let className = '';

  export { className as class };
  export let size = 'default';
  export let variant = 'primary';
  export let type = 'button';
  export let as = 'button';
  export let href = '';

  const sizes = {
    sm: 'inline-block rounded text-center p-2 disabled:opacity-75',
    default: 'inline-block rounded font-medium text-center py-3 px-6 disabled:opacity-75',
  }

  let variants = {
    primary: `bg-primary text-contrast hover:brightness-110`,
    secondary: `border border-primary/10 bg-contrast text-primary hover:brightness-110`,
  };

</script>

<svelte:element on:click on:keydown this={as} {href} {type} class="{sizes[size]} {variants[variant]} {className}">
  <slot />
</svelte:element>
