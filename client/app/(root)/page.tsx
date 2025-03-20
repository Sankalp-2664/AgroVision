import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import { Feature } from "./_components/Feature";

export default function Home() {
  return (
    <div className="py-14">
      <Hero />
      <Feature />
    </div>
  );
}
