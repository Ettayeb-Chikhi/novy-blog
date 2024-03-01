import axios from './axios-config';

const endPoint = "/blogs"

export const getBlogs  = async (page=0,size=3) =>{
    const res = await axios.get(`${endPoint}?size=${size}&page=${page}`)
    return await res.data;
}
export const createBlog  = async (blogRequest) =>{
    const res = await axios.post(`${endPoint}`,blogRequest)
    return await res.data;
}

export const getSingleBlog  = async (blogId) =>{
    const res = await axios.get(`${endPoint}/${blogId}`,blogId)
    return await res.data;
}

export const getCommentCount = async (blogId) => {
    const res = await axios.get(`${endPoint}/${blogId}/number-comments`);
    return await res.data;
}
