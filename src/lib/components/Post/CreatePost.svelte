<script>
    let { avatar = "/images/profile-placeholder.png", children, value = $bindable('') } = $props();
</script>

<div class="w-full px-8 py-4 flex justify-center items-start gap-4">
    <div id="post-avatar" class="avatar">
        <div class="size-14 rounded-full">
            <img
                src={avatar}
                alt="avatar"
            />
        </div>
    </div>
    <div id="post-content" class="relative flex-grow flex flex-col gap-2">
        <div id="post-data" class="flex-grow min-h-10">
            <textarea
                bind:value={value}
                class="textarea w-full border-none focus:outline-none focus:ring-0 focus:shadow-none"
                aria-label="Textarea"
                placeholder="What's on your mind?"
                maxlength="800"
            ></textarea>
        </div>
        {#if children}
            {@render children()}
        {/if}
    </div>
</div>
