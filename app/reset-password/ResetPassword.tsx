'use client'
import { AuthComponent } from "@/sharedComponent/AuthComponent";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {toast} from "react-toastify"
export  function ResetPassword() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
      const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const email = searchParams.get("emailId") || "";
   

    const clickHandler = async () =>{
       
        try{
              const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/user/reset-password`,{
                emailId:email,   
                password,
                confirmPassword
              });
              if (response.status === 200) {
                toast.success(response.data.message)
                router.push(`/login`)
                
              }
                }catch (error:any) {
                  toast.error(error.response?.data?.message)
                }
    }
    return (
       
        <AuthComponent
            title={"Set a New Password"}
            para={"Set your new password to move forward"}
            isForget={false}
            onClick={clickHandler}
            password={password}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            setPassword={setPassword}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            setShowPassword={setShowPassword}
            setShowConfirmPassword={setShowConfirmPassword}
        />
       
    )
}