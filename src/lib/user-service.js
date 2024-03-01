import axios from './axios-config';

const endPoint = "/users"

export const getUser  = async () =>{
    const res = await axios.get(`${endPoint}/profile`)
    return await res.data;
}