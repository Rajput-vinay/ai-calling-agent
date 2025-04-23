"use client";
import { useEffect, useRef } from "react";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange?: (value: string) => void;
}

export function OtpInput({ length = 4, value, onChange }: OtpInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (val: string, index: number) => {
    if (!/^[0-9]?$/.test(val)) return;

    const newOtp = value.split("");
    newOtp[index] = val;
    const joinedOtp = newOtp.join("");
    onChange?.(joinedOtp);

    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      const newOtp = value.split("");
      newOtp[index - 1] = "";
      onChange?.(newOtp.join(""));
      inputsRef.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (value.length > length) {
      onChange?.(value.slice(0, length));
    }
  }, [value, length, onChange]);

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
            value={value[i] || ""}
            placeholder="-"
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="lg:w-16 w-12 h-12 text-center text-xl rounded-lg border border-[rgba(39, 39, 39, 1)] bg-[rgba(39, 39, 39, 1)] text-white focus:outline-none focus:ring-2 focus:ring-[#63FBEF]"
          />
        ))}
    </div>
  );
}
