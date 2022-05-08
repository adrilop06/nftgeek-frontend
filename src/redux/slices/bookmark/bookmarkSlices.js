import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import mainUrl from "../../../utils/mainUrl";




//Create bookmark action
export const createBookmarkAction = createAsyncThunk(
    "bookmark/created",
    async (bookmark, { rejectWithValue, getState, dispatch }) => {
      //get user token
      const user = getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `GEEK ${userAuth?.token}`,
        },
      };
      try {
        const { data } = await axios.post(`${mainUrl}/api/bookmark`, bookmark, config);
     
  

        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  //update bookmark
export const updateBookmarkAction = createAsyncThunk(
    "bookmark/updated",
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
        const { data } = await axios.put(`${mainUrl}/api/bookmark`, post, config);
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  //fetch bookmark by user
  export const fetchBookmarkAction = createAsyncThunk(
    "bookmark/contain",
    async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `GEEK ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(`${mainUrl}/api/bookmark`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
  );

  //slice
const bookmarkSlice = createSlice({
    name: "bookmark",
    initialState: {},
    extraReducers: builder => {
        builder.addCase(createBookmarkAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createBookmarkAction.fulfilled, (state, action) => {
            state.bookmarkCreated = action?.payload;
            state.loading = false;
            state.postCreated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createBookmarkAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //updates
        builder.addCase(updateBookmarkAction.pending, (state, action) => {
            state.loading = true;
        });
        
        builder.addCase(updateBookmarkAction.fulfilled, (state, action) => {
            state.bookmarkUpdated = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
            state.updatedPost = false;
        });
        builder.addCase(updateBookmarkAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //fetch bookmark
        builder.addCase(fetchBookmarkAction.pending, (state, action) => {
          state.loading = true;
        });
        builder.addCase(fetchBookmarkAction.fulfilled, (state, action) => {
          state.bookmarkList = action?.payload;
          state.loading = false;
          state.appErr = undefined;
          state.serverErr = undefined;
        });
        builder.addCase(fetchBookmarkAction.rejected, (state, action) => {
          state.loading = false;
          state.appErr = action?.payload?.message;
          state.serverErr = action?.error?.message;
        });
    },
  });
  
  export default bookmarkSlice.reducer;