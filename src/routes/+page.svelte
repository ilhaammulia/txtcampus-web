<script>
    import Header from "$lib/components/Header.svelte";
    import PostCard from "$lib/components/Post/PostCard.svelte";
    import CreatePost from "$lib/components/Post/CreatePost.svelte";
    import PostStat from "$lib/components/Post/PostStat.svelte";
    import Modal from "$lib/components/Modal.svelte";
    import api from "$lib/api.js";
    import { onMount } from 'svelte';
    import {user} from "$lib/stores/user-store.js";

    let userData = $user;
    let posts = [];
    let modalItem;
    let loading = false;
    let selectedItem;
    let avatar = "/images/profile-placeholder.png";

    let page = 1;
    const perPage = 5;

    onMount(() => {
        modalItem = document.getElementById("reply-modal");
        avatar = userData?.profile_photo
            ? `${import.meta.env.VITE_API_URL}/files/${userData.profile_photo}`
            : "/images/profile-placeholder.png";
        fetchData();
    });

    function showModal(item) {
        selectedItem = item;
        HSOverlay.open(modalItem);
    }

    async function fetchData() {
        if (loading) return; // Prevent multiple requests at the same time
        loading = true;

        try {
            const response = await api.get(`/api/posts`, {
                params: {
                    page: page,
                    per_page: perPage,
                }
            });
            const data = response.data.data;
            posts = [...posts, ...data.posts];
            page++;
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
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
    <title>Home | txtcampus</title>
</svelte:head>

<Modal id="reply-modal" title="Reply">
    <div class="border rounded-xl py-4">
        <PostCard post_id={selectedItem?.uuid} user={selectedItem?.user} content={selectedItem?.content} created={selectedItem?.created_at} />
    </div>
    <CreatePost {avatar}>
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

<div class="w-full max-w-3xl mx-auto p-4">
    <!-- Main content wrapper -->
    <div
            id="posts-container"
            class="space-y-6 overflow-y-auto overflow-x-hidden h-screen scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300"
            style="height: calc(100vh - 120px);"
            on:scroll={handleScroll}
    >
        <!-- Create Post Card -->
        <div class="w-full border-b-2 pb-4">
            <CreatePost {avatar}>
                <div class="w-full flex justify-between items-center">
                    <button class="btn btn-primary rounded-full text-white px-6">Post</button>
                </div>
            </CreatePost>
        </div>

        <!-- Render posts -->
        <div class="space-y-4">
            {#each posts as post (post.uuid)}
                <div class="overflow-hidden border-b-2 border-gray-200">
                    <PostCard post_id={post.uuid} user={post.user} content={post.content} created={post.created_at}>
                        <div id="post-stats" class="w-full pb-4">
                            <PostStat stat={post.stats} onreply={() => showModal(post)} />
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

