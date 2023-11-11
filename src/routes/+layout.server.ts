import type { Session } from "@supabase/supabase-js";
import type { LayoutServerLoad } from "./$types";


export const load: LayoutServerLoad = async ({locals, request, parent}) => {

    
    return {data: locals.checkAuth as Session};
    
};