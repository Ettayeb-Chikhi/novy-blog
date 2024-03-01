"use client";

import { useQuery,useQueries } from '@tanstack/react-query';
import { getSingleBlog ,getCommentCount} from '../../../../lib/blgos-service';
import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ImgContainer from '../../../../components/ImageContainer';
import Avatar from '@mui/material/Avatar';
import styles from './styles.module.css';
import dynamic from 'next/dynamic';
import Chip from '@mui/material/Chip';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Comment from '../../../../components/Comment';
import 'react-quill/dist/quill.bubble.css';
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
    const blogId = params.id;
    const [blog,commentStats] = useQueries({
        queries:[
            {
                queryKey: ["blogs", blogId],
                queryFn: () => getSingleBlog(blogId),   
            },
            {
                queryKey: ["blogs","num-comments",blogId],
                queryFn: () => getCommentCount(blogId),
            }
        ]
    })
    const {data,isLoading} = blog;
    const {data:commentCount} = commentStats    

    if (isLoading) {
        return <Wrapper>
            <CircularProgress />
        </Wrapper>
    }
    return (
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
                    data.keywords.map(keyword=><Chip label={keyword.keyword} key={keyword.keywordId} className={styles.chip} />)
                }
            </div>
           <div className={styles.stats}>
                <div>
                    <ThumbUpIcon /> <span>30</span>
                </div>
                <div>
                    <ChatBubbleOutlineIcon/> <span>{commentCount.commentsCount || 0}</span>
                </div>
           </div>
           <Comment blogId={data.blogId} />
        </Wrapper>
    )
}

export default SingleBlogPage;