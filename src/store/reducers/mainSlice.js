import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from 'axiosInstance';

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  nurdin: 'всем првивет!'
};

////// getData -
export const getData = createAsyncThunk('getData', async function (props, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/invoice/load`;
  try {
    const response = await axiosInstance(url);
    if (response.status >= 200 && response.status < 300) {
      return response?.data;
    } else {
      throw Error(`Error: ${response.status}`);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

////// loadFileInvoiceReq -
export const loadFileInvoiceReq = createAsyncThunk('loadFileInvoiceReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/invoice/upload`;
  try {
    const response = await axiosInstance.post(url, data);
    if (response.status >= 200 && response.status < 300) {
      return response?.data;
    } else {
      throw Error(`Error: ${response.status}`);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    // clearListOrdersAgents: (state, action) => {
    //   state.listOrders = [];
    //   /// очищаю список, хрянящий заказы всех ТА
    // },
  },

  extraReducers: (builder) => {
    // ////////////// logInAccount
    // builder.addCase(logInAccount.fulfilled, (state, action) => {
    //   state.preloader = false;
    // });
    // builder.addCase(logInAccount.rejected, (state, action) => {
    //   state.error = action.payload;
    //   state.preloader = false;
    //   myAlert('Неверный логин или пароль');
    // });
    // builder.addCase(logInAccount.pending, (state, action) => {
    //   state.preloader = true;
    // });
  }
});

export const {} = mainSlice.actions;

export default mainSlice.reducer;
