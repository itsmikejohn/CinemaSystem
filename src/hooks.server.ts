import { supabase } from "$lib/DB/supabaseConfig";
import { checkAuthentication } from "$lib/Server/checkAuth";
import type { UserDATA } from "$lib/types";
import {redirect, type Handle} from "@sveltejs/kit";

export const handle: Handle = async ({event, resolve,}) =>
{   
    const {cookies, locals, url} = event;
    locals.checkAuth = checkAuthentication(event);

    if(url.pathname === "/Login" || url.pathname === "/Register" || url.pathname === "/ForgotPassword"){
        if(locals.checkAuth){
            throw redirect(302, "/Book-Now");
        }
    }else if(url.pathname === "/Book-Now"){
        if(!locals.checkAuth){
            
            throw redirect(302, "/Login?Subscribe-YT:-@MikeSharesCode");
        }
    }
    

    return resolve(event);
    
}