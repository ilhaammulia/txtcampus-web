<script>
    import Header from "$lib/Header.svelte";
    import PostCard from "$lib/Post/PostCard.svelte";
    import CreatePost from "$lib/Post/CreatePost.svelte";
    import PostStat from "$lib/Post/PostStat.svelte";
    import Modal from "$lib/Modal.svelte";

    const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let modalItem;

    $effect(() => {
        modalItem = document.getElementById("reply-modal");
    });

    function showModal() {
        HSOverlay.open(modalItem);
    }
</script>

<svelte:head>
    <title>Home | txtcampus</title>
</svelte:head>

<Modal id="reply-modal" title="Reply">
    <div class="border rounded-xl py-4">
        <PostCard />
    </div>
    <CreatePost>
        <div class="w-full flex justify-between items-center">
            <label class="form-control flex items-center gap-0.5">
                <input
                    type="checkbox"
                    class="checkbox checkbox-primary checkbox-sm"
                    checked
                />
                <span class="label cursor-pointer flex-col items-start">
                    <span class="label-text text-sm">Post as official</span>
                </span>
            </label>
            <button class="btn btn-primary rounded-full text-white px-6"
                >Reply</button
            >
        </div>
    </CreatePost>
</Modal>

<Header>
    <form method="GET" action="/search">
        <label class="input-group max-w-sm">
            <span class="input-group-text">
                <span class="icon-[tabler--search] text-base-content/80 size-6"
                ></span>
            </span>
            <input
                type="search"
                name="q"
                class="input input-md grow"
                placeholder="Search"
            />
        </label>
    </form>
</Header>

<div class="w-auto h-auto">
    <div
        id="posts-container"
        class="grid grid-flow-row overflow-y-scroll scroll-smooth"
    >
        <div class="w-full border-b-2">
            <CreatePost>
                <div
                    class="w-full flex justify-between items-center border-t-2 pt-4"
                >
                    <div></div>
                    <button class="btn btn-primary rounded-full text-white px-6"
                        >Post</button
                    >
                </div>
            </CreatePost>
        </div>
        <div class="mt-8">
            {#each posts as post}
                <PostCard>
                    <div id="post-stats" class="w-full">
                        <PostStat onreply={showModal} />
                    </div>
                </PostCard>
                <div class="divider"></div>
            {/each}
        </div>
    </div>
</div>
