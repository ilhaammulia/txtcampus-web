<script>
    import { fade } from "svelte/transition";
    import { format, formatDistance, differenceInMonths } from 'date-fns';
    import {user as currentUser} from "$lib/stores/user-store.js";

    let {
        user,
        post_id = "1",
        content = "",
        created = new Date(),
        sentimen = "neutral",
        score = 0,
        children,
    } = $props();
    let userData = $currentUser;

    let avatar = $derived.by(() => {
        if (user?.profile_photo) {
            return String(import.meta.env.VITE_API_URL) + "/files/" + String(user.profile_photo);
        }
        return "/images/profile-placeholder.png";
    });

    let createdAt = $derived.by(() => {
        const now = new Date();
        const monthsDifference = differenceInMonths(now, created);

        if (monthsDifference >= 3) {
            return format(created, 'MMM dd, yyyy');
        } else {
            return formatDistance(created, now) + ' ago';
        }
    })
</script>

<div
    transition:fade={{ duration: 100 }}
    class="relative w-full px-4 sm:px-8 flex justify-center items-start gap-4"
>
    <a href="/" id="post-avatar" class="avatar">
        <div class="size-14 rounded-full">
            <img
                src={avatar}
                alt={user ? user.name : "Hidden User"}
            />
        </div>
    </a>
    <div id="post-content" class="flex-grow flex flex-col gap-2">
        <div id="post-user" class="space-x-1">
            <a href={`/${user?.username}`} disabled={!user?.username} class="font-semibold hover:underline">{user ? user.name : "Hidden User"}</a>
            <a href={`/${user?.username}`} disabled={!user?.username} class="text-gray-400">@{user ? user.username : "hidden" }</a>
            <span
                class="icon-[tabler--circle-filled] size-1 align-middle text-gray-400"
            ></span>
            <span class="text-gray-400">{createdAt}</span>
        </div>
        <div id="post-data" class="flex-grow min-h-10 pr-12">
            <a href="/posts/{post_id}">
                {content}
            </a>
        </div>
        {#if children}
            <div class="pt-2">
                {@render children()}
            </div>
        {/if}
    </div>
    <div class:hidden={userData?.role !== 'admin'} class="absolute top-0 right-6">
        <div
            class={`w-12 h-12 rounded-full border-4 flex justify-center items-center ${
            sentimen === 'positive'
                ? 'border-green-500 text-green-500'
                : sentimen === 'negative'
                ? 'border-red-500 text-red-500'
                : 'border-gray-500 text-gray-500'
        }`}
        >
            <h1 class="font-semibold">{score}</h1>
        </div>
    </div>
</div>
