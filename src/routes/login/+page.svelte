<script>
    import {goto} from "$app/navigation";
    import { login } from "$lib/services/user-service.js";

    let username, password = "";
    let errMessage = "";
    let isLoading = false;

    async function handleLogin() {
        try {
            isLoading = true;
            const [status, err] = await login(username, password);
            if (status === true) {
                goto("/").then(r => console.debug("login successfully"));
            } else {
                errMessage = err;
            }
        } finally {
            isLoading = false;
        }
    }

</script>

<svelte:head>
    <title>Login | txtcampus</title>
</svelte:head>

<div class="max-w-md w-full p-8">
    <div class="py-8 px-4 text-center text-3xl font-semibold -space-x-1">
        <span>txt</span>
        <span class="text-orange-500">campus</span>
    </div>
    <form on:submit={handleLogin} class="flex flex-col gap-4">
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">Username or Email Address</span>
            </div>
            <input
                    id="form-username"
                    bind:value={username}
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
                        bind:value={password}
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
        {#if errMessage !== ""}
            <span class="text-red-500 text-sm">Login Failed! { errMessage }</span>
        {/if}
        <div class="mt-4">
            <button type="submit"
                    class="btn bg-orange-500 hover:bg-orange-600 rounded-lg text-white shadow-none w-full">{ isLoading ? "Loading..." : "Login" }
            </button>
        </div>
    </form>
</div>
