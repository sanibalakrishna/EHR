"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Web3walletContext } from "@/hooks/web3wallet";

const Page = () => {
  const { type, walletConnected, address } = useContext(Web3walletContext);
  const [adminid, setAdminId] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (type == "admin") {
      setAdminId(address);
    }

    if (!walletConnected && type != "admin") {
      router.push("/admin/login");
    }
  }, []);
  return (
    <div className="flex min-h-screen md:min-h-[calc(100vh-_4.3rem)]">
      <div className="hero-content flex-col lg:flex-row z-auto">
        <img
          src="/adminbackground.png"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Admin Dashboard</h1>
          <p className="py-6">
            Welcome to the admin panel, where you can manage and oversee the
            operations of the clinic. You have the power to keep things running
            smoothly and efficiently.
          </p>
          <button className="btn btn-primary">Access Admin Tools</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
