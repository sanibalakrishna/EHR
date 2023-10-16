"use client";
import React, { useState, useContext } from "react";
import { Contract, ethers } from "ethers";
import {
  NEW_DOCTRO_CONTRACT_ADDRESS,
  NEW_PATIENT_CONTRACT_ADDRESS,
  doctor_abi,
  patient_abi,
} from "@/constants";
import { Web3walletContext } from "@/hooks/web3wallet";

function page() {
  const { getProviderOrSigner, setLoading } = useContext(Web3walletContext);
  const [patientid, setPatientid] = useState("");
  const [file, setFile] = useState();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFileUpload = async () => {
    const formdata = new FormData();
    formdata.append("file", file);
    try {
      const response = await fetch("/fileupload", {
        method: "POST",
        body: formdata,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("File uploaded successfully");
        console.log("Response data:", data);

        const signer = await getProviderOrSigner(true);
        const patientContract = new Contract(
          NEW_PATIENT_CONTRACT_ADDRESS,
          patient_abi,
          signer
        );
        const addresult = await patientContract.addReceivedFile(
          patientid,
          signer.address,
          data.res.IpfsHash
        );
        // console.log(response);
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("An error occurred while uploading the file", error);
    }
  };
  return (
    <div className="hero min-h-screen md:min-h-[calc(100vh-_4.3rem)] bg-base-200">
      {" "}
      <div class="card flex-shrink-0 w-full max-w-sm md:max-w-2xl shadow-2xl bg-base-100">
        <div class="card-body">
          <h1 className="text-center">Send File</h1>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Patient Id</span>
            </label>
            <input
              type="text"
              placeholder="Patient Id"
              name="patientid"
              class="input input-bordered"
              onChange={(e) => setPatientid(e.target.value)}
              value={patientid}
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">File</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered "
              onChange={handleFileChange}
            />
          </div>

          <div class="form-control mt-6">
            <button class="btn btn-primary" onClick={() => handleFileUpload()}>
              Send File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
