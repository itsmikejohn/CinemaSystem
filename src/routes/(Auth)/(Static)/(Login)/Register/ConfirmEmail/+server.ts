import transporter from "$lib/Server/nodeMailer";
import { json, type RequestHandler } from "@sveltejs/kit";


export const POST: RequestHandler = async ({request, cookies}) =>
{
    const {data} = await request.json();

    const html = `
        <h1>Your email confirmation code is ${data.code}</h1>
    `
    const msg = {
        from: "cinematicketingsystem92@gmail.com",
        to: data.email,
        bbc: "",
        subject: "Cinema System Email Confirmation",
        text: `Code is ${data.code}`,
        html: html,
    };

    try {
        const sendEmail = async (msg: any) => 
        {
            await new Promise((resolve, reject) => {
                transporter.sendMail(msg, (err, info) => {
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(info);
                    }
                })

            })
        }

        await sendEmail(msg);

        return json({msg: "email sent"});
    } catch (error) {
        return json({msg: "has error"});
    }

}