//Create a function to help us check our local storage

function checkToken()
{
    let result = false;
    let lsData = localStorage.getItem("Token");
    if(lsData && lsData != null)
    {
        result = true;
    }
    return result;
}

//we are going to use async amd await function to help us resolve a promise

const createAccount = async (createdUser) =>
{
   let result = await fetch("https://localhost:7226/user/addusers", {
        method: "POST",
        headers:{
            "Content-Type":'application/json'
        },
        body: JSON.stringify(createdUser)
    });

    if(!result.ok){

        const message = `Error check your code! ${result.status}`;
        throw new Error(message);

    }

    let data = await result.json();

    console.log(data)
}

export {checkToken, createAccount}