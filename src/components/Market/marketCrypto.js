import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMarketAction } from "../../redux/slices/coinmarket/coinmarketSlices";
import {TrendingDownIcon, TrendingUpIcon, PlusIcon, MinusIcon} from '@heroicons/react/outline';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    AccordionItemState
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

        <div className="flex flex-col max-w-full lg:max-w-7xl mx-auto">
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
                            <Link to={`/market/coin/${values?.id}`} className="flex items-center ml-auto">
                                <img
                                className="w-6 mr-4"
                                src={values?.image}></img>
                                {values?.name}
                            </Link>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {values?.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 })} $
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {values?.market_cap_change_percentage_24h < 0 ? (
                                <div className="flex items-center ml-auto">
                                    <p className="text-red-500 font-bold">{values?.market_cap_change_percentage_24h.toLocaleString(undefined, { maximumFractionDigits: 2 })} $</p>
                                    <TrendingDownIcon className="w-4 stroke-red-500 ml-auto"/>
                                </div>
                            ):(
                                <div className="flex items-center ml-auto">
                                    <p className="text-green-500 font-bold">{values?.market_cap_change_percentage_24h.toLocaleString(undefined, { maximumFractionDigits: 2 })} $</p>
                                     <TrendingUpIcon className="w-4 stroke-green-500 ml-auto"/>
                                </div>
                            )}
                           

                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {values?.low_24h.toLocaleString(undefined, { maximumFractionDigits: 2 })} $
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {values?.high_24h.toLocaleString(undefined, { maximumFractionDigits: 2 })} $
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {values?.total_volume.toLocaleString(undefined, { maximumFractionDigits: 2 })} $
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {values?.market_cap.toLocaleString(undefined, { maximumFractionDigits: 2 })} $
                        </td>
                        </tr>
                        ))
                        )}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            

                

            <div className="overflow-hidden mx-2 block lg:hidden">
            <h1 className="font-bold text-black font-2xl">Mercado de divisas</h1>
            <div className="max-w-screen-2xl mx-auto pt-10 sm:p-10 md:p-10 relative">
            <div className="grid grid-cols-12 ">
                <div className="col-span-12  grid grid-cols-12 gap-4">
                    <div className="flex col-span-12 justify-between border-2 p-4">
                        <h2 className="font-bold w-auto "> Criptomonedas</h2> 
                        <Link to={`/games`} href="/" className="font-bold">Precio</Link>
                    </div>
                    <Accordion className="flex flex-col col-span-12" allowZeroExpanded>
                            {/*table with values*/}
                            {appErr || serverErr ? (
                                <h1>Err</h1>
                            ) : marketList?.lenght <= 0 ? (
                                <h1>No values Found</h1>
                            ): (
                                marketList?.slice(0, 100).map(values => (

                                    
                                        <AccordionItem key={values?.id} className="flex flex-col col-span-12">
                                            <div className="flex items-center mr-2 mb-4 pb-2 mt-4 border-b-2 ">
                                                <div className="col-span-2 mr-4">
                                                    <AccordionItemHeading>
                                                        <AccordionItemButton>
                                                            <AccordionItemState>
                                                                {({ expanded }) => (expanded ? <MinusIcon className="w-4 stroke-gray-500 ml-auto"></MinusIcon>  : <PlusIcon className="w-4 stroke-gray-500 ml-auto"></PlusIcon> )}
                                                            </AccordionItemState>
                                                        </AccordionItemButton>
                                                    </AccordionItemHeading>
                                                </div>
                                                <div className="col-span-6">
                                                    <div className="flex items-center ml-auto">
                                                        <img
                                                        className="w-6 mr-4"
                                                        src={values?.image}></img>
                                                        {values?.name}
                                                    </div>
                                                </div>
                                                <div className="flex col-span-4 ml-auto">
                                                {values?.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 })} $
                                                </div>
                                            </div>
                                       
                                        <AccordionItemPanel>
                                        <div className="w-screen flex flex-wrap flex-row place-items-center">
                                        <table className="flex place-content-center w-full">
                                            <thead >
                                                <tr className="border-b-2">
                                                <td >
                                                Mas bajo 24h
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 flex items-center">
                                                        {values?.market_cap_change_percentage_24h < 0 ? (
                                                            <div className="flex ">
                                                                <p className="text-red-500 font-bold mr-2">{values?.market_cap_change_percentage_24h.toLocaleString(undefined, { maximumFractionDigits: 2 })} $</p>
                                                                <TrendingDownIcon className="w-4 stroke-red-500 "/>
                                                            </div>
                                                        ):(
                                                            <div className="flex ">
                                                                <p className="text-green-500 font-bold mr-2">{values?.market_cap_change_percentage_24h.toLocaleString(undefined, { maximumFractionDigits: 2 })} $</p>
                                                                <TrendingUpIcon className="w-4 stroke-green-500 "/>
                                                            </div>
                                                        )}
                                                    

                                                    </td>
                                                </tr>

                                                <tr className="border-b-2">
                                                <td>
                                                Mas alto 24h
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 flex items-center">
                                                        <p> {values?.low_24h.toLocaleString(undefined, { maximumFractionDigits: 2 })} $</p>
                                                    </td>
                                                </tr>

                                                <tr className="border-b-2">
                                                <td>
                                                Valor 24h
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 flex items-center">
                                                        <p>  {values?.high_24h.toLocaleString(undefined, { maximumFractionDigits: 2 })} $</p>
                                                    </td>
                                                </tr>

                                                <tr className="border-b-2">
                                                <td>
                                                Valor mercado
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 flex items-center">
                                                        <p>  {values?.total_volume.toLocaleString(undefined, { maximumFractionDigits: 2 })} $</p>
                                                    </td>
                                                </tr>
                                            
                                            
                                            </thead>
                                        </table>
                                        </div>
                                    </AccordionItemPanel>
                                    
                                </AccordionItem>
                                
                            ))
                        )}
                        </Accordion>
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