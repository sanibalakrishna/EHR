"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Web3walletContext } from "@/hooks/web3wallet";

function Page() {
  const { type, walletConnected, address } = useContext(Web3walletContext);
  const [patientid, setPatientId] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (type == "patient") {
      setPatientId(address);
    }

    if (!walletConnected && type != "patient") {
      router.push("/patient/login");
    }
  }, []);

  return (
    <div className="flex min-h-screen md:min-h-[calc(100vh-_4.3rem)] flex items-center justify-between  bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse z-auto">
        <img
          src="/patientpage.png"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Your Health, Our Priority</h1>
          <p className="py-6">
            We are dedicated to providing you with the best care for your health
            needs. Your well-being is our top priority, and we're here to
            support you every step of the way.
          </p>
          <button className="btn btn-primary">Explore Your Health</button>
        </div>
      </div>
    </div>
  );
}

export default Page;
