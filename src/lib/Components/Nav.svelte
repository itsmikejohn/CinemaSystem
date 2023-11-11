<script lang="ts">
	import { slide } from "svelte/transition";
    import { statics } from "$lib";
    import type { NavSelection } from "$lib/types";
	import { goto } from "$app/navigation";

    const dsComp = {
        showMenu: false,
    }

    const showMenu = () => dsComp.showMenu = !dsComp.showMenu;

    const handleSelection = (selected: NavSelection) =>
    {
        $statics.activeItem = selected.url;
        dsComp.showMenu = false;

    }

    const logoutHandler = async () =>
    {
        const res: Response = await fetch("/Logout", {
            method: "POST",
            headers: {
                "content-typed": "application/json"
            }, 
            body: JSON.stringify({
                logoutReq: true
            })
        });

        const result: boolean = await res.json();

        if(result){
            $statics.defaultNav = $statics.noAuthNav;
            $statics.session = undefined;
            localStorage.clear();
            goto("/");
        }

    }
</script>

<nav class="w-full bg-yellow-500 p-2 flex  items-center justify-center gap-2">
    <div class="sm:hidden w-full">
        <button class="flex flex-col gap-1 p-2" on:click={showMenu}>
            <div class="w-8 border-2 border-white"></div>
            <div class="w-8 border-2 border-white"></div>
            <div class="w-8 border-2 border-white"></div>
        </button>
    </div>

    <div class="w-full hidden sm:block">
        <h3 class="h3 text-center text-white"><a href="/">Cinema Booking System</a></h3>
    </div>

    <div class="hidden sm:flex justify-center w-full gap-2">
        {#each $statics.defaultNav as selection }
            <a href={selection.url} 
            class="p-2 text-xl text-white font-bold {$statics.activeItem === selection.url ? "bg-black text-yellow-500 rounded-xl" : ""} "
            on:click={() => handleSelection(selection)}
            >{selection.name}</a>
        {/each}

    </div>

    {#if $statics.defaultNav === $statics.hasAuthNav}
        <button class="p-2 bg-red-500 rounded-xl font-bold text-white transition-all active:scale-95"
        on:click={logoutHandler}
        
        >Logout</button>
    {/if}
    
    

    <div class="w-full hidden sm:block">
        <div class="max-w-fit float-right">
            <input type="search" class="input" placeholder="Search"/>
        </div>
    </div>
</nav>

{#if dsComp.showMenu}
    <div class="fixed bottom-0 top-0 left-0 right-0 bg-[#00000050] sm:hidden">
        <menu class="fixed top-0 left-0 right-0 bg-yellow-500 shadow-lg shadow-black flex flex-col gap-2 p-2" transition:slide>

            <div class="flex flex-row-reverse p-2">
                <button class="flex flex-col gap-1 p-2" on:click={showMenu}>
                    <div class="w-8 border-2 border-white"></div>
                    <div class="w-8 border-2 border-white"></div>
                    <div class="w-8 border-2 border-white"></div>
                </button>
            </div>
        
            <div class="flex flex-col gap-2 items-center">
                {#each $statics.defaultNav as selection }
                    <a href={selection.url} 
                    class="p-2 text-xl text-white font-bold {$statics.activeItem === selection.url ? "bg-black text-yellow-500 rounded-xl" : ""} "
                    on:click={() => handleSelection(selection)}
                    >{selection.name}</a>
                {/each}
            </div>
        </menu>

        <div class="fixed bottom-0 left-0 right-0">
            <p class="text-center text-white font-bold bg-black transition-all">Cinema Booking System</p>
        </div>
    </div>

    
{/if}


