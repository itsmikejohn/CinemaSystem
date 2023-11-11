<script lang="ts">
	import Btn from "$lib/Components/Btn.svelte";
	import { scale } from "svelte/transition";
	import { onMount } from 'svelte';
    import { statics } from "$lib";
	import { generateCode } from "$lib/Generators/generateCode";

    import check from "$lib/Photos/check.svg";
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import type { ResultsType } from "$lib/types";

    import { Toast, getToastStore } from '@skeletonlabs/skeleton';
    import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';

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

	onMount( () => $statics.activeItem  = "/Login" );

    const dsComp = {
        loader: false,
        firstStep: false,
        secondStep: false,
        domMsg: "",
        email: "",
        code: "",
        clientCode: "",
    }

    const sendEmailToServer = async () => 
    {
        dsComp.code = generateCode(4);
        dsComp.loader = true;
        const res: Response = await fetch("/Register/ConfirmEmail", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                data: {
                    code: dsComp.code,
                    email: dsComp.email,
                }
            })
        })

        const { msg } = await res.json();
        if(msg === "email sent"){
            dsComp.loader = false;
            dsComp.firstStep = true;
            dsComp.loader = false;
        }else if(msg === "has error"){
            dsComp.domMsg = "Please enter a valid email."
            dsComp.loader = false;
        }

    }

    const codeChecker = () =>
    {
        dsComp.clientCode === dsComp.code ? dsComp.secondStep = true : dsComp.secondStep = false;

        if(dsComp.clientCode === dsComp.clientCode){
            dsComp.secondStep = true;
            dsComp.domMsg = "Code verified !";
        }else{
            dsComp.domMsg = "Invalid registration code.";
        }
    } 

    const submitFunc: SubmitFunction = async () =>
    {
        dsComp.loader = true;
        return async ({result, update}) =>
        {
            
            if(result.status === 402){
                const error = result as ResultsType<{msg: string}>;
                dsComp.domMsg = error.data.msg;
            }else if(result.status === 200){
                const success = result as ResultsType<{success: string}>;
                createToast(success.data.success, false);
            }

            update();
            dsComp.loader = false;
        }
    }

</script>

<div class="mx-auto sm:max-w-lg mt-[10vh] p-2" in:scale>
    <h2 class="h2 text-center">CBS Registration</h2>
    <small class="flex justify-center p-2 {dsComp.domMsg === "Code verified !"? "text-green-500 " : "text-red-500"}">{dsComp.domMsg}</small>
    <div class="flex flex-col gap-2">
        {#if dsComp.firstStep}

            {#if dsComp.secondStep}
                <!--Third stage-->
                <form method="POST" use:enhance={submitFunc} class="flex flex-col gap-2 mt-5">
                    <div class="input p-2 flex gap-2 justify-center items-center cursor-not-allowed">
                        <p class="text-slate-500">{dsComp.email}</p>
                        <img src={check} alt="" class="w-4" />
                    </div>

                    <input name="email" type="text" class="hidden" value={dsComp.email} />

                    <div class="flex flex-col gap-2 sm:flex-row">
                        <label>
                            <p>First Name:</p>
                            <input name="firstName" type="text" class="input" />
                        </label>

                        <label>
                            <p>Middle Name:</p>
                            <input name="middleName" type="text" class="input" />
                        </label>

                        <label>
                            <p>Last Name:</p>
                            <input name="lastName" type="text" class="input" />
                        </label>
                    </div>

                    <div class="">
                        <label>
                            <p>Password:</p>
                            <input name="password" type="password" class="input" />
                        </label>

                        <label>
                            <p>Confirm Password:</p>
                            <input name="confirmPassword" type="password" class="input" />
                        </label>
                    </div>
                    
                    <Btn name="Register" loader={dsComp.loader} lName="Registering" />
                </form>

            {:else}
                <!--Second stage-->
                <p class="text-center">A code has been sent to your email <b class="">{dsComp.email}</b></p>
                <label>
                    <p>Code:</p>
                    <input type="text" class="input" bind:value={dsComp.clientCode}/>
                </label>

                <Btn name="Continue" on:click={codeChecker}/>
            {/if}
            
        {:else}
            <!--First stage-->
            <label>
                <p>Email:</p>
                <input type="email" class="input" bind:value={dsComp.email}/>
            </label>
        
            <Btn name="Check Email" loader={dsComp.loader} lName="Sending Email" on:click={sendEmailToServer} />
        {/if}
        
        <div class="flex flex-col gap-5 mt-5">
            <p class="text-center">Already have an account? <a href="/Login" class="text-blue-500 underline transition-all hover:text-red-500">Log in</a></p>
        </div>
    </div>
</div>

