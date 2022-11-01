import { expect } from "chai";

import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";

describe("Token contract", function () {
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("MonoNFT");
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const marketplaceContract = await NFTMarketplace.deploy();
    await marketplaceContract.deployed();
    const hardhatToken = await Token.deploy(marketplaceContract.address);
    await hardhatToken.deployed();

    return {
      Token,
      NFTMarketplace,
      marketplaceContract,
      hardhatToken,
      owner,
      addr1,
      addr2,
    };
  }

  describe("Deployment", function () {
    it("Should set the right marketplace address", async function () {
      const { hardhatToken, marketplaceContract, owner, addr1 } =
        await loadFixture(deployTokenFixture);

      expect((await hardhatToken.marketplaceAddress()).toLowerCase()).to.equal(
        marketplaceContract.address.toLowerCase()
      );
    });

    it("Should mint a token", async function () {
      const { hardhatToken, marketplaceContract, owner, addr1 } =
        await loadFixture(deployTokenFixture);
      await hardhatToken.giveAway(addr1.address);

      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(1);
    });

    it("Should list a token", async function () {
      const { hardhatToken, marketplaceContract, owner, addr1 } =
        await loadFixture(deployTokenFixture);
      await hardhatToken.giveAway(addr1.address);
      await hardhatToken.connect(addr1).approve(marketplaceContract.address, 1);
      await marketplaceContract
        .connect(addr1)
        .listItem(hardhatToken.address, 1, ethers.utils.parseEther("0.1"));

      console.log(await marketplaceContract.getListingItems());

      // expect(await hardhatToken.ownerOf(1)).to.equal(
      //   marketplaceContract.address
      // );
    });
  });
});
