import { ERC721__factory, MonoNFT, NFTMarketplace } from "../typechain";
import axios from "axios";
import { ethers } from "ethers";

export const getUserNFTs = async (
  url: string,
  nftContract: MonoNFT,
  walletAddress: string,
  offset: number,
  limit: number
) => {
  const totalNfts = await nftContract.balanceOf(walletAddress);

  if (totalNfts.toNumber() < offset) return [];

  return (
    await Promise.all(
      Array.from(Array(limit).keys()).map(async (i) => {
        if (i + offset >= totalNfts.toNumber()) return null;

        const nftId = (
          await nftContract.tokenOfOwnerByIndex(walletAddress, i + offset)
        ).toNumber();

        const tokenURI = await nftContract.tokenURI(nftId);

        return {
          ...(await axios.get(tokenURI)).data,
          tokenId: nftId,
        };
      })
    )
  ).filter((nft) => nft);
};

export const getMarketplaceNFTs = async (
  url: string,
  marketplaceContract: NFTMarketplace,
  offset: number,
  limit: number
) => {
  const totalNfts = await marketplaceContract.totalListingItems();
  const provider = new ethers.providers.JsonRpcProvider(url);

  if (totalNfts.toNumber() < offset) return [];

  return (
    await Promise.all(
      Array.from(Array(limit).keys()).map(async (i) => {
        if (i + offset >= totalNfts.toNumber()) return null;

        const { tokenId, tokenAddress } =
          await marketplaceContract.listingItems(i + offset);

        const nftAddress = ERC721__factory.connect(tokenAddress, provider);

        const tokenURI = await nftAddress.tokenURI(tokenId);

        return {
          ...(await axios.get(tokenURI)).data,
          tokenId,
        };
      })
    )
  ).filter((nft) => nft);
};
