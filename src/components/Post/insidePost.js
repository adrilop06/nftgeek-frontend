import React, {useEffect} from "react";
import { PencilAltIcon, TrashIcon, HeartIcon, ChatAltIcon, BookmarkIcon } from "@heroicons/react/outline";
import { bookmarkPostAction, fetchInsidePostAction, postsLikes, removePostAction } from "../../redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import CreateComments from "../Comments/createComments";
import CommentList from "../Comments/commentList";
import { createBookmarkAction, updateBookmarkAction } from "../../redux/slices/bookmark/bookmarkSlices";
import DateFormatter from '../../utils/DateFormatter';
import '../../styles/style.css';

const InsidePost = () => {
    //select the information from post
    const post = useSelector(state => state?.post);
    const { 
        postContain, loading, appErr, serverErr, likes, mark, removed, 
    } = post;

    const { id } = useParams();
    //comment
    const comment = useSelector(state => state.comment);
    const { commentCreated, commentDeleted } = comment;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchInsidePostAction(id))
    }, [id, dispatch, likes, mark, commentCreated, commentDeleted]);

   
    
   
    //chech the user id
    const users = useSelector(state => state.users);
    const {
        userAuth
    } = users;
    var authorPost = null;
    if(users.userAuth != null){
        authorPost = postContain?.user?._id=== users.userAuth._id;
    } 


    //if remove post redirect to home
    if (removed) return <Navigate to="/" />;

    return (
        <>
     
        <section className="py-20 2xl:py-40 bg-white overflow-hidden">
            {loading ? (
                <div className="h-screen">
                    <div class="flex justify-center items-center w-full h-full">
                        <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            ) : appErr || serverErr ? (
                <h1 className="h-screen text-red-400 text-xl">
                {serverErr} {appErr}
                </h1>
            ) : (
                <div className="container px-4 mx-auto ">
                    <img
                        className="mb-15 w-full h-96 object-cover"
                        src={postContain?.image}
                        alt=""
                    />
                    <div className="w-full mx-auto ">
                        <h2 className="mt-10 mb-10 text-xl text-myblue-100 font-bold font-heading">
                            {postContain?.tag}
                        </h2>
                        <h2 className="mt-5 mb-14 text-4xl 2xl:text-7xl text-black font-bold font-heading">
                            {postContain?.title}
                        </h2>
                        <div className="w-full mx-auto">
                        <div className="mb-6 text-xl text-black">
                            <p className="paragraph-text">
                            {postContain?.body}
                            </p>

                            {/*Only show if the user is the author*/}
                            {authorPost == true ? (
                             
                            <div className="flex contain-center">
                            <Link to={`/update-post/${id}`} className="p-3">
                                <div className="py-2 px-4 bg-green-700 hover:bg-green-900 text-white font-bold rounded transition duration-200 border-b-4 border-green-900 hover:border-green-700">
                                    <PencilAltIcon className="h-6 text-white" />
                                </div>
                            </Link>
                            <button
                                onClick={() =>
                                    dispatch(removePostAction(postContain?.id))
                                }
                                >
                                    <div className="ml-3 py-2 px-4 bg-red-700 hover:bg-red-900 text-white font-bold rounded transition duration-200 border-b-4 border-red-900 hover:border-red-700">
                                        <TrashIcon className="h-6 text-white" />
                                    </div>
                            </button>
                            </div>

                            ) :(
                                null
                            )}
                        </div>
                        </div>
                    </div>
                {/* User */}
                    <div className="flex items-center pt-14 mb-14">
                        <Link to={`/profile/${postContain?.user?.id}`}>
                        <img
                            className="mr-8 w-10 h-10 md:w-20 md:h-20 rounded-full"
                            src={postContain?.user?.photo }
                            alt=""
                        />
                        </Link>
                        <div className="text-left">
                            <h4 className="mb-1 text-xs sm:text-sm md:text-2xl">
                            <Link to={`/profile/${postContain?.user?.id}`} className="text-xl text-xs sm:text-sm md:text-2xl text-black">
                                {postContain?.user?.userName} 
                            </Link>
                            </h4>
                            <p className="text-gray-500 text-xs sm:text-sm">
                                <DateFormatter date={postContain?.createdAt}/>
                            </p>
                        </div>

                        { users.userAuth != null ? (
                        <div className="flex items-center ml-auto mr-2">
                            <button onClick={()=>dispatch(postsLikes(postContain?.id))}>
                                {postContain?.numLikes?.map((users) =>  users) == users.userAuth._id ? (
                                    <HeartIcon className="w-5 md:w-8 ml-10 fill-red-500 stroke-0"/>
                                ) :(
                                    <HeartIcon className="w-5 md:w-8 ml-10"/>  
                                )}
                            </button>
                            <p className="text-black text-sm">{postContain?.numLikes.length}</p>
                            <ChatAltIcon className="w-5 md:w-8 ml-5"/>
                            <p className="text-black text-sm">{postContain?.comments.length}</p>
                            <button onClick={()=> 
                                {
                                    dispatch(createBookmarkAction(postContain?.id))
                                    dispatch(bookmarkPostAction(postContain?.id))
                                
                                }
                            
                                }>
                                {postContain?.numMarks?.map((users) =>  users) == users.userAuth._id ? (
                                    <BookmarkIcon className="w-5 md:w-8 ml-5 fill-red-500 stroke-0"/>
                                ) :(
                                    <BookmarkIcon className="w-5 md:w-8 ml-5"/>
                                )}
                            </button>
                            <p className="text-black text-sm">{postContain?.numMarks.length}</p>
                        </div>
                        ):(
                        <div className="flex items-center ml-auto mr-2">
                            <button>
                                
                                    <HeartIcon className="w-5 md:w-8 ml-10"/>  
                              
                            </button>
                            <p className="text-black text-sm">{postContain?.numLikes.length}</p>
                            <ChatAltIcon className="w-5 md:w-8 ml-5"/>
                            <p className="text-black text-sm">{postContain?.comments.length}</p>
                            <button>
                                
                                    <BookmarkIcon className="w-5 md:w-8 ml-5"/>
                            
                            </button>
                            <p className="text-black text-sm">{postContain?.numMarks.length}</p>
                        </div>
                        )}
                    </div>
                </div>
            )}
            
           {/*comments */}
            <div className=" bg-white overflow-hidden">
                <CommentList comments={postContain?.comments}></CommentList>
            </div>
            
     
            {/*Create comments component */}
            { users.userAuth != null ? (
                <div className=" bg-white overflow-hidden">
                    <CreateComments postID={id}/>
                </div>
            ):(
                <h1 className="text-center">Necesitas estar registrado para poder comentar</h1>
            )}            
            
        </section>
      
        </>
       
    );
};

export default InsidePost;