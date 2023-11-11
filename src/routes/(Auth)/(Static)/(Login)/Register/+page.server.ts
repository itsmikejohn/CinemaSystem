import { fail, type Actions, redirect } from "@sveltejs/kit";
import { supabase } from "$lib/DB/supabaseConfig";


export const actions: Actions = {
    default: async ({request, cookies, locals}) =>
    {
        const formData = await request.formData();

        const email = formData.get("email") as string;
        const firstName = formData.get("firstName") as string;
        const middleName = formData.get("middleName") as string;
        const lastName = formData.get("lastName") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if(firstName.trim().length > 3){
            if(middleName.trim().length > 3){
                if(lastName.trim().length > 3){
                    if(password === confirmPassword){
                        const {data:{session}, error:err} = await supabase.auth.signUp({
                            email: email,
                            password: password,

                            options: {
                                data: {
                                    fullName: `${lastName}, ${firstName} ${middleName}`,
                                    email: email,
                                    role: "normal",
                                }
                            }                   
                        });

                        if(session?.access_token){
                            cookies.set("authToken", JSON.stringify(session), {httpOnly: true, maxAge: 60 * 60 * 3, sameSite:"strict", secure: true, path: "/"});
                            
                        }else if(err){
                            return fail(402, {msg: err.message});
                        }
                    }else{
                        return fail(402, {msg: "Password not same."})
                    }
                }else{
                    return fail(402, {msg: "Not valid last name."})
                }
            }else{
                return fail(402, {msg: "Not valid middle name."})
            }
        }else{
            return fail(402, {msg: "Not valid first name."})
        }

    }
};