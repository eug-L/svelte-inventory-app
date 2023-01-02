<script>
  let className = '';

  export { className as class };
  export let as = 'div';
  export let href = '';
  export let alt = '';
  export let hasImage = false;
  export let image = '';
</script>

<svelte:element this={as} class="card w-full sm:w-64 bg-base-100 shadow-xl {className}" {href}>
  {#if hasImage}
    <figure class="h-64">
      <img src="{image || 'https://placeimg.com/400/225/tech/grayscale'}" alt="{alt}" />
    </figure>
  {/if}
  <div class="card-body gap-4">
    <h2 class="card-title">
      <slot name="title"/>
    </h2>
    <div class="class-body">
      <slot name="content" />
    </div>
    <div class="card-actions justify-center">
      <slot name="actions" />
    </div>
    <slot name="extra"/>
  </div>
</svelte:element>
