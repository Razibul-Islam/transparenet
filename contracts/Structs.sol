// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Structs {
    enum Status {
        REGISTERED,
        SHIPPED,
        IN_TRANSIT,
        DELIVERED
    }
    enum Severity {
        Critical,
        High,
        Medium,
        Low
    }

    struct History {
        address previousOwner;
        address currentOwner;
        uint8 status;
        address updatedBy;
        uint256 timestamp;
    }

    struct DrugBatch {
        string batchId;
        string name;
        string manufacturer;
        string composition;
        uint256 manufactureDate;
        uint256 expiryDate;
        address currentOwner;
        uint8 currentStatus;
        string[] ipfsDocuments;
        History[] history;
    }

    struct Incident {
        string batchId;
        string reason;
        string status;
        uint256 timestamp;
        address reportedBy;
        Severity severityLevel;
        bool resolved;
    }

    mapping(string => DrugBatch) public DrugBatches;
    mapping(string => History) public Historys;
    mapping(string => bool) public batchIdValidate;
    mapping(string => Incident[]) public Incidents;
    mapping(Status => uint8) public status;
    mapping(bytes32 => address[]) public roles;
    mapping(address => bytes32) public getRole;

    string[] batchIds;

    event BatchRegistered(
        string indexed batchId,
        string name,
        uint256 manufactureDate
    );
    event BatchUpdate(
        string indexed batchId,
        string name,
        string location,
        uint256 updateTime,
        string status
    );
    event Updated(
        string indexed batchId,
        string location,
        address IncidentPerson
    );
}
