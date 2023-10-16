"use client";
import Image from "next/image";
import { Contract } from "ethers";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useState, useRef, useEffect, useContext } from "react";
require("dotenv").config();
import { DOCTOR_CONTRACT_ADDRESS, doctor_abi } from "@/constants/index";
import { Web3walletContext } from "@/hooks/web3wallet";

export default function Home() {
  const {
    walletConnected,
    loading,
    setLoading,
    connectWallet,
    getProviderOrSigner,
  } = useContext(Web3walletContext);

  const addDoctor = async () => {
    try {
      console.log("Add  Doctor");
      const signer = await getProviderOrSigner(true);
      const doctorContract = new Contract(
        DOCTOR_CONTRACT_ADDRESS,
        doctor_abi,
        signer
      );
      const doctorId = await doctorContract.update_doctor(
        "doc2023d02",
        "balakrishna",
        "ortho",
        "7719494591",
        signer,
        "Bala@143",
        {
          gasLimit: 500000,
          gasPrice: ethers.parseUnits("100", "gwei"),
        }
      );
      console.log(doctorId);
      setLoading(true);

      setLoading(false);
    } catch (err) {
      console.error(err.message);
      // console.error(execution reverted:)
    }
  };

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {};
  const bgImageUrl = "/homebakc.png";

  return (
    <main className="hero min-h-[calc(100vh-_4.3rem)] bg-base-900">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src="/doctor.png" className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold text-neutral-content">
            Electronic Health Records (EHR)
          </h1>
          <p className="py-6 text-neutral-content">
            Electronic Health Records (EHR) are a digital solution to modernize
            healthcare data management. They offer numerous benefits and use
            cases, including:
            <ul className="list-disc pl-5 text-neutral-content">
              <li>
                **Centralized Information:** EHRs store comprehensive patient
                data in one place, making it easily accessible for healthcare
                providers.
              </li>
              <li>
                **Improved Patient Care:** EHRs enhance patient care by
                providing real-time data and facilitating informed clinical
                decisions.
              </li>
              <li>
                **Reduced Errors:** EHRs minimize manual record-keeping errors,
                such as illegible handwriting or lost files.
              </li>
              <li>
                **Interoperability:** EHRs enable data sharing among different
                healthcare systems and providers, enhancing coordination.
              </li>
              <li>
                **Cost Savings:** Streamlined administrative processes and
                reduced duplication lead to cost savings in healthcare.
              </li>
              <li>
                **Patient Empowerment:** Patients can access their records,
                fostering engagement and involvement in their healthcare.
              </li>
            </ul>
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </main>
  );
}
