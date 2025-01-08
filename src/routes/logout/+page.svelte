<script>
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";
    import {logout} from "$lib/services/user-service.js";

    onMount(() => {
        logout();
        goto("/login");
    })

</script>