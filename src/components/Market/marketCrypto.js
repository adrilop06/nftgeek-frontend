import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMarketAction } from "../../redux/slices/coinmarket/coinmarketSlices";
import {TrendingDownIcon, TrendingUpIcon, ChevronDownIcon, ChevUpIcon} from '@heroicons/react/outline';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

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
                        <h1>No Values Found</h1>
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
            
            <div className="overflow:hidden mx-2 block lg:hidden">
            <Accordion>
                <table className="min-w-full">
                    <thead className="bg-white border">
                        <tr>
                        <th scope="col" className="text-sm font-bold text-black px-1 py-4 text-left">
                            Nº
                        </th>
                        <th scope="col" className="text-sm font-bold text-black px-1 py-4 text-left">
                            Criptomoneda
                        </th>
                        <th scope="col" className="text-sm font-bold text-black px-1 py-4 text-left">
                            Precio
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*table with values*/}
                        {appErr || serverErr ? (
                            <h1>Err</h1>
                        ) : marketList?.lenght <= 0 ? (
                            <h1>No values Found</h1>
                        ): (
                            marketList?.slice(0, 100).map(values => (
                                
                                <AccordionItem>
                                    <tr key={values?.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-blue-100">
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            
                                                <ChevronDownIcon className="w-4 stroke-gray-500 ml-auto"></ChevronDownIcon>
                                            
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    </td>
                                    
                                    <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                                        <div className="flex items-center ml-auto">
                                            <img
                                            className="w-6 mr-4"
                                            src={values?.image}></img>
                                            {values?.name}
                                        </div>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                                        {values?.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    </td>
                                  
                                    </tr>
                                
                               
                                <AccordionItemPanel>
                                <tr key={values?.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-blue-100">
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {values?.market_cap_change_percentage_24h < 0 ? (
                                            <div className="flex items-center ml-auto">
                                                <p className="text-red-500 font-bold">24%: {values?.market_cap_change_percentage_24h.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                                <TrendingDownIcon className="w-4 stroke-red-500 ml-auto"/>
                                            </div>
                                        ):(
                                            <div className="flex items-center ml-auto">
                                                <p className="text-green-500 font-bold">24%: {values?.market_cap_change_percentage_24h.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                                <TrendingUpIcon className="w-4 stroke-green-500 ml-auto"/>
                                            </div>
                                        )}
                                    

                                    </td>
                                </tr>
                                <tr key={values?.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-blue-100">
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <p> Mas bajo 24h: {values?.low_24h.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                    </td>
                                </tr>
                                <tr key={values?.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-blue-100">
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <p> Mas alto 24h: {values?.high_24h.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                    </td>
                                </tr>
                                <tr key={values?.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-blue-100">
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <p> Valor 24h: {values?.total_volume.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                    </td>
                                </tr>
                                <tr key={values?.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-blue-100">
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <p> Valor mercado: {values?.market_cap.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                    </td>
                                </tr>
                                
                                </AccordionItemPanel>
                                
                            </AccordionItem>
                            ))
                        )}
                    </tbody>
                </table>
            </Accordion>
              
        
            </div>
            
        </div>
       
        

        )}
        </>
    );
}

export default MarketCrypto;