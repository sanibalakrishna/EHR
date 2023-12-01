"use client";

import React, { useEffect, useRef, useState, useContext } from "react";
import { healthinsurances, lifeinsurances } from "@/constants/insurances";
import { useRouter } from "next/navigation";
import { Web3walletContext } from "@/hooks/web3wallet";
import { Contract, ethers } from "ethers";
import {
  insurance_abi,
  NEW_INSURANCE_CONTRACT_ADDRESS,
  NEW_PATIENT_CONTRACT_ADDRESS,
  patient_abi,
} from "@/constants";
import { ToastContainer, toast } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const { getProviderOrSigner, setLoading, loading } =
    useContext(Web3walletContext);
  const [data, setData] = useState([]);
  const [lifeinsurancedata, setLifeinsurances] = useState([]);
  const [selectedInsurance, setSelectedInsurance] = useState({});
  const [type, setType] = useState("");
  const tempref = useRef();
  const [nominee, setNominee] = useState({ name: "", address: "" });
  const [temploading, setTemploading] = useState(false);
  const closeRef = useRef(null);

  const getData = () => {
    setData(healthinsurances);
    setLifeinsurances(lifeinsurances);
  };

  const handleOpenModal = async (type, id) => {
    setSelectedInsurance(
      type == "healthinsurance" ? healthinsurances[id] : lifeinsurancedata[id]
    );
    setType(type);
  };
  const handleBuyInsurance = async () => {
    try {
      setTemploading(true);
      setLoading(true);
      const signer = await getProviderOrSigner(true);
      const insuraceContract = new Contract(
        NEW_INSURANCE_CONTRACT_ADDRESS,
        insurance_abi,
        signer
      );
      const patientContract = new Contract(
        NEW_PATIENT_CONTRACT_ADDRESS,
        patient_abi,
        signer
      );
      const patientDetails = await patientContract.getPatient(signer.address);
      console.log(patientDetails);

      if (type != "healthinsurance") {
        const response = await insuraceContract.getLifeInsurance(
          signer.address
        );
        if (response[1]?.toString() != "") {
          toast.warn("Life Insurance Already Exists");
          setTemploading(false);
          closeRef.current.click();
          return;
        }

        const insurance = await insuraceContract.registerLifeInsurance(
          signer.address,
          patientDetails[0].toString(),
          nominee.name,
          nominee.address,
          selectedInsurance.premiumamount,
          selectedInsurance.premiumamount,
          selectedInsurance.policyterms,
          {
            value: selectedInsurance.instalments,
            gasLimit: 500000,
            gasPrice: ethers.parseUnits("100", "gwei"),
          }
        );
        console.log(insurance);
      } else {
        const health = await insuraceContract.getHealthInsurance(
          signer.address
        );
        if (health[1]?.toString() != "") {
          toast.warn("Health Insurance Already Exists");
          setTemploading(false);
          closeRef.current.click();
          return;
        }
        console.log("patientDetails", patientDetails[0]?.toString());
        console.log(selectedInsurance, nominee);
        const insurance = await insuraceContract.registerHealthInsurance(
          signer.address,
          patientDetails[0].toString(),
          nominee.name,
          nominee.address,
          selectedInsurance.premiumamount,
          selectedInsurance.percentagecovered,
          selectedInsurance.policyterms,
          selectedInsurance.ambulancecovered,
          selectedInsurance.indexeddiseases,
          {
            value: selectedInsurance.instalments,
            gasLimit: 500000,
            gasPrice: ethers.parseUnits("100", "gwei"),
          }
        );
        console.log(insurance);
      }
      setTemploading(false);
      setLoading(false);
      closeRef.current.click();
    } catch (err) {
      console.log(err.message);
      // console.error(execution reverted:)
    }
  };

  const handleInputChange = (e) => {
    setNominee((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    getData();
  });

  return (
    <div className=" min-h-screen md:min-h-[calc(100vh-_4.3rem)] bg-base-200 py-5 ">
      <h1 className="text-3xl  my-5 pl-5">Health Insurances</h1>
      <div className="flex flex-wrap gap-5 justify-center ">
        {data.map((item, idx) => (
          <div className="card w-96 glass">
            <figure>
              <img src="/home.png" alt="car!" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p>{item.description}</p>
              <p>
                Diseases :
                {item.diseases.map((disease, idx) => (
                  <span>{` ${disease}${
                    idx < item.diseases.length - 1 ? "," : ""
                  }`}</span>
                ))}
              </p>
              <p className="text-lg font-semibold">
                As low as Rs {item.instalments}/year
              </p>
              <p className="text-lg font-semibold">
                Premium Amount : Rs {item.premiumamount}
              </p>
              <p className="text-md ">
                {item.ambulancecovered ? "*Ambulance Amount Covered" : ""}
              </p>
              <p className="text-lg font-semibold">
                Precentage Covered: {item.percentagecovered}%
              </p>
              <div className="card-actions justify-end">
                <label
                  htmlFor="my_modal_6"
                  className="btn"
                  onClick={() => handleOpenModal("healthinsurance", idx)}
                >
                  Buy this
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-3xl my-5 pl-5">Life Insurances</h1>
      <div className="flex flex-wrap gap-5 justify-center ">
        {lifeinsurancedata.map((item, idx) => (
          <div className="card w-96 glass">
            <figure>
              <img src="/home.png" alt="car!" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p>{item.description}</p>

              <p className="text-lg font-semibold">
                As low as Rs {item.instalments}/year
              </p>
              <p className="text-lg font-semibold">
                Premium Amount : Rs {item.premiumamount}
              </p>

              <div className="card-actions justify-end">
                <label
                  htmlFor="my_modal_6"
                  className="btn"
                  onClick={() => handleOpenModal("lifeinsurance", idx)}
                >
                  Buy this
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <input
        type="checkbox"
        id="my_modal_6"
        className="modal-toggle"
        ref={tempref}
      />
      <div className="modal open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{selectedInsurance.name}</h3>
          <p className="py-4">{selectedInsurance.description}</p>

          {selectedInsurance.diseases && (
            <p>
              Diseases :
              {selectedInsurance.diseases.map((disease, idx) => (
                <span>{` ${disease}${
                  idx < selectedInsurance.diseases.length - 1 ? "," : ""
                }`}</span>
              ))}
            </p>
          )}
          <p className="py-4">
            As low as Rs {selectedInsurance.instalments}/year
          </p>
          <p className="">
            {" "}
            Premium Amount : Rs {selectedInsurance.premiumamount}
          </p>
          {selectedInsurance.ambulancecovered && (
            <p className="py-4">
              {" "}
              {selectedInsurance.ambulancecovered
                ? "*Ambulance Amount Covered"
                : ""}
            </p>
          )}
          <input
            type="text"
            placeholder="Nominee Name"
            className="input input-bordered input-sm w-full max-w-xs mb-2"
            name="name"
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Nominee Address "
            className="input input-bordered input-sm w-full max-w-xs "
            name="address"
            onChange={handleInputChange}
          />
          <div className="modal-action justify-around">
            <label htmlFor="my_modal_6" className="btn" ref={closeRef}>
              Close!
            </label>
            <button
              className="btn btn-success"
              onClick={() => handleBuyInsurance()}
            >
              {temploading ? (
                <span className="loading loading-ring loading-md"></span>
              ) : (
                "Buy"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
