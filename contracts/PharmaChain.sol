// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Structs} from "./Structs.sol";
import {AccessController} from "./AccessController.sol";

contract PharmaChain is Structs, AccessController {
    constructor() AccessController(msg.sender) {}

    function registerBatch(
        string calldata batchId,
        string calldata name,
        string calldata manufacturer,
        string calldata composition,
        uint256 expiryDate,
        string calldata ipfsDocuments,
        History[] memory history
    ) public {
        require(
            hasRole(ADMIN_ROLE, msg.sender) ||
                hasRole(MANUFACTURER, msg.sender),
            "Error for admin"
        );
        require(!batchIdValidate[batchId], "Already used Batch Id");
        require(expiryDate > block.timestamp, "Add valid date for Expiry date");
        require(_ipfsValidator(ipfsDocuments), "Add Valid Document Hash");

        batchIdValidate[batchId] = true;
        batchIds.push(batchId);

        string[] memory emptyIpfsDocuments;

        DrugBatches[batchId] = DrugBatch({
            batchId: batchId,
            name: name,
            manufacturer: manufacturer,
            composition: composition,
            manufactureDate: block.timestamp,
            expiryDate: expiryDate,
            currentOwner: msg.sender,
            currentStatus: status[Status.REGISTERED],
            ipfsDocuments: emptyIpfsDocuments,
            history: history
        });

        DrugBatches[batchId].ipfsDocuments.push(ipfsDocuments);

        _transferOwnership(msg.sender);

        updateStatus(batchId, 0);

        emit BatchRegistered(batchId, name, block.timestamp);
    }

    function updateStatus(string calldata batchId, uint8 newStatus) public {
        require(
            hasRole(ADMIN_ROLE, msg.sender) ||
                hasRole(MANUFACTURER, msg.sender) ||
                hasRole(DISTRIBUTOR, msg.sender) ||
                hasRole(WHOLESALER, msg.sender) ||
                hasRole(RETAILER, msg.sender),
            "require admin or Manufacturer or Distributor or Wholesaler or Retailer"
        );
        require(batchIdValidate[batchId], "This is not a valid Batch");

        DrugBatches[batchId].currentStatus = newStatus;

        Historys[batchId].status = newStatus;
        Historys[batchId].updatedBy = msg.sender;
        Historys[batchId].timestamp = block.timestamp;
        History memory htry = Historys[batchId];
        DrugBatches[batchId].history.push(htry);
        _transferOwnerShipment(msg.sender, batchId);

        emit Updated(batchId, _getLocation(msg.sender), msg.sender);
    }

    function addDocument(
        string calldata batchId,
        string calldata ipfsHash
    ) public {
        require(
            hasRole(ADMIN_ROLE, msg.sender) ||
                hasRole(MANUFACTURER, msg.sender) ||
                hasRole(DISTRIBUTOR, msg.sender) ||
                hasRole(WHOLESALER, msg.sender) ||
                hasRole(RETAILER, msg.sender),
            "require Manufacturer or Distributor or Wholesaler or Retailer"
        );
        require(batchIdValidate[batchId], "This is not a valid Batch");

        _ipfsValidator(ipfsHash);

        DrugBatches[batchId].ipfsDocuments.push(ipfsHash);

        emit Updated(batchId, _getLocation(msg.sender), msg.sender);
    }

    function getBatchDetails(
        string memory batchId
    ) public view returns (DrugBatch memory) {
        require(batchIdValidate[batchId], "This is not a valid Batch Id");
        DrugBatch memory batch = DrugBatches[batchId];
        return batch;
    }

    function recordIncident(
        string calldata batchId,
        string calldata reason,
        uint8 level,
        bool resolved
    ) public {
        require(
            hasRole(DISTRIBUTOR, msg.sender) ||
                hasRole(WHOLESALER, msg.sender) ||
                hasRole(RETAILER, msg.sender),
            "require Distributor or Wholesaler or Retailer"
        );

        require(batchIdValidate[batchId], "This is not a valid batch Id");

        if (level == 0) {
            Incidents[batchId].push(
                Incident(
                    batchId,
                    reason,
                    _getLocation(msg.sender),
                    block.timestamp,
                    msg.sender,
                    Severity.Critical,
                    resolved
                )
            );
        } else if (level == 1) {
            Incidents[batchId].push(
                Incident(
                    batchId,
                    reason,
                    _getLocation(msg.sender),
                    block.timestamp,
                    msg.sender,
                    Severity.High,
                    resolved
                )
            );
        } else if (level == 2) {
            Incidents[batchId].push(
                Incident(
                    batchId,
                    reason,
                    _getLocation(msg.sender),
                    block.timestamp,
                    msg.sender,
                    Severity.Medium,
                    resolved
                )
            );
        } else {
            Incidents[batchId].push(
                Incident(
                    batchId,
                    reason,
                    _getLocation(msg.sender),
                    block.timestamp,
                    msg.sender,
                    Severity.Low,
                    resolved
                )
            );
        }

        emit Updated(batchId, _getLocation(msg.sender), msg.sender);
    }

    function getIncidentByBatch(
        string calldata batchId
    ) public view returns (Incident[] memory) {
        return Incidents[batchId];
    }

    function getAllBatches() public view returns (string[] memory) {
        return batchIds;
    }

    function getBatchesByOwner(
        address _owner
    ) public view returns (string[] memory) {
        DrugBatch memory batch;
        uint256 ownedBatch = 0;
        for (uint256 i = 0; i < batchIds.length; i++) {
            string memory id = batchIds[i];

            batch = getBatchDetails(id);
            if (batch.currentOwner == _owner) {
                ownedBatch++;
            }
        }

        string[] memory ownedBatches = new string[](ownedBatch);

        uint256 index = 0;
        for (uint256 i = 0; i < batchIds.length; i++) {
            string memory id = batchIds[i];

            batch = getBatchDetails(id);

            if (batch.currentOwner == _owner) {
                ownedBatches[index] = batch.batchId;
                index++;
            }
        }
        return ownedBatches;
    }

    function getBatchesByStatus(
        uint8 _status
    ) public view returns (string[] memory) {
        DrugBatch memory batch;
        uint256 StatusBatchIndex = 0;
        for (uint256 i = 0; i < batchIds.length; i++) {
            string memory id = batchIds[i];

            batch = getBatchDetails(id);
            if (batch.currentStatus == _status) {
                StatusBatchIndex++;
            }
        }

        string[] memory getStatus = new string[](StatusBatchIndex);

        uint256 index = 0;
        for (uint256 i = 0; i < batchIds.length; i++) {
            string memory id = batchIds[i];

            batch = getBatchDetails(id);

            if (batch.currentStatus == _status) {
                getStatus[index] = batch.batchId;
                index++;
            }
        }
        return getStatus;
    }
}
