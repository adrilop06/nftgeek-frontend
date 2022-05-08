import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import  mainUrl  from "../../../utils/mainUrl";


//ACTIONS
//REGISTRATION PROCESS ACTION
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        
        'Access-Control-Allow-Origin':'*',
        "Content-Type": "application/json",
      },
    };
    //http call
    try {
      const formData = new FormData();
      formData.append('firstName', user?.firstName);
      formData.append('lastName', user?.lastName);
      formData.append('userName', user?.userName);
      formData.append('email', user?.email);
      formData.append('password', user?.password);
      formData.append('photo', user?.photo);

      const { data } = await axios.post(
        `${mainUrl}/api/users/registration`,
        formData,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//LOGIN USER
export const loginUserAction = createAsyncThunk( 'user/login', async (
    user, {rejectWithValue, getState, dispatch}) => {
      const config = {
        headers: {
          Authorization: `GEEK ${userAuth?.token}`,
          'Access-Control-Allow-Origin':'*',
          "Content-Type": "application/json",
        },
      };
      
    try {
        const { data } = await axios.post(
            `${mainUrl}/api/users/login`,
            user,
            config
        );
        //save all the information about user in out local storage
        localStorage.setItem('user', JSON.stringify(data));
        //return the data
        return data;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
    return rejectWithValue(error?.response?.data);
    }
});


//fetch one user
export const fetchUserAction = createAsyncThunk(
  "user/profile",
  async (userID, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.get(`${mainUrl}/api/users/profile/${userID}`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Logout users
export const logoutUserAction = createAsyncThunk(
  'user/logout', async (payload,{rejectWithValue, getState, dispatch})=>{
    try{
      localStorage.removeItem('user');
    }catch(error){
      if(!error?.response){
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
)

//this insert the user the user into store taking the info from localstorage
//if not, return null
const userLocalStorage = localStorage.getItem('user') 
? JSON.parse(localStorage.getItem('user')): null ;



//SLICES 

const usersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userLocalStorage,
  },
  extraReducers: builder => {
    //register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //LOGIN
    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(loginUserAction.fulfilled, (state, action) => {
        state.userAuth = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(loginUserAction.rejected, (state, action) => {
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
        state.loading = false;
      });
      //fetch one user
      builder.addCase(fetchUserAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(fetchUserAction.fulfilled, (state, action) => {
        state.userProfile = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(fetchUserAction.rejected, (state, action) => {
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
        state.loading = false;
      });
      //logout user
      builder.addCase(logoutUserAction.pending, (state, action) => {
        state.loading = false;
        
      });
      builder.addCase(logoutUserAction.fulfilled, (state, action) => {
        state.userAuth = undefined;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(logoutUserAction.rejected, (state, action) => {
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
        state.loading = false;
      });
      
  },
});



export default usersSlices.reducer;