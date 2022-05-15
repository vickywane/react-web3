require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {

  },
  networks: {
    ropsten: {
      url: process.env.ALCHEMY_API_URL,
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`]
    }
  },
  paths: {
    artifacts: "./src/contract-artifacts"
  },
};
