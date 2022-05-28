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

export const fetchCoin = createAsyncThunk(
  "market/coin",
  async (id, { rejectWithValue, getState, dispatch }) => {
      const config = {
          headers: {
              'Content-Type':'application/json'
          },
        };
    //http call
    try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`, 
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

//fetch chart values
export const fetchChartValues1D = createAsyncThunk(
  "market/chart1D",
  async (id, { rejectWithValue, getState, dispatch }) => {
      const config = {
          headers: {
              'Content-Type':'application/json'
          },
        };
    //http call
    try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`, 
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

//fetch chart values
export const fetchChartValues7D = createAsyncThunk(
  "market/chart7D",
  async (id, { rejectWithValue, getState, dispatch }) => {
      const config = {
          headers: {
              'Content-Type':'application/json'
          },
        };
    //http call
    try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`, 
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


//fetch chart values
export const fetchChartValues30D = createAsyncThunk(
  "market/chart30D",
  async (id, { rejectWithValue, getState, dispatch }) => {
      const config = {
          headers: {
              'Content-Type':'application/json'
          },
        };
    //http call
    try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`, 
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

            


            builder.addCase(fetchCoin.pending, (state, action) => {
              state.loading = true;
            });
            builder.addCase(fetchCoin.fulfilled, (state, action) => {
                state.coins = action?.payload;
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
            builder.addCase(fetchCoin.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });

            //fech values 1D

            builder.addCase(fetchChartValues1D.pending, (state, action) => {
              state.loading = true;
            });
            builder.addCase(fetchChartValues1D.fulfilled, (state, action) => {
                state.coinValues = action?.payload;
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
            builder.addCase(fetchChartValues1D.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });

            //Fetch values 7D
            builder.addCase(fetchChartValues7D.pending, (state, action) => {
              state.loading = true;
            });
            builder.addCase(fetchChartValues7D.fulfilled, (state, action) => {
                state.coinValues7D = action?.payload;
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
            builder.addCase(fetchChartValues7D.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });

            //Fetch values 30D
            builder.addCase(fetchChartValues30D.pending, (state, action) => {
              state.loading = true;
            });
            builder.addCase(fetchChartValues30D.fulfilled, (state, action) => {
                state.coinValues30D = action?.payload;
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
            builder.addCase(fetchChartValues30D.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });
        }
    })

    export default coinmarketSlices.reducer;
