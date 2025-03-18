import Navbar from "@/components/shared/Navbar";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default RootLayout;
