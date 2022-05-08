import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import mainUrl from "../../../utils/mainUrl";


//action
//create
export const createTagAction = createAsyncThunk(
  "tag/created",
  async (tag, { rejectWithValue, getState, dispatch }) => {
    //get user token
    
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `GEEK ${userAuth?.token}`,
        'Access-Control-Allow-Origin':'*'
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${mainUrl}/api/tag`,
        {
          name: tag,
        },
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all action
export const fetchTagAction = createAsyncThunk(
  "tag/list",
  async (tag, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        Authorization: `GEEK ${userAuth?.token}`,
        'Access-Control-Allow-Origin':'*'
      },
    };
    //http call
    try {
      const { data } = await axios.get(`${mainUrl}/api/tag`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch one tag
export const fetchOneTagAction = createAsyncThunk(
  "tag/info",
  async (slug, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        Authorization: `GEEK ${userAuth?.token}`,
        'Access-Control-Allow-Origin':'*'
      },
    };
    //http call
    try {
      const { data } = await axios.get(`${mainUrl}/api/tag/${slug}`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Update
export const updateTagAction = createAsyncThunk(
  "tag/update",
  async (tag, postID,{ rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `GEEK ${userAuth?.token}`,
        'Access-Control-Allow-Origin':'*'
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${mainUrl}/api/tag/${tag}`,
        config
      );
      return data;
      
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);


//fetch details
export const fetchTagDetailsAction = createAsyncThunk(
  "tag/contain",
  async (slug, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        Authorization: `GEEK ${userAuth?.token}`,
        'Access-Control-Allow-Origin':'*'
      },
    };
    try {
      const { data } = await axios.get(`${mainUrl}/api/tag/${slug}`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slices

const tagSlices = createSlice({
  name: "tag",
  initialState: {},
  extraReducers: builder => {
    //create
    builder.addCase(createTagAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createTagAction.fulfilled, (state, action) => {
      state.tagCreated = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createTagAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch all
    builder.addCase(fetchTagAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchTagAction.fulfilled, (state, action) => {
      state.tagList = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchTagAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch one tag
    builder.addCase(fetchOneTagAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchOneTagAction.fulfilled, (state, action) => {
      state.tagInfo = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchOneTagAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //update
    builder.addCase(updateTagAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateTagAction.fulfilled, (state, action) => {
      state.updateTag = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateTagAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //fetch details
    builder.addCase(fetchTagDetailsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchTagDetailsAction.fulfilled, (state, action) => {
      state.tagDetails = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchTagDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default tagSlices.reducer;