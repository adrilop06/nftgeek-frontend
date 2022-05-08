//import the store configuration from redux toolkit
import {configureStore} from '@reduxjs/toolkit';
//import user reducer from userSlices
import usersReducer from "../slices/users/userSlices";
import categoryReducer from "../slices/categories/categorySlices";
import post from '../slices/posts/postSlices';
import tag from "../slices/tag/tagSlices";
import comment from '../slices/comments/commentSlices';
import bookmarks from '../slices/bookmark/bookmarkSlices';
import coinmarket from '../slices/coinmarket/coinmarketSlices';
import scrap from '../slices/scrap/scrapSlices';
import scrapnews from '../slices/scrap/scrapNewsSlices';



const store = configureStore({
    reducer:{
        users: usersReducer,
        category: categoryReducer,
        tag,
        bookmarks,
        comment,
        post,
        coinmarket,
        scrap,
        scrapnews

    }
});

export default store;