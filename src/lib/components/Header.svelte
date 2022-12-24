<script>
  import Menu from 'svelte-material-icons/Menu.svelte';

  import { Heading, Button } from "$lib/components";
  import { header } from "$lib/stores";
</script>

<header class="bg-primary text-contrast">
  <div class="container mx-auto">
    <div class="flex gap-2 items-center px-4 lg:px-8 h-16 lg:h-20">
      <Button size="sm">
        <Menu size="1.5rem"/>
      </Button>
      <Heading size="subheading" class="py-4">{$header}</Heading>
    </div>
  </div>
</header>
