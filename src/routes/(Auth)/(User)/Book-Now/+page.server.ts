import type { Session } from "@supabase/supabase-js";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { supabase } from "$lib/DB/supabaseConfig";


export const load: PageServerLoad = async ({locals, cookies}) => {
    
    return locals.checkAuth as Session
};