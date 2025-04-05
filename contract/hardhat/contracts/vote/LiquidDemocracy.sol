// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LiquidDemocracy {
    struct Voter {
        bool voted;     
        address delegate; 
    }

    mapping(address => Voter) public voters;
    mapping(uint => uint) public votes;
    address public owner;
    uint public proposalCount;
    address[] public voterList; 

    event Voted(address indexed voter, uint proposal);
    event Delegated(address indexed from, address indexed to);
    event VotesReset(address indexed by);

    constructor(uint _proposalCount) {
        owner = msg.sender;
        proposalCount = _proposalCount;
    }

    function vote(uint proposal) public {
        require(proposal < proposalCount, "Invalid proposal");
        require(!voters[msg.sender].voted, "Already voted");

        address voter = msg.sender;
        while (voters[voter].delegate != address(0)) {
            voter = voters[voter].delegate;
        }

        if (voters[msg.sender].delegate == address(0)) {
            voterList.push(msg.sender); 
        }

        voters[msg.sender].voted = true;
        votes[proposal] += 1;
        emit Voted(voter, proposal);
    }

    function delegate(address to) public {
        require(to != msg.sender, "Cannot delegate to yourself");
        require(!voters[msg.sender].voted, "Already voted");

        address currentDelegate = to;
        while (voters[currentDelegate].delegate != address(0)) {
            currentDelegate = voters[currentDelegate].delegate;
            require(currentDelegate != msg.sender, "Delegation loop detected");
        }

        if (voters[msg.sender].delegate == address(0)) {
            voterList.push(msg.sender); 
        }

        voters[msg.sender].voted = true;
        voters[msg.sender].delegate = to;
        emit Delegated(msg.sender, to);
    }

    function getVotes(uint proposal) public view returns (uint) {
        require(proposal < proposalCount, "Invalid proposal");
        return votes[proposal];
    }

    function resetVotes() public {
        require(msg.sender == owner, "Only owner can reset votes");

        for (uint i = 0; i < proposalCount; i++) {
            votes[i] = 0;
        }

        for (uint i = 0; i < voterList.length; i++) {
            address voter = voterList[i];
            voters[voter].voted = false;
            voters[voter].delegate = address(0);
        }

        delete voterList; 
        emit VotesReset(msg.sender);
    }
}

