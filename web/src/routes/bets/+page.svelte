<script lang="ts">
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';

    import BetCard from '$lib/bets/BetCard.svelte';
    import Navbar from '$lib/Navbar.svelte';

    export let data: PageData;

    let bets = data.bets;

    // Redirect to create bet page
    function createBet() {
        goto('/create-bet');
    }
</script>

<main>
    <!-- Navebar -->
    <Navbar />

    <!-- Main Content -->
    <div class="flex-grow flex flex-col space-y-4">
        <!-- Bets Grid -->
         <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-8">
            {#if bets.length > 0}
                {#each bets as bet (bet._id)}
                    <BetCard {bet} />
                {/each}
            {/if}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="card bg-base-200 shadow-md rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
                on:click={() => createBet()}
            >
                <figure>
                    <img
                        src={"/plus.png"}
                        alt="Bet illustration"
                        class="p-24"
                    />
                </figure>
                <div class="card-body p-4">
                    <h2 class="card-title">
                        Create a bet
                    </h2>
                </div>
            </div>
         </div>
    </div>

</main>
