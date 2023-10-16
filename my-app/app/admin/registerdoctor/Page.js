"use client";
import React, { useContext, useState } from "react";
import { Contract, ethers } from "ethers";
import { NEW_DOCTRO_CONTRACT_ADDRESS, doctor_abi } from "@/constants";
import { Web3walletContext } from "@/hooks/web3wallet";

const Page = () => {
  const { getProviderOrSigner, setLoading } = useContext(Web3walletContext);
  const [data, setData] = useState({
    name: "",
    doctorId: "",
    specilization: "",
    gender: "male",
    address: "",
    mobileNumber: "",
  });

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const signer = await getProviderOrSigner(true);
      const doctorContract = new Contract(
        NEW_DOCTRO_CONTRACT_ADDRESS,
        doctor_abi,
        signer
      );
      const doctorId = await doctorContract.addDoctor(
        data.doctorId,
        data.name,
        data.specilization,
        data.gender,
        data.mobileNumber,
        {
          gasLimit: 500000,
          gasPrice: ethers.parseUnits("100", "gwei"),
        }
      );
      console.log(doctorId);
      setLoading(true);

      setLoading(false);
    } catch (err) {
      console.error(err.message);
      // console.error(execution reverted:)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
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
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Doctor Id</span>
            </label>
            <input
              type="text"
              placeholder="name"
              name="doctorId"
              class="input input-bordered"
              required
              onChange={handleChange}
              value={data.doctorId}
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
              name="specilization"
              onChange={handleChange}
              value={data.specilization}
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
              value={data.address}
              name="address"
              onChange={handleChange}
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">PhoneNumber</span>
            </label>
            <input
              type="number"
              placeholder="Phone Number"
              class="input input-bordered"
              value={data.mobileNumber}
              onChange={handleChange}
              name="mobileNumber"
              required
            />
          </div>

          <div class="form-control mt-6">
            <button
              class="btn btn-primary"
              onClick={(e) => {
                handleAddDoctor(e);
              }}
            >
              Register Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
