<script>
</script>

<svelte:head>
    <title>Login | txtcampus</title>
</svelte:head>

<div class="max-w-md w-full p-8">
    <div class="py-8 px-4 text-center text-3xl font-semibold -space-x-1">
        <span>txt</span>
        <span class="text-orange-500">campus</span>
    </div>
    <div class="flex flex-col gap-4">
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">Username or Email Address</span>
            </div>
            <input
                id="form-username"
                type="text"
                placeholder="Enter username or email"
                class="input"
            />
        </label>
        <label>
            <div class="label">
                <span class="label-text">Password</span>
            </div>
            <div class="input-group w-full">
                <input
                    id="form-password"
                    type="password"
                    class="input"
                    placeholder="Enter password"
                />
                <span class="input-group-text">
                    <button
                        type="button"
                        data-toggle-password={JSON.stringify({
                            target: "#form-password",
                        })}
                        class="block"
                        aria-label="password toggle"
                    >
                        <span
                            class="icon-[tabler--eye] text-base-content/80 password-active:block hidden size-5 flex-shrink-0"
                        ></span>
                        <span
                            class="icon-[tabler--eye-off] text-base-content/80 password-active:hidden block size-5 flex-shrink-0"
                        ></span>
                    </button>
                </span>
            </div>
        </label>
        <div class="mt-4">
            <button
                class="btn bg-orange-500 hover:bg-orange-600 rounded-lg text-white shadow-none w-full"
                >Login</button
            >
        </div>
    </div>
</div>
