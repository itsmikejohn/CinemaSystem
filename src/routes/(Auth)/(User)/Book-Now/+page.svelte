<script lang="ts">

	import { onMount } from 'svelte';
    import { statics } from "$lib";
	import type { PageServerData } from "./$types";
	import type { MoviesDataTypes, UserDATA } from "$lib/types";
	import AdminRole from "./AdminRole.svelte";
	import UserRole from "./UserRole.svelte";
	import { scale } from "svelte/transition";

    import movieIcon from "$lib/Photos/movieIcon.svg";
	import Btn from '$lib/Components/Btn.svelte';
	import type { LayoutServerData } from '../../../$types';


    export let data: LayoutServerData;
   
    const dsComp = {
        userData:<UserDATA> {}

    }
    
	onMount( async () => {
        $statics.session = data.data;
        $statics.moviesArray = data.movies?.data as MoviesDataTypes[];
        $statics.activeItem  = "/Book-Now";
        $statics.defaultNav = $statics.hasAuthNav;
       
        localStorage.setItem("sb-itkcfpvesxsghxfmsrrm-auth-token", JSON.stringify($statics.session));

        

        if($statics.session){
            dsComp.userData = $statics.session?.user.user_metadata as UserDATA;
            
        }

    });

    


    

</script>

<div class="mx-auto sm:max-w-2xl p-2 " in:scale>
    {#if dsComp.userData.role === "admin"}
        <h4 class="text-center h4">Welcome Admin!</h4>
        <AdminRole />

    {:else if dsComp.userData.role === "normal"}
        <p class="text-center">Welcome {dsComp.userData.fullName} you are a User</p>
        <UserRole />
        
    {:else}
        <p class="text-center">Eating potato</p>
    {/if}

    <h3 class="h3 text-center mt-[5vh]">Available Movies</h3>

   <div class=" p-2 h-[70vh] overflow-auto">
        {#each $statics.moviesArray as movies }
            <div class="flex flex-col gap-2 mt-10 card p-4">
                <img src={movieIcon} alt="" class="w-full h-[20vh]" />
                <div class="">
                    <p class="">Movie Name: {movies.movie_name}</p>
                    <p>Ticket Available: {movies.ticket_quantity}</p>
                </div>

                {#if dsComp.userData.role === "normal"}
                    <div class="flex gap-2">
                        <Btn name="Buy"/>
                        <Btn name="Reserve" style="bg-red-500 text-white rounded-3xl"/>
                    </div>
                {:else if dsComp.userData.role === "admin"}
                    <div class="flex gap-2">
                        <Btn name="Update"/>
                        <Btn name="Delete" style="bg-red-500 text-white rounded-3xl"/>
                    </div>
                {/if}
            </div>
        {/each}
   </div>
    
    
</div>
