<script lang="ts">
	import Btn from "$lib/Components/Btn.svelte";
	import { scale } from "svelte/transition";
    import { page } from "$app/stores";
	import { onMount } from 'svelte';
    import { statics } from "$lib";
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import type { ResultsType } from "$lib/types";

	onMount( () => {
        $statics.activeItem  = "/Login";
        localStorage.clear();
        
        if($page.url.search === "?Subscribe-YT:-@MikeSharesCode"){
            $statics.defaultNav = $statics.noAuthNav;
            $statics.session = undefined;
        }
    });

    const dsComp = {
        loader: false,
        domMsg: "",
    }

    const submitFunc: SubmitFunction = () =>
    {   
        dsComp.loader = true;
        return async ({result, update}) =>
        {
            if(result.status === 402){
                const results = result as ResultsType<{msg: string}>;
                dsComp.domMsg = results.data.msg;
                dsComp.loader = false;
            }

            update();
        }
    }

    $: warning = $page.url.search;

</script>

<div class="mx-auto sm:max-w-lg mt-[10vh] p-2" in:scale>
    {#if warning === "?Subscribe-YT:-@MikeSharesCode"}<p class="text-red-500 text-center p-2">Access denied you have to login first.</p>{/if}
    <p class="text-red-500 text-center p-2">{dsComp.domMsg}</p>
    <h2 class="h2 text-center">CBS Login</h2>
    <div class="flex flex-col gap-2">
        <form method="POST" class="flex flex-col gap-2" use:enhance={submitFunc}>
            <label>
                <p>Email:</p>
                <input name="email" type="email" class="input" />
            </label>
    
            <label>
                <p>Password:</p>
                <input name="password" type="password" class="input" />
            </label>
    
            <Btn name="Login" loader={dsComp.loader} lName="Logging."/>
        </form>
        
        <div class="flex flex-col gap-5 mt-5">
            <p class="text-center"><a href="/clForgotPassword" class="text-blue-500 underline transition-all hover:text-red-500">Forgot Password ?</a></p>
            <p class="text-center">Experience Exclusive Cinemas! <a href="/Register" class="text-blue-500 underline transition-all hover:text-red-500">Create Account</a></p>
        </div>
    </div>
</div>

