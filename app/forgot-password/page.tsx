"use client"

import { AuthComponent } from "@/sharedComponent/AuthComponent";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios"
export default function page() {
    const router = useRouter()
    const [emailId,setEmailId] = useState('')
    const [error, setError] = useState("");
    const clickHandler = async () =>{
       
        try{
              const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/user/forgot-password`,{
                    emailId,
              });
              if (response.status === 200) {
            
                alert(response.data.message);
                router.push(`/otp-verification?emailId=${encodeURIComponent(emailId)}`)
                
              }
                }catch (error:any) {
                  setError(error.response?.data?.message || 'Something went wrong');
                }
    }

    return (
       <AuthComponent 
        title={"Forgot Password"}
        para={"Provide your email address to initiate the password "}
        para2={"reset."}
        isForget={true}
        onClick={clickHandler}
        emailId={emailId}
        setEmailId={setEmailId}
       />
    )
}