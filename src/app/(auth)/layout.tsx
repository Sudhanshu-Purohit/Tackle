import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="p-4 max-w-screen-2xl mx-auto">
        <nav className="flex justify-between items-center">
          <Image src="" alt="brand logo" width={152} height={56} />
          <Button variant="secondary"> Sign Up</Button>
        </nav>
      </div>
      <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
        {children}
      </div>
    </main>
  )
}

export default AuthLayout;
