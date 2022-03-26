require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */ 
const fs = require("fs")
const privateKey = fs.readFileSync(".secret").toString()
const projectId = "rl1h9kBaSI81ec4S__x23Y0ESbf-m-Cy"

module.exports = {

  networks:{
    hardhat: {
      chainId:31337
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${projectId}`,
      accounts: [privateKey]
    },
    mainnet: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${projectId}`,
      accounts: [privateKey]
    }
  },
  solidity: "0.8.4",
};
