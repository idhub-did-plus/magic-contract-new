pragma solidity ^0.5.0;

interface IdentityRegistryInterface {
    function isSigned(address _address, bytes32 messageHash, uint8 v, bytes32 r, bytes32 s)
        external pure returns (bool);

    // Identity View Functions /////////////////////////////////////////////////////////////////////////////////////////
    function identityExists(uint ein) external view returns (bool);
    function hasIdentity(address _address) external view returns (bool);
    function getEIN(address _address) external view returns (uint ein);
    function isAssociatedAddressFor(uint ein, address _address) external view returns (bool);
    function isProviderFor(uint ein, address provider) external view returns (bool);
    function isResolverFor(uint ein, address resolver) external view returns (bool);
    function getIdentity(uint ein) external view returns (
        address recoveryAddress,
        address[] memory associatedAddresses, address[] memory providers, address[] memory resolvers
    );

    // Identity Management Functions ///////////////////////////////////////////////////////////////////////////////////
    function createIdentity(address recoveryAddress, address[] calldata providers, address[] calldata resolvers)
        external returns (uint ein);
        
       function encode(
        address recoveryAddress, address associatedAddress, address[] calldata providers, address[] calldata resolvers,
         uint timestamp)   external view returns (bytes memory);
    function createIdentityDelegated(
        address recoveryAddress, address associatedAddress, address[] calldata providers, address[] calldata resolvers,
        uint8 v, bytes32 r, bytes32 s, uint timestamp
    ) external returns (uint ein);
    function addAssociatedAddress(
        address approvingAddress, address addressToAdd, uint8 v, bytes32 r, bytes32 s, uint timestamp
    ) external;
    function addAssociatedAddressDelegated(
        address approvingAddress, address addressToAdd,
        uint8[2] calldata v, bytes32[2] calldata r, bytes32[2] calldata s, uint[2] calldata timestamp
    ) external;
    function removeAssociatedAddress() external;
    function removeAssociatedAddressDelegated(address addressToRemove, uint8 v, bytes32 r, bytes32 s, uint timestamp)
        external;
    function addProviders(address[] calldata providers) external;
    function addProvidersFor(uint ein, address[] calldata providers) external;
    function removeProviders(address[] calldata providers) external;
    function removeProvidersFor(uint ein, address[] calldata providers) external;
    function addResolvers(address[] calldata resolvers) external;
    function addResolversFor(uint ein, address[] calldata resolvers) external;
    function removeResolvers(address[] calldata resolvers) external;
    function removeResolversFor(uint ein, address[] calldata resolvers) external;

    // Recovery Management Functions ///////////////////////////////////////////////////////////////////////////////////
    function triggerRecoveryAddressChange(address newRecoveryAddress) external;
    function triggerRecoveryAddressChangeFor(uint ein, address newRecoveryAddress) external;
    function triggerRecovery(uint ein, address newAssociatedAddress, uint8 v, bytes32 r, bytes32 s, uint timestamp)
        external;
    function triggerDestruction(
        uint ein, address[] calldata firstChunk, address[] calldata lastChunk, bool resetResolvers
    ) external;
     event IdentityCreated(
        address indexed initiator, uint indexed ein,
        address recoveryAddress, address associatedAddress, address[] providers, address[] resolvers, bool delegated
    );
    event AssociatedAddressAdded(
        address indexed initiator, uint indexed ein, address approvingAddress, address addedAddress, bool delegated
    );
    event AssociatedAddressRemoved(address indexed initiator, uint indexed ein, address removedAddress, bool delegated);
    event ProviderAdded(address indexed initiator, uint indexed ein, address provider, bool delegated);
    event ProviderRemoved(address indexed initiator, uint indexed ein, address provider, bool delegated);
    event ResolverAdded(address indexed initiator, uint indexed ein, address resolvers, bool delegated);
    event ResolverRemoved(address indexed initiator, uint indexed ein, address resolvers, bool delegated);
    event RecoveryAddressChangeTriggered(
        address indexed initiator, uint indexed ein,
        address oldRecoveryAddress, address newRecoveryAddress, bool delegated
    );
    event RecoveryTriggered(
        address indexed initiator, uint indexed ein, address[] oldAssociatedAddresses, address newAssociatedAddress
    );
    event IdentityDestroyed(address indexed initiator, uint indexed ein, address recoveryAddress, bool resolversReset);
}
