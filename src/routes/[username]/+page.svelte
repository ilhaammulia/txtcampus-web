<script>
    import Header from "$lib/components/Header.svelte";
    import PostCard from "$lib/components/Post/PostCard.svelte";
    import PostStat from "$lib/components/Post/PostStat.svelte";
    import CreatePost from "$lib/components/Post/CreatePost.svelte";
    import Modal from "$lib/components/Modal.svelte";
    import {user} from "$lib/stores/user-store.js";
    import {onMount} from "svelte";
    import {getUser} from "$lib/services/user-service.js";
    import {getBookmarks, getPostsByUser} from "$lib/services/post-service.js";

    let { data } = $props();

    let currentUser = $user;
    let userData = $state($user);
    let currentTab = $state("posts");
    let avatar = $state("/images/profile-placeholder.png");
    let selectedItem = $state({});
    let posts = $state([]);
    let loading = false;

    let page = 1;
    const perPage = 5;

    onMount(() => {
        loadData();
    })

    $effect(() => {
        const slug = data.username;
        loadData();
    })

    async function loadData() {
        posts = [];
        page = 1;
        if (data.username !== userData.username) {
            const response = await getUser(data.username);
            userData = { ...response };
        }
        avatar = userData?.profile_photo ? `${import.meta.env.VITE_API_URL}/files/${userData.profile_photo}` : "/images/profile-placeholder.png";
        fetchData();
    }

    function switchTab(tab) {
        currentTab = tab;
        posts = [];
        page = 1;
        fetchData();
    }

    function showModal(item) {
        selectedItem = item;
        HSOverlay.open(modalItem);
    }

    function closeModal() {
        selectedItem = {};
        HSOverlay.close(modalItem);
    }

    async function fetchData() {
        if (loading) return; // Prevent multiple requests at the same time
        loading = true;

        try {
            let data = [];
            if (currentTab === 'posts') {
                data = await getPostsByUser(userData?.username, page, perPage);
            } else {
                data = await getBookmarks(userData?.username, page, perPage);
            }

            posts = [...posts, ...data];
            page++;
        }  finally {
            loading = false;
        }
    }

    function handleScroll(event) {
        const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
        if (bottom && !loading) {
            fetchData();
        }
    }
</script>

<svelte:head>
    <title>Profile | txtcampus</title>
</svelte:head>

<Header title="Profile" href="/" />

<Modal id="reply-modal" title="Reply">
    <div class="border rounded-xl py-4">
        <PostCard post_id={selectedItem?.uuid} user={selectedItem?.user} content={selectedItem?.content} created={selectedItem?.created_at} />
    </div>
    <CreatePost {avatar} reply_to={selectedItem?.uuid} onsubmit={closeModal} />
</Modal>

<div class="w-auto h-auto">
    <div class="mt-16 px-8 pb-8 border-b-2">
        <div class="flex justify-between items-start">
            <div class="avatar">
                <div class="size-24 rounded-full">
                    <img
                        src={avatar}
                        alt="avatar"
                    />
                </div>
            </div>
            <div class:hidden={currentUser?.username !== data.username} class="mt-4">
                <a
                    href="/profile"
                    class="btn btn-outline btn-secondary rounded-xl"
                    >Edit Profile</a
                >
            </div>
        </div>
        <div class="mt-8">
            <h1 class="text-xl font-bold">{ userData?.name }</h1>
            <h1 class="text-lg text-gray-400">@{ userData?.username }</h1>
        </div>
        <div class="mt-4">
            <p>
                { userData?.bio || "No bio yet" }
            </p>
        </div>
    </div>
    <div class="flex justify-center items-center">
        <button
            class={currentTab === 'posts' ? 'w-full py-4 border-b-2 border-primary text-primary hover:bg-gray-200' : 'w-full py-4 border-b-2 hover:bg-gray-200'}
            onclick={() => switchTab('posts')}
            >Posts</button
        >
        <button class:hidden={currentUser?.username !== data.username} onclick={() => switchTab('bookmarks')} class={currentTab === 'bookmarks' ? 'w-full py-4 border-b-2 border-primary text-primary hover:bg-gray-200' : 'w-full py-4 border-b-2 hover:bg-gray-200'}
            >Bookmark</button
        >
    </div>
    <div
            id="posts-container"
            class="space-y-6 overflow-y-auto overflow-x-hidden h-screen scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300"
            style="height: calc(100vh - 120px);"
            onscroll={handleScroll}
    >
        <!-- Render posts -->
        <div class="space-y-4">
            <p class="text-center w-full mt-8 text-gray-400" class:hidden={posts.length > 0}>Not Found</p>
            {#each posts as post (post)}
                <div class="overflow-hidden border-b-2 border-gray-200">
                    <PostCard post_id={post.uuid} user={post.user} content={post.content} created={post.created_at} sentimen={post.sentimen} score={post.sentimen_score}>
                        <div id="post-stats" class="w-full pb-4">
                            <PostStat post_id={post.uuid} stat={post.stats} isUpvoted={post.is_upvoted} isDownvoted={post.is_downvoted} isBookmarked={post.is_bookmarked} onreply={() => showModal(post)} />
                        </div>
                    </PostCard>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    #posts-container {
        max-height: calc(100vh - 120px);  /* Adjust height */
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: rgba(0, 0, 0, 0.2) rgba(255, 255, 255, 0.5);
    }

</style>
