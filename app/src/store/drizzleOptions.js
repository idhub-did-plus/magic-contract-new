import ComplianceServiceRegistry from "../contracts/ComplianceServiceRegistry.json";
import ConfigurableComplianceService from "../contracts/ConfigurableComplianceService.json";
import NocheckComplianceService from "../contracts/NocheckComplianceService.json";

import EthereumClaimsRegistry from "../contracts/EthereumClaimsRegistry.json";
import IdentityRegistry  from "../contracts/IdentityRegistry.json";
import EthereumDIDRegistry  from "../contracts/EthereumDIDRegistry.json";
import ERC1056  from "../contracts/ERC1056.json";

// import TutorialToken from "../contracts/TutorialToken.json";
const options = {
  web3: {
    block: false,
    fallback: {
      type: "http",
      url: "http://39.105.90.35:8099",
    },
  },
  contracts: [EthereumClaimsRegistry,IdentityRegistry, EthereumDIDRegistry,ERC1056, ComplianceServiceRegistry, ConfigurableComplianceService, NocheckComplianceService],
  events: {
   
  },
  polls: {
    accounts: 1500,
  }
};

export default options;
