"use client";
import React, { useState, useContext, useEffect } from "react";
import { Contract, ethers } from "ethers";
import { Web3walletContext } from "@/hooks/web3wallet";
import { NEW_PATIENT_CONTRACT_ADDRESS, patient_abi } from "@/constants";
const Page = () => {
  const [data, setData] = useState([]);
  const [tempdata, setTempdata] = useState([]);
  const { getProviderOrSigner } = useContext(Web3walletContext);
  const getPatients = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const patientContract = new Contract(
        NEW_PATIENT_CONTRACT_ADDRESS,
        patient_abi,
        signer
      );
      const response = await patientContract.getPatientList();
      console.log(response);
      arrangeData(response);
    } catch (error) {
      console.log(error);
    }
  };
  const arrangeData = (data) => {
    let resdata = [];
    for (let i = 0; i < data[0].length; i++) {
      resdata[i] = { key: data[0][i], value: data[1][i] };
    }
    setData(resdata);
  };
  useEffect(() => {
    getPatients();
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
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Address</th>
              <th>Email</th>
              <th>PhoneNumber</th>
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
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src="/tailwind-css-component-profile-5@56w.png"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Balakrishna</div>
                    </div>
                  </div>
                </td>
                <td>
                  22
                  <br />
                  <span className="badge badge-ghost badge-sm">Years</span>
                </td>
                <td>Male</td>
                <th>159 cm</th>
                <th>75 kg</th>
                <th>venkatagirikota,Andhra Pradesh</th>
                <th>sanibalakrishna@gmail.com</th>
                <th>7286811437</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
