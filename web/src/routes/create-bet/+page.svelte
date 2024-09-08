<script lang="ts">
    import axios from 'axios';

    import { writable } from 'svelte/store';
    import Navbar from '$lib/Navbar.svelte';

    const apiUrl = import.meta.env.VITE_PUBLIC_API_URL;

    let title = '';
    let imageUrl = '';
    let multiChoices = false;
    let choices = writable<string[]>([]);

    let errorMessage = writable('');

    function addChoice() {
        choices.update(currentChoices => [...currentChoices, '']);
    }

    function removeChoice(index: number) {
        choices.update(currentChoices => currentChoices.filter((_, i) => i !== index));
    }

    function updateChoice(index: number, value: string) {
        choices.update(currentChoices => {
            currentChoices[index] = value;
            return currentChoices;
        });
    }

    async function submitBet() {
        const betData = {
            title,
            imageUrl,
            multiChoices,
            choices: $choices
        };
        // console.log('Bet Data:', betData);

        if (!title) {
            errorMessage.set('Title is required.');
            return;
        } else if (!imageUrl) {
            errorMessage.set('Image URL is required.');
            return;
        } else if ($choices.length < 2) {
            errorMessage.set('At least 2 choices are required.');
            return;
        }

        try {
            const response = await axios.post(
                `${apiUrl}/gambling`,
                betData,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 201) {
                errorMessage.set('');
                title = '';
                imageUrl = '';
                multiChoices = false;
                choices.set([]);
            } else {
                errorMessage.set('Error while creating the bet.');
            }
        } catch (error: any) {
            if (error.response) {
                errorMessage.set(error.response.data.message || 'Erreur lors de la connexion à l\'API.');
            } else if (error.request) {
                errorMessage.set('Aucune réponse du serveur.');
            } else {
                errorMessage.set('Erreur lors de la requête.');
            }
        }
    }
</script>

<main class="">
    <!-- Navbar -->
    <Navbar />

    <!-- Bet Details Card -->
    <div class="flex flex-col items-center p-8 bg-base-100">
        <div class="card bg-base-200 shadow-xl rounded-lg max-w-4xl w-full p-6">
            <div class="card-body">
                <h2 class="card-title text-2xl font-bold">Create a bet</h2>

                <!-- Form -->
                <div class="space-y-4 mt-6">
                    <!-- Title Input -->
                    <div>
                        <label for="bet-title" class="block text-lg font-medium">Bet Title</label>
                        <input
                            id="bet-title"
                            type="text"
                            bind:value={title}
                            class="input input-bordered w-full mt-1"
                            placeholder="Enter bet title" />
                    </div>

                    <!-- Image URL Input -->
                    <div>
                        <label for="image-url" class="block text-lg font-medium">Image URL</label>
                        <input
                            id="image-url"
                            type="url"
                            bind:value={imageUrl}
                            class="input input-bordered w-full mt-1"
                            placeholder="Enter image URL" />
                    </div>

                    <!-- MultiChoice Toggle -->
                    <div class="flex items-center space-x-4">
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label class="text-lg font-medium">Multichoice</label>
                        <input type="checkbox" bind:checked={multiChoices} class="toggle toggle-primary" />
                    </div>

                    <!-- Choices List -->
                    <div class="mt-4">
                        <h3 class="text-lg font-medium">Choices</h3>
                        <div class="mb-2">
                            {#each $choices as choice, index (index)}
                                <div class="flex items-center space-x-2 mb-2 gap-2">
                                    <input
                                        type="text"
                                        class="input input-bordered w-full"
                                        bind:value={choice}
                                        on:input={(e) => updateChoice(index, e.target.value)}
                                        placeholder={`Choice ${index + 1}`}
                                    />
                                    <button
                                        class="btn btn-error btn-sm"
                                        on:click={() => removeChoice(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            {/each}
                        </div>
                        <button class="btn btn-primary btn-sm mt-2" on:click={addChoice}>Add Choice</button>
                    </div>

                    <!-- Submit Button -->
                    <div class="mt-6">
                        <button class="btn w-full btn-success" on:click={submitBet}>Submit Bet</button>
                    </div>

                    {#if $errorMessage}
                        <div class="text-red-500 mt-4">{$errorMessage}</div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</main>
