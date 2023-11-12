<script lang="ts">
	import { enhance } from "$app/forms";
	import Btn from "$lib/Components/Btn.svelte";
	import { supabase } from "$lib/DB/supabaseConfig";
	import { getToastStore, Toast, type ToastSettings } from "@skeletonlabs/skeleton";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { scale } from "svelte/transition";
  

    const toastStore = getToastStore();

    const createToast = (msg: string, hasError: boolean) =>
    {

        const t: ToastSettings = {
            message: `
                <p class=" ${hasError ? "text-black" : "text-white"} font-bold">${msg}</p>
            `,


            background: `${hasError ? "bg-red-500" : "bg-[#EAB308]"}`
        };
        toastStore.trigger(t);

    }

    const dsComp = {
        showUpload: false,
        showTicketsSold: false,

        loader: false,
        domMsg: "",
        movieName: "",
        ticketQuantity: 0,
    }

    const submitFunc: SubmitFunction = async () =>
    {
        dsComp.loader = true;
        return async ({result, update}) =>
        {
            if(result.status === 200){
                createToast("Upload Successfully!", false);
                dsComp.showUpload = false;
                dsComp.loader = false;
            }else if(result.status === 402){
                createToast("There is an error contact mikey!", true);
                dsComp.showUpload = false;
                dsComp.loader = false;
            }

            update();
        }
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
                <div class="flex flex-row-reverse">
                    <button class="float-right text-red-500 py-2 transition-all active:scale-95 absolute hover:text-red-900"
                    on:click={() => dsComp.showUpload = false}
                    >Close</button>
                </div>
                <h4 class="h4 text-center">Upload Your Latest Movies!</h4>
                

                <form method="POST" use:enhance|={submitFunc} class="flex flex-col gap-2">

                    <label>
                        <p>Movie Name:</p>
                        <input name="movieName" type="text" class="input" />
                    </label>
    
                    <label>
                        <p>Maximum Tickets:</p>
                        <input name="ticketQuantity" type="number" class="input" />
                    </label>
                        
                    <Btn name="Upload" loader={dsComp.loader} lName="Uploading"/>
                </form>      
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