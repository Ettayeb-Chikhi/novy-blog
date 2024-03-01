import axios from './axios-config';

const endPoint = "/auth"

export const signup = async (request) => {
    const res = await axios.post(`${endPoint}/register`, request);
    return await res.data;
}

export const login = async (request) => {
    const res = await axios.post(`${endPoint}/login`, request);
    return await res.data;
}