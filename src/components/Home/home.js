import React from 'react'
import {HeartIcon, ChatAltIcon, BookmarkIcon } from '@heroicons/react/outline'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsGamesAction, fetchPostsLearningAction, postsLikes, bookmarkPostAction, fetchAllPostsAction } from "../../redux/slices/posts/postSlices";
import { Link } from 'react-router-dom';
import {createBookmarkAction } from '../../redux/slices/bookmark/bookmarkSlices';
import DateFormatter from '../../utils/DateFormatter';
import { fetchTagAction } from '../../redux/slices/tag/tagSlices';


export default function Home  () {



    const user = useSelector(state => state?.users);
    const { userAuth } = user;
    const log = userAuth?._id;

    //select post from store
    const post = useSelector(state => state?.post);
    const { 
        postListGames, postListLearning, postList, loading, appErr, serverErr, likes, mark
    } = post;

    const tags = useSelector(state => state.tag);
    const { 
        tagList
    } = tags;


    //dispatch
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPostsGamesAction());
    }, [dispatch, likes, mark]);

    useEffect(() => {
    dispatch(fetchPostsLearningAction());
    }, [dispatch, likes, mark]);

    useEffect(() => {
        dispatch(fetchAllPostsAction());
        }, [dispatch, likes, mark]);
    
    useEffect(() => {
        dispatch(fetchTagAction());
    }, [dispatch]);

    return (
        <>    

        <div className="max-w-screen-2xl mx-auto pt-10 sm:p-10 md:p-10 relative">
            <div className="grid grid-cols-1 sm:grid-cols-12 ">
                <div className="col-span-12 lg:col-span-9 grid grid-cols-1 sm:grid-cols-12 gap-4">
                
                    <div className="flex col-span-12 lg:col-span-11 justify-between border-b-4 border-gray-300 -mt-1">
                        <h2 className="font-bold w-14 border-b-4 border-black">Juegos</h2> 
                        <Link to={`/games`} href="/" className="font-bold text-gray-500">Ver más</Link>
                    </div>
                
                    {/*First card*/}
                    {
                    appErr || serverErr ? 
                    (
                    <h1>Err</h1>
                    ) : postListGames?.lenght <= 0 ? (
                    <h1>No Post Found</h1>
                    ): (
                    postListGames?.slice(0, 1).map(post => (
                        <div key={post.id} className="flex flex-col col-span-12 md:col-span-6 lg:col-span-6 shadow-lg rounded-lg pb-2 mt-10 ">
                            <Link to={`/posts/${post?.id}`}>
                                <div className="h-56 w-full bg-cover text-center overflow-hidden rounded-lg"  title="Woman holding a mug">
                                    <img className="w-full" src={post?.image}></img>
                                </div>
                            </Link>
                            <div className="mt-3 bg-white p-2 rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                                <div className="">
                                    <Link to={`/tag/${post?.slug}`} className="text-xs text-myblue-100 uppercase font-medium mb-3 flex items-center hover:text-gray-900 transition duration-500 ease-in-out">
                                        {post?.tag}
                                    </Link>
                                    <Link to={`/posts/${post?.id}`}>
                                        <h2 href="#" className="text-gray-900 font-bold text-lg mb-2 hover:text-myblue-300 transition duration-500 ease-in-out line-clamp-2">{post?.title} </h2>
                                    </Link>
                                    <p className="text-gray-700 text-xs mt-2 line-clamp-5">{post?.body}</p>
                                </div>
                            </div>
                            <div className="flex items-center ml-4 mt-auto">
                                <Link to={`/profile/${post?.user?.id}`}><img className="w-10 h-10 rounded-full mr-4" src={post?.user?.photo} alt="User Photo"/></Link>
                                <div className="text-md w-100 flex-1">
                                    <Link to={`/profile/${post?.user?.id}`} className="text-gray-900">{post?.user?.userName}</Link>
                                    <p className="text-gray-600"><DateFormatter date={post?.createdAt}/></p>
                                </div>
                                <div className="flex items-center ml-auto mr-2">
                                    <button onClick={()=>dispatch(postsLikes(post?.id))}>
                                
                                    {post?.numLikes?.map((users) =>  users) == log ? (
                                        <HeartIcon className="w-6 ml-10 fill-red-500 stroke-0"/>
                                    ) :(
                                        <HeartIcon className="w-6 ml-10"/>  
                                    )}
                                    </button>
                                    <p className="text-black text-sm">{post?.numLikes?.length}</p>
                                    <ChatAltIcon className="w-6 ml-5"/>
                                    <p className="text-black text-sm">{post?.comments?.length}</p>
                                    <button onClick={()=>
                                        {   
                                            dispatch(createBookmarkAction())
                                            dispatch(bookmarkPostAction(post?._id))
                                        }
                                        }>
                                    {post?.numMarks?.map((users) =>  users) == log ? (
                                        <BookmarkIcon className="w-6  ml-5 fill-red-500 stroke-0"/>
                                    ) :(
                                        <BookmarkIcon className="w-6  ml-5"/>
                                    )}
                                
                                    </button>
                                </div>
                            </div>
                        </div>    
                    ))
                    )}   
                    {/*Horizontal cards games*/}
                    <div className="col-span-12 md:col-span-6 lg:col-span-5 mt-10 ">
                    {appErr || serverErr ? (
                    <h1>Err</h1>
                    ) : postListGames?.lenght <= 0 ? (
                    <h1>No Post Found</h1>
                    ) :(
                    postListGames?.slice(1, 5).map(post => (
                        <div key={post.id}  className="flex flex items-center shadow-lg rounded-lg mt-3">
                            <Link to={`/posts/${post?.id}`} href="#" className="inline-block mr-2">
                                <div className="w-24 h-24 bg-cover bg-center" >
                                    <img className=" rounded-lg h-full"  src={post?.image}></img>
                                </div>
                            </Link>
                            <div className="w-full mr-2">
                                <Link to={`/tag/${post?.slug}`} className="text-myblue-100 text-xs">{post?.tag}</Link>
                                <Link to={`/posts/${post?.id}`}>
                                    <h2 href="#" className="text-gray-900 font-bold hover:text-myblue-300 line-clamp-2">{post?.title}</h2>
                                </Link>
                                <div className="flex items-center mt-2">
                                    <Link to={`/profile/${post?.user?.id}`}><img className="w-5 h-5 rounded-full mr-4" src={post?.user.photo} alt="User photo"/></Link>
                                    <div className="text-xs w-100 flex-1">
                                        <Link to={`/profile/${post?.user?.id}`} className="text-gray-900">{post?.user?.userName}</Link>
                                        <p className="text-gray-600"><DateFormatter date={post?.createdAt}/></p>
                                    </div>
                                    <div className="flex items-center ml-auto mr-2">
                                        <button onClick={()=>dispatch(postsLikes(post?.id))}>
                                        {post?.numLikes?.map((users) =>  users) == log ? (
                                            <HeartIcon className="w-4  fill-red-500 stroke-0"/>
                                        ) :(
                                            <HeartIcon className="w-4"/>  
                                        )}
                                        </button>
                                        <p className="text-black text-xs">{post?.numLikes?.length}</p>
                                        <ChatAltIcon className="w-4 ml-5"/>
                                        <p className="text-black text-xs">{post?.comments?.length}</p>
                                        <button onClick={()=>
                                        {   
                                            dispatch(createBookmarkAction())
                                            dispatch(bookmarkPostAction(post?.id))
                                        }
                                        }>
                                        {post?.numMarks?.map((users) =>  users) == log  ? (
                                            <BookmarkIcon className="w-4 ml-5 fill-red-500 stroke-0"/>
                                        ) :(
                                            <BookmarkIcon className="w-4 ml-5"/>
                                        )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    )}  
                    </div>
            </div>
            
            {/*Aside*/}
            
            <div className="col-span-12 md:col-span-12 lg:col-span-3 ">
                <div className="my-4 flex justify-between">
                    <h2 className="font-bold w-8 border-b-4 border-black">Top</h2> 
                </div>
                <div className="border-b-4 border-gray-300 -mt-5"></div>
                {appErr || serverErr ? (
                    <h1>Err</h1>
                ) : postList?.lenght <= 0 ? (
                    <h1>No Post Found</h1>
                ) :(
                postList?.slice(0, 4).map((post, n) => (                
                    <div key={post.id} className="flex mt-5 shadow-lg rounded-lg pb-2">
                        <span className="text-myblue-100 font-bold text-3xl ml-2 mr-4 mt-3">
                            <h2>0{n+1}</h2>
                        </span>
                        <div className="w-full mr-2">
                            <Link to={`/tag/${post?.slug}`} className="text-myblue-100 text-xs mb-1 col-span-12">{post?.tag}</Link><br></br>
                            <Link to={`/posts/${post?.id}`} className="text-gray-900 font-bold hover:text-myblue-300  md:lg:line-clamp-3 lg:line-clamp-2">{post?.title}</Link>
                            <div className="flex items-center mt-2">
                                <div className="text-xs w-100 flex-1">
                                    <Link to={`/profile/${post?.user?.id}`} className="text-gray-900">{post?.user?.userName}</Link>
                                    <p className="text-gray-600"><DateFormatter date={post?.createdAt}/></p>
                                </div>
                                <div className="flex items-center ml-auto mr-2">
                                    <button onClick={()=>dispatch(postsLikes(post?.id))}>
                                        {post?.numLikes?.map((users) =>  users) == log ? (
                                            <HeartIcon className="w-4 fill-red-500 stroke-0"/>
                                        ) :(
                                            <HeartIcon className="w-4"/>  
                                        )}
                                    </button>
                                    <p className="text-black text-xs">{post?.numLikes?.length}</p>
                                    <ChatAltIcon className="w-4 ml-5"/>
                                    <p className="text-black text-xs">{post?.comments?.length}</p>
                                    <button onClick={()=>
                                        {   
                                            dispatch(createBookmarkAction())
                                            dispatch(bookmarkPostAction(post?.id))
                                        }
                                        }>
                                        {post?.numMarks?.map((users) =>  users) == log  ? (
                                            <BookmarkIcon className="w-4 ml-5 fill-red-500 stroke-0"/>
                                        ) :(
                                            <BookmarkIcon className="w-4 ml-5"/>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>   
                ))
                )} 
            </div>
            
            {/*Learning section*/}
            <div className="col-span-12 lg:col-span-11 grid grid-cols-1 sm:grid-cols-12 gap-4 ">
                <div className="flex col-span-12 lg:col-span-9 justify-between border-b-4 border-gray-300 mt-10">
                    <h2 className="font-bold w-35 border-b-4 border-black">Aprendizaje</h2> 
                    <Link to={`/learning`} className="font-bold text-gray-500">Ver más</Link>
                </div>
                <div className="col-span-12 md:col-span-12 lg:col-span-9 mt-5">
                    
                {appErr || serverErr ? (
                  <h1>Err</h1>
                ) : postListLearning?.lenght <= 0 ? (
                  <h1>No Post Found</h1>
                ): (
                  postListLearning?.slice(0, 4).map(post => (
                    <div key={post.id} className="flex flex items-center shadow-lg rounded-lg mt-5 ">
                            <Link to={`/posts/${post?.id}`} className="inline-block mr-2">
                                <div className="w-24 h-24 md:w-48 md:h-48 bg-cover bg-center" >
                                    <img className=" rounded-lg w-full" src={post?.image}/>
                                </div>
                            </Link>
                            <div className="w-3/4 overflow-ellipsis overflow-hidden">
                                <Link to={`/tag/${post?.slug}`}
                                    className="text-myblue-100 text-xs md:text-lg">{post?.tag}
                                </Link>
                                <Link to={`/posts/${post?.id}`}>
                                    <h3 href="#" className="text-gray-900 font-bold hover:text-myblue-300  line-clamp-2">{post?.title}</h3>
                                </Link>
                                <p className="text-gray-700 text-xs mt-2 mr-2 line-clamp-2 md:line-clamp-2">{post?.body}</p>
                                <div className="flex items-center mt-2 md:mt-12">
                                    <Link to={`/profile/${post?.user?.id}`}><img className="w-5 h-5 lg:w-10 lg:h-10 rounded-full mr-4" src={post?.user?.photo} alt="Users photo"/></Link>
                                    <div className="text-xs lg:text-base w-100 flex-1">
                                        <Link to={`/profile/${post?.user?.id}`} href="/" className="text-gray-900 ">{post?.user?.userName}</Link>
                                        <p className="text-gray-600"><DateFormatter date={post?.createdAt}/></p>
                                    </div>
                                    <div className="flex items-center ml-auto mr-2">
                                        <button onClick={()=>dispatch(postsLikes(post?.id))}>
                                        {post?.numLikes?.map((users) => users) == log ? (
                                            <HeartIcon className="w-4 lg:w-6 fill-red-500 stroke-0"/>
                                        ) :(
                                            <HeartIcon className="w-4 lg:w-6"/>  
                                        )}
                                        </button>
                                        <p className="text-black text-xs">{post?.numLikes?.length}</p>
                                        <ChatAltIcon className="w-4 ml-5 lg:w-6"/>
                                        <p className="text-black text-xs lg:text-md">{post?.comments?.length}</p>
                                        <button onClick={()=>
                                        {   
                                            dispatch(createBookmarkAction())
                                            dispatch(bookmarkPostAction(post?.id))
                                        }
                                        }>
                                        {post?.numMarks?.map((users) => users) == log ? (
                                            <BookmarkIcon className="w-4 lg:w-6  ml-5 fill-red-500 stroke-0"/>
                                        ) :(
                                            <BookmarkIcon className="w-4 lg:w-6  ml-5"/>
                                        )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                  )))}
                        

                    </div>

                {/*Aside tags*/}  
                <div className="col-span-12 lg:col-span-3 lg:ml-20 ">
                    <div className="my-4 flex justify-between">
                        <h2 className="font-bold w-20 border-b-4 border-black">Top etiquetas</h2> 
                    </div>
                    <div className="border-b-4 border-gray-300 -mt-5"/>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
                    {appErr || serverErr ? (
                        <h1>Err</h1>
                    ) : tagList?.lenght <= 0 ? (
                        <h1>No Post Found</h1>
                    ) :(
                    tagList?.slice(0, 10).map(tag => (  
                        <div key={tag.id} className="w-fit flex mt-5 shadow-lg rounded-lg p-2 ml-2">
                            <Link to={`/tag/${tag?.slug}`} className="text-myblue-100 font-bold text-xs mb-1">{tag?.name}</Link>
                        </div>
                    ))
                    )}
                    </div>
                </div>
            </div>         
        </div>
    </div>



    </>
    )
    
}

