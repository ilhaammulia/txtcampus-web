<script>
  import '../app.css';
  import {afterNavigate, goto} from "$app/navigation";

  import Sidebar from '$lib/components/Sidebar.svelte';
  import {get} from "svelte/store";
  import {session} from "$lib/stores/session-store.js";
  import {onMount} from "svelte";

  let { children, data } = $props();

  let isAuthPage = $derived(data.currentActive.includes("login") || data.currentActive.includes("register"));

  afterNavigate(() => {
      HSStaticMethods.autoInit();
  });

  onMount(() => {
      const sessionData = get(session);
      if (!sessionData || !sessionData.token) {
          goto("/login");
      }
  })


</script>

<div class="flex justify-center items-start max-w-7xl mx-auto h-screen ">

    {#if !isAuthPage}
        <Sidebar currentActive={data.currentActive} />
        <div class="w-1 h-full bg-gray-100"></div>
    {/if}

    <!-- Main Content Area (scrollable) -->
    <div class="w-full h-full overflow-y-auto">
        {@render children()}
    </div>

    {#if !isAuthPage}
        <div class="w-1 h-full bg-gray-100"></div>

        <!-- Right-side space or content -->
        <div class="hidden lg:block w-1/3"></div>
    {/if}
</div>
