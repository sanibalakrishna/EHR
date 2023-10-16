"use client";
import React, { useState, useContext, useEffect } from "react";
import { Contract, ethers } from "ethers";
import { Web3walletContext } from "@/hooks/web3wallet";
import { NEW_DOCTRO_CONTRACT_ADDRESS, doctor_abi } from "@/constants";

function page() {
  const [data, setData] = useState({
    name: "",
    specilization: "",
    gender: "male",
    address: "",
    mobileNumber: "",
  });
  const [tempdata, setTempdata] = useState([]);
  const { getProviderOrSigner } = useContext(Web3walletContext);

  const updateDoctor = async (e) => {
    e.preventDefault();
    try {
      const signer = await getProviderOrSigner(true);
      const doctorContract = new Contract(
        NEW_DOCTRO_CONTRACT_ADDRESS,
        doctor_abi,
        signer
      );
      console.log(signer.address);
      const response = await doctorContract.updateDoctor(
        signer.address,
        data.name,
        data.specilization,
        data.gender,
        data.mobileNumber,
        {
          gasLimit: 500000,
          gasPrice: ethers.parseUnits("100", "gwei"),
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const getDoctor = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const doctorContract = new Contract(
        NEW_DOCTRO_CONTRACT_ADDRESS,
        doctor_abi,
        signer
      );

      const response = await doctorContract.getDoctor(signer.address);

      arrangeData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const arrangeData = (data) => {
    let reskeys = [
      "name",
      "specilization",
      "gender",
      "mobileNumber",
      "address",
    ];
    let tempdata = { ...data };
    for (let i = 0; i < data.length; i++) {
      tempdata[reskeys[i]] = data[i].toString();
    }
    setData(tempdata);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    getDoctor();
  }, []);
  return (
    <div className="hero min-h-screen md:min-h-[calc(100vh-_4.3rem)] bg-base-200">
      {" "}
      <div class="card flex-shrink-0 w-full max-w-sm md:max-w-2xl shadow-2xl bg-base-100">
        <form class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              name="name"
              class="input input-bordered"
              required
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Specilization</span>
            </label>
            <input
              type="text"
              placeholder="age"
              class="input input-bordered"
              required
              value={data.specilization}
              name="specilization"
              onChange={handleChange}
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Gender</span>
            </label>
            <select
              className="select select-bordered"
              value={data.gender}
              onChange={handleChange}
              name="gender"
            >
              <option disabled selected>
                Gender
              </option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
              <option value={"others"}>Others</option>
            </select>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Address</span>
            </label>
            <input
              type="text"
              placeholder="Address"
              class="input input-bordered"
              required
              name="address"
              value={data.address}
              onChange={handleChange}
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">PhoneNumber</span>
            </label>
            <input
              type="number"
              placeholder="Phone Number"
              name="mobileNumber"
              class="input input-bordered"
              required
              value={data.mobileNumber}
              onChange={handleChange}
            />
          </div>

          <div class="form-control mt-6">
            <button class="btn btn-primary" onClick={updateDoctor}>
              Update Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
