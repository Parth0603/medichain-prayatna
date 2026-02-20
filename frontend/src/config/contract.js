export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || ''

export const CONTRACT_ABI = [
  "function registerBatch(string memory _batchId, string memory _productName, uint256 _quantity, uint256 _expiryDate, string memory _storageRules) public",
  "function transferOwnership(string memory _batchId, address _newOwner) public",
  "function addShipmentData(string memory _batchId, string memory _location, int256 _temperature) public",
  "function flagBatch(string memory _batchId) public",
  "function getBatch(string memory _batchId) public view returns (string memory batchId, string memory productName, uint256 quantity, uint256 expiryDate, string memory storageRules, address currentOwner, bool isFlagged)",
  "function getShipmentHistory(string memory _batchId) public view returns (tuple(uint256 timestamp, string location, int256 temperature, bool isBreach)[] memory)",
  "event BatchRegistered(string indexed batchId, string productName, uint256 quantity, address indexed manufacturer)",
  "event OwnershipTransferred(string indexed batchId, address indexed previousOwner, address indexed newOwner)",
  "event ShipmentAdded(string indexed batchId, string location, int256 temperature, bool isBreach, uint256 timestamp)",
  "event BatchFlagged(string indexed batchId, address indexed flaggedBy)"
]
