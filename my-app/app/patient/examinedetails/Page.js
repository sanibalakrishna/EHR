"use client";
import React, { useState, useContext, useEffect } from "react";
import { Contract, ethers } from "ethers";
import { NEW_REPORT_CONTRACT_ADDRESS, report_abi } from "@/constants";
import { Web3walletContext } from "@/hooks/web3wallet";
function page() {
  const { getProviderOrSigner, setLoading } = useContext(Web3walletContext);
  const [patientid, setPatientid] = useState("");
  const [data, setData] = useState({
    reportid: "",
    bloodtest: "",
    urinetest: "",
    ecg: "",
    mriscan: "",
    ctscan: "",
    xray: "",
    labtest: "",
    built: "",
    nourishment: "",
    eyes: "",
    toungue: "",
    pulse: "",
    bloodpressure: "",
    temperature: "",
    respiratoryrate: "",
    cvs: "",
    cns: "",
    rs: "",
    abdomensystem: "",
  });
  const [selectedReport, setSelectedReport] = useState("");
  const [reports, setReports] = useState([]);
  const [tab, setTab] = useState("investigations");
  const [update, setUpdate] = useState(false);
  const handleFetch = async (e) => {
    try {
      const signer = await getProviderOrSigner(true);
      const reportContract = new Contract(
        NEW_REPORT_CONTRACT_ADDRESS,
        report_abi,
        signer
      );
      const temptest = await reportContract.getReportList(signer.address);
      console.log(temptest);
      setReports(temptest);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddReport = async (e) => {
    e.preventDefault();
    try {
      const signer = await getProviderOrSigner(true);
      const reportContract = new Contract(
        NEW_REPORT_CONTRACT_ADDRESS,
        report_abi,
        signer
      );
      const temptest = await reportContract.addTest(
        patientid,
        data.reportid,
        data.bloodtest,
        data.urinetest,
        data.ecg,
        data.mriscan,
        data.ctscan,
        data.xray,
        data.labtest,
        {
          gasLimit: 500000,
          gasPrice: ethers.parseUnits("100", "gwei"),
        }
      );
      const tempscan = await reportContract.addScan(
        data.reportid,
        data.built,
        data.nourishment,
        data.eyes,
        data.toungue,
        data.pulse,
        data.bloodpressure,
        data.temperature,
        data.respiratoryrate,
        {
          gasLimit: 500000,
          gasPrice: ethers.parseUnits("100", "gwei"),
        }
      );
      const tempsystem = await reportContract.addSystem(
        data.reportid,
        data.cvs,
        data.cns,
        data.rs,
        data.abdomensystem,
        {
          gasLimit: 500000,
          gasPrice: ethers.parseUnits("100", "gwei"),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReportChange = async (e) => {
    setSelectedReport(e.target.value);
    try {
      const provider = await getProviderOrSigner(false);
      const reportContract = new Contract(
        NEW_REPORT_CONTRACT_ADDRESS,
        report_abi,
        provider
      );
      const response = await reportContract.getReport(e.target.value);

      console.log(response);
      arrangeData(response);
    } catch (error) {}
  };
  const arrangeData = (data) => {
    const test = [
      "reportid",
      "bloodtest",
      "urinetest",
      "ecg",
      "mriscan",
      "ctscan",
      "xray",
      "labtest",
    ];
    const scan = [
      "reportid",
      "built",
      "nourishment",
      "eyes",
      "toungue",
      "pulse",
      "temperature",
      "bloodpressure",

      "respiratoryrate",
    ];
    const system = ["reportid", "cvs", "cns", "rs", "abdomensystem"];
    let result = {};
    for (let i = 0; i < data[0].length; i++) {
      result[test[i]] = data[0][i].toString();
    }
    for (let i = 0; i < data[1].length; i++) {
      result[scan[i]] = data[1][i].toString();
    }
    for (let i = 0; i < data[2].length; i++) {
      result[system[i]] = data[2][i].toString();
    }
    console.log(result);
    setData(result);
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <div className="hero min-h-screen md:min-h-[calc(100vh-_4.3rem)] bg-base-200 flex flex-col">
      <div class="form-control">
        <select
          className="select select-bordered"
          value={selectedReport}
          onChange={handleReportChange}
          name="reports"
        >
          <option disabled value={""}>
            Select Report
          </option>
          {reports.map((r) => (
            <option value={r}>{r}</option>
          ))}
        </select>
      </div>
      <div className="tabs">
        <a
          className={`tab tab-lg tab-lifted ${
            tab == "investigations" ? "tab-active" : ""
          }`}
          onClick={() => setTab("investigations")}
        >
          Investigation
        </a>
        <a
          className={`tab tab-lg tab-lifted ${
            tab == "general" ? "tab-active" : ""
          }`}
          onClick={() => setTab("general")}
        >
          General
        </a>
        <a
          className={`tab tab-lg tab-lifted ${
            tab == "systemic" ? "tab-active" : ""
          }`}
          onClick={() => setTab("systemic")}
        >
          Systemic
        </a>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm md:max-w-2xl shadow-2xl bg-base-100">
        <form class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">RecordId</span>
            </label>
            <input
              type="text"
              placeholder="Record Id"
              class="input input-bordered"
              required
              value={data.reportid}
              onChange={handleChange}
              name="reportid"
            />
          </div>
          {tab == "investigations" && (
            <div className="flex flex-col md:flex-row md:gap-12">
              <div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Blood Test</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Blod Test"
                    name="bloodtest"
                    class="input  input-bordered"
                    required
                    value={data.bloodtest}
                    onChange={handleChange}
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Urine Test</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Urine Test"
                    name="urinetest"
                    class="input input-bordered"
                    required
                    value={data.urinetest}
                    onChange={handleChange}
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">ECG</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ECG"
                    class="input input-bordered"
                    name="ecg"
                    required
                    value={data.ecg}
                    onChange={handleChange}
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">MRI Scan</span>
                  </label>
                  <input
                    type="text"
                    placeholder="MRI Scan"
                    name="mriscan"
                    class="input input-bordered"
                    required
                    value={data.mriscan}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">CT Scan</span>
                  </label>
                  <input
                    type="text"
                    placeholder="CT Scan"
                    name="ctscan"
                    class="input input-bordered"
                    required
                    value={data.ctscan}
                    onChange={handleChange}
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">X-ray</span>
                  </label>
                  <input
                    type="text"
                    placeholder="X-ray"
                    name="xray"
                    class="input input-bordered"
                    required
                    value={data.xray}
                    onChange={handleChange}
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Lab Test</span>
                  </label>
                  <input
                    type="text"
                    name="labtest"
                    placeholder="Lab Test"
                    class="input input-bordered"
                    required
                    value={data.labtest}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}
          {tab == "general" && (
            <div className="flex flex-col md:flex-row md:gap-12">
              <div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Built</span>
                  </label>
                  <input
                    type="text"
                    placeholder="built"
                    name="built"
                    class="input  input-bordered"
                    required
                    value={data.built}
                    onChange={handleChange}
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Nourishment</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nourishment"
                    name="nourishment"
                    class="input input-bordered"
                    required
                    value={data.nourishment}
                    onChange={handleChange}
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Eyes</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Eyes"
                    name="eyes"
                    class="input input-bordered"
                    required
                    value={data.eyes}
                    onChange={handleChange}
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Toungue</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Toungue"
                    name="toungue"
                    class="input input-bordered"
                    required
                    value={data.toungue}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Pulse</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Pulse"
                    name="pulse"
                    class="input input-bordered"
                    required
                    value={data.pulse}
                    onChange={handleChange}
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Blood Pressure</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Blood Pressure"
                    name="bloodpressure"
                    class="input input-bordered"
                    required
                    value={data.bloodpressure}
                    onChange={handleChange}
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Temperature</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Temperature"
                    name="temperature"
                    class="input input-bordered"
                    required
                    value={data.temperature}
                    onChange={handleChange}
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Respiratory Rate</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Respiratory Rate"
                    name="respiratoryrate"
                    class="input input-bordered"
                    required
                    value={data.respiratoryrate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}
          {tab == "systemic" && (
            <div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">CVS</span>
                </label>
                <input
                  type="text"
                  placeholder="CVS"
                  name="cvs"
                  class="input  input-bordered"
                  required
                  value={data.cvs}
                  onChange={handleChange}
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">CNS</span>
                </label>
                <input
                  type="text"
                  placeholder="CNS"
                  name="cns"
                  class="input input-bordered"
                  required
                  value={data.cns}
                  onChange={handleChange}
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">RS</span>
                </label>
                <input
                  type="text"
                  placeholder="RS"
                  name="rs"
                  class="input input-bordered"
                  required
                  value={data.rs}
                  onChange={handleChange}
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Abdomen System</span>
                </label>
                <input
                  type="string"
                  placeholder="Abdomen System"
                  name="abdomensystem"
                  class="input input-bordered"
                  required
                  value={data.abdomensystem}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <div class="form-control mt-6">
            <button class="btn btn-primary" onClick={handleAddReport}>
              {"Register"} Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
