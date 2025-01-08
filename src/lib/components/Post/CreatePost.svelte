<script>
    import {user} from "$lib/stores/user-store.js";
    import {get} from "svelte/store";
    import { createPost } from "$lib/services/post-service.js";

    let { avatar = "/images/profile-placeholder.png", reply_to = null, addPost = (post) => {}, onsubmit = () => {} } = $props();
    const currentUser = get(user);

    let content = $state(null);
    let isAnonym = $state(false);
    let isOfficial = $state(false);

    async function handleCreatePost() {
        if (content) {
            const response = await createPost(content, isAnonym, reply_to, isOfficial);
            if (response.data) {
                addPost(response.data);
            }
        }
        onsubmit();
    }

</script>

<div class="w-full px-8 py-4 flex justify-center items-start gap-4">
    <div id="post-avatar" class="avatar">
        <div class="size-14 rounded-full">
            <img
                src={avatar}
                alt="avatar"
            />
        </div>
    </div>
    <div id="post-content" class="relative flex-grow flex flex-col gap-2">
        <div id="post-data" class="flex-grow min-h-10">
            <textarea
                bind:value={content}
                class="textarea w-full border-none focus:outline-none focus:ring-0 focus:shadow-none"
                aria-label="Textarea"
                placeholder="What's on your mind?"
                maxlength="800"
            ></textarea>
        </div>
        <div class="w-full flex justify-between items-center">
            {#if currentUser?.role === 'user'}
                <label class="form-control flex items-center gap-0.5">
                    <input
                            type="checkbox"
                            class="checkbox checkbox-primary checkbox-sm"
                            bind:checked={isAnonym}
                    />
                    <span class="label cursor-pointer flex-col items-start"><span class="label-text text-sm">Post as anonym</span></span>
                </label>
            {:else}
                <label class="form-control flex items-center gap-0.5">
                    <input
                            type="checkbox"
                            class="checkbox checkbox-primary checkbox-sm"
                            bind:checked={isOfficial}
                    />
                    <span class="label cursor-pointer flex-col items-start"><span class="label-text text-sm">Post as official</span></span>
                </label>
            {/if}
            <button onclick={handleCreatePost} class="ml-auto btn btn-primary rounded-full text-white px-6 w-full max-w-[12rem]">Reply</button>
        </div>
    </div>
</div>
