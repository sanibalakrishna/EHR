"use client";
import React, { useState, useContext, useEffect } from "react";
import { Contract, ethers } from "ethers";
import { Web3walletContext } from "@/hooks/web3wallet";
import { NEW_PATIENT_CONTRACT_ADDRESS, patient_abi } from "@/constants";

function Page() {
  const [data, setData] = useState({
    name: "",
    age: "",
    gender: "male",
    height: "",
    weight: "",
    address: "",
    mobileNumber: "",
    emailId: "",
  });

  const { getProviderOrSigner } = useContext(Web3walletContext);

  const updatePatient = async (e) => {
    e.preventDefault();
    try {
      const signer = await getProviderOrSigner(true);
      const patientContract = new Contract(
        NEW_PATIENT_CONTRACT_ADDRESS,
        patient_abi,
        signer
      );

      const response = await patientContract.updatePatient(
        signer.address,
        data.name,
        data.age,
        data.gender,
        data.height,
        data.weight,
        data.address,
        data.mobileNumber,
        data.emailId,
        2023,
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
  const getPatient = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const patientContract = new Contract(
        NEW_PATIENT_CONTRACT_ADDRESS,
        patient_abi,
        signer
      );

      const response = await patientContract.getPatient(signer.address);
      console.log(response);
      arrangeData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const arrangeData = (data) => {
    let reskeys = [
      "name",
      "age",
      "gender",
      "height",
      "weight",
      "address",
      "mobileNumber",
      "emailId",
      "date",
    ];
    let tempdata = {};
    for (let i = 0; i < data.length; i++) {
      tempdata[reskeys[i]] = data[i].toString();
    }
    console.log(tempdata);
    setData(tempdata);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    getPatient();
  }, []);
  return (
    <div className="hero min-h-screen md:min-h-[calc(100vh-_4.3rem)] bg-base-200">
      {" "}
      <div class="card flex-shrink-0 w-full max-w-sm md:max-w-2xl shadow-2xl bg-base-100">
        <form class="card-body">
          <div className="flex flex-col md:flex-row md:gap-12">
            <div>
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
                  <span class="label-text">Age</span>
                </label>
                <input
                  type="number"
                  placeholder="age"
                  class="input input-bordered"
                  required
                  name="age"
                  value={data.age}
                  onChange={handleChange}
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Gender</span>
                </label>
                <select
                  className="select select-bordered"
                  name="gender"
                  value={data.gender}
                  onChange={handleChange}
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
                  <span class="label-text">Height</span>
                </label>
                <input
                  type="number"
                  placeholder="Height"
                  class="input input-bordered"
                  required
                  name="height"
                  value={data.height}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Weight</span>
                </label>
                <input
                  type="number"
                  placeholder="weight"
                  class="input input-bordered"
                  required
                  name="weight"
                  value={data.weight}
                  onChange={handleChange}
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Patient Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Patient Address"
                  class="input input-bordered"
                  required
                  name="address"
                  value={data.address}
                  onChange={handleChange}
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Phone Number</span>
                </label>
                <input
                  type="number"
                  placeholder="phone number"
                  class="input input-bordered"
                  required
                  name="mobileNumber"
                  value={data.mobileNumber}
                  onChange={handleChange}
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="email address"
                  class="input input-bordered"
                  required
                  name="emailId"
                  value={data.emailId}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" onClick={updatePatient}>
              Update Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
