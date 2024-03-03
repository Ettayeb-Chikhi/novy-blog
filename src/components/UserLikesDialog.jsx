import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import styled from '@mui/material/styles/styled';
import Avatar from '@mui/material/Avatar';

const UserInfo = styled("div")(({theme})=>({
    display:"flex",
    gap:"10px",
}))

const UserLikesDialog = ({ handleClose, open,users }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                People who find this post interesting
            </DialogTitle>
            <DialogContent>
                {
                    users?.map(user=>(
                        <UserInfo>
                                <Avatar src={user.profilePic} />
                                <div>
                                    <h4>{user.username}</h4>
                                    <p>{user.bio}</p>
                                </div>
                        </UserInfo>
                    ))
                }
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color="primary"
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UserLikesDialog