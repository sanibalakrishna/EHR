"use client";
import { useState, useContext } from "react";
import { Web3walletContext } from "@/hooks/web3wallet";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { type, walletConnected, connectWallet, setType } =
    useContext(Web3walletContext);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    await connectWallet();
    setType("patient");

    router.push("/patient");
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now as Patient!</h1>
          <p className="py-6"></p>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src="/patient.png" alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Patient</h2>
            <p>Login as Patient</p>
            <div className="card-actions">
              {walletConnected && type == "patient" ? (
                <button className="btn btn-primary">Connected</button>
              ) : (
                <button className="btn btn-primary" onClick={handleLogin}>
                  Connect
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
