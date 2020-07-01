interface IERCx {

    // Increase the custody limit of a custodian either directly or via signed authorisation
    function increaseCustodyAllowance(address _custodian, uint256 _amount) external;
    function increaseCustodyAllowanceOf(address _tokenHolder, address _custodian, uint256 _amount, uint256 _nonce, bytes calldata _sig) external;

    // Query individual custody limit and total custody limit across all custodians
    function custodyAllowance(address _tokenHolder, address _custodian) external view returns (uint256);
    function totalCustodyAllowance(address _tokenHolder) external view returns (uint256);

    // Allows a custodian to exercise their right to transfer custodied tokens
    function transferByCustodian(address _tokenHolder, address _receiver, uint256 _amount) external;

    // Custody Events
    event CustodyTransfer(address _custodian, address _from, address _to, uint256 _amount);
    event CustodyAllowanceChanged(address _tokenHolder, address _custodian, uint256 _oldAllowance, uint256 _newAllowance);

}