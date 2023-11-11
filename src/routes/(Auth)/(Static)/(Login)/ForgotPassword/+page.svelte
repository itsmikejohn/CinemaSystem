<script lang="ts">
	import Btn from "$lib/Components/Btn.svelte";
	import { scale } from "svelte/transition";
	import { onMount } from 'svelte';
    import { statics } from "$lib";

	onMount( () => $statics.activeItem  = "/Login");

</script>

<div class="mx-auto sm:max-w-lg mt-[10vh] p-2" in:scale>
    
    <h2 class="h2 text-center">CBS Login</h2>
    <div class="flex flex-col gap-2">
        <label>
            <p>Email:</p>
            <input type="email" class="input" />
        </label>

        <Btn name="Send Reset"/>
        
       
        
        <p class="text-center mt-5">Already recovered ? <a href="/Register" class="text-blue-500 underline transition-all hover:text-red-500">Log in</a></p>
        
    </div>
</div>

