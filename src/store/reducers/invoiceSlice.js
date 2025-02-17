import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from 'axiosInstance';
import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import { myAlert } from 'helpers/myAlert';

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  preloader_inv: false,
  listInvoice: [],
  activeDate: format(new Date(), 'yyyy-MM-dd', { locale: ru })
};

////// getInvoiceReq -
export const getInvoiceReq = createAsyncThunk('getInvoiceReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/invoice/main`;
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

////// loadFileInvoiceReq -
export const loadFileInvoiceReq = createAsyncThunk('loadFileInvoiceReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/invoice/upload`;
  try {
    const response = await axiosInstance.post(url, data);
    if (response.status >= 200 && response.status < 300) {
      return response?.data.result;
    } else {
      throw Error(`Error: ${response.status}`);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

////// crudInvoiceReq - crud накладные
export const crudInvoiceReq = createAsyncThunk('crudInvoiceReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/invoice/crud`;
  try {
    const response = await axiosInstance.post(url, data);
    if (response.status >= 200 && response.status < 300) {
      return response?.data?.[0]?.result;
    } else {
      throw Error(`Error: ${response.status}`);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

////// crudInvoiceMoreReq - crud доп данных накладных
export const crudInvoiceMoreReq = createAsyncThunk('crudInvoiceMoreReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/invoice/crud_more`;
  try {
    const response = await axiosInstance.post(url, data);
    if (response.status >= 200 && response.status < 300) {
      return response?.data?.result;
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
    preloader_inv_FN: (state, action) => {
      state.preloader_inv = action.payload;
    },

    listInvoiceFN: (state, action) => {
      state.listInvoice = action.payload;
      /// очищаю список, хрянящий заказы всех ТА
    },

    activeDateFN: (state, action) => {
      state.activeDate = action.payload;
    }
  },

  extraReducers: (builder) => {
    ////////////// loadFileInvoiceReq
    builder.addCase(loadFileInvoiceReq.fulfilled, (state, action) => {
      state.preloader_inv = false;
    });
    builder.addCase(loadFileInvoiceReq.rejected, (state, action) => {
      state.error = action.payload;
      myAlert('Не удалось загрузить данные', 'error');
      state.preloader_inv = false;
    });
    builder.addCase(loadFileInvoiceReq.pending, (state, action) => {
      state.preloader_inv = true;
    });

    ////////////// getInvoiceReq
    builder.addCase(getInvoiceReq.fulfilled, (state, action) => {
      state.preloader_inv = false;
      state.listInvoice = action.payload;
    });
    builder.addCase(getInvoiceReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listInvoice = [];
      state.preloader_inv = false;
    });
    builder.addCase(getInvoiceReq.pending, (state, action) => {
      state.preloader_inv = true;
    });

    ////////////// crudInvoiceReq
    builder.addCase(crudInvoiceReq.fulfilled, (state, action) => {
      state.preloader_inv = false;
    });
    builder.addCase(crudInvoiceReq.rejected, (state, action) => {
      state.error = action.payload;
      myAlert('Упс, что-то пошло не так', 'error');
      state.preloader_inv = false;
    });
    builder.addCase(crudInvoiceReq.pending, (state, action) => {
      state.preloader_inv = true;
    });

    /////////////// crudInvoiceMoreReq
    builder.addCase(crudInvoiceMoreReq.fulfilled, (state, action) => {
      state.preloader_inv = false;
    });
    builder.addCase(crudInvoiceMoreReq.rejected, (state, action) => {
      state.error = action.payload;
      myAlert('Упс, что-то пошло не так', 'error');
      state.preloader_inv = false;
    });
    builder.addCase(crudInvoiceMoreReq.pending, (state, action) => {
      state.preloader_inv = true;
    });
  }
});

export const { listInvoiceFN, activeDateFN, preloader_inv_FN } = invoiceSlice.actions;

export default invoiceSlice.reducer;
