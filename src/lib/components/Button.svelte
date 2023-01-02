<script>
  let className = '';

  export { className as class };
  export let size = 'default';
  export let variant = 'primary';
  export let type = 'button';
  export let as = 'button';
  export let href = '';
  export let outline = false;

  const sizes = {
    default: '',
    sm: 'btn-sm',
  }

  let variants = {
    primary: 'btn btn-primary hover:brightness-110',
    ghost: 'btn btn-ghost',
    secondary: `border border-primary/10 bg-contrast text-primary hover:brightness-110`,
    danger: 'btn btn-error',
  };

</script>

<svelte:element on:click on:keydown this={as} {href} {type} class="flex items-center justify-center gap-1 {sizes[size]} {variants[variant]} {className} {outline && 'btn-outline'}">
  <slot />
</svelte:element>
