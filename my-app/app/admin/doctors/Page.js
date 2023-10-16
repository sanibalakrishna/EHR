"use client";
import React, { useState, useContext, useEffect } from "react";
import { Contract, ethers } from "ethers";
import { Web3walletContext } from "@/hooks/web3wallet";
import { NEW_DOCTRO_CONTRACT_ADDRESS, doctor_abi } from "@/constants";
const Page = () => {
  const [data, setData] = useState([]);
  const [tempdata, setTempdata] = useState([]);
  const { getProviderOrSigner } = useContext(Web3walletContext);
  const getDoctors = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const doctorContract = new Contract(
        NEW_DOCTRO_CONTRACT_ADDRESS,
        doctor_abi,
        signer
      );
      const response = await doctorContract.getDoctorList();
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
              <th>Name</th>
              <th>Specilization</th>
              <th>Gender</th>
              <th>PhoneNumber</th>
              <th>Address</th>
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
                      <div className="font-bold">{item.value[0]}</div>
                    </div>
                  </div>
                </td>

                <th>{item.value[1]}</th>
                <th>{item.value[2]}</th>
                <th>{item.value[3].toString()}</th>
                <th>{item.value[4].toString()}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
