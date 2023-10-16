//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NewDoctor {
    struct Doctor {
        string name;
        string specialization;
        string gender;
        uint phone;
        address addr;
    }

    struct Appointment {
        uint id;
        address patient;
        string date;
    }
    struct Files {
        uint id;
        address patient;
        string filepath;
    }
    address[] public doctorslist;
    mapping(address => Doctor) doctors;
    mapping(address => Appointment[]) appointments;
    mapping(address => Files[]) receivedfiles;

    event NewUser(address indexed _user, string _name);

    function addDoctor(
        address _addr,
        string memory _name,
        string memory _specialization,
        string memory _gender,
        uint _phone
    ) public {
        require(doctors[_addr].phone == 0, "Doctor Already Exist");
        doctors[_addr] = Doctor(_name, _specialization, _gender, _phone, _addr);
        doctorslist.push(_addr);
        emit NewUser(_addr, _name);
    }

    function getDoctorList()
        public
        view
        returns (address[] memory, Doctor[] memory)
    {
        Doctor[] memory result = new Doctor[](doctorslist.length);
        for (uint i = 0; i < doctorslist.length; i++) {
            result[i] = doctors[doctorslist[i]];
        }
        return (doctorslist, result);
    }

    function updateDoctor(
        address _addr,
        string memory _name,
        string memory _specialization,
        string memory _gender,
        uint _phone
    ) public {
        Doctor storage doc = doctors[_addr];
        doc.name = _name;
        doc.specialization = _specialization;
        doc.gender = _gender;
        doc.phone = _phone;
    }

    function getDoctor(address _addr) public view returns (Doctor memory) {
        return doctors[_addr];
    }

    function addAppointment(
        address _doctor,
        string memory _date,
        address _patient
    ) public {
        require(isDoctorAvailable(_doctor, _date), "Doctor not available");
        Appointment memory newAppointment = Appointment(
            appointments[_doctor].length,
            _patient,
            _date
        );
        appointments[_doctor].push(newAppointment);
    }

    function getAppointments(
        address _doctor
    ) public view returns (Appointment[] memory) {
        return appointments[_doctor];
    }

    function isDoctorAvailable(
        address _doctor,
        string memory _date
    ) private view returns (bool) {
        for (uint i = 0; i < appointments[_doctor].length; i++) {
            if (stringsEqual(appointments[_doctor][i].date, _date)) {
                return false;
            }
        }
        return true;
    }

    function stringsEqual(
        string memory _a,
        string memory _b
    ) public pure returns (bool) {
        return
            keccak256(abi.encodePacked(_a)) == keccak256(abi.encodePacked(_b));
    }

    function addRecievedFiles(
        address _addr,
        address _patient_addr,
        string memory _file_path
    ) public {
        Files memory newfile = Files(
            receivedfiles[_addr].length,
            _patient_addr,
            _file_path
        );
        receivedfiles[_addr].push(newfile);
    }

    function getRecievedFiles(
        address _addr
    ) public view returns (Files[] memory) {
        return receivedfiles[_addr];
    }
}
