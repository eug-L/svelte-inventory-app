<script>
  import { enhance } from "$app/forms";
  import toast from 'svelte-french-toast';

  export let form;

  $: alert(form);

  const alert = (form) => {
    if (form?.error) {
      toast.error(form.message);
    }
  }

  import { Button, Heading } from "$lib/components";
</script>

<div class="container mx-auto px-4 mt-32">
  <div class="max-w-md mx-auto text-center p-4">
    <Heading>Login to your account</Heading>
    <form method="POST" action="?/login" class="flex flex-col space-y-2">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input name="email" type="text" placeholder="info@site.com" class="input input-bordered" value={form?.email ?? ''} />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input name="password" type="password" placeholder="****" class="input input-bordered" />
      </div>
      <Button type="submit">
        Login
      </Button>
    </form>
  </div>
</div>
