'use client'
import { Button } from "@/component/Button";
import { Input } from "@/component/Input";

import Image from "next/image";
import { useRouter } from "next/navigation";

export function Signup() {
  const router = useRouter()
  const SignupHandler = () =>{
        router.push("/email-verification")
  }
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Left Section */}
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
            className="absolute top-3 left-[33rem]  z-10"
            style={{
              width: "24px",
              height: "24px",
              background: "url('/assets/authImage/star1.png') no-repeat center center",
              backgroundSize: "contain",
            }}
          />
          
          <div
            className="absolute top-8 left-[30rem]  z-10"
            style={{
              width: "12px",
              height: "12px",
              background: "url('/assets/authImage/star2.png') no-repeat center center",
              backgroundSize: "contain",
            }}
          />
          
          <div
            className="absolute top-14 left-[34rem]  z-10"
            style={{
              width: "12px",
              height: "12px",
              background: "url('/assets/authImage/star3.png') no-repeat center center",
              backgroundSize: "contain",
            }}
          />
          
          <h2 className="text-[#63FBEF] text-4xl md:text-5xl text-center mb-6 mt-4">Sign Up</h2>

          <div className="mb-4 w-full flex justify-center">
            <Input placeholder="User Name" logo="/assets/InputIcon/profile.png" />
          </div>
          <div className="mb-4 w-full flex justify-center">
            <Input placeholder="Email ID" logo="/assets/InputIcon/message.png" />
          </div>
          <div className="mb-4 w-full flex justify-center">
            <Input placeholder="Phone Number" logo="/assets/InputIcon/phone.png" />
          </div>
          <div className="mb-4 w-full flex justify-center">
            <Input placeholder="Password" logo="/assets/InputIcon/lock.png" logo2="/assets/InputIcon/eye.png" />
          </div>
          <div className="mb-4 w-full flex justify-center">
            <Input placeholder="Confirm Password" logo="/assets/InputIcon/lock.png" logo2="/assets/InputIcon/eye.png"/>
          </div>

          <div className="mb-6 w-full flex justify-center">
            <Button text="Sign Up" onClick ={SignupHandler}/>
          </div>

          <p className="text-sm text-white text-center">
            Already have an account?{" "}
            <span className="text-[#63FBEF] cursor-pointer hover:underline" onClick={() => router.push("/login")}>Log In</span>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-[#1C1C1C] w-full md:w-1/2 relative flex flex-col justify-center items-center text-center p-6 md:p-10 overflow-hidden">
        <h2 className="text-[#63FBEF] text-3xl md:text-5xl mb-6">Welcome to AI Calling Agent</h2>
        <p className="text-lg md:text-xl font-medium">Access your call queue, scripts, and</p>
        <p className="text-lg md:text-xl font-medium">performance tools—all in one</p>
        <p className="text-lg md:text-xl font-medium mb-6">place.</p>

        <Image
          src="/assets/authImage/robot1.png"
          alt="robot"
          width={300}
          height={240}
          className="mx-auto z-10"
        />

        {/* Gradient-style Bottom Background */}
        <div
          className="absolute bottom-0 left-0 right-0 h-36 z-0 pointer-events-none -ml-64"
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
    </div>
  );
}
