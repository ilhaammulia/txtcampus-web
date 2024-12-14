<script>
    import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
    <title>Moderator | txtcampus</title>
</svelte:head>

<Header title="Moderator" />

<div class="w-auto h-auto p-8">
    <div class="card mt-8">
        <div class="card-body">
            <div class="flex justify-between items-center">
                <div
                    class="text-base-content/90 p-5 text-left text-lg font-semibold rtl:text-right"
                >
                    Moderator
                    <p class="text-base-content/80 mt-1 text-sm font-normal">
                        Manage your moderator here
                    </p>
                </div>
                <label class="input-group max-w-sm w-2/3 sm:w-1/3">
                    <span class="input-group-text">
                        <span
                            class="icon-[tabler--search] text-base-content/80 size-6"
                        ></span>
                    </span>
                    <input
                        type="search"
                        name="q"
                        class="input input-md grow"
                        placeholder="Search user"
                    />
                </label>
            </div>
            <div class="w-full rounded-lg border">
                <div class="overflow-x-auto">
                    <table class="table rounded">
                        <thead>
                            <tr class="text-center">
                                <th>No</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center">
                                <td class="text-nowrap text-sm">1</td>
                                <td class="text-sm">@ilhammulia</td>
                                <td
                                    ><span
                                        class="badge badge-soft badge-primary text-xs"
                                        >User</span
                                    ></td
                                >
                                <td>
                                    <button
                                        class="btn btn-success btn-xs text-xs"
                                        >Assign as Admin</button
                                    >
                                </td>
                            </tr>
                            <tr class="text-center">
                                <td class="text-nowrap text-sm">2</td>
                                <td class="text-sm">@emanguser</td>
                                <td
                                    ><span
                                        class="badge badge-soft badge-success text-xs"
                                        >Admin</span
                                    ></td
                                >
                                <td>
                                    <button class="btn btn-error btn-xs text-xs"
                                        >Remove Admin</button
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
