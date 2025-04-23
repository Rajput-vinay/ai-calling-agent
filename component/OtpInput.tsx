"use client";
import { useState, useRef } from "react";

interface OtpInputProps {
  length?: number;
}

export function OtpInput({ length = 4 }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-4 mb-6">
      {Array(length)
        .fill("")
        .map((_, i) => (
          <input
            key={i}
            ref={(el) => {
                inputsRef.current[i] = el;
              }}
            type="text"
            maxLength={1}
            value={otp[i]}
            placeholder="-"
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="lg:w-16 w-12 h-12 text-center text-xl rounded-lg border border-[rgba(39, 39, 39, 1)] bg-[rgba(39, 39, 39, 1)] text-white focus:outline-none focus:ring-2 focus:ring-[#63FBEF]"
          />
        ))}
    </div>
  );
}
