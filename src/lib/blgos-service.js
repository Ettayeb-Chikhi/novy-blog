import axios from './axios-config';

const endPoint = "/blogs"

export const getBlogs  = async (page=0,size=6) =>{
    const res = await axios.get(`${endPoint}?size=${size}&page=${page}`)
    return await res.data;
}
export const createBlog  = async (blogRequest) =>{
    const res = await axios.post(`${endPoint}`,blogRequest)
    return await res.data;
}
export const updateBlog  = async (blogRequest) =>{
    const res = await axios.put(`${endPoint}/${blogRequest.blogId}`,blogRequest)
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

export const getBlogsByTag = async (tag,page=0,size=6) => {
    const res = await axios.get(`${endPoint}/by-keyword/${tag}?page=${page}&size=${size}`);
    return await res.data;
}
export const getBlogsByUser = async (userId,page=0,size=6) => {
    const res = await axios.get(`${endPoint}/by-user/${userId}?page=${page}&size=${size}`);
    return await res.data;
}

export const deleteBlog = async (blogId) => {
    const res = await axios.delete(`${endPoint}/${blogId}`);
    return await res.data;
}