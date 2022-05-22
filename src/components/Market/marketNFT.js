import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { scrapAction }  from "../../redux/slices/scrap/scrapSlices";
import {TrendingDownIcon, TrendingUpIcon, PlusIcon, MinusIcon} from '@heroicons/react/outline'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    AccordionItemState
} from 'react-accessible-accordion';


const MarketNFT = () =>{

  const values = useSelector(state => state?.scrap);
  const { 
      valueList,loading, appErr, serverErr,
  } = values;

  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(scrapAction())
    console.log(values)
  }, [dispatch]);

    return (
    <> 
        <div className="flex flex-col max-w-7xl mx-auto">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 hidden lg:block">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                  <table className="min-w-full">
                  <thead className="bg-white border">
                      <tr>
                      <th scope="col" className="text-sm  font-bold text-black px-6 py-4 text-left">
                          Nº
                      </th>
                      <th scope="col" className="text-sm font-bold text-black0 px-6 py-4 text-left">
                          Criptomoneda
                      </th>
                      <th scope="col" className="text-sm font-bold text-black px-6 py-4 text-left">
                          Precio
                      </th>
                      <th scope="col" className="text-sm font-bold text-black px-6 py-4 text-left">
                          24h%
                      </th>
                      <th scope="col" className="text-sm font-bold text-black px-6 py-4 text-left">
                         7d%
                      </th>
                      <th scope="col" className="text-sm font-bold text-black px-6 py-4 text-left">
                          Valor Mercado
                      </th>
                      <th scope="col" className="text-sm font-bold text-black px-6 py-4 text-left">
                          valor mercado 24h
                      </th>
                      </tr>
                  </thead>
                  <tbody>
                      {/*table with values*/}
                      {appErr || serverErr ? (
                      "Err"
                      ) : valueList?.lenght <= 0 ? (
                      "No Post Found"
                      ): (
                        valueList?.map(values => (
                      <tr key={values?.rank} className="bg-white border-b transition duration-300 ease-in-out hover:bg-blue-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {values?.rank}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center ml-auto">
                            <img src={values?.image} className="w-6 mr-4"></img>
                            {values?.name}
                        </div>
                         
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {values?.price} $
                       
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        

                            {values?.one_day_percentage < 0 ? (
                                <div className="flex items-center ml-auto">
                                    <p className="text-red-500 font-bold">{values?.one_day_percentage.toLocaleString(undefined, { maximumFractionDigits: 2 })} $</p>
                                    <TrendingDownIcon className="w-4 stroke-red-500 ml-auto"/>
                                </div>
                            ):(
                                <div className="flex items-center ml-auto">
                                    <p className="text-green-500 font-bold">{values?.one_day_percentage.toLocaleString(undefined, { maximumFractionDigits: 2 })} $</p>
                                     <TrendingUpIcon className="w-4 stroke-green-500 ml-auto"/>
                                </div>
                            )}
                            
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      
                            {values?.seven_days < 0 ? (
                                <div className="flex items-center ml-auto">
                                    <p className="text-red-500 font-bold">{values?.seven_days.toLocaleString(undefined, { maximumFractionDigits: 2 })} $</p>
                                    <TrendingDownIcon className="w-4 stroke-red-500 ml-auto"/>
                                </div>
                            ):(
                                <div className="flex items-center ml-auto">
                                    <p className="text-green-500 font-bold">{values?.seven_days.toLocaleString(undefined, { maximumFractionDigits: 2 })} $</p>
                                     <TrendingUpIcon className="w-4 stroke-green-500 ml-auto"/>
                                </div>
                            )}
                
                         
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {values?.market_value} $
                        
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-3">
                            {values?.market_value_one_day} $
                            </div>
                            <div className="col-span-3 text-sm text-gray-600">
                            {values?.market_value_one_day_coin} $
                            </div>
                        </div>
                        
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
            <h1 className="font-bold text-black font-2xl">Mercado de NFT</h1>
            <div className="max-w-screen-2xl mx-auto pt-10 sm:p-10 md:p-10 relative">
                <div className="grid grid-cols-12 ">
                <div className="col-span-12  grid grid-cols-12 gap-4">
                    <div className="flex col-span-12 justify-between border-2 p-4">
                        <h2 className="font-bold w-auto "> NFT</h2> 
                        <Link to={`/games`} href="/" className="font-bold">Precio</Link>
                    </div>
                    <Accordion className="flex flex-col col-span-12" allowZeroExpanded>
                            {/*table with values*/}
                            {appErr || serverErr ? (
                                <h1>Err</h1>
                            ) : valueList?.lenght <= 0 ? (
                                <h1>No values Found</h1> 
                            ): (
                                valueList?.slice(0, 100).map(values => (
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
                                                {values?.price.toLocaleString(undefined, { maximumFractionDigits: 2 })} $
                                                </div>
                                            </div>
                                       
                                        <AccordionItemPanel>
                                        <div className="w-screen flex flex-wrap flex-row place-items-center">
                                        <table className="flex place-content-center w-full">
                                            <thead >
                                                <tr className="border-b-2">
                                                <td >
                                                24h%
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 flex items-center">
                                                        {values?.one_day_percentage < 0 ? (
                                                            <div className="flex ">
                                                                <p className="text-red-500 font-bold mr-2">{values?.one_day_percentage.toLocaleString(undefined, { maximumFractionDigits: 2 })} $</p>
                                                                <TrendingDownIcon className="w-4 stroke-red-500 "/>
                                                            </div>
                                                        ):(
                                                            <div className="flex ">
                                                                <p className="text-green-500 font-bold mr-2">{values?.one_day_percentage.toLocaleString(undefined, { maximumFractionDigits: 2 })} $</p>
                                                                <TrendingUpIcon className="w-4 stroke-green-500 "/>
                                                            </div>
                                                        )}
                                                    

                                                </td>
                                                </tr>

                                                <tr className="border-b-2">
                                                <td>
                                                7 días
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 flex items-center">
                                                        {values?.seven_days < 0 ? (
                                                            <div className="flex ">
                                                                <p className="text-red-500 font-bold mr-2">{values?.seve_days.toLocaleString(undefined, { maximumFractionDigits: 2 })} $</p>
                                                                <TrendingDownIcon className="w-4 stroke-red-500 "/>
                                                            </div>
                                                        ):(
                                                            <div className="flex ">
                                                                <p className="text-green-500 font-bold mr-2">{values?.seven_days.toLocaleString(undefined, { maximumFractionDigits: 2 })} $</p>
                                                                <TrendingUpIcon className="w-4 stroke-green-500 "/>
                                                            </div>
                                                        )}
                                                    

                                                </td>
                                                </tr>

                                                <tr className="border-b-2">
                                                <td>
                                                Valor mercado
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 flex items-center">
                                                        <p>  {values?.market_value.toLocaleString(undefined, { maximumFractionDigits: 2 })} $</p>
                                                    </td>
                                                </tr>

                                                <tr className="border-b-2">
                                                <td>
                                                Valor mercado 1d
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 flex items-center">
                                                        <p>  {values?.market_value_one_day.toLocaleString(undefined, { maximumFractionDigits: 2 })} $</p>
                                                    </td>
                                                </tr>

                                                <tr className="border-b-2">
                                                <td>
                                                Valor moneda 1d
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 flex items-center">
                                                        <p>  {values?.market_value_one_day_coin.toLocaleString(undefined, { maximumFractionDigits: 2 })} $</p>
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
      </>



    );
}

export default MarketNFT;