pragma solidity^0.5.0;


interface IERC2258 {
 function increaseCustodyAllowanceOf( address custodian, uint256 amount) external;
  function increaseCustodyAllowanceLimit(address _custodian, uint256 _amount) external;

    // Query individual custody limit and total custody limit across all custodians
    function custodyAllowanceOf( address _custodian, address _tokenHolder) external view returns (uint256);
    function custodyAllowanceLimit(address _custodian) external view returns (uint256);
    function totalCustodyAllowance(address _custodian) external view returns (uint256);
    function totalInvestorAllowance(address _tokenHolder) external view returns (uint256);
    // Allows a custodian to exercise their right to transfer custodied tokens
    function transferByCustodian(address _tokenHolder, address _receiver, uint256 _amount) external;
    // Custody Events
    event CustodyTransfer(address _custodian, address _from, address _to, uint256 _amount);
    event CustodyAllowanceChanged(address _tokenHolder, address _custodian, uint256 _oldAllowance, uint256 _newAllowance);

}