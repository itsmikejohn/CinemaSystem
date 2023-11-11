import { json, type RequestHandler } from "@sveltejs/kit";



export const POST: RequestHandler = async ({request, cookies}) =>
{
    const {logoutReq} = await request.json();

    if(logoutReq){
        cookies.delete("authToken");
        return json({success: true})
    }

    return json({success: false});
}