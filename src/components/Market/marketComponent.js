import React from "react";
import { BookmarkIcon, ChatAltIcon, ChatIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import MarketCrypto from "./marketCrypto";
import MarketNFT from "./marketNFT";




const MarketComponent =() => {
   
    
    const [openTab, setOpenTab] = React.useState(1);

    return (
        
        <div>
            <div class="text-sm mt-10 font-medium text-center md:p-10">
                <ul class="flex flex-wrap -mb-px border-b-2 border-gray-300">
                    <li class="mr-2">
                        <a
                            className={
                            "text-xs font-bold uppercase px-5 py-3 block leading-normal " +
                            (openTab === 1
                                ? "text-black border-b-2 border-myblue-100"
                                : "text-black bg-white")
                            }
                            onClick={e => {
                            e.preventDefault();
                            setOpenTab(1);
                            }}
                            data-toggle="tab"
                            href="#link1"
                            role="tablist"
                        >
                            Criptomonedas
                        </a>
                    </li>
                    <li class="mr-2">
                        <a
                            className={
                            "text-xs font-bold uppercase px-5 py-3  block leading-normal " +
                            (openTab === 2
                                ? "text-black border-b-2 border-myblue-100"
                                : "text-black bg-white")
                            }
                            onClick={e => {
                            e.preventDefault();
                            setOpenTab(2);
                            }}
                            data-toggle="tab"
                            href="#link2"
                            role="tablist"
                        >
                            NFTs
                        </a>
                    </li>
                </ul>
                <div className="flex flex-wrap mt-20">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                    <MarketCrypto/>
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <MarketNFT/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    

    );
}


export default MarketComponent;
