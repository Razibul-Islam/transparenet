const { ethers } = require("hardhat");

async function main() {
  const Pharma = await ethers.getContractFactory("PharmaChain");
  console.log("Deploying...");
  const pharma = await Pharma.deploy();
  await pharma.waitForDeployment();
  const address = await pharma.getAddress();
  console.log("Address is: ", address);
}

main().catch((err) => {
  console.log("Error during deploy: ", err);
  // eslint-disable-next-line no-undef
  process.exit(1);
});

// 0x1d22514C2c914151166C126067Ba683A988AD5ca
