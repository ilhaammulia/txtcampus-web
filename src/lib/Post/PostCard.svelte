<script>
    import { fade } from "svelte/transition";
    import { formatDistance } from 'date-fns';

    let {
        user,
        avatar = "/images/profile-placeholder.png",
        post_id = "1",
        content = "",
        created = new Date(),
        sentimen,
        score,
        children,
    } = $props();

    let createdAt = $derived.by(() => {
      const now = new Date();
      return formatDistance(created, now);
    })
</script>

<div
    transition:fade
    class="relative w-full px-4 sm:px-8 flex justify-center items-start gap-4"
>
    <a href="/" id="post-avatar" class="avatar">
        <div class="size-14 rounded-full">
            <img
                src={avatar}
                alt="avatar"
            />
        </div>
    </a>
    <div id="post-content" class="flex-grow flex flex-col gap-2">
        <div id="post-user" class="space-x-1">
            <a href="/" class="font-semibold hover:underline">Ilham Mulia</a>
            <a href="/" class="text-gray-400">@ilhammulia</a>
            <span
                class="icon-[tabler--circle-filled] size-1 align-middle text-gray-400"
            ></span>
            <span class="text-gray-400">{createdAt}</span>
        </div>
        <div id="post-data" class="flex-grow min-h-10 pr-12">
            <a href="/posts/{post_id}">
                Twitter please do your magic!<br>
                <br>
                Guys, ini ibuku ketipu 😭 Ibuku punya usaha catering. Ibuku dapet orderan fiktif 😭 nasi box 120 kotak.. ternyata pemesannya penipu..
                Yang berminat beli nasi kotaknya ibuku daerah sleman jogja boleh banget ya DM aku..
            </a>
        </div>
        {#if children}
            <div class="pt-2">
                {@render children()}
            </div>
        {/if}
    </div>
    <div class:hidden={!sentimen} class="absolute top-0 right-6">
        <div
            class="w-12 h-12 rounded-full border-4 border-green-500 text-green-500 flex justify-center items-center"
        >
            <h1 class="font-semibold">8.9</h1>
        </div>
    </div>
</div>
