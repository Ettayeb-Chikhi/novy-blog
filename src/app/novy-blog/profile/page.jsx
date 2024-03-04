"use client";
import styles from './profile.module.css';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import { useState } from 'react';
import BlogCardList from '../../../components/BlogCardList';
import { getBlogsByUser } from '../../../lib/blgos-service';
import { useQuery } from '@tanstack/react-query';
import Pagination from '@mui/material/Pagination';
import styled from '@mui/material/styles/styled';
import CircularProgress from '@mui/material/CircularProgress';

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  gap: "2rem",
  marginTop: "30px",
  width: "50%",
  marginInline: "auto",
  [theme.breakpoints.down("sm")]:{
    width:"90%",
  }
}))

const ProfilePage = () => {
  const user = useSelector(state => state.user);
  const [page, setPage] = useState(1);
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs", "user", user?.userId],
    queryFn: () => getBlogsByUser(user?.userId, page - 1),
    placeholderData: (prevData) => prevData
  })
  if (isLoading) {
    return <CircularProgress sx={{marginInline:"auto"}} />
  }
  return (
    <div className={styles.wrapper}>
      <StyledCard >
        <Image src={user.profilePic} alt='profile pic' style={{ objectFit: "cover" }} height={200} width={200} />
        <div className={styles.userInfo}>
          <h3>{user.username}</h3>
          <p>{user.bio}</p>
          <p>{user.birthDate}</p>
        </div>
      </StyledCard>
      {
        data.content?.length > 0 ? <>
          <BlogCardList blogs={data.content} />
          <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
            <Pagination count={data?.totalPages} page={page} onChange={(e, value) => setPage(value)} />
          </div>
        </> : <NotFound />
      }
    </div>
  )
}

export default ProfilePage