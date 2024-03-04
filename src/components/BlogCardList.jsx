import BlogCard from './BlogCard';
import Grid from '@mui/material/Grid';


const BlogCardList = ({blogs}) => {
    
    return (
        <>
            <Grid container spacing={3} mt={3} p={3} justifyContent={{ xs: "center", lg: "center" }} alignItems={{ xs: "center", lg: "start" }} >
                {
                   blogs?.map(blog => (<Grid key={blog.blogId} item xs={11} sm={10} md={6} lg={4}>
                        <BlogCard  blog={blog} />
                    </Grid>)
                    )
                }
            </Grid>


        </>
    )
}

export default BlogCardList