import { Button } from "@/component/Button";
import { Input } from "@/component/Input";
import Image from "next/image";

interface AuthComponentProps {
  title: string;
  para: string;
  para2?: string;
  isForget?: boolean;
  onClick ?: () => void
  emailId?:string,
  password?:string,
  confirmPassword?:string,
  setConfirmPassword?: (password: string) => void,
  setPassword?: (password: string) => void,
  setEmailId?: (emailId: string) => void
}
export function AuthComponent({
  title,
  para,
  isForget,
  para2,
  onClick,
  password,
  emailId,
  confirmPassword,
  setEmailId,
  setConfirmPassword,
  setPassword,
}: AuthComponentProps) {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Right Section (Now Moved to Left) */}
      <div className="bg-[#1C1C1C] w-full md:w-1/2 relative flex flex-col justify-center items-center text-center p-6 md:p-10 overflow-hidden">
        <h2 className="text-[#63FBEF] text-3xl md:text-5xl mb-6">
          Welcome to AI Calling Agent
        </h2>
        <p className="text-lg md:text-xl font-medium">
          Access your call queue, scripts, and
        </p>
        <p className="text-lg md:text-xl font-medium">
          performance tools—all in one
        </p>
        <p className="text-lg md:text-xl font-medium mb-6">place.</p>

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

      {/* Left Section (Now Moved to Right) */}
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
            {title}
          </h2>

          <div className="mb-1 w-full flex justify-center ">
            <p className="text-md ">{para}</p>
          </div>
          <div className="mb-4 w-full flex justify-center ">
            <p className="text-md ">{para2}</p>
          </div>

          {isForget && (
            <div className="mb-10 w-full flex justify-center">
              <Input placeholder="Email" logo="/assets/InputIcon/message.png" 
              value={emailId || ""}
              onChange={(e)=> setEmailId?.(e.target.value)} 
              />
            </div>
          )}

          {!isForget && (
            <>
              <div className="mb-4 w-full flex justify-center">
                <Input
                  placeholder={"Password"}
                  logo={"/assets/InputIcon/lock.png"}
                  logo2={"/assets/InputIcon/lock.png"}
                  value={password || ""}
                  onChange={(e)=> setPassword?.(e.target.value)} 
                />
              </div>
              <div className="mb-4 w-full flex justify-center">
                <Input
                  placeholder={"Confirm Password"}
                  logo={"/assets/InputIcon/lock.png"}
                  logo2={"/assets/InputIcon/lock.png"}
                  value={confirmPassword || ""}
              onChange={(e)=> setConfirmPassword?.(e.target.value)} 
                />
              </div>
            </>
          )}


          
         

          <div className="mb-6 w-full flex justify-center">
            <Button text={"Send"} onClick={onClick}/>
          </div>

          
        </div>
      </div>
    </div>
  );
}
