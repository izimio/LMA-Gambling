<script lang='ts'>
    export let name: string;
    export let phone: string;
    export let onClick: () => void;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li class="p-2 bg-base-200 rounded-lg hover:bg-base-300 cursor-pointer" on:click={onClick}>
    <p class="font-medium">{ name }</p>
    <p class="text-sm text-gray-500">{ phone }</p>
</li>
