<script>
    import Header from "$lib/components/Header.svelte";
    import PostCard from "$lib/components/Post/PostCard.svelte";
    import PostStat from "$lib/components/Post/PostStat.svelte";
    import {user} from "$lib/stores/user-store.js";
    import CreatePost from "$lib/components/Post/CreatePost.svelte";
    import Modal from "$lib/components/Modal.svelte";
    import {onMount} from "svelte";
    import {getBookmarks} from "$lib/services/post-service.js";

    let posts = $state([]);
    let userData = $user;
    let modalItem;
    let selectedItem = $state({});
    let avatar = $state("/images/profile-placeholder.png");
    let loading = false;

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

    function closeModal() {
        selectedItem = {};
        HSOverlay.close(modalItem);
    }

    async function fetchData() {
        if (loading) return; // Prevent multiple requests at the same time
        loading = true;

        try {
            const data = await getBookmarks(userData.username, page, perPage);
            posts = [...posts, ...data];
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

    function handleBookmark(post_id) {
        posts = posts.filter(p => p.uuid !== post_id);
    }
</script>

<svelte:head>
    <title>Bookmarks | txtcampus</title>
</svelte:head>

<Header title="Bookmarks" />

<Modal id="reply-modal" title="Reply">
    <div class="border rounded-xl py-4">
        <PostCard post_id={selectedItem?.uuid} user={selectedItem?.user} content={selectedItem?.content} created={selectedItem?.created_at} />
    </div>
    <CreatePost {avatar} reply_to={selectedItem?.uuid} onsubmit={closeModal} />
</Modal>

<div class="w-full max-w-3xl mx-auto p-4">
    <!-- Main content wrapper -->
    <div
            id="posts-container"
            class="space-y-6 overflow-y-auto overflow-x-hidden h-screen scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300"
            style="height: calc(100vh - 120px);"
            onscroll={handleScroll}
    >
        <!-- Render posts -->
        <div class="space-y-4">
            {#each posts as post (post)}
                <div class="overflow-hidden border-b-2 border-gray-200">
                    <PostCard post_id={post.uuid} user={post.user} content={post.content} created={post.created_at}>
                        <div id="post-stats" class="w-full pb-4">
                            <PostStat post_id={post.uuid} stat={post.stats} isUpvoted={post.is_upvoted} isDownvoted={post.is_downvoted} isBookmarked={post.is_bookmarked} onreply={() => showModal(post)} onbookmarked={handleBookmark} />
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
