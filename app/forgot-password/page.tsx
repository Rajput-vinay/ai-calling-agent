"use client"
import { AuthComponent } from "@/sharedComponent/AuthComponent";
import { useRouter } from "next/navigation";

export default function page() {
    const router = useRouter()
    const clickHandler = () =>{
        router.push("/otp-verification")
    }
    return (
       <AuthComponent 
        title={"Forgot Password"}
        para={"Provide your email address to initiate the password "}
        para2={"reset."}
        isForget={true}
        onClick={clickHandler}
       />
    )
}