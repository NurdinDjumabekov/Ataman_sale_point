import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from 'axiosInstance';
import { myAlert } from 'helpers/myAlert';

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  preloader_inv: false,
  listInvoice: []
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
      if (response?.data?.length == 0) {
        myAlert('Файл пустой', 'error');
      }
      return response?.data;
    } else {
      throw Error(`Error: ${response.status}`);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const invoiceSlice = createSlice({
  name: 'invoiceSlice',
  initialState,
  reducers: {
    // clearListOrdersAgents: (state, action) => {
    //   state.listOrders = [];
    //   /// очищаю список, хрянящий заказы всех ТА
    // },
  },

  extraReducers: (builder) => {
    ////////////// loadFileInvoiceReq
    builder.addCase(loadFileInvoiceReq.fulfilled, (state, action) => {
      state.preloader_inv = false;
      state.listInvoice = action.payload;
    });
    builder.addCase(loadFileInvoiceReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listInvoice = [];
      myAlert('Не удалось загрузить данные', 'error');
      state.preloader_inv = false;
    });
    builder.addCase(loadFileInvoiceReq.pending, (state, action) => {
      state.preloader_inv = true;
    });
  }
});

export const {} = invoiceSlice.actions;

export default invoiceSlice.reducer;
