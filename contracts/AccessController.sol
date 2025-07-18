// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {Structs} from "./Structs.sol";

contract AccessController is AccessControl, Ownable, Structs {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public MANUFACTURER = keccak256("MANUFACTURER");
    bytes32 public DISTRIBUTOR = keccak256("DISTRIBUTOR");
    bytes32 public WHOLESALER = keccak256("WHOLESALER");
    bytes32 public RETAILER = keccak256("RETAILER");

    constructor(address initialOwner) Ownable(initialOwner) {
        _grantRole(ADMIN_ROLE, initialOwner);
    }

    function _makeManufacturer(address addr) external {
        require(hasRole(ADMIN_ROLE, msg.sender));
        _grantRole(MANUFACTURER, addr);
        roles[MANUFACTURER].push(addr);
        getRole[addr] = MANUFACTURER;
        emit RoleGranted(MANUFACTURER, addr, msg.sender);
    }

    function _makeDistributor(address addr) external {
        require(
            hasRole(ADMIN_ROLE, msg.sender) || hasRole(MANUFACTURER, msg.sender)
        );
        _grantRole(DISTRIBUTOR, addr);
        roles[DISTRIBUTOR].push(addr);
        getRole[addr] = DISTRIBUTOR;
        emit RoleGranted(DISTRIBUTOR, addr, msg.sender);
    }

    function _makeWholesaler(address addr) external {
        require(
            hasRole(ADMIN_ROLE, msg.sender) ||
                hasRole(MANUFACTURER, msg.sender) ||
                hasRole(DISTRIBUTOR, msg.sender)
        );
        _grantRole(WHOLESALER, addr);
        roles[WHOLESALER].push(addr);
        getRole[addr] = WHOLESALER;
        emit RoleGranted(WHOLESALER, addr, msg.sender);
    }

    function _makeRetailer(address addr) external {
        require(
            hasRole(ADMIN_ROLE, msg.sender) ||
                hasRole(MANUFACTURER, msg.sender) ||
                hasRole(DISTRIBUTOR, msg.sender) ||
                hasRole(WHOLESALER, msg.sender)
        );
        _grantRole(RETAILER, addr);
        roles[RETAILER].push(addr);
        getRole[addr] = RETAILER;
        emit RoleGranted(RETAILER, addr, msg.sender);
    }

    function revokeRolee(
        string memory _roll,
        address _addr
    ) public onlyRole(ADMIN_ROLE) {
        bytes32 role = keccak256(abi.encodePacked(_roll));
        require(hasRole(role, _addr));
        _revokeRole(role, _addr);
    }

    function getRoleMembers(
        string memory role
    ) public view returns (address[] memory) {
        bytes32 rolee = keccak256(abi.encodePacked(role));
        return roles[rolee];
    }

    function hasAnyRole(address addr) public view returns (bytes32) {
        return getRole[addr];
    }

    function _ipfsValidator(
        string calldata ipfsHash
    ) internal pure returns (bool) {
        bytes memory hashByte = bytes(ipfsHash);
        uint256 length = hashByte.length;

        if (length < 44 || length > 62) {
            return false;
        }

        if (length >= 2) {
            if (hashByte[0] == 0x51 && hashByte[1] == 0x6d) {
                return length == 46;
            }
            if (hashByte[0] == 0x62) {
                return length >= 44;
            }
        }
        return false;
    }

    function _getLocation(address addr) internal view returns (string memory) {
        string memory location;
        if (hasRole(DISTRIBUTOR, addr)) {
            location = "DISTRIBUTOR";
        } else if (hasRole(WHOLESALER, addr)) {
            location = "WHOLESALER";
        } else {
            location = "RETAILER";
        }

        return location;
    }

    function _transferOwnerShipment(
        address _addr,
        string calldata batchId
    ) internal {
        _transferOwnership(_addr);
        Historys[batchId].previousOwner = msg.sender;
        Historys[batchId].currentOwner = _addr;
        emit OwnershipTransferred(msg.sender, _addr);
    }
}
