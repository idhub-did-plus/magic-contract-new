pragma solidity ^0.5.0;

import "./ComplianceService.sol";

contract NocheckComplianceService {
  
    function checkCompliance(address token, address from, address to, uint256 _value) public view returns (bool) {
 
        return true;
    }

    
}
