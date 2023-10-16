pragma solidity ^0.8.0;

contract Reports {
    mapping(string => tests) patienttests;
    mapping(string => scan) scantests;
    mapping(string => system) systemexamine;
    mapping(address => string[]) reports;

    struct tests {
        string blood_test;
        string urine_test;
        string ecg;
        string mri_scan;
        string ct_scan;
        string xray;
        string lab_test;
    }
    tests t;
    struct scan {
        string built;
        string nouirishment;
        string eyes;
        string tongue;
        uint64 pulse;
        uint64 temp;
        string blood_pressure;
        uint64 respiratory_rate;
    }
    scan s;
    struct system {
        string cns;
        string cvs;
        string rs;
        string abdomen;
    }
    system sys;

    function addTest(
        address patient_id,
        string memory report_id,
        string memory _blood_test,
        string memory _urine_test,
        string memory _ecg,
        string memory _mri_scan,
        string memory _ct_scan,
        string memory _xray,
        string memory _lab_test
    ) public {
        t.blood_test = _blood_test;
        t.urine_test = _urine_test;
        t.ecg = _ecg;
        t.mri_scan = _mri_scan;
        t.ct_scan = _ct_scan;
        t.xray = _xray;
        t.lab_test = _lab_test;
        patienttests[report_id] = t;
        reports[patient_id].push(report_id);
    }

    function addScan(
        string memory report_id,
        string memory _built,
        string memory _nouirishment,
        string memory _eyes,
        string memory _tongue,
        uint64 _pulse,
        string memory _blood_pressure,
        uint64 _temp,
        uint64 _respiratory_rate
    ) public {
        s.built = _built;
        s.nouirishment = _nouirishment;
        s.eyes = _eyes;
        s.tongue = _tongue;
        s.pulse = _pulse;
        s.blood_pressure = _blood_pressure;
        s.temp = _temp;
        s.respiratory_rate = _respiratory_rate;

        scantests[report_id] = s;
    }

    function addSystem(
        string memory report_id,
        string memory _cvs,
        string memory _cns,
        string memory _rs,
        string memory _abdomen
    ) public {
        sys.cvs = _cvs;
        sys.cns = _cns;
        sys.rs = _rs;
        sys.abdomen = _abdomen;

        systemexamine[report_id] = sys;
    }

    function getReport(
        string memory report_id
    ) public view returns (tests memory, scan memory, system memory) {
        tests memory t = patienttests[report_id];
        scan memory s = scantests[report_id];
        system memory sys = systemexamine[report_id];

        return (t, s, sys);
    }

    function getReportList(
        address patient_id
    ) public view returns (string[] memory) {
        return reports[patient_id];
    }
}
