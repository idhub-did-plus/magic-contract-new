pragma solidity ^0.5.0;
import "./interfaces/IERC2258.sol";
 contract TokenLike{
        function transferFrom(address from, address to, uint256 amount) external;
        function balanceOf(address holder)  external view returns (uint256);

    }
contract Custodian is IERC2258{

    mapping (address => mapping(address=>uint256)) internal custodyAllowanceOf;
    mapping (address => uint256) internal totalInvestorAllowance;
    mapping (address => uint256) internal totalCustodyAllowance;
    mapping (address => uint256) internal custodyAllowanceLimit;
    mapping (address => bool) internal isCustodian;
    address private owner;
    TokenLike token;
   
    constructor(address token_)public{
        owner = msg.sender;
        token = TokenLike(token_);

    }

   function increaseCustodyAllowanceOf( address custodian, uint256 amount) external {
      
       address tokenHolder = msg.sender;
       _increaseCustodyAllowanceOf(tokenHolder,tokenHolder, amount);
        require(token.balanceOf(tokenHolder) > totalInvestorAllowance[tokenHolder], "not enough token to be allowed!");
   }

   function _increaseCustodyAllowanceOf( address tokenHolder,  address custodian, uint256 amount) internal {
     
        uint256 custodied = custodyAllowanceOf[custodian][tokenHolder];
        custodied = custodied + amount;
        custodyAllowanceOf[custodian][tokenHolder] = custodied;

        uint256 icustodied = totalInvestorAllowance[tokenHolder];
        icustodied = icustodied + amount;
        totalInvestorAllowance[tokenHolder] = icustodied;

        uint256 ccustodied = totalCustodyAllowance[custodian];
        ccustodied = ccustodied + amount;
        totalCustodyAllowance[custodian] = icustodied;
   }
  function increaseCustodyAllowanceLimit(address _custodian, uint256 _amount) external{
        uint256 limit = custodyAllowanceLimit[_custodian];
        limit = limit + _amount;
        custodyAllowanceLimit[_custodian] = limit;
  }

  

    function transferByCustodian(address _tokenHolder, address _receiver, uint256 _amount) external{
        require(isCustodian[msg.sender], "not a custodian!");
        require(custodyAllowanceOf[msg.sender][_tokenHolder] >= _amount, "not enough token in custody!");
        _increaseCustodyAllowanceOf(_tokenHolder, msg.sender, -_amount);
        token.transferFrom(_tokenHolder,_receiver,_amount);

    }


}
