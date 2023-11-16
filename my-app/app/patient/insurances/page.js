"use client";
import React, { useState, useContext, useEffect } from "react";
import { Contract, ethers } from "ethers";
import { Web3walletContext } from "@/hooks/web3wallet";
import { NEW_INSURANCE_CONTRACT_ADDRESS, insurance_abi } from "@/constants";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  const [data, setData] = useState(["address", ""]);
  const [healthinsurance, setHealthinsurance] = useState(["address", ""]);
  const [tempdata, setTempdata] = useState([]);
  const { getProviderOrSigner } = useContext(Web3walletContext);
  const [diseases, setDiseases] = useState([
    "Temp",
    "Fever",
    "Head Ache",
    "Heart Attack",
    "Cancer",
    "Accident",
  ]);
  const getInsurances = async () => {
    try {
      console.log("Hello");
      const signer = await getProviderOrSigner(true);
      const insuraceContract = new Contract(
        NEW_INSURANCE_CONTRACT_ADDRESS,
        insurance_abi,
        signer
      );
      const response = await insuraceContract.getLifeInsurance(signer.address);
      const health = await insuraceContract.getHealthInsurance(signer.address);
      console.log(health);
      setHealthinsurance(health);

      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePay = (id) => {
    router.push(`/patient/paybill/${id}`, {
      state: {
        data: "some data",
      },
    });
  };

  const handlePayInsurances = async (type) => {
    try {
      const signer = await getProviderOrSigner(true);
      const insuraceContract = new Contract(
        NEW_INSURANCE_CONTRACT_ADDRESS,
        insurance_abi,
        signer
      );

      if (type == "life") {
        const response = await insuraceContract.payLifePremium(signer.address, {
          value: 10000000000000,
        });
        console.log(response);
      } else {
        const response = await insuraceContract.payHealthPremium(
          signer.address,
          {
            value: 1000,
          }
        );
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInsurances();
  }, []);
  return (
    <div className=" min-h-screen md:min-h-[calc(100vh-_4.3rem)] bg-base-200">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Type</th>
              <th>Nominee Name</th>
              <th>Nominee Address</th>
              <th>Premium Amount</th>
              <th>Coverage Amount</th>
              <th>Bought time</th>
              <th>Tenture</th>
              <th>Balance</th>
              {data[7] != data[6] && <th>Payment</th>}
            </tr>
          </thead>
          <tbody>
            {data[1]?.toString() != "" && (
              <tr>
                <th>Life </th>
                <th>{data[3]?.toString()}</th>
                <th>{data[2]?.toString()}</th>
                <th>{data[4]?.toString()}</th>
                <th>{data[5]?.toString()}</th>
                <th>
                  {new Date(data[8]?.toString() * 1000).toLocaleTimeString() +
                    " " +
                    new Date(data[8]?.toString() * 1000).toDateString()}
                </th>
                <th>{data[7]?.toString() + "/" + data[6]?.toString()}</th>
                <th>{data[9]?.toString()}</th>
                {data[7] != data[6] && (
                  <th>
                    <button
                      className="btn btn-success  btn-sm px-5"
                      onClick={() => handlePayInsurances("life")}
                    >
                      Pay
                    </button>
                  </th>
                )}{" "}
              </tr>
            )}
            {healthinsurance[1]?.toString() != "" && (
              <tr>
                <th>Health </th>
                <th>{healthinsurance[3]?.toString()}</th>
                <th>{healthinsurance[2]?.toString()}</th>
                <th>{healthinsurance[4]?.toString()}</th>
                <th>{healthinsurance[5]?.toString()}</th>
                <th>
                  {new Date(
                    healthinsurance[8]?.toString() * 1000
                  ).toLocaleTimeString() +
                    " " +
                    new Date(
                      healthinsurance[8]?.toString() * 1000
                    ).toDateString()}
                </th>
                <th>
                  {healthinsurance[7]?.toString() +
                    "/" +
                    healthinsurance[6]?.toString()}
                </th>
                <th>{healthinsurance[9]?.toString()}</th>
                {healthinsurance[7] != healthinsurance[6] && (
                  <th>
                    <button
                      className="btn btn-success  btn-sm px-5"
                      onClick={() => handlePayInsurances("health")}
                    >
                      Pay
                    </button>
                  </th>
                )}{" "}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
