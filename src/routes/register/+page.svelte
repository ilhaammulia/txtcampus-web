<script>
    import {goto} from "$app/navigation";
    import { register } from "$lib/services/user-service.js";

    let form = $state({
        username: null,
        password: null,
        email_address: null,
        name: null,
    })
    let errMessage = $state(null);
    let isLoading = false;

    async function handleRegister() {
        try {
            isLoading = true;
            const [status, err] = await register(form.username, form.password, form.email_address, form.name);
            if (status === true) {
                goto("/login").then(r => console.debug("register successfully"));
            } else {
                errMessage = err;
            }
        } finally {
            isLoading = false;
        }
    }

</script>

<svelte:head>
    <title>Register | txtcampus</title>
</svelte:head>

<div class="max-w-md w-full p-8">
    <div class="py-8 px-4 text-center text-3xl font-semibold -space-x-1">
        <span>txt</span>
        <span class="text-orange-500">campus</span>
    </div>
    <form onsubmit={handleRegister} class="flex flex-col gap-4">
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">Full Name</span>
            </div>
            <input
                    id="form-name"
                    bind:value={form.name}
                    type="text"
                    placeholder="Enter your name"
                    class="input"
            />
        </label>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">Username</span>
            </div>
            <input
                    id="form-username"
                    bind:value={form.username}
                    type="text"
                    placeholder="Enter username"
                    class="input"
            />
        </label>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text">Email Address</span>
            </div>
            <input
                    id="form-username"
                    bind:value={form.email_address}
                    type="email"
                    placeholder="Enter email address"
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
                        bind:value={form.password}
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
        <span class:hidden={!errMessage} class="text-red-500 text-sm">Register Failed! { errMessage }</span>
        <div class="mt-4">
            <button type="submit"
                    class="btn bg-orange-500 hover:bg-orange-600 rounded-lg text-white shadow-none w-full">{ isLoading ? "Loading..." : "Login" }
            </button>
        </div>
    </form>
</div>
