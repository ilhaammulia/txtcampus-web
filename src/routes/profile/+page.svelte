<script>
    import Header from "$lib/components/Header.svelte";
    import {user, setUser} from "$lib/stores/user-store.js";
    import {updateUser} from "$lib/services/user-service.js";
    import {onMount} from "svelte";

    let userData = $state($user);
    let avatar = $state("/images/profile-placeholder.png");
    let form = $state({
        name: null,
        username: null,
        email_address: null,
        bio: null,
        image: null,
    });
    let error = $state(null);
    let success = $state(null);
    let loading = $state(false);
    let fileInput;

    onMount(() => {
        form = { ...userData, password: null };
        avatar = userData?.profile_photo ? `${import.meta.env.VITE_API_URL}/files/${userData.profile_photo}` : "/images/profile-placeholder.png";
    });

    function handleClickImage() {
        fileInput.click()
    }

    function handleUpload(event) {
        const img = event.target.files[0];
        if (img) {
            form.image = event.target.files[0];
            avatar = URL.createObjectURL(img);
        }
    }

    async function handleSubmit() {
        try {
            loading = true;
            // Use FormData for better file handling
            const data = new FormData();
            data.append("username", form.username);
            data.append("password", form.password);
            data.append("name", form.name);
            data.append("email_address", form.email_address);
            data.append("bio", form.bio);
            if (form.image) {
                data.append("profile_photo", form.image);
            }
            const [status, response] = await updateUser(data);
            if (status) {
                success = "Profile successfully updated!";
                error = null;
                setUser(response.data);
            } else {
                error = response;
                success = false;
            }
        } finally {
            loading = false;
        }
    }
</script>

<svelte:head>
    <title>Edit Profile | txtcampus</title>
</svelte:head>

<Header title="Edit Profile" href="/{userData?.username}" />

<div class="w-auto h-auto px-8">
    <div class="px-4 sm:px-0 mt-8">
        <div class="avatar">
            <div class="size-24 rounded-full">
                <img
                    src={avatar}
                    alt={userData?.name}
                />
            </div>
            <button
                onclick={handleClickImage}
                aria-label="Edit Profile"
                class="bg-primary text-white absolute bottom-1 right-2 flex translate-x-2 translate-y-2 transform items-center rounded-full p-1"
                ><span class="icon-[tabler--pencil] size-6"></span></button>
        </div>
    </div>
    <div class="mt-6 border-t border-base-content/25">
        <input id="input-file" type="file" class="hidden" bind:this={fileInput} onchange={handleUpload} />
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
                        bind:value={form.name}
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
                        bind:value={form.username}
                    />
                </dd>
            </div>
            <div
                    class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base"
            >
                <dt
                        class="font-medium text-base-content/90 inline-flex justify-start items-center"
                >
                    Password
                </dt>
                <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                    <input
                            type="password"
                            placeholder="Input your new password"
                            class="input no-focus border-0"
                            bind:value={form.password}
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
                        bind:value={form.email_address}
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
                        bind:value={form.bio}
                    ></textarea>
                </dd>
            </div>
        </dl>
    </div>
    <p class:hidden={!error} class="text-center text-red-500 text-sm">{ error }</p>
    <p class:hidden={!success} class="text-center text-green-500 text-sm">{ success }</p>
    <div class="mt-6 w-full flex justify-center">
        <button onclick={handleSubmit} class="btn btn-primary rounded-full">Save Profile</button>
    </div>
</div>
