const { task } = require('hardhat/config');

/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const { WALLET_PRIVATE_KEY, POLYGONSCAN_API_KEY } = process.env

task("deploy", "Deploy contract, use --contract <address> [--args <constructor-args>]'")
  .addParam("contract","Contract name")
  .addOptionalParam("args", "Contract construtor arguments")
  .setAction(async (taskArgs) => {
    const [deployer] = await ethers.getSigners();

    console.log(`Deploying contracts with the account:, ${deployer.address}`);
  
    console.log(`Account balance:, ${(await deployer.getBalance()).toString()}`);
  
    const Token = await ethers.getContractFactory(taskArgs.contract);
    const token = taskArgs.args ? await Token.deploy(taskArgs.args) : await Token.deploy()
  
    console.log(`Contract address:, ${token.address}`);
  });

module.exports = {
  solidity: "0.8.4",
  networks: {
    matic: {
      url: 'https://rpc.ankr.com/polygon',
      accounts: [`0x${WALLET_PRIVATE_KEY}`]
    },
    mumbai: {
      url: 'https://rpc.ankr.com/polygon_mumbai',
      accounts: [`0x${WALLET_PRIVATE_KEY}`]
    },
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY
  },
};
