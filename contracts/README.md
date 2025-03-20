# BlockLearn Certificate NFT

BlockLearn Certificate is a blockchain-based certification system built on Ethereum (EduChain). It enables educational institutions to issue tamper-proof, verifiable certificates as ERC-721 NFTs.

## Features

- **ERC-721 NFT Certificates**: Certificates are issued as unique NFTs.
- **Whitelist Mechanism**: Only whitelisted users can claim certificates.
- **One-time Claim**: Each user can claim only one certificate.
- **Fixed Metadata**: Certificates share a common metadata URI.

## Smart Contract Information

- **Contract Name**: `BlockLearnCertificate`
- **Token Name**: `BlockLearn Certificate`
- **Token Symbol**: `BLC`
- **Network**: EduChain
- **Contract Address**: `0xEc38bc9Be954b1b95501167A443b5cc81E6e3975`

## Contract Functions

### Owner Functions

#### 1. **Add Address to Whitelist**

```solidity
function addToWhitelist(address _address) external onlyOwner;
function addToWhitelist(address[] calldata _addresses) external onlyOwner;
```

- Allows the contract owner to whitelist single or multiple addresses.

#### 2. **Remove Address from Whitelist**

```solidity
function removeFromWhitelist(address _address) external onlyOwner;
```

- Allows the contract owner to remove an address from the whitelist.

### Public Functions

#### 3. **Check Whitelist Status**

```solidity
function isWhitelisted(address _address) external view returns (bool);
```

- Returns `true` if the address is whitelisted, otherwise `false`.

#### 4. **Claim a Certificate**

```solidity
function issueCertificate() external;
```

- Allows whitelisted users to claim an NFT certificate.
- Can only be called once per user.

### Utility Functions

#### 5. **Get Token Metadata URI**

```solidity
function tokenURI(uint256 tokenId) public view override returns (string memory);
```

- Returns the fixed metadata URI for the certificate.

#### 6. **Supports Interface**

```solidity
function supportsInterface(bytes4 interfaceId) public view override returns (bool);
```

- Ensures compatibility with ERC-721 standards.

## Events

```solidity
event CertificateIssued(uint256 indexed certId, address indexed student, string courseName);
```

- Emitted when a new certificate is issued.

## Deployment

The contract is deployed on EduChain at address:

```
0xEc38bc9Be954b1b95501167A443b5cc81E6e3975
```

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
