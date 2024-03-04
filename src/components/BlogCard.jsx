"use client";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBlog } from '../lib/blgos-service';
import DeleteModal from '../components/DeleteModal';
import Tooltip from '@mui/material/Tooltip'

const StyledCard = styled(Card)(({ theme }) => ({
    display: "flex",
    //maxWidth:500,
    minHeight: 250,
    padding: 7,
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center"
    },
    cursor: "pointer"
}))

const InfoBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: 15,
    flex: 1,

}))

const WriterInfo = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: 20,
    width: "100%",

}))

const ImageContainer = styled(CardMedia)(({ theme }) => ({
    width: 131,
    [theme.breakpoints.down("sm")]: {
        objectFit: "cover",
    },
    [theme.breakpoints.down("md")]: {
        width: "50%",
        maxHeight: 300
    }
}))

const TagsContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: 5,
    marginBottom: 2,
    flexWrap: "wrap"
}))

const BlogCard = ({ blog }) => {
    const user = useSelector(state => state.user)
    const [modelOpen, setModelOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const deleteBlogMutation = useMutation({
        mutationKey: ["blogs", "delete", blog.blogId],
        mutationFn: deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["blogs"]
            })
        }

    })
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };
    const router = useRouter();
    const goToSingleBlog = (blogId) => {
        router.push(`/novy-blog/blog/${blogId}`);
    }

    const goToEditPage = () => {
        router.push(`/novy-blog/edit/${blog?.blogId}`);
    }
    const handleModalClose = () => {
        setModelOpen(false);
    }
    const handleDelete = () => {
        deleteBlogMutation.mutate(blog.blogId)
        setModelOpen(false);
    }

    return (
        <>
            {
                user.userId === blog.writer.userId && <div style={{ background: "white" }}>
                    <IconButton aria-label="" onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={goToEditPage}>
                            <Tooltip title="edit">
                                <IconButton>
                                    <EditIcon color='warning' />
                                </IconButton>
                            </Tooltip>
                        </MenuItem>
                        <MenuItem >
                            <Tooltip title="delete">
                                <IconButton onClick={() => setModelOpen(true)}>
                                    <DeleteIcon color='error' />
                                </IconButton>
                            </Tooltip>
                        </MenuItem>
                    </Menu>
                </div >
            }
            <StyledCard onClick={() => goToSingleBlog(blog.blogId)}>

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
                            blog?.keywords?.map(keyword => <Chip key={keyword.keywordId} label={keyword.keyword} />)
                        }
                    </TagsContainer>
                </InfoBox>
                <ImageContainer
                    component="img"

                    image={blog?.imageUrl}
                />
            </StyledCard>
            <DeleteModal action={handleDelete} open={modelOpen} handleClose={handleModalClose} />
        </>

    )
}

export default BlogCard