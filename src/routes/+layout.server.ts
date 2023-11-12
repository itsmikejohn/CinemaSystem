import type { PostgrestSingleResponse, Session } from "@supabase/supabase-js";
import type { LayoutServerLoad } from "./$types";
import { supabase } from "$lib/DB/supabaseConfig";
import type { MoviesDataTypes } from "$lib/types";

export const load: LayoutServerLoad = async ({locals, request, parent}) => {

    if(locals.checkAuth){
        const movies: PostgrestSingleResponse<MoviesDataTypes[]> = await supabase.from("uploaded_movies_tb").select("*");
        
        return {
            data: locals.checkAuth as Session,
            movies: movies
        };
    }

    return {
        data: undefined,
        movies: null
    };
    
    
    
};