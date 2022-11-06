import Link from "next/link";
import React from "react";
import { TiTick } from "react-icons/ti";

type Props = {
  imageUrl: string;
  url?: string;
  name: string;
  price?: string;
};

function Card({ imageUrl, url, name, price }: Props) {
  return (
    <Link href={url || ""}>
      <div className="rounded-md shadow-md border transform transition duration-300 hover:-translate-y-1">
        <img src={imageUrl} className="w-full aspect-square" />

        <div className="flex flex-col space-y-1 p-2">
          <div className="text-lg font-bold">{name}</div>

          <div className="flex justify-between">
            <span className="flex gap-1 items-center text-xs font-semibold text-yellow-600">
              WIN NFT HEROES
              <span className="text-green-500">
                <TiTick />
              </span>
            </span>

            <span className="rounded bg-gray-200 text-gray-700 p-1">BSC</span>
          </div>

          {price && (
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
          )}
        </div>
      </div>
    </Link>
  );
}

export default Card;
