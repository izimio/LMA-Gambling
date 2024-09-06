<script lang="ts">
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';

    import BetCard from '$lib/bets/BetCard.svelte';
    import Drawer from '$lib/Drawer.svelte';

    export let data: PageData;

    let bets = data.bets;

    // Redirect to create bet page
    function createBet() {
        goto('/create-bet');
    }
</script>

<main class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <Drawer />

    <!-- Main Content -->
    <div class="flex-grow flex flex-col p-8 space-y-4 mt-4">
        <!-- Bets Grid -->
         <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {#each bets as bet (bet._id)}
                <BetCard {bet} />
            {/each}
         </div>
    </div>

</main>
