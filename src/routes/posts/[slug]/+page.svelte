<script>
    import Header from "$lib/components/Header.svelte";
    import PostCard from "$lib/components/Post/PostCard.svelte";
    import CreatePost from "$lib/components/Post/CreatePost.svelte";
    import PostStat from "$lib/components/Post/PostStat.svelte";
    import Modal from "$lib/components/Modal.svelte";
    import {user} from "$lib/stores/user-store.js";
    import {onMount} from "svelte";
    import {getPostReplies, getPostsById} from "$lib/services/post-service.js";

    let { data } = $props();
    let modalItem;
    let userData = $state($user);
    let selectedItem = $state({});
    let post = $state({});
    let posts = $state([]);
    let avatar = $state("/images/profile-placeholder.png");
    let loading = false;

    let page = 1;
    const perPage = 5;

    onMount(() => {
        modalItem = document.getElementById("reply-modal");
        avatar = userData?.profile_photo
            ? `${import.meta.env.VITE_API_URL}/files/${userData.profile_photo}`
            : "/images/profile-placeholder.png";
        Promise.all([
            fetchPost(),
            fetchData()
        ]);
    });

    function showModal(item) {
        selectedItem = item;
        HSOverlay.open(modalItem);
    }

    function closeModal() {
        selectedItem = {};
        HSOverlay.close(modalItem);
    }

    async function fetchPost() {
        try {
            const response = await getPostsById(data.postId);
            post = { ...response };
        } finally {
        }
    }

    async function fetchData() {
        if (loading) return; // Prevent multiple requests at the same time
        loading = true;

        try {
            const result = await getPostReplies(data.postId, page, perPage);
            posts = [...posts, ...result];
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

    function addPost(post) {
        posts = [post, ...posts];
    }

</script>

<Modal id="reply-modal" title="Reply">
    <div class="border rounded-xl py-4">
        <PostCard post_id={selectedItem?.uuid} user={selectedItem?.user} content={selectedItem?.content} created={selectedItem?.created_at} />
    </div>
    <CreatePost {avatar} reply_to={selectedItem?.uuid} addPost={addPost} onsubmit={closeModal} />
</Modal>

<Header title="{post?.user?.name || 'User'}'s post" href="/" />

<div class="w-auto h-auto">
    <div class="border-b-2 mt-8 pb-8">
        <PostCard post_id={post?.uuid} user={post?.user} content={post?.content} created={post?.created_at} />
    </div>
    <div class="border-b-2 py-6">
        <div class="max-w-xl mx-auto"><PostStat post_id={post?.uuid} stat={post?.stats} isUpvoted={post?.is_upvoted} isDownvoted={post?.is_downvoted} isBookmarked={post?.is_bookmarked} onreply={() => showModal(post)} /></div>
    </div>
    <!-- Main content wrapper -->
    <div
            id="posts-container"
            class="space-y-6 overflow-y-auto overflow-x-hidden h-screen scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300"
            style="height: calc(100vh - 120px);"
            onscroll={handleScroll}
    >
        <!-- Render posts -->
        <div class="space-y-4">
            <p class="text-gray-500 mt-8 text-center" class:hidden={posts.length > 0}>No Reply Found</p>
            {#each posts as post (post)}
                <div class="overflow-hidden border-b-2 border-gray-200">
                    <PostCard post_id={post.uuid} user={post.user} content={post.content} created={post.created_at}>
                        <div id="post-stats" class="w-full pb-4">
                            <PostStat post_id={post.uuid} stat={post.stats} isUpvoted={post.is_upvoted} isDownvoted={post.is_downvoted} isBookmarked={post.is_bookmarked} onreply={() => showModal(post)} />
                        </div>
                    </PostCard>
                </div>
            {/each}
        </div>
    </div>
</div>
