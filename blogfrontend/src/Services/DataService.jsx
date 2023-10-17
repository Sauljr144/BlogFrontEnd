
let userData = {}

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

const Loginfn = async (loginUser) => 
{
    let result = await fetch("https://localhost:7226/user/login", {
        method: "POST",
        headers:{
            "Content-Type":'application/json'
        },
        body: JSON.stringify(loginUser)
    });

    if(!result.ok){

        const message = `Error check your code! ${result.status}`;
        throw new Error(message);

    }

    let data = await result.json();

    // storing token in our localStorage
    if(data.token !=null)
    {
        localStorage.setItem("Token", data.token)
    }

    console.log(data)
    return data;
}

const GetLoggedInUser = async (username) =>{
    let result = await fetch(`https://localhost:7226/user/GetUSerByUsername/${username}`);
    userData = await result.json();
    console.log(userData);

}

const LoggedInData = () =>
{
    return userData;
}

export {checkToken, createAccount, Loginfn, GetLoggedInUser, LoggedInData}