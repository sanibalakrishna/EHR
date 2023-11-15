// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface for ERC20 token (used for premium payments)
interface IERC20 {
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
}

// Contract for LIC Life and Health Insurance
contract LICInsuranceContract {
    // Structure to represent an insurance policy
    struct InsurancePolicy {
        address policyHolder;
        address nominee;
        string holderName;
        string nomineeName;
        uint256 premiumAmount;
        uint256 coverageAmount;
        uint256 policyTerm; // In months
        uint256 startTime;
        bool isClaimed;
    }

    // Mapping to store policies for each user
    mapping(address => InsurancePolicy) public insurancePolicies;

    address public owner;
    IERC20 public token; // The token used for premium payments

    // Events
    event PolicyPurchased(
        address indexed policyHolder,
        string holderName,
        address nominee,
        string nomineeName,
        uint256 premiumAmount,
        uint256 coverageAmount,
        uint256 policyTerm
    );
    event Claimed(
        address indexed policyHolder,
        string holderName,
        address nominee,
        string nomineeName,
        uint256 amount
    );

    constructor(address _tokenAddress) {
        owner = msg.sender;
        token = IERC20(_tokenAddress);
    }

    // Function to purchase a life insurance policy
    function purchaseLifeInsurance(
        string calldata _holderName,
        address _nominee,
        string calldata _nomineeName,
        uint256 _premiumAmount,
        uint256 _coverageAmount,
        uint256 _policyTerm
    ) external {
        require(
            insurancePolicies[msg.sender].policyHolder == address(0),
            "Policy already exists for the user"
        );
        require(
            _premiumAmount > 0 && _coverageAmount > 0 && _policyTerm > 0,
            "Invalid policy parameters"
        );

        // Transfer initial premium amount from policy holder to this contract
        require(
            token.transferFrom(msg.sender, address(this), _premiumAmount),
            "Premium transfer failed"
        );

        InsurancePolicy memory newPolicy = InsurancePolicy({
            policyHolder: msg.sender,
            nominee: _nominee,
            holderName: _holderName,
            nomineeName: _nomineeName,
            premiumAmount: _premiumAmount,
            coverageAmount: _coverageAmount,
            policyTerm: _policyTerm,
            startTime: block.timestamp,
            isClaimed: false
        });

        insurancePolicies[msg.sender] = newPolicy;

        emit PolicyPurchased(
            msg.sender,
            _holderName,
            _nominee,
            _nomineeName,
            _premiumAmount,
            _coverageAmount,
            _policyTerm
        );
    }

    // Function to pay monthly premium
    function payMonthlyPremium() external {
        InsurancePolicy storage policy = insurancePolicies[msg.sender];
        require(
            policy.policyHolder != address(0),
            "Policy does not exist for the user"
        );
        require(!policy.isClaimed, "Policy already claimed");

        // Check if the policy term has not expired
        require(
            block.timestamp < policy.startTime + (policy.policyTerm * 1 days),
            "Policy term has expired"
        );

        // Calculate the monthly premium amount
        uint256 monthlyPremium = policy.premiumAmount / policy.policyTerm;

        // Transfer monthly premium amount from policy holder to this contract
        require(
            token.transferFrom(msg.sender, address(this), monthlyPremium),
            "Premium transfer failed"
        );
    }

    // Function to claim insurance
    function claimInsurance() external {
        InsurancePolicy storage policy = insurancePolicies[msg.sender];
        require(
            policy.policyHolder != address(0),
            "Policy does not exist for the user"
        );
        require(!policy.isClaimed, "Policy already claimed");

        // Check if the policy term has passed
        require(
            block.timestamp >= policy.startTime + (policy.policyTerm * 1 days),
            "Policy term not completed"
        );

        // Mark the policy as claimed
        policy.isClaimed = true;

        // Transfer the coverage amount to the nominee
        require(
            token.transfer(policy.nominee, policy.coverageAmount),
            "Coverage transfer failed"
        );

        emit Claimed(
            msg.sender,
            policy.holderName,
            policy.nominee,
            policy.nomineeName,
            policy.coverageAmount
        );
    }

    // Function to check the balance of the contract
    function getContractBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }
}
