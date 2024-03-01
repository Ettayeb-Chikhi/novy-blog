"use client"
import Image from "next/image";
import styles from "./page.module.css";
import {useSession} from 'next-auth/react';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  useEffect(()=>{
    console.log(session);
    if(!localStorage.getItem("token") && session.data?.user){
      localStorage.setItem("token",session.data.user.email);
    }
    router.push("/novy-blog")

  },[session])
  return (
   <h1 >Main</h1>
  );
}
