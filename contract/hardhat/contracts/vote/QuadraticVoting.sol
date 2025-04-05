// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract QuadraticVoting {
    struct Idea {
        uint256 id;
        string text;
        uint256 score;
    }

    Idea[] public ideas; // 3つのアイデアをデフォルトで登録
    // ↑ もしくは addIdea() でフロントエンドから自由に追加可能

    struct Voter {
        uint256 credits; // デフォルト14
        mapping(uint256 => bool) hasVoted; // (ideaId) => true/false
    }

    mapping(address => Voter) public voters;

    constructor() {
        // 例として3件を初期登録する（IDは1,2,3）
        ideas.push(Idea(1, "A decentralized finance (DeFi) lending platform", 0));
        ideas.push(Idea(2, "An AI-powered health diagnostics tool", 0));
        ideas.push(Idea(3, "A blockchain-based supply chain tracking system", 0));
    }

    /// @notice 新規ユーザとして登録し、14クレジットを付与
    function registerVoter() external {
        require(voters[msg.sender].credits == 0, "Already registered");
        voters[msg.sender].credits = 14; // 初期クレジット
    }

    /// @notice _numVotes 票を投票する（コスト = _numVotes^2）
    ///         1回投票したアイデアへは再投票不可
    function vote(uint256 _ideaId, uint256 _numVotes) external {
        require(_ideaId > 0 && _ideaId <= ideas.length, "Invalid idea ID");
        require(_numVotes == 1 || _numVotes == 2 || _numVotes == 3, "Only 1~3 votes");
        
        Voter storage voter = voters[msg.sender];
        require(voter.credits > 0, "No credits left");
        require(!voter.hasVoted[_ideaId], "Already voted for this idea");

        // コストは numVotes^2
        uint256 cost = _numVotes * _numVotes;
        require(cost <= voter.credits, "Not enough credits");

        // 投票処理
        voter.credits -= cost;
        ideas[_ideaId - 1].score += _numVotes;
        voter.hasVoted[_ideaId] = true;
    }

    /// @notice 登録されているアイデアをすべて取得
    function getIdeas() external view returns (Idea[] memory) {
        return ideas;
    }

    /// @notice ユーザの残りクレジット数を取得
    function getCredits(address _addr) external view returns (uint256) {
        return voters[_addr].credits;
    }
}
