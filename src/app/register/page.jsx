"use client"
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import CardContainer from '../../components/CardContainer';
import CardForm from '../../components/CardForm';
import Toast from '../../components/Toast';
import { signup } from '../../lib/auth-service';
import { uploadFile } from '../../lib/file-upload';
import { getDate } from '../../lib/utils';
import Link from 'next/link';
import "./register.css";
const Register = () => {

  const [open, setOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: signup,
    onSettled: async () => {
      setOpen(true);
    },
    onSuccess: () => {
      router.push("/login")
    }

  })
  const [fileName, setFileName] = useState("/inconnue.png");
  const { register, handleSubmit, control, formState: { errors }, watch } = useForm();
  const router = useRouter();
  let password = watch("password");
  const onSubmit = async (data) => {
    setIsSubmit(true);
    const birthDate = getDate(new Date(data.birthDate.$d));
    const file = data.profilePic[0];
    const profilePic = file ? await uploadFile(`users/${uuidv4()}-${file.name}`, file) : process.env.NEXT_PUBLIC_DEFAULT_IMG_URL;
    const userRequest = {
      ...data,
      profilePic: profilePic,
      birthDate: birthDate,
    }
    delete userRequest.confirmPassword;
    registerMutation.mutate(userRequest);
    setIsSubmit(false)
  }
  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleFileChange = (e) => {
    console.log(e);
    if (e.target.files[0] == undefined) {
      return "/inconnue.png"
    }
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener("load", (ev) => {
      setFileName(ev.target.result);
    })
  }

  return (

    <>

      <CardContainer component="section">
        <Typography variant="h3" component="span" color="#8458B3">
          NovyBlog
        </Typography>
        <CardForm component="form" method="post" onSubmit={handleSubmit(onSubmit)} elevation={6}>
          <Tooltip title="upload your profile picture" placement='top'>
            <Avatar src={fileName} sx={{ width: 70, height: 70, alignSelf: "center", cursor: "pointer" }} component="label" htmlFor='profile-pic' />
          </Tooltip>
          <TextField
            {...register("username", {
              maxLength: 20,
              required: true,
            })}
            label="username"
            error={errors.username != undefined}
            helperText={errors.username && "username is required and it must be 20 charatcers long at most"}
          />
          <TextField
            label="email"
            {...register("email", {
              pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              required: true,
            })}
            error={errors.email != undefined}
            helperText={errors.email && "email is not valid"}

          />
          <Controller
            name='birthDate'
            control={control}
            rules={
              {
                required: true
              }
            }
            render={({ field }) => (
              <>
                <DatePicker format='YYYY-MM-DD'
                  onChange={(date) => field.onChange(date)}

                  maxDate={dayjs().subtract(15, 'year')}
                />
                {errors.birthDate && <span style={{ color: "#d32f2f", fontSize: "12px", fontWeight: "400" }}>This field is required</span>}
              </>
            )}
          />

          <TextField
            label="password"
            {...register("password", {
              minLength: 8,
              required: true,
            })}
            error={errors.password != undefined}
            helperText={errors.password && "Password is required and must be at least 8 characters long"}
          />
          <TextField
            label="repeat password"
            {...register("confirmPassword", {
              minLength: { value: 8, message: "password must be at least 8 characters long" },
              required: "you must confirm password",
              validate: (value) => value === password || "passwords dont match"
            })}
            error={errors.confirmPassword != undefined}
            helperText={errors.confirmPassword && errors.confirmPassword.message}
          />
          <TextField
            label="bio"
            multiline
            rows={3}
            {...register("bio", {
              maxLength: 40,
              required: true,
            })}
            error={errors.bio != undefined}
            helperText={errors.bio && "bio is required and must be at most 40 characters long"}
          />
          <input type="file" accept='image/*' hidden id="profile-pic"  {...register("profilePic", {
            onChange: handleFileChange,
          })} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Button variant="outlined" color="error" type='reset'>
              Reset
            </Button>
            <Button type='submit' variant="contained" color="primary" disabled={registerMutation.isPending || isSubmit}>
              Register
            </Button>
          </Box>
          <Typography variant="span" color="initial">
            Your already have an account ? <Link className='link' href="/login">SignIn</Link>
          </Typography>
        </CardForm>

      </CardContainer>
      {
        registerMutation.status != 'pending' && <Toast open={open} handleClose={handleClose} message={
          registerMutation.isError ? registerMutation.error.response.data.title : "Account created successfully"
        } isError={registerMutation.isError} />}
    </>
  )
}

export default Register;