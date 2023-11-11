<script lang="ts">
	import { goto } from "$app/navigation";
	import Btn from "$lib/Components/Btn.svelte";

    import { page } from "$app/stores";
	import { onMount } from 'svelte';
    import { statics } from "$lib";

	onMount( () => $statics.activeItem  = "/");
    

</script>


<div class="p-2">
	<div class="mx-auto sm:max-w-2xl flex flex-col gap-4 p-4 card mt-[10vh] shadow-lg shadow-black">
        <h1 class="h1 text-center">Welcome !</h1>
        <p>The Simple Cinema Booking System is a user-friendly platform designed to streamline the process of reserving movie tickets. It provides real-time information on showtimes, seat availability, and pricing, allowing moviegoers to plan their cinema experience with ease. With its intuitive interface and secure payment options, this system ensures a hassle-free booking experience, transforming the way we go to the movies.</p>

        <Btn style="py-2 px-8 bg-yellow-500 text-white rounded-3xl" name="Let's go" on:click={() => goto("/Book-Now")}/>
    </div>
</div>