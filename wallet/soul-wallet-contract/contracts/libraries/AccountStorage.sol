// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "@account-abstraction/contracts/interfaces/IEntryPoint.sol";

/**
 * @title AccountStorage
 * @notice A library that defines the storage layout for the SoulWallet account or contract.
 */
library AccountStorage {
    bytes32 private constant _ACCOUNT_SLOT = keccak256("soulwallet.contracts.AccountStorage");

    struct Layout {
        // ┌───────────────────┐
        // │     base data     │
        mapping(bytes32 => bytes32) owners;
        address defaultFallbackContract;
        uint256[50] __gap_0;
        // └───────────────────┘

        // ┌───────────────────┐
        // │      EIP1271      │
        mapping(bytes32 => uint256) approvedHashes;
        uint256[50] __gap_1;
        // └───────────────────┘

        // ┌───────────────────┐
        // │       Module      │
        mapping(address => address) modules;
        mapping(address => mapping(bytes4 => bytes4)) moduleSelectors;
        uint256[50] __gap_2;
        // └───────────────────┘

        // ┌───────────────────┐
        // │       Plugin      │
        mapping(address => address) plugins;
        mapping(address => address) guardHookPlugins;
        mapping(address => address) preHookPlugins;
        mapping(address => address) postHookPlugins;
        mapping(address => mapping(bytes32 => bytes)) pluginDataBytes;
        uint256[50] __gap_3;
    }
    // └───────────────────┘

    /**
     * @notice Returns the layout of the storage for the account or contract.
     * @return l The layout of the storage.
     */
    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = _ACCOUNT_SLOT;
        assembly ("memory-safe") {
            l.slot := slot
        }
    }
}
