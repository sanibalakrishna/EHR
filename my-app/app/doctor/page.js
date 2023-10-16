"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Web3walletContext } from "@/hooks/web3wallet";

function page() {
  const { type, walletConnected, address } = useContext(Web3walletContext);
  const [doctorid, setDoctorid] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (type == "doctor") {
      setDoctorid(address);
    }

    if (!walletConnected && type != "doctor") {
      router.push("/doctor/login");
    }
  }, []);
  return (
    <div className="flex min-h-screen md:min-h-[calc(100vh-_4.3rem)] ">
      <div className="hero-content flex-col lg:flex-row z-auto">
        <img
          src="/doctorpage.png"
          className="max-w-sm rounded-lg shadow-2xl"
          alt="Doctor Image"
        />
        <div>
          <h1 className="text-5xl font-bold">Welcome to Our Doctor Panel</h1>
          <p className="py-6">
            Our dedicated team of healthcare professionals is here to provide
            you with top-quality medical care. We are committed to your
            well-being and are always ready to assist you with any health
            concerns and you being part of it is great.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default page;
