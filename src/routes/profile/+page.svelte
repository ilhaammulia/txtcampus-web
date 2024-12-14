<script>
    import Header from "$lib/Header.svelte";
    import PostCard from "$lib/Post/PostCard.svelte";
    import PostStat from "$lib/Post/PostStat.svelte";

    const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
</script>

<svelte:head>
    <title>Edit Profile | txtcampus</title>
</svelte:head>

<Header title="Edit Profile" href="/" />

<div class="w-auto h-auto px-8">
    <div class="px-4 sm:px-0 mt-8">
        <div class="avatar">
            <div class="size-24 rounded-full">
                <img
                    src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                    alt="avatar"
                />
            </div>
            <button
                aria-label="Edit Profile"
                class="bg-primary text-white absolute bottom-1 right-2 flex translate-x-2 translate-y-2 transform items-center rounded-full p-1"
                ><span class="icon-[tabler--pencil] size-6"></span></button
            >
        </div>
    </div>
    <div class="mt-6 border-t border-base-content/25">
        <dl class="divide-y divide-base-content/25">
            <div
                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base"
            >
                <dt
                    class="font-medium text-base-content/90 inline-flex justify-start items-center"
                >
                    Name
                </dt>
                <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                    <input
                        type="text"
                        placeholder="Input your name"
                        class="input no-focus border-0"
                        value="Ilham Mulia"
                    />
                </dd>
            </div>
            <div
                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base"
            >
                <dt
                    class="font-medium text-base-content/90 inline-flex justify-start items-center"
                >
                    Username
                </dt>
                <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                    <input
                        type="text"
                        placeholder="Input your username"
                        class="input no-focus border-0"
                        value="ilhammulia"
                    />
                </dd>
            </div>
            <div
                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base"
            >
                <dt
                    class="font-medium text-base-content/90 inline-flex justify-start items-center"
                >
                    Email Address
                </dt>
                <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                    <input
                        type="text"
                        placeholder="Input your enail address"
                        class="input no-focus border-0"
                        value="ilham@gmail.com"
                    />
                </dd>
            </div>
            <div
                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base"
            >
                <dt
                    class="font-medium text-base-content/90 inline-flex justify-start items-center"
                >
                    Bio
                </dt>
                <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                    <textarea
                        class="textarea w-full border-none focus:outline-none focus:ring-0 focus:shadow-none"
                        aria-label="Textarea"
                        placeholder="Bio"
                        maxlength="800"
                    ></textarea>
                </dd>
            </div>
        </dl>
    </div>
    <div class="mt-6 w-full flex justify-center">
        <button class="btn btn-primary rounded-full">Save Profile</button>
    </div>
</div>
