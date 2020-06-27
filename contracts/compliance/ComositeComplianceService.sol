pragma solidity ^0.5.0;

import "./ComplianceService.sol";

contract CompositeComplianceService is ComplianceService {
 
    address[] public components;

    
    constructor ( address[] memory cs) public {
     components = cs;
    }
    

    
    function checkCompliance(address token, address from, address to,  uint256 _value) public view returns (bool) {

          for (uint i = 0; i< components.length; i++){
              ComplianceService c = ComplianceService(components[i]);
              if(!c.checkCompliance(token, from, to, _value))
                return false;

          }
        return true;
    }
    
}
