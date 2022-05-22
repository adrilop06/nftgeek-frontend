import { useEffect } from "react";
import {HeartIcon, ChatAltIcon, BookmarkIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from "react-redux";
import { postsLikes, fetchPostsGamesAction, bookmarkPostAction } from '../../redux/slices/posts/postSlices';
import { Link } from 'react-router-dom';
import {createBookmarkAction } from '../../redux/slices/bookmark/bookmarkSlices';
import DateFormatter from "../../utils/DateFormatter";

export default function GameCategory() {
  
  const user = useSelector(state => state?.users);
  const { userAuth } = user;
  const log = userAuth?._id;

  //select post from store
  const posts = useSelector(state => state?.post);

  const {postListGames, loading, appErr, serverErr, likes, mark } = posts;
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostsGamesAction());
  }, [dispatch, likes, mark]);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto pt-10 sm:p-10 md:p-10 relative">
        <div className="my-4 text-center">
          <h1 className="my-4 justify-center font-bold text-4xl">JUEGOS</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-9 grid grid-cols-1 sm:grid-cols-12 "></div>
            {postListGames?.length <= 0 ? (
                <h1 className="text-lg text-center">Tu registro de publicaciones esta vacío</h1>
            ) : (
                postListGames?.map(post => (
              
            <div key={post?._id} className="flex flex-col col-span-12 md:col-span-6 lg:col-span-4 shadow-lg rounded-lg pb-2 mt-10">
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
                        <h2 href="#" className="text-gray-900 m-2 font-bold text-lg hover:text-myblue-300 transition duration-500 ease-in-out line-clamp-2">{post?.title} </h2>
                    </Link>
                    <p className="text-gray-700 text-xs m-2 line-clamp-5">{post?.body}</p>
                </div>

                <div className="flex items-center ml-4 mt-auto">
                  <Link to={`/profile/${post?.user?.id}`}><img className="w-10 h-10 rounded-full mr-4" src={post?.userImage} alt="User Photo"/></Link>
                    <div className="text-md w-100 flex-1">
                      <Link to={`/profile/${post?.user?.id}`} className="text-gray-900">{post?.user?.userName}</Link>
                        <p className="text-gray-600"><DateFormatter date={post?.createdAt}/></p>
                    </div>
                    <div className="flex items-center ml-auto mr-2">
                        <button onClick={()=>dispatch(postsLikes(post?.id))}>
                          {post?.numLikes?.map((users) => users) == log ? (
                              <HeartIcon className="lg:w-6 fill-red-500 stroke-0"/>
                            ) :(
                              <HeartIcon className=" lg:w-6"/>  
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

    </>
  );
}
