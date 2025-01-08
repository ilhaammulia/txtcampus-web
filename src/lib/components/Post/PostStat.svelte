<script>
    import { formatNumber } from "$utils";
    import {postVote, bookmarkPost} from "$lib/services/post-service.js";

    let {
        post_id = "",
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
        onbookmarked = () => {},
    } = $props();

    let isLoading = false;

    let upvoteCount = $derived(formatNumber(stat?.upvotes));
    let downvoteCount = $derived(formatNumber(stat?.downvotes));
    let replyCount = $derived(formatNumber(stat?.replies));
    let bookmarkCount = $derived(formatNumber(stat?.bookmarks));

    function handleUpvote(event) {
        handleVote(1)
    }

    function handleDownvote(event) {
        handleVote(-1)
    }

    function handleBookmarked(event) {
        handleBookmark()
    }

    async function handleVote(vote) {
        try {
            isLoading = true;
            const response = await postVote(post_id, vote);
            let upvotes = stat.upvotes;
            let downvotes = stat.downvotes;

            if (response && vote === 1) {
                upvotes = isUpvoted ? stat.upvotes + 1 : stat.upvotes - 1;
                downvotes = stat.downvotes > 0 ? stat.downvotes - 1 : stat.downvotes;
                isDownvoted = false;
            } else if (response && vote === -1) {
                downvotes = isDownvoted ? stat.downvotes + 1 : stat.downvotes - 1;
                upvotes = stat.upvotes > 0 ? stat.upvotes - 1 : stat.upvotes;
                isUpvoted = false;
            }

            stat = {
                ...stat,
                upvotes,
                downvotes
            };
        } finally {
            isLoading = false
        }
    }

    async function handleBookmark() {
        try {
            isLoading = true;
            const response = await bookmarkPost(post_id);
            if (response) {
                stat = {
                    ...stat,
                    bookmarks: isBookmarked ? stat.bookmarks + 1 : stat.bookmarks - 1,
                }
                onbookmarked(post_id)
            }
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="w-full flex justify-between items-center">
    <div class="flex items-center gap-6 text-gray-500">
        <div class="flex items-center gap-1">
            <label class="swap cursor-pointer">
                <input type="checkbox" bind:checked={isUpvoted} onchange={handleUpvote} />
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
                <input type="checkbox" bind:checked={isDownvoted} onchange={handleDownvote} />
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
            <input type="checkbox" bind:checked={isBookmarked} onchange={handleBookmarked} />
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
