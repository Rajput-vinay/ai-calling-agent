'use client'
import { Button } from "@/component/Button";
import { Input } from "@/component/Input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from 'axios';
import {toast} from "react-toastify";
export function Login() {
  const router = useRouter()
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginHandler = async() =>{
    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/user/signin`,{
            emailId,
            password,
            
      });
      if (response.status === 200) {
        const token  = response.data.token
        localStorage.setItem('token',token)
        toast.success(response.data.message)
        router.push("/dashboard");
      }
        }catch (error:any) {
          toast.error(error.response?.data?.message)
        }
        
  }
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Right Section */}
      <div className="bg-[#1C1C1C] w-full md:w-1/2 relative flex flex-col justify-center items-center text-center p-6 md:p-10 overflow-hidden">
        <h2 className="text-[#63FBEF] text-3xl md:text-5xl mb-6">Welcome to AI Calling Agent</h2>
        <p className="text-lg md:text-xl font-medium">Access your call queue, scripts, and</p>
        <p className="text-lg md:text-xl font-medium">performance tools—all in one</p>
        <p className="text-lg md:text-xl font-medium mb-6">place.</p>

        <Image
          src="/assets/authImage/robot2.png"
          alt="robot"
          width={220}
          height={140}
          className="mx-auto z-10"
        />

        <div
          className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none -ml-96 h-40"
          style={{
            backgroundImage: `url('/assets/authImage/Rectangle.png')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            maskImage: "linear-gradient(to top, black 60%, transparent)",
            WebkitMaskImage: "linear-gradient(to top, black 60%, transparent)",
          }}
        />
      </div>

      {/* Left Section  */}
      <div className="bg-[#0A0A0A] w-full md:w-1/2 flex justify-center items-center p-6 md:p-10">
        <div className="bg-[#27272780] w-full max-w-xl rounded-3xl p-6 flex flex-col items-center z-10 relative overflow-hidden">
          <div
            className="absolute pointer-events-none"
            style={{
              width: "400px",
              height: "400px",
              top: "-250px",
              right: "-200px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99, 251, 239, 1) 0%, rgba(0,0,0,0.2) 60%, transparent 80%)",
              filter: "blur(60px)",
              opacity: 0.6,
              zIndex: 0,
            }}
          />

          <div
            className="absolute top-3 left-[33rem] z-10"
            style={{
              width: "24px",
              height: "24px",
              background: "url('/assets/authImage/star1.png') no-repeat center center",
              backgroundSize: "contain",
            }}
          />

          <div
            className="absolute top-8 left-[30rem] z-10"
            style={{
              width: "12px",
              height: "12px",
              background: "url('/assets/authImage/star2.png') no-repeat center center",
              backgroundSize: "contain",
            }}
          />

          <div
            className="absolute top-14 left-[34rem] z-10"
            style={{
              width: "12px",
              height: "12px",
              background: "url('/assets/authImage/star3.png') no-repeat center center",
              backgroundSize: "contain",
            }}
          />

          <h2 className="text-[#63FBEF] text-4xl md:text-5xl text-center mb-6 mt-4">Log In</h2>

          <div className="mb-4 w-full flex justify-center">
            <Input placeholder="Email" logo="/assets/InputIcon/message.png" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
          </div>
          <div className="mb-4 w-full flex justify-center">
            <Input  type={showPassword ? "text" : "password"}
            placeholder="Password" logo="/assets/InputIcon/lock.png" logo2={showPassword ? "/assets/InputIcon/eyeClose.png" : "/assets/InputIcon/eyeOpen.png"}  
            onIcon2Click={() => setShowPassword((prev) => !prev)}
            value={password} onChange={(e) => setPassword(e.target.value)}/>
            
          </div>

          <div className="mb-4 w-full flex justify-end lg:mr-22">
          <p className="text-sm cursor-pointer hover:underline" onClick={() => router.push("/forgot-password")}>Forgot password?</p>
          </div>
          

          <div className="mb-6 w-full flex justify-center">
            <Button text="Log In" onClick={loginHandler} />
          </div>

          {/* <p className="text-sm text-white text-center">
          Don’t have an account? {" "}
            <span className="text-[#63FBEF] cursor-pointer hover:underline" onClick={()=> router.push("/signup")}>Sign Up?</span>
          </p> */}
        </div>
      </div>
    </div>
  );
}