import type { Session, User } from "@supabase/supabase-js";
import type { RequestEvent } from "@sveltejs/kit";
import JWT from "jsonwebtoken";
import type { JsonWebTokenError } from "jsonwebtoken";




const secretKey = "RqWmfjWyMx8U0lemE/GIOjBUTtZ7nkO80Fg7o/HG8zgtYFEpUIr0FVnlsptslYnQIyFyxApeT4aGfuii2RYMQA==";

export const checkAuthentication = (event: RequestEvent) =>
{
    const {cookies, url} = event;

    if(cookies.get("authToken")){
        const session: Session = JSON.parse(cookies.get("authToken") as string); 
        
        try {
            const verify = JWT.verify(session.access_token, secretKey) as JWT.JwtPayload;

            if(verify){
                return session;
                
            }

        } catch (error) {
            const mutEr = error as JsonWebTokenError;
            return false;
            
        }

    }

    return false;
   
}