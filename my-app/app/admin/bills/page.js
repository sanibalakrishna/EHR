"use client";
import React, { useState, useContext, useEffect } from "react";
import { Contract, ethers } from "ethers";
import { Web3walletContext } from "@/hooks/web3wallet";
import {
  NEW_BILL_CONTRACT_ADDRESS,
  NEW_DOCTRO_CONTRACT_ADDRESS,
  bill_abi,
  doctor_abi,
} from "@/constants";
const Page = () => {
  const [data, setData] = useState([]);
  const [tempdata, setTempdata] = useState([]);
  const { getProviderOrSigner } = useContext(Web3walletContext);
  const [diseases, setDiseases] = useState([
    "Temp",
    "Fever",
    "HeadAche",
    "Heart Attack",
    "Cancer",
    "Accident",
  ]);
  const getDoctors = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const billContract = new Contract(
        NEW_BILL_CONTRACT_ADDRESS,
        bill_abi,
        signer
      );
      const response = await billContract.getAllBillDetailsForAdmin();
      console.log(response);
      arrangeData(response);
    } catch (error) {
      console.log(error);
    }
  };
  const arrangeData = (data) => {
    let resdata = [];

    for (let key in data) {
      resdata.push(data[key]);
    }
    setData(resdata);
  };
  useEffect(() => {
    getDoctors();
  }, []);
  return (
    <div className=" min-h-screen md:min-h-[calc(100vh-_4.3rem)] bg-base-200">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Bill Id</th>
              <th>Patient Id</th>
              <th>Name</th>
              <th>Disease </th>
              <th>Bill Amount</th>
              <th>Ambulance Amount</th>
              <th>Total Amount</th>
              <th>Insurance Amount</th>
              <th>Paid Amount</th>
              <th>Paid Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>{item[1].toString()}</th>
                <th>{item[0].toString()}</th>
                <th>{item[2].toString()}</th>
                <th>{diseases[item[3].toString()]}</th>
                <th>{item[4].toString()}</th>
                <th>{item[8].toString()}</th>
                <th>{parseInt(item[8]) + parseInt(item[4])}</th>
                <th>{item[5].toString()}</th>
                <th>{item[6].toString()}</th>
                <th>{item[7] ? "Paid" : "Pending"}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
