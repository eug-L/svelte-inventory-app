<script>
  let className = '';

  export let size = 'default';
  export { className as class };

  const sizes = {
    lead: 'text-lead font-medium',
    default: 'text-copy',
    fine: 'text-fine subpixel-antialiased',
  };

</script>

<span class="{sizes[size]} {className}">
  <slot />
</span>

