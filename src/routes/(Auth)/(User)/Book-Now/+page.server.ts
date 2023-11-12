import type { Session } from "@supabase/supabase-js";
import type { PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { supabase } from "$lib/DB/supabaseConfig";
import type { Actions } from "@sveltejs/kit";
import { v4 as uuidv4 } from 'uuid';

export const load: PageServerLoad = async ({locals, cookies}) => {

    
    
    return {data: locals.checkAuth}
};

export const actions: Actions = {
    default: async ({request, cookies}) =>
    {
        const formData = await request.formData();
        const uid = uuidv4();

        const movieName = formData.get("movieName") as string;
        const ticketQuantity = formData.get("ticketQuantity") as string;

        if(movieName.trim().length > 3){
            if(ticketQuantity.trim().length > 0){
                const {error:err} = await supabase.from("uploaded_movies_tb").insert({
                    movie_name: movieName,
                    ticket_quantity: Number(ticketQuantity),
                    uid: uid,
                });
        
                if(err){
                    return fail(402, {msg: err.message});
                }

                return fail(200, {msg: "Movie Uploaded!"});

            }else{
                return fail(402, {msg: "Quantity of tickets are not valid."})
            }
        }else{
            return fail(402, {msg: "Movie name not valid."})
        }

        
    }
};