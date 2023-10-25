
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

// One function to rule them all DRY (don't repeat yourself)
const sendData = async (endpoint, passedInData) =>{
    let result = await fetch(`https://localhost:7226/user/${endpoint}`,
    {   method: "POST",
        headers:{
            "Content-Type":'application/json'
    },
    body: JSON.stringify(passedInData)
});

if(!result.ok){

    const message = `Error check your code! ${result.status}`;
    throw new Error(message);

}

let data = await result.json();
return data;

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

//adding our published items to our server
const AddBlogItems = async (blogItems) => {
    let result = await fetch("https://localhost:7226/blog/AddBlogItems", {
        method: "POST",
        headers:{
            "Content-Type":'application/json'
        },
        body: JSON.stringify(blogItems)
    });

    if(!result.ok){

        const message = `Error check your code! ${result.status}`;
        throw new Error(message);

    }

    let data = await result.json();

    return data;
}

const getBlogItems = async () => {
    let result = await fetch("https://localhost:7226/blog/GetBlogItems")
    let data = await result.json();
    return data;
}

const GetBlogItemsByUserId = async (UserId) => {

    let result = await fetch(`https://localhost:7226/blog/GetItemsByUserId/${UserId}`)
    let data = await result.json();
    return data;

}

const updateBlogItems = async (blogItems) =>{
    let result = await fetch('https://localhost:7226/blog/UpdateBlogItem', {
        method: 'POST',
        headers:{
            "Content-Type":'application/json'
        },
        body: JSON.stringify(blogItems)
    })
  
    if(!result.ok){

        const message = `Error check your code! ${result.status}`;
        throw new Error(message);

    }

    let data = await result.json();
    console.log(data)
    return data;
}

const getPublishedBlogItems = async () =>{
    let result = await fetch("https://localhost:7226/blog/GetPublishedItems")
    let data = await result.json();
    return data;
}

export {checkToken, createAccount, Loginfn, GetLoggedInUser, LoggedInData, AddBlogItems, getBlogItems,sendData, GetBlogItemsByUserId, updateBlogItems, getPublishedBlogItems}