

export const generateCode = (length: number) => 
{
    const charList = "abcdefghijklmnopqrstuvwxynzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let finalCode = "";
    
    for(let i = 1; i <= length; i++){
        finalCode += (charList[Math.round(Math.random() * 62)]);
    }

    return finalCode;
}

