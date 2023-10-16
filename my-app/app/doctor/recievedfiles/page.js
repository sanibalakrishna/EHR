"use client";
import React, { useEffect, useState, useContext } from "react";
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
  const [data, setData] = useState([]);

  const getAppointments = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const doctorContract = new Contract(
        NEW_DOCTRO_CONTRACT_ADDRESS,
        doctor_abi,
        signer
      );
      const response = await doctorContract.getRecievedFiles(signer.address);
      console.log(response);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAppointments();
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
              <th>Id</th>
              <th>Patient Id</th>
              <th>File Hash</th>
              <th>File Link</th>
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
                  <div className="font-bold">{item[0]?.toString()}</div>
                </td>
                <td>{item[1]}</td>
                <td>{item[2]}</td>
                <td>
                  <a
                    target="_blank"
                    href={`https://olive-assistant-spider-429.mypinata.cloud/ipfs/${item[2]}`}
                  >
                    File
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default page;
