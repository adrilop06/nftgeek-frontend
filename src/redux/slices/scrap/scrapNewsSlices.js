import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import mainUrl from "../../../utils/mainUrl";


//fetch all action
export const scrapNewsAction = createAsyncThunk(
    "news/list",
    async (test, { rejectWithValue, getState, dispatch }) => {
      const config = {
        headers: {
  
           "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"
        },
      };
      //http call
      try {
        const { data } = await axios.get(`${mainUrl}/api/news`, config);
        console.log(data)
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

const scrapNewsSlice = createSlice({
    name: "scrapnews",
    initialState: {},
    extraReducers: builder => {
      //fetch all
      builder.addCase(scrapNewsAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(scrapNewsAction.fulfilled, (state, action) => {
        state.newsList = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(scrapNewsAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  
    
    },
  });
  
  export default scrapNewsSlice.reducer;