// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract BlockLearnCertificate is ERC721, ERC721URIStorage {
    address owner;
    uint256 private _nextTokenId = 1;
    mapping(address => bool) whitelist;
    mapping(address => bool) minted;
    string private constant FIXED_TOKEN_URI =
        "https://gateway.pinata.cloud/ipfs/bafkreido5rc7l4zskzic2r5tolny5nsnkqwgda6irb5j5qi6wqslggumra";

    event CertificateIssued(
        uint256 indexed certId,
        address indexed student,
        string courseName
    );

    constructor(address initialOwner) ERC721("BlockLearn Certificate", "BLC") {
        owner = initialOwner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "unauthorized access");
        _;
    }

    // The following functions are overrides required by Solidity.
    // Function to add addresses to the whitelist
    function addToWhitelist(address _address) external onlyOwner {
        whitelist[_address] = true;
    }

    function addToWhitelist(address[] calldata _addresses) external onlyOwner {
        for (uint256 i = 0; i < _addresses.length; i++) {
            whitelist[_addresses[i]] = true;
        }
    }

    // Function to remove an address from the whitelist
    function removeFromWhitelist(address _address) external onlyOwner {
        whitelist[_address] = false;
    }

    // Function to check if an address is whitelisted
    function isWhitelisted(address _address) external view returns (bool) {
        return whitelist[_address];
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Function to issue a certificate NFT with a fixed URI
    function issueCertificate() external {
        require(whitelist[msg.sender], "You are not whitelisted");
        require(!minted[msg.sender], "You have already claimed");

        uint256 certId = _nextTokenId;
        minted[msg.sender] = true;
        _safeMint(msg.sender, certId);
        _setTokenURI(certId, FIXED_TOKEN_URI);

        emit CertificateIssued(certId, msg.sender, "Congratulations");

        _nextTokenId++;
    }
}
// Contract Address on EduChain 0xEc38bc9Be954b1b95501167A443b5cc81E6e3975
