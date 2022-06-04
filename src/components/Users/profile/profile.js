import React from "react";
import { BookmarkIcon, ChatAltIcon, ChatIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchUserAction } from "../../../redux/slices/users/userSlices";
import PostList from "./postList";
import BookmarkList from "./bookmarkList";
import DateFormatter from '../../../utils/DateFormatter';


const Profile =() => {
    const post = useSelector(state => state?.post);
    const {likes, mark}= post;

    const { id } = useParams();

    const user = useSelector(state => state?.users);
    const { 
        userProfile, loading, appErr, serverErr, userAuth: { _id }
    } = user;
    


    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchUserAction(id))
    }, [id, dispatch, likes, mark]);

 
     //chech the user id
     var authorPost = null;
     if(user.userAuth != null){
         authorPost = userProfile?._id=== user.userAuth._id;
     } 


    
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
                            <p className="text-black leading-none">Miembro desde: ~{"\n"} <DateFormatter date={userProfile?.createdAt}/></p>
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
                                    <PostList profile={userProfile}/>
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    {authorPost == true ? (
                                        <BookmarkList/>
                                    ):(
                                        <h1 className="col-span-12 text-lg text-center">Los bookmarks son privados</h1>
                                    )}
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
