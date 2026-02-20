// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MediChain {
    
    // Shipment structure to track each movement
    struct Shipment {
        uint256 timestamp;
        string location;
        int256 temperature;
        bool isBreach;
    }
    
    // Batch structure representing a box of medicine packets
    struct Batch {
        string batchId;
        string productName;
        uint256 quantity;
        uint256 expiryDate;
        string storageRules;
        address currentOwner;
        bool isFlagged;
        Shipment[] shipmentHistory;
    }
    
    // State variables
    mapping(string => Batch) private batches;
    mapping(string => bool) private batchExists;
    
    // Events
    event BatchRegistered(
        string indexed batchId,
        string productName,
        uint256 quantity,
        address indexed manufacturer
    );
    
    event OwnershipTransferred(
        string indexed batchId,
        address indexed previousOwner,
        address indexed newOwner
    );
    
    event ShipmentAdded(
        string indexed batchId,
        string location,
        int256 temperature,
        bool isBreach,
        uint256 timestamp
    );
    
    event BatchFlagged(
        string indexed batchId,
        address indexed flaggedBy
    );
    
    // Register a new batch - only manufacturer can call
    function registerBatch(
        string memory _batchId,
        string memory _productName,
        uint256 _quantity,
        uint256 _expiryDate,
        string memory _storageRules
    ) public {
        require(!batchExists[_batchId], "Batch ID already exists");
        require(bytes(_batchId).length > 0, "Batch ID cannot be empty");
        require(bytes(_productName).length > 0, "Product name cannot be empty");
        require(_quantity > 0, "Quantity must be greater than zero");
        require(_expiryDate > block.timestamp, "Expiry date must be in the future");
        
        Batch storage newBatch = batches[_batchId];
        newBatch.batchId = _batchId;
        newBatch.productName = _productName;
        newBatch.quantity = _quantity;
        newBatch.expiryDate = _expiryDate;
        newBatch.storageRules = _storageRules;
        newBatch.currentOwner = msg.sender;
        newBatch.isFlagged = false;
        
        batchExists[_batchId] = true;
        
        emit BatchRegistered(_batchId, _productName, _quantity, msg.sender);
    }
    
    // Transfer ownership of a batch to a new owner
    function transferOwnership(
        string memory _batchId,
        address _newOwner
    ) public {
        require(batchExists[_batchId], "Batch does not exist");
        require(batches[_batchId].currentOwner == msg.sender, "Only current owner can transfer ownership");
        require(_newOwner != address(0), "Invalid new owner address");
        require(_newOwner != msg.sender, "Cannot transfer to yourself");
        
        address previousOwner = batches[_batchId].currentOwner;
        batches[_batchId].currentOwner = _newOwner;
        
        emit OwnershipTransferred(_batchId, previousOwner, _newOwner);
    }
    
    // Add shipment data and check for temperature breaches
    function addShipmentData(
        string memory _batchId,
        string memory _location,
        int256 _temperature
    ) public {
        require(batchExists[_batchId], "Batch does not exist");
        require(batches[_batchId].currentOwner == msg.sender, "Only current owner can add shipment data");
        require(bytes(_location).length > 0, "Location cannot be empty");
        
        // Check if temperature is outside safe range (2-8°C)
        bool isBreach = _temperature < 2 || _temperature > 8;
        
        // Create new shipment record
        Shipment memory newShipment = Shipment({
            timestamp: block.timestamp,
            location: _location,
            temperature: _temperature,
            isBreach: isBreach
        });
        
        batches[_batchId].shipmentHistory.push(newShipment);
        
        // Flag batch if breach occurs
        if (isBreach) {
            batches[_batchId].isFlagged = true;
        }
        
        emit ShipmentAdded(_batchId, _location, _temperature, isBreach, block.timestamp);
    }
    
    // Flag a batch manually
    function flagBatch(string memory _batchId) public {
        require(batchExists[_batchId], "Batch does not exist");
        require(batches[_batchId].currentOwner == msg.sender, "Only current owner can flag batch");
        
        batches[_batchId].isFlagged = true;
        
        emit BatchFlagged(_batchId, msg.sender);
    }
    
    // Get batch information (without shipment history)
    function getBatch(string memory _batchId) public view returns (
        string memory batchId,
        string memory productName,
        uint256 quantity,
        uint256 expiryDate,
        string memory storageRules,
        address currentOwner,
        bool isFlagged
    ) {
        require(batchExists[_batchId], "Batch does not exist");
        
        Batch storage batch = batches[_batchId];
        return (
            batch.batchId,
            batch.productName,
            batch.quantity,
            batch.expiryDate,
            batch.storageRules,
            batch.currentOwner,
            batch.isFlagged
        );
    }
    
    // Get complete shipment history for a batch
    function getShipmentHistory(string memory _batchId) public view returns (Shipment[] memory) {
        require(batchExists[_batchId], "Batch does not exist");
        return batches[_batchId].shipmentHistory;
    }
}
