<script>
    let { title = "", href = null, children } = $props();
</script>

<div class="px-4 flex justify-between items-center shadow-md rounded-md h-16">
    <div>
        {#if href != null}
            <a {href} role="button" aria-label="Icon Button"
                ><span class="icon-[tabler--arrow-narrow-left] size-8"
                ></span></a
            >
        {/if}
    </div>
    <span class="font-semibold" class:hidden={!title}>{title}</span>
    <div class="sm:mx-0">
        {#if children}
            {@render children()}
        {/if}
    </div>
</div>
