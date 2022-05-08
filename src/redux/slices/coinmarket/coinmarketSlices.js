import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchMarketAction = createAsyncThunk(
  "market/list",
  async (tag, { rejectWithValue, getState, dispatch }) => {
      const config = {
          headers: {
              'Content-Type':'application/json',
              "Access-Control-Allow-Headers": "*",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*"
          },
        };
    //http call
    try {
      const { data } = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false", 
      config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);


const coinmarketSlices = createSlice({
        name: "coinmarket",
        initialState: {},
        extraReducers: builder => {
            //fetch all
            builder.addCase(fetchMarketAction.pending, (state, action) => {
                state.loading = true;
            });
            builder.addCase(fetchMarketAction.fulfilled, (state, action) => {
                state.marketList = action?.payload;
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
            builder.addCase(fetchMarketAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });
        }
    })

    export default coinmarketSlices.reducer;