

"use client";
import { Button } from "@/component/Button";
import { OtpInput } from "@/component/OtpInput";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export function Email() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const email = searchParams.get("emailId") || "";
console.log(email)
  const handleOtpChange = (val: string) => {
    setOtp(val);
  };

  const emailHandler = async () => {
    if (!otp || otp.length < 4) {
      setError("Please enter a valid OTP.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/user/verify-otp`, {
        emailId:email,
        otp
      });
 
      if (response.status === 200) {
        router.push("/dashboard");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* left section */}
      <div className="bg-[#0A0A0A] w-full md:w-1/2 flex justify-center items-center p-6 md:p-10">
        <div className="bg-[#27272780] w-full max-w-xl rounded-3xl p-6 flex flex-col items-center z-10 relative overflow-hidden">
          {/* Stars and glow */}
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

          <h2 className="text-[#63FBEF] text-4xl md:text-5xl text-center mb-6 mt-4">
            Email Verification
          </h2>
          <p className="text-sm text-center mb-8">Enter the OTP sent to your email to proceed.</p>

          <OtpInput value={otp} onChange={handleOtpChange} />

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-6 w-full flex justify-center">
            <Button text={loading ? "Verifying..." : "Verify and Continue"} onClick={emailHandler}  />
          </div>

          <p className="text-[#63FBEF] mb-6">
            00:30 <span className="text-sm font-semibold text-white">secs</span>
          </p>
          <p className="text-sm font-semibold text-white text-center">
            Didn’t receive OTP yet?{" "}
            <span className="text-[#63FBEF] cursor-pointer hover:underline">Resend</span>
          </p>
        </div>
      </div>

      {/* right section */}
      <div className="bg-[#1C1C1C] w-full md:w-1/2 relative flex flex-col justify-center items-center text-center p-6 md:p-10 overflow-hidden">
        <h2 className="text-[#63FBEF] text-3xl md:text-5xl mb-6">
          Welcome to AI Calling Agent
        </h2>
        <p className="text-lg md:text-xl font-medium">
          Access your call queue, scripts, and performance tools—all in one place.
        </p>

        <Image
          src="/assets/authImage/robot1.png"
          alt="robot"
          width={300}
          height={240}
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
