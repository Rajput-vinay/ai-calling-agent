import { LeftNavbar } from "@/component/LeftNavbar"; // Ensure the correct path to the LeftNavbar component
import { ReactNode } from "react";
interface DashboardLayoutProps {
    children: ReactNode;
  }
  
export default function DashboardLayout({ children }:DashboardLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#121212] text-white overflow-x-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-[250px] bg-[#1c1c1c]  md:sticky top-0 z-60">
        <LeftNavbar />
      </div>

      {/* Main content (children will be rendered here) */}
      <div className="flex-1 p-4 w-full md:max-w-[calc(100%-250px)] mx-auto">
        {children}
      </div>
    </div>
  );
}
