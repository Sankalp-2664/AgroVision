"use client";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const WeatherPage = () => {
  useEffect(() => {
    redirect("/weather/analysis");
  }, []);
  return;
};

export default WeatherPage;
