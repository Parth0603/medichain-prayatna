const { ethers } = require('ethers');
require('dotenv').config();

async function checkBalance() {
  const provider = new ethers.JsonRpcProvider('https://rpc-amoy.polygon.technology/');
  const address = '0x37A823a1E3d80A53a7478F2Be74D2013Ec6836dA';
  
  const balance = await provider.getBalance(address);
  const balanceInPOL = ethers.formatEther(balance);
  
  console.log('=================================');
  console.log('Wallet Address:', address);
  console.log('Balance:', balanceInPOL, 'POL');
  console.log('=================================');
}

checkBalance();
