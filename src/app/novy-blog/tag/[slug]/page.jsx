"use client";
import { useQuery } from '@tanstack/react-query';
import { getBlogsByTag } from '../../../../lib/blgos-service';
import BlogCardList from '../../../../components/BlogCardList';
import NotFound from '../../../../components/NotFound';
import Pagination from '@mui/material/Pagination';
import Loader from '../../../../components/Loader';
import { useState } from 'react';

const BlogByKeywordPage = ({ params }) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs", "tag", params.tag],
    queryFn: () => getBlogsByTag(params.slug, page - 1),
    placeholderData: (prevData) => prevData
  })
  if (isLoading) {
    return <Loader />
  }

  return (
    data.content.length>0 ? <>
      <BlogCardList blogs={data.content} />
      <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
        <Pagination count={data?.totalPages} page={page} onChange={(e, value) => setPage(value)} />
      </div>
    </> : <NotFound />
  )
}

export default BlogByKeywordPage