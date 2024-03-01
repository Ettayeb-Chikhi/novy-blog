import axios from './axios-config';

const endPoint = "/comments"

export const createComment  = async (comment) =>{
    const res = await axios.post(`${endPoint}`,comment)
    return await res.data;
}

