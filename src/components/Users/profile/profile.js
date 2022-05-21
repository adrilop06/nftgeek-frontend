import React from "react";
import { BookmarkIcon, ChatAltIcon, HeartIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchUserAction } from "../../../redux/slices/users/userSlices";
import PostList from "./postList";
import BookmarkList from "./bookmarkList";
import DateFormatter from '../../../utils/DateFormatter';
import {createBookmarkAction } from '../../../redux/slices/bookmark/bookmarkSlices';
import { postsLikes, bookmarkPostAction} from "../../../redux/slices/posts/postSlices";

const Profile =() => {
    const user = useSelector(state => state?.users);
    const { 
        userProfile, loading, appErr, serverErr
    } = user;
    
    const { id } = useParams();

    const post = useSelector(state => state?.post);
    const { 
        likes, mark
    } = post;

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchUserAction(id))
    }, [id, dispatch, likes, mark]);
    
    const [openTab, setOpenTab] = React.useState(1);

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
        <div>
            <div className="max-w-6xl w-full lg:flex mx-auto mt-20 p-10 ">
                <div className=" flex-none mx-auto" title="User profile photo">
                    <img className="rounded-full h-36 sm:h-48 lg:w-48 mx-auto" src={userProfile?.photo} />
                </div>

                <div className="p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                    <h2 className="text-black font-bold text-lg mb-2 ">{userProfile?.userName}</h2>
                        <h2 className="text-black font-bold text-xl mb-2 ">{userProfile?.firstName} {userProfile?.lastName}</h2>
                        <p className="text-grey-darker text-base">{userProfile?.bio}</p>
                    </div>
                    <div className="flex items-center">
                        <div className="text-sm ">
                            <p className="text-black leading-none">Miembro desde: <DateFormatter date={userProfile?.createdAt}/></p>
                        </div>
                        <div className="ml-auto">
                                <p className="text-grey-dark ">{userProfile?.posts?.length} publicaciones</p>
                            </div>
                    </div>
                </div>
            </div>

            <div class="text-sm mt-10 font-medium text-center md:p-10">
                <ul class="flex flex-wrap -mb-px border-b-2 border-gray-300">
                    <li class="mr-2">
                        <a
                            className={
                            "text-xs font-bold uppercase px-5 py-3 block leading-normal " +
                            (openTab === 1
                                ? "text-black border-b-2 border-myblue-100"
                                : "text-black bg-white")
                            }
                            onClick={e => {
                            e.preventDefault();
                            setOpenTab(1);
                            }}
                            data-toggle="tab"
                            href="#link1"
                            role="tablist"
                        >
                            Mis publicaciones
                        </a>
                    </li>
                    <li class="mr-2">
                        <a
                            className={
                            "text-xs font-bold uppercase px-5 py-3  block leading-normal " +
                            (openTab === 2
                                ? "text-black border-b-2 border-myblue-100"
                                : "text-black bg-white")
                            }
                            onClick={e => {
                            e.preventDefault();
                            setOpenTab(2);
                            }}
                            data-toggle="tab"
                            href="#link2"
                            role="tablist"
                        >
                            Guardados
                        </a>
                    </li>
                </ul>
                <div className="flex flex-wrap mt-20">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-5">
                                        {userProfile?.posts?.length <= 0 ? (
                                            <h1 className="text-lg text-center">Tu registro de publicaciones esta vacío</h1>
                                        ) :
                                        (
                                            userProfile?.posts?.map(post => (
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
                                                    <a href="/" className="text-gray-900">{post?.userName}</a>
                                                    <p className="text-gray-600"><DateFormatter date={post?.createdAt}/></p>
                                                </div>
                                                <div className="flex items-center ml-auto mr-2 mb-0">
                                                    <button onClick={()=>dispatch(postsLikes(post?.id))}>    
                                                        {post?.numLikes?.map((users) =>  users) == id ? (
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
                                                        {post?.numMarks?.map((users) =>  users) == id ? (
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
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <BookmarkList/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}
    </>
    );
}


export default Profile;
