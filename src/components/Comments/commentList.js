import { Link, useParams } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/solid";
import Moment from "react-moment";
import { fetchInsidePostAction } from "../../redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteCommentAction } from "../../redux/slices/comments/commentSlices";

const CommentList =  ({ comments }) =>{

    const user = useSelector(state => state?.users);
    const { userAuth } = user;
    const log = userAuth?._id;


    const posts = useSelector(state => state?.post);
    const { 
        marks,likes,
    } = posts;


    //dispatch
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchInsidePostAction())
    }, [dispatch, likes, marks]);

    return (
        <div>
        <div className="divide-y p-20  w-xl overflow-hidden">
            <h1 className="text-black border-b-4 border-gray-300 pb-4">Comentarios</h1>
            <>
            {comments?.length <= 0 ? (
                <h1 className="text-lg text-center">No comments</h1>
            ) : (
                comments?.map(comment => (
                <>
                   <div key={comment?.id} className=" shadow-lg rounded-lg pb-2 mt-10 ">
                        <div className="flex items-center ml-4 mt-10 ">
                            <a href="/"><img className="w-10 h-10 rounded-full mr-4" src={comment?.user?.photo} alt="User Photo"/></a>
                            <div className="text-md w-100 flex-1">
                                <a href="/" className="text-gray-900">{comment?.user?.userName}</a>
                                <p className="text-bold text-yellow-500 text-base ml-5">
                                    <Moment fromNow ago>
                                        {comment?.createdAt}
                                    </Moment>
                                </p>
                            </div>
                        </div>
                        <div className="mt-3 bg-white p-2 rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                            <div className="">
                                <p className="text-gray-700 text-lg mt-2">{comment?.body}</p>
                            </div>
                        </div>


                        {log === comment?.user?._id ? (
                            <div className="flex contain-center">
                                <button
                                    onClick={() =>
                                        dispatch(deleteCommentAction(comment?.id))
                                    }
                                    className="ml-auto"
                                    >
                                        <div className="py-2 px-4 bg-red-700 hover:bg-red-900 text-white font-bold rounded transition duration-200 border-b-4 border-red-900 hover:border-red-700">
                                            <TrashIcon className="h-4 text-white" />
                                        </div>
                                </button>
                            </div>
 
                            ) :(
                                null
                        )}
                    </div>  
                </>
                ))
            )}
            </>
        </div>
        </div>
    );
}

export default CommentList;