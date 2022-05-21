import React, { useEffect } from 'react'
import {HeartIcon, ChatAltIcon, BookmarkIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from "react-redux";
import { postsLikes, bookmarkPostAction, fetchPostsUserAction} from "../../../redux/slices/posts/postSlices";
import { Link, useParams } from 'react-router-dom';
import {createBookmarkAction } from '../../../redux/slices/bookmark/bookmarkSlices';
import DateFormatter from '../../../utils/DateFormatter';


const PostList = () => {

    const user = useSelector(state => state?.users);
    const { userAuth } = user;
    const log = userAuth?._id;
  
    const post = useSelector(state => state?.post);
    const { 
        postUser, likes, mark
    } = post;



    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchPostsUserAction(log))
    }, [ dispatch, likes, mark]);

    return (
        <>  

        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-5">
            {postUser?.length <= 0 ? (
                <h1 className="text-lg text-center">Tu registro de publicaciones esta vacío</h1>
            ) :
            (
                postUser?.map(post => (
            <div key={post?._id} className="flex flex-col col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 shadow-lg rounded-lg pb-2 mt-10">
                <Link to={`/posts/${post?.id}`}>
                    <div className="h-56 bg-cover text-center overflow-hidden rounded-lg"  title="Image post">
                        <img src={post?.image} className="w-full"></img>
                    </div>
                </Link>
                <div className="">
                    <Link to={`/tag/${post?.slug}`} className="text-xs m-2 text-myblue-100 uppercase font-medium mb-3 flex items-center hover:text-gray-900 transition duration-500 ease-in-out">
                        {post?.tag}
                    </Link>
                    <Link to={`/posts/${post?.id}`}>
                        <h2 href="#" className="text-gray-900 m-2 font-bold text-lg hover:text-indigo-600 transition duration-500 ease-in-out line-clamp-2">{post?.title} </h2>
                    </Link>
                    <p className="text-gray-700 text-xs m-2 line-clamp-5">{post?.body}</p>
                </div>

                <div className="flex items-center ml-4 mt-auto">
                    <a href="/"><img className="w-10 h-10 rounded-full mr-4" src={post?.userImage} alt="User Photo"/></a>
                    <div className="text-md w-100 flex-1">
                        <a href="/" className="text-gray-900">{post?.user?.userName}</a>
                        <p className="text-gray-600"><DateFormatter date={post?.createdAt}/></p>
                    </div>
                    <div className="flex items-center ml-auto mr-2 mb-0">
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
                  
    </>

    )
}
export default PostList;