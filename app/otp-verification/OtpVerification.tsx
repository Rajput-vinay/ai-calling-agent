"use client";
import { Button } from "@/component/Button";
import { Input } from "@/component/Input";
import { OtpInput } from "@/component/OtpInput";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {toast} from "react-toastify"
export function OTPVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [seconds,setSeconds] = useState(30)
  const email = searchParams.get("emailId") || "";

  const handleOtpChange = (val: string) => {
    setOtp(val);
  };

    useEffect(()=>{
      if(seconds === 0) return;
      const interval = setInterval(() => setSeconds(prev => prev-1),1000)
      return () => clearInterval(interval)
    },[seconds])

      const handleResendOtp = async ()=>{
        try{
          const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/user/resend-otp`,{
            emailId:email,
          })
          if(response.status === 200){
            toast.success("OTP resent successfully");
            setSeconds(30);
          }
        }catch(err:any){
          toast.error("Failed to resend OTP")
        }  
      }

  const clickHandler = async () => {
    if (!otp || otp.length < 4) {
      toast.warning("Please enter a vaild OTP")
      return;
    }

    try {
      setLoading(true);
      

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/user/verify-otp`,
        {
          emailId: email,
          otp,
        }
      );

      if (response.status === 200) {
        router.push(`/reset-password?emailId=${encodeURIComponent(email)}`)
        toast.success("OTP verified successfully");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row-reverse w-full min-h-screen">
      {/* Left section */}
      <div className="bg-[#0A0A0A] w-full md:w-1/2 flex justify-center items-center p-6 md:p-10">
        <div className="bg-[#27272780] w-full max-w-xl rounded-3xl p-6 flex flex-col items-center z-10 relative overflow-hidden">
          {/* Star Decorations */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "400px",
              height: "400px",
              top: "-250px",
              right: "-200px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(99, 251, 239, 1) 0%, rgba(0,0,0,0.2) 60%, transparent 80%)",
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
              background:
                "url('/assets/authImage/star1.png') no-repeat center center",
              backgroundSize: "contain",
            }}
          />
          <div
            className="absolute top-8 left-[30rem] z-10"
            style={{
              width: "12px",
              height: "12px",
              background:
                "url('/assets/authImage/star2.png') no-repeat center center",
              backgroundSize: "contain",
            }}
          />
          <div
            className="absolute top-14 left-[34rem] z-10"
            style={{
              width: "12px",
              height: "12px",
              background:
                "url('/assets/authImage/star3.png') no-repeat center center",
              backgroundSize: "contain",
            }}
          />

          {/* OTP Form Content */}
          <h2 className="text-[#63FBEF] text-4xl md:text-5xl text-center mb-6 mt-4">
            Verification
          </h2>

          <p className="text-sm text-center mb-2">
            Check your email for the OTP and enter it here to proceed.
          </p>

          <div className="mb-4">
            <OtpInput value={otp} onChange={handleOtpChange} />
          </div>

          

          <div className="mb-6 w-full flex justify-center">
            <Button text={loading ? "Verifying..." : "Verify and Continue"} onClick={clickHandler} />
          </div>

          <p className="text-[#63FBEF] mb-6">
          {seconds <10 ? `00:0${seconds}` : `00:${seconds }`}<span className="text-sm font-semibold text-white">secs</span>
          </p>
          <p className="text-sm font-semibold text-white text-center">
            Didn’t receive OTP yet?{" "}
            <span className="text-[#63FBEF] cursor-pointer hover:underline" onClick={handleResendOtp}>Resend</span>
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="bg-[#1C1C1C] w-full md:w-1/2 relative flex flex-col justify-center items-center text-center p-6 md:p-10 overflow-hidden">
        <h2 className="text-[#63FBEF] text-3xl md:text-5xl mb-6">
          Welcome to AI Calling Agent
        </h2>
        <p className="text-lg md:text-xl font-medium">
          Access your call queue, scripts, and performance tools—all in one place.
        </p>

        <Image
          src="/assets/authImage/robot3.png"
          alt="robot"
          width={240}
          height={180}
          className="mx-auto z-10"
        />

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
