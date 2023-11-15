export const DOCTOR_CONTRACT_ADDRESS =
  "0x629B5138487801a66DB8822a23d559939bd1bde2";
export const NEW_DOCTRO_CONTRACT_ADDRESS =
  "0x603CF2C192A06f4D4BEd43bd45c34537E6C160Db";

export const NEW_PATIENT_CONTRACT_ADDRESS =
  "0x79e782c25a424f4eAc3dad83431658c707e10bd2";

export const NEW_REPORT_CONTRACT_ADDRESS =
  "0x339AA84BCDb51b254252F64F722299cd11eD512B";

export const NEW_BILL_CONTRACT_ADDRESS =
  "0xcA014275C4FC26006eCfA4953729FFf2f35357E7";
export const NEW_INSURANCE_CONTRACT_ADDRESS =
  "0x49B6A51457c3D094658828F674aE1bc793eda172";
export const doctor_abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "NewUser",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_doctor",
        type: "address",
      },
      {
        internalType: "string",
        name: "_date",
        type: "string",
      },
      {
        internalType: "address",
        name: "_patient",
        type: "address",
      },
    ],
    name: "addAppointment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_specialization",
        type: "string",
      },
      {
        internalType: "string",
        name: "_gender",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_phone",
        type: "uint256",
      },
    ],
    name: "addDoctor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
      {
        internalType: "address",
        name: "_patient_addr",
        type: "address",
      },
      {
        internalType: "string",
        name: "_file_path",
        type: "string",
      },
    ],
    name: "addRecievedFiles",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "doctorslist",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_doctor",
        type: "address",
      },
    ],
    name: "getAppointments",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "patient",
            type: "address",
          },
          {
            internalType: "string",
            name: "date",
            type: "string",
          },
        ],
        internalType: "struct NewDoctor.Appointment[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
    name: "getDoctor",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "specialization",
            type: "string",
          },
          {
            internalType: "string",
            name: "gender",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "phone",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
        ],
        internalType: "struct NewDoctor.Doctor",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDoctorList",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "specialization",
            type: "string",
          },
          {
            internalType: "string",
            name: "gender",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "phone",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
        ],
        internalType: "struct NewDoctor.Doctor[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
    name: "getRecievedFiles",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "patient",
            type: "address",
          },
          {
            internalType: "string",
            name: "filepath",
            type: "string",
          },
        ],
        internalType: "struct NewDoctor.Files[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_a",
        type: "string",
      },
      {
        internalType: "string",
        name: "_b",
        type: "string",
      },
    ],
    name: "stringsEqual",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_specialization",
        type: "string",
      },
      {
        internalType: "string",
        name: "_gender",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_phone",
        type: "uint256",
      },
    ],
    name: "updateDoctor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export const patient_abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_patient",
        type: "address",
      },
      {
        internalType: "string",
        name: "_date",
        type: "string",
      },
      {
        internalType: "address",
        name: "_doctor",
        type: "address",
      },
    ],
    name: "addAppointment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "patient_id",
        type: "address",
      },
      {
        internalType: "string",
        name: "_patient_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_age",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_gender",
        type: "string",
      },
      {
        internalType: "string",
        name: "_height",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_weight",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_patient_address",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_phone_no",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_email_id",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_date",
        type: "uint256",
      },
    ],
    name: "addPatient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_patient_id",
        type: "address",
      },
      {
        internalType: "address",
        name: "_doctor_id",
        type: "address",
      },
      {
        internalType: "string",
        name: "_file_hash",
        type: "string",
      },
    ],
    name: "addReceivedFile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "doctorsentfiles",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_patient",
        type: "address",
      },
    ],
    name: "getAppointments",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "doctor",
            type: "address",
          },
          {
            internalType: "string",
            name: "date",
            type: "string",
          },
        ],
        internalType: "struct EHRPatient.Appointment[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "patient_id",
        type: "address",
      },
    ],
    name: "getPatient",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "patient_name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "age",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "gender",
            type: "string",
          },
          {
            internalType: "string",
            name: "height",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "weight",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "patient_address",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "phone_no",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "email_id",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "date",
            type: "uint256",
          },
        ],
        internalType: "struct EHRPatient.Patient",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPatientList",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "string",
            name: "patient_name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "age",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "gender",
            type: "string",
          },
          {
            internalType: "string",
            name: "height",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "weight",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "patient_address",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "phone_no",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "email_id",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "date",
            type: "uint256",
          },
        ],
        internalType: "struct EHRPatient.Patient[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_patient_id",
        type: "address",
      },
    ],
    name: "getReceivedFile",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "doctor",
            type: "address",
          },
          {
            internalType: "string",
            name: "filepath",
            type: "string",
          },
        ],
        internalType: "struct EHRPatient.Files[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "patientlist",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "patient_id",
        type: "address",
      },
      {
        internalType: "string",
        name: "_patient_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_age",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_gender",
        type: "string",
      },
      {
        internalType: "string",
        name: "_height",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_weight",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_patient_address",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_phone_no",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_email_id",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_date",
        type: "uint256",
      },
    ],
    name: "updatePatient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export const report_abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "report_id",
        type: "string",
      },
      {
        internalType: "string",
        name: "_built",
        type: "string",
      },
      {
        internalType: "string",
        name: "_nouirishment",
        type: "string",
      },
      {
        internalType: "string",
        name: "_eyes",
        type: "string",
      },
      {
        internalType: "string",
        name: "_tongue",
        type: "string",
      },
      {
        internalType: "uint64",
        name: "_pulse",
        type: "uint64",
      },
      {
        internalType: "string",
        name: "_blood_pressure",
        type: "string",
      },
      {
        internalType: "uint64",
        name: "_temp",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "_respiratory_rate",
        type: "uint64",
      },
    ],
    name: "addScan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "report_id",
        type: "string",
      },
      {
        internalType: "string",
        name: "_cvs",
        type: "string",
      },
      {
        internalType: "string",
        name: "_cns",
        type: "string",
      },
      {
        internalType: "string",
        name: "_rs",
        type: "string",
      },
      {
        internalType: "string",
        name: "_abdomen",
        type: "string",
      },
    ],
    name: "addSystem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "patient_id",
        type: "address",
      },
      {
        internalType: "string",
        name: "report_id",
        type: "string",
      },
      {
        internalType: "string",
        name: "_blood_test",
        type: "string",
      },
      {
        internalType: "string",
        name: "_urine_test",
        type: "string",
      },
      {
        internalType: "string",
        name: "_ecg",
        type: "string",
      },
      {
        internalType: "string",
        name: "_mri_scan",
        type: "string",
      },
      {
        internalType: "string",
        name: "_ct_scan",
        type: "string",
      },
      {
        internalType: "string",
        name: "_xray",
        type: "string",
      },
      {
        internalType: "string",
        name: "_lab_test",
        type: "string",
      },
    ],
    name: "addTest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "report_id",
        type: "string",
      },
    ],
    name: "getReport",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "report_id",
            type: "string",
          },
          {
            internalType: "string",
            name: "blood_test",
            type: "string",
          },
          {
            internalType: "string",
            name: "urine_test",
            type: "string",
          },
          {
            internalType: "string",
            name: "ecg",
            type: "string",
          },
          {
            internalType: "string",
            name: "mri_scan",
            type: "string",
          },
          {
            internalType: "string",
            name: "ct_scan",
            type: "string",
          },
          {
            internalType: "string",
            name: "xray",
            type: "string",
          },
          {
            internalType: "string",
            name: "lab_test",
            type: "string",
          },
        ],
        internalType: "struct Reports.tests",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "report_id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "built",
            type: "string",
          },
          {
            internalType: "string",
            name: "nouirishment",
            type: "string",
          },
          {
            internalType: "string",
            name: "eyes",
            type: "string",
          },
          {
            internalType: "string",
            name: "tongue",
            type: "string",
          },
          {
            internalType: "uint64",
            name: "pulse",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "temp",
            type: "uint64",
          },
          {
            internalType: "string",
            name: "blood_pressure",
            type: "string",
          },
          {
            internalType: "uint64",
            name: "respiratory_rate",
            type: "uint64",
          },
        ],
        internalType: "struct Reports.scan",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "report_id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "cns",
            type: "string",
          },
          {
            internalType: "string",
            name: "cvs",
            type: "string",
          },
          {
            internalType: "string",
            name: "rs",
            type: "string",
          },
          {
            internalType: "string",
            name: "abdomen",
            type: "string",
          },
        ],
        internalType: "struct Reports.system",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "patient_id",
        type: "address",
      },
    ],
    name: "getReportList",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export const bill_abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "patient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "billId",
        type: "uint256",
      },
    ],
    name: "BillCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "patient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "billId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "paidAmount",
        type: "uint256",
      },
    ],
    name: "BillPaid",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_patientId",
        type: "address",
      },
      {
        internalType: "string",
        name: "_patientName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_disease",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_billAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_ambulanceBill",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_patientStatus",
        type: "bool",
      },
    ],
    name: "createBill",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_patient",
        type: "address",
      },
    ],
    name: "getAllBillDetails",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "patientId",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "billId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "patientName",
            type: "string",
          },
          {
            internalType: "string",
            name: "disease",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "billAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "insuranceAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "paidAmount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "paidStatus",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "ambulanceAmount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "patientStatus",
            type: "bool",
          },
        ],
        internalType: "struct Bill.BillInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllBillDetailsForAdmin",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "patientId",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "billId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "patientName",
            type: "string",
          },
          {
            internalType: "string",
            name: "disease",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "billAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "insuranceAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "paidAmount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "paidStatus",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "ambulanceAmount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "patientStatus",
            type: "bool",
          },
        ],
        internalType: "struct Bill.BillInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "patientBills",
    outputs: [
      {
        internalType: "address",
        name: "patientId",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "billId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "patientName",
        type: "string",
      },
      {
        internalType: "string",
        name: "disease",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "billAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "insuranceAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "paidAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "paidStatus",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "ambulanceAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "patientStatus",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "patientsList",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_patient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_billId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_insuranceAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_paidAmount",
        type: "uint256",
      },
    ],
    name: "payBill",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export const insurance_abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "claimId",
        type: "uint256",
      },
    ],
    name: "ClaimSubmitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "claimId",
        type: "uint256",
      },
    ],
    name: "ClaimVerified",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "policyHolder",
        type: "address",
      },
    ],
    name: "HealthInsuranceRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "policyHolder",
        type: "address",
      },
    ],
    name: "LifeInsuranceRegistered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "claims",
    outputs: [
      {
        internalType: "uint256",
        name: "billId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "holderId",
        type: "address",
      },
      {
        internalType: "address",
        name: "nomineeId",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isVerified",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getHealthInsurance",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "holderId",
            type: "address",
          },
          {
            internalType: "string",
            name: "holderName",
            type: "string",
          },
          {
            internalType: "string",
            name: "nomineeName",
            type: "string",
          },
          {
            internalType: "address payable",
            name: "nomineeId",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "premiumAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "coverageAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "policyTerm",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "paidTerm",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isClaimed",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isAmbulanceFeeCovered",
            type: "bool",
          },
          {
            internalType: "uint256[]",
            name: "coveredDiseases",
            type: "uint256[]",
          },
        ],
        internalType: "struct InsuranceContract.Health",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getLifeInsurance",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "holderId",
            type: "address",
          },
          {
            internalType: "string",
            name: "holderName",
            type: "string",
          },
          {
            internalType: "string",
            name: "nomineeName",
            type: "string",
          },
          {
            internalType: "address payable",
            name: "nomineeId",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "premiumAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "coverageAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "policyTerm",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "paidTerm",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isClaimed",
            type: "bool",
          },
        ],
        internalType: "struct InsuranceContract.Life",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "healthinsurances",
    outputs: [
      {
        internalType: "address payable",
        name: "holderId",
        type: "address",
      },
      {
        internalType: "string",
        name: "holderName",
        type: "string",
      },
      {
        internalType: "string",
        name: "nomineeName",
        type: "string",
      },
      {
        internalType: "address payable",
        name: "nomineeId",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "premiumAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "coverageAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "policyTerm",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "paidTerm",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isClaimed",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isAmbulanceFeeCovered",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lifeinsurances",
    outputs: [
      {
        internalType: "address payable",
        name: "holderId",
        type: "address",
      },
      {
        internalType: "string",
        name: "holderName",
        type: "string",
      },
      {
        internalType: "string",
        name: "nomineeName",
        type: "string",
      },
      {
        internalType: "address payable",
        name: "nomineeId",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "premiumAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "coverageAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "policyTerm",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "paidTerm",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isClaimed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_holderId",
        type: "address",
      },
    ],
    name: "payHealthPremium",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_holderId",
        type: "address",
      },
    ],
    name: "payLifePremium",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_holderId",
        type: "address",
      },
      {
        internalType: "string",
        name: "_holderName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_nomineeName",
        type: "string",
      },
      {
        internalType: "address payable",
        name: "_nomineeId",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_premiumAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_coverageAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_policyTerm",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_isAmbulanceFeeCovered",
        type: "bool",
      },
      {
        internalType: "uint256[]",
        name: "_coveredDiseases",
        type: "uint256[]",
      },
    ],
    name: "registerHealthInsurance",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_holderId",
        type: "address",
      },
      {
        internalType: "string",
        name: "_holderName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_nomineeName",
        type: "string",
      },
      {
        internalType: "address payable",
        name: "_nomineeId",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_premiumAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_coverageAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_policyTerm",
        type: "uint256",
      },
    ],
    name: "registerLifeInsurance",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "admin",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_billId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_holderId",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_diseaseId",
        type: "uint256",
      },
    ],
    name: "submitHealthInsuranceClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_billId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_holderId",
        type: "address",
      },
    ],
    name: "submitLifeInsuranceClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_billId",
        type: "uint256",
      },
    ],
    name: "verifyHealthInsuranceClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_billId",
        type: "uint256",
      },
    ],
    name: "verifyLifeInsuranceClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
