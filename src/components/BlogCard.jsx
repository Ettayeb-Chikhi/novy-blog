"use client";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { useRouter } from 'next/navigation';


const StyledCard = styled(Card)(({ theme }) => ({
    display: "flex",
    //maxWidth:500,
    padding:7,
    [theme.breakpoints.down("sm")] : {
        flexDirection:"column",
        alignItems:"center"
    },
    cursor:"pointer"
}))

const InfoBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: 15,
    flex:1,
    
}))

const WriterInfo = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap:20,
    width: "100%",
    
}))

const ImageContainer = styled(CardMedia)(({theme})=>({
    width:131,
    [theme.breakpoints.down("sm")]:{
        objectFit:"cover",
    },
    [theme.breakpoints.down("md")]:{
        width:"50%",
        maxHeight:300
    }
}))

const TagsContainer = styled(Box)(({theme})=>({
    display:"flex",
    gap:5,
    marginBottom:2,
    flexWrap:"wrap"
}))

const BlogCard = ({blog}) => {
    const router = useRouter();
    const goToSingleBlog = (blogId) => {
        console.log("hey");
        router.push(`novy-blog/blog/${blogId}`);
    }
    
    return (
        <StyledCard onClick={()=>goToSingleBlog(blog.blogId)}>
            <InfoBox>
                <WriterInfo>
                    <Avatar src={blog?.writer.profilePic} />
                    <Typography variant='h5' component="span">
                       {blog?.writer.username}
                    </Typography>
                </WriterInfo>
                <span>published , {blog?.publishDate}</span>
                <Typography variant='h6' component="span" fontWeight="bold" >
                    {blog?.title}
                </Typography>
                <TagsContainer  >
                    {
                        blog?.keywords?.map(keyword=> <Chip key={keyword.keywordId} label={keyword.keyword} />)
                    }
                </TagsContainer>
            </InfoBox>
            <ImageContainer
                component="img"
          
                image={blog?.imageUrl}
            />
        </StyledCard>
    )
}

export default BlogCard