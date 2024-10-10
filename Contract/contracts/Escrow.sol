// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {

    mapping (address => uint256) public deposits;
    mapping (address => uint256) public heldFunds;
    mapping (address => address) public productOwners;

    event Withdrawal(address indexed payee, uint256 amount);

    modifier onlyOwner(address _payee) {
        require(productOwners[_payee] == msg.sender, "Only the product owner can call");
        _;
    }

    function approve(uint256 amount) public payable {
        deposits[msg.sender] = deposits[msg.sender] + amount;
    }

    function withdraw(address payable payee) external  {
        uint256 payment = deposits[payee];
        deposits[payee] = 0;
        payable(payee).transfer(payment);
        emit Withdrawal(payee, payment);   
    }

    function setProductOwner(address _payee, address _owner) external {
        productOwners[_payee] = _owner;
    }

    function getDeposit(address payee) public view returns (uint256) {
        return deposits[payee];
    }

    function holdFunds(address payee) public {
        uint256 amount = deposits[payee];
        deposits[payee] = 0;
        heldFunds[payee] = amount;
    }   

    function releaseFunds(address payee) public {
        uint256 amount = heldFunds[payee];
        heldFunds[payee] = 0;
        payable(payee).transfer(amount);
    }
}

// ORR, the stuff should use the owner of the product 
// as the agent, like owners of every product 
// that is marked as pending and not available 
//should be able to call the withdraw function,
// yeah i think this makes more sense