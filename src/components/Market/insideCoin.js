import React, {useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChartValues1D, fetchChartValues7D, fetchChartValues30D, fetchCoin } from "../../redux/slices/coinmarket/coinmarketSlices";
import { PriceFormatter } from "../../utils/PriceFormatter";
import { ExternalLink } from 'react-external-link';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';



  import { Line } from 'react-chartjs-2';





const InsideCoin = () => {
   const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchCoin(id))
  }, [dispatch]);


  useEffect(() => {
   dispatch(fetchChartValues1D(id))
}, [dispatch]);

useEffect(() => {
  dispatch(fetchChartValues7D(id))
}, [dispatch]);

useEffect(() => {
  dispatch(fetchChartValues30D(id))
}, [dispatch]);

    const values = useSelector(state => state?.coinmarket);
    const { 
        coins, coinValues, coinValues7D, coinValues30D, loading, appErr, serverErr
    } = values;
   

  
    let time1D = [];
    let price1D = [];


    if (coinValues && coinValues?.prices) {
        for (let i = 0; i < coinValues?.prices?.length; i++) {
          time1D.push(coinValues?.prices[i][0]);
          price1D.push(coinValues?.prices[i][1]);
        }
    }

    let time7D = [];
    let price7D = [];


    if (coinValues7D && coinValues7D?.prices) {
        for (let i = 0; i < coinValues7D?.prices?.length; i++) {
          time7D.push(coinValues7D?.prices[i][0]);
          price7D.push(coinValues7D?.prices[i][1]);
        }
    }

    let time30D = [];
    let price30D = [];


    if (coinValues30D && coinValues30D?.prices) {
        for (let i = 0; i < coinValues30D?.prices?.length; i++) {
          time30D.push(coinValues30D?.prices[i][0]);
          price30D.push(coinValues30D?.prices[i][1]);
        }
    }


    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );


      const options1D = {
        responsive: true,
        elements: {
          point:{
              radius: 0
          }
        },
        plugins: {
          legend: {
            display:false
          },
          title: {
            display: true,
            text: '24 Horas',
          },
        },
        scales: {
          x: {
            ticks: {
                autoSkip: true,
                maxTicksLimit: 10
            }
        }
        }
      };


  
      const labels = time1D.map((t) => new Date(t).getHours() + ':' + new Date(t).getMinutes());
      const data1D = {
        labels,
        datasets: [
          {
            label: 'Chart1D',
            data:  price1D,
            borderColor: 'rgb(255, 99, 132)',
            
            
          },
        
        ],
      };


      const options7D = {
        responsive: true,
        elements: {
          point:{
              radius: 0
          }
        },
        plugins: {
          legend: {
            display:false
          },
          title: {
            display: true,
            text: '7 días',
          },
        },
        scales: {
          x: {
            ticks: {
                autoSkip: true,
                maxTicksLimit: 7
            }
        }
        }
      };


      const data7D = {
        labels:time7D.map((t) => new Date(t).getDate() + '-' + new Date(t).getMonth()),
        datasets: [
          {
            label:'chart7D',
            data:  price7D,
            borderColor: 'rgb(255, 99, 132)',
            
            
          },
        
        ],
      };

      const options30D = {
        responsive: true,
        elements: {
          point:{
              radius: 0
          }
        },
        plugins: {
          legend: {
            display:false
          },
          title: {
            display: true,
            text: '30 días',
          },
        },
        scales: {
          x: {
            ticks: {
                autoSkip: true,
                maxTicksLimit: 7
            }
        }
        }
      };

      const data30D = {
        labels:time30D.map((t) => new Date(t).getDate() + '-' + new Date(t).getMonth()),
        datasets: [
          {
            label:'chart30D',
            data:  price30D,
            borderColor: 'rgb(255, 99, 132)',
            
            
          },
        
        ],
      };



    return (
        <>
          {
            appErr || serverErr ? 
          (
            <h1>Err</h1>
          ) : loading ? (
            <h1>cargando</h1>
          ): (
          <div className="max-w-screen-2xl mx-auto pt-10 sm:p-10 md:p-10 relative">
              <div className="grid grid-cols-1 sm:grid-cols-12 ">
                <div className="flex items-center col-span-12 md:col-span-12 lg:col-span-6 text-center justify-contentr">
                  <div className="flex flex-col col-span-4 md:col-span-6 lg:col-span-4 pb-2 mt-10 mr-4 ml-4">
                    <img className="w-full rounded-full" src={coins?.image?.large} alt={`${coins?.name} logo`}/>
                  </div>
                  <div className="flex flex-col col-span-3 md:col-span-3 lg:col-span-3 pb-2 mt-10 mr-6">
                  <p className="font-bold text-center text-4xl mb-10 ml-auto">{coins?.name}</p>
                    <p className="ml-auto">{PriceFormatter(coins?.market_data?.current_price?.usd)}</p>
                    {coins?.market_data?.price_change_percentage_24h >=0 ?(
                      <div className="ml-auto bg-green-600 rounded-lg">
                        <p className="text-white p-1">% {coins?.market_data?.price_change_percentage_24h.toFixed(2)}</p>
                      </div>
                    ):(
                      <div className="ml-auto bg-red-600 rounded-lg">
                        <p className="text-white p-1">% {coins?.market_data?.price_change_percentage_24h.toFixed(2)}</p>
                      </div>
                    )}
                    
                    <p className="ml-auto">{PriceFormatter(coins?.market_data?.high_24h?.usd)}</p>
                    <p className="ml-auto">{PriceFormatter(coins?.market_data?.low_24h?.usd)}</p>
                    <ExternalLink href={coins?.links?.homepage[0]} className="ml-auto font-bold text-myblue-100">Website</ExternalLink>
                  </div>
                  

                </div>
                <div className="col-span-12 lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-4 mt-10 ">
                  <Line options={options1D} data={data1D} />
                </div>
                <div className="col-span-12 grid grid-cols-1 sm:grid-cols-12 gap-4 mt-10">
                  <div className="col-span-12 lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <Line options={options7D} data={data7D} />
                  </div>
                  <div className="col-span-12 lg:col-span-6  grid grid-cols-1 sm:grid-cols-12 gap-4 mt-10 md:mt-0">
                    <Line options={options30D} data={data30D} />
                  </div>
                </div>
              </div>
            </div>
                    )}
    
        </>
    )
}


export default InsideCoin;