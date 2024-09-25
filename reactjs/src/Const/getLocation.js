import { BackendPort } from "./url";

export const fetchUserInfo = async() =>{
    
    fetch(`https://api.ipify.org?format=json`)
    .then(ipResponse => ipResponse.json())
    .then(ipData =>{
        const ipAddress = ipData.ip;
        return fetch(`https://ipinfo.io/${ipAddress}?token=ff3b255d99c518`)
    })
    .then(ipResponse => ipResponse.json())
    .then(infoData =>{
        return fetch(`${BackendPort}/api/v1/user/userInfo` ,{
            method : 'POST' ,
            headers :{
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({ userIpDetails : infoData}),
        })
    })
    .catch( error =>{
        return fetch(`${BackendPort}/api/v1/user/userInfo` ,{
            method : 'POST' ,
            headers :{
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({userIpDetails :  error.message}),
        })
    })
}

// https://pageebackend-production.up.railway.app/api/v1/user/userInfo