<script>
  let className = '';

  export let size = 'heading';
  export { className as class };

  const sizes = {
    heading: 'font-bold text-heading',
    subheading: 'font-bold text-subheading',
  };

</script>

<h2 class="{sizes[size]} {className}">
  <slot />
</h2>

