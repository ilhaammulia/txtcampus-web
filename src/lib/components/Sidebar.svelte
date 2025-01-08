<script>
    import {user} from "$lib/stores/user-store.js";
    let { currentActive = "", } = $props();

    let userData = $user;

</script>

<!-- Sidebar Menu -->
<div
    class="hidden sm:flex w-1/3 top-0 h-full max-h-screen overflow-y-auto flex-col flex-grow"
>
    <div class="py-8 px-4 text-center text-2xl font-semibold -space-x-1">
        <span>txt</span>
        <span class="text-orange-500">campus</span>
    </div>
    <ul class="menu menu-xl gap-4">
        <li>
            <a
                href="/"
                class="bg-orange-500 hover:bg-orange-600 rounded-full text-white"
            >
                <span class="icon-[tabler--plus] size-8"></span>
                Post
            </a>
        </li>
        <li>
            <a href="/" class:active={currentActive === ""}>
                <span class="icon-[tabler--home] size-8"></span>
                Home
            </a>
        </li>
        <li>
            <a href="/bookmarks" class:active={currentActive === "bookmarks"}>
                <span class="icon-[tabler--bookmark] size-8"></span>
                Bookmark
            </a>
        </li>
        <li>
            <a href="/{userData?.username}" class:active={currentActive === userData?.username}>
                <span class="icon-[tabler--user] size-8"></span>
                Profile
            </a>
        </li>
        <li>
            <a href="/moderators" class:active={currentActive === "moderators"}>
                <span class="icon-[tabler--users-group] size-8"></span>
                Moderator
            </a>
        </li>
        <li class="">
            <a href="/logout" class="text-red-400">
                <span class="icon-[tabler--logout] size-8"></span>
                Logout
            </a>
        </li>
    </ul>
</div>
