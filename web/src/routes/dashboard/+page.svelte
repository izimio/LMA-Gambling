<script lang="ts">
    import Icon from '@iconify/svelte';

    import ContactList from '$lib/ContactList.svelte';
    import ContactCard from '$lib/ContactCard.svelte';

    export let data: {contacts: {id: string, name: string, phone: string}[]};

    let drawerOpen = false;
    let selectedContact: null | {id: string, name: string, phone: string} = null;
    let messages: {content: string}[] = [];
    let loadingMessages = false;
    let errorLoadingMessages = '';

    function toggleDrawer() {
        drawerOpen = !drawerOpen;
    }

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function selectContact(contact: {id: string, name: string, phone: string}) {
        selectedContact = contact;
        messages = [];
        loadingMessages = true;
        errorLoadingMessages = '';

        try {
            // const response = await fetch(`/api/messages/${contact.id}`);
            // if (!response.ok) {
            //     throw new Error('Failed to load messages');
            // }
            // messages = await response.json();

            messages = contact.id === '1' ? [
                { content: "Salut, comment vas-tu ?" },
                { content: "Je vais bien, merci ! Et toi ?" }
            ] : contact.id === '2' ? [
                { content: "Bonjour !" },
                { content: "Salut ! Comment ça va ?" }
            ] : contact.id === '3' ? [
                { content: "Hey !" },
                { content: "Salut, comment vas-tu ?" }
            ] : [];
        } catch (error: any) {
            errorLoadingMessages = error.message;
        } finally {
            loadingMessages = false;
        }
    }
</script>

<main class="flex h-screen overflow-hidden">
    <!-- Drawer -->
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
                    <span>Home</span>
                {/if}
            </a>
        </div>
    </div>


    <!-- Main Content -->
    <div class="flex-grow flex">
      <!-- Contacts List -->
        <div class="w-1/3 bg-base-100 border-r border-base-300 p-4 overflow-y-auto">
            <h2 class="text-lg font-semibold mb-4">Contacts</h2>
            <ContactList>
                {#each data.contacts as contact}
                    <ContactCard name={contact.name} phone={contact.phone} onClick={() => selectContact(contact)}/>
                {/each}
            </ContactList>
        </div>

        <div class="w-2/3 bg-base-100 p-4 overflow-y-auto relative">
            {#if selectedContact}
                <h2 class="text-lg font-semibold mb-4">{selectedContact.name}</h2>

                {#if loadingMessages}
                    <!-- Loader centered -->
                    <div class="absolute inset-0 flex items-center justify-center">
                        <span class="loading loading-spinner loading-lg"></span>
                    </div>
                {:else if errorLoadingMessages}
                    <p class="text-center text-red-500">Erreur : {errorLoadingMessages}</p>
                {:else}
                    <div class="space-y-4">
                        {#each messages as message}
                            <div class={`chat chat-start`}>
                                <div class={`chat-bubble`}>
                                    {message.content}
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            {:else}
                <h2 class="text-lg font-semibold mb-4">Messages</h2>
                <p class="text-center text-gray-500">Sélectionnez un contact pour voir les messages</p>
            {/if}
        </div>
    </div>
</main>
