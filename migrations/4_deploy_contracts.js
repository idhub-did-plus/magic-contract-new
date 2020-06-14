const ComplianceServiceRegistry = artifacts.require("ComplianceServiceRegistry");
const ConfigurableComplianceService = artifacts.require("ConfigurableComplianceService");

const EthereumClaimsRegistry = artifacts.require("EthereumClaimsRegistry");
const IdentityRegistry = artifacts.require("IdentityRegistry");
const ERC1056 = artifacts.require("ERC1056");
const Strings = artifacts.require("Strings");


module.exports = function (deployer) {
    deployer.deploy(ConfigurableComplianceService,
    EthereumClaimsRegistry.address,
    IdentityRegistry.address,
    ERC1056.address);

    deployer.deploy(Strings);
    deployer.link(Strings, ConfigurableComplianceService);

   deployer.deploy(ComplianceServiceRegistry).then(function(instance){
    instance.setDefaultService(ConfigurableComplianceService.address);
   })
  
}
