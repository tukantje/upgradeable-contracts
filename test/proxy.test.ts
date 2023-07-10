import { ethers } from "hardhat";
import hre from "hardhat";

describe("ERC721 Upgradeable", function () {
  it("Should deploy an upgradeable ERC721 contract", async function () {
    const NFT = await ethers.getContractFactory("NFT");
    const NFT2 = await ethers.getContractFactory("NFT2");

    // Deploy NFT as a Universal Upgradeable Proxy Standard (UUPS) contract
    const proxyContract = await hre.upgrades.deployProxy(NFT, { kind: "uups" });
    const [owner] = await ethers.getSigners();
    const ownerOfToken1 = await proxyContract.ownerOf(1);

    expect(ownerOfToken1).toEqual(owner.address);

    const upgradedProxyContract = await hre.upgrades.upgradeProxy(
      proxyContract,
      NFT2
    );

    expect(await upgradedProxyContract.version()).toEqual("2");
  });
});
