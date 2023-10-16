// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract EHRPatient {
    struct Patient {
        string patient_name;
        uint256 age;
        string gender;
        string height;
        uint256 weight;
        string patient_address;
        uint256 phone_no;
        string email_id;
        uint256 date;
    }
    struct Appointment {
        uint id;
        address doctor;
        string date;
    }
    struct Files {
        uint id;
        address doctor;
        string filepath;
    }
    address[] public patientlist;
    mapping(address => Patient) patients;
    mapping(address => Appointment[]) appointments;
    mapping(address => Files[]) receivedfiles;

    mapping(string => mapping(string => string)) public doctorsentfiles;
    Patient p;

    function addPatient(
        address patient_id,
        string memory _patient_name,
        uint256 _age,
        string memory _gender,
        string memory _height,
        uint256 _weight,
        string memory _patient_address,
        uint256 _phone_no,
        string memory _email_id,
        uint256 _date
    ) public {
        p.patient_name = _patient_name;
        p.age = _age;
        p.gender = _gender;
        p.height = _height;
        p.weight = _weight;
        p.patient_address = _patient_address;
        p.phone_no = _phone_no;
        p.email_id = _email_id;
        p.date = _date;
        patients[patient_id] = p;
        patientlist.push(patient_id);
    }

    function updatePatient(
        address patient_id,
        string memory _patient_name,
        uint256 _age,
        string memory _gender,
        string memory _height,
        uint256 _weight,
        string memory _patient_address,
        uint256 _phone_no,
        string memory _email_id,
        uint256 _date
    ) public {
        p.patient_name = _patient_name;
        p.age = _age;
        p.gender = _gender;
        p.height = _height;
        p.weight = _weight;
        p.patient_address = _patient_address;
        p.phone_no = _phone_no;
        p.email_id = _email_id;
        p.date = _date;
        patients[patient_id] = p;
    }

    function getPatientList()
        public
        view
        returns (address[] memory, Patient[] memory)
    {
        Patient[] memory result = new Patient[](patientlist.length);
        for (uint i = 0; i < patientlist.length; i++) {
            result[i] = patients[patientlist[i]];
        }
        return (patientlist, result);
    }

    function getPatient(
        address patient_id
    ) public view returns (Patient memory) {
        return patients[patient_id];
    }

    function addAppointment(
        address _patient,
        string memory _date,
        address _doctor
    ) public {
        Appointment memory newAppointment = Appointment(
            appointments[_doctor].length,
            _doctor,
            _date
        );
        appointments[_patient].push(newAppointment);
    }

    function getAppointments(
        address _patient
    ) public view returns (Appointment[] memory) {
        return appointments[_patient];
    }

    function addReceivedFile(
        address _patient_id,
        address _doctor_id,
        string memory _file_hash
    ) public {
        require(bytes(_file_hash).length > 0, "File hash cannot be empty");
        Files memory newfile = Files(
            receivedfiles[_patient_id].length,
            _doctor_id,
            _file_hash
        );
        receivedfiles[_patient_id].push(newfile);
    }

    function getReceivedFile(
        address _patient_id
    ) public view returns (Files[] memory) {
        return receivedfiles[_patient_id];
    }
}
