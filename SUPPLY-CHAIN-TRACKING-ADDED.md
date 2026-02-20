# Supply Chain Tracking Feature Added

## Overview
Enhanced the shipment tracking system to capture complete supply chain flow from manufacturer to customer with detailed entity information.

## Database Changes

### New Columns Added to `shipments` Table:
- `from_type` - Entity type (Manufacturer/Warehouse/Pharmacy)
- `from_name` - Name of sender entity
- `from_address` - Address of sender
- `from_contact` - Contact info (optional)
- `to_type` - Entity type (Warehouse/Pharmacy/Customer)
- `to_name` - Name of receiver entity
- `to_address` - Address of receiver
- `to_contact` - Contact info (optional)

## Frontend Changes

### Shipment Page Enhanced:
1. **From (Sender) Section:**
   - Dropdown: Manufacturer / Warehouse / Pharmacy
   - Name field (required)
   - Address field (required)
   - Contact field (optional)

2. **To (Receiver) Section:**
   - Dropdown: Warehouse / Pharmacy / Customer
   - Name field (required)
   - Address field (required)
   - Contact field (optional)

3. **Auto-location:** Location field now auto-populates from "To" address

### ShipmentCard Component Enhanced:
- Visual supply chain flow display
- Color-coded entity types:
  - Manufacturer: Blue
  - Warehouse: Purple
  - Pharmacy: Green
  - Customer: Orange
- Icons for each entity type
- Arrow showing flow direction
- Complete sender and receiver details displayed

## Backend Changes

### Updated Controllers:
- `addShipment()` - Now accepts and saves supply chain tracking data
- `simulateBreach()` - Validates batch exists before simulating

### Updated Database Service:
- `saveShipment()` - Saves all supply chain fields

## Features

### Supply Chain Visibility:
- Track complete journey: Manufacturer → Warehouse → Pharmacy → Customer
- Capture entity details at each step
- Visual representation of flow
- Contact information for traceability

### Error Handling:
- Batch validation before breach simulation
- Clear error messages for missing batches
- Temperature range validation

## How to Use

1. **Add Shipment:**
   - Enter batch ID
   - Select "From" entity type and fill details
   - Select "To" entity type and fill details
   - Enter temperature
   - Submit

2. **View Shipment History:**
   - Go to Receiver page or Verify page
   - See complete supply chain flow for each shipment
   - Color-coded cards show entity types
   - Arrow indicates direction of movement

## Testing

1. Start the application: `npm start`
2. Register a batch on Manufacturer page
3. Go to Shipment page
4. Add shipment with complete supply chain details
5. View on Receiver page to see the visual flow

## Notes
- Contact fields are optional for flexibility
- Entity types are predefined for consistency
- Visual design makes supply chain flow easy to understand
- All data stored in database for fast queries
