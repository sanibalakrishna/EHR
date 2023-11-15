"use client";
import React, { useContext, useState } from "react";
import { Contract, ethers } from "ethers";
import {
  NEW_BILL_CONTRACT_ADDRESS,
  NEW_INSURANCE_CONTRACT_ADDRESS,
  bill_abi,
  insurance_abi,
} from "@/constants";
import { Web3walletContext } from "@/hooks/web3wallet";

const Page = () => {
  const { getProviderOrSigner, setLoading } = useContext(Web3walletContext);
  const [data, setData] = useState({
    name: "",
    patientId: "",
    disease: "",
    billAmount: 0,
    status: "Alive",
  });

  const handleAddBill = async (e) => {
    e.preventDefault();
    try {
      const signer = await getProviderOrSigner(true);
      const billContract = new Contract(
        NEW_BILL_CONTRACT_ADDRESS,
        bill_abi,
        signer
      );
      const billId = await billContract.createBill(
        data.patientId,
        data.name,
        data.disease,
        data.billAmount,
        {
          gasLimit: 500000,
          gasPrice: ethers.parseUnits("100", "gwei"),
        }
      );

      if (data.status == "Dead") {
        const insuraceContract = new Contract(
          NEW_INSURANCE_CONTRACT_ADDRESS,
          insurance_abi,
          signer
        );
        const cliamLifeinsurance =
          await insuraceContract.submitLifeInsuranceClaim(
            "billid",
            "amount",
            signer.address,
            {
              gasLimit: 500000,
              gasPrice: ethers.parseUnits("100", "gwei"),
            }
          );
      }
      console.log(billId);
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
              <span class="label-text">Patient Id</span>
            </label>
            <input
              type="text"
              placeholder="name"
              name="patientId"
              class="input input-bordered"
              required
              onChange={handleChange}
              value={data.patientId}
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Disease</span>
            </label>
            <select
              className="select select-bordered"
              value={data.disease}
              onChange={handleChange}
              name="disease"
            >
              <option disabled selected>
                Disease
              </option>
              <option value={1}>Fever</option>
              <option value={2}>HeadAche</option>
              <option value={3}>Heart Attack</option>
              <option value={4}>Cancer</option>
              <option value={5}>Accident</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Bill Amount</span>
            </label>
            <input
              type="number"
              placeholder="Phone Number"
              class="input input-bordered"
              value={data.billAmount}
              onChange={handleChange}
              name="billAmount"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Status</span>
            </label>
            <select
              className="select select-bordered"
              value={data.status}
              onChange={handleChange}
              name="status"
            >
              <option disabled selected>
                Disease
              </option>
              <option value={"Alive"}>Alive</option>
              <option value={"Dead"}>Dead</option>
            </select>
          </div>

          <div class="form-control mt-6">
            <button
              class="btn btn-primary"
              onClick={(e) => {
                handleAddBill(e);
              }}
            >
              Generate Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
