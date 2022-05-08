import React, {useEffect} from "react";
import {  HeartIcon, ChatAltIcon, BookmarkIcon } from "@heroicons/react/outline";
import { bookmarkPostAction, fetchInsidePostAction, fetchPostsTagAction, postsLikes, removePostAction } from "../../redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOneTagAction, fetchTagDetailsAction } from "../../redux/slices/tag/tagSlices";
import DateFormatter from "../../utils/DateFormatter";
import { createBookmarkAction } from "../../redux/slices/bookmark/bookmarkSlices";


//get the id 
const InsideTag = () => {

    const user = useSelector(state => state?.users);
    const { userAuth } = user;
    const log = userAuth?._id;

    //select the information from tag
    const tags = useSelector(state => state?.tag);
    const { 
        tagDetails, tagInfo, loading, appErr, serverErr
    } = tags;

    const post = useSelector(state => state?.post);
    const { 
         likes, mark
    } = post;

    const { slug } = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTagDetailsAction(slug))
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchOneTagAction(slug))
    }, [dispatch, likes, mark]);


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

                <div className="col-span-12 md:col-span-12 lg:hidden">
                    <div className="my-4 flex justify-center">
                        <h2 className="font-bold  text-4xl">{tagDetails?.name}</h2> 
                    </div>
                    <div className="my-4 flex justify-center">
                        <h2 className="font-bold  text-4xl">{tagDetails?.posts}</h2> 
                    </div>
                </div> 

            <div className="col-span-12 lg:col-span-9 grid grid-cols-1 sm:grid-cols-12 gap-4">

                {appErr || serverErr ? (
                    <h1 className="h-screen text-red-400 text-xl">
                    {serverErr} {appErr}
                    </h1>
                ) : (
                    tagInfo?.post_tag?.map(post => (
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
                                        <h2 href="#" className="text-gray-900 font-bold text-lg mb-2 hover:text-indigo-600 transition duration-500 ease-in-out line-clamp-2">{post?.title} </h2>
                                    </Link>
                                    <p className="text-gray-700 text-xs mt-2 line-clamp-5">{post?.body}</p>
                                </div>
                            </div>
                            <div className="flex items-center ml-4 mt-auto">
                                <a href="/"><img className="w-10 h-10 rounded-full mr-4" src={post?.userImage} alt="User Photo"/></a>
                                <div className="text-md w-100 flex-1">
                                    <a href="/" className="text-gray-900">{post?.userName}</a>
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

            <div className="block lg:col-span-3">
                <div className="my-4 flex justify-center">
                    <h2 className="font-bold  text-4xl">{tagDetails?.name}</h2> 
                </div>
                <div className="my-4 flex justify-center">
                    <h2 className="font-bold  text-4xl">{tagDetails?.posts}</h2> 
                </div>
            </div> 
        </div>
    </div>
        )}
        </>


        
    );
};

export default InsideTag;