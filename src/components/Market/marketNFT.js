import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { scrapAction }  from "../../redux/slices/scrap/scrapSlices";
import {TrendingDownIcon, TrendingUpIcon} from '@heroicons/react/outline'


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
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                      {values?.price}
                       
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        

                            {values?.one_day_percentage < 0 ? (
                                <div className="flex items-center ml-auto">
                                    <p className="text-red-500 font-bold">{values?.one_day_percentage.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                    <TrendingDownIcon className="w-4 stroke-red-500 ml-auto"/>
                                </div>
                            ):(
                                <div className="flex items-center ml-auto">
                                    <p className="text-green-500 font-bold">{values?.one_day_percentage.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                     <TrendingUpIcon className="w-4 stroke-green-500 ml-auto"/>
                                </div>
                            )}
                            
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      
                            {values?.seven_days < 0 ? (
                                <div className="flex items-center ml-auto">
                                    <p className="text-red-500 font-bold">{values?.seven_days.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                    <TrendingDownIcon className="w-4 stroke-red-500 ml-auto"/>
                                </div>
                            ):(
                                <div className="flex items-center ml-auto">
                                    <p className="text-green-500 font-bold">{values?.seven_days.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                     <TrendingUpIcon className="w-4 stroke-green-500 ml-auto"/>
                                </div>
                            )}
                
                         
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {values?.market_value}
                        
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-3">
                            {values?.market_value_one_day}
                            </div>
                            <div className="col-span-3 text-sm text-gray-600">
                            {values?.market_value_one_day_coin}
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
      </div>
      </>



    );
}

export default MarketNFT;