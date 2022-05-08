import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//const dotenv = require ("dotenv");

/*
const url ='https://coinmarketcap.com/';
fetchData(url).then( (res) =>{
      try {
     
        const html = res.data;
        const $ = cheerio.load(html);
        const elemSelector= '#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr';
        
        const keys = [
            'rank', 'name', 'price', '1h', '24h', '7d', 'volume_24h', 'market_cap'
        ];
        
        const coinArr = [];

        $(elemSelector).each((parentIdx, parentElem) => {
            let keyIdx = 0;
            const coinObj = {}

            if(parentIdx <= 9){
                $(parentElem).children().each((childIdx, childElem) => {
                    const tdValue = $(childElem).text();
                    
                    if(keyIdx === 1 || keyIdx === 6){
                        
                        tdValue == $('p:first-child',$(childElem).html()).text()
                        
                    }

                    if(tdValue){
                        coinObj[keys[keyIdx]] = tdValue;
                        keyIdx++;
                    }
                })
        
                coinArr.push(coinObj);
                
            }
     
        })
        console.log(coinArr);
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
});


async function fetchData(url){
    console.log("Crawling data...")
    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));

    if(response.status !== 200){
        console.log("Error occurred while fetching data");
        return;
    }
    return response;
}

*/


/*
//fetch from coinmarket
async function fetchMarketAction () {
      try {
        const { data } = await axios.get('https://coinmarketcap.com/es/view/collectibles-nfts/');
        
        const $ = cheerio.load(data);
        const elemSelector= '#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr'

        const keys = [
            'rank', 'name', 'price', '1h', '24h', '7d', 'volume_24h', 'market_cap'
        ];
        
        const coinArr = [];

        $(elemSelector).each((parentIdx, parentElem) => {
            let keyIdx = 0;
            const coinObj = {}

            if(parentIdx <= 9){
                $(parentElem).children().each((childIdx, childElem) => {
                    let tdValue = $(childElem).text();
                    
                    if(keyIdx === 1 || keyIdx === 6){

                        tdValue = $('p:first-child',$(childElem).html()).text()
                    }
                

                    if(tdValue){
                        coinObj[keys[keyIdx]] = tdValue;
                        keyIdx++;
                    }
                })
                coinArr.push(coinObj);
                
            }
     
        })
        //console.log(coinArr)
        return coinArr;
        
      } catch (error) {
      
        return error;
      }
    }



  app.get ('/api/market-nft'), async (req, res) => {
      try{
          const nftMarket = await fetchMarketAction();
          return res.status(200).json({ result:nftMarket});
      }catch(err){ 
          return res.status(500).json({err: err.toString()});
      }
  }
*/
/*
export const fetchMarketAction = createAsyncThunk(
    "market/list",
    async (tag, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
                'X-CMC_PRO_API_KEY':'e96d488c-f06e-4cc6-9469-87cdfbe288a6',
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS',
                
            },
          };
      //http call
      try {
        const { data } = await axios.get(`${coinmarketUrl}/v1/cryptocurrency/listings/latest`, config);
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );

*/

export const fetchMarketAction = createAsyncThunk(
  "market/list",
  async (tag, { rejectWithValue, getState, dispatch }) => {
      const config = {
          headers: {
              'Content-Type':'application/json'
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