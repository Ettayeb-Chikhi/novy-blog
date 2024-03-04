"use client";

import BlogCardList from '../../components/BlogCardList';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '../../lib/blgos-service';
import Loader from '../../components/Loader';
export default function Home() {
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = useQuery({
        queryKey: ["blogs", { page }],
        queryFn: () => getBlogs(page - 1),
        placeholderData: (prevData, prevQuery) => prevData,
    })

    if (isLoading) {
        return <Loader />
    }
    return (
        <>
            <BlogCardList blogs={data.content}/>
            <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                <Pagination count={data?.totalPages} page={page} onChange={(e, value) => setPage(value)} />
            </div>
        </>
    );
}