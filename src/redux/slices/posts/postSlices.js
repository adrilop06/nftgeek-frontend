import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import mainUrl from "../../../utils/mainUrl";


//create action to remove the post state after created. Whit this action, we can create more post
//after write one post. 
const resetAction = createAction("category/reset");
const resetUpdateAction = createAction("post/reset");
const resetPostRemove = createAction("post/removed");

//Create Post action
export const createPostAction = createAsyncThunk(
  "post/created",
  async (post, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `GEEK ${userAuth?.token}`,
      },
    };
    try {
     //http call
      const formData = new FormData();
      formData.append('title', post?.title);
      formData.append('body', post?.body);
      formData.append('category', post?.category);
      formData.append('tag', post?.tag);
      formData.append('image', post?.image);
      formData.append('bio', post?.bio);

      const { data } = await axios.post(`${mainUrl}/api/posts`, formData, config);
   

      dispatch(resetAction());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
//update posts
export const updatePostAction = createAsyncThunk(
  "post/updated",
  async (post, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `GEEK ${userAuth?.token}`,
      },
    };
    try {
      const formData = new FormData();
      formData.append('title', post?.title);
      formData.append('body', post?.body);
      formData.append('category', post?.category);
      formData.append('tag', post?.tag);
      formData.append('image', post?.image);
      const { data } = await axios.put(`${mainUrl}/api/posts/${post?.id}`, formData, config);
      dispatch(resetUpdateAction());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Remove
export const removePostAction = createAsyncThunk(
  "post/removed",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `GEEK ${userAuth?.token}`,
      },
    };
    try {
      //http call
      const { data } = await axios.delete(
        `${mainUrl}/api/posts/${postId}`,
        config
      );
      //dispatch
      dispatch(resetPostRemove());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);


//fetch games category posts
export const fetchPostsGamesAction = createAsyncThunk(
  "post/games",
  async (post, { rejectWithValue, getState, dispatch }) => {
    try {
      const games= "juegos";
      const { data } = await axios.get(`${mainUrl}/api/posts?category=${games}`);
        return data;
      
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
//fetch learning category posts
export const fetchPostsLearningAction = createAsyncThunk(
  "post/learning",
  async (post, { rejectWithValue, getState, dispatch }) => {
    try {
      const learning= "aprendizaje";
      const { data } = await axios.get(`${mainUrl}/api/posts?category=${learning}`);
        return data;
      
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch posts by user
export const fetchPostsUserAction = createAsyncThunk(
  "post/user",
  async (user, { rejectWithValue, getState, dispatch }) => {
    
    try {
      const { data } = await axios.get(`${mainUrl}/api/posts?user=${user}`);
        return data;
      
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);


//fetch all posts
export const fetchAllPostsAction = createAsyncThunk(
  "post/list",
  async (post, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${mainUrl}/api/posts`);
        return data;
      
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch posts by tag
export const fetchPostsTagAction = createAsyncThunk(
  "post/tag",
  async (slug, { rejectWithValue, getState, dispatch }) => {
    try {
      const s = "axie"
      const { data } = await axios.get(`${mainUrl}/api/posts?slug=${s}`);
        return data;
      
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch posts by tag
export const fetchPostsSearchAction = createAsyncThunk(
  `post/results`,
  async (title, { rejectWithValue, getState, dispatch }) => {
    console.log(title,"title slices")
    try {
      const { data } = await axios.get(`${mainUrl}/api/posts/results/title?title=${title}`);
      return data;
        
      
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);


//likes and unlike posts
export const postsLikes = createAsyncThunk(
  'post/likes', 
  async (postID, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `GEEK ${userAuth?.token}`,
      },
    }
    try {
      const {data} = await axios.put(`${mainUrl}/api/posts/likes`, {postID}, config);
      return data;
    } catch (error) {
      if(!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    } 
  }
);

//bookmark Post
export const bookmarkPostAction = createAsyncThunk(
  'post/mark', 
  async (postID, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `GEEK ${userAuth?.token}`,
      },
    }
    try {
      const {data} = await axios.put(`${mainUrl}/api/posts/mark`, {postID}, config);
      return data;
    } catch (error) {
      if(!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    } 
  }
);

//fetch one inside post
export const fetchInsidePostAction = createAsyncThunk(
  'post/contain', 
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const {data} = await axios.get(`${mainUrl}/api/posts/${id}`);
      return data;
    } catch (error) {
      if(!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    } 
  }
);

//slice
const postSlice = createSlice({
  name: "post",
  initialState: {},
  extraReducers: builder => {
    builder.addCase(createPostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetAction, (state, action) => {
      state.postCreated = true;
    });
    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.isCreated = action?.payload;
      state.loading = false;
      state.postCreated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createPostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //updates
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetUpdateAction, (state, action) => {
      state.updatedPost = true;
    });
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.updated = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.updatedPost = false;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

     //Remove 
     builder.addCase(removePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPostRemove, (state, action) => {
      state.removed = true;
    });
    builder.addCase(removePostAction.fulfilled, (state, action) => {
      state.postUpdated = action?.payload;
      state.removed = false;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(removePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  
     //fetch posts games
    builder.addCase(fetchPostsGamesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostsGamesAction.fulfilled, (state, action) => {
      state.postListGames = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsGamesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch post learning
    builder.addCase(fetchPostsLearningAction.pending, (state, action) => {
      state.loading= true;
    });
    builder.addCase(fetchPostsLearningAction.fulfilled, (state, action) => {
      state.postListLearning = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsLearningAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

     //fetch post user
     builder.addCase(fetchPostsUserAction.pending, (state, action) => {
      state.loading= true;
    });
    builder.addCase(fetchPostsUserAction.fulfilled, (state, action) => {
      state.postUser = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //fetch all posts
    builder.addCase(fetchAllPostsAction.pending, (state, action) => {
      state.loading= true;
    });
    builder.addCase(fetchAllPostsAction.fulfilled, (state, action) => {
      state.postList = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAllPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //fetch post tag
    builder.addCase(fetchPostsTagAction.pending, (state, action) => {
      state.loading= true;
    });
    builder.addCase(fetchPostsTagAction.fulfilled, (state, action) => {
      state.postListTag = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsTagAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //fetch serch post
    builder.addCase(fetchPostsSearchAction.pending, (state, action) => {
      state.loading= true;
    });
    builder.addCase(fetchPostsSearchAction.fulfilled, (state, action) => {
      state.postResults = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsSearchAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //likes
    builder.addCase(postsLikes.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postsLikes.fulfilled, (state, action) => {
      state.likes = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(postsLikes.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //bookmark
    builder.addCase(bookmarkPostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(bookmarkPostAction.fulfilled, (state, action) => {
      state.mark = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(bookmarkPostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //post contain
    builder.addCase(fetchInsidePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchInsidePostAction.fulfilled, (state, action) => {
      state.postContain = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchInsidePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

  },
});

export default postSlice.reducer;