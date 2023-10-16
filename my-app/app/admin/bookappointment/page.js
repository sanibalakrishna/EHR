"use client";
import React, { useState, useContext } from "react";
import { Contract, ethers } from "ethers";
import {
  NEW_DOCTRO_CONTRACT_ADDRESS,
  NEW_PATIENT_CONTRACT_ADDRESS,
  doctor_abi,
  patient_abi,
} from "@/constants";
import { Web3walletContext } from "@/hooks/web3wallet";
const Page = () => {
  const { getProviderOrSigner, setLoading } = useContext(Web3walletContext);
  const [data, setData] = useState({
    doctorid: "",
    date: "",
    time: "",
    patientid: "",
  });
  const [time, setTime] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    console.log(name, value);
  };

  const formatTime = (time) => {
    const selectedTimeDate = new Date(`1970-01-01T${time}`);
    return selectedTimeDate
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
      .split(":")[0];
  };

  const handleAddAppointment = async (e) => {
    e.preventDefault();
    try {
      const signer = await getProviderOrSigner(true);
      const doctorContract = new Contract(
        NEW_DOCTRO_CONTRACT_ADDRESS,
        doctor_abi,
        signer
      );
      const doctorId = await doctorContract.addAppointment(
        data.doctorid,
        data.date + " " + formatTime(data.time),
        data.patientid,

        {
          gasLimit: 500000,
          gasPrice: ethers.parseUnits("100", "gwei"),
        }
      );
      const patientContractContract = new Contract(
        NEW_PATIENT_CONTRACT_ADDRESS,
        patient_abi,
        signer
      );
      const patientId = await patientContractContract.addAppointment(
        data.patientid,
        data.date + " " + formatTime(data.time),
        data.doctorid,

        {
          gasLimit: 500000,
          gasPrice: ethers.parseUnits("100", "gwei"),
        }
      );

      setLoading(true);

      setLoading(false);
    } catch (err) {
      console.error(err);
      // console.error(execution reverted:)
    }
  };
  return (
    <div className="hero min-h-screen md:min-h-[calc(100vh-_4.3rem)] bg-base-200">
      {" "}
      <div class="card flex-shrink-0 w-full max-w-sm md:max-w-2xl shadow-2xl bg-base-100">
        <form class="card-body">
          <h1 className="text-center">Book Appointment</h1>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Doctor Id</span>
            </label>
            <input
              type="text"
              placeholder="doctor Id"
              name="doctorid"
              class="input input-bordered"
              onChange={handleChange}
              value={data.doctorid}
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Date</span>
            </label>
            <input
              type="date"
              placeholder="date"
              class="input input-bordered"
              onChange={handleChange}
              value={data.date}
              name="date"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Time</span>
            </label>
            <input
              type="time"
              placeholder="date"
              class="input input-bordered"
              name="time"
              value={data.time}
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
              placeholder="Patient Id"
              name="patientid"
              onChange={handleChange}
              value={data.patientid}
              class="input input-bordered"
              required
            />
          </div>

          <div class="form-control mt-6">
            <button class="btn btn-primary" onClick={handleAddAppointment}>
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
