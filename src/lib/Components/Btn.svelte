<script lang="ts">
    export let name = "btn name";
    export let loader = false;
    export let lName = "loader name";
    export let style = "p-2 bg-yellow-500 text-white rounded-3xl";
</script>

<button class="w-full transition-all active:scale-95 hover:shadow-sm hover:shadow-black {style}"
disabled={loader}
on:click
>
    {#if loader}
        <div class="flex items-center gap-1 justify-center">
            <p>{lName}</p>
            <div class="w-4 h-4 border-2 rounded-full border-b-yellow-500 animate-spin"></div>
        </div>
    {:else}
        <p>{name}</p>
    {/if}
</button>