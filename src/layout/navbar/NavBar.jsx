"use client"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import styled from '@mui/material/styles/styled';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import CreateIcon from '@mui/icons-material/Create';
import UserMenu from '../user-menu/UserMenu';
import { useSession, signIn } from 'next-auth/react';
import { getUser } from '../../lib/user-service';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/user/user';
import CircularProgress from '@mui/material/CircularProgress';
import './navbar.css';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link'


const StyledAppBar = styled(AppBar)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        marginTop: 0,
        borderRadius: 0,
    },
    marginTop: "15px",
    maxWidth: "900px",
    marginInline: "auto",
    backgroundColor: "white",
    borderRadius: "25px",
    fontWeight: "bold",
    cursor: "pointer"
}))
const BaseButton = styled(Button)(({ theme }) => ({
    padding: 8,
    borderRadius: 20,
    background: "black",
    color: 'white',
    [theme.breakpoints.down("xs")]: {
        flex: 0,
        fontSize: ".7rem",

    },
    "&:hover": {
        border: "1px solid black",
        color: "black",
        backgroundColor: "transparent",
    },
    textTransform: "capitalize",
    fontSize: "1rem",
    flex: .2

}))
const WriteButton = styled(BaseButton)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        display: "none"
    },


}))

const SearchInput = styled(TextField)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        display: "none"
    },
    flex: .5

}))
const NavBar = () => {


    const session = useSession();
    const isAuth = session.status == "authenticated";
    const isLoading = session.status == "loading";
    const router = useRouter();
    const pathName = usePathname();

    const dispatch = useDispatch();
    useEffect(() => {
        const setAuthUser = async () => {
            if (isAuth) {
                const user = await getUser();
                dispatch(setUser(user));
            }
        }
        setAuthUser();

    }, [isAuth])
    const handleSearch = (e) => {
        if (e.key == "Enter" && e.target.value.trim() != "") {
            router.push(`/novy-blog/tag/${e.target.value}`)
        }
    }
    const [term, setTerm] = useState("");
    useEffect(() => {
        const urlAsArray = pathName.split("/");
        setTerm(urlAsArray.includes("tag") ? urlAsArray.pop() : "");
    }, [pathName])
    return (
        <StyledAppBar position="static" >
            <Container maxWidth="lg"  >
                <Toolbar disableGutters sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }} >
                    <Link
                        className="logo"
                        href="/"
                    >
                        NovyBlog
                    </Link>

                    <SearchInput
                        id="search-field"
                        placeholder='search by Tag'
                        onKeyDown={handleSearch}
                        defaultValue={term}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start" sx={{ cursor: "pointer" }}>
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                    {
                        isLoading ? <CircularProgress /> : (
                            isAuth ? (<><WriteButton endIcon={<CreateIcon />} onClick={() => { router.push("/novy-blog/create") }} >Write</WriteButton>
                                <UserMenu /></>) : <BaseButton onClick={signIn}>Login</BaseButton>
                        )
                    }

                </Toolbar>
            </Container>
        </StyledAppBar>
    )
}

export default NavBar