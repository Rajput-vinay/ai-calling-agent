'use client'
import { AuthComponent } from "@/sharedComponent/AuthComponent";
import { useRouter } from "next/navigation";

export default function page() {
    const router = useRouter()

    const clickHandler = () =>{
        router.push("/login")
    }
    return (
        <AuthComponent
            title={"Set a New Password"}
            para={"Set your new password to move forward"}
            isForget={false}
            onClick={clickHandler}
        />
    )
}