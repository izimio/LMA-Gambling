<script lang="ts">
    import axios from 'axios';
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';

    let email = '';
    let verificationCode = '';
    let emailSent = writable(false);
    let errorMessage = writable('');

    async function handleSubmit(event: Event) {
        event.preventDefault();
        if (!$emailSent) {
            // test
            emailSent.set(true);
            return;

            // Envoyer l'e-mail
            try {
                const response = await axios.post('http://localhost:3000/connexion', {
                    email: email
                });

                if (response.status === 200) {
                    emailSent.set(true);
                } else {
                    errorMessage.set(response.data.message || 'Erreur lors de l\'envoi de l\'e-mail.');
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
        } else {
            // set a test value for the cookie "token"
            document.cookie = 'token=123456; path=/';

            // redirect to /dashboard
            goto('/dashboard');
            return;

            // Envoyer le code de vérification
            try {
                const response = await axios.post('http://localhost:3000/verifier-code', {
                    email: email,
                    code: verificationCode
                });

                if (response.status === 200) {
                    // Authentification réussie, faire quelque chose...
                } else {
                    errorMessage.set(response.data.message || 'Code de vérification incorrect.');
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
    }
</script>

<main>
    <div class="grid h-screen place-items-center bg-base-200">
        <div class="flex flex-col items-center space-y-8 w-96">
            <h1 class="text-5xl font-bold mb-12 text-center text-gray-800">Connexion</h1>
            <div class="card w-full max-w-xl bg-base-100 shadow-2xl rounded-lg">
                <div class="card-body flex flex-col items-center space-y-6 p-8">
                    <form on:submit={handleSubmit} class="w-full">
                        <div class="form-control w-full space-y-4">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Votre adresse mail"
                                class="input input-bordered w-full text-lg py-3 px-4 rounded-lg"
                                bind:value={email}
                                required
                                disabled={$emailSent}
                            >

                            {#if $emailSent}
                                <input
                                    type="text"
                                    id="code"
                                    name="code"
                                    placeholder="Code de vérification"
                                    maxlength="6"
                                    class="input input-bordered w-full text-lg py-3 px-4 rounded-lg mt-4"
                                    bind:value={verificationCode}
                                    required
                                >
                            {/if}

                            <button
                                type="submit"
                                class="btn btn-outline btn-accent w-full max-w-xs flex items-center justify-center space-x-4 transition duration-150 ease-in-out hover:bg-accent hover:text-white mt-4 py-3 px-4 rounded-lg"
                            >
                                <span class="font-medium">
                                    {$emailSent ? 'Vérifier le code' : 'Envoyer le code'}
                                </span>
                            </button>
                        </div>
                    </form>
                    {#if $errorMessage}
                        <div class="text-red-500 mt-4">{$errorMessage}</div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</main>
