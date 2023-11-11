<script lang="ts">

    import { page } from "$app/stores";
	import { onMount } from 'svelte';
    import { statics } from "$lib";
	import type { Session } from "@supabase/supabase-js";
	import type { PageServerData } from "./$types";
	import type { UserDATA } from "$lib/types";
	import AdminRole from "./AdminRole.svelte";
	import UserRole from "./UserRole.svelte";
	import { scale } from "svelte/transition";


    export let data: PageServerData;
   
    const dsComp = {
        userData:<UserDATA> {}

    }
    
	onMount( async () => {
        $statics.session = data as Session
        $statics.activeItem  = "/Book-Now";
        $statics.defaultNav = $statics.hasAuthNav;

        localStorage.setItem("sb-itkcfpvesxsghxfmsrrm-auth-token", JSON.stringify($statics.session as Session));

        if($statics.session){
            dsComp.userData = $statics.session?.user.user_metadata as UserDATA;
            
        }

    });

    

</script>

<div class="mx-auto sm:max-w-2xl p-2" in:scale>
    {#if dsComp.userData.role === "admin"}
        <h4 class="text-center h4">Welcome Admin!</h4>
        <AdminRole />

    {:else if dsComp.userData.role === "normal"}
        <p class="text-center">Welcome {dsComp.userData.fullName} you are a User</p>
        <UserRole />
        
    {:else}
        <p class="text-center">Eating potato</p>
    {/if}
</div>
