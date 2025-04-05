// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PredictionMarket {
    address public owner;
    uint256 public totalYes;
    uint256 public totalNo;
    bool public resolved;
    bool public outcomeYes;
    mapping(address => uint256) public yesBets;
    mapping(address => uint256) public noBets;
    mapping(address => bool) public hasVoted;

    event Voted(address indexed voter, bool voteType, uint256 amount);
    event Resolved(bool outcomeYes);
    event Withdrawn(address indexed user, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can execute this");
        _;
    }

    modifier onlyBeforeResolution() {
        require(!resolved, "Voting has ended");
        _;
    }

    modifier hasNotVoted() {
        require(!hasVoted[msg.sender], "You have already voted");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function vote(bool _voteYes) external payable onlyBeforeResolution hasNotVoted {
    require(msg.value > 0, "Must send ETH to vote");
    hasVoted[msg.sender] = true;

    if (_voteYes == true) {  // ✅ 修正: 明示的な true/false 判定
        yesBets[msg.sender] += msg.value;
        totalYes += msg.value;
    } else {
        noBets[msg.sender] += msg.value;
        totalNo += msg.value;
    }

    emit Voted(msg.sender, _voteYes, msg.value);
    }

    function resolveMarket(bool _outcomeYes) external onlyOwner onlyBeforeResolution {
        resolved = true;
        outcomeYes = _outcomeYes;
        emit Resolved(outcomeYes);
    }

    function withdraw() external {
        require(resolved, "Market not resolved yet");

        uint256 payout = 0;
        if (outcomeYes && yesBets[msg.sender] > 0) {
            payout = (yesBets[msg.sender] * address(this).balance) / totalYes;
            yesBets[msg.sender] = 0;
        } else if (!outcomeYes && noBets[msg.sender] > 0) {
            payout = (noBets[msg.sender] * address(this).balance) / totalNo;
            noBets[msg.sender] = 0;
        }

        require(payout > 0, "No winnings to withdraw");
        payable(msg.sender).transfer(payout);
        emit Withdrawn(msg.sender, payout);
    }
}
