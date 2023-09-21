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

export {checkToken}