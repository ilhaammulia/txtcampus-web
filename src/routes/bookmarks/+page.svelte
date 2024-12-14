<script>
    import Header from "$lib/Header.svelte";
    import PostCard from "$lib/Post/PostCard.svelte";
    import PostStat from "$lib/Post/PostStat.svelte";
    import Modal from "$lib/Modal.svelte";
    import CreatePost from "$lib/Post/CreatePost.svelte";

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
    <title>Bookmarks | txtcampus</title>
</svelte:head>

<Header title="Bookmarks" />

<div class="w-auto h-auto">
    <div class="grid grid-flow-row overflow-y-scroll mt-8">
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
