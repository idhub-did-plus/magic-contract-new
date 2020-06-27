pragma solidity ^0.5.0;

import "../ComplianceService.sol";

contract CompositeCS is ComplianceService {
 
    address[] public components;
    bool and;
    
    constructor ( address[] memory cs, bool a) public {
     components = cs;
     and = a;
    }
    

    
    function checkCompliance(address token, address from, address to,  uint256 _value) public view returns (bool) {

          for (uint i = 0; i< components.length; i++){
              ComplianceService c = ComplianceService(components[i]);
              bool passed = c.checkCompliance(token, from, to, _value);
              if(and){
                if(!passed)
                  return false;
              }else{
                if(passed)
                  return true;
              }

          }
        return and?true:false;
    }
    
}
