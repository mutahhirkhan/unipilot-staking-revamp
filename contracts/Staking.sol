// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;
import "./interfaces/IStaking.sol";

contract Staking is IStaking {
    uint256 public totalStakedAmount;



    function stake(uint256 amount) external override {
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external override {
        emit Unstaked(msg.sender, amount);
    }

    function claim() external override {
        emit Claimed(msg.sender, totalStakedAmount);
    }
}
