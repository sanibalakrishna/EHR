// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract InsuranceContract {
    address public owner;

    struct Policy {
        uint256 holderId;
        string holderName;
        string nomineeName;
        uint256 nomineeId;
        uint256 premiumAmount;
        uint256 limit;
        uint256 balance;
        bool isClaimed;
    }

    struct Claim {
        uint256 billId;
        uint256 amount;
        uint256 holderId;
        uint256 nomineeId;
        bool isVerified;
    }

    mapping(uint256 => Policy) public policies;
    mapping(uint256 => Claim) public claims;

    event PolicyRegistered(uint256 policyId);
    event ClaimSubmitted(uint256 claimId);
    event ClaimVerified(uint256 claimId);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier policyExists(uint256 policyId) {
        require(policies[policyId].holderId != 0, "Policy does not exist");
        _;
    }

    function registerPolicy(
        uint256 _holderId,
        string memory _holderName,
        string memory _nomineeName,
        uint256 _nomineeId,
        uint256 _premiumAmount,
        uint256 _limit
    ) external onlyOwner {
        require(_holderId != 0, "Invalid holder ID");
        require(bytes(_holderName).length > 0, "Invalid holder name");
        require(bytes(_nomineeName).length > 0, "Invalid nominee name");
        require(_nomineeId != 0, "Invalid nominee ID");
        require(_premiumAmount > 0, "Invalid premium amount");
        require(_limit > 0, "Invalid limit");

        policies[_holderId] = Policy(
            _holderId,
            _holderName,
            _nomineeName,
            _nomineeId,
            _premiumAmount,
            _limit,
            _premiumAmount,
            false
        );

        emit PolicyRegistered(_holderId);
    }

    function submitClaim(
        uint256 _billId,
        uint256 _amount,
        uint256 _holderId,
        uint256 _nomineeId
    ) external policyExists(_holderId) {
        require(_amount > 0, "Invalid claim amount");
        require(policies[_holderId].balance >= _amount, "Insufficient balance");
        require(
            _nomineeId == policies[_holderId].nomineeId,
            "Invalid nominee ID"
        );
        require(!claims[_billId].isVerified, "Claim already verified");

        policies[_holderId].balance -= _amount;
        claims[_billId] = Claim(_billId, _amount, _holderId, _nomineeId, false);

        emit ClaimSubmitted(_billId);
    }

    function verifyClaim(uint256 _billId) external onlyOwner {
        if (claims[_billId].billId == _billId) {
            claims[_billId].isVerified = true;
        }
    }
}
