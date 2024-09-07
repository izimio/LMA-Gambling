<script lang='ts'>
    import type { PageData } from './$types';
    import { onMount } from 'svelte';

    import Navbar from '$lib/Navbar.svelte';
    import PieChart from '$lib/PieChart.svelte';

    export let data: PageData;

    let bet = data.bet;

    let choices = bet.choices;
    let votes = bet.votes;

    let gamble: number; // the amount of money the user wants to bet

    let sortedChoices: any[] = [];
    let maxScore = 0;
    let selectedChoices: any[] = [];

    let multiChoicesOptions: any[] = [];
    let uniChoicesOption: number;

    onMount(() => {
        sortedChoices = calculateScores(choices, votes);
        maxScore = (sortedChoices.length - 1) * votes.length;
        const userVote = votes.find(vote => vote.email === localStorage.getItem('email'));
        if (userVote) {
            selectedChoices = userVote.choice;
        } else {
            selectedChoices = choices.map(choice => choice.id);
        }

        uniChoicesOption = userVote ? userVote.choice[0] : choices[0].id;

        // Initialize multiChoicesOptions thanks to selectedChoices
        multiChoicesOptions = selectedChoices.map((choiceId: any) => {
            let choice = choices.find(c => c.id === choiceId);
            return choice;
        });
    });

    function calculateScores(choices: any[], votes: any[]) {
        let scores = choices.map(choice => ({ ...choice, score: 0 }));

        votes.forEach(vote => {
            vote.choice.forEach((choiceId: any, index: number) => {
                let choice = scores.find(c => c.id === choiceId);
                if (choice) {
                    choice.score += (choices.length - index - 1);
                }
            });
        });

        scores.sort((a, b) => b.score - a.score);

        return scores;
    }

    function updateChoicesInDb() {
        // build an array of choice ids
        let choices: number[];
        if (bet.multiChoices) {
            choices = multiChoicesOptions.map(option => option.id);
        } else {
            if (!uniChoicesOption) {
                alert('Please select a choice');
                return;
            }
            choices = [uniChoicesOption];
        }

        if (!gamble) {
            alert('Please enter the amount of money you want to bet');
            return;
        }

        if (gamble < 1000) {
            alert('The minimum amount of money you can bet is 1000 ₩');
            return;
        }

        const data = {
            "choice": choices,
            "gamble": gamble
        };

        console.log('Data:', data);
    }

    function upChoice(id: number) {
        let index = multiChoicesOptions.findIndex(option => option.id === id);
        if (index > 0) {
            let temp = multiChoicesOptions[index];
            multiChoicesOptions[index] = multiChoicesOptions[index - 1];
            multiChoicesOptions[index - 1] = temp;
        }
        const choices = multiChoicesOptions.map(option => option.id);
    }

    function downChoice(id: number) {
        let index = multiChoicesOptions.findIndex(option => option.id === id);
        if (index < multiChoicesOptions.length - 1) {
            let temp = multiChoicesOptions[index];
            multiChoicesOptions[index] = multiChoicesOptions[index + 1];
            multiChoicesOptions[index + 1] = temp;
        }
        const choices = multiChoicesOptions.map(option => option.id);
    }

    function switchChoice(id: number) {
        uniChoicesOption = id;
    }
</script>

<main class="">
    <!-- Navbar -->
    <Navbar />

    <!-- Bet Details Card -->
    <div class="flex flex-col items-center p-8 bg-base-100">
        <div class="card bg-base-200 shadow-xl rounded-lg max-w-4xl w-full p-6">
            <figure>
                <img src={bet.imageUrl} alt={bet.title} class="w-full h-64 object-cover rounded-t-lg"/>
            </figure>
            <div class="card-body">
                <h2 class="card-title text-2xl font-bold">{bet.title}</h2>
                <p class="text-gray-700"><strong>Owner:</strong> {bet.owner}</p>
                <p class="text-gray-700"><strong>Created At:</strong> {new Date(bet.createdAt).toLocaleDateString()}</p>
                <p class="text-gray-700"><strong>Ended:</strong> {bet.ended ? 'Yes' : 'No'}</p>

                <!-- Choices Section -->
                {#if bet.multiChoices}
                    <div class="mt-8">
                        <h3 class="text-xl font-semibold mb-2">Order Your Choices</h3>
                        <div class="flex flex-col space-y-4">
                            {#each multiChoicesOptions as option (option.id)}
                                <div
                                    class="flex items-center space-x-4 bg-base-100 p-2 rounded-lg item"
                                >
                                    <div class="flex flex-col gap-2">
                                        <button class="btn btn-sm" on:click={() => upChoice(option.id)}>▲</button>
                                        <button class="btn btn-sm" on:click={() => downChoice(option.id)}>▼</button>
                                    </div>
                                    <span class="font-semibold">{option.title}</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                {:else}
                    <div class="mt-8">
                        <h3 class="text-xl font-semibold mb-2">Select your choice</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {#each choices as choice}
                                <button
                                    class={`btn ${uniChoicesOption === choice.id ? 'bg-base-100' : 'bg-base-300'}`}
                                    on:click={() => switchChoice(choice.id)}
                                >
                                    {choice.title}
                                </button>
                            {/each}
                        </div>
                    </div>
                {/if}

                <!-- Gamble Section -->
                <div class="mt-8">
                    <h3 class="text-xl font-semibold mb-2">Make your bet (₩)</h3>
                    <input
                        type="number"
                        class="input input-bordered w-full"
                        bind:value={gamble}
                        on:input={(e) => gamble = parseInt(e.target.value)}
                        placeholder="Enter the amount of money you want to bet"
                    />
                </div>

                <!-- Bet Button Section -->
                <div class="mt-8">
                    <button class="btn btn-primary w-full" on:click={() => updateChoicesInDb()}>
                        Bet
                    </button>
                </div>

                <!-- Pie Chart Section -->
                {#if !bet.multiChoices}
                    <div class="mt-8">
                        <h3 class="text-xl font-semibold mb-2">Results</h3>
                        <PieChart {choices} {votes} />
                    </div>
                {:else}
                    <div class="mt-8">
                        <h3 class="text-xl font-semibold mb-2">Results</h3>
                        <div class="flex flex-col space-y-4">
                            {#each sortedChoices as choice (choice.id)}
                                <div class="flex items-center space-x-4">
                                    <!-- Label Section with Fixed Width -->
                                    <span class="font-semibold w-32 overflow-hidden whitespace-nowrap text-overflow-ellipsis" title={choice.title}>
                                        {choice.title}
                                    </span>

                                    <!-- Bar Section with Score -->
                                    <div class="flex-grow bg-gray-200 rounded-full relative h-4">
                                        <div
                                            class="bg-blue-500 h-4 rounded-full"
                                            style={`width: ${maxScore > 0 ? (choice.score / maxScore) * 100 : 0}%`}
                                        ></div>
                                    </div>

                                    <!-- Score Display Section -->
                                    <span class="text-gray-600 ml-4">{choice.score} points</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</main>
