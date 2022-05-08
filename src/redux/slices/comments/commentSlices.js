import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import mainUrl from "../../../utils/mainUrl";

//create a comment 
export const createCommentAction = createAsyncThunk(
    "comment/created",
    async (comment, { rejectWithValue, getState, dispatch }) => {
      //get user token
      const user = getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `GEEK ${userAuth?.token}`,
          'Access-Control-Allow-Origin':'*'
        },
      };
      try {
        const { data } = await axios.post(`${mainUrl}/api/comments`, 
        {
          body: comment?.body,
          postID:comment?.postID,
        }, config);
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );

//delete a comment
export const deleteCommentAction = createAsyncThunk(
  "comment/deleted",
  async (comment, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `GEEK ${userAuth?.token}`,
        'Access-Control-Allow-Origin':'*'
      },
    };
    try {
      const { data } = await axios.delete(`${mainUrl}/api/comments/${comment}`, 
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);


  const commentSlice  = createSlice({
    name: "comment",
    initialState: {},
    extraReducers: builder => {
        //create comment
        builder.addCase(createCommentAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createCommentAction.fulfilled, (state, action) => {
            state.commentCreated= action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
         
        });
        builder.addCase(createCommentAction.rejected, (state, action) => {
            state.loading = false;
            state.commentCreated = undefined;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        builder.addCase(deleteCommentAction.pending, (state, action) => {
          state.loading = true;
        });
        builder.addCase(deleteCommentAction.fulfilled, (state, action) => {
            state.commentDeleted= action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        
        });
        builder.addCase(deleteCommentAction.rejected, (state, action) => {
            state.loading = false;
            state.commentDeleted = undefined;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    }
  });

  export default commentSlice.reducer;