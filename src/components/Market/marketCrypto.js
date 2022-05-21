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
            
                <div id="accordion-collapse" data-accordion="collapse">
                    <h2 id="accordion-collapse-heading-1">
                        <button type="button" class="flex items-center focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 justify-between p-5 w-full font-medium text-left border border-gray-200 dark:border-gray-700 border-b-0 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-xl" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                <span>What is Flowbite?</span>
                <svg data-accordion-icon class="w-6 h-6 shrink-0 rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
                    </h2>
                    <div id="accordion-collapse-body-1" aria-labelledby="accordion-collapse-heading-1">
                        <div class="p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 border-b-0">
                            <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive
                                components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
                            <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a
                                    href="https://flowbite.com/docs/getting-started/introduction/" target="_blank"
                                    class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing
                                websites even faster with components on top of Tailwind CSS.</p>
                        </div>
                    </div>
                    <h2 id="accordion-collapse-heading-2">
                        <button type="button" class="flex items-center focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 justify-between p-5 w-full font-medium border border-gray-200 dark:border-gray-700 border-b-0 text-left text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
                <span>Is there a Figma file available?</span>
                <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
                    </h2>
                    <div id="accordion-collapse-body-2" class="hidden" aria-labelledby="accordion-collapse-heading-2">
                        <div class="p-5 border border-gray-200 dark:border-gray-700 border-b-0">
                            <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using the
                                Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
                            <p class="text-gray-500 dark:text-gray-400">Check out the <a href="https://flowbite.com/figma/"
                                    target="_blank" class="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a>
                                based on the utility classes from Tailwind CSS and components from Flowbite.</p>
                        </div>
                    </div>
                    <h2 id="accordion-collapse-heading-3">
                        <button type="button" class="flex items-center border focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 border-gray-200 dark:border-gray-700 justify-between p-5 w-full font-medium text-left text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
                <span>What are the differences between Flowbite and Tailwind UI?</span>
                <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
                    </h2>
                    <div id="accordion-collapse-body-3" class="hidden" aria-labelledby="accordion-collapse-heading-3">
                        <div class="p-5 border border-gray-200 dark:border-gray-700 border-t-0">
                            <p class="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from
                                Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another
                                difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers
                                sections of pages.</p>
                            <p class="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite,
                                Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best
                                of two worlds.</p>
                            <p class="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
                            <ul class="list-disc pl-5 dark:text-gray-400 text-gray-500">
                                <li><a href="https://flowbite.com/pro/" target="_blank"
                                        class="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
                                <li><a href="https://tailwindui.com/" rel="nofollow" target="_blank"
                                        class="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
                            </ul>
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