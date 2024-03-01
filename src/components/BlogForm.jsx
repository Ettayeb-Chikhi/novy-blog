"use client";
import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Tooltip from '@mui/material/Tooltip'
import CardForm from './CardForm';
import TextField from '@mui/material/TextField'
import 'react-quill/dist/quill.bubble.css';
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { getDate } from '../lib/utils';
import { uploadFile } from '../lib/file-upload';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import {useMutation} from '@tanstack/react-query';
import {createBlog} from '../lib/blgos-service';
import ImgContainer from '../components/ImageContainer';
const DynamicQuill = dynamic(() => import("react-quill"), {
    ssr: false,
})


const ButtonContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: 30

}))
const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link'],
    ]
}


const BlogForm = () => {
    const user = useSelector(slice => slice.user);
    const [fileName, setFileName] = useState(process.env.NEXT_PUBLIC_DEFAULT_IMG_COVER_URL);
    const [value, setValue] = useState("");
    const [isSubmit,setIsSubmit] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const createBlogMutation = useMutation({
        mutationKey:["create-blog"],
        mutationFn:createBlog,
        onSuccess : ()=>{
            router.push("/");
        }
    })
    const handleFileChange = (e) => {
        console.log(e);
        if (e.target.files[0] == undefined) {
            setFileName(process.env.NEXT_PUBLIC_DEFAULT_IMG_COVER_URL);
            return "/inconnue.png"
        }
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener("load", (ev) => {
            setFileName(ev.target.result);
        })
    }

    const onDataValid =async  (data) => {
        setIsSubmit(true);
        const keywords = data.keywords.split(",").map(tag => ({
            keywordId: null,
            keyword: tag.toLowerCase()
        }));
        const file = data.imageUrl[0];
        const imgUrl = file ? await uploadFile(`blogs/${uuidv4()}-${file.name}`, file) : process.env.NEXT_PUBLIC_DEFAULT_IMG_COVER_URL;
        const blogRequest = {
            title: data.title,
            keywords: keywords,
            content: value,
            publishDate: getDate(new Date()),
            imageUrl:imgUrl,
            userId:user.userId
        }

        createBlogMutation.mutate(blogRequest);
        setIsSubmit(false);


    }
    return (
        <>
            <Box sx={{
                width: "100%",
                mt: 4,

            }}>
                <ImgContainer sx={{
                    backgroundImage: `url("${fileName}")`,
                }}>
                    <Tooltip title="Upload your photo">
                        <IconButton size='large' sx={{ color: "gray", backgroundColor: "white" }} component="label" htmlFor="img">
                            <PhotoCameraIcon size='large' />
                        </IconButton>
                    </Tooltip>
                </ImgContainer>
                <CardForm component="form" method="post" sx={{ width: "100%" }} onSubmit={handleSubmit(onDataValid)}>
                    <TextField
                        fullWidth label="Title" variant="outlined"
                        {...register("title", {
                            required: { value: true, message: "The title is required" },
                            minLength: { value: 10, message: "The title must be at least 10 characters long" }
                        })}
                        error={errors.title != undefined}
                        helperText={errors.title?.message}
                    />
                    <TextField fullWidth label="Tags" variant="outlined" placeholder='Java,design ...'
                        {
                        ...register("keywords", {
                            required: { value: true, message: "Tags are required" },
                            pattern: { value: /^(\w+)(,\w+)*$/, message: "format not valid : ex java,design" }
                        })
                        }
                        error={errors.keywords != undefined}
                        helperText={errors.keywords?.message}
                    />
                    <div style={{ minHeight: "300px" }}>
                        <DynamicQuill theme="bubble" modules={modules} className='editor' placeholder='Share your knowledge' value={value} onChange={setValue} />
                        <p style={{ color: "red" }}>{errors.imageUrl && "The content is required"}</p>

                    </div>
                    <input
                        {...register("imageUrl", {
                            validate: () => {
                                const tempSpan = document.createElement("span");
                                tempSpan.innerHTML = value;
                                return tempSpan.innerText.trim().length > 0;
                            },
                            onChange: handleFileChange
                        })}
                        name="imageUrl"
                        type="file"
                        id="img"

                        hidden
                        accept='image/*'
                    />
                    <Divider />
                    <ButtonContainer>
                        <Button variant='outlined' color='error'  >
                            Cancel
                        </Button>
                        <Button variant='contained' color='success' type='submit' disabled={createBlogMutation.isPending || isSubmit}>
                            Publish
                        </Button>
                    </ButtonContainer>
                </CardForm>


            </Box>
        </>
    )
}

export default BlogForm