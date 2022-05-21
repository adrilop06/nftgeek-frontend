import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMarketAction } from "../../redux/slices/coinmarket/coinmarketSlices";
import {TrendingDownIcon, TrendingUpIcon} from '@heroicons/react/outline'

const MarketCrypto =  () =>{

    const values = useSelector(state => state?.coinmarket);
    const { 
        marketList, loading, appErr, serverErr
    } = values;

    //dispatch
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchMarketAction())
    }, [dispatch]);


    return (
        <> 
         {loading ? (
             <div className="h-screen">
                <div className="flex justify-center items-center w-full h-full">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        ):(

        <div className="flex flex-col max-w-7xl mx-auto">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 hidden lg:block">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full">
                    <thead className="bg-white border">
                        <tr>
                        <th scope="col" className="text-sm font-bold text-black px-6 py-4 text-left">
                            Nº
                        </th>
                        <th scope="col" className="text-sm font-bold text-black px-6 py-4 text-left">
                            Criptomoneda
                        </th>
                        <th scope="col" className="text-sm font-bold text-black px-6 py-4 text-left">
                            Precio
                        </th>
                        <th scope="col" className="text-sm font-bold text-black px-6 py-4 text-left">
                            24h%
                        </th>
                        <th scope="col" className="text-sm font-bold text-black px-6 py-4 text-left">
                            Más bajo 24h
                        </th>
                        <th scope="col" className="text-sm font-bold text-black px-6 py-4 text-left">
                           Más alto 24h
                        </th>
                        <th scope="col" className="text-sm font-bold text-black px-6 py-4 text-left">
                            Valor 24h
                        </th>
                        <th scope="col" className="text-sm font-bold text-black px-6 py-4 text-left">
                            valor mercado
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*table with values*/}
                        {appErr || serverErr ? (
                        <h1>Err</h1>
                        ) : marketList?.lenght <= 0 ? (
                        <h1>No Post Found</h1>
                        ): (
                            marketList?.slice(0, 100).map(values => (
                        <tr key={values?.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-blue-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {values?.market_cap_rank}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center ml-auto">
                                <img
                                className="w-6 mr-4"
                                src={values?.image}></img>
                                {values?.name}
                            </div>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {values?.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {values?.market_cap_change_percentage_24h < 0 ? (
                                <div className="flex items-center ml-auto">
                                    <p className="text-red-500 font-bold">{values?.market_cap_change_percentage_24h.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                    <TrendingDownIcon className="w-4 stroke-red-500 ml-auto"/>
                                </div>
                            ):(
                                <div className="flex items-center ml-auto">
                                    <p className="text-green-500 font-bold">{values?.market_cap_change_percentage_24h.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                     <TrendingUpIcon className="w-4 stroke-green-500 ml-auto"/>
                                </div>
                            )}
                           

                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {values?.low_24h.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {values?.high_24h.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {values?.total_volume.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {values?.market_cap.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </td>
                        </tr>
                        ))
                        )}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 block lg:hidden">
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item bg-white border border-gray-200">
                        <h2 class="accordion-header mb-0" id="headingOne">
                        <button class="
                            accordion-button
                            relative
                            flex
                            items-center
                            w-full
                            py-4
                            px-5
                            text-base text-gray-800 text-left
                            bg-white
                            border-0
                            rounded-none
                            transition
                            focus:outline-none
                        " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true"
                            aria-controls="collapseOne">
                            Accordion Item #1
                        </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body py-4 px-5">
                            <strong>This is the first item's accordion body.</strong> It is shown by default,
                            until the collapse plugin adds the appropriate classes that we use to style each
                            element. These classes control the overall appearance, as well as the showing and
                            hiding via CSS transitions. You can modify any of this with custom CSS or overriding
                            our default variables. It's also worth noting that just about any HTML can go within
                            the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item bg-white border border-gray-200">
                        <h2 class="accordion-header mb-0" id="headingTwo">
                        <button class="
                            accordion-button
                            collapsed
                            relative
                            flex
                            items-center
                            w-full
                            py-4
                            px-5
                            text-base text-gray-800 text-left
                            bg-white
                            border-0
                            rounded-none
                            transition
                            focus:outline-none
                        " type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false"
                            aria-controls="collapseTwo">
                            Accordion Item #2
                        </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body py-4 px-5">
                            <strong>This is the second item's accordion body.</strong> It is hidden by default,
                            until the collapse plugin adds the appropriate classes that we use to style each
                            element. These classes control the overall appearance, as well as the showing and
                            hiding via CSS transitions. You can modify any of this with custom CSS or overriding
                            our default variables. It's also worth noting that just about any HTML can go within
                            the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item bg-white border border-gray-200">
                        <h2 class="accordion-header mb-0" id="headingThree">
                        <button class="
                            accordion-button
                            collapsed
                            relative
                            flex
                            items-center
                            w-full
                            py-4
                            px-5
                            text-base text-gray-800 text-left
                            bg-white
                            border-0
                            rounded-none
                            transition
                            focus:outline-none
                        " type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false"
                            aria-controls="collapseThree">
                            Accordion Item #3
                        </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body py-4 px-5">
                            <strong>This is the third item's accordion body.</strong> It is hidden by default,
                            until the collapse plugin adds the appropriate classes that we use to style each
                            element. These classes control the overall appearance, as well as the showing and
                            hiding via CSS transitions. You can modify any of this with custom CSS or overriding
                            our default variables. It's also worth noting that just about any HTML can go within
                            the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
       
        

        )}
        </>
    );
}

export default MarketCrypto;