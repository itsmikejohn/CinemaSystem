<script lang="ts">
	import Btn from "$lib/Components/Btn.svelte";
	import { scale } from "svelte/transition";

    const dsComp = {
        showUpload: false,
        showTicketsSold: false,
    }

</script>

<div class="mt-5">
    <div class="flex flex-col sm:flex-row gap-2 justify-center ">
        <button class="bg-blue-500 text-white font-bold p-2 rounded-xl transition-all hover:shadow-lg hover:shadow-black active:scale-95" on:click={() => dsComp.showTicketsSold = true}>Ticket Solds</button>

        <button class="bg-green-500 text-white font-bold p-2 rounded-xl transition-all hover:shadow-lg hover:shadow-black active:scale-95" on:click={() => dsComp.showUpload = true}>Upload Cinema</button>
    </div>

    {#if dsComp.showUpload}
        <div class="fixed left-0 right-0 top-0 bottom-0 bg-[#000000c7] p-2">
            <div class="mx-auto sm:max-w-xl card p-2 shadow-black shadow-lg flex flex-col gap-2 mt-[20vh]" transition:scale>
                <h4 class="h4 text-center">Upload Your Latest Movies!</h4>

                <label>
                    <p>Movie Name:</p>
                    <input type="text" class="input" />
                </label>

                <label>
                    <p>Maximum Tickets:</p>
                    <input type="number" class="input" />
                </label>

                <div class="flex gap-2">
                    <Btn name="Cancel" on:click={() => dsComp.showUpload = false}/>
                    <Btn name="Upload"/>
                </div>
            </div>
        </div>
    {/if}

    {#if dsComp.showTicketsSold}
        <div class="fixed left-0 right-0 top-0 bottom-0 bg-[#000000c7] p-2">
            <div class="mx-auto sm:max-w-2xl card p-2 shadow-black shadow-lg flex flex-col mt-[10vh]" transition:scale>
                <h4 class="h4 text-center">Ticket Solds</h4>
                    <input type="search" class="input rounded-none" placeholder="Search by name" />
                
                    <div class="flex flex-col gap-2">
                        <div class="flex">
                            <h4 class="w-[33%] h4 text-center">Buyer Name</h4>
                            <h4 class="w-[33%] h4 text-center">Movie Name</h4>
                            <h4 class="w-[33%] h4 text-center">Tickets Bought</h4>
                        </div>

                        <div class="flex flex-col gap-2 max-h-[50vh] overflow-auto border-[0.1rem] border-slate-500">
                            <div class="flex ">
                                <p class="w-[33%] text-center">Eviota, Mike John B</p>
                                <p class="w-[33%] text-center">Harry Potter</p>
                                <p class="w-[33%] text-center">4</p>
                            </div>
    
                            <div class="flex ">
                                <p class="w-[33%] text-center">Eviota, Mike John B</p>
                                <p class="w-[33%] text-center">Harry Potter</p>
                                <p class="w-[33%] text-center">4</p>
                            </div>
    
                            <div class="flex ">
                                <p class="w-[33%] text-center">Eviota, Mike John B</p>
                                <p class="w-[33%] text-center">Harry Potter</p>
                                <p class="w-[33%] text-center">4</p>
                            </div>
    
                            <div class="flex ">
                                <p class="w-[33%] text-center">Eviota, Mike John B</p>
                                <p class="w-[33%] text-center">Harry Potter</p>
                                <p class="w-[33%] text-center">4</p>
                            </div>
    
                            <div class="flex ">
                                <p class="w-[33%] text-center">Eviota, Mike John B</p>
                                <p class="w-[33%] text-center">Harry Potter</p>
                                <p class="w-[33%] text-center">4</p>
                            </div>
                            
                            <div class="flex ">
                                <p class="w-[33%] text-center">Eviota, Mike John B</p>
                                <p class="w-[33%] text-center">Harry Potter</p>
                                <p class="w-[33%] text-center">4</p>
                            </div>
    
                            <div class="flex ">
                                <p class="w-[33%] text-center">Eviota, Mike John B</p>
                                <p class="w-[33%] text-center">Harry Potter</p>
                                <p class="w-[33%] text-center">4</p>
                            </div>
    
                        </div>
                       
                        <Btn name="Back" on:click={() => dsComp.showTicketsSold = false}/>

                    </div>
                
            </div>
        </div>
    {/if}
</div>