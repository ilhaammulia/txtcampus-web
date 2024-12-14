<script>
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";
    import {clearSession} from "$lib/stores/session-store.js";

    onMount(() => {
        clearSession();
        goto("/login");
    })

</script>