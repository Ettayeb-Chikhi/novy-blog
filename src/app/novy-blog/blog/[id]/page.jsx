"use client";

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import styled from '@mui/material/styles/styled';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import Comment from '../../../../components/Comment';
import ImgContainer from '../../../../components/ImageContainer';
import { getCommentCount, getSingleBlog } from '../../../../lib/blgos-service';
import { likePost } from '../../../../lib/user-service';
import styles from './styles.module.css';
import UsersLikesDialog from '../../../../components/UserLikesDialog';
import { useMemo, useState } from 'react';
import 'react-quill/dist/quill.bubble.css';
import { useRouter } from 'next/navigation';
const DynamicQuill = dynamic(() => import("react-quill"), {
    ssr: false,
})

const Wrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 30
}))

const SingleBlogPage = ({ params }) => {
    const authUser = useSelector(slice => slice.user);
    const blogId = params.id;
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const handleClose = () => {
        setOpen(false);
    }
    const [blog, commentStats] = useQueries({
        queries: [
            {
                queryKey: ["blogs", blogId],
                queryFn: () => getSingleBlog(blogId),
            },
            {
                queryKey: ["blogs", "num-comments", blogId],
                queryFn: () => getCommentCount(blogId),
            }
        ]
    })
    const likeMutation = useMutation({
        mutationKey: ["like"],
        mutationFn: (request) => likePost(request),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["blogs", blogId]
            })
        }
    })
    const { data, isLoading } = blog;
    const { data: commentCount, isLoading: isCommentsLoading } = commentStats
    const hasLikeIt = useMemo(() => {
        if (!authUser.userId) {
            return false;
        }
        return data?.userLikes.some(user => user.userId == authUser.userId)
    }, [authUser, data])

    const handleLike = () => {
        const request = {
            blogId: +blogId,
            userId: authUser.userId
        }
        likeMutation.mutate(request);
    }
    const handleTagClick = (tag)=>{
        router.push(`/novy-blog/tag/${tag}`)
    }

    if (isLoading) {
        return <Wrapper>
            <CircularProgress />
        </Wrapper>
    }
    return (
        <>
            <Wrapper>
                <ImgContainer sx={{
                    backgroundImage: `url(${data.imageUrl})`
                }} />
                <h1 className={styles.title} >{data.title}</h1>
                <div className={styles.userBox}>
                    <Avatar src={data.writer.profilePic} sx={{ width: 60, height: 60 }} />
                    <div className={styles.userInfo}>
                        <h3>{data.writer.username}</h3>
                        <span>published , {data.publishDate}</span>
                    </div>
                </div>
                <div className={styles.content}>
                    <DynamicQuill readOnly={true} value={data.content} theme='bubble' />
                </div>

                <div className={styles.keywords}>
                    {
                        data.keywords.map(keyword => <Chip label={keyword.keyword} key={keyword.keywordId} className={styles.chip} onClick={()=>handleTagClick(keyword.keyword)} />)
                    }
                </div>
                <div className={styles.stats}>
                    <div>
                        <IconButton disabled={!authUser?.userId} size='large' onClick={handleLike}>
                            {hasLikeIt ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                        </IconButton>
                        <span className={styles.likeSpan}   onClick={()=>{setOpen(prev=>!prev)}}>{data?.userLikes.length || 0}</span>
                    </div>
                    <div>
                        <ChatBubbleOutlineIcon /> <span>{isCommentsLoading ? 0 : commentCount.commentsCount}</span>
                    </div>
                </div>
                <Comment blogId={data.blogId} />
            </Wrapper>
            <UsersLikesDialog open={open} handleClose={handleClose} users={data?.userLikes} />
        </>
    )
}

export default SingleBlogPage;