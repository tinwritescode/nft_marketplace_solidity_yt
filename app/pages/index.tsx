import Button from "./components/common/Button/Button";
import Card from "./components/common/Card/Card";
import Input from "./components/common/Input/Input";
import ReactPaginate from "react-paginate";
import { ethers } from "ethers";

const Home = () => {
  const handlePageClick = () => {};
  const pageCount = 4;

  return (
    <main>
      <p>Hello world</p>

      {/* <Button
        onClick={async () => {
          if (!window.ethereum) {
            return;
          }

          const signer = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          const signerProvider = new ethers.providers.Web3Provider(
            window.ethereum
          );

          const signerSigner = signerProvider.getSigner();

          const nftContract = MonoNFT__factory.connect(
            addresses.nftAddress,
            signerSigner
          );

          await (
            await nftContract?.giveAway(
              "0xa35514D88b0A9E2B057493bf5a147cfCa46F6562"
            )
          ).wait();

          toast("NFT sent to your wallet!");
        }}
      >
        Give away
      </Button> */}
      <div className="grid space-y-4 mb-4">
        <Input />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        containerClassName="flex justify-center items-center space-x-2 mt-4"
        activeClassName="bg-gray-900 text-white p-2 rounded"
        pageClassName="bg-gray-200 p-2 aspect-square w-10 text-center rounded"
        previousClassName="bg-gray-200 p-2 text-center rounded"
        nextClassName="bg-gray-200 p-2 text-center rounded"
      />
    </main>
  );
};

Home.title = "Home Page";

export default Home;
