import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { scrapNewsAction } from "../../redux/slices/scrap/scrapNewsSlices";
import { ExternalLink } from 'react-external-link';


const News = () =>{

  const values = useSelector(state => state?.scrapnews);
  const { 
      newsList,loading, appErr, serverErr,
  } = values;

  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(scrapNewsAction())

  }, [dispatch]);

    return (
      <> 
         {loading ? (
             <div className="h-screen">
                <div class="flex justify-center items-center w-full h-full">
                    <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
          ):(
          <div className="max-w-screen-2xl mx-auto pt-10 sm:p-10 md:p-10 relative">
            <div className="grid grid-cols-1 sm:grid-cols-12 ">
                <div className="col-span-12 grid grid-cols-1 sm:grid-cols-12 gap-4">
                    {/*First card*/}
                    {
                    appErr || serverErr ? 
                    (
                    <h1>Err</h1>
                    ) : newsList?.lenght <= 0 ? (
                    <h1>No Post Found</h1>
                    ): 
                    newsList?.map(news => (
                       
                        <div key={news.title} className="flex flex-col col-span-12 md:col-span-6 lg:col-span-3 shadow-lg rounded-lg pb-2 mt-10 ">
                            <ExternalLink href={`https://es.investing.com/${news?.link}`} target="_blank">
                                <div className="h-36 w-full bg-cover text-center overflow-hidden rounded-lg"  title="Woman holding a mug">
                                    <img className ="w-full" src={news?.image} alt={news?.alt}></img>
                                </div>
                            </ExternalLink>
                            <div className="mt-3 bg-white p-2 rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                                <div className="">
                                    <ExternalLink href={`https://es.investing.com/${news?.link}`} target="_blank">
                                        <h2 href="#" className="text-gray-900 font-bold text-lg mb-2 hover:text-indigo-600 transition duration-500 ease-in-out line-clamp-2">{news?.alt} </h2>
                                    </ExternalLink>
                                    <p className="text-gray-700 text-xs mt-2 line-clamp-5">{news.summary}</p>
                                </div>
                            </div>
                        </div>   
                      )
                    )}
                  </div>
                </div>
              </div> 
          )}
             
      </>


    );
}

export default News;