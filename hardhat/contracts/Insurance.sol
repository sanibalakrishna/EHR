// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract InsuranceContract {
    address public owner;

    struct Life {
        address payable holderId;
        string holderName;
        string nomineeName;
        address payable nomineeId;
        uint256 premiumAmount;
        uint256 coverageAmount;
        uint256 policyTerm;
        uint256 paidTerm;
        uint256 startTime;
        uint256 balance;
        bool isClaimed;
    }

    struct Health {
        address payable holderId;
        string holderName;
        string nomineeName;
        address payable nomineeId;
        uint256 premiumAmount;
        uint256 coverageAmount;
        uint256 policyTerm;
        uint256 paidTerm;
        uint256 startTime;
        uint256 balance;
        bool isClaimed;
        bool isAmbulanceFeeCovered;
        uint256[] coveredDiseases;
    }

    struct Claim {
        uint256 billId;
        uint256 amount;
        address holderId;
        address nomineeId;
        bool isVerified;
    }

    mapping(address => Life) public lifeinsurances;
    mapping(address => Health) public healthinsurances;
    mapping(uint256 => Claim) public claims;

    event LifeInsuranceRegistered(address policyHolder);
    event HealthInsuranceRegistered(address policyHolder);
    event ClaimSubmitted(uint256 claimId);
    event ClaimVerified(uint256 claimId);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function registerLifeInsurance(
        address payable _holderId,
        string memory _holderName,
        string memory _nomineeName,
        address payable _nomineeId,
        uint256 _premiumAmount,
        uint256 _coverageAmount,
        uint256 _policyTerm
    ) external payable {
        require(_holderId != address(0), "Invalid holder address");
        require(bytes(_holderName).length > 0, "Invalid holder name");
        require(bytes(_nomineeName).length > 0, "Invalid nominee name");
        require(_nomineeId != address(0), "Invalid nominee address");
        require(_premiumAmount > 0, "Invalid premium amount");
        require(_coverageAmount > 0, "Invalid limit");

        lifeinsurances[_holderId] = Life(
            _holderId,
            _holderName,
            _nomineeName,
            _nomineeId,
            _premiumAmount,
            _coverageAmount,
            _policyTerm,
            1,
            block.timestamp,
            _premiumAmount,
            false
        );

        emit LifeInsuranceRegistered(_holderId);
    }

    function registerHealthInsurance(
        address payable _holderId,
        string memory _holderName,
        string memory _nomineeName,
        address payable _nomineeId,
        uint256 _premiumAmount,
        uint256 _coverageAmount,
        uint256 _policyTerm,
        bool _isAmbulanceFeeCovered,
        uint256[] memory _coveredDiseases
    ) external payable {
        require(_holderId != address(0), "Invalid holder address");
        require(bytes(_holderName).length > 0, "Invalid holder name");
        require(bytes(_nomineeName).length > 0, "Invalid nominee name");
        require(_nomineeId != address(0), "Invalid nominee address");
        require(_premiumAmount > 0, "Invalid premium amount");
        require(_coverageAmount > 0, "Invalid limit");
        require(_coveredDiseases.length > 0, "Must cover at least one disease");

        healthinsurances[_holderId] = Health(
            _holderId,
            _holderName,
            _nomineeName,
            _nomineeId,
            _premiumAmount,
            _coverageAmount,
            _policyTerm,
            1,
            block.timestamp,
            _premiumAmount,
            false,
            _isAmbulanceFeeCovered,
            _coveredDiseases
        );

        emit HealthInsuranceRegistered(_holderId);
    }

    // Function to submit a Life insurance claim
    function submitLifeInsuranceClaim(
        uint256 _billId,
        address _holderId
    ) external {
        require(!claims[_billId].isVerified, "Claim already verified");
        require(
            lifeinsurances[_holderId].paidTerm >=
                lifeinsurances[_holderId].policyTerm,
            "Policy terms needs to be fullfilled"
        );

        lifeinsurances[_holderId].nomineeId.transfer(
            lifeinsurances[_holderId].balance
        );
        claims[_billId] = Claim(
            _billId,
            lifeinsurances[_holderId].balance,
            _holderId,
            lifeinsurances[_holderId].nomineeId,
            false
        );
        emit ClaimSubmitted(_billId);
    }

    // Function to verify a Life insurance claim
    function verifyLifeInsuranceClaim(uint256 _billId) external {
        require(!claims[_billId].isVerified, "Claim already verified");
        claims[_billId].isVerified = true;
        // You can add additional logic here, such as transferring the claim amount to the nominee
        emit ClaimVerified(_billId);
    }

    // Function to submit a Health insurance claim
    function submitHealthInsuranceClaim(
        address payable admin,
        uint256 _billId,
        uint256 _amount,
        address _holderId,
        uint256 _diseaseId
    ) external {
        require(_amount > 0, "Invalid claim amount");
        require(
            healthinsurances[_holderId].balance >= _amount,
            "Insufficient balance"
        );

        require(
            isDiseaseCovered(
                healthinsurances[_holderId].coveredDiseases,
                _diseaseId
            ),
            "Disease not covered by the policy"
        );
        require(
            healthinsurances[_holderId].balance >= _amount &&
                (healthinsurances[_holderId].paidTerm >=
                    healthinsurances[_holderId].policyTerm),
            "Amount is more than balance"
        );

        healthinsurances[_holderId].balance -= _amount;
        admin.transfer(_amount);
        claims[_billId] = Claim(
            _billId,
            _amount,
            _holderId,
            healthinsurances[_holderId].nomineeId,
            false
        );

        emit ClaimSubmitted(_billId);
    }

    // Function to verify a Health insurance claim
    function verifyHealthInsuranceClaim(uint256 _billId) external {
        require(!claims[_billId].isVerified, "Claim already verified");
        claims[_billId].isVerified = true;
        // You can add additional logic here, such as transferring the claim amount to the nominee
        emit ClaimVerified(_billId);
    }

    function isDiseaseCovered(
        uint256[] memory coveredDiseases,
        uint256 diseaseId
    ) internal pure returns (bool) {
        for (uint256 i = 0; i < coveredDiseases.length; i++) {
            if (coveredDiseases[i] == diseaseId) {
                return true;
            }
        }
        return false;
    }

    function payHealthPremium(address payable _holderId) public payable {
        require(msg.value > 0, "Payment required");
        require(_holderId != address(0), "Invalid holder address");
        healthinsurances[_holderId].paidTerm += 1;
    }

    function payLifePremium(address payable _holderId) public payable {
        require(msg.value > 0, "Payment required");
        require(_holderId != address(0), "Invalid holder address");
        lifeinsurances[_holderId].paidTerm += 1;
    }

    function getLifeInsurance(
        address _address
    ) public view returns (Life memory) {
        return lifeinsurances[_address];
    }

    function getHealthInsurance(
        address _address
    ) public view returns (Health memory) {
        return healthinsurances[_address];
    }
}
