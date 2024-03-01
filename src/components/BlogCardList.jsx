"use client";
import BlogCard from './BlogCard';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '../lib/blgos-service';

const BlogCardList = () => {
    
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = useQuery({
        queryKey: ["blogs", { page }],
        queryFn: () => getBlogs(page - 1),
        placeholderData: (prevData, prevQuery) => prevData,
    })

    if (isLoading) {
        return <h1>Loading ...</h1>
    }
    return (
        <>
            <Grid container spacing={3} mt={3} p={3} justifyContent={{ xs: "center", lg: "center" }} alignItems={{ xs: "center", lg: "start" }} >
                {
                    data?.content?.map(blog => (<Grid key={blog.blogId} item xs={11} sm={10} md={6} lg={4}>
                        <BlogCard  blog={blog} />
                    </Grid>)
                    )
                }
            </Grid>
            <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                <Pagination count={data?.totalPages} page={page} onChange={(e, value) => setPage(value)} />
            </div>

        </>
    )
}

export default BlogCardList