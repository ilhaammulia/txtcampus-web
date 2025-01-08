<script>
    export const ssr = false;
    let { children } = $props();
</script>


<div class="flex justify-center items-center">
    {@render children()}
</div>
