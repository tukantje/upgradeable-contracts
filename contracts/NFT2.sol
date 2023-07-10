// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./NFT.sol";

contract NFT2 is NFT {
    function version() public pure returns (string memory) {
        return "2";
    }
}
