import type { Metadata } from "next";
import "./globals.css";
import { Kantumruy_Pro } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
const kantumruyPro = Kantumruy_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-kantumruy-pro',
});





export const metadata: Metadata = {
  title: "AI Calling Agent",
  description: "AI Calling Agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${kantumruyPro.variable}`}>
      <body className="font-kantumruy-pro">
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
