import Button from "./components/common/Button/Button";
import Card from "./components/common/Card/Card";
import Input from "./components/common/Input/Input";
import ReactPaginate from "react-paginate";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWeb3Store } from "../store/web3Store";
import axios from "axios";
import useSWR from "swr";
import { getMarketplaceNFTs, getUserNFTs } from "../utils/nft";
import toast from "react-hot-toast";
import CardShimmer from "./components/common/Card/CardShimmer";

const Home = () => {
  const {
    walletAddress,
    isConnected,
    nftContract,
    isInit,
    marketplaceContract,
  } = useWeb3Store();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(8);
  const { data, isValidating, mutate } = useSWR(
    isInit &&
      walletAddress && [
        "getUserNFTs",
        nftContract,
        walletAddress,
        offset,
        limit,
      ],
    getUserNFTs
  );
  const { data: marketplaceData } = useSWR(
    isInit &&
      walletAddress && [
        "getMarketplaceNFTs",
        nftContract,
        walletAddress,
        offset,
        limit,
      ],
    getMarketplaceNFTs
  );
  const [totalPage, setTotalPage] = useState(0);
  const handlePageClick = ({ selected }: { selected: number }) => {
    setOffset(Math.ceil(selected * limit));
  };

  const updateTotalPage = () => {
    if (!walletAddress) {
      return;
    }

    nftContract
      ?.balanceOf(walletAddress)
      .then((res) => {
        const newTotalPage = Math.ceil(res.toNumber() / limit);
        console.log("newTotalPage", newTotalPage);
        console.log("res", res.toNumber());
        setTotalPage(newTotalPage);
      })
      .catch((err) => {
        console.log("cant get nft balance", err);
      });
  };

  // Update total page
  useEffect(() => {
    updateTotalPage();
  }, [limit, walletAddress, data]);

  return (
    <main>
      {isConnected && (
        <>
          <Button
            onClick={async () => {
              if (!window.ethereum || !nftContract) {
                return;
              }

              try {
                const signer = await window.ethereum.request({
                  method: "eth_requestAccounts",
                });

                const signerProvider = new ethers.providers.Web3Provider(
                  window.ethereum
                );

                const signerSigner = signerProvider.getSigner();

                const connectNFTContract = nftContract.connect(signerSigner);

                await Promise.all([
                  (
                    await connectNFTContract?.giveAway(
                      await signerSigner.getAddress()
                    )
                  ).wait(),
                ]);

                mutate();

                toast.success("NFT sent to your wallet!");

                updateTotalPage();
              } catch (error: any) {
                toast.error(error.message);
              }
            }}
          >
            Claim free NFT
          </Button>{" "}
          <h2 className="text-2xl font-bold my-3">My NFT</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(data &&
              data.map((value, index) => (
                <Card
                  key={index}
                  imageUrl={value.image}
                  url={`/nft/${value.tokenId}`}
                  name={value.name}
                ></Card>
              ))) ||
              [...Array(limit)].map((value, index) => (
                <CardShimmer key={index}></CardShimmer>
              ))}
          </div>
          {totalPage == 0 && !isValidating && (
            <div className="text-center mt-5">
              <h2 className="text-2xl font-bold">No NFT found</h2>
            </div>
          )}
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPage}
            previousLabel="< previous"
            containerClassName="flex justify-center items-center space-x-2 mt-4"
            activeClassName="bg-gray-900 text-white p-2 rounded"
            pageClassName="bg-gray-200 p-2 aspect-square w-10 text-center rounded"
            previousClassName="bg-gray-200 p-2 text-center rounded"
            nextClassName="bg-gray-200 p-2 text-center rounded"
            pageLinkClassName="block"
          />{" "}
        </>
      )}

      <h2 className="text-2xl font-bold my-3">Marketplace NFT</h2>
      {JSON.stringify(marketplaceData)}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(marketplaceData &&
          marketplaceData.map((value, index) => (
            <Card
              key={index}
              imageUrl={value.image}
              url={`/nft/${value.tokenId}`}
              name={value.name}
            ></Card>
          ))) ||
          [...Array(limit)].map((value, index) => (
            <CardShimmer key={index}></CardShimmer>
          ))}
      </div>
    </main>
  );
};

Home.title = "Home Page";

export default Home;
