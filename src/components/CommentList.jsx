import {useInfiniteQuery} from '@tanstack/react-query';
import {getComments} from '../lib/comment-service';
import SingleComment from '../components/SingleComment';
import styled from '@mui/material/styles/styled';
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress';

const LoadMoreButton  = styled(Button)(({theme})=>({
    backgroundColor : "black",
    color:"white",
    marginBottom:5,
    "&:hover":{
        color:"black",
        border:"1px solid black",
        backgroundColor:"transparent"
    }
}));

const CommentList = ({blogId}) => {
    const {data,isLoading,isError,fetchNextPage,hasNextPage,isFetchingNextPage} = useInfiniteQuery({
        queryKey :["comments","infinite",blogId],
        getNextPageParam:prevData=>prevData.last ? null : prevData.number+1,
        queryFn : ({pageParam=0})=>getComments(blogId,pageParam),
    })
  return (
    <>
        <div>
            {data?.pages.flatMap(page=>page.content)
            .map(comment=><SingleComment comment={comment} key={comment.commentId} />)}
            {hasNextPage && <LoadMoreButton  onClick={()=>fetchNextPage()}>{isFetchingNextPage ? <CircularProgress/> :  "Load more"}</LoadMoreButton >}
        </div>
    </>
  )
}

export default CommentList