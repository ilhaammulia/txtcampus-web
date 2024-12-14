<script>
    import { formatNumber } from "$utils";

    let {
        stat = {
            upvotes: 0,
            downvotes: 0,
            replies: 0,
            bookmarks: 0,
        },
        isUpvoted = false,
        isDownvoted = false,
        isBookmarked = false,
        onreply = () => {},
    } = $props();
    

    let upvoteCount = $derived(formatNumber(stat?.upvotes));
    let downvoteCount = $derived(formatNumber(stat?.downvotes));
    let replyCount = $derived(formatNumber(stat?.replies));
    let bookmarkCount = $derived(formatNumber(stat?.bookmarks));
</script>

<div class="w-full flex justify-between items-center">
    <div class="flex items-center gap-6 text-gray-500">
        <div class="flex items-center gap-1">
            <label class="swap cursor-pointer">
                <input type="checkbox" bind:checked={isUpvoted} />
                <span
                    class="swap-on icon-[tabler--arrow-big-up-filled] bg-green-500 size-5"
                ></span>
                <span class="swap-off icon-[tabler--arrow-big-up] size-5"
                ></span>
            </label>
            <span class="text-sm" class:text-green-500={isUpvoted}
                >{upvoteCount}</span
            >
        </div>
        <div class="flex items-center gap-1">
            <label class="swap cursor-pointer">
                <input type="checkbox" bind:checked={isDownvoted} />
                <span
                    class="swap-on icon-[tabler--arrow-big-down-filled] bg-red-500 size-5"
                ></span>
                <span class="swap-off icon-[tabler--arrow-big-down] size-5"
                ></span>
            </label>
            <span class="text-sm" class:text-red-500={isDownvoted}
                >{downvoteCount}</span
            >
        </div>
        <div class="flex items-center gap-2">
            <button
                onclick={onreply}
                class="icon-[tabler--message] size-5 cursor-pointer"
                aria-label="Reply Button"
            ></button>
            <span class="text-sm">{replyCount}</span>
        </div>
    </div>
    <div class="flex items-center gap-1 text-gray-500">
        <label class="swap cursor-pointer">
            <input type="checkbox" bind:checked={isBookmarked} />
            <span
                class="swap-on icon-[tabler--bookmark-filled] bg-yellow-500 size-5"
            ></span>
            <span class="swap-off icon-[tabler--bookmark] size-5"></span>
        </label>
        <span class="text-sm" class:text-yellow-500={isBookmarked}
            >{bookmarkCount}</span
        >
    </div>
</div>
