<script>
    import Header from "$lib/components/Header.svelte";
    import PostCard from "$lib/components/Post/PostCard.svelte";
    import PostStat from "$lib/components/Post/PostStat.svelte";

    const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
</script>

<svelte:head>
    <title>Search | txtcampus</title>
</svelte:head>

<Header title="Search" href="/">
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
    <div class="flex justify-center items-center">
        <button
            class="w-full py-4 border-b-2 border-primary text-primary hover:bg-gray-200"
            >Latest</button
        >
        <button class="w-full py-4 border-b-2 hover:bg-gray-200">People</button>
    </div>
    <div class="grid grid-flow-row overflow-y-scroll scroll-smooth mt-8">
        {#each posts as post}
            <PostCard>
                <div id="post-stats" class="w-full">
                    <PostStat onreply={() => console.log("test")} />
                </div>
            </PostCard>
            <div class="divider"></div>
        {/each}
    </div>
</div>
