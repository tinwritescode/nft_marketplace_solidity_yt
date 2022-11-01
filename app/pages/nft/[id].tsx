import React from "react";
import { useRouter } from "next/router";
import Button from "../components/common/Button/Button";

type Props = {};

function NftDetailPage({}: Props) {
  const router = useRouter();

  return (
    <>
      <div className="fixed top-10 left-20">
        <Button onClick={() => router.back()}>
          <span>Back</span>
        </Button>
      </div>
      <div className="grid grid-cols-3 items-center">
        <div className="col-span-1 flex flex-col gap-2">
          <img
            src="https://public.nftstatic.com/static/nft/res/16ce465819394a3e85f5424359ce7db9.png"
            alt=""
            className="border rounded px-10"
          />

          <div className="space-y-2 mt-2">
            <h1 className="text-xl font-bold">Description</h1>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold">Details</h1>

            <div className="flex justify-between">
              <span>Creator</span>
              <span>Bob</span>
            </div>
            <div className="flex justify-between">
              <span>Owner</span>
              <span>Alice</span>
            </div>
            <div className="flex justify-between">
              <span>Contract address</span>
              <span>0xzzzz</span>
            </div>
            <div className="flex justify-between">
              <span>Token ID</span>
              <span>21412</span>
            </div>
          </div>
        </div>

        <div className="col-span-2 flex flex-col mx-20 gap-2">
          <span className="text-3xl font-bold">
            Alien Worlds Binance Mission 1:4
          </span>

          <span className="text-gray-700 text-sm">Price</span>
          <span className="text-2xl font-semibold">30 BNB</span>

          <Button>
            <span>Buy</span>
          </Button>
        </div>
      </div>
    </>
  );
}

export default NftDetailPage;
