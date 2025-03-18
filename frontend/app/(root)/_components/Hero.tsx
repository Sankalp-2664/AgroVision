"use client";
import * as THREE from "three";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

import { Cover } from "@/components/ui/cover";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { TypewriterEffectLoop } from "@/components/ui/typewriter-effect";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Model() {
  const { scene } = useGLTF("/model/scene.gltf");
  const modelRef = useRef<THREE.Object3D>(null!);
  const speed = 3;
  const amplitude = 0.5;

  useFrame(({ clock }) => {
    if (modelRef.current) {
      modelRef.current.position.y =
        Math.sin(clock.getElapsedTime() * speed) * amplitude;
    }
  });

  return <primitive object={scene} ref={modelRef} scale={0.5} />;
}

const Hero = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <div>
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white mb-4">
          🌿 Empowering Farmers with AI
          <br />
          <Cover>Revolutionizing agriculture with AI..</Cover>
        </h1>
      </div>
      <p className="text-slate-700 dark:text-gray-50 text-lg max-w-xl mb-8 text-center">
        Join thousands of farmers worldwide who are revolutionizing their
        agricultural practices with cutting-edge technology and data-driven
        insights.
      </p>
      <MaxWidthWrapper>
        <div>
          <TypewriterEffectLoop
            className="text-center text-sm"
            words={[
              "Market Trend Analysis...",
              "AI Crop & Cattle Diagnosis...",
              "Smart Crop Recommendations...",
              "Yield Prediction...",
              "AI Chatbot Support...",
              "Weather Forecasting...",
            ]}
          />
        </div>
      </MaxWidthWrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        <div className="p-4 bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-lg">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            98%
          </div>
          <div className="text-gray-700 dark:text-emerald-300">
            Accuracy Rate
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-lg">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            10k+
          </div>
          <div className="text-gray-700 dark:text-emerald-300">
            Active Farms
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-lg">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            35%
          </div>
          <div className="text-gray-700 dark:text-emerald-300">Water Saved</div>
        </div>
      </div>

      <div className="mt-8 flex flex-row space-x-4">
        <Link href="/auth/register">
          <Button size={"lg"}>Get Started</Button>
        </Link>
        <Button variant={"outline"} size={"lg"}>
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default Hero;
