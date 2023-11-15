// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Bill {
    struct BillInfo {
        address patientId;
        uint256 billId;
        string patientName;
        string disease;
        uint256 billAmount;
        uint256 insuranceAmount;
        uint256 paidAmount;
        bool paidStatus;
        uint256 ambulanceAmount;
        bool patientStatus;
    }

    mapping(address => BillInfo[]) public patientBills;
    address[] public patientsList;

    event BillCreated(address patient, uint256 billId);
    event BillPaid(address patient, uint256 billId, uint256 paidAmount);

    // Function to create a new bill
    function createBill(
        address _patientId,
        string memory _patientName,
        string memory _disease,
        uint256 _billAmount,
        uint256 _ambulanceBill,
        bool _patientStatus
    ) external {
        uint256 billId = block.number; // Generate a unique bill ID
        BillInfo memory newBill = BillInfo({
            patientId: _patientId,
            billId: billId,
            patientName: _patientName,
            disease: _disease,
            billAmount: _billAmount,
            insuranceAmount: 0,
            paidAmount: 0,
            paidStatus: false,
            ambulanceAmount: _ambulanceBill,
            patientStatus: _patientStatus
        });
        if (patientBills[_patientId].length == 0) {
            patientsList.push(_patientId);
        }
        patientBills[_patientId].push(newBill);

        emit BillCreated(msg.sender, billId);
    }

    // Function to pay a bill
    function payBill(
        address _patient,
        uint256 _billId,
        uint256 _insuranceAmount,
        uint256 _paidAmount
    ) external {
        BillInfo[] storage bills = patientBills[_patient];

        for (uint256 i = 0; i < bills.length; i++) {
            if (bills[i].billId == _billId && !bills[i].paidStatus) {
                require(
                    _paidAmount <= bills[i].billAmount,
                    "Paid amount exceeds bill amount"
                );
                bills[i].paidAmount = _paidAmount;
                bills[i].insuranceAmount = _insuranceAmount; // Assume insurance covers the paid amount
                if (
                    bills[i].billAmount ==
                    (bills[i].paidAmount + bills[i].insuranceAmount)
                ) {
                    bills[i].paidStatus = true;
                }
                emit BillPaid(_patient, _billId, _paidAmount);
                return;
            }
        }

        revert("Bill not found or already paid");
    }

    // Function to get all bill details for a patient
    function getAllBillDetails(
        address _patient
    ) external view returns (BillInfo[] memory) {
        return patientBills[_patient];
    }

    function getAllBillDetailsForAdmin()
        external
        view
        returns (BillInfo[] memory)
    {
        BillInfo[] memory allBills;

        for (uint256 i = 0; i < patientsList.length; i++) {
            address patient = patientsList[i];
            BillInfo[] memory patientBillsArray = patientBills[patient];
            for (uint256 j = 0; j < patientBillsArray.length; j++) {
                allBills = appendToBillArray(allBills, patientBillsArray[j]);
            }
        }

        return allBills;
    }

    function appendToBillArray(
        BillInfo[] memory billArray,
        BillInfo memory newBill
    ) internal pure returns (BillInfo[] memory) {
        BillInfo[] memory newArray = new BillInfo[](billArray.length + 1);
        for (uint256 i = 0; i < billArray.length; i++) {
            newArray[i] = billArray[i];
        }
        newArray[billArray.length] = newBill;
        return newArray;
    }
}
