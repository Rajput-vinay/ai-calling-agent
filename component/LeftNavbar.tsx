"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { headers } from "next/headers";
interface User {
  _id: string;
  username: string;
  emailId: string;
  phone_number?: string;
  isVerified: boolean;
  role: 'admin' | 'user' ; // add or change roles as needed
}
export function LeftNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(res.data.user); // assuming your API returns { user: {...} }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
  
    fetchUser();
  }, []);

  console.log("user",user)

  const navItems = [
    {
      label: "Dashboard",
      icon: "/assets/dashboard/home.png",
      routes: "/dashboard",
    },
    {
      label: "Prospect Management",
      icon: "/assets/dashboard/prospect.png",
      routes: "",
    },
    {
      label: "Campaign Management",
      icon: "/assets/dashboard/compaign.png",
      routes: "",
    },
  ];

  // 👇 Conditionally add item if user is admin
  if (user?.role === "admin") {
    navItems.push({
      label: "Create Prompt",
      icon: "/assets/dashboard/compaign.png",
      routes: "/dashboard/create-prompt",
    });
  }

  return (
    <>
      {isMobile && (
        <div className="p-4 bg-[#1c1c1c] flex justify-between items-center sticky top-0 z-100">
          <h1 className="text-[#63FBEF] text-xl font-semibold">AI Calling Agent</h1>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
          </button>
        </div>
      )}

      <div
        className={`bg-[#1c1c1c] text-white transition-transform duration-300 ease-in-out z-50 ${
          isMobile
            ? `fixed top-0 left-0 h-full w-4/5 sm:w-2/5 ${isOpen ? "translate-x-0" : "-translate-x-full"}`
            : "hidden md:flex md:flex-col md:sticky md:top-0 md:w-[250px] md:h-screen"
        }`}
      >
        <div className="flex items-center justify-center pt-6 gap-2">
          <Image src={"/assets/dashboard/logo.png"} alt="Logo" height={20} width={20} />
          <h1 className="text-[#63FBEF] text-2xl font-bold">AI Calling Agent</h1>
        </div>

        <nav className="mt-12 flex flex-col gap-2 px-4">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-4 py-3 hover:bg-[#63FBEF26] hover:rounded-2xl cursor-pointer transition-all"
            >
              <Image src={item.icon} alt={item.label} width={22} height={22} className="mt-1" />
              <Link href={item.routes}>
                <span className="text-md">{item.label}</span>
              </Link>
            </div>
          ))}
        </nav>
      </div>

      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}
