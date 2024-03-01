"use client";
import styled from '@mui/material/styles/styled';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import RateReviewIcon from '@mui/icons-material/RateReview';
import { getDate } from '../lib/utils';
import { createComment } from '../lib/comment-service';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
const Container = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: 5,
    marginTop: 8,
    width: "100%",

}))
const CommentForm = styled("form")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "30px",
    padding: "10px",

}))
const Comment = ({ blogId }) => {
    const user = useSelector((slice) => slice.user);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const queryClient = useQueryClient();
    const createCommentMutation = useMutation({
        mutationKey: ["comments", "create"],
        mutationFn: (request) => createComment(request),
    

    })
    const onDataValid = (data) => {
        const request = {
            commentText: data.comment,
            userId: user.userId,
            blogId: blogId,
            commentDate: getDate(new Date()),
        }
        createCommentMutation.mutate(request);
        queryClient.invalidateQueries({
            queryKey:["blogs","num-comments"]
        })
        reset()

    }
    return (
        <>
            <Container>
                <h2>List of comments</h2>
                <CommentForm onSubmit={handleSubmit(onDataValid)}>
                    <TextField
                        id="comment"
                        variant='outlined'
                        placeholder='Share your opinion ...'
                        label="Comment"
                        multiline
                        rows={3}
                        sx={{ width: "60%" }}
                        {...register("comment", {
                            required: { value: true, message: "The comment is required" }
                        })}
                        error={errors.comment != undefined}
                        helperText={errors.comment?.message}
                    />
                    <Button type='submit' variant="contained" color="info" sx={{ display: "flex", gap: 3 }} disabled={!user.userId || createCommentMutation.isPending}>
                        Comment <RateReviewIcon />
                    </Button>
                </CommentForm>
            </Container>
        </>
    )
}

export default Comment