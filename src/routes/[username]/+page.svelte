<script>
    import Header from "$lib/Header.svelte";
    import PostCard from "$lib/Post/PostCard.svelte";
    import PostStat from "$lib/Post/PostStat.svelte";

    const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
</script>

<svelte:head>
    <title>Profile | txtcampus</title>
</svelte:head>

<Header title="Profile" href="/" />

<div class="w-auto h-auto">
    <div class="mt-16 px-8 pb-8 border-b-2">
        <div class="flex justify-between items-start">
            <div class="avatar">
                <div class="size-24 rounded-full">
                    <img
                        src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                        alt="avatar"
                    />
                </div>
            </div>
            <div class="mt-4">
                <a
                    href="/profile"
                    class="btn btn-outline btn-secondary rounded-xl"
                    >Edit Profile</a
                >
            </div>
        </div>
        <div class="mt-8">
            <h1 class="text-xl font-bold">Ilham Mulia</h1>
            <h1 class="text-lg text-gray-400">@ilhaammulia</h1>
        </div>
        <div class="mt-4">
            <p>
                A hairdresser in Barcelona made his customers wear Real Madrid
                jersey aprons. 😂 This kind of harmless humor is always good, we
                need to laugh.
            </p>
        </div>
    </div>
    <div class="flex justify-center items-center">
        <button
            class="w-full py-4 border-b-2 border-primary text-primary hover:bg-gray-200"
            >Posts</button
        >
        <button class="w-full py-4 border-b-2 hover:bg-gray-200"
            >Bookmark</button
        >
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
