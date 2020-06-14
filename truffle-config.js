const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_directory: "./contracts",
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    develop: {
      port: 7545
    }
    /*
    live: {
      host:"39.105.90.35",
      port: 8099,
      network_id: 6777
    }*/
  },
  compilers:{
    solc:{
      version:"0.5.8"
    }
  }
};
