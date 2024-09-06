<script lang='ts'>
    import { goto } from '$app/navigation';
    import type { IGambling } from './bet';
    import { onMount } from 'svelte';

    export let bet: IGambling;
    let email: string | null = null;

    onMount(() => {
        email = localStorage.getItem('email');
    });

    // Redirect to bet details page
    function goToBet(id: string) {
        goto(`/bet/${id}`);
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="card bg-base-200 shadow-md rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
    on:click={() => goToBet(bet._id)}
    >
    <figure>
        <img
            src={bet.imageUrl}
            alt="Bet illustration" />
    </figure>
    <div class="card-body p-4">
        <div class="flex gap-2">
            {#if new Date(bet.createdAt).getTime() > new Date().getTime() - 3 * 24 * 60 * 60 * 1000}
                <div class="badge badge-secondary">NEW</div>
            {/if}
            {#if bet.votes.some(vote => vote.email === email)}
                <div class="badge badge-primary">VOTED</div>
            {:else}
                <div class="badge badge-accent">NOT VOTED</div>
            {/if}
        </div>
        <h2 class="card-title">
            {bet.title}
        </h2>
        <p>
            Start Date: {new Date(bet.createdAt).toLocaleDateString()}
        </p>
        <p>
            {bet.owner}
        </p>
    </div>
</div>
