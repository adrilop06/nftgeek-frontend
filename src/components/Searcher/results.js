import React, {useEffect} from "react";
import {  HeartIcon, ChatAltIcon, BookmarkIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import DateFormatter from "../../utils/DateFormatter";
import { bookmarkPostAction, fetchPostsSearchAction, postsLikes } from "../../redux/slices/posts/postSlices";
import { createBookmarkAction } from "../../redux/slices/bookmark/bookmarkSlices";

  

//get the id 
const Results = () => {

    const user = useSelector(state => state?.users);
    const { userAuth } = user;
    const log = userAuth?._id;

    const post = useSelector(state => state?.post);
    const { 
        postResults, loading, appErr, serverErr, likes, mark, removed, 
    } = post;

 

    // const query = window.location.search.substring(1);
    const title = useParams();

    
    let t ='';
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchPostsSearchAction(title.title))
    }, [ dispatch, likes, mark]);

    

    return (
        <>
         <div className="max-w-screen-2xl mx-auto pt-10 sm:p-10 md:p-10 relative">
            <div className="grid grid-cols-1 sm:grid-cols-12">
                <div className="col-span-12 lg:col-span-9 grid grid-cols-1 sm:grid-cols-12 gap-4">
            {/*First card*/}
            {appErr || serverErr ? (
            <h1>Err</h1>
            ) : postResults?.length <= 0 ? (
                <div className=" col-span-12 ">
                    <h1 className="mx-auto h-screen text-2xl text-center ">No Post Found</h1>
                </div>
            ): (
                postResults?.map(post => (
                <div key={post.id} className="flex flex-col col-span-12 md:col-span-6 lg:col-span-4 shadow-lg rounded-lg pb-2 mt-10 ">
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
                        <Link to={`/profile/${post?.user}`}><img className="w-10 h-10 rounded-full mr-4" src={post?.user?.photo} alt="User Photo"/></Link>
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
                                    dispatch(bookmarkPostAction(post?.id))
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
        </div>
        </div>
        </div>                    
        </>
    )

};

export default Results;