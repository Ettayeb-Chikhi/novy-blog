import axios from './axios-config';

const endPoint = "/users"

export const getUser  = async () =>{
    const res = await axios.get(`${endPoint}/profile`)
    return await res.data;
}

export const likePost  = async (request) =>{
    const res = await axios.post(`${endPoint}/like-post`,request)
    return await res.data;
}