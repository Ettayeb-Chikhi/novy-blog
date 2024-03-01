'use client';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';
import WavingHandTwoToneIcon from '@mui/icons-material/WavingHandTwoTone';
import Divider from '@mui/material/Divider';
const UserMenu = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const logout = () => {
        localStorage.removeItem("token");
        signOut();
    }
    const user = useSelector(state => state.user)
    return (
        <>
            <Avatar onClick={handleOpenUserMenu} sx={{ width: 50, height: 50 }} src={user.profilePic} />
            <Menu
                sx={{ mt: '45px' }}
                PaperProps={{
                    style: {
                        minWidth: "200px"
                    }
                }}
                component="div"
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >

                <MenuItem sx={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
                    <span>Welcome , <span className='username'>{user.username}</span></span> <WavingHandTwoToneIcon color='warning' fontSize='large' />
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseUserMenu}>
                    <Button sx={{ color: "black", fontWeight: "600" }} >Profile</Button>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Button sx={{ color: "black", fontWeight: "600" }} >Write</Button>
                </MenuItem>
                <MenuItem onClick={logout}>
                    <Button sx={{ color: "black", fontWeight: "600" }} >Logout</Button>
                </MenuItem>

            </Menu>

        </>
    )
}

export default UserMenu