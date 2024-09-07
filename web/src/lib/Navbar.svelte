<script lang="ts">
    import { goto } from '$app/navigation';

    // Redirect to different pages
    function navigateTo(path: string) {
        goto(path);
    }
</script>

<div class="navbar bg-base-200 w-full shadow-md rounded-b-xl">
    <div class="navbar-start">
        <a class="btn btn-ghost normal-case text-xl" on:click={() => navigateTo('/bets')}>BetApp</a>
    </div>
    <!-- <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
            <li><a on:click={() => navigateTo('/')}>Home</a></li>
            <li><a on:click={() => navigateTo('/messages')}>Messages</a></li>
            <li><a on:click={() => navigateTo('/settings')}>Settings</a></li>
        </ul>
    </div> -->
    <div class="navbar-end">
        <button class="btn btn-primary" on:click={() => navigateTo('/settings')}>Settings</button>
    </div>
</div>
