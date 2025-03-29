import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full px-4">
      <div className="flex justify-center items-center h-full w-full bg-[#0f0f0f]">
      <Toaster />
        {children}
      </div>
      <div className="hidden md:flex justify-center items-center h-full w-full bg-[#f8f8f8]">
        <Image src="/logo.svg" className="w-auto h-auto" width={200} height={200} alt="logo" />
      </div>
    </div>
  );
};

export default Layout;
