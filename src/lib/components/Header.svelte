<script>
  import Menu from 'svelte-material-icons/Menu.svelte';
  import { base } from '$app/paths';
  import { enhance } from '$app/forms';

  import { Heading, Button } from "$lib/components";
  import { header } from "$lib/stores";
</script>

<div class="container mx-auto navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <label tabindex="0" class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
      <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><a href="{base}/items">Items</a></li>
        <li><a href="{base}/category">Categories</a></li>
      </ul>
    </div>
  </div>
  <div class="navbar-center">
    <span class="font-semibold normal-case text-xl">{$header}</span>
  </div>
  <div class="navbar-end">
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="https://placeimg.com/80/80/people" />
        </div>
      </label>
      <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><a href="{base}/profile">Profile</a></li>
        <form method="POST" action="{base}?/logout" use:enhance>
          <li><button type="submit">Logout</button></li>
        </form>
      </ul>
    </div>
  </div>
</div>
