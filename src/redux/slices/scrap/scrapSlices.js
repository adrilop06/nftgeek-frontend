import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import mainUrl from "../../../utils/mainUrl";


//fetch all action
export const scrapAction = createAsyncThunk(
    "market/nft",
    async (test, { rejectWithValue, getState, dispatch }) => {
     
    
      //http call
      try {
        const { data } = await axios.get(`${mainUrl}/api/market`);
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

const scrapSlices = createSlice({
    name: "scrap",
    initialState: {},
    extraReducers: builder => {
      //fetch all
      builder.addCase(scrapAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(scrapAction.fulfilled, (state, action) => {
        state.valueList = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(scrapAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  
    
    },
  });
  
  export default scrapSlices.reducer;