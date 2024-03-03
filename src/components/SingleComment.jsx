
import styled from '@mui/material/styles/styled';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography'


const CommentContainer = styled("div")(({theme})=>({
    display:"flex",
    flexDirection:"column",
    gap:10,
    marginBottom:10,
    backgroundColor:"white",
    padding:10,
    borderRadius : "10px 15px 0 13px" ,
    boxShadow:`12px 12px 30px -7px rgba(23,4,4,0.75);
    -webkit-box-shadow: 12px 12px 30px -7px rgba(23,4,4,0.75);
    -moz-box-shadow: 12px 12px 30px -7px rgba(23,4,4,0.75)`,
    [theme.breakpoints.down("xl")]:{
        width:"80%",
    },
    [theme.breakpoints.down("sm")]:{
        maxWidth:"300px",
    }

}))

const UserInfo = styled("div")(({theme})=>({
    display:"flex",
    gap:10,
    alignItems:"center"
}))

const SingleComment = ({comment}) => {
  return (
    <CommentContainer>
        <UserInfo >
            <Avatar src={comment.user.profilePic} />
            <h4>{comment.user.username} </h4>
            <span>,{comment.commentDate} </span>
        </UserInfo>
        <Typography variant="span" >
            {comment.user.bio}
        </Typography>
        <Typography variant='h6' component="p">
            {comment.comment}
        </Typography>
    </CommentContainer>
  )
}

export default SingleComment