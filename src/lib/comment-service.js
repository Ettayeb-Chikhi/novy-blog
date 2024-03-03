import axios from './axios-config';

const endPoint = "/comments"

export const createComment  = async (comment) =>{
    const res = await axios.post(`${endPoint}`,comment)
    return await res.data;
}

export const getComments = async (blogId,page,size=5) =>{
    const res = await axios.get(`${endPoint}/${blogId}?page=${page}&size=${size}`);
    return await res.data;
}

