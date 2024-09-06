<script lang='ts'>
    import Icon from '@iconify/svelte';

    let drawerOpen = false;

    // Function to toggle the drawer
    function toggleDrawer() {
        drawerOpen = !drawerOpen;
    }
</script>

<div class={`bg-base-200 h-full transition-width duration-200 flex flex-col ${drawerOpen ? 'w-48' : 'w-16'}`}>
    <!-- Menu Button -->
    <div class={`flex items-center ${drawerOpen ? "" : "justify-center"} m-4`}>
        <button class="hover:bg-base-300 p-2 rounded-md" on:click={toggleDrawer}>
            <Icon icon="ic:round-menu" class="text-3xl" />
        </button>
    </div>

    <!-- Espace pour pousser le contenu en bas -->
    <div class="flex-grow"></div>

    <!-- Navigation Links -->
    <div class="flex flex-col space-y-4 justify-start items-start px-2">
        <a href="#" class={`btn btn-ghost btn-sm w-full flex items-center ${drawerOpen ? "justify-start" : "justify-center"} space-x-2`}>
            <Icon icon="ic:round-home" class="text-3xl" />
            {#if drawerOpen}
                <span>Home</span>
            {/if}
        </a>
        <a href="#" class={`btn btn-ghost btn-sm w-full flex items-center ${drawerOpen ? "justify-start" : "justify-center"} space-x-2`}>
            <Icon icon="ic:round-message" class="text-3xl" />
            {#if drawerOpen}
                <span>Messages</span>
            {/if}
        </a>
        <a href="#" class={`btn btn-ghost btn-sm w-full flex items-center ${drawerOpen ? "justify-start" : "justify-center"} space-x-2`}>
            <Icon icon="ic:round-settings" class="text-3xl"/>
            {#if drawerOpen}
                <span>Settings</span>
            {/if}
        </a>
    </div>

    <!-- Vertical Divider -->
    <div class="divider mx-2 my-1"></div>

    <!-- Profile Section -->
    <div class="flex flex-col space-y-4 justify-start items-start px-2 mb-4">
        <a href="#" class={`btn btn-ghost btn-sm w-full flex items-center ${drawerOpen ? "justify-start" : "justify-center"} space-x-2`}>
            <Icon icon="ic:round-account-circle" class="text-3xl" />
            {#if drawerOpen}
                <span>Profile</span>
            {/if}
        </a>
    </div>
</div>