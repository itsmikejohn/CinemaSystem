import {  fail, type Actions } from "@sveltejs/kit";
import { supabase } from "$lib/DB/supabaseConfig";

export const actions: Actions = {
    default: async ({request, cookies, locals}) =>
    {
        
        const formData = await request.formData();
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const {data: {session}, error:err} = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if(session?.access_token){
            cookies.set("authToken", JSON.stringify(session), {httpOnly: true, maxAge: 60 * 60 * 3, sameSite: "strict", path: "/"});
        }else if(err){
            return fail(402, {msg: err.message});
        }
    }
};