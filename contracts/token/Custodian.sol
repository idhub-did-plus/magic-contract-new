pragma solidity ^0.5.0;

 contract TokenLike{

    }
contract Custodian {

    mapping (address => mapping(address=>uint)) internal custodiedByCustodianAndInvestor;
    mapping (address => uint) internal totalCustodiedByInvestor;
    mapping (address => uint) internal totalCustodiedByCustodian;
    address private owner;
    TokenLike token;
   
    constructor(address token_)public{
        owner = msg.sender;
        token = TokenLike(token_);

    }
   
  /**
   * @dev Get whitelist status for a tokenHolder.
   * @param tokenHolder Address whom to check the whitelisted status for.
   * @return bool 'true' if tokenHolder is whitelisted, 'false' if not.
   */
   function custodyIt(address tokenHolder, address custodian, uint amount) external  returns (bool) {
        uint custodied = custodiedByCustodianAndInvestor[custodian][tokenHolder];
        custodied = custodied + amount;
        custodiedByCustodianAndInvestor[custodian][tokenHolder] = custodied;

        uint icustodied = totalCustodiedByInvestor[tokenHolder];
        icustodied = icustodied + amount;
        totalCustodiedByInvestor[tokenHolder] = icustodied;

        uint ccustodied = totalCustodiedByCustodian[custodian];
        ccustodied = ccustodied + amount;
        totalCustodiedByCustodian[custodian] = icustodied;
   }


}
