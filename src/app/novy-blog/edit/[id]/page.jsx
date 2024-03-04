"use client";
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery} from '@tanstack/react-query';
import {  getSingleBlog } from '../../../../lib/blgos-service';
import moduleName from '../../../../components/BlogForm';
import BlogForm from '../../../../components/BlogForm';
const EditBlogPage = ({params}) => {
    const {isLoading,data,error} = useQuery({
        queryKey : ["blogs",params.id],
        queryFn : ()=>getSingleBlog(params.id)
    })

    if(isLoading){
        return <CircularProgress />
    }
  return (

    <BlogForm isUpdate={true} blog={data} />
  )
}

export default EditBlogPage