import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from 'axiosInstance';
import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import { myAlert } from 'helpers/myAlert';

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  preloader_prod: false,
  listProds: []
};

////// getAllProdsReq - get cписок товаров
export const getAllProdsReq = createAsyncThunk('getAllProdsReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/prods/main`;
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

////// crudProdsReq - crud всех товаров
export const crudProdsReq = createAsyncThunk('crudProdsReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/prods/crud`;
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

////// sendWA - ватсап
export const sendWA = createAsyncThunk('sendWA', async function (data, { dispatch, rejectWithValue }) {
  const url = `http://11.12.1.10/api/create_message`;
  try {
    const response = await axios({
      method: 'POST',
      url,
      data: {
        message: 'привет',
        from: '7103184086',
        to: '996502024964',
        urlFile: ''
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    if (response.status >= 200 && response.status < 300) {
      return response?.data;
    } else {
      throw Error(`Error: ${response.status}`);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const prodsSlice = createSlice({
  name: 'prodsSlice',
  initialState,
  reducers: {
    listProdsFN: (state, action) => {
      state.listProds = action.payload;
    }
  },

  extraReducers: (builder) => {
    ////////////// getAllProdsReq
    builder.addCase(getAllProdsReq.fulfilled, (state, action) => {
      state.preloader_prod = false;
      state.listProds = action.payload;
    });
    builder.addCase(getAllProdsReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listProds = [];
      state.preloader_prod = false;
    });
    builder.addCase(getAllProdsReq.pending, (state, action) => {
      state.preloader_prod = true;
    });

    //////////// crudProdsReq
    builder.addCase(crudProdsReq.fulfilled, (state, action) => {
      state.preloader_prod = false;
    });
    builder.addCase(crudProdsReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_prod = false;
    });
    builder.addCase(crudProdsReq.pending, (state, action) => {
      state.preloader_prod = true;
    });
  }
});

export const { listProdsFN } = prodsSlice.actions;

export default prodsSlice.reducer;
