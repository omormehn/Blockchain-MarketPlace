// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    address agent;
    mapping (address => uint256) public deposits;
    mapping (address => uint256) public heldFunds;

    event Withdrawal(address indexed payee, uint256 amount);

    modifier onlyAgent() {
        require(msg.sender == agent, "Agent is not caller");
        _;
    }

    constructor() {
        agent = msg.sender;
    }

    function deposit(address payee) public onlyAgent payable {
        uint256 amount = msg.value;
        deposits[payee] = deposits[payee] + amount;
    }

    function withdraw(address payable payee) public onlyAgent {
        uint256 payment = deposits[payee];
        deposits[payee] = 0;
        payable(payee).transfer(payment);
        emit Withdrawal(payee, payment);
    }

    function getDeposit(address payee) public view onlyAgent returns (uint256) {
        return deposits[payee];
    }

    function holdFunds(address payee) public onlyAgent {
        uint256 amount = deposits[payee];
        deposits[payee] = 0;
        heldFunds[payee] = amount;
    }   

    function releaseFunds(address payee) public onlyAgent {
        uint256 amount = heldFunds[payee];
        heldFunds[payee] = 0;
        payable(payee).transfer(amount);
    }
}