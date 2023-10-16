"use client";
import { NEW_DOCTRO_CONTRACT_ADDRESS, doctor_abi } from "@/constants";
import { Web3walletContext } from "@/hooks/web3wallet";
import React, { useContext, useState } from "react";
import { Contract } from "ethers";
const Page = () => {
  const { getProviderOrSigner } = useContext(Web3walletContext);
  const [doctorid, setDoctorId] = useState("");
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
        const doctorContract = new Contract(
          NEW_DOCTRO_CONTRACT_ADDRESS,
          doctor_abi,
          signer
        );
        const addresult = await doctorContract.addRecievedFiles(
          doctorid,
          signer.address,
          data.res.IpfsHash
        );
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
              <span class="label-text">Type</span>
            </label>
            <select className="select select-bordered">
              <option disabled selected>
                Type
              </option>
              <option value={"doctor"}>Doctor</option>
              <option value={"nominee"}>Nominee</option>
              <option value={"others"}>Others</option>
            </select>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Reciever Address</span>
            </label>
            <input
              type="text"
              placeholder="Reciever Address"
              name="receiverAddress"
              class="input input-bordered"
              onChange={(e) => setDoctorId(e.target.value)}
              value={doctorid}
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
};

export default Page;
