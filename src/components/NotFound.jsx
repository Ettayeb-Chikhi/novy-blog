import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography'
import Image from 'next/image';
const Container = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: 'column',
    marginTop:30,
    alignItems:"center",
    gap: 10,
    padding: 10
}))



const NotFound = () => {
    return (
        <Container>
            <Typography variant="h4" component="p">
                Sorry we dont have any blogs with that tag
            </Typography>
            <Image src="/not-found.png" width={300} height={300} alt='not-found' />
        </Container>
    )
}

export default NotFound