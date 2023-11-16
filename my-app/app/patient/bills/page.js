"use client";
import React, { useState, useContext, useEffect } from "react";
import { Contract, ethers } from "ethers";
import { Web3walletContext } from "@/hooks/web3wallet";
import {
  NEW_BILL_CONTRACT_ADDRESS,
  NEW_INSURANCE_CONTRACT_ADDRESS,
  bill_abi,
  insurance_abi,
} from "@/constants";
import { useRouter } from "next/navigation";
const Page = () => {
  const [data, setData] = useState([]);
  const [usehealthinsurance, setUsehealthinsurance] = useState(false);
  const { getProviderOrSigner } = useContext(Web3walletContext);
  const [healthinsurance, setHealthinsurance] = useState([]);
  const [diseases, setDiseases] = useState([
    "Temp",
    "Fever",
    "Head Ache",
    "Heart Attack",
    "Cancer",
    "Accident",
  ]);
  const [paymentdata, setPaymentdata] = useState({});
  const getDoctors = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const billContract = new Contract(
        NEW_BILL_CONTRACT_ADDRESS,
        bill_abi,
        signer
      );
      const response = await billContract.getAllBillDetails(signer);

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

  const getInsurances = async () => {
    try {
      console.log("Hello");
      const signer = await getProviderOrSigner(true);
      const insuraceContract = new Contract(
        NEW_INSURANCE_CONTRACT_ADDRESS,
        insurance_abi,
        signer
      );
      const response = await insuraceContract.getHealthInsurance(
        signer.address
      );
      console.log(response);
      setHealthinsurance(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePay = (item) => {
    setPaymentdata(item);
  };
  const handlePayBill = async () => {
    try {
      let total = parseInt(paymentdata[4]);
      const signer = await getProviderOrSigner(true);

      const billContract = new Contract(
        NEW_BILL_CONTRACT_ADDRESS,
        bill_abi,
        signer
      );
      let remainingAmount = total + parseInt(paymentdata[8]);
      let billamount = 0;
      if (usehealthinsurance) {
        if (healthinsurance[11]) {
          billamount += parseInt(paymentdata[8]);
        }

        if (parseInt(healthinsurance[9]) >= total) {
          billamount += total;
        } else {
          billamount += parseInt(healthinsurance[9]);
        }
        remainingAmount -= billamount;

        const insuraceContract = new Contract(
          NEW_INSURANCE_CONTRACT_ADDRESS,
          insurance_abi,
          signer
        );
        const tmepobl = [
          "0xd75AbAA559Fee88F030923e2152BAdA777BC7a03",
          paymentdata[1]?.toString(),
          billamount,
          signer.address,
          paymentdata[3]?.toString(),
        ];
        console.log("temp", tmepobl);
        const response = await insuraceContract.submitHealthInsuranceClaim(
          "0xd75AbAA559Fee88F030923e2152BAdA777BC7a03",
          paymentdata[1]?.toString(),
          billamount,
          signer.address,

          paymentdata[3]?.toString()
        );
      }
      const transaction = {
        to: "0xd75AbAA559Fee88F030923e2152BAdA777BC7a03",
        value: remainingAmount,
      };
      const txResponse = await signer.sendTransaction(transaction);
      console.log("Transaction hash:", txResponse.hash);

      const paybill = await billContract.payBill(
        signer.address,
        paymentdata[1]?.toString(),
        billamount,
        remainingAmount
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getDoctors();
    getInsurances();
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
              <th>Name</th>
              <th>Disease</th>
              <th>Bill Amount</th>
              <th>Ambulance Amount</th>
              <th>Total</th>
              <th>Insurance Amount</th>
              <th>Paid Amount</th>
              <th>Paid Status</th>
              <th>Payment</th>
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
                <th>{item[1]?.toString()}</th>

                <th>{item[2]?.toString()}</th>
                <th>{diseases[item[3]?.toString()]}</th>
                <th>{item[4]?.toString()}</th>
                <th>{item[8]?.toString()}</th>
                <th>{parseInt(item[4]) + parseInt(item[8])}</th>
                <th>{item[5]?.toString()}</th>
                <th>{item[6]?.toString()}</th>
                <th>{item[7] ? "Paid" : "Pending"}</th>
                <th className="text-center">
                  {item[7] ? (
                    "Paid"
                  ) : (
                    <label
                      htmlFor="my_modal_6"
                      className="btn btn-success btn-sm"
                      onClick={() => handlePay(item)}
                    >
                      Pay
                    </label>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{"Pay Bill"}</h3>
          <p className="py-4">Bill Id : {paymentdata[1]?.toString()}</p>

          {paymentdata.diseases && (
            <p>
              Diseases :
              {selectedInsurance.diseases.map((disease, idx) => (
                <span>{` ${disease}${
                  idx < selectedInsurance.diseases.length - 1 ? "," : ""
                }`}</span>
              ))}
            </p>
          )}
          <p className="py-4">Bill Amount:{paymentdata[4]?.toString()}</p>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="">
                Health Insurance ({healthinsurance[9]?.toString()})
              </span>
              <input
                type="checkbox"
                checked={usehealthinsurance}
                className="checkbox"
                onClick={() => setUsehealthinsurance(!usehealthinsurance)}
              />
            </label>
          </div>
          <div className="modal-action justify-around">
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
            <button className="btn btn-success" onClick={() => handlePayBill()}>
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
