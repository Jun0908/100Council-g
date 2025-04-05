// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VCGAuction {
    struct Bid {
        address bidder;
        uint256 value; // in wei
    }

    Bid[] public bids;
    address public owner;
    bool public finalized = false;
    address public winner;
    uint256 public winningBid;
    uint256 public paymentAmount;

    constructor() {
        owner = msg.sender;
    }

    // Users send bid value as msg.value
    function placeBid() external payable {
        require(!finalized, "Auction already finalized");
        require(msg.value > 0, "Bid must be greater than 0");

        bids.push(Bid({
            bidder: msg.sender,
            value: msg.value
        }));
    }

    function finalize() external {
        require(msg.sender == owner, "Only owner can finalize");
        require(!finalized, "Already finalized");
        require(bids.length > 1, "Need at least 2 bids");

        // Sort bids descending (simple bubble sort for demo)
        for (uint i = 0; i < bids.length; i++) {
            for (uint j = i + 1; j < bids.length; j++) {
                if (bids[j].value > bids[i].value) {
                    Bid memory temp = bids[i];
                    bids[i] = bids[j];
                    bids[j] = temp;
                }
            }
        }

        winner = bids[0].bidder;
        winningBid = bids[0].value;

        // Total value others would have gotten if winner didn't participate
        uint256 counterfactualValue = 0;
        for (uint i = 1; i < bids.length; i++) {
            counterfactualValue += bids[i].value;
        }

        paymentAmount = counterfactualValue;
        finalized = true;

        // Send extra funds back to winner
        if (winningBid > paymentAmount) {
            payable(winner).transfer(winningBid - paymentAmount);
        }
    }

    function withdraw() external {
        require(finalized, "Not finalized");

        for (uint i = 1; i < bids.length; i++) {
            if (msg.sender == bids[i].bidder) {
                uint256 refund = bids[i].value;
                bids[i].value = 0;
                payable(msg.sender).transfer(refund);
            }
        }
    }

    function getBids() external view returns (Bid[] memory) {
        return bids;
    }
}
