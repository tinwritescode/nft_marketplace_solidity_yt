import React from "react";
import { TiTick } from "react-icons/ti";

type Props = {};

function Card({}: Props) {
  return (
    <div className="rounded-md shadow-md border transform transition duration-300 hover:-translate-y-1">
      <img
        src="https://public.nftstatic.com/static/nft/res/nft-cex/S3/1665628172810_xoyqcia1l35l21gwn8wdm20lk8zbb0xb_400x400.png"
        className="w-full aspect-square"
      />

      <div className="flex flex-col space-y-1 p-2">
        <div className="text-lg font-bold">#1195 Brian Armstrong</div>

        <div className="flex justify-between">
          <span className="flex gap-1 items-center text-xs font-semibold text-yellow-600">
            WIN NFT HEROES
            <span className="text-green-500">
              <TiTick />
            </span>
          </span>

          <span className="rounded bg-gray-200 text-gray-700 p-1">BSC</span>
        </div>

        <div className="flex justify-between">
          <span>Price</span>

          <div>
            <span className="flex gap-1 items-center">
              <img
                src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Binance-Coin-BNB-icon.png"
                alt=""
                className="w-5 h-5"
              />

              <span className="font-semibold">0.2 BNB</span>
            </span>
            <span className="text-right block text-sm text-gray-500">
              ≈ $ 99.03{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
