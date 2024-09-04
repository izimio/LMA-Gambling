<script lang='ts'>
    function handleGoogleConnexion() {
        console.log('Connexion avec Google');
    }
</script>

<main>
    <div class="grid h-screen place-items-center bg-base-200">
        <div class="flex flex-col items-center space-y-8">
            <h1 class="text-5xl font-bold mb-12 text-center text-gray-800">Connexion</h1>
            <div class="card w-full max-w-md bg-base-100 shadow-2xl rounded-lg">
                <div class="card-body flex flex-col items-center space-y-6 p-8">
                    <button
                        class="btn btn-outline btn-accent w-full max-w-xs flex items-center justify-center space-x-4 transition duration-150 ease-in-out hover:bg-accent hover:text-white"
                        on:click={handleGoogleConnexion}
                    >
                        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google Logo" class="w-6 h-6"/>
                        <span class="font-medium">Connexion avec Google</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</main>
