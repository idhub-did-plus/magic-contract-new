pragma solidity ^0.5.0;

contract ComplianceService {
    function checkCompliance(address token, address from, address to,  uint256 _value) public view  returns (bool);
}
