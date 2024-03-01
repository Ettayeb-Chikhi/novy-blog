import {jwtDecode} from 'jwt-decode';

const padString  = (original,paddValue,paddSize)=>{
    return new String(original).padStart(paddSize,paddValue);
}

export const getDate = (date) => {
    date = new Date(date);
    const day = padString(date.getDate(),"0",2);
    const month = padString(date.getMonth()+1,"0",2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`
}

export const isTokenExpired = (token)=>{
    const payload = jwtDecode(token);
    return payload.exp*1000 < new Date().getTime(); 
}